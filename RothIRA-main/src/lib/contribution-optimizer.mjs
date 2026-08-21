const EPSILON = 1e-6;
const DEFAULT_MINIMUM_DRIFT_SHARE = 0.5;
const DEFAULT_MAX_TARGET_BAND_PERCENT = 2;
const DEFAULT_MOMENTUM_SHORT_DAYS = 63;
const DEFAULT_MOMENTUM_LONG_DAYS = 126;
const DEFAULT_DRAWDOWN_LOOKBACK_DAYS = 126;

function clamp(value, min, max) {
  if (!Number.isFinite(value)) {
    return min;
  }
  return Math.min(max, Math.max(min, value));
}

function sumValues(values) {
  return values.reduce((total, value) => total + value, 0);
}

function normalizeAssets(assets) {
  const prepared = Array.isArray(assets)
    ? assets
        .map((asset) => ({
          key: String(asset?.key || '').trim(),
          targetPercent: Number(asset?.targetPercent) || 0,
          currentValue: Number(asset?.currentValue) || 0,
          price: Number(asset?.price) || 0,
        }))
        .filter((asset) => asset.key)
    : [];

  const totalTarget = sumValues(
    prepared.map((asset) => (asset.targetPercent > 0 ? asset.targetPercent : 0))
  );

  if (totalTarget <= EPSILON) {
    return prepared.map((asset) => ({
      ...asset,
      normalizedTargetPercent: prepared.length ? 100 / prepared.length : 0,
    }));
  }

  return prepared.map((asset) => ({
    ...asset,
    normalizedTargetPercent:
      asset.targetPercent > 0 ? (asset.targetPercent / totalTarget) * 100 : 0,
  }));
}

function normalizeWeightMap(weightMap, fallbackKeys = []) {
  const keys = fallbackKeys.length
    ? fallbackKeys
    : Object.keys(weightMap || {}).filter((key) => key);
  const positiveValues = keys.map((key) => Math.max(0, Number(weightMap?.[key]) || 0));
  const total = sumValues(positiveValues);

  if (total <= EPSILON) {
    return Object.fromEntries(
      keys.map((key) => [key, fallbackKeys.length ? 1 / fallbackKeys.length : 0])
    );
  }

  return Object.fromEntries(
    keys.map((key, index) => [key, positiveValues[index] / total])
  );
}

function scaleMap(valueMap, factor) {
  return Object.fromEntries(
    Object.entries(valueMap || {}).map(([key, value]) => [key, (Number(value) || 0) * factor])
  );
}

function allocateWithCaps(weightMap, totalAmount, capMap) {
  const keys = Object.keys(capMap || {});
  const allocations = Object.fromEntries(keys.map((key) => [key, 0]));
  const cappedKeys = new Set();

  let remaining = Math.max(0, Number(totalAmount) || 0);
  let eligibleKeys = keys.filter((key) => (Number(capMap?.[key]) || 0) > EPSILON);

  while (remaining > EPSILON && eligibleKeys.length) {
    const normalizedWeights = normalizeWeightMap(weightMap, eligibleKeys);
    const saturatedThisRound = [];
    let anySaturated = false;

    eligibleKeys.forEach((key) => {
      const room =
        Math.max(0, Number(capMap?.[key]) || 0) - (Number(allocations[key]) || 0);
      const desired = remaining * (normalizedWeights[key] || 0);

      if (desired >= room - EPSILON) {
        allocations[key] += room;
        remaining -= room;
        saturatedThisRound.push(key);
        anySaturated = true;
        if (room + EPSILON < desired) {
          cappedKeys.add(key);
        }
      }
    });

    if (!anySaturated) {
      eligibleKeys.forEach((key) => {
        allocations[key] += remaining * (normalizedWeights[key] || 0);
      });
      remaining = 0;
      break;
    }

    eligibleKeys = eligibleKeys.filter((key) => !saturatedThisRound.includes(key));
  }

  return {
    allocations,
    cappedKeys,
    unallocatedCash: remaining > EPSILON ? remaining : 0,
  };
}

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

export function computeSignalMetrics(priceSeries, options = {}) {
  const shortWindow = Math.max(1, options?.momentumShortDays || DEFAULT_MOMENTUM_SHORT_DAYS);
  const longWindow = Math.max(1, options?.momentumLongDays || DEFAULT_MOMENTUM_LONG_DAYS);
  const drawdownWindow = Math.max(
    1,
    options?.drawdownLookbackDays || DEFAULT_DRAWDOWN_LOOKBACK_DAYS
  );

  const points = Array.isArray(priceSeries)
    ? priceSeries
        .map((point) => ({
          date: point?.date,
          price: Number(point?.price),
          time: toEpochMs(point?.date),
        }))
        .filter((point) => Number.isFinite(point.price) && Number.isFinite(point.time))
        .sort((a, b) => a.time - b.time)
    : [];

  if (!points.length) {
    return {
      lastPrice: null,
      momentum63: null,
      momentum126: null,
      drawdownFromHigh: null,
      historyLength: 0,
      hasCompleteHistory: false,
    };
  }

  const lastIndex = points.length - 1;
  const lastPrice = points[lastIndex].price;
  const shortIndex = lastIndex - shortWindow;
  const longIndex = lastIndex - longWindow;
  const drawdownStartIndex = Math.max(0, lastIndex - drawdownWindow);
  const drawdownWindowPoints = points.slice(drawdownStartIndex, lastIndex + 1);
  const rollingHigh = Math.max(...drawdownWindowPoints.map((point) => point.price));

  const momentum63 =
    shortIndex >= 0 && points[shortIndex].price > 0
      ? lastPrice / points[shortIndex].price - 1
      : null;
  const momentum126 =
    longIndex >= 0 && points[longIndex].price > 0
      ? lastPrice / points[longIndex].price - 1
      : null;
  const drawdownFromHigh =
    rollingHigh > 0 ? clamp(1 - lastPrice / rollingHigh, 0, 1) : null;

  return {
    lastPrice,
    momentum63,
    momentum126,
    drawdownFromHigh,
    historyLength: points.length,
    hasCompleteHistory:
      Number.isFinite(momentum63) &&
      Number.isFinite(momentum126) &&
      Number.isFinite(drawdownFromHigh),
  };
}

function normalizeRange(values, fallbackValue = 0.5) {
  if (!values.length) {
    return [];
  }
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (Math.abs(max - min) <= EPSILON) {
    return values.map(() => fallbackValue);
  }
  return values.map((value) => (value - min) / (max - min));
}

export function buildRelativeSignalScores(signalByAsset) {
  const entries = Object.entries(signalByAsset || {}).map(([key, signal]) => ({
    key,
    signal: signal || {},
    momentumComposite:
      Number.isFinite(signal?.momentum63) && Number.isFinite(signal?.momentum126)
        ? signal.momentum63 * 0.58 + signal.momentum126 * 0.42
        : null,
    drawdownFromHigh: Number.isFinite(signal?.drawdownFromHigh)
      ? signal.drawdownFromHigh
      : null,
  }));

  const validEntries = entries.filter(
    (entry) =>
      Number.isFinite(entry.momentumComposite) &&
      Number.isFinite(entry.drawdownFromHigh) &&
      entry.signal?.hasCompleteHistory
  );

  const normalizedMomentum = normalizeRange(
    validEntries.map((entry) => entry.momentumComposite)
  );
  const normalizedDrawdown = normalizeRange(
    validEntries.map((entry) => entry.drawdownFromHigh)
  );

  const validMap = Object.fromEntries(
    validEntries.map((entry, index) => [
      entry.key,
      {
        ...entry.signal,
        momentumComposite: entry.momentumComposite,
        normalizedMomentum: normalizedMomentum[index],
        normalizedDrawdown: normalizedDrawdown[index],
        score: normalizedMomentum[index] * 0.7 + normalizedDrawdown[index] * 0.3,
      },
    ])
  );

  return Object.fromEntries(
    entries.map((entry) => [
      entry.key,
      validMap[entry.key] || {
        ...entry.signal,
        momentumComposite: entry.momentumComposite,
        normalizedMomentum: null,
        normalizedDrawdown: null,
        score: null,
      },
    ])
  );
}

function buildRecommendationReasons({
  driftNeed,
  signal,
  wasTiltCapped,
}) {
  const reasons = [];

  if (driftNeed > EPSILON) {
    reasons.push('underweight');
  }
  if (Number.isFinite(signal?.momentumComposite) && signal.momentumComposite >= 0.03) {
    reasons.push('trend strong');
  }
  if (Number.isFinite(signal?.drawdownFromHigh) && signal.drawdownFromHigh >= 0.08) {
    reasons.push('pullback attractive');
  }
  if (wasTiltCapped) {
    reasons.push('tilt capped');
  }

  return reasons;
}

export function optimizeContributionAllocation({
  assets,
  depositAmount,
  signalScoreMap = null,
  minimumDriftShare = DEFAULT_MINIMUM_DRIFT_SHARE,
  maxTargetBandPercent = DEFAULT_MAX_TARGET_BAND_PERCENT,
} = {}) {
  const preparedAssets = normalizeAssets(assets);
  const assetKeys = preparedAssets.map((asset) => asset.key);
  const contribution = Math.max(0, Number(depositAmount) || 0);
  const totalCurrentValue = sumValues(
    preparedAssets.map((asset) => Math.max(0, asset.currentValue))
  );
  const totalAfterContribution = totalCurrentValue + contribution;

  const targetCaps = Object.fromEntries(
    preparedAssets.map((asset) => [
      asset.key,
      Math.max(
        0,
        ((asset.normalizedTargetPercent + maxTargetBandPercent) / 100) *
          totalAfterContribution -
          asset.currentValue
      ),
    ])
  );

  const driftNeeds = Object.fromEntries(
    preparedAssets.map((asset) => [
      asset.key,
      Math.max(
        0,
        (asset.normalizedTargetPercent / 100) * totalAfterContribution - asset.currentValue
      ),
    ])
  );

  const driftWeights = sumValues(Object.values(driftNeeds)) > EPSILON
    ? driftNeeds
    : Object.fromEntries(
        preparedAssets.map((asset) => [asset.key, asset.normalizedTargetPercent])
      );

  const pureDriftPlan = allocateWithCaps(driftWeights, contribution, targetCaps);
  const signalMap = signalScoreMap ? buildRelativeSignalScores(signalScoreMap) : null;
  const hasCompleteSignalHistory =
    signalMap &&
    assetKeys.every((key) => signalMap[key] && Number.isFinite(signalMap[key].score));

  let finalAllocations = { ...pureDriftPlan.allocations };
  let overlayAllocations = Object.fromEntries(assetKeys.map((key) => [key, 0]));
  let mode = 'pure-drift-fallback';
  let warning = null;
  let tiltCappedKeys = new Set();

  if (hasCompleteSignalHistory && contribution > EPSILON) {
    const driftFloor = scaleMap(
      pureDriftPlan.allocations,
      clamp(minimumDriftShare, 0, 1)
    );
    const driftFloorTotal = sumValues(Object.values(driftFloor));
    const remainingContribution = Math.max(0, contribution - driftFloorTotal);
    const remainingCaps = Object.fromEntries(
      assetKeys.map((key) => [key, Math.max(0, targetCaps[key] - driftFloor[key])])
    );
    const signalWeights = Object.fromEntries(
      assetKeys.map((key) => [key, Math.max(0, signalMap[key].score || 0)])
    );
    const overlayPlan = allocateWithCaps(
      signalWeights,
      remainingContribution,
      remainingCaps
    );
    const overlayTotal = sumValues(Object.values(overlayPlan.allocations));
    const driftResidualPlan =
      overlayPlan.unallocatedCash > EPSILON
        ? allocateWithCaps(
            driftNeeds,
            overlayPlan.unallocatedCash,
            Object.fromEntries(
              assetKeys.map((key) => [
                key,
                Math.max(
                  0,
                  remainingCaps[key] - (overlayPlan.allocations[key] || 0)
                ),
              ])
            )
          )
        : { allocations: Object.fromEntries(assetKeys.map((key) => [key, 0])), cappedKeys: new Set(), unallocatedCash: 0 };

    overlayAllocations = Object.fromEntries(
      assetKeys.map((key) => [
        key,
        (overlayPlan.allocations[key] || 0) + (driftResidualPlan.allocations[key] || 0),
      ])
    );
    finalAllocations = Object.fromEntries(
      assetKeys.map((key) => [key, (driftFloor[key] || 0) + (overlayAllocations[key] || 0)])
    );
    mode = 'market-tilt';
    tiltCappedKeys = new Set([
      ...overlayPlan.cappedKeys,
      ...driftResidualPlan.cappedKeys,
    ]);

    if (overlayPlan.unallocatedCash > EPSILON && overlayTotal <= EPSILON) {
      warning = 'Signal overlay could not be applied cleanly, so the plan stayed close to drift correction.';
    }
  } else if (contribution > EPSILON) {
    warning =
      'Historical signal stack is incomplete, so this recommendation falls back to pure drift correction.';
  }

  const rows = preparedAssets
    .map((asset) => {
      const recommendedAmount = finalAllocations[asset.key] || 0;
      const postContributionValue = asset.currentValue + recommendedAmount;
      const postWeightPercent =
        totalAfterContribution > EPSILON
          ? (postContributionValue / totalAfterContribution) * 100
          : 0;
      const signal = signalMap ? signalMap[asset.key] : null;

      return {
        key: asset.key,
        targetPercent: asset.normalizedTargetPercent,
        currentValue: asset.currentValue,
        currentWeightPercent:
          totalCurrentValue > EPSILON ? (asset.currentValue / totalCurrentValue) * 100 : 0,
        recommendedAmount,
        baseDriftAmount: pureDriftPlan.allocations[asset.key] || 0,
        overlayAmount: overlayAllocations[asset.key] || 0,
        estimatedShares:
          asset.price > EPSILON ? recommendedAmount / asset.price : null,
        price: asset.price > EPSILON ? asset.price : null,
        driftNeed: driftNeeds[asset.key] || 0,
        signalScore: Number.isFinite(signal?.score) ? signal.score : null,
        signal,
        postContributionValue,
        postWeightPercent,
        reasons: buildRecommendationReasons({
          driftNeed: driftNeeds[asset.key] || 0,
          signal,
          wasTiltCapped: tiltCappedKeys.has(asset.key),
        }),
      };
    })
    .sort((left, right) => right.recommendedAmount - left.recommendedAmount);

  return {
    mode,
    depositAmount: contribution,
    totalCurrentValue,
    totalAfterContribution,
    hasCompleteSignalHistory: Boolean(hasCompleteSignalHistory),
    warning,
    rows,
    baseDriftAllocation: pureDriftPlan.allocations,
    finalAllocations,
    unallocatedCash: pureDriftPlan.unallocatedCash,
    topPick: rows[0] || null,
  };
}

