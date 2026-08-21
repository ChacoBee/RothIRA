import { startTransition, useEffect, useMemo, useState } from 'react';
import { useHangarPortfolioSnapshot } from '../hooks/useHangarPortfolioSnapshot.js';
import { usePersistentState } from '../hooks/usePersistentState.js';
import { runMonteCarloRetirementLab } from '../lib/monte-carlo-retirement.mjs';
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

function InputField({ label, type = 'number', value, onChange, suffix = null }) {
  return (
    <label className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
      <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
        {label}
      </span>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-sky-500 dark:border-slate-600 dark:bg-slate-950"
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-slate-500 dark:text-slate-400">
            {suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

export default function MonteCarloRetirementLab() {
  const { snapshot } = useHangarPortfolioSnapshot();
  const [settings, setSettings] = usePersistentState('hangar.retirementLab', {
    currentAge: 30,
    retirementAge: 60,
    annualContribution: 7000,
    annualContributionGrowth: 3,
    inflationRate: 2.5,
    desiredAnnualSpending: 50000,
    useManualAssumptions: false,
    manualExpectedReturn: null,
    manualVolatility: null,
  });
  const [resultState, setResultState] = useState({
    status: 'idle',
    result: null,
  });

  const defaultExpectedReturn =
    (snapshot?.analytics?.expectedReturn || snapshot?.defaults?.portfolioDefaults?.marketReturn || 0.08) * 100;
  const defaultVolatility =
    (snapshot?.analytics?.volatility || snapshot?.defaults?.portfolioDefaults?.benchmarkVolatility || 0.16) * 100;
  const currentPortfolioValue =
    snapshot?.totals?.currentValue ||
    snapshot?.assets?.reduce((sum, asset) => sum + (asset.currentValue || 0), 0) ||
    0;

  const expectedReturnPercent = settings.useManualAssumptions
    ? Number(settings.manualExpectedReturn ?? defaultExpectedReturn) || 0
    : defaultExpectedReturn;
  const volatilityPercent = settings.useManualAssumptions
    ? Number(settings.manualVolatility ?? defaultVolatility) || 0
    : defaultVolatility;

  const simulationInput = useMemo(
    () => ({
      currentPortfolioValue,
      currentAge: Number(settings.currentAge) || 0,
      retirementAge: Number(settings.retirementAge) || 0,
      annualContribution: Number(settings.annualContribution) || 0,
      annualContributionGrowth: (Number(settings.annualContributionGrowth) || 0) / 100,
      expectedReturn: expectedReturnPercent / 100,
      volatility: volatilityPercent / 100,
      inflationRate: (Number(settings.inflationRate) || 0) / 100,
      desiredAnnualSpending: Number(settings.desiredAnnualSpending) || 0,
      simulationCount: 10000,
      seed: 42,
    }),
    [
      currentPortfolioValue,
      expectedReturnPercent,
      settings.annualContribution,
      settings.annualContributionGrowth,
      settings.currentAge,
      settings.desiredAnnualSpending,
      settings.inflationRate,
      settings.retirementAge,
      volatilityPercent,
    ]
  );

  useEffect(() => {
    let cancelled = false;
    setResultState((current) => ({ ...current, status: 'calculating' }));

    const timeoutId = window.setTimeout(() => {
      const nextResult = runMonteCarloRetirementLab(simulationInput);
      if (cancelled) {
        return;
      }

      startTransition(() => {
        setResultState({
          status: 'ready',
          result: nextResult,
        });
      });
    }, 0);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [simulationInput]);

  const result = resultState.result;

  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Probability Engine
            </p>
            <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">
              Monte Carlo Retirement Lab
            </h3>
            <p className="max-w-3xl text-sm text-slate-600 dark:text-slate-300">
              This lab projects retirement readiness using the current portfolio as the default return and
              volatility source, then runs 10,000 seeded paths to estimate success and shortfall risk.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Portfolio defaults
            </p>
            <div className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <p>Expected return {formatPercent(defaultExpectedReturn)}</p>
              <p>Volatility {formatPercent(defaultVolatility)}</p>
              <p>Current value {formatCurrency(currentPortfolioValue)}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <InputField
            label="Current age"
            value={settings.currentAge}
            onChange={(event) =>
              setSettings((current) => ({ ...current, currentAge: Number(event.target.value) || 0 }))
            }
          />
          <InputField
            label="Retirement age"
            value={settings.retirementAge}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                retirementAge: Number(event.target.value) || 0,
              }))
            }
          />
          <InputField
            label="Annual contribution"
            value={settings.annualContribution}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                annualContribution: Number(event.target.value) || 0,
              }))
            }
          />
          <InputField
            label="Contribution growth"
            value={settings.annualContributionGrowth}
            suffix="%"
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                annualContributionGrowth: Number(event.target.value) || 0,
              }))
            }
          />
          <InputField
            label="Inflation"
            value={settings.inflationRate}
            suffix="%"
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                inflationRate: Number(event.target.value) || 0,
              }))
            }
          />
          <InputField
            label="Desired annual spending"
            value={settings.desiredAnnualSpending}
            onChange={(event) =>
              setSettings((current) => ({
                ...current,
                desiredAnnualSpending: Number(event.target.value) || 0,
              }))
            }
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-700/70 dark:bg-slate-900/40">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Assumption source
              </p>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                Toggle manual assumptions only when you want to override the live portfolio baseline.
              </p>
            </div>
            <label className="inline-flex items-center gap-3 rounded-full border border-slate-300/80 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-600 dark:bg-slate-950/50 dark:text-slate-200">
              <input
                type="checkbox"
                checked={settings.useManualAssumptions}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    useManualAssumptions: event.target.checked,
                    manualExpectedReturn:
                      current.manualExpectedReturn ?? Number(defaultExpectedReturn.toFixed(2)),
                    manualVolatility:
                      current.manualVolatility ?? Number(defaultVolatility.toFixed(2)),
                  }))
                }
              />
              Use manual assumptions
            </label>
          </div>

          {settings.useManualAssumptions ? (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <InputField
                label="Expected return override"
                value={settings.manualExpectedReturn ?? Number(defaultExpectedReturn.toFixed(2))}
                suffix="%"
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    manualExpectedReturn: Number(event.target.value) || 0,
                  }))
                }
              />
              <InputField
                label="Volatility override"
                value={settings.manualVolatility ?? Number(defaultVolatility.toFixed(2))}
                suffix="%"
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    manualVolatility: Number(event.target.value) || 0,
                  }))
                }
              />
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
          Retirement readiness
        </p>
        <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-emerald-400 to-emerald-500 transition-all"
            style={{
              width: `${
                resultState.status === 'ready' && result
                  ? Math.max(4, result.successProbability * 100)
                  : 6
              }%`,
            }}
          />
        </div>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
          {resultState.status === 'calculating'
            ? 'Running 10,000 deterministic paths…'
            : result
            ? `${formatPercent(result.successProbability * 100)} probability of reaching the target nest egg by retirement.`
            : 'Waiting for the simulation to initialize.'}
        </p>
      </div>

      {result ? (
        <>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-6">
            <StatCard
              label="Success"
              value={formatPercent(result.successProbability * 100)}
              detail="Probability of hitting the target nest egg"
            />
            <StatCard
              label="Shortfall"
              value={formatPercent(result.shortfallProbability * 100)}
              detail="Probability of ending below the target"
            />
            <StatCard
              label="P10 balance"
              value={formatCurrency(result.percentiles.p10)}
              detail="Cautious path"
            />
            <StatCard
              label="P50 balance"
              value={formatCurrency(result.percentiles.p50)}
              detail="Median outcome"
            />
            <StatCard
              label="P90 balance"
              value={formatCurrency(result.percentiles.p90)}
              detail="Strong path"
            />
            <StatCard
              label="Safe spend"
              value={formatCurrency(result.impliedSafeAnnualSpend)}
              detail="4% of the median retirement balance"
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr,1fr]">
            <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Target math
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
                <StatCard
                  label="Years to retirement"
                  value={String(result.yearsToRetirement)}
                />
                <StatCard
                  label="Inflated spending"
                  value={formatCurrency(result.inflatedAnnualSpending)}
                  detail="Desired annual spending carried forward to retirement"
                />
                <StatCard
                  label="Target nest egg"
                  value={formatCurrency(result.targetNestEgg)}
                  detail="Inflated spending divided by 4%"
                />
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200/80 bg-white/80 p-6 shadow-xl shadow-slate-950/5 dark:border-slate-700/70 dark:bg-slate-950/60">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                Median outcome
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-slate-50">
                {formatCurrency(result.medianSurplus)}
              </p>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                {result.medianSurplus >= 0
                  ? 'Median path clears the target by this amount.'
                  : 'Median path lands below the target by this amount.'}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

