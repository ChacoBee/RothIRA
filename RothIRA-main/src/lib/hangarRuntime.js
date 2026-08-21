const inFlightSeriesRequests = new Map();

function getBridge() {
  if (typeof window === 'undefined') {
    return null;
  }
  return window.HangarDataBridge || null;
}

export function readPortfolioSnapshot() {
  const bridge = getBridge();
  if (!bridge || typeof bridge.getCurrentPortfolioSnapshot !== 'function') {
    return null;
  }
  try {
    return bridge.getCurrentPortfolioSnapshot();
  } catch (error) {
    console.warn('Unable to read current portfolio snapshot from runtime bridge.', error);
    return null;
  }
}

export function readAlphaVantageState() {
  const bridge = getBridge();
  if (!bridge || typeof bridge.getAlphaVantageState !== 'function') {
    return { configured: false, source: 'missing' };
  }
  try {
    return bridge.getAlphaVantageState() || { configured: false, source: 'missing' };
  } catch (error) {
    console.warn('Unable to read Alpha Vantage state from runtime bridge.', error);
    return { configured: false, source: 'missing' };
  }
}

export async function fetchHistoricalSeries(symbol, options = {}) {
  const bridge = getBridge();
  if (!bridge || typeof bridge.fetchDailyAdjustedSeries !== 'function') {
    return [];
  }

  const normalizedSymbol = String(symbol || '').trim().toUpperCase();
  if (!normalizedSymbol) {
    return [];
  }

  const outputSize =
    String(options?.outputSize || 'full').trim().toLowerCase() === 'compact'
      ? 'compact'
      : 'full';
  const cacheKey = `${normalizedSymbol}:${outputSize}`;

  if (inFlightSeriesRequests.has(cacheKey)) {
    return inFlightSeriesRequests.get(cacheKey);
  }

  const request = Promise.resolve(
    bridge.fetchDailyAdjustedSeries(normalizedSymbol, {
      ...options,
      outputSize,
    })
  )
    .catch((error) => {
      console.warn(`Unable to fetch historical series for ${normalizedSymbol}.`, error);
      return [];
    })
    .finally(() => {
      inFlightSeriesRequests.delete(cacheKey);
    });

  inFlightSeriesRequests.set(cacheKey, request);
  return request;
}

export async function fetchHistoricalSeriesMap(tickers, options = {}) {
  const uniqueTickers = Array.from(
    new Set(
      (Array.isArray(tickers) ? tickers : [])
        .map((ticker) => String(ticker || '').trim().toUpperCase())
        .filter(Boolean)
    )
  );

  const seriesEntries = await Promise.all(
    uniqueTickers.map(async (ticker) => [
      ticker,
      await fetchHistoricalSeries(ticker, options),
    ])
  );

  return Object.fromEntries(seriesEntries);
}

export function readLocalStorageJson(key, fallbackValue) {
  if (typeof window === 'undefined') {
    return fallbackValue;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallbackValue;
    }
    return JSON.parse(raw);
  } catch {
    return fallbackValue;
  }
}

export function writeLocalStorageJson(key, value) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Unable to persist ${key} to localStorage.`, error);
  }
}

