// --- TRADINGVIEW FULL CHART INTEGRATION (Section 3) ---

/**
 * Creates or re-initializes the TradingView widget.
 * @param {string} fullSymbol - The full symbol string (e.g., 'AMEX:SPMO').
 * @param {string} theme - 'dark' or 'light'.
 */
function createTradingViewWidget(fullSymbol, theme) {
  // 1. Remove previous widget if it exists to avoid conflicts
  if (tvWidget && tvWidget.remove) {
    tvWidget.remove();
  }

  // 2. Use the provided symbol, defaulting to VOO mapped symbol
  const initialSymbol = fullSymbol || getTradingViewSymbol("VOO");

  // 3. Create new widget instance
  tvWidget = new TradingView.widget({
    container_id: "tradingview_chart",
    autosize: true,
    symbol: initialSymbol,
    interval: "D", // Daily interval
    timezone: "Etc/UTC",
    theme: theme,
    style: "1", // Candlesticks
    locale: "en",
    toolbar_bg: theme === "dark" ? "#1f2937" : "#f1f3f6",
    enable_publishing: false,
    allow_symbol_change: true, // Allow user to change ticker in widget UI
    calendar: false,
    hide_side_toolbar: false,
    details: true,
    hotlist: false,
    studies: [
      // Add Bollinger Bands and Volume by default
      { id: "BB@tv-bollinger-bands" },
      { id: "Volume@tv-volume" },
    ],
    support_host: "https://www.tradingview.com",
  });
}

/**
 * Creates a mini TradingView widget for section 4.
 * @param {string} fullSymbol - The full symbol string (e.g., 'AMEX:SPMO').
 * @param {string} theme - 'dark' or 'light'.
 */
function createMiniTradingViewWidget(fullSymbol, theme) {
  // Remove previous mini widget if it exists
  if (window.miniTvWidget && window.miniTvWidget.remove) {
    window.miniTvWidget.remove();
  }

  // Create new mini widget instance
  window.miniTvWidget = new TradingView.widget({
    container_id: "mini-chart-container",
    autosize: true,
    symbol: fullSymbol,
    interval: "D",
    timezone: "Etc/UTC",
    theme: theme,
    style: "1",
    locale: "en",
    toolbar_bg: theme === "dark" ? "#1f2937" : "#f1f3f6",
    enable_publishing: false,
    allow_symbol_change: false, // Disable symbol change for mini chart
    calendar: false,
    hide_side_toolbar: true,
    details: false,
    hotlist: false,
    studies: [
      { id: "Volume@tv-volume" },
    ],
    support_host: "https://www.tradingview.com",
    height: 320,
  });
}
