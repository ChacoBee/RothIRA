// Alpha Vantage API Configuration
const ALPHA_VANTAGE_API_KEY = 'demo'; // Use 'demo' for free tier, replace with your key for production
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';

// Sample Data (Based on your Sheet) - Will be updated with real data
let initialStockData = {
  VOO: {
    target: 30.0,
    currentValue: 30.0,
    currentPercent: 30.0,
    sector: 'Core US',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  QQQM: {
    target: 15.0,
    currentValue: 15.0,
    currentPercent: 15.0,
    sector: 'Technology',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  SMH: {
    target: 10.0,
    currentValue: 10.0,
    currentPercent: 10.0,
    sector: 'Technology',
    region: 'Global',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  VXUS: {
    target: 20.0,
    currentValue: 20.0,
    currentPercent: 20.0,
    sector: 'International Multi-Sector',
    region: 'Global ex-US',
    exposureCategory: 'international',
    assetClass: 'equity',
  },
  AVUV: {
    target: 10.0,
    currentValue: 10.0,
    currentPercent: 10.0,
    sector: 'Small Cap Value',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  SPMO: {
    target: 5.0,
    currentValue: 5.0,
    currentPercent: 5.0,
    sector: 'Momentum Factor',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  SPHQ: {
    target: 5.0,
    currentValue: 5.0,
    currentPercent: 5.0,
    sector: 'Quality Factor',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  IBIT: {
    target: 2.0,
    currentValue: 2.0,
    currentPercent: 2.0,
    sector: 'Digital Assets',
    region: 'Global',
    exposureCategory: 'alternative',
    assetClass: 'alternative',
  },
  AMZN: {
    target: 3.0,
    currentValue: 3.0,
    currentPercent: 3.0,
    sector: 'Consumer Discretionary',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
};

const defaultTargetAllocations = Object.keys(initialStockData).reduce(
  (acc, key) => {
    acc[key] = initialStockData[key]?.target ?? 0;
    return acc;
  },
  {}
);

window.defaultTargetAllocations = { ...defaultTargetAllocations };

// Function to fetch real-time stock data from Alpha Vantage
async function fetchStockData(symbol) {
  try {
    const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
    const data = await response.json();

    if (data['Global Quote'] && data['Global Quote']['05. price']) {
      return parseFloat(data['Global Quote']['05. price']);
    } else {
      console.warn(`No data available for ${symbol}, using fallback`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching data for ${symbol}:`, error);
    return null;
  }
}

// Function to update stock data with real market prices
async function updateStockDataWithRealPrices() {
  const tickers = Object.keys(initialStockData);
  const updatePromises = tickers.map(async (ticker) => {
    const realPrice = await fetchStockData(ticker);
    if (realPrice !== null) {
      // Update current value based on target allocation (simplified calculation)
      const totalTargetValue = Object.values(initialStockData).reduce((sum, stock) => sum + stock.currentValue, 0);
      const targetValue = (initialStockData[ticker].target / 100) * totalTargetValue;
      initialStockData[ticker].currentValue = targetValue;
      initialStockData[ticker].currentPercent = initialStockData[ticker].target;
    }
  });

  await Promise.all(updatePromises);
  console.log('Stock data updated with real market prices');
}

// Function to initialize data loading
async function initializeData() {
  const indicator = document.getElementById('dataLoadingIndicator');
  if (indicator) {
    indicator.classList.remove('hidden');
  }

  try {
    await updateStockDataWithRealPrices();
    console.log('Real market data loaded successfully');
  } catch (error) {
    console.error('Failed to fetch real data, using mock data:', error);
  } finally {
    window.portfolioDataRefreshedAt = new Date();
    if (indicator) {
      indicator.classList.add('hidden');
    }
  }
}

const assetKeys = Object.keys(initialStockData);
const REBALANCE_THRESHOLD = 5.0; // Deviation threshold

// Core market assumptions used across analytics modules
const RISK_FREE_RATE = 0.045; // 4.5% annual risk-free rate
const BENCHMARK_EXPECTED_RETURN = 0.1; // 10% assumed long-run market return
const EQUITY_RISK_PREMIUM = Math.max(0, BENCHMARK_EXPECTED_RETURN - RISK_FREE_RATE);

const assetBetas = {
  VOO: 1.0,
  QQQM: 1.2,
  SMH: 1.3,
  VXUS: 0.9,
  AVUV: 1.1,
  SPMO: 1.1,
  SPHQ: 0.9,
  IBIT: 1.5,
  AMZN: 1.4,
};

const BASE_ASSET_BETAS = Object.freeze({ ...assetBetas });

const factorNames = ['MKT', 'SMB', 'HML', 'MOM'];

const multiFactorLoadings = {
  VOO: { MKT: 1.0, SMB: -0.1, HML: 0.0, MOM: 0.12 },
  QQQM: { MKT: 1.15, SMB: -0.25, HML: -0.35, MOM: 0.3 },
  SMH: { MKT: 1.25, SMB: -0.3, HML: -0.2, MOM: 0.45 },
  VXUS: { MKT: 0.95, SMB: 0.05, HML: 0.12, MOM: 0.08 },
  AVUV: { MKT: 1.05, SMB: 0.7, HML: 0.4, MOM: -0.05 },
  SPMO: { MKT: 1.08, SMB: -0.25, HML: -0.2, MOM: 0.7 },
  SPHQ: { MKT: 0.9, SMB: -0.2, HML: 0.1, MOM: 0.15 },
  IBIT: { MKT: 1.6, SMB: 0.35, HML: -0.45, MOM: 0.85 },
  AMZN: { MKT: 1.3, SMB: -0.2, HML: -0.3, MOM: 0.52 },
};

const factorCovariances = {
  MKT: { MKT: 0.042, SMB: 0.011, HML: 0.009, MOM: 0.007 },
  SMB: { MKT: 0.011, SMB: 0.028, HML: 0.006, MOM: 0.0025 },
  HML: { MKT: 0.009, SMB: 0.006, HML: 0.025, MOM: 0.002 },
  MOM: { MKT: 0.007, SMB: 0.0025, HML: 0.002, MOM: 0.03 },
};

const assetResidualVols = {
  VOO: 0.08,
  QQQM: 0.12,
  SMH: 0.18,
  VXUS: 0.1,
  AVUV: 0.14,
  SPMO: 0.15,
  SPHQ: 0.12,
  IBIT: 0.35,
  AMZN: 0.2,
};

const BASE_MULTI_FACTOR_LOADINGS = Object.freeze(
  Object.fromEntries(
    Object.entries(multiFactorLoadings).map(([key, value]) => [
      key,
      Object.freeze({ ...value }),
    ])
  )
);

const BASE_FACTOR_COVARIANCES = Object.freeze(
  Object.fromEntries(
    Object.entries(factorCovariances).map(([rowKey, row]) => [
      rowKey,
      Object.freeze({ ...row }),
    ])
  )
);

const BASE_ASSET_RESIDUAL_VOLS = Object.freeze({ ...assetResidualVols });

// Analytics Data: Expected Returns (annual), Volatilities (annual), and Correlations
function deriveCapmExpectedReturn(betaEstimate) {
  const beta = Number.isFinite(betaEstimate) ? betaEstimate : 1;
  return RISK_FREE_RATE + beta * EQUITY_RISK_PREMIUM;
}

const expectedReturns = assetKeys.reduce((acc, key) => {
  acc[key] = deriveCapmExpectedReturn(assetBetas[key]);
  return acc;
}, {});

const BASE_EXPECTED_RETURNS = Object.freeze({ ...expectedReturns });

const volatilities = {
  VOO: 0.15, // 15%
  QQQM: 0.25, // 25%
  SMH: 0.30, // 30%
  VXUS: 0.18, // 18%
  AVUV: 0.22, // 22%
  SPMO: 0.20, // 20%
  SPHQ: 0.16, // 16%
  IBIT: 0.50, // 50%
  AMZN: 0.35, // 35%
};

const BASE_VOLATILITIES = Object.freeze({ ...volatilities });

const expenseRatios = {
  VOO: 0.0003, // 0.03%
  QQQM: 0.0015, // 0.15%
  SMH: 0.0035, // 0.35%
  VXUS: 0.0007, // 0.07%
  AVUV: 0.0025, // 0.25%
  SPMO: 0.0013, // 0.13%
  SPHQ: 0.0029, // 0.29%
  IBIT: 0.0025, // 0.25%
  AMZN: 0.0, // Direct equity, no fund expense
};

const correlations = {
  AMZN_AVUV: 0.6,
  AMZN_IBIT: 0.3,
  AMZN_QQQM: 0.9,
  AMZN_SMH: 0.8,
  AMZN_VOO: 0.8,
  AMZN_VXUS: 0.5,
  AMZN_SPMO: 0.82,
  AMZN_SPHQ: 0.65,
  AVUV_IBIT: 0.25,
  AVUV_QQQM: 0.6,
  AVUV_SMH: 0.55,
  AVUV_VOO: 0.65,
  AVUV_VXUS: 0.5,
  AVUV_SPMO: 0.58,
  AVUV_SPHQ: 0.48,
  IBIT_QQQM: 0.4,
  IBIT_SMH: 0.3,
  IBIT_VOO: 0.3,
  IBIT_VXUS: 0.2,
  IBIT_SPMO: 0.3,
  IBIT_SPHQ: 0.18,
  QQQM_SMH: 0.9,
  QQQM_VOO: 0.8,
  QQQM_VXUS: 0.5,
  QQQM_SPMO: 0.82,
  QQQM_SPHQ: 0.6,
  SMH_VOO: 0.7,
  SMH_VXUS: 0.4,
  SMH_SPMO: 0.78,
  SMH_SPHQ: 0.55,
  VOO_VXUS: 0.6,
  VOO_SPMO: 0.75,
  VOO_SPHQ: 0.83,
  VXUS_SPMO: 0.42,
  VXUS_SPHQ: 0.5,
  SPMO_SPHQ: 0.7,
};

const portfolioDefaults = Object.freeze({
  riskFreeRate: RISK_FREE_RATE,
  marketReturn: BENCHMARK_EXPECTED_RETURN,
  equityRiskPremium: EQUITY_RISK_PREMIUM,
  expectedReturns: BASE_EXPECTED_RETURNS,
  volatilities: BASE_VOLATILITIES,
  assetBetas: BASE_ASSET_BETAS,
  factorNames: Object.freeze([...factorNames]),
  multiFactorLoadings: BASE_MULTI_FACTOR_LOADINGS,
  factorCovariances: BASE_FACTOR_COVARIANCES,
  residualVols: BASE_ASSET_RESIDUAL_VOLS,
});

window.portfolioDefaults = portfolioDefaults;
window.multiFactorDefaults = Object.freeze({
  factorNames: Object.freeze([...factorNames]),
  loadings: BASE_MULTI_FACTOR_LOADINGS,
  covariance: BASE_FACTOR_COVARIANCES,
  residualVols: BASE_ASSET_RESIDUAL_VOLS,
});

function applyDefaultsToMap(targetMap, defaultsMap) {
  if (!targetMap || !defaultsMap) {
    return;
  }
  Object.keys(targetMap).forEach((key) => {
    if (!(key in defaultsMap)) {
      delete targetMap[key];
    }
  });
  Object.keys(defaultsMap).forEach((key) => {
    targetMap[key] = defaultsMap[key];
  });
}

function syncPortfolioDefaults({ clearStorage = false, emitEvent = false } = {}) {
  applyDefaultsToMap(expectedReturns, BASE_EXPECTED_RETURNS);
  applyDefaultsToMap(volatilities, BASE_VOLATILITIES);

  if (clearStorage && typeof localStorage !== 'undefined') {
    assetKeys.forEach((key) => {
      try {
        localStorage.removeItem(`expectedReturn_${key}`);
      } catch (error) {
        console.warn('Failed to clear stored expected return for', key, error);
      }
    });
  }

  if (emitEvent && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(
      new CustomEvent('portfolio-assumptions-reset', {
        detail: { clearedStorage: clearStorage },
      })
    );
  }
}

window.hydratePortfolioDefaults = function hydratePortfolioDefaults() {
  syncPortfolioDefaults({ clearStorage: false, emitEvent: false });
};

window.resetPortfolioAssumptionsToDefaults = function resetPortfolioAssumptionsToDefaults(options = {}) {
  const clearStorage = options?.clearStorage !== false;
  const silent = options?.silent === true;
  syncPortfolioDefaults({ clearStorage, emitEvent: !silent });
};

let chartInstance = null;
let growthChartInstance = null;
let isDarkMode = false;
let tvWidget = null; // Cache for the TradingView widget instance

// TradingView Symbol Mapping
// Use exchange-prefixed symbols that the embedded TradingView widget accepts.
function getTradingViewSymbol(ticker) {
  if (["VOO", "AVUV", "SPMO", "SPHQ"].includes(ticker)) {
    return `AMEX:${ticker}`;
  }
  if (["QQQM", "SMH", "VXUS"].includes(ticker)) {
    return `NASDAQ:${ticker}`;
  }
  if (ticker === "AMZN") {
    return `NASDAQ:AMZN`;
  }
  if (ticker === "IBIT") {
    return `NASDAQ:IBIT`; // Use IBIT ETF symbol
  }
  return ticker; // Default fallback
}

// --- Currency and Percentage Formatting ---
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function formatCurrency(value) {
  return currencyFormatter.format(value);
}
function formatPercent(value) {
  return numberFormatter.format(value) + "%";
}

// --- STOCK DETAILS CONTENT (Expanded in English) ---
const stockDetailsContent = {
  VOO: {
    desc: "Core S&P 500 ETF spanning 500 large-cap US companies. Provides stability, broad diversification, and the foundational sleeve for long-term missions.",
    pros: "Ultra-low 0.03% expense ratio preserves net returns. Broad diversification lowers single-stock risk. Ideal anchor for passive accumulation.",
    cons: "Can lag growth-tilted funds during tech-led rallies. Offers limited downside protection when US markets sell off.",
  },
  QQQM: {
    desc: "Tracks the NASDAQ-100 with 100 non-financial tech leaders. High-octane growth sleeve powering the hangar's innovation exposure.",
    pros: "Heavy exposure to cloud, AI, and platform giants. Lower fee than legacy QQQ. Historically outperforms during technology bull cycles.",
    cons: "Higher volatility than broad market funds. Concentration risk if mega-cap tech stumbles or regulation tightens.",
  },
  VXUS: {
    desc: "Broad international ETF covering developed and emerging markets outside the US. Adds regional diversification and reduces home-market bias.",
    pros: "Captures cycles when Europe or Asia outpace the US. Helps hedge dollar weakness. Expands opportunity set across countries and sectors.",
    cons: "Faces currency and geopolitical risk. Has lagged US equities over much of the past decade.",
  },
  AVUV: {
    desc: "Avantis small-cap value ETF targeting profitable, inexpensive US businesses. Complements the large-cap core with a value tilt.",
    pros: "Diversifies factor exposure beyond mega-cap growth. Historically rebounds when the value factor regains leadership. Adds a disciplined, tax-aware smart-beta sleeve.",
    cons: "More volatile than blue-chip ETFs and can trail in growth-led markets. Smaller fund size requires monitoring liquidity and spreads.",
  },
  SPMO: {
    desc: "Invesco S&P 500 Momentum ETF tilting toward S&P leaders with the strongest price trends.",
    pros: "Rules-based rebalance keeps exposure in relative winners. Complements core holdings with a systematic growth tilt.",
    cons: "Momentum rotations can cause sharp reversals and tracking error versus the S&P 500 headline index.",
  },
  SPHQ: {
    desc: "Invesco S&P 500 Quality ETF screening for high return on equity, low leverage, and stable earnings.",
    pros: "Focus on balance-sheet strength can soften drawdowns while keeping core US exposure.",
    cons: "Quality tilts may lag speculative rallies and concentrate holdings in select sectors.",
  },
  SMH: {
    desc: "VanEck Semiconductor ETF covering global chip leaders. Tactical sleeve aimed at AI, cloud computing, and high-performance hardware trends.",
    pros: "High structural growth as chips power every digital initiative. Among the highest-margin industries in technology.",
    cons: "Industry cycles can be sharp with demand swings and inventory gluts. Sensitive to geopolitical tensions around fabrication hubs.",
  },
  AMZN: {
    desc: "Direct equity stake in Amazon across e-commerce, AWS cloud, and logistics. Single-stock satellite delivering outsized growth potential.",
    pros: "Exposure to a dominant platform with multiple growth engines. Optionality across advertising, media, and AI services.",
    cons: "Single-company risk is elevated; performance hinges on management execution. Valuation multiples can compress quickly in risk-off regimes.",
  },
  IBIT: {
    desc: "Spot Bitcoin ETF providing regulated access to digital asset exposure. High-beta diversifier with low correlation to traditional equities.",
    pros: "Captures upside from Bitcoin adoption and macro hedging demand. Delivers custodied access without wallet management.",
    cons: "Extreme price volatility and regulatory uncertainty. Short trading history leaves drawdown behavior unpredictable.",
  },
};

