window.APP_CONFIG = window.APP_CONFIG || {};

window.APP_CONFIG.marketData = Object.assign(
  {
    fmpApiKey: 'demo',
    alphaVantageKey: '',
    finnhubKey: '',
  },
  window.APP_CONFIG.marketData || {}
);

window.APP_CONFIG.environment = Object.assign(
  {
    allowInsecureMarketFetch: false,
  },
  window.APP_CONFIG.environment || {}
);

if (window.APP_CONFIG.environment.allowInsecureMarketFetch) {
  window.ENABLE_INSECURE_MARKET_FETCH = true;
} else {
  window.ENABLE_INSECURE_MARKET_FETCH = false;
}
