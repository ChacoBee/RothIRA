// Alpha Vantage API Configuration
const ALPHA_VANTAGE_BASE_URL = 'https://www.alphavantage.co/query';
const ALPHA_VANTAGE_KEY_STORAGE_KEY = 'hangar.alphaVantageKey';
const ALPHA_VANTAGE_KEY_QUERY_PARAMS = ['alphaKey', 'alphaVantageKey'];
const ALPHA_VANTAGE_DEMO_KEY = 'demo';
const ALPHA_VANTAGE_KEY_EVENT = 'alpha-vantage-key-changed';

function sanitizeAlphaVantageKey(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function readStoredAlphaVantageKey() {
  if (typeof localStorage === 'undefined') {
    return '';
  }
  try {
    return sanitizeAlphaVantageKey(localStorage.getItem(ALPHA_VANTAGE_KEY_STORAGE_KEY) || '');
  } catch (error) {
    console.warn('Unable to read Alpha Vantage key from storage', error);
    return '';
  }
}

function persistAlphaVantageKey(value) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  try {
    if (!value || value === ALPHA_VANTAGE_DEMO_KEY) {
      localStorage.removeItem(ALPHA_VANTAGE_KEY_STORAGE_KEY);
    } else {
      localStorage.setItem(ALPHA_VANTAGE_KEY_STORAGE_KEY, value);
    }
  } catch (error) {
    console.warn('Unable to persist Alpha Vantage key', error);
  }
}

function discoverAlphaVantageKey() {
  let resolved = '';
  let source = 'fallback';

  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search || '');
      for (let i = 0; i < ALPHA_VANTAGE_KEY_QUERY_PARAMS.length; i += 1) {
        const candidate = sanitizeAlphaVantageKey(params.get(ALPHA_VANTAGE_KEY_QUERY_PARAMS[i]));
        if (candidate) {
          resolved = candidate;
          source = 'query';
          persistAlphaVantageKey(candidate);
          break;
        }
      }
    } catch (error) {
      console.warn('Unable to read Alpha Vantage key from query string', error);
    }

    if (!resolved) {
      const stored = readStoredAlphaVantageKey();
      if (stored) {
        resolved = stored;
        source = 'storage';
      }
    }

    if (!resolved && window.APP_CONFIG && window.APP_CONFIG.marketData) {
      const configKey = sanitizeAlphaVantageKey(window.APP_CONFIG.marketData.alphaVantageKey);
      if (configKey) {
        resolved = configKey;
        source = 'config';
      }
    }
  }

  if (!resolved) {
    resolved = ALPHA_VANTAGE_DEMO_KEY;
  }

  return { key: resolved, source };
}

function isAlphaVantageDemoKey(value) {
  return !value || value.toLowerCase() === ALPHA_VANTAGE_DEMO_KEY;
}

let alphaVantageKeyState = discoverAlphaVantageKey();

function dispatchAlphaVantageEvent(detailExtra) {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') {
    return;
  }
  try {
    window.dispatchEvent(
      new CustomEvent(ALPHA_VANTAGE_KEY_EVENT, {
        detail: {
          key: alphaVantageKeyState.key,
          isDemo: isAlphaVantageDemoKey(alphaVantageKeyState.key),
          source: alphaVantageKeyState.source,
          ...(detailExtra || {}),
        },
      })
    );
  } catch (error) {
    console.warn('Alpha Vantage key event dispatch failed', error);
  }
}

function getAlphaVantageApiKey() {
  return alphaVantageKeyState.key || ALPHA_VANTAGE_DEMO_KEY;
}

function isAlphaVantageConfigured() {
  return !isAlphaVantageDemoKey(getAlphaVantageApiKey());
}

function setAlphaVantageApiKey(newKey, source = 'user', options = {}) {
  const sanitized = sanitizeAlphaVantageKey(newKey);
  const isDemo = isAlphaVantageDemoKey(sanitized);
  alphaVantageKeyState = {
    key: isDemo ? ALPHA_VANTAGE_DEMO_KEY : sanitized,
    source: isDemo ? 'demo' : source,
  };

  if (options.persist !== false) {
    persistAlphaVantageKey(isDemo ? '' : sanitized);
  }

  if (options.emitEvent !== false) {
    dispatchAlphaVantageEvent();
  }

  return alphaVantageKeyState.key;
}

function clearAlphaVantageApiKey(options = {}) {
  if (options.persist !== false) {
    persistAlphaVantageKey('');
  }
  return setAlphaVantageApiKey('', 'fallback', { ...options, persist: false });
}

const AlphaVantageKeyManager = {
  getKey() {
    return getAlphaVantageApiKey();
  },
  isDemo() {
    return !isAlphaVantageConfigured();
  },
  getSource() {
    return alphaVantageKeyState.source;
  },
  setKey(value) {
    return setAlphaVantageApiKey(value, 'user');
  },
  clearKey() {
    return clearAlphaVantageApiKey();
  },
};

if (typeof window !== 'undefined') {
  window.AlphaVantageKeyManager = AlphaVantageKeyManager;
  if (!isAlphaVantageConfigured()) {
    console.info(
      '[Alpha Vantage] Chưa có API key tuỳ chỉnh, dashboard sẽ dùng dữ liệu tĩnh cho đến khi bạn thêm key.'
    );
  }
}

// Sample Data (Based on your Sheet) - Will be updated with real data
let initialStockData = {
  VOO: {
    target: 45.0,
    currentValue: 45.0,
    currentPercent: 45.0,
    sector: 'Core US',
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
  AVDV: {
    target: 10.0,
    currentValue: 10.0,
    currentPercent: 10.0,
    sector: 'International Small Cap Value',
    region: 'Global ex-US',
    exposureCategory: 'international',
    assetClass: 'equity',
  },
  SPMO: {
    target: 10.0,
    currentValue: 10.0,
    currentPercent: 10.0,
    sector: 'Momentum Large Cap',
    region: 'United States',
    exposureCategory: 'us',
    assetClass: 'equity',
  },
  AMZN: {
    target: 5.0,
    currentValue: 5.0,
    currentPercent: 5.0,
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
  if (!isAlphaVantageConfigured()) {
    return null;
  }
  try {
    const historicalSeries = await fetchDailyAdjustedSeries(symbol);
    const latestPoint = Array.isArray(historicalSeries)
      ? historicalSeries[historicalSeries.length - 1]
      : null;
    if (latestPoint && Number.isFinite(latestPoint.price)) {
      return latestPoint.price;
    }

    const apiKey = encodeURIComponent(getAlphaVantageApiKey());
    const encodedSymbol = encodeURIComponent(symbol);
    const url = `${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${encodedSymbol}&apikey=${apiKey}`;
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
  if (!isAlphaVantageConfigured()) {
    console.info('[Alpha Vantage] Bỏ qua đồng bộ giá trực tiếp vì chưa có API key tùy chỉnh.');
    return initialStockData;
  }
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
const RISK_FREE_RATE = 0.0265; // 2.65% annual risk-free rate (matches Sharpe ratio assumptions)
const BENCHMARK_EXPECTED_RETURN = 0.1475; // Vanguard Total Stock Market ETF CAGR (Jan 2020-Oct 2025)
const BENCHMARK_VOLATILITY = 0.1791; // Vanguard Total Stock Market ETF annualised stdev (Jan 2020-Oct 2025)
const EQUITY_RISK_PREMIUM = Math.max(0, BENCHMARK_EXPECTED_RETURN - RISK_FREE_RATE);

const assetBetas = {
  VOO: 1.0,
  VXUS: 0.8,
  AVUV: 1.02,
  AVDV: 0.95,
  SPMO: 1.02,
  AMZN: 1.1,
};

const BASE_ASSET_BETAS = Object.freeze({ ...assetBetas });

const factorNames = ['MKT', 'SMB', 'HML', 'MOM'];

const multiFactorLoadings = {
  VOO:  { MKT: 1.00, SMB: -0.10, HML:  0.00, MOM: 0.10 },
  VXUS: { MKT: 0.80, SMB:  0.05, HML:  0.10, MOM: 0.10 },
  AVUV: { MKT: 1.46, SMB:  0.80, HML:  0.50, MOM: -0.05 },
  AVDV: { MKT: 1.25, SMB:  0.75, HML:  0.55, MOM: -0.08 },
  SPMO: { MKT: 1.05, SMB: -0.20, HML: -0.10, MOM: 0.78 },
  AMZN: { MKT: 1.84, SMB: -0.20, HML: -0.30, MOM: 0.50 },
};


const factorCovariances = {
  MKT: { MKT: 0.017663, SMB:  0.001374, HML: -0.002355, MOM:  0.000883 },
  SMB: { MKT: 0.001374, SMB:  0.010685, HML:  0.002748, MOM: -0.001374 },
  HML: { MKT: -0.002355, SMB: 0.002748, HML:  0.007850, MOM: -0.004710 },
  MOM: { MKT: 0.000883, SMB: -0.001374, HML: -0.004710, MOM:  0.017663 },
};

const assetResidualVols = {
  VOO : 0.068918569,
  VXUS: 0.153068108,
  AVUV: 0.232345736,
  AVDV: 0.168514851,
  SPMO: 0.205113247,
  AMZN: 0.337801846,
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

// Calibrated annualised returns (Jan 2020 - Oct 2025 window, matches Portfolio Visualizer backtest)
const REALISED_EXPECTED_RETURNS = {
  VOO: 0.1545,
  VXUS: 0.0822,
  AVUV: 0.1245,
  AVDV: 0.1172,
  SPMO: 0.2147,
  AMZN: 0.1813,
};

const expectedReturns = assetKeys.reduce((acc, key) => {
  acc[key] =
    REALISED_EXPECTED_RETURNS[key] !== undefined
      ? REALISED_EXPECTED_RETURNS[key]
      : deriveCapmExpectedReturn(assetBetas[key]);
  return acc;
}, {});

const BASE_EXPECTED_RETURNS = Object.freeze({ ...expectedReturns });

// Calibrated annualised volatility (Jan 2020 - Oct 2025 window)
const STATIC_DEFAULT_VOLATILITIES = Object.freeze({
  VOO: 0.1739,
  VXUS: 0.1676,
  AVUV: 0.2744,
  AVDV: 0.2054,
  SPMO: 0.1857,
  AMZN: 0.3219,
});

let volatilities = { ...STATIC_DEFAULT_VOLATILITIES };
if (typeof window !== 'undefined') {
  window.volatilities = volatilities;
}

const BASE_VOLATILITIES = Object.freeze({ ...STATIC_DEFAULT_VOLATILITIES });

const expenseRatios = {
  VOO : 0.0003, // 0.03%
  VXUS: 0.0005, // 0.05%
  AVUV: 0.0025, // 0.25%
  AVDV: 0.0036, // 0.36%
  SPMO: 0.0013, // 0.13%
  AMZN: 0.0, // Direct equity, no fund expense
};

const DEFAULT_CORRELATIONS = Object.freeze({
  AMZN_AVUV: 0.36,
  AMZN_AVDV: 0.29,
  AMZN_SPMO: 0.57,
  AMZN_VOO: 0.64,
  AMZN_VXUS: 0.38,
  AVUV_AVDV: 0.85,
  AVUV_SPMO: 0.63,  
  AVUV_VOO: 0.81,
  AVUV_VXUS: 0.79,
  AVDV_SPMO: 0.65,
  AVDV_VOO: 0.82,
  AVDV_VXUS: 0.96,
  SPMO_VOO: 0.89,
  SPMO_VXUS: 0.69,
  VOO_VXUS: 0.85,
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
  if (!isAlphaVantageConfigured()) {
    return [];
  }
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

  const apiKey = encodeURIComponent(getAlphaVantageApiKey());
  const encodedSymbol = encodeURIComponent(symbol);
  const url = `${ALPHA_VANTAGE_BASE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${encodedSymbol}&apikey=${apiKey}&outputsize=compact`;
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
  if (!isAlphaVantageConfigured()) {
    correlations = { ...DEFAULT_CORRELATIONS };
    if (typeof window !== 'undefined') {
      window.correlations = correlations;
      window.correlationsLastUpdated = Date.now();
    }
    console.info('[Alpha Vantage] Bỏ qua cập nhật ma trận tương quan vì chưa có API key hợp lệ.');
    return correlations;
  }
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
  if (!isAlphaVantageConfigured()) {
    volatilities = { ...STATIC_DEFAULT_VOLATILITIES };
    if (typeof window !== 'undefined') {
      window.volatilities = volatilities;
      window.volatilitiesLastUpdated = Date.now();
    }
    console.info('[Alpha Vantage] Bỏ qua cập nhật volatility vì chưa có API key hợp lệ.');
    return volatilities;
  }
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
  benchmarkVolatility: BENCHMARK_VOLATILITY,
  equityRiskPremium: EQUITY_RISK_PREMIUM,
  expectedReturns: BASE_EXPECTED_RETURNS,
  volatilities: BASE_VOLATILITIES,
  assetBetas: BASE_ASSET_BETAS,
  factorNames: Object.freeze([...factorNames]),
  multiFactorLoadings: BASE_MULTI_FACTOR_LOADINGS,
  factorCovariances: BASE_FACTOR_COVARIANCES,
  residualVols: BASE_ASSET_RESIDUAL_VOLS,
  guardrailWeight: 0.1,
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
  if (["VOO", "AVUV", "AVDV", "SPMO"].includes(ticker)) {
    return `AMEX:${ticker}`;
  }
  if (ticker === "VXUS") {
    return `NASDAQ:VXUS`;
  }
  if (ticker === "AMZN") {
    return `NASDAQ:AMZN`;
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
  AVDV: {
    desc: "Avantis international small-cap value ETF drawing from developed markets outside the US. Extends the value tilt into non-US small caps.",
    pros: "Broad global reach beyond domestic holdings. Captures value and size factors abroad while remaining tax-efficient. Complements VXUS with deeper factor exposure.",
    cons: "Currency swings and geopolitical shocks can drive larger drawdowns. Trading spreads can widen during low-liquidity sessions.",
  },
  SPMO: {
    desc: "Invesco S&P 500 Momentum ETF capturing large-cap US names with sustained price strength and overweighting recent winners.",
    pros: "Systematic momentum tilt boosts exposure to leadership sectors. Maintains diversification across the S&P 500 while adding tactical offence. Moderate 0.13% fee.",
    cons: "Momentum factor can whipsaw during regime shifts. Portfolio may lag broader market when leadership rotates back to value or defensives.",
  },
  AMZN: {
    desc: "Direct equity stake in Amazon across e-commerce, AWS cloud, and logistics. Single-stock satellite delivering outsized growth potential.",
    pros: "Exposure to a dominant platform with multiple growth engines. Optionality across advertising, media, and AI services.",
    cons: "Single-company risk is elevated; performance hinges on management execution. Valuation multiples can compress quickly in risk-off regimes.",
  },
};
