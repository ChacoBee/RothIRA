import { useLayoutEffect } from 'react';
import { createRoot } from 'react-dom/client';
import WorldStockNewsCard from './components/WorldStockNewsCard.jsx';
import CapitalDeploymentOptimizer from './components/CapitalDeploymentOptimizer.jsx';
import HistoricalStressReplay from './components/HistoricalStressReplay.jsx';
import MonteCarloRetirementLab from './components/MonteCarloRetirementLab.jsx';
import { legacyAppMarkup, legacyBodyClass } from './utils/legacyMarkup.js';

export default function App() {
  useLayoutEffect(() => {
    document.body.className = legacyBodyClass;

    const mounts = [
      ['worldStockNewsMount', <WorldStockNewsCard />],
      ['capitalDeploymentOptimizerMount', <CapitalDeploymentOptimizer />],
      ['historicalStressReplayMount', <HistoricalStressReplay />],
      ['monteCarloRetirementLabMount', <MonteCarloRetirementLab />],
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
  }, []);

  return <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: legacyAppMarkup }} />;
}
