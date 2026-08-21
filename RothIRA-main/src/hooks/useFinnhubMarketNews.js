import { useCallback, useEffect, useState } from 'react';
import {
  discoverFinnhubKey,
  fetchFinnhubMarketNews,
  FINNHUB_NEWS_LIMIT,
  persistFinnhubKey,
} from '../lib/finnhub.mjs';

const devFinnhubEnv =
  import.meta.env.DEV && import.meta.env.VITE_FINNHUB_KEY
    ? { VITE_FINNHUB_KEY: import.meta.env.VITE_FINNHUB_KEY }
    : {};

function publishFinnhubNews(items, status, keyDetails) {
  if (typeof window === 'undefined') {
    return;
  }

  window.latestFinnhubMarketNews = Array.isArray(items) ? items : [];
  document.dispatchEvent(
    new CustomEvent('finnhubMarketNewsUpdated', {
      detail: {
        items: window.latestFinnhubMarketNews,
        status,
        keyDetails,
      },
    })
  );
}

function discoverRuntimeFinnhubKey() {
  if (typeof window === 'undefined') {
    return { key: '', source: 'missing' };
  }

  return discoverFinnhubKey({
    viteEnv: devFinnhubEnv,
    search: window.location.search,
    appConfig: window.APP_CONFIG || {},
    storage: window.localStorage,
  });
}

export function useFinnhubMarketNews() {
  const [keyDetails, setKeyDetails] = useState(() => discoverRuntimeFinnhubKey());
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(keyDetails.key ? 'loading' : 'missing-key');
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(0);

  const refresh = useCallback(async () => {
    const nextKeyDetails = discoverRuntimeFinnhubKey();
    setKeyDetails(nextKeyDetails);

    if (!nextKeyDetails.key) {
      setStatus('missing-key');
      setItems([]);
      setError('');
      setLastUpdated(0);
      publishFinnhubNews([], 'missing-key', nextKeyDetails);
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const nextItems = await fetchFinnhubMarketNews({
        apiKey: nextKeyDetails.key,
        limit: FINNHUB_NEWS_LIMIT,
      });
      setItems(nextItems);
      setStatus(nextItems.length ? 'ready' : 'empty');
      setLastUpdated(Date.now());
      publishFinnhubNews(nextItems, nextItems.length ? 'ready' : 'empty', nextKeyDetails);
    } catch (nextError) {
      setItems([]);
      setStatus('error');
      setError(nextError instanceof Error ? nextError.message : 'Unable to load market news.');
      publishFinnhubNews([], 'error', nextKeyDetails);
    }
  }, []);

  const saveKey = useCallback(
    async (value) => {
      persistFinnhubKey(value, typeof window === 'undefined' ? undefined : window.localStorage);
      await refresh();
    },
    [refresh]
  );

  const clearKey = useCallback(async () => {
    persistFinnhubKey('', typeof window === 'undefined' ? undefined : window.localStorage);
    await refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    items,
    status,
    error,
    lastUpdated,
    refresh,
    saveKey,
    clearKey,
    keyDetails,
  };
}

