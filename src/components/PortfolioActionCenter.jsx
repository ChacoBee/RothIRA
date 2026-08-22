import { useEffect, useMemo, useState } from 'react';
import { useHangarPortfolioSnapshot } from '../hooks/useHangarPortfolioSnapshot.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import { formatCurrency, formatPercent } from '../lib/formatters.js';
import { readAlphaVantageState, readLocalStorageJson, writeLocalStorageJson } from '../lib/hangarRuntime.js';

const BASE_IRA_LIMIT_2026 = 7500;
const ALPHA_VANTAGE_STORAGE_KEY = 'hangar.alphaVantageKey';
const TARGET_POLICY_HISTORY_KEY = 'rothira.targetPolicyHistory.v1';
const DEFAULT_CONTRIBUTION_STATE = {
  taxYear: 2026,
  annualLimit: BASE_IRA_LIMIT_2026,
  contributed: 0,
};

function clampNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.max(0, parsed) : fallback;
}

function formatTime(timestamp) {
  if (!timestamp) {
    return 'Static fallback';
  }
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return 'Static fallback';
  }
  return date.toLocaleString('en-US', {
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getLargestDrift(assets) {
  return assets.reduce(
    (largest, asset) => {
      const target = Number(asset.targetPercent) || 0;
      const current = Number(asset.currentPercent) || 0;
      const drift = current - target;
      const absDrift = Math.abs(drift);
      return absDrift > largest.absDrift
        ? {
            key: asset.key,
            drift,
            absDrift,
            target,
            current,
          }
        : largest;
    },
    { key: '--', drift: 0, absDrift: 0, target: 0, current: 0 }
  );
}

function buildCsv(snapshot) {
  const rows = [
    ['Ticker', 'Target %', 'Current %', 'Current Value', 'Drift %', 'Price', 'Shares'],
    ...(snapshot?.assets || []).map((asset) => {
      const target = Number(asset.targetPercent) || 0;
      const current = Number(asset.currentPercent) || 0;
      return [
        asset.key,
        target.toFixed(2),
        current.toFixed(2),
        (Number(asset.currentValue) || 0).toFixed(2),
        (current - target).toFixed(2),
        Number.isFinite(asset.price) ? asset.price.toFixed(2) : '',
        Number.isFinite(asset.shares) ? asset.shares.toFixed(6) : '',
      ];
    }),
  ];

  return rows
    .map((row) =>
      row
        .map((cell) => {
          const value = String(cell ?? '');
          return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
        })
        .join(',')
    )
    .join('\n');
}

function downloadCsv(snapshot) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  const csv = buildCsv(snapshot);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `roth-ira-portfolio-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function normalizeTargetPolicyHoldings(assets) {
  return (Array.isArray(assets) ? assets : [])
    .map((asset) => ({
      key: String(asset?.key || '').trim().toUpperCase(),
      targetPercent: Math.max(0, Number(asset?.targetPercent) || 0),
    }))
    .filter((asset) => asset.key)
    .sort((a, b) => a.key.localeCompare(b.key));
}

function buildTargetPolicySnapshot(assets) {
  const holdings = normalizeTargetPolicyHoldings(assets);
  const totalTargetPercent = holdings.reduce((sum, asset) => sum + asset.targetPercent, 0);

  return {
    timestamp: Date.now(),
    totalTargetPercent: Number(totalTargetPercent.toFixed(4)),
    holdings,
  };
}

function getPolicySignature(policy) {
  return (policy?.holdings || [])
    .map((asset) => `${asset.key}:${Number(asset.targetPercent || 0).toFixed(4)}`)
    .join('|');
}

function useTargetPolicyHistory(assets) {
  const [history, setHistory] = useState(() =>
    readLocalStorageJson(TARGET_POLICY_HISTORY_KEY, [])
  );
  const currentPolicy = useMemo(() => buildTargetPolicySnapshot(assets), [assets]);

  const saveCurrentPolicy = () => {
    if (!currentPolicy.holdings.length) {
      return;
    }

    const entry = { ...currentPolicy, timestamp: Date.now() };
    const signature = getPolicySignature(entry);
    setHistory((current) => {
      const previous = Array.isArray(current) ? current : [];
      const next = [
        entry,
        ...previous.filter((item) => getPolicySignature(item) !== signature),
      ].slice(0, 8);
      writeLocalStorageJson(TARGET_POLICY_HISTORY_KEY, next);
      return next;
    });
  };

  return {
    currentPolicy,
    history: Array.isArray(history) ? history : [],
    saveCurrentPolicy,
  };
}

function useRebalanceHistory() {
  const [history, setHistory] = useState(() =>
    readLocalStorageJson('rothira.rebalanceHistory.v1', [])
  );

  useEffect(() => {
    function handleRebalance(event) {
      const detail = event?.detail || {};
      const entry = {
        timestamp: detail.timestamp || Date.now(),
        needsRebalance: Boolean(detail.needsRebalance),
        threshold: Number(detail.threshold) || 0,
        totalBuy: Number(detail.totalBuy) || 0,
        totalSell: Number(detail.totalSell) || 0,
        holdingsWithinGuardrail: Number(detail.holdingsWithinGuardrail) || 0,
        totalHoldings: Number(detail.totalHoldings) || 0,
      };

      setHistory((current) => {
        const next = [entry, ...(Array.isArray(current) ? current : [])].slice(0, 8);
        writeLocalStorageJson('rothira.rebalanceHistory.v1', next);
        return next;
      });
    }

    document.addEventListener('rebalanceRunCompleted', handleRebalance);
    return () => document.removeEventListener('rebalanceRunCompleted', handleRebalance);
  }, []);

  return Array.isArray(history) ? history : [];
}

function readAlphaVantageRuntimeState() {
  if (typeof window === 'undefined') {
    return { configured: false, source: 'missing' };
  }

  const manager = window.AlphaVantageKeyManager;
  if (manager && typeof manager.isDemo === 'function') {
    return {
      configured: !manager.isDemo(),
      source: typeof manager.getSource === 'function' ? manager.getSource() : 'runtime',
    };
  }

  return readAlphaVantageState();
}

function persistAlphaVantageFallback(value) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const sanitized = String(value || '').trim();
    if (sanitized) {
      window.localStorage.setItem(ALPHA_VANTAGE_STORAGE_KEY, sanitized);
    } else {
      window.localStorage.removeItem(ALPHA_VANTAGE_STORAGE_KEY);
    }
  } catch {
    // Ignore local storage failures; the runtime manager may still be available.
  }
}

function useAlphaVantageKeyManager() {
  const [state, setState] = useState(() => readAlphaVantageRuntimeState());

  useEffect(() => {
    const refreshState = () => {
      window.setTimeout(() => setState(readAlphaVantageRuntimeState()), 80);
    };

    refreshState();
    window.addEventListener('alpha-vantage-key-changed', refreshState);
    window.addEventListener('hangar-data-bridge-ready', refreshState);

    return () => {
      window.removeEventListener('alpha-vantage-key-changed', refreshState);
      window.removeEventListener('hangar-data-bridge-ready', refreshState);
    };
  }, []);

  const saveKey = (value) => {
    const sanitized = String(value || '').trim();
    const manager = typeof window !== 'undefined' ? window.AlphaVantageKeyManager : null;
    if (manager && typeof manager.setKey === 'function') {
      manager.setKey(sanitized);
    } else {
      persistAlphaVantageFallback(sanitized);
      window.dispatchEvent(new CustomEvent('alpha-vantage-key-changed'));
    }
    setState(readAlphaVantageRuntimeState());
  };

  const clearKey = () => {
    const manager = typeof window !== 'undefined' ? window.AlphaVantageKeyManager : null;
    if (manager && typeof manager.clearKey === 'function') {
      manager.clearKey();
    } else {
      persistAlphaVantageFallback('');
      window.dispatchEvent(new CustomEvent('alpha-vantage-key-changed'));
    }
    setState(readAlphaVantageRuntimeState());
  };

  return {
    state,
    saveKey,
    clearKey,
  };
}

function ActionMetric({ label, value, detail, tone = 'neutral' }) {
  const toneClasses = {
    good: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-900 dark:text-emerald-100',
    warn: 'border-amber-400/40 bg-amber-500/10 text-amber-950 dark:text-amber-100',
    bad: 'border-rose-400/40 bg-rose-500/10 text-rose-950 dark:text-rose-100',
    neutral: 'border-slate-200/80 bg-white/70 text-slate-900 dark:border-slate-700/70 dark:bg-slate-950/45 dark:text-slate-100',
  };

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${toneClasses[tone] || toneClasses.neutral}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm opacity-75">{detail}</p>
    </div>
  );
}

function buildPriorityAlerts({
  alphaConfigured,
  assets,
  contributionLimit,
  contributionRemaining,
  hasFreshData,
  largestDrift,
  rawContributed,
  snapshot,
}) {
  const alerts = [];
  const lastUpdated = Number(snapshot?.totals?.lastUpdated) || 0;
  const staleMs = lastUpdated ? Date.now() - lastUpdated : Number.POSITIVE_INFINITY;
  const staleHours = staleMs / 36e5;

  if (!hasFreshData || staleHours >= 24) {
    alerts.push({
      id: 'data-freshness',
      tone: 'warn',
      title: 'Data freshness',
      detail: hasFreshData
        ? `Portfolio snapshot is ${staleHours.toFixed(0)} hours old.`
        : 'Portfolio snapshot is using static fallback data.',
      action: 'Refresh the Google Sheets feed or verify the data source.',
    });
  }

  if (!assets.length) {
    alerts.push({
      id: 'holdings-pending',
      tone: 'warn',
      title: 'Holdings pending',
      detail: 'No holdings are available in the runtime bridge yet.',
      action: 'Wait for the legacy data bridge or refresh the snapshot.',
    });
  }

  if (largestDrift.absDrift >= 5) {
    alerts.push({
      id: 'rebalance-needed',
      tone: 'bad',
      title: 'Rebalance review',
      detail: `${largestDrift.key} is ${formatPercent(largestDrift.drift)} away from target.`,
      action: 'Run the rebalance calculator before adding more capital.',
    });
  } else if (largestDrift.absDrift >= 2) {
    alerts.push({
      id: 'rebalance-watch',
      tone: 'warn',
      title: 'Allocation watch',
      detail: `${largestDrift.key} is drifting by ${formatPercent(largestDrift.drift)}.`,
      action: 'Prioritize new contributions toward the largest underweight holding.',
    });
  }

  if (contributionLimit > 0 && rawContributed > contributionLimit) {
    alerts.push({
      id: 'contribution-over-limit',
      tone: 'bad',
      title: 'Contribution over limit',
      detail: `${formatCurrency(rawContributed - contributionLimit)} is above the configured tax-year limit.`,
      action: 'Confirm the annual limit and contribution entries.',
    });
  } else if (contributionLimit > 0 && contributionRemaining <= 0) {
    alerts.push({
      id: 'contribution-complete',
      tone: 'good',
      title: 'Contribution complete',
      detail: 'Configured tax-year contribution target is fully funded.',
      action: 'Future deposits should be checked against eligibility and annual limits.',
    });
  }

  if (!alphaConfigured) {
    alerts.push({
      id: 'alpha-vantage-fallback',
      tone: 'warn',
      title: 'Historical data fallback',
      detail: 'Alpha Vantage history is using fallback data, so optimizer and replay tools stay conservative.',
      action: 'Save a local Alpha Vantage key in Data Sources.',
    });
  }

  if (!alerts.length) {
    alerts.push({
      id: 'all-clear',
      tone: 'good',
      title: 'No priority alerts',
      detail: 'Data freshness, allocation drift, contribution progress, and history source checks are in range.',
      action: 'Continue monitoring before the next contribution or rebalance review.',
    });
  }

  return alerts.slice(0, 4);
}

function PriorityAlert({ alert }) {
  const toneClasses = {
    good: 'border-emerald-300/70 bg-emerald-500/10 text-emerald-900 dark:border-emerald-400/40 dark:text-emerald-100',
    warn: 'border-amber-300/80 bg-amber-500/10 text-amber-950 dark:border-amber-400/40 dark:text-amber-100',
    bad: 'border-rose-300/80 bg-rose-500/10 text-rose-950 dark:border-rose-400/40 dark:text-rose-100',
  };

  return (
    <article
      data-priority-alert={alert.id}
      className={`rounded-2xl border p-4 ${toneClasses[alert.tone] || toneClasses.warn}`}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70">{alert.title}</p>
      <p className="mt-2 text-sm font-semibold">{alert.detail}</p>
      <p className="mt-2 text-sm opacity-75">{alert.action}</p>
    </article>
  );
}

export default function PortfolioActionCenter() {
  const { snapshot, refresh } = useHangarPortfolioSnapshot();
  const { state: alphaVantageState, saveKey: saveAlphaVantageKey, clearKey: clearAlphaVantageKey } = useAlphaVantageKeyManager();
  const [contribution, setContribution] = usePersistentState(
    'rothira.contributionTracker.v1',
    DEFAULT_CONTRIBUTION_STATE
  );
  const [alphaKeyInput, setAlphaKeyInput] = useState('');
  const [alphaKeyFeedback, setAlphaKeyFeedback] = useState({ type: '', message: '' });
  const rebalanceHistory = useRebalanceHistory();
  const assets = snapshot?.assets || [];
  const {
    currentPolicy,
    history: targetPolicyHistory,
    saveCurrentPolicy,
  } = useTargetPolicyHistory(assets);

  const totalValue = snapshot?.totals?.currentValue || 0;
  const largestDrift = useMemo(() => getLargestDrift(assets), [assets]);
  const contributionLimit = clampNumber(contribution?.annualLimit, BASE_IRA_LIMIT_2026);
  const rawContributed = clampNumber(contribution?.contributed);
  const contributed = Math.min(rawContributed, contributionLimit);
  const contributionProgress =
    contributionLimit > 0 ? Math.min(100, (contributed / contributionLimit) * 100) : 0;
  const contributionRemaining = Math.max(0, contributionLimit - contributed);
  const retirementSettings = readLocalStorageJson('hangar.retirementLab', {});
  const annualSpending = clampNumber(retirementSettings?.desiredAnnualSpending, 50000);
  const targetNestEgg = annualSpending * 25;
  const goalProgress = targetNestEgg > 0 ? Math.min(100, (totalValue / targetNestEgg) * 100) : 0;
  const underweight = assets
    .map((asset) => ({
      key: asset.key,
      gap: (Number(asset.targetPercent) || 0) - (Number(asset.currentPercent) || 0),
    }))
    .sort((a, b) => b.gap - a.gap)[0];
  const latestRebalance = rebalanceHistory[0] || null;
  const latestPolicy = targetPolicyHistory[0] || null;
  const currentPolicySignature = useMemo(() => getPolicySignature(currentPolicy), [currentPolicy]);
  const latestPolicySignature = useMemo(() => getPolicySignature(latestPolicy), [latestPolicy]);
  const policyStatus = !currentPolicy.holdings.length
    ? 'Waiting for holdings'
    : !latestPolicy
      ? 'Not saved'
      : currentPolicySignature === latestPolicySignature
        ? 'Current policy saved'
        : 'Policy changed';
  const policyStatusTone =
    policyStatus === 'Current policy saved'
      ? 'border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-200'
      : policyStatus === 'Policy changed'
        ? 'border-amber-300 bg-amber-500/10 text-amber-800 dark:border-amber-400/40 dark:text-amber-200'
        : 'border-slate-300 bg-white/70 text-slate-600 dark:border-slate-600 dark:bg-slate-950/40 dark:text-slate-300';
  const policyPreview = currentPolicy.holdings.slice(0, 6);
  const extraPolicyHoldingCount = Math.max(0, currentPolicy.holdings.length - policyPreview.length);
  const hasFreshData = Boolean(snapshot?.totals?.lastUpdated);
  const driftTone = largestDrift.absDrift >= 5 ? 'bad' : largestDrift.absDrift >= 2 ? 'warn' : 'good';
  const rebalanceLabel =
    largestDrift.absDrift >= 5 ? 'Review now' : largestDrift.absDrift >= 2 ? 'Watch drift' : 'In range';
  const riskScore = snapshot?.analytics?.portfolioScore;
  const riskDetail = Number.isFinite(riskScore)
    ? `Portfolio score ${riskScore.toFixed(0)}/100`
    : 'Analytics will populate after the dashboard finishes calculating.';
  const alphaConfigured = Boolean(alphaVantageState?.configured);
  const priorityAlerts = useMemo(
    () =>
      buildPriorityAlerts({
        alphaConfigured,
        assets,
        contributionLimit,
        contributionRemaining,
        hasFreshData,
        largestDrift,
        rawContributed,
        snapshot,
      }),
    [
      alphaConfigured,
      assets,
      contributionLimit,
      contributionRemaining,
      hasFreshData,
      largestDrift,
      rawContributed,
      snapshot,
    ]
  );

  const handleAlphaKeySubmit = (event) => {
    event.preventDefault();
    const nextKey = alphaKeyInput.trim();
    if (!nextKey) {
      setAlphaKeyFeedback({ type: 'error', message: 'Enter an Alpha Vantage key before saving.' });
      return;
    }

    saveAlphaVantageKey(nextKey);
    setAlphaKeyInput('');
    setAlphaKeyFeedback({ type: 'success', message: 'Alpha Vantage key saved locally.' });
  };

  const handleAlphaKeyClear = () => {
    clearAlphaVantageKey();
    setAlphaKeyFeedback({ type: 'success', message: 'Alpha Vantage key removed from this browser.' });
  };

  return (
    <section className="portfolio-action-center rounded-[28px] border border-slate-200/80 bg-white/85 p-5 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/70">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-600 dark:text-sky-300">
            Action Center
          </p>
          <h2 id="actionCenterTitle" className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            Roth IRA Portfolio Dashboard
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            Fast status for allocation drift, contribution progress, data freshness, and retirement-readiness checks.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={refresh}
            className="rounded-xl border border-slate-300/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Refresh snapshot
          </button>
          <button
            type="button"
            onClick={() => downloadCsv(snapshot)}
            className="rounded-xl border border-sky-400/50 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/20 dark:text-sky-200"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-xl border border-slate-300/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Print / PDF
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <ActionMetric
          label="Portfolio Value"
          value={formatCurrency(totalValue)}
          detail={`Data: ${formatTime(snapshot?.totals?.lastUpdated)}`}
          tone={hasFreshData ? 'good' : 'warn'}
        />
        <ActionMetric
          label="Largest Drift"
          value={`${largestDrift.key} ${formatPercent(largestDrift.drift)}`}
          detail={`${rebalanceLabel}; target ${formatPercent(largestDrift.target)}, current ${formatPercent(largestDrift.current)}`}
          tone={driftTone}
        />
        <ActionMetric
          label="Next Contribution"
          value={underweight?.gap > 0 ? underweight.key : 'Balanced'}
          detail={
            underweight?.gap > 0
              ? `${formatPercent(underweight.gap)} under target; consider prioritizing new cash.`
              : 'No material underweight asset detected.'
          }
          tone={underweight?.gap >= 2 ? 'warn' : 'good'}
        />
        <ActionMetric
          label="Risk Snapshot"
          value={Number.isFinite(riskScore) ? `${riskScore.toFixed(0)}/100` : 'Pending'}
          detail={riskDetail}
          tone={Number.isFinite(riskScore) && riskScore < 65 ? 'warn' : 'neutral'}
        />
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Priority Alerts
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              Review queue
            </h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {priorityAlerts.length} active check{priorityAlerts.length === 1 ? '' : 's'}
          </p>
        </div>
        <div data-priority-alerts className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
          {priorityAlerts.map((alert) => (
            <PriorityAlert key={alert.id} alert={alert} />
          ))}
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_20rem]">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Tax-Year Contribution
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {contribution.taxYear || 2026} base IRA limit defaults to {formatCurrency(BASE_IRA_LIMIT_2026)}.
              </p>
            </div>
            <p className="text-lg font-semibold text-slate-950 dark:text-white">
              {formatCurrency(contributionRemaining)} left
            </p>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${contributionProgress}%` }}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Contributed
              <input
                type="number"
                min="0"
                step="50"
                value={contribution.contributed ?? 0}
                onChange={(event) =>
                  setContribution((current) => ({
                    ...current,
                    contributed: clampNumber(event.target.value),
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              />
            </label>
            <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
              Annual limit
              <input
                type="number"
                min="0"
                step="100"
                value={contribution.annualLimit ?? BASE_IRA_LIMIT_2026}
                onChange={(event) =>
                  setContribution((current) => ({
                    ...current,
                    annualLimit: clampNumber(event.target.value, BASE_IRA_LIMIT_2026),
                  }))
                }
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              />
            </label>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Retirement Goal Progress
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                {formatPercent(goalProgress)}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                Toward {formatCurrency(targetNestEgg)} target using 25x annual spending.
              </p>
            </div>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              {formatCurrency(annualSpending)}/yr
            </p>
          </div>
          <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div className="h-full rounded-full bg-emerald-500" style={{ width: `${goalProgress}%` }} />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
            Rebalance History
          </p>
          {latestRebalance ? (
            <div className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p className="text-lg font-semibold text-slate-950 dark:text-white">
                {latestRebalance.needsRebalance ? 'Action needed' : 'Within guardrail'}
              </p>
              <p>{formatTime(latestRebalance.timestamp)}</p>
              <p>
                {latestRebalance.holdingsWithinGuardrail}/{latestRebalance.totalHoldings} holdings in range
              </p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Run the rebalance calculator once to start the local history log.
            </p>
          )}
        </div>
      </div>

      <div
        data-target-policy-panel
        className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Target Allocation Policy
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              Policy snapshots
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Current target weights and local history for allocation-policy reviews.
            </p>
          </div>
          <span
            data-target-policy-status
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${policyStatusTone}`}
          >
            {policyStatus}
          </span>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  Current target mix
                </p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                  {currentPolicy.holdings.length
                    ? `${currentPolicy.holdings.length} holdings, target total ${formatPercent(currentPolicy.totalTargetPercent)}`
                    : 'Waiting for holdings from the portfolio snapshot.'}
                </p>
              </div>
              <button
                type="button"
                data-target-policy-save
                onClick={saveCurrentPolicy}
                disabled={!currentPolicy.holdings.length}
                className="rounded-xl border border-sky-400/50 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/20 disabled:cursor-not-allowed disabled:border-slate-300 disabled:bg-slate-100 disabled:text-slate-400 dark:text-sky-200 dark:disabled:border-slate-700 dark:disabled:bg-slate-900 dark:disabled:text-slate-500"
              >
                Save policy snapshot
              </button>
            </div>
            <div
              data-target-policy-current
              className="mt-4 flex flex-wrap gap-2"
            >
              {policyPreview.length ? (
                <>
                  {policyPreview.map((asset) => (
                    <span
                      key={asset.key}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-200"
                    >
                      {asset.key} {formatPercent(asset.targetPercent)}
                    </span>
                  ))}
                  {extraPolicyHoldingCount ? (
                    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
                      +{extraPolicyHoldingCount} more
                    </span>
                  ) : null}
                </>
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  No target weights are available yet.
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-950/35">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              History
            </p>
            <div data-target-policy-history className="mt-3 space-y-2">
              {targetPolicyHistory.length ? (
                targetPolicyHistory.slice(0, 4).map((entry) => (
                  <div
                    key={`${entry.timestamp}-${getPolicySignature(entry)}`}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300"
                  >
                    <p className="font-semibold text-slate-950 dark:text-white">
                      Saved {formatTime(entry.timestamp)}
                    </p>
                    <p>
                      {(entry.holdings || []).length} holdings, target total {formatPercent(Number(entry.totalTargetPercent) || 0)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  No snapshots saved yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Data Sources
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              Alpha Vantage history
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Used by optimizer, historical replay, volatility, and correlation calculations. Keys are stored only in this browser.
            </p>
          </div>
          <span
            data-alpha-vantage-status
            className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${
              alphaConfigured
                ? 'border-emerald-300 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-200'
                : 'border-amber-300 bg-amber-500/10 text-amber-800 dark:border-amber-400/40 dark:text-amber-200'
            }`}
          >
            {alphaConfigured ? `Configured via ${alphaVantageState.source || 'runtime'}` : 'Fallback data only'}
          </span>
        </div>

        <form
          data-alpha-vantage-key-form
          className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_auto]"
          onSubmit={handleAlphaKeySubmit}
        >
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            Local Alpha Vantage key
            <input
              data-alpha-vantage-key-input
              type="password"
              value={alphaKeyInput}
              onChange={(event) => {
                setAlphaKeyInput(event.target.value);
                if (alphaKeyFeedback.message) {
                  setAlphaKeyFeedback({ type: '', message: '' });
                }
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-normal tracking-normal text-slate-950 outline-none focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950 dark:text-white"
              placeholder="Paste personal Alpha Vantage key"
              autoComplete="off"
            />
          </label>
          <button
            type="submit"
            data-alpha-vantage-key-save
            className="self-end rounded-xl border border-sky-400/50 bg-sky-500/10 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-500/20 dark:text-sky-200"
          >
            Save key
          </button>
          <button
            type="button"
            data-alpha-vantage-key-clear
            onClick={handleAlphaKeyClear}
            className="self-end rounded-xl border border-slate-300/80 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Forget key
          </button>
          {alphaKeyFeedback.message ? (
            <p
              data-alpha-vantage-key-feedback
              className={`lg:col-span-3 text-xs font-semibold ${
                alphaKeyFeedback.type === 'error' ? 'text-rose-700 dark:text-rose-200' : 'text-emerald-700 dark:text-emerald-200'
              }`}
            >
              {alphaKeyFeedback.message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
