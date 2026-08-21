import { useEffect, useMemo, useState } from 'react';
import { useHangarPortfolioSnapshot } from '../hooks/useHangarPortfolioSnapshot.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import { fetchHistoricalSeriesMap, readAlphaVantageState } from '../lib/hangarRuntime.js';
import {
  computeSignalMetrics,
  optimizeContributionAllocation,
} from '../lib/contribution-optimizer.mjs';
import { formatCurrency, formatPercent } from '../lib/formatters.js';

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

function ReasonBadge({ reason }) {
  return (
    <span className="rounded-full border border-sky-500/20 bg-sky-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-400/20 dark:bg-sky-400/10 dark:text-sky-200">
      {reason}
    </span>
  );
}

export default function CapitalDeploymentOptimizer() {
  const { snapshot, refresh } = useHangarPortfolioSnapshot();
  const [settings, setSettings] = usePersistentState('hangar.contributionOptimizer', {
    depositAmount: 1000,
  });
  const [signalState, setSignalState] = useState({
    status: 'idle',
    message: '',
    signalByAsset: null,
    lastSynced: 0,
  });

  const depositAmount = Number(settings?.depositAmount) || 0;
  const assets = snapshot?.assets || [];
  const assetKeys = assets.map((asset) => asset.key);
  const alphaVantage = snapshot?.alphaVantage || readAlphaVantageState();

  useEffect(() => {
    let cancelled = false;

    async function loadSignals() {
      if (!assetKeys.length) {
        return;
      }

      if (!alphaVantage?.configured) {
        if (!cancelled) {
          setSignalState({
            status: 'missing-key',
            message:
              'Historical signal stack is unavailable without an Alpha Vantage key, so the optimizer is staying on pure drift correction.',
            signalByAsset: null,
            lastSynced: 0,
          });
        }
        return;
      }

      setSignalState((current) => ({
        ...current,
        status: 'loading',
        message:
          'Syncing full historical series for each asset. The first cold run can take a while on Alpha Vantage free-tier limits.',
      }));

      const seriesMap = await fetchHistoricalSeriesMap(assetKeys, {
        outputSize: 'full',
      });
      const signalByAsset = Object.fromEntries(
        assetKeys.map((key) => [key, computeSignalMetrics(seriesMap[key])])
      );
      const hasCompleteSignalHistory = assetKeys.every(
        (key) => signalByAsset[key]?.hasCompleteHistory
      );

      if (!cancelled) {
        setSignalState({
          status: hasCompleteSignalHistory ? 'ready' : 'fallback',
          message: hasCompleteSignalHistory
            ? 'Momentum and pullback overlays are active.'
            : 'One or more assets are missing enough history, so the optimizer fell back to pure drift correction.',
          signalByAsset,
          lastSynced: Date.now(),
        });
      }
    }

    loadSignals();

    return () => {
      cancelled = true;
    };
  }, [alphaVantage?.configured, assetKeys.join('|')]);

  const plan = useMemo(() => {
    if (!assets.length) {
      return null;
    }

    return optimizeContributionAllocation({
      assets,
      depositAmount,
      signalScoreMap:
        signalState.status === 'ready' ? signalState.signalByAsset : null,
    });
  }, [assets, depositAmount, signalState.signalByAsset, signalState.status]);

  const topPick = plan?.topPick || null;
  const lastSyncedLabel = signalState.lastSynced
    ? new Date(signalState.lastSynced).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      })
    : '--';

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Decision Engine
            </p>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              Capital Deployment Optimizer
            </h3>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              This model keeps at least half of every new contribution anchored to drift correction,
              then uses momentum and pullback context to tilt the rest inside a strict target band.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
            <label
              htmlFor="optimizerDepositAmount"
              className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400"
            >
              New contribution
            </label>
            <input
              id="optimizerDepositAmount"
              type="number"
              min="0"
              step="50"
              value={depositAmount}
              onChange={(event) =>
                setSettings((current) => ({
                  ...current,
                  depositAmount: Number(event.target.value) || 0,
                }))
              }
              className="w-44 rounded-xl border border-slate-300 bg-white px-4 py-3 text-lg font-semibold text-slate-950 shadow-sm outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-slate-50"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  refresh();
                  setSignalState((current) => ({ ...current, status: 'idle' }));
                }}
                className="rounded-xl border border-slate-300/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Refresh snapshot
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-4">
          <StatCard
            label="Primary Deployment"
            value={topPick ? topPick.key : '--'}
            detail={topPick ? `${formatCurrency(topPick.recommendedAmount)} recommended` : 'Waiting for portfolio state'}
          />
          <StatCard
            label="Execution Mode"
            value={plan?.mode === 'market-tilt' ? 'Hybrid tilt' : 'Pure drift'}
            detail={plan?.mode === 'market-tilt' ? '50% drift floor preserved' : 'Signal layer not active'}
          />
          <StatCard
            label="Band Discipline"
            value="Target + 2%"
            detail="No recommendation is allowed to push an asset above its tactical cap."
          />
          <StatCard
            label="Signal Sync"
            value={signalState.status === 'ready' ? 'Active' : signalState.status === 'loading' ? 'Loading' : 'Fallback'}
            detail={`Last sync: ${lastSyncedLabel}`}
          />
        </div>
      </div>

      <div
        className={`rounded-2xl border px-4 py-3 text-sm ${
          signalState.status === 'ready'
            ? 'border-emerald-400/30 bg-emerald-500/10 text-emerald-800 dark:text-emerald-200'
            : signalState.status === 'loading'
            ? 'border-slate-300/80 bg-slate-100/80 text-slate-700 dark:border-slate-700 dark:bg-slate-900/40 dark:text-slate-200'
            : 'border-amber-400/40 bg-amber-500/10 text-amber-900 dark:text-amber-100'
        }`}
      >
        {signalState.message || plan?.warning || 'Waiting for the optimizer to initialize.'}
      </div>

      {plan ? (
        <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
          <div className="border-b border-slate-200/80 px-6 py-4 dark:border-slate-700/70">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-slate-500 dark:text-slate-400">
                  Recommendation Matrix
                </p>
                <h4 className="mt-1 text-lg font-semibold text-slate-950 dark:text-slate-50">
                  Suggested deployment order
                </h4>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Current portfolio value {formatCurrency(plan.totalCurrentValue)}. This run allocates {formatCurrency(plan.depositAmount)}.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200/80 dark:divide-slate-700/70">
              <thead className="bg-slate-100/80 dark:bg-slate-900/70">
                <tr className="text-left text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                  <th className="px-6 py-3">Asset</th>
                  <th className="px-6 py-3">Current</th>
                  <th className="px-6 py-3">Target</th>
                  <th className="px-6 py-3">Recommend</th>
                  <th className="px-6 py-3">Est. shares</th>
                  <th className="px-6 py-3">Post-weight</th>
                  <th className="px-6 py-3">Signal</th>
                  <th className="px-6 py-3">Reasons</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/70 text-sm dark:divide-slate-800/70">
                {plan.rows.map((row) => (
                  <tr key={row.key} className="align-top">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-950 dark:text-slate-50">{row.key}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {row.signalScore !== null
                          ? `Signal score ${(row.signalScore * 100).toFixed(0)}`
                          : 'Signal overlay inactive'}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      <p>{formatCurrency(row.currentValue)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {formatPercent(row.currentWeightPercent)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {formatPercent(row.targetPercent)}
                    </td>
                    <td className="px-6 py-4 text-slate-950 dark:text-slate-50">
                      <p className="font-semibold">{formatCurrency(row.recommendedAmount)}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        Drift {formatCurrency(row.baseDriftAmount)} / Tilt {formatCurrency(row.overlayAmount)}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {row.estimatedShares !== null ? row.estimatedShares.toFixed(2) : '--'}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {formatPercent(row.postWeightPercent)}
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                      {row.signal?.momentumComposite !== null && Number.isFinite(row.signal?.momentumComposite) ? (
                        <div className="space-y-1 text-xs">
                          <p>Momentum {(row.signal.momentumComposite * 100).toFixed(1)}%</p>
                          <p>Pullback {(row.signal.drawdownFromHigh * 100).toFixed(1)}%</p>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-500 dark:text-slate-400">Drift-only</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {row.reasons.length ? (
                          row.reasons.map((reason) => <ReasonBadge key={reason} reason={reason} />)
                        ) : (
                          <span className="text-xs text-slate-500 dark:text-slate-400">Within band</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}

