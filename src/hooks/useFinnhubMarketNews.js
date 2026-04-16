import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  discoverFinnhubKey,
  fetchFinnhubMarketNews,
  FINNHUB_NEWS_LIMIT,
} from '../lib/finnhub.mjs';

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

export function useFinnhubMarketNews() {
  const keyDetails = useMemo(() => {
    if (typeof window === 'undefined') {
      return { key: '', source: 'missing' };
    }

    return discoverFinnhubKey({
      viteEnv: import.meta.env,
      search: window.location.search,
      appConfig: window.APP_CONFIG || {},
      storage: window.localStorage,
    });
  }, []);

  const [items, setItems] = useState([]);
  const [status, setStatus] = useState(keyDetails.key ? 'loading' : 'missing-key');
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState(0);

  const refresh = useCallback(async () => {
    if (!keyDetails.key) {
      setStatus('missing-key');
      setItems([]);
      setError('');
      publishFinnhubNews([], 'missing-key', keyDetails);
      return;
    }

    setStatus('loading');
    setError('');

    try {
      const nextItems = await fetchFinnhubMarketNews({
        apiKey: keyDetails.key,
        limit: FINNHUB_NEWS_LIMIT,
      });
      setItems(nextItems);
      setStatus(nextItems.length ? 'ready' : 'empty');
      setLastUpdated(Date.now());
      publishFinnhubNews(nextItems, nextItems.length ? 'ready' : 'empty', keyDetails);
    } catch (nextError) {
      setItems([]);
      setStatus('error');
      setError(nextError instanceof Error ? nextError.message : 'Unable to load market news.');
      publishFinnhubNews([], 'error', keyDetails);
    }
  }, [keyDetails.key]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    items,
    status,
    error,
    lastUpdated,
    refresh,
    keyDetails,
  };
}

