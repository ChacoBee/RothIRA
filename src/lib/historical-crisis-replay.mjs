const EPSILON = 1e-6;

export const HISTORICAL_CRISIS_PRESETS = Object.freeze([
  {
    id: 'dot-com-crash',
    label: 'Dot-com Crash',
    startDate: '2000-03-24',
    endDate: '2002-10-09',
  },
  {
    id: 'global-financial-crisis',
    label: 'Global Financial Crisis',
    startDate: '2007-10-09',
    endDate: '2009-03-09',
  },
  {
    id: 'covid-crash',
    label: 'COVID Crash',
    startDate: '2020-02-19',
    endDate: '2020-03-23',
  },
  {
    id: 'inflation-rate-shock',
    label: 'Inflation / Rate Shock',
    startDate: '2022-01-03',
    endDate: '2022-10-12',
  },
]);

function toEpochMs(input) {
  if (input instanceof Date) {
    return input.getTime();
  }
  if (typeof input === 'number') {
    return input;
  }
  if (typeof input === 'string') {
    if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
      return Date.parse(`${input}T00:00:00Z`);
    }
    return Date.parse(input);
  }
  return Number.NaN;
}

function formatDate(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function normalizeSeries(series) {
  return Array.isArray(series)
    ? series
        .map((point) => ({
          date: point?.date,
          price: Number(point?.price),
          time: toEpochMs(point?.date),
        }))
        .filter((point) => Number.isFinite(point.price) && Number.isFinite(point.time))
        .sort((a, b) => a.time - b.time)
    : [];
}

function normalizeWeights(weightMap) {
  const entries = Object.entries(weightMap || {}).filter(([key]) => key);
  const positiveValues = entries.map(([, value]) => Math.max(0, Number(value) || 0));
  const total = positiveValues.reduce((sum, value) => sum + value, 0);

  if (total <= EPSILON) {
    return Object.fromEntries(entries.map(([key]) => [key, 0]));
  }

  return Object.fromEntries(
    entries.map(([key], index) => [key, positiveValues[index] / total])
  );
}

function sliceTimeline(series, startMs, endMs) {
  return series.filter((point) => point.time >= startMs && point.time <= endMs);
}

function hasFullCoverage(series, startMs, endMs) {
  if (!series.length) {
    return false;
  }
  return series[0].time <= startMs && series[series.length - 1].time >= endMs;
}

function buildIndexedCurve(series, timeline) {
  if (!series.length || !timeline.length) {
    return [];
  }

  let cursor = 0;
  let lastPrice = null;
  let startPrice = null;
  const points = [];

  timeline.forEach((point) => {
    while (cursor < series.length && series[cursor].time <= point.time) {
      lastPrice = series[cursor].price;
      cursor += 1;
    }

    if (!Number.isFinite(lastPrice)) {
      return;
    }

    if (!Number.isFinite(startPrice)) {
      startPrice = lastPrice;
    }

    points.push({
      date: point.date,
      time: point.time,
      value: startPrice > 0 ? lastPrice / startPrice : 0,
    });
  });

  return points;
}

function computeMaxDrawdown(points) {
  if (!points.length) {
    return {
      maxDrawdown: 0,
      peakDate: null,
      troughDate: null,
      recoveryDate: null,
      recoveryCalendarDays: null,
      recoveryTradingDays: null,
      troughIndex: -1,
    };
  }

  let peakValue = points[0].value;
  let peakDate = points[0].date;
  let peakIndex = 0;
  let maxDrawdown = 0;
  let troughDate = points[0].date;
  let troughIndex = 0;
  let drawdownPeakValue = peakValue;
  let drawdownPeakDate = peakDate;
  let drawdownPeakIndex = peakIndex;

  points.forEach((point, index) => {
    if (point.value > peakValue) {
      peakValue = point.value;
      peakDate = point.date;
      peakIndex = index;
    }

    const drawdown = peakValue > 0 ? 1 - point.value / peakValue : 0;
    if (drawdown > maxDrawdown + EPSILON) {
      maxDrawdown = drawdown;
      troughDate = point.date;
      troughIndex = index;
      drawdownPeakValue = peakValue;
      drawdownPeakDate = peakDate;
      drawdownPeakIndex = peakIndex;
    }
  });

  let recoveryDate = null;
  let recoveryTradingDays = null;
  let recoveryCalendarDays = null;

  if (maxDrawdown > EPSILON) {
    for (let index = troughIndex + 1; index < points.length; index += 1) {
      if (points[index].value >= drawdownPeakValue - EPSILON) {
        recoveryDate = points[index].date;
        recoveryTradingDays = index - troughIndex;
        recoveryCalendarDays = Math.round(
          (toEpochMs(recoveryDate) - toEpochMs(troughDate)) / (24 * 60 * 60 * 1000)
        );
        break;
      }
    }
  }

  return {
    maxDrawdown,
    peakDate: drawdownPeakDate,
    troughDate,
    recoveryDate,
    recoveryCalendarDays,
    recoveryTradingDays,
    troughIndex,
    peakIndex: drawdownPeakIndex,
  };
}

export function getHistoricalCrisisPreset(id) {
  return HISTORICAL_CRISIS_PRESETS.find((preset) => preset.id === id) || null;
}

export function simulateHistoricalCrisisReplay({
  assetSeriesByKey,
  weightByKey,
  startDate,
  endDate,
  benchmarkSeries = null,
  benchmarkLabel = 'SPY',
} = {}) {
  const startMs = toEpochMs(startDate);
  const endMs = toEpochMs(endDate);

  if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || startMs >= endMs) {
    return {
      ok: false,
      reason: 'INVALID_WINDOW',
    };
  }

  const normalizedWeights = normalizeWeights(weightByKey);
  const normalizedAssets = Object.fromEntries(
    Object.entries(assetSeriesByKey || {}).map(([key, series]) => [key, normalizeSeries(series)])
  );
  const coveredKeys = Object.keys(normalizedWeights).filter((key) =>
    hasFullCoverage(normalizedAssets[key] || [], startMs, endMs)
  );
  const excludedKeys = Object.keys(normalizedWeights).filter(
    (key) => !coveredKeys.includes(key)
  );

  const coveredWeightSum = coveredKeys.reduce(
    (sum, key) => sum + (normalizedWeights[key] || 0),
    0
  );

  if (coveredWeightSum <= EPSILON) {
    return {
      ok: false,
      reason: 'NO_COVERAGE',
      coveredKeys,
      excludedKeys,
      coveragePercent: 0,
    };
  }

  const replayWeights = Object.fromEntries(
    coveredKeys.map((key) => [key, (normalizedWeights[key] || 0) / coveredWeightSum])
  );

  const normalizedBenchmarkSeries = normalizeSeries(benchmarkSeries);
  const benchmarkCovered = hasFullCoverage(normalizedBenchmarkSeries, startMs, endMs);
  const masterTimelineSource = benchmarkCovered
    ? normalizedBenchmarkSeries
    : normalizedAssets[coveredKeys[0]] || [];
  const timeline = sliceTimeline(masterTimelineSource, startMs, endMs);

  if (!timeline.length) {
    return {
      ok: false,
      reason: 'EMPTY_TIMELINE',
      coveredKeys,
      excludedKeys,
      coveragePercent: coveredWeightSum * 100,
    };
  }

  const assetCurves = Object.fromEntries(
    coveredKeys.map((key) => [
      key,
      buildIndexedCurve(normalizedAssets[key], timeline),
    ])
  );
  const benchmarkCurve = benchmarkCovered
    ? buildIndexedCurve(normalizedBenchmarkSeries, timeline)
    : [];

  const portfolioCurve = timeline.map((point, index) => {
    const value = coveredKeys.reduce((sum, key) => {
      const curvePoint = assetCurves[key]?.[index];
      if (!curvePoint) {
        return sum;
      }
      return sum + (replayWeights[key] || 0) * curvePoint.value;
    }, 0);

    return {
      date: point.date,
      time: point.time,
      value,
    };
  });

  const drawdown = computeMaxDrawdown(portfolioCurve);
  const troughIndex = drawdown.troughIndex;
  const worstContributors =
    troughIndex >= 0
      ? coveredKeys
          .map((key) => {
            const startValue = assetCurves[key]?.[0]?.value || 1;
            const troughValue = assetCurves[key]?.[troughIndex]?.value || startValue;
            return {
              key,
              contribution: (replayWeights[key] || 0) * (troughValue - startValue),
              weight: replayWeights[key] || 0,
            };
          })
          .sort((left, right) => left.contribution - right.contribution)
      : [];

  return {
    ok: true,
    benchmarkLabel,
    coveredKeys,
    excludedKeys,
    coveragePercent: coveredWeightSum * 100,
    normalizedWeights: replayWeights,
    portfolioCurve,
    benchmarkCurve,
    startDate: timeline[0].date,
    endDate: timeline[timeline.length - 1].date,
    totalReturn:
      portfolioCurve.length && portfolioCurve[0].value > 0
        ? portfolioCurve[portfolioCurve.length - 1].value - 1
        : 0,
    benchmarkReturn:
      benchmarkCurve.length && benchmarkCurve[0].value > 0
        ? benchmarkCurve[benchmarkCurve.length - 1].value - 1
        : null,
    drawdown,
    worstContributors,
  };
}

