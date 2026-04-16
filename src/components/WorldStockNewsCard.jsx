import { useEffect, useMemo, useState } from 'react';
import { useFinnhubMarketNews } from '../hooks/useFinnhubMarketNews.js';
import { FINNHUB_NEWS_PAGE_SIZE } from '../lib/finnhub.mjs';

function formatPublishedAt(timestamp) {
  if (!timestamp) {
    return '--';
  }

  const date = new Date(timestamp * 1000);
  if (Number.isNaN(date.getTime())) {
    return '--';
  }

  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function truncateSummary(summary) {
  if (!summary) {
    return 'Open the article for the full market brief.';
  }
  if (summary.length <= 180) {
    return summary;
  }
  return `${summary.slice(0, 177).trim()}...`;
}

export default function WorldStockNewsCard() {
  const { items, status, error, lastUpdated, refresh, keyDetails } = useFinnhubMarketNews();
  const [currentPage, setCurrentPage] = useState(1);

  const lastUpdatedLabel = useMemo(() => {
    if (!lastUpdated) {
      return 'Awaiting first sync';
    }

    return new Date(lastUpdated).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  }, [lastUpdated]);

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const totalPages = Math.max(1, Math.ceil(items.length / FINNHUB_NEWS_PAGE_SIZE));
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * FINNHUB_NEWS_PAGE_SIZE;
    return items.slice(startIndex, startIndex + FINNHUB_NEWS_PAGE_SIZE);
  }, [currentPage, items]);
  const visibleRangeLabel = useMemo(() => {
    if (!items.length) {
      return 'No stories loaded yet';
    }

    const start = (currentPage - 1) * FINNHUB_NEWS_PAGE_SIZE + 1;
    const end = Math.min(items.length, currentPage * FINNHUB_NEWS_PAGE_SIZE);
    return `Showing ${start}-${end} of ${items.length} headlines`;
  }, [currentPage, items]);
  const isBusy = status === 'loading';

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300">
            Global Market Brief
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">World Stock News</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Live headlines from Finnhub&apos;s general market news feed so the supply deck surfaces what is moving global equities right now.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60">
            <span className="font-semibold">Key source</span>
            <span>{keyDetails.source === 'missing' ? 'Not configured' : keyDetails.source}</span>
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-900/30 text-sky-600 dark:text-sky-200 border border-sky-500/20 dark:border-sky-500/30">
            <span className="font-semibold">Last sync</span>
            <span>{lastUpdatedLabel}</span>
          </span>
          <button
            type="button"
            onClick={refresh}
            disabled={isBusy || status === 'missing-key'}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-sky-500/40 text-sky-600 dark:text-sky-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-sky-500/10 hover:border-sky-500/70 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isBusy ? 'Refreshing...' : 'Refresh feed'}
          </button>
        </div>
      </div>

      {status === 'missing-key' ? (
        <div className="rounded-xl border border-amber-300/70 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-900/20 p-4 space-y-2 text-sm text-amber-800 dark:text-amber-100">
          <p className="font-semibold">Finnhub key not configured.</p>
          <p>
            Add <code>VITE_FINNHUB_KEY</code> to <code>.env.local</code>, then restart the Vite dev server. Query-string,
            local storage, and <code>window.APP_CONFIG.marketData.finnhubKey</code> still work as fallbacks.
          </p>
        </div>
      ) : null}

      {status === 'error' ? (
        <div className="rounded-xl border border-rose-300/70 dark:border-rose-500/40 bg-rose-50/80 dark:bg-rose-900/20 p-4 text-sm text-rose-700 dark:text-rose-100">
          Unable to load world stock news. {error || 'Unknown error.'}
        </div>
      ) : null}

      {status === 'loading' ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" aria-live="polite">
          {Array.from({ length: FINNHUB_NEWS_PAGE_SIZE }).map((_, index) => (
            <div key={index} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 space-y-3 animate-pulse">
              <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-5 w-3/4 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-20 rounded bg-slate-200 dark:bg-slate-700" />
              <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
            </div>
          ))}
        </div>
      ) : null}

      {status === 'empty' ? (
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30 p-4 text-sm text-slate-600 dark:text-slate-300">
          Finnhub returned no market headlines for the current query.
        </div>
      ) : null}

      {status === 'ready' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" aria-live="polite">
            {paginatedItems.map((item) => (
              <article
                key={item.id}
                data-news-card
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-slate-50/70 dark:bg-slate-900/30 overflow-hidden"
              >
                {item.image ? (
                  <div className="aspect-[16/7] overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img src={item.image} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ) : null}
                <div className="p-4 space-y-3">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <span>{item.source}</span>
                    <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                    <span>{formatPublishedAt(item.datetime)}</span>
                    {item.category ? (
                      <>
                        <span className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-500" />
                        <span>{item.category}</span>
                      </>
                    ) : null}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-sky-600 dark:hover:text-sky-300 transition">
                      {item.headline}
                    </a>
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{truncateSummary(item.summary)}</p>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-300 hover:underline"
                  >
                    Read article
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="flex flex-col gap-3 border-t border-slate-200/80 dark:border-slate-700/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <p data-news-page-indicator className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  Page {currentPage} of {totalPages}
                </p>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  {visibleRangeLabel}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  data-news-pagination-prev
                  aria-label="Previous news page"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                <button
                  type="button"
                  data-news-pagination-next
                  aria-label="Next news page"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white/70 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-45 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}
