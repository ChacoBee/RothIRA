import { Component, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import PortfolioActionCenter from './components/PortfolioActionCenter.jsx';

function IslandFallback({ label, message = 'This panel could not load.', onRetry }) {
  return (
    <div
      data-island-fallback={label}
      className="rounded-2xl border border-amber-300/70 bg-amber-50/90 p-5 text-sm text-amber-900 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-100"
      role="status"
    >
      <p className="font-semibold">{message}</p>
      <p className="mt-1 opacity-80">The rest of the dashboard is still available.</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-lg border border-amber-400/70 px-3 py-2 text-xs font-semibold transition hover:bg-amber-100 dark:border-amber-300/40 dark:hover:bg-amber-900/40"
        >
          Retry
        </button>
      ) : null}
    </div>
  );
}

class IslandErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(`React island failed: ${this.props.label}`, error, info);
  }

  componentDidUpdate(previousProps) {
    if (previousProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return (
        <IslandFallback
          label={this.props.label}
          message={`${this.props.label} is temporarily unavailable.`}
          onRetry={this.props.onRetry}
        />
      );
    }

    return this.props.children;
  }
}

function DeferredIsland({ loadComponent, label }) {
  const hostRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [Component, setComponent] = useState(null);
  const [loadError, setLoadError] = useState(null);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) {
      setShouldLoad(true);
      return undefined;
    }

    if (!('IntersectionObserver' in window)) {
      setShouldLoad(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '700px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    if (!shouldLoad || Component) {
      return undefined;
    }

    setLoadError(null);
    loadComponent()
      .then((module) => {
        if (!cancelled) {
          setComponent(() => module.default);
        }
      })
      .catch((error) => {
        if (!cancelled) {
          console.error(`Unable to load ${label}.`, error);
          setLoadError(error);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [Component, label, loadComponent, retryKey, shouldLoad]);

  const retry = () => {
    setComponent(null);
    setLoadError(null);
    setShouldLoad(true);
    setRetryKey((key) => key + 1);
  };

  return (
    <div ref={hostRef}>
      {loadError ? (
        <IslandFallback label={label} message={`Unable to load ${label}.`} onRetry={retry} />
      ) : Component ? (
        <IslandErrorBoundary label={label} resetKey={retryKey} onRetry={retry}>
          <Component />
        </IslandErrorBoundary>
      ) : (
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-5 text-sm text-slate-600 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50 dark:text-slate-300">
          Loading {label}...
        </div>
      )}
    </div>
  );
}

export default function App({ legacyAppMarkup, legacyBodyClass }) {
  useLayoutEffect(() => {
    document.body.className = legacyBodyClass;

    const mounts = [
      [
        'portfolioActionCenterMount',
        <IslandErrorBoundary label="Action Center" resetKey="action-center">
          <PortfolioActionCenter />
        </IslandErrorBoundary>,
      ],
      [
        'worldStockNewsMount',
        <DeferredIsland
          label="market news"
          loadComponent={() => import('./components/WorldStockNewsCard.jsx')}
        />,
      ],
      [
        'capitalDeploymentOptimizerMount',
        <DeferredIsland
          label="capital deployment optimizer"
          loadComponent={() => import('./components/CapitalDeploymentOptimizer.jsx')}
        />,
      ],
      [
        'historicalStressReplayMount',
        <DeferredIsland
          label="historical stress replay"
          loadComponent={() => import('./components/HistoricalStressReplay.jsx')}
        />,
      ],
      [
        'monteCarloRetirementLabMount',
        <DeferredIsland
          label="Monte Carlo retirement lab"
          loadComponent={() => import('./components/MonteCarloRetirementLab.jsx')}
        />,
      ],
    ];

    const roots = mounts
      .map(([mountId, element]) => {
        const mountNode = document.getElementById(mountId);
        if (!mountNode) {
          return null;
        }

        const root = createRoot(mountNode);
        root.render(element);
        return root;
      })
      .filter(Boolean);

    return () => {
      roots.forEach((root) => root.unmount());
    };
  }, [legacyBodyClass]);

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: legacyAppMarkup }} />;
}
