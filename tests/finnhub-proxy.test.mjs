import assert from 'node:assert/strict';
import {
  buildCorsHeaders,
  fetchFinnhubNewsFromUpstream,
  handleFinnhubProxyRequest,
  parseAllowedOrigins,
  readFinnhubProxyConfig,
  sanitizeFinnhubNewsLimit,
} from '../serverless/finnhub/shared.mjs';

assert.deepEqual(parseAllowedOrigins(' http://127.0.0.1:5173, https://example.com '), [
  'http://127.0.0.1:5173',
  'https://example.com',
]);
assert.deepEqual(parseAllowedOrigins(''), []);
assert.equal(sanitizeFinnhubNewsLimit('0'), 1);
assert.equal(sanitizeFinnhubNewsLimit('200'), 48);
assert.equal(sanitizeFinnhubNewsLimit(undefined), 24);

{
  const config = readFinnhubProxyConfig({
    FINNHUB_API_KEY: ' proxy-key ',
    FINNHUB_PROXY_HOST: '0.0.0.0',
    FINNHUB_PROXY_PORT: '9900',
    FINNHUB_ALLOWED_ORIGINS: 'http://127.0.0.1:5173,https://example.com',
  });

  assert.equal(config.apiKey, 'proxy-key');
  assert.equal(config.host, '0.0.0.0');
  assert.equal(config.port, 9900);
  assert.deepEqual(config.allowedOrigins, ['http://127.0.0.1:5173', 'https://example.com']);
}

{
  const headers = buildCorsHeaders('http://127.0.0.1:5173', {
    allowedOrigins: ['http://127.0.0.1:5173'],
  });
  assert.equal(headers['Access-Control-Allow-Origin'], 'http://127.0.0.1:5173');
}

{
  let requestedUrl = '';
  const items = await fetchFinnhubNewsFromUpstream({
    apiKey: 'proxy-key',
    category: 'general',
    limit: 10,
    fetchImpl: async (url) => {
      requestedUrl = url;
      return {
        ok: true,
        async json() {
          return [
            {
              id: 1,
              headline: 'Backend headline',
              summary: 'Backend summary',
              source: 'Backend Wire',
              url: 'https://example.com/backend-story',
              datetime: 111,
            },
          ];
        },
      };
    },
  });

  assert.match(requestedUrl, /token=proxy-key/);
  assert.equal(items[0].headline, 'Backend headline');
}

{
  const response = await handleFinnhubProxyRequest({
    method: 'GET',
    url: 'http://127.0.0.1:8787/api/finnhub/news?category=general&limit=4',
    origin: 'http://127.0.0.1:5173',
    env: {
      FINNHUB_API_KEY: 'proxy-key',
      FINNHUB_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
    },
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return [
          {
            id: 9,
            headline: 'Proxy handler headline',
            summary: 'Summary',
            source: 'Wire',
            url: 'https://example.com/story',
            datetime: 999,
          },
        ];
      },
    }),
  });

  assert.equal(response.status, 200);
  const payload = JSON.parse(response.body);
  assert.equal(payload.source, 'finnhub-proxy');
  assert.equal(payload.items.length, 1);
}

{
  const response = await handleFinnhubProxyRequest({
    method: 'GET',
    url: 'http://127.0.0.1:8787/api/finnhub/news',
    origin: 'http://127.0.0.1:5173',
    env: {
      FINNHUB_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
    },
  });

  assert.equal(response.status, 503);
  assert.match(response.body, /FINNHUB_API_KEY is not configured on the proxy/);
}

{
  const response = await handleFinnhubProxyRequest({
    method: 'GET',
    url: 'http://127.0.0.1:8787/api/finnhub/news',
    origin: 'https://blocked.example.com',
    env: {
      FINNHUB_API_KEY: 'proxy-key',
      FINNHUB_ALLOWED_ORIGINS: 'http://127.0.0.1:5173',
    },
  });

  assert.equal(response.status, 403);
  assert.match(response.body, /Origin is not allowed/);
}

{
  const response = await handleFinnhubProxyRequest({
    method: 'GET',
    url: 'http://127.0.0.1:8787/api/finnhub/news',
    env: {
      FINNHUB_API_KEY: 'proxy-key',
    },
    fetchImpl: async () => ({
      ok: false,
      status: 429,
      async json() {
        return { error: 'Rate limit' };
      },
    }),
  });

  assert.equal(response.status, 502);
  assert.match(response.body, /status 429/);
}

{
  const response = await handleFinnhubProxyRequest({
    method: 'OPTIONS',
    url: 'http://127.0.0.1:8787/api/finnhub/news',
    env: {
      FINNHUB_API_KEY: 'proxy-key',
    },
  });

  assert.equal(response.status, 204);
}

console.log('All Finnhub proxy tests passed.');
