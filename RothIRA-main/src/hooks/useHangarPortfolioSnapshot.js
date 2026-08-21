import { useCallback, useEffect, useState } from 'react';
import { readPortfolioSnapshot } from '../lib/hangarRuntime.js';

export function useHangarPortfolioSnapshot() {
  const [snapshot, setSnapshot] = useState(() => readPortfolioSnapshot());

  const refresh = useCallback(() => {
    const nextSnapshot = readPortfolioSnapshot();
    if (nextSnapshot) {
      setSnapshot(nextSnapshot);
    }
  }, []);

  useEffect(() => {
    refresh();

    const eventNames = [
      'hangar-data-bridge-ready',
      'livePriceSheetUpdated',
      'portfolio-assumptions-reset',
      'hangar-settings-changed',
      'hangar-settings-ready',
      'alpha-vantage-key-changed',
    ];

    const handleDelayedRefresh = () => {
      window.setTimeout(refresh, 80);
    };
    const handleDocumentClick = (event) => {
      const target = event.target;
      if (target instanceof Element && target.closest('#calculateRebalanceBtn')) {
        handleDelayedRefresh();
      }
    };
    const handleDocumentChange = (event) => {
      const target = event.target;
      if (
        target instanceof Element &&
        target.matches('input[data-stock][data-field="target"], input[data-stock][data-field="currentValue"]')
      ) {
        handleDelayedRefresh();
      }
    };

    eventNames.forEach((eventName) => {
      window.addEventListener(eventName, handleDelayedRefresh);
    });
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('change', handleDocumentChange, true);

    const intervalId = window.setInterval(refresh, 15000);

    return () => {
      eventNames.forEach((eventName) => {
        window.removeEventListener(eventName, handleDelayedRefresh);
      });
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('change', handleDocumentChange, true);
      window.clearInterval(intervalId);
    };
  }, [refresh]);

  return {
    snapshot,
    refresh,
  };
}

