import assert from 'node:assert/strict';
import {
  discoverFinnhubKey,
  fetchFinnhubMarketNews,
  normalizeFinnhubNewsItems,
  persistFinnhubKey,
  readEnvFinnhubKey,
  readStoredFinnhubKey,
  sanitizeFinnhubKey,
} from '../src/lib/finnhub.mjs';

function createStorage(initial = {}) {
  const state = new Map(Object.entries(initial));
  return {
    getItem(key) {
      return state.has(key) ? state.get(key) : null;
    },
    setItem(key, value) {
      state.set(key, String(value));
    },
    removeItem(key) {
      state.delete(key);
    },
  };
}

assert.equal(sanitizeFinnhubKey('  abc123  '), 'abc123');
assert.equal(sanitizeFinnhubKey(null), '');
assert.equal(readEnvFinnhubKey({ VITE_FINNHUB_KEY: ' env-key ' }), 'env-key');
assert.equal(readEnvFinnhubKey({}), '');

{
  const storage = createStorage();
  persistFinnhubKey(' stored-local-key ', storage);
  assert.equal(readStoredFinnhubKey(storage), 'stored-local-key');
  persistFinnhubKey('', storage);
  assert.equal(readStoredFinnhubKey(storage), '');
}

{
  const storage = createStorage({ 'hangar.finnhubKey': 'stored-key' });
  const result = discoverFinnhubKey({
    viteEnv: { VITE_FINNHUB_KEY: 'env-key' },
    search: '?finnhubKey=query-key',
    appConfig: { marketData: { finnhubKey: 'config-key' } },
    storage,
  });

  assert.equal(result.key, 'env-key');
  assert.equal(result.source, 'env');
  assert.equal(storage.getItem('hangar.finnhubKey'), 'stored-key');
}

{
  const storage = createStorage();
  const result = discoverFinnhubKey({
    search: '?finnhubKey=query-key',
    appConfig: { marketData: { finnhubKey: 'config-key' } },
    storage,
  });

  assert.equal(result.key, 'query-key');
  assert.equal(result.source, 'query');
  assert.equal(storage.getItem('hangar.finnhubKey'), 'query-key');
}

{
  const storage = createStorage({ 'hangar.finnhubKey': 'stored-key' });
  const result = discoverFinnhubKey({
    viteEnv: {},
    search: '',
    appConfig: { marketData: { finnhubKey: 'config-key' } },
    storage,
  });

  assert.equal(result.key, 'stored-key');
  assert.equal(result.source, 'storage');
}

{
  const result = discoverFinnhubKey({
    viteEnv: {},
    search: '',
    appConfig: { marketData: { finnhubKey: 'config-key' } },
    storage: createStorage(),
  });

  assert.equal(result.key, 'config-key');
  assert.equal(result.source, 'config');
}

{
  const items = normalizeFinnhubNewsItems([
    {
      id: 1,
      headline: 'Older story',
      summary: 'Summary 1',
      source: 'Source A',
      url: 'https://example.com/1',
      datetime: 100,
    },
    {
      id: 2,
      headline: 'Newest story',
      summary: 'Summary 2',
      source: 'Source B',
      url: 'https://example.com/2',
      datetime: 200,
    },
    {
      id: 3,
      headline: '',
      url: 'https://example.com/3',
      datetime: 300,
    },
  ]);

  assert.equal(items.length, 2);
  assert.equal(items[0].headline, 'Newest story');
  assert.equal(items[1].headline, 'Older story');
}

{
  let requestedUrl = '';
  const items = await fetchFinnhubMarketNews({
    apiKey: 'demo-key',
    fetchImpl: async (url) => {
      requestedUrl = url;
      return {
        ok: true,
        async json() {
          return [
            {
              id: 10,
              headline: 'Headline',
              summary: 'Summary',
              source: 'Finnhub',
              url: 'https://example.com/story',
              datetime: 123,
            },
          ];
        },
      };
    },
  });

  assert.match(requestedUrl, /category=general/);
  assert.match(requestedUrl, /token=demo-key/);
  assert.equal(items.length, 1);
  assert.equal(items[0].headline, 'Headline');
}

{
  const items = await fetchFinnhubMarketNews({
    apiKey: 'demo-key',
    fetchImpl: async () => ({
      ok: true,
      async json() {
        return [];
      },
    }),
  });

  assert.deepEqual(items, []);
}

await assert.rejects(
  () =>
    fetchFinnhubMarketNews({
      apiKey: 'demo-key',
      fetchImpl: async () => ({
        ok: false,
        status: 429,
        async json() {
          return {};
        },
      }),
    }),
  /FINNHUB_NEWS_429/
);

await assert.rejects(
  () => fetchFinnhubMarketNews({ apiKey: '' }),
  /FINNHUB_KEY_MISSING/
);

console.log('All Finnhub news tests passed.');

