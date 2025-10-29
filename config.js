window.APP_CONFIG = {
  marketData: {
    fmpApiKey: "demo"
  },
  environment: {
    allowInsecureMarketFetch: true
  }
};

if (window.APP_CONFIG?.environment?.allowInsecureMarketFetch) {
  window.ENABLE_INSECURE_MARKET_FETCH = true;
}
