import { useEffect, useMemo, useState } from 'react';
import { useFinnhubMarketNews } from '../hooks/useFinnhubMarketNews.js';
import {
  buildYoutubeLiveEmbedUrl,
  createCustomFinanceVideoChannel,
  mergeFinanceVideoChannels,
  readActiveFinanceVideoChannelId,
  readCustomFinanceVideoChannels,
  writeActiveFinanceVideoChannelId,
  writeCustomFinanceVideoChannels,
} from '../lib/financeVideoChannels.mjs';
import { FINNHUB_NEWS_PAGE_SIZE } from '../lib/finnhub.mjs';

const emptyChannelForm = {
  label: '',
  channelId: '',
  handle: '',
  description: '',
};

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

function getRuntimeOrigin() {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.origin;
}

function FinanceLiveTheater() {
  const [customChannels, setCustomChannels] = useState(() => readCustomFinanceVideoChannels());
  const channels = useMemo(() => mergeFinanceVideoChannels(customChannels), [customChannels]);
  const [activeChannelId, setActiveChannelId] = useState(
    () => readActiveFinanceVideoChannelId() || channels[0]?.id || ''
  );
  const [frameRevision, setFrameRevision] = useState(0);
  const [frameError, setFrameError] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [channelForm, setChannelForm] = useState(emptyChannelForm);
  const [formFeedback, setFormFeedback] = useState({ type: '', message: '' });

  const activeChannel = channels.find((channel) => channel.id === activeChannelId) || channels[0];
  const embedSrc = useMemo(
    () => buildYoutubeLiveEmbedUrl(activeChannel, getRuntimeOrigin()),
    [activeChannel]
  );

  useEffect(() => {
    if (!activeChannel && channels[0]) {
      setActiveChannelId(channels[0].id);
      writeActiveFinanceVideoChannelId(channels[0].id);
      return;
    }

    if (activeChannel) {
      writeActiveFinanceVideoChannelId(activeChannel.id);
    }
  }, [activeChannel, channels]);

  useEffect(() => {
    setFrameError(false);
  }, [activeChannel?.id, frameRevision]);

  const selectChannel = (channelId) => {
    setActiveChannelId(channelId);
    writeActiveFinanceVideoChannelId(channelId);
    setFrameError(false);
  };

  const updateFormField = (field, value) => {
    setChannelForm((current) => ({
      ...current,
      [field]: value,
    }));
    if (formFeedback.message) {
      setFormFeedback({ type: '', message: '' });
    }
  };

  const handleAddChannel = (event) => {
    event.preventDefault();
    const result = createCustomFinanceVideoChannel(channelForm, channels);
    if (!result.ok) {
      setFormFeedback({ type: 'error', message: result.error });
      return;
    }

    const nextCustomChannels = [...customChannels, result.channel];
    writeCustomFinanceVideoChannels(nextCustomChannels);
    setCustomChannels(nextCustomChannels);
    setActiveChannelId(result.channel.id);
    writeActiveFinanceVideoChannelId(result.channel.id);
    setChannelForm(emptyChannelForm);
    setFormFeedback({ type: 'success', message: `${result.channel.label} added.` });
  };

  const removeCustomChannel = (channelId) => {
    const nextCustomChannels = customChannels.filter((channel) => channel.id !== channelId);
    writeCustomFinanceVideoChannels(nextCustomChannels);
    setCustomChannels(nextCustomChannels);

    if (activeChannelId === channelId) {
      const fallbackChannel = mergeFinanceVideoChannels(nextCustomChannels)[0];
      setActiveChannelId(fallbackChannel?.id || '');
      writeActiveFinanceVideoChannelId(fallbackChannel?.id || '');
    }
  };

  if (!activeChannel) {
    return null;
  }

  return (
    <section
      data-live-news-theater
      className="sticky left-4 w-[calc(100vw-2rem)] max-w-full rounded-2xl border border-slate-200/80 dark:border-slate-700/70 bg-slate-950 text-white overflow-hidden"
      aria-labelledby="liveNewsTheaterTitle"
    >
      <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-sky-300">Live finance theater</p>
              <h4 id="liveNewsTheaterTitle" className="mt-1 text-base font-semibold text-white">
                {activeChannel.label}
              </h4>
              <p className="mt-1 text-sm text-slate-300">{activeChannel.description}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <a
                data-live-news-open-channel
                href={activeChannel.watchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              >
                Open on YouTube
              </a>
              <button
                type="button"
                data-live-news-reload
                onClick={() => setFrameRevision((revision) => revision + 1)}
                className="inline-flex items-center justify-center rounded-lg border border-sky-300/40 bg-sky-300/10 px-3 py-2 text-xs font-semibold text-sky-100 transition hover:bg-sky-300/20"
              >
                Reload stream
              </button>
            </div>
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black">
            {frameError || !embedSrc ? (
              <div
                data-live-news-player-fallback
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center"
              >
                <p className="text-lg font-semibold text-white">Stream unavailable here.</p>
                <p className="max-w-xl text-sm text-slate-300">
                  This channel may be offline or may block embedded playback for this session.
                </p>
                <a
                  href={activeChannel.watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-sky-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                >
                  Open on YouTube
                </a>
              </div>
            ) : (
              <iframe
                key={`${activeChannel.id}-${frameRevision}`}
                data-live-news-iframe
                title={`Live finance news: ${activeChannel.label}`}
                src={embedSrc}
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                onError={() => setFrameError(true)}
              />
            )}
          </div>

          <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-400">
            If the embedded player is offline or unavailable, open the selected broadcaster on YouTube.
          </div>
        </div>

        <aside className="border-t border-white/10 bg-slate-900/90 p-4 xl:border-l xl:border-t-0">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Channels</p>
              <p className="mt-1 text-sm text-slate-300">{channels.length} live sources</p>
            </div>
            <button
              type="button"
              data-live-channel-manage
              onClick={() => setManagerOpen((open) => !open)}
              className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/15"
              aria-expanded={managerOpen}
            >
              Manage channels
            </button>
          </div>

          <div data-live-channel-list className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {channels.map((channel) => {
              const active = channel.id === activeChannel.id;
              return (
                <button
                  key={channel.id}
                  type="button"
                  data-live-channel-id={channel.id}
                  data-live-channel-source={channel.source}
                  onClick={() => selectChannel(channel.id)}
                  className={`rounded-xl border p-3 text-left transition ${
                    active
                      ? 'border-sky-300 bg-sky-300/15 text-white shadow-lg shadow-sky-950/30'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-white/25 hover:bg-white/[0.08]'
                  }`}
                >
                  <span className="block text-sm font-semibold">{channel.label}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-slate-400">{channel.category}</span>
                  {channel.handle ? <span className="mt-2 block text-xs text-slate-400">{channel.handle}</span> : null}
                </button>
              );
            })}
          </div>

          {managerOpen ? (
            <div data-live-channel-manager className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
              <form data-live-channel-form className="space-y-3" onSubmit={handleAddChannel}>
                <label className="block text-xs font-semibold text-slate-300">
                  Channel name
                  <input
                    data-live-channel-label-input
                    type="text"
                    value={channelForm.label}
                    onChange={(event) => updateFormField('label', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-300"
                    placeholder="Market stream"
                  />
                </label>
                <label className="block text-xs font-semibold text-slate-300">
                  YouTube channel ID
                  <input
                    data-live-channel-id-input
                    type="text"
                    value={channelForm.channelId}
                    onChange={(event) => updateFormField('channelId', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-300"
                    placeholder="UC..."
                    required
                  />
                </label>
                <label className="block text-xs font-semibold text-slate-300">
                  YouTube handle
                  <input
                    data-live-channel-handle-input
                    type="text"
                    value={channelForm.handle}
                    onChange={(event) => updateFormField('handle', event.target.value)}
                    className="mt-1 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-300"
                    placeholder="@Channel"
                  />
                </label>
                <label className="block text-xs font-semibold text-slate-300">
                  Description
                  <textarea
                    data-live-channel-description-input
                    value={channelForm.description}
                    onChange={(event) => updateFormField('description', event.target.value)}
                    className="mt-1 min-h-20 w-full rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-sky-300"
                    placeholder="Market coverage and live finance news."
                  />
                </label>
                {formFeedback.message ? (
                  <p
                    data-live-channel-feedback
                    className={`text-xs font-semibold ${
                      formFeedback.type === 'error' ? 'text-amber-200' : 'text-emerald-200'
                    }`}
                  >
                    {formFeedback.message}
                  </p>
                ) : null}
                <button
                  type="submit"
                  data-live-channel-add
                  className="w-full rounded-lg bg-sky-400 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-300"
                >
                  Add channel
                </button>
              </form>

              <div className="mt-4 space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Custom</p>
                {customChannels.length ? (
                  customChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2"
                    >
                      <span className="min-w-0 truncate text-sm text-slate-200">{channel.label}</span>
                      <button
                        type="button"
                        data-live-channel-remove={channel.id}
                        onClick={() => removeCustomChannel(channel.id)}
                        className="shrink-0 text-xs font-semibold text-rose-200 hover:text-rose-100"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No custom channels saved.</p>
                )}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  );
}

export default function WorldStockNewsCard() {
  const { items, status, error, lastUpdated, refresh, saveKey, clearKey, keyDetails } = useFinnhubMarketNews();
  const [currentPage, setCurrentPage] = useState(1);
  const [finnhubKeyInput, setFinnhubKeyInput] = useState('');
  const [keyFeedback, setKeyFeedback] = useState({ type: '', message: '' });
  const [isSavingKey, setIsSavingKey] = useState(false);

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

  const handleFinnhubKeySubmit = async (event) => {
    event.preventDefault();
    const nextKey = finnhubKeyInput.trim();
    if (!nextKey) {
      setKeyFeedback({ type: 'error', message: 'Enter a Finnhub key before saving.' });
      return;
    }

    setIsSavingKey(true);
    setKeyFeedback({ type: '', message: '' });
    await saveKey(nextKey);
    setFinnhubKeyInput('');
    setKeyFeedback({ type: 'success', message: 'Finnhub key saved locally for this browser.' });
    setIsSavingKey(false);
  };

  const handleClearFinnhubKey = async () => {
    setIsSavingKey(true);
    await clearKey();
    setKeyFeedback({ type: 'success', message: 'Saved Finnhub key removed from this browser.' });
    setIsSavingKey(false);
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg p-5 space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold tracking-widest uppercase text-sky-500 dark:text-sky-300">
            Global Market Brief
          </p>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">World Stock News</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-3xl">
            Live U.S. finance streams with Finnhub market headlines underneath for quick source checks.
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
          {keyDetails.source === 'storage' ? (
            <button
              type="button"
              data-finnhub-key-clear
              onClick={handleClearFinnhubKey}
              disabled={isSavingKey || isBusy}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-300/80 dark:border-slate-600/80 text-slate-600 dark:text-slate-200 bg-white/70 dark:bg-slate-900/50 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Forget key
            </button>
          ) : null}
        </div>
      </div>

      <FinanceLiveTheater />

      <div className="space-y-4">
        <div className="flex flex-col gap-1 border-t border-slate-200/80 pt-4 dark:border-slate-700/70">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
            Market headlines
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Finnhub general market news feed.
          </p>
        </div>

        {status === 'missing-key' ? (
          <div className="rounded-xl border border-amber-300/70 dark:border-amber-500/40 bg-amber-50/80 dark:bg-amber-900/20 p-4 space-y-2 text-sm text-amber-800 dark:text-amber-100">
            <p className="font-semibold">Finnhub key not configured.</p>
            <p>
              Add <code>VITE_FINNHUB_KEY</code> to <code>.env.local</code>, then restart the Vite dev server. Query-string
              and local storage fallbacks still work for personal sessions; do not commit production keys into source.
            </p>
            <form
              data-finnhub-key-form
              className="mt-4 grid gap-3 rounded-xl border border-amber-300/60 bg-white/60 p-3 dark:border-amber-400/30 dark:bg-slate-950/30 md:grid-cols-[minmax(0,1fr)_auto]"
              onSubmit={handleFinnhubKeySubmit}
            >
              <label className="block text-xs font-semibold uppercase tracking-[0.18em] text-amber-900 dark:text-amber-100">
                Local Finnhub key
                <input
                  data-finnhub-key-input
                  type="password"
                  value={finnhubKeyInput}
                  onChange={(event) => {
                    setFinnhubKeyInput(event.target.value);
                    if (keyFeedback.message) {
                      setKeyFeedback({ type: '', message: '' });
                    }
                  }}
                  className="mt-2 w-full rounded-lg border border-amber-300/80 bg-white px-3 py-2 text-sm font-normal tracking-normal text-slate-900 outline-none transition focus:border-sky-500 dark:border-amber-400/30 dark:bg-slate-950 dark:text-white"
                  placeholder="Paste personal Finnhub key"
                  autoComplete="off"
                />
              </label>
              <button
                type="submit"
                data-finnhub-key-save
                disabled={isSavingKey || isBusy}
                className="inline-flex items-center justify-center self-end rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSavingKey ? 'Saving...' : 'Save & sync'}
              </button>
              {keyFeedback.message ? (
                <p
                  data-finnhub-key-feedback
                  className={`md:col-span-2 text-xs font-semibold ${
                    keyFeedback.type === 'error' ? 'text-rose-700 dark:text-rose-200' : 'text-emerald-700 dark:text-emerald-200'
                  }`}
                >
                  {keyFeedback.message}
                </p>
              ) : null}
            </form>
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
      </div>
    </article>
  );
}
