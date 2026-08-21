import { useEffect, useMemo, useState } from 'react';
import SimpleLineChart from './SimpleLineChart.jsx';
import { useHangarPortfolioSnapshot } from '../hooks/useHangarPortfolioSnapshot.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import {
  fetchHistoricalSeriesMap,
  readAlphaVantageState,
} from '../lib/hangarRuntime.js';
import {
  HISTORICAL_CRISIS_PRESETS,
  simulateHistoricalCrisisReplay,
} from '../lib/historical-crisis-replay.mjs';
import { formatCurrency, formatDateLabel, formatPercent } from '../lib/formatters.js';

const BENCHMARK_SYMBOL = 'SPY';

function StatCard({ label, value, detail }) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm dark:border-slate-700/70 dark:bg-slate-950/50">
      <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-slate-950 dark:text-slate-50">
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{detail}</p>
      ) : null}
    </div>
  );
}

function getWeightByAsset(assets) {
  const totalCurrentValue = assets.reduce(
    (sum, asset) => sum + (Number(asset.currentValue) || 0),
    0
  );

  if (totalCurrentValue > 0) {
    return Object.fromEntries(
      assets.map((asset) => [asset.key, (asset.currentValue || 0) / totalCurrentValue])
    );
  }

  const totalTarget = assets.reduce(
    (sum, asset) => sum + (Number(asset.targetPercent) || 0),
    0
  );

  return Object.fromEntries(
    assets.map((asset) => [
      asset.key,
      totalTarget > 0 ? (asset.targetPercent || 0) / totalTarget : 0,
    ])
  );
}

export default function HistoricalStressReplay() {
  const { snapshot } = useHangarPortfolioSnapshot();
  const [settings, setSettings] = usePersistentState('hangar.crisisReplay', {
    mode: 'preset',
    presetId: 'covid-crash',
    customStartDate: '2022-01-03',
    customEndDate: '2022-10-12',
  });
  const [seriesState, setSeriesState] = useState({
    status: 'idle',
    message: '',
    seriesMap: null,
    lastSynced: 0,
  });

  const assets = snapshot?.assets || [];
  const assetKeys = assets.map((asset) => asset.key);
  const alphaVantage = snapshot?.alphaVantage || readAlphaVantageState();

  useEffect(() => {
    let cancelled = false;

    async function loadSeries() {
      if (!assetKeys.length) {
        return;
      }

      if (!alphaVantage?.configured) {
        if (!cancelled) {
          setSeriesState({
            status: 'missing-key',
            message:
              'Historical replay needs Alpha Vantage history. Add a key to unlock preset and custom stress windows.',
            seriesMap: null,
            lastSynced: 0,
          });
        }
        return;
      }

      setSeriesState({
        status: 'loading',
        message:
          'Hydrating full daily-adjusted history for portfolio assets and the SPY benchmark. Cold syncs can take a while on the free tier.',
        seriesMap: null,
        lastSynced: 0,
      });

      const nextSeriesMap = await fetchHistoricalSeriesMap(
        [...assetKeys, BENCHMARK_SYMBOL],
        { outputSize: 'full' }
      );

      if (!cancelled) {
        setSeriesState({
          status: 'ready',
          message: 'Historical replay engine is ready.',
          seriesMap: nextSeriesMap,
          lastSynced: Date.now(),
        });
      }
    }

    loadSeries();

    return () => {
      cancelled = true;
    };
  }, [alphaVantage?.configured, assetKeys.join('|')]);

  const selectedPreset = useMemo(
    () =>
      HISTORICAL_CRISIS_PRESETS.find((preset) => preset.id === settings.presetId) ||
      HISTORICAL_CRISIS_PRESETS[0],
    [settings.presetId]
  );

  const activeWindow =
    settings.mode === 'custom'
      ? {
          startDate: settings.customStartDate,
          endDate: settings.customEndDate,
          label: 'Custom window',
        }
      : selectedPreset;

  const replay = useMemo(() => {
    if (seriesState.status !== 'ready' || !seriesState.seriesMap || !assets.length) {
      return null;
    }

    return simulateHistoricalCrisisReplay({
      assetSeriesByKey: Object.fromEntries(
        assetKeys.map((key) => [key, seriesState.seriesMap[key] || []])
      ),
      weightByKey: getWeightByAsset(assets),
      startDate: activeWindow.startDate,
      endDate: activeWindow.endDate,
      benchmarkSeries: seriesState.seriesMap[BENCHMARK_SYMBOL] || [],
      benchmarkLabel: 'SPY benchmark',
    });
  }, [activeWindow.endDate, activeWindow.startDate, assetKeys, assets, seriesState.seriesMap, seriesState.status]);

  const lastSyncedLabel = seriesState.lastSynced
    ? new Date(seriesState.lastSynced).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '--';

  const chartSeries = replay?.ok
    ? [
        {
          label: 'Portfolio',
          color: '#0ea5e9',
          points: replay.portfolioCurve,
        },
        replay.benchmarkCurve.length
          ? {
              label: replay.benchmarkLabel,
              color: '#f97316',
              points: replay.benchmarkCurve,
            }
          : null,
      ].filter(Boolean)
    : [];

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Stress Engine
            </p>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              Historical Stress Replay
            </h3>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              Replay the portfolio through the biggest historical dislocations and inspect drawdown depth,
              recovery speed, and which sleeves did the most damage.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Replay Mode
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSettings((current) => ({ ...current, mode: 'preset' }))}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  settings.mode === 'preset'
                    ? 'bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950'
                    : 'border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                Preset crisis
              </button>
              <button
                type="button"
                onClick={() => setSettings((current) => ({ ...current, mode: 'custom' }))}
                className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                  settings.mode === 'custom'
                    ? 'bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950'
                    : 'border border-slate-300 text-slate-700 dark:border-slate-600 dark:text-slate-200'
                }`}
              >
                Custom range
              </button>
            </div>
          </div>
        </div>

        {settings.mode === 'preset' ? (
          <div className="mt-6 flex flex-wrap gap-3">
            {HISTORICAL_CRISIS_PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => setSettings((current) => ({ ...current, presetId: preset.id }))}
                className={`rounded-2xl border px-4 py-3 text-left ${
                  preset.id === selectedPreset.id
                    ? 'border-sky-500/40 bg-sky-500/10 text-sky-900 dark:text-sky-100'
                    : 'border-slate-200/80 bg-white/60 text-slate-700 dark:border-slate-700/70 dark:bg-slate-900/30 dark:text-slate-200'
                }`}
              >
                <p className="text-sm font-semibold">{preset.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] opacity-75">
                  {preset.startDate} to {preset.endDate}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Start date
              </span>
              <input
                type="date"
                value={settings.customStartDate}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, customStartDate: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"
              />
            </label>
            <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                End date
              </span>
              <input
                type="date"
                value={settings.customEndDate}
                onChange={(event) =>
                  setSettings((current) => ({ ...current, customEndDate: event.target.value }))
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"
              />
            </label>
          </div>
        )}
      </div>

      <div
        className={`rounded-2xl border px-4 py-3 text-sm ${
          seriesState.status === 'ready'
            ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100'
            : seriesState.status === 'loading'
            ? 'border-slate-300/80 bg-slate-100/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200'
            : 'border-amber-400/40 bg-amber-500/10 text-amber-900 dark:text-amber-100'
        }`}
      >
        {seriesState.message} Last sync: {lastSyncedLabel}.
      </div>

      {replay?.ok ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            <StatCard
              label="Covered Weight"
              value={formatPercent(replay.coveragePercent)}
              detail={`${replay.coveredKeys.length} asset sleeves fully covered in this window.`}
            />
            <StatCard
              label="Max Drawdown"
              value={formatPercent(replay.drawdown.maxDrawdown * 100)}
              detail={`Peak ${formatDateLabel(replay.drawdown.peakDate)} / trough ${formatDateLabel(replay.drawdown.troughDate)}`}
            />
            <StatCard
              label="Recovery"
              value={replay.drawdown.recoveryDate ? formatDateLabel(replay.drawdown.recoveryDate) : 'Not recovered'}
              detail={
                replay.drawdown.recoveryCalendarDays !== null
                  ? `${replay.drawdown.recoveryCalendarDays} calendar days from trough`
                  : 'Still below the prior peak at the end of the replay'
              }
            />
            <StatCard
              label="Portfolio Return"
              value={formatPercent(replay.totalReturn * 100)}
              detail={
                replay.benchmarkReturn !== null
                  ? `Benchmark ${formatPercent(replay.benchmarkReturn * 100)}`
                  : 'Benchmark coverage unavailable'
              }
            />
          </div>

          <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                  Replay Window
                </p>
                <h4 className="mt-1 text-lg font-semibold text-slate-950 dark:text-slate-50">
                  {activeWindow.label}
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Showing {formatDateLabel(replay.startDate)} to {formatDateLabel(replay.endDate)}.
              </p>
            </div>

            <SimpleLineChart series={chartSeries} />

            <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr,1fr]">
              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Coverage Notes
                </p>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-300">
                  Assets without full window history are excluded entirely, then the remaining covered
                  sleeves are renormalized to preserve a clean buy-and-hold replay.
                </p>
                {replay.excludedKeys.length ? (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    Excluded in this window: {replay.excludedKeys.join(', ')}.
                  </p>
                ) : (
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                    All current sleeves had full coverage in this window.
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  Worst Contributors
                </p>
                <div className="mt-3 space-y-3">
                  {replay.worstContributors.slice(0, 4).map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-slate-700/70 dark:bg-slate-950/40"
                    >
                      <div>
                        <p className="font-semibold text-slate-950 dark:text-slate-50">{item.key}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Weight {formatPercent(item.weight * 100)}
                        </p>
                      </div>
                      <p className="font-semibold text-rose-600 dark:text-rose-300">
                        {formatPercent(item.contribution * 100)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : seriesState.status === 'ready' ? (
        <div className="rounded-[28px] border border-dashed border-slate-300/80 bg-slate-50/70 px-6 py-12 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-300">
          {replay?.reason === 'NO_COVERAGE'
            ? 'The selected window has no fully-covered current sleeves. Try a newer crisis or a custom window with more ETF history.'
            : 'Unable to build a clean replay for the selected window.'}
        </div>
      ) : null}
    </div>
  );
}
