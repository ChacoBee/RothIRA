// Alpha Vantage API Configuration
const ALPHA_VANTAGE_API_KEY = 'AI3FRQ1IZHG3GTO1'; // Use 'demo' for free tier, replace with your key for production
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
  SPMO: {
    target: 10.0,
    currentValue: 10.0,
    currentPercent: 10.0,
    sector: 'Momentum Factor',
    region: 'United States',
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
    const historicalSeries = await fetchDailyAdjustedSeries(symbol);
    const latestPoint = Array.isArray(historicalSeries)
      ? historicalSeries[historicalSeries.length - 1]
      : null;
    if (latestPoint && Number.isFinite(latestPoint.price)) {
      return latestPoint.price;
    }

    const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`;
    const data = await fetchAlphaVantageJson(url);

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
  for (let i = 0; i < tickers.length; i += 1) {
    const ticker = tickers[i];
    const realPrice = await fetchStockData(ticker);
    if (realPrice !== null) {
      // Update current value based on target allocation (simplified calculation)
      const totalTargetValue = Object.values(initialStockData).reduce((sum, stock) => sum + stock.currentValue, 0);
      const targetValue = (initialStockData[ticker].target / 100) * totalTargetValue;
      initialStockData[ticker].currentValue = targetValue;
      initialStockData[ticker].currentPercent = initialStockData[ticker].target;
    }
  }
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
    const analyticsRefreshes = [
      loadVolatilitiesFromAlphaVantage().catch((error) => {
        console.warn('Failed to refresh volatility estimates from Alpha Vantage:', error);
      }),
      loadCorrelationsFromAlphaVantage().catch((error) => {
        console.warn('Failed to refresh correlation matrix from Alpha Vantage:', error);
      }),
    ];
    await Promise.allSettled(analyticsRefreshes);
    if (
      typeof window !== 'undefined' &&
      typeof window.initializeAnalytics === 'function'
    ) {
      try {
        window.initializeAnalytics();
      } catch (analyticsError) {
        console.error('Failed to reinitialize analytics after data refresh:', analyticsError);
      }
    }
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
  SPMO: 1.15,
  VXUS: 0.9,
  AVUV: 1.1,
  IBIT: 1.5,
  AMZN: 1.4,
};

const BASE_ASSET_BETAS = Object.freeze({ ...assetBetas });

const factorNames = ['MKT', 'SMB', 'HML', 'MOM'];

// const multiFactorLoadings = {
//   VOO: { MKT: 1.0, SMB: -0.1, HML: 0.0, MOM: 0.12 },
//   QQQM: { MKT: 1.15, SMB: -0.25, HML: -0.35, MOM: 0.3 },
//   SMH: { MKT: 1.25, SMB: -0.3, HML: -0.2, MOM: 0.45 },
//   VXUS: { MKT: 0.95, SMB: 0.05, HML: 0.12, MOM: 0.08 },
//   AVUV: { MKT: 1.05, SMB: 0.7, HML: 0.4, MOM: -0.05 },
//   IBIT: { MKT: 1.6, SMB: 0.35, HML: -0.45, MOM: 0.85 },
//   AMZN: { MKT: 1.3, SMB: -0.2, HML: -0.3, MOM: 0.52 },
// };
const multiFactorLoadings = {
  VOO:  { MKT: 1.00, SMB: -0.10, HML:  0.00, MOM: 0.10 },
  QQQM: { MKT: 1.10, SMB: -0.30, HML: -0.35, MOM: 0.25 },
  SMH:  { MKT: 1.82, SMB: -0.25, HML: -0.20, MOM: 0.45 },
  SPMO: { MKT: 1.22, SMB: -0.18, HML: -0.15, MOM: 0.62 },
  VXUS: { MKT: 0.80, SMB:  0.05, HML:  0.10, MOM: 0.10 },
  AVUV: { MKT: 1.46, SMB:  0.80, HML:  0.50, MOM: -0.05 },
  IBIT: { MKT: 0.83, SMB:  0.35, HML: -0.45, MOM: 0.85 },
  AMZN: { MKT: 1.84, SMB: -0.20, HML: -0.30, MOM: 0.50 },
};

// const factorCovariances = {
//   MKT: { MKT: 0.042, SMB: 0.011, HML: 0.009, MOM: 0.007 },
//   SMB: { MKT: 0.011, SMB: 0.028, HML: 0.006, MOM: 0.0025 },
//   HML: { MKT: 0.009, SMB: 0.006, HML: 0.025, MOM: 0.002 },
//   MOM: { MKT: 0.007, SMB: 0.0025, HML: 0.002, MOM: 0.03 },
// };

const factorCovariances = {
  MKT: { MKT: 0.017663, SMB:  0.001374, HML: -0.002355, MOM:  0.000883 },
  SMB: { MKT: 0.001374, SMB:  0.010685, HML:  0.002748, MOM: -0.001374 },
  HML: { MKT: -0.002355, SMB: 0.002748, HML:  0.007850, MOM: -0.004710 },
  MOM: { MKT: 0.000883, SMB: -0.001374, HML: -0.004710, MOM:  0.017663 },
};

const assetResidualVols = {
  VOO: 0.0000,
  QQQM: 0.07306,
  SMH: 0.15077,
  SPMO: 0.18211,
  VXUS: 0.15077,
  AVUV: 0.12090,
  IBIT: 0.54477,
  AMZN: 0.25138,
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

const STATIC_DEFAULT_VOLATILITIES = Object.freeze({
  VOO: 0.1337, // 13,37%
  QQQM: 0.1676, // 16,76%
  SMH: 0.2862, // 28,62%
  SPMO: 0.1925, // 19,25%
  VXUS: 0.1384, // 13,84%
  AVUV: 0.2295, // 22,95%
  IBIT: 0.556, // 55,6%
  AMZN: 0.352, // 35,2%
});

let volatilities = { ...STATIC_DEFAULT_VOLATILITIES };
if (typeof window !== 'undefined') {
  window.volatilities = volatilities;
}

const BASE_VOLATILITIES = Object.freeze({ ...STATIC_DEFAULT_VOLATILITIES });

const expenseRatios = {
  VOO: 0.0003, // 0.03%
  QQQM: 0.0015, // 0.15%
  SMH: 0.0035, // 0.35%
  SPMO: 0.0013, // 0.13%
  VXUS: 0.0005, // 0.05%
  AVUV: 0.0025, // 0.25%
  IBIT: 0.0025, // 0.25%
  AMZN: 0.0, // Direct equity, no fund expense
};

const DEFAULT_CORRELATIONS = Object.freeze({
  AMZN_AVUV: 0.55,
  AMZN_IBIT: 0.25,
  AMZN_QQQM: 0.85,
  AMZN_SMH: 0.8,
  AMZN_SPMO: 0.78,
  AMZN_VOO: 0.7,
  AMZN_VXUS: 0.6,
  AVUV_IBIT: 0.2,
  AVUV_QQQM: 0.7,
  AVUV_SMH: 0.65,
  AVUV_SPMO: 0.6,
  AVUV_VOO: 0.85,
  AVUV_VXUS: 0.725,
  IBIT_QQQM: 0.25,
  IBIT_SMH: 0.225,
  IBIT_SPMO: 0.25,
  IBIT_VOO: 0.2,
  IBIT_VXUS: 0.2,
  QQQM_SMH: 0.9,
  QQQM_SPMO: 0.86,
  QQQM_VOO: 0.9,
  QQQM_VXUS: 0.725,
  SMH_VOO: 0.85,
  SMH_SPMO: 0.8,
  SMH_VXUS: 0.725,
  SPMO_VOO: 0.92,
  SPMO_VXUS: 0.7,
  VOO_VXUS: 0.8,
});

let correlations = { ...DEFAULT_CORRELATIONS };
if (typeof window !== 'undefined') {
  window.correlations = correlations;
}

const CORRELATION_LOOKBACK_DAYS = 90;
const CORRELATION_CACHE_KEY = 'portfolioCorrelationMatrix';
const CORRELATION_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const VOLATILITY_CACHE_KEY = 'portfolioVolatilityMap';
const VOLATILITY_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
const TRADING_DAYS_PER_YEAR = 252;
const SERIES_CACHE_PREFIX = 'alphaSeries_';
const SERIES_CACHE_TTL_MS = 1000 * 60 * 60 * 6;
const ALPHA_VANTAGE_RATE_LIMIT_MS = 12000;
const ALPHA_VANTAGE_MAX_RETRIES = 3;

let lastAlphaVantageCallTs = 0;
const memorySeriesCache = {};
const returnSeriesCache = {};

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function safeParseJSON(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    return null;
  }
}

function getCachedItem(key, ttlMs) {
  if (typeof localStorage === 'undefined') {
    return null;
  }
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      return null;
    }
    const parsed = safeParseJSON(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }
    const { timestamp, value } = parsed;
    const stamp = Number(timestamp);
    if (!Number.isFinite(stamp) || Date.now() - stamp > ttlMs) {
      localStorage.removeItem(key);
      return null;
    }
    return value;
  } catch (error) {
    console.warn('Failed to access localStorage cache for', key, error);
    return null;
  }
}

function setCachedItem(key, value) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        timestamp: Date.now(),
        value,
      })
    );
  } catch (error) {
    console.warn('Failed to persist localStorage cache for', key, error);
  }
}

async function fetchAlphaVantageJson(url, attempt = 0) {
  const now = Date.now();
  const waitMs = Math.max(0, ALPHA_VANTAGE_RATE_LIMIT_MS - (now - lastAlphaVantageCallTs));
  if (waitMs > 0) {
    await sleep(waitMs);
  }

  let response;
  try {
    response = await fetch(url);
  } catch (networkError) {
    if (attempt < ALPHA_VANTAGE_MAX_RETRIES) {
      await sleep(ALPHA_VANTAGE_RATE_LIMIT_MS);
      return fetchAlphaVantageJson(url, attempt + 1);
    }
    throw networkError;
  } finally {
    lastAlphaVantageCallTs = Date.now();
  }

  let data = null;
  try {
    data = await response.json();
  } catch (parseError) {
    if (attempt < ALPHA_VANTAGE_MAX_RETRIES) {
      await sleep(ALPHA_VANTAGE_RATE_LIMIT_MS);
      return fetchAlphaVantageJson(url, attempt + 1);
    }
    throw parseError;
  }

  if (data && typeof data === 'object' && data.Note && attempt < ALPHA_VANTAGE_MAX_RETRIES) {
    await sleep(ALPHA_VANTAGE_RATE_LIMIT_MS);
    return fetchAlphaVantageJson(url, attempt + 1);
  }

  return data;
}

async function fetchDailyAdjustedSeries(symbol, options = {}) {
  const allowCacheRead = options?.useCache !== false;
  const allowCacheWrite = options?.cacheResult !== false;
  const cacheKey = `${SERIES_CACHE_PREFIX}${symbol}`;
  if (allowCacheRead && Array.isArray(memorySeriesCache[symbol]) && memorySeriesCache[symbol].length) {
    return memorySeriesCache[symbol];
  }
  if (allowCacheRead) {
    const cachedSeries = getCachedItem(cacheKey, SERIES_CACHE_TTL_MS);
    if (Array.isArray(cachedSeries) && cachedSeries.length) {
      memorySeriesCache[symbol] = cachedSeries;
      return cachedSeries;
    }
  }

  const url = `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}&outputsize=compact`;
  const json = await fetchAlphaVantageJson(url);
  const series = json && json['Time Series (Daily)'];
  if (!series || typeof series !== 'object') {
    return [];
  }

  const entries = Object.entries(series)
    .map(([date, values]) => ({
      date,
      price: Number.parseFloat(values['5. adjusted close']),
    }))
    .filter((point) => Number.isFinite(point.price))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (entries.length) {
    memorySeriesCache[symbol] = entries;
    if (allowCacheWrite) {
      setCachedItem(cacheKey, entries);
    }
  }

  return entries;
}

async function getReturnSeriesForSymbol(symbol, options = {}) {
  const allowCacheRead = options?.useCache !== false;
  const allowCacheWrite = options?.cacheResult !== false;
  if (allowCacheRead && Array.isArray(returnSeriesCache[symbol]) && returnSeriesCache[symbol].length) {
    return returnSeriesCache[symbol];
  }
  const priceSeries = await fetchDailyAdjustedSeries(symbol, {
    useCache: allowCacheRead,
    cacheResult: allowCacheWrite,
  });
  const returns = toLogReturns(priceSeries);
  if (allowCacheWrite && returns.length) {
    returnSeriesCache[symbol] = returns;
  }
  return returns;
}

function toLogReturns(series, lookbackDays = CORRELATION_LOOKBACK_DAYS) {
  if (!Array.isArray(series) || series.length < 2) {
    return [];
  }
  const windowSize = Math.max(lookbackDays + 1, 2);
  const selected =
    series.length > windowSize ? series.slice(series.length - windowSize) : series.slice();
  const returns = [];
  for (let i = 1; i < selected.length; i += 1) {
    const prev = selected[i - 1];
    const current = selected[i];
    if (prev.price > 0 && current.price > 0) {
      returns.push({
        date: current.date,
        value: Math.log(current.price / prev.price),
      });
    }
  }
  return returns;
}

function alignReturnSeries(returnsA, returnsB) {
  if (!Array.isArray(returnsA) || !Array.isArray(returnsB)) {
    return [[], []];
  }
  const mapB = new Map(returnsB.map((entry) => [entry.date, entry.value]));
  const alignedA = [];
  const alignedB = [];
  returnsA.forEach((entry) => {
    if (mapB.has(entry.date)) {
      alignedA.push(entry.value);
      alignedB.push(mapB.get(entry.date));
    }
  });
  return [alignedA, alignedB];
}

function pearsonCorrelation(valuesA, valuesB) {
  const length = Math.min(valuesA.length, valuesB.length);
  if (length < 2) {
    return null;
  }

  let sumA = 0;
  let sumB = 0;
  for (let i = 0; i < length; i += 1) {
    sumA += valuesA[i];
    sumB += valuesB[i];
  }
  const meanA = sumA / length;
  const meanB = sumB / length;

  let covariance = 0;
  let varianceA = 0;
  let varianceB = 0;
  for (let i = 0; i < length; i += 1) {
    const da = valuesA[i] - meanA;
    const db = valuesB[i] - meanB;
    covariance += da * db;
    varianceA += da * da;
    varianceB += db * db;
  }
  if (varianceA <= 0 || varianceB <= 0) {
    return null;
  }
  return covariance / Math.sqrt(varianceA * varianceB);
}

function sampleStandardDeviation(values) {
  const length = Array.isArray(values) ? values.length : 0;
  if (length < 2) {
    return null;
  }
  let sum = 0;
  for (let i = 0; i < length; i += 1) {
    sum += values[i];
  }
  const mean = sum / length;
  let variance = 0;
  for (let i = 0; i < length; i += 1) {
    const diff = values[i] - mean;
    variance += diff * diff;
  }
  variance /= length - 1;
  if (variance <= 0) {
    return null;
  }
  return Math.sqrt(variance);
}

async function buildCorrelationMatrixFromAlphaVantage(symbols, options = {}) {
  const useCache = options?.useCache !== false;
  const forceRefresh = options?.forceRefresh === true;
  const returnsBySymbol = {};

  for (let i = 0; i < symbols.length; i += 1) {
    const symbol = symbols[i];
    returnsBySymbol[symbol] = await getReturnSeriesForSymbol(symbol, {
      useCache: useCache && !forceRefresh,
      cacheResult: !forceRefresh,
    });
  }

  const matrix = {};
  for (let i = 0; i < symbols.length; i += 1) {
    for (let j = i + 1; j < symbols.length; j += 1) {
      const [alignedA, alignedB] = alignReturnSeries(
        returnsBySymbol[symbols[i]],
        returnsBySymbol[symbols[j]]
      );
      const corr = pearsonCorrelation(alignedA, alignedB);
      if (Number.isFinite(corr)) {
        const key =
          symbols[i] < symbols[j]
            ? `${symbols[i]}_${symbols[j]}`
            : `${symbols[j]}_${symbols[i]}`;
        matrix[key] = corr;
      }
    }
  }

  return matrix;
}

async function loadCorrelationsFromAlphaVantage(options = {}) {
  const symbols = Array.isArray(assetKeys) ? assetKeys : null;
  if (!symbols || !symbols.length) {
    return correlations;
  }

  const useCache = options?.useCache !== false;
  const forceRefresh = options?.forceRefresh === true;

  if (useCache && !forceRefresh) {
    const cachedMatrix = getCachedItem(CORRELATION_CACHE_KEY, CORRELATION_CACHE_TTL_MS);
    if (cachedMatrix && typeof cachedMatrix === 'object') {
      correlations = { ...DEFAULT_CORRELATIONS, ...cachedMatrix };
      window.correlations = correlations;
      window.correlationsLastUpdated = Date.now();
      return correlations;
    }
  }

  const matrix = await buildCorrelationMatrixFromAlphaVantage(symbols, {
    useCache,
    forceRefresh,
  });
  if (Object.keys(matrix).length) {
    correlations = { ...DEFAULT_CORRELATIONS, ...matrix };
    if (useCache) {
      setCachedItem(CORRELATION_CACHE_KEY, matrix);
    }
  } else {
    correlations = { ...DEFAULT_CORRELATIONS };
  }
  window.correlations = correlations;
  window.correlationsLastUpdated = Date.now();
  return correlations;
}

window.loadCorrelationsFromAlphaVantage = loadCorrelationsFromAlphaVantage;

async function buildVolatilityMapFromAlphaVantage(symbols, options = {}) {
  const useCache = options?.useCache !== false;
  const forceRefresh = options?.forceRefresh === true;
  const results = {};

  for (let i = 0; i < symbols.length; i += 1) {
    const symbol = symbols[i];
    const returnSeries = await getReturnSeriesForSymbol(symbol, {
      useCache: useCache && !forceRefresh,
      cacheResult: !forceRefresh,
    });

    const values = Array.isArray(returnSeries)
      ? returnSeries.map((point) => point.value).filter((value) => Number.isFinite(value))
      : [];
    const dailyStd = sampleStandardDeviation(values);
    if (Number.isFinite(dailyStd) && dailyStd > 0) {
      results[symbol] = dailyStd * Math.sqrt(TRADING_DAYS_PER_YEAR);
    }
  }

  return results;
}

async function loadVolatilitiesFromAlphaVantage(options = {}) {
  const symbols = Array.isArray(assetKeys) ? assetKeys : null;
  if (!symbols || !symbols.length) {
    return volatilities;
  }

  const useCache = options?.useCache !== false;
  const forceRefresh = options?.forceRefresh === true;

  if (useCache && !forceRefresh) {
    const cachedMap = getCachedItem(VOLATILITY_CACHE_KEY, VOLATILITY_CACHE_TTL_MS);
    if (cachedMap && typeof cachedMap === 'object') {
      volatilities = { ...STATIC_DEFAULT_VOLATILITIES, ...cachedMap };
      if (typeof window !== 'undefined') {
        window.volatilities = volatilities;
        window.volatilitiesLastUpdated = Date.now();
      }
      return volatilities;
    }
  }

  const volatilityMap = await buildVolatilityMapFromAlphaVantage(symbols, {
    useCache,
    forceRefresh,
  });
  if (Object.keys(volatilityMap).length) {
    volatilities = { ...STATIC_DEFAULT_VOLATILITIES, ...volatilityMap };
    if (useCache) {
      setCachedItem(VOLATILITY_CACHE_KEY, volatilityMap);
    }
  } else {
    volatilities = { ...STATIC_DEFAULT_VOLATILITIES };
  }

  if (typeof window !== 'undefined') {
    window.volatilities = volatilities;
    window.volatilitiesLastUpdated = Date.now();
  }

  return volatilities;
}

window.loadVolatilitiesFromAlphaVantage = loadVolatilitiesFromAlphaVantage;

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
  if (["VOO", "AVUV"].includes(ticker)) {
    return `AMEX:${ticker}`;
  }
  if (["QQQM", "SMH", "VXUS"].includes(ticker)) {
    return `NASDAQ:${ticker}`;
  }
  if (ticker === "SPMO") {
    return `AMEX:SPMO`;
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
  SPMO: {
    desc: "Invesco S&P 500 Momentum ETF amplifying the core sleeve with a systematic momentum tilt across leading US large caps.",
    pros: "Maintains exposure to the market's strongest trends. Complements VOO by overweighting persistent outperformers. Rules-based process reduces behavioural bias.",
    cons: "Momentum crashes can trigger sharp reversals. Higher turnover may elevate taxable distributions. More concentrated than broad cap-weighted benchmarks.",
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
