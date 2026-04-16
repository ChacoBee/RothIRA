import { FINNHUB_NEWS_LIMIT, normalizeFinnhubNewsItems } from '../../src/lib/finnhub.mjs';

export const DEFAULT_FINNHUB_PROXY_HOST = '127.0.0.1';
export const DEFAULT_FINNHUB_PROXY_PORT = 8787;
export const MAX_FINNHUB_NEWS_LIMIT = 48;

function sanitizeString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export function parseAllowedOrigins(value = '') {
  return sanitizeString(value)
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function sanitizeFinnhubNewsCategory(value) {
  const sanitized = sanitizeString(value).toLowerCase();
  return sanitized || 'general';
}

export function sanitizeFinnhubNewsLimit(value, fallback = FINNHUB_NEWS_LIMIT) {
  const parsed = Number.parseInt(String(value ?? fallback), 10);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return Math.min(MAX_FINNHUB_NEWS_LIMIT, Math.max(1, parsed));
}

export function readFinnhubProxyConfig(env = process.env) {
  const port = Number.parseInt(sanitizeString(env.FINNHUB_PROXY_PORT), 10);

  return {
    apiKey: sanitizeString(env.FINNHUB_API_KEY),
    host: sanitizeString(env.FINNHUB_PROXY_HOST) || DEFAULT_FINNHUB_PROXY_HOST,
    port: Number.isFinite(port) && port > 0 ? port : DEFAULT_FINNHUB_PROXY_PORT,
    allowedOrigins: parseAllowedOrigins(env.FINNHUB_ALLOWED_ORIGINS),
  };
}

export function resolveAllowedOrigin(origin = '', config = readFinnhubProxyConfig()) {
  const allowedOrigins = Array.isArray(config.allowedOrigins) ? config.allowedOrigins : [];
  if (!allowedOrigins.length) {
    return '*';
  }

  const sanitizedOrigin = sanitizeString(origin);
  if (!sanitizedOrigin) {
    return allowedOrigins[0];
  }

  return allowedOrigins.includes(sanitizedOrigin) ? sanitizedOrigin : '';
}

export function buildCorsHeaders(origin = '', config = readFinnhubProxyConfig()) {
  const allowOrigin = resolveAllowedOrigin(origin, config);
  return {
    'Access-Control-Allow-Origin': allowOrigin || 'null',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    Vary: 'Origin',
  };
}

export function createResponse({
  status = 200,
  body = '',
  contentType = 'application/json; charset=utf-8',
  origin = '',
  config = readFinnhubProxyConfig(),
} = {}) {
  return {
    status,
    headers: {
      ...buildCorsHeaders(origin, config),
      'Content-Type': contentType,
    },
    body,
  };
}

export function createJsonResponse(status, payload, origin = '', config = readFinnhubProxyConfig()) {
  return createResponse({
    status,
    body: status === 204 ? '' : JSON.stringify(payload),
    origin,
    config,
  });
}

export async function fetchFinnhubNewsFromUpstream({
  apiKey,
  category = 'general',
  limit = FINNHUB_NEWS_LIMIT,
  fetchImpl = globalThis.fetch,
} = {}) {
  const sanitizedKey = sanitizeString(apiKey);
  if (!sanitizedKey) {
    throw new Error('FINNHUB_PROXY_KEY_MISSING');
  }
  if (typeof fetchImpl !== 'function') {
    throw new Error('FETCH_UNAVAILABLE');
  }

  const endpoint = new URL('https://finnhub.io/api/v1/news');
  endpoint.searchParams.set('category', sanitizeFinnhubNewsCategory(category));
  endpoint.searchParams.set('token', sanitizedKey);

  const response = await fetchImpl(endpoint.toString(), {
    headers: {
      Accept: 'application/json',
    },
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`FINNHUB_UPSTREAM_${response.status}`);
  }

  const payload = await response.json();
  return normalizeFinnhubNewsItems(payload, sanitizeFinnhubNewsLimit(limit));
}

export function describeFinnhubProxyError(error) {
  const message = error instanceof Error ? error.message : '';

  if (message === 'FINNHUB_PROXY_KEY_MISSING') {
    return {
      status: 503,
      error: 'FINNHUB_API_KEY is not configured on the proxy.',
    };
  }

  if (message === 'FETCH_UNAVAILABLE') {
    return {
      status: 500,
      error: 'Fetch is unavailable in the current Finnhub proxy runtime.',
    };
  }

  if (/^FINNHUB_UPSTREAM_\d+$/.test(message)) {
    const upstreamStatus = Number.parseInt(message.slice('FINNHUB_UPSTREAM_'.length), 10);
    return {
      status: 502,
      error: `Finnhub upstream returned status ${upstreamStatus}.`,
    };
  }

  return {
    status: 502,
    error: 'Unable to reach Finnhub through the proxy.',
  };
}

export async function handleFinnhubProxyRequest({
  method = 'GET',
  url = 'http://local.proxy/api/finnhub/news',
  origin = '',
  env = process.env,
  fetchImpl = globalThis.fetch,
} = {}) {
  const config = readFinnhubProxyConfig(env);
  const requestUrl = new URL(url, 'http://local.proxy');

  if (method === 'OPTIONS') {
    return createResponse({
      status: 204,
      body: '',
      contentType: 'text/plain; charset=utf-8',
      origin,
      config,
    });
  }

  if (requestUrl.pathname !== '/api/finnhub/news') {
    return createJsonResponse(404, { error: 'Not found.' }, origin, config);
  }

  if (method !== 'GET') {
    return createJsonResponse(405, { error: 'Method not allowed.' }, origin, config);
  }

  const allowOrigin = resolveAllowedOrigin(origin, config);
  if (Array.isArray(config.allowedOrigins) && config.allowedOrigins.length && !allowOrigin) {
    return createJsonResponse(403, { error: 'Origin is not allowed for the Finnhub proxy.' }, origin, config);
  }

  try {
    const items = await fetchFinnhubNewsFromUpstream({
      apiKey: config.apiKey,
      category: requestUrl.searchParams.get('category') || 'general',
      limit: requestUrl.searchParams.get('limit') || FINNHUB_NEWS_LIMIT,
      fetchImpl,
    });

    return createJsonResponse(
      200,
      {
        items,
        fetchedAt: new Date().toISOString(),
        source: 'finnhub-proxy',
      },
      origin,
      config
    );
  } catch (error) {
    const proxyError = describeFinnhubProxyError(error);
    return createJsonResponse(proxyError.status, { error: proxyError.error }, origin, config);
  }
}
