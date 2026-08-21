// TradingView loader keeps the heavy widget library off the critical path.
(function () {
  const TRADINGVIEW_SCRIPT_URL = "https://s3.tradingview.com/tv.js";

  let scriptPromise = null;
  let desiredRender = null;

  function flushPendingRender() {
    if (!desiredRender) return;
    if (typeof window.TradingView === "undefined") return;
    if (typeof window.createTradingViewWidget !== "function") return;

    const { symbol, theme } = desiredRender;
    window.createTradingViewWidget(symbol, theme);
  }

  function ensureScriptLoaded() {
    if (
      window.TradingView &&
      typeof window.TradingView.widget === "function"
    ) {
      return Promise.resolve(window.TradingView);
    }

    if (scriptPromise) {
      return scriptPromise;
    }

    scriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector(
        `script[src="${TRADINGVIEW_SCRIPT_URL}"]`
      );
      if (existingScript && existingScript.hasAttribute("data-tv-loader")) {
        existingScript.addEventListener("load", () => {
          resolve(window.TradingView);
          flushPendingRender();
        });
        existingScript.addEventListener("error", (event) => {
          reject(event);
          scriptPromise = null;
        });
        return;
      }

      const script = document.createElement("script");
      script.src = TRADINGVIEW_SCRIPT_URL;
      script.async = true;
      script.setAttribute("data-tv-loader", "true");
      script.onload = () => {
        resolve(window.TradingView);
        flushPendingRender();
      };
      script.onerror = (event) => {
        console.warn("TradingView script failed to load.", event);
        scriptPromise = null;
        reject(event);
      };

      document.head.appendChild(script);
    });

    return scriptPromise;
  }

  function setDesiredRender(symbol, theme) {
    desiredRender = { symbol, theme };

    if (
      window.TradingView &&
      typeof window.TradingView.widget === "function" &&
      typeof window.createTradingViewWidget === "function"
    ) {
      flushPendingRender();
    }
  }

  function requestRender() {
    return ensureScriptLoaded().then(() => {
      flushPendingRender();
    });
  }

  function hasLoaded() {
    return Boolean(
      window.TradingView && typeof window.TradingView.widget === "function"
    );
  }

  window.TradingViewLoader = {
    setDesiredRender,
    requestRender,
    ensureScriptLoaded,
    hasLoaded,
  };
})();
