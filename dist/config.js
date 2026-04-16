window.APP_CONFIG = window.APP_CONFIG || {};

window.APP_CONFIG.marketData = Object.assign(
  {
    fmpApiKey: 'demo',
    alphaVantageKey: '',
    finnhubKey: 'd7g4oihr01qqb8ribc8gd7g4oihr01qqb8ribc90',
  },
  window.APP_CONFIG.marketData || {}
);

window.APP_CONFIG.environment = Object.assign(
  {
    allowInsecureMarketFetch: true,
  },
  window.APP_CONFIG.environment || {}
);

if (window.APP_CONFIG.environment.allowInsecureMarketFetch) {
  window.ENABLE_INSECURE_MARKET_FETCH = true;
}
