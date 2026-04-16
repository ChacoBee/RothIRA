export const FINNHUB_KEY_STORAGE_KEY = 'hangar.finnhubKey';
export const FINNHUB_QUERY_PARAMS = ['finnhubKey', 'finnhubToken', 'token'];
export const FINNHUB_NEWS_PAGE_SIZE = 4;
export const FINNHUB_NEWS_LIMIT = 24;

export function sanitizeFinnhubKey(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function readEnvFinnhubKey(viteEnv = {}) {
  return sanitizeFinnhubKey(viteEnv?.VITE_FINNHUB_KEY || '');
}

export function readStoredFinnhubKey(storage = globalThis?.localStorage) {
  if (!storage || typeof storage.getItem !== 'function') {
    return '';
  }

  try {
    return sanitizeFinnhubKey(storage.getItem(FINNHUB_KEY_STORAGE_KEY) || '');
  } catch {
    return '';
  }
}

export function persistFinnhubKey(value, storage = globalThis?.localStorage) {
  if (!storage || typeof storage.setItem !== 'function') {
    return;
  }

  const sanitized = sanitizeFinnhubKey(value);
  try {
    if (sanitized) {
      storage.setItem(FINNHUB_KEY_STORAGE_KEY, sanitized);
    } else if (typeof storage.removeItem === 'function') {
      storage.removeItem(FINNHUB_KEY_STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures; runtime config still works.
  }
}

export function discoverFinnhubKey({
  viteEnv = {},
  search = '',
  appConfig = {},
  storage = globalThis?.localStorage,
} = {}) {
  let key = '';
  let source = 'missing';

  const envKey = readEnvFinnhubKey(viteEnv);
  if (envKey) {
    return {
      key: envKey,
      source: 'env',
    };
  }

  try {
    const params = new URLSearchParams(search || '');
    for (const param of FINNHUB_QUERY_PARAMS) {
      const candidate = sanitizeFinnhubKey(params.get(param));
      if (candidate) {
        key = candidate;
        source = 'query';
        persistFinnhubKey(candidate, storage);
        break;
      }
    }
  } catch {
    // Ignore malformed query strings.
  }

  if (!key) {
    const stored = readStoredFinnhubKey(storage);
    if (stored) {
      key = stored;
      source = 'storage';
    }
  }

  if (!key) {
    const configKey = sanitizeFinnhubKey(appConfig?.marketData?.finnhubKey || '');
    if (configKey) {
      key = configKey;
      source = 'config';
    }
  }

  return { key, source };
}

export function normalizeFinnhubNewsItems(items, limit = FINNHUB_NEWS_LIMIT) {
  if (!Array.isArray(items)) {
    return [];
  }

  return items
    .map((item, index) => ({
      id: item?.id || item?.headline || `news-${index}`,
      headline: String(item?.headline || '').trim(),
      summary: String(item?.summary || '').trim(),
      source: String(item?.source || 'Finnhub').trim(),
      url: String(item?.url || '').trim(),
      image: String(item?.image || '').trim(),
      category: String(item?.category || '').trim(),
      datetime: Number(item?.datetime) || 0,
    }))
    .filter((item) => item.headline && item.url)
    .sort((a, b) => b.datetime - a.datetime)
    .slice(0, limit);
}

export async function fetchFinnhubMarketNews({
  apiKey,
  fetchImpl = globalThis.fetch,
  category = 'general',
  limit = FINNHUB_NEWS_LIMIT,
} = {}) {
  const sanitizedKey = sanitizeFinnhubKey(apiKey);
  if (!sanitizedKey) {
    throw new Error('FINNHUB_KEY_MISSING');
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('FETCH_UNAVAILABLE');
  }

  const endpoint = new URL('https://finnhub.io/api/v1/news');
  endpoint.searchParams.set('category', category);
  endpoint.searchParams.set('token', sanitizedKey);

  const response = await fetchImpl(endpoint.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`FINNHUB_NEWS_${response.status}`);
  }

  const payload = await response.json();
  return normalizeFinnhubNewsItems(payload, limit);
}
