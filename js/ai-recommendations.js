"use strict";

const AI_RISK_FREE_RATE =
  typeof DEFAULT_RISK_FREE_RATE === "number"
    ? DEFAULT_RISK_FREE_RATE
    : typeof RISK_FREE_RATE === "number"
      ? RISK_FREE_RATE
      : 0.04;

const aiAssetBetas =
  typeof portfolioAssetBetas === "object" && portfolioAssetBetas
    ? portfolioAssetBetas
    : typeof assetBetas === "object" && assetBetas
      ? assetBetas
      : {
          VOO: 1,
          QQQM: 1.15,
          SMH: 1.3,
          VXUS: 0.9,
          AVUV: 1.1,
          IBIT: 1.6,
          AMZN: 1.4,
        };

const DEFAULT_EXPECTED_RETURNS =
  typeof expectedReturns === "object" && expectedReturns
    ? expectedReturns
    : {};

const DEFAULT_VOLATILITIES =
  typeof volatilities === "object" && volatilities ? volatilities : {};

const aiExpenseRatios =
  typeof portfolioExpenseRatios === "object" && portfolioExpenseRatios
    ? portfolioExpenseRatios
    : typeof expenseRatios === "object" && expenseRatios
      ? expenseRatios
      : {};

const aiPortfolioDefaults =
  typeof window !== "undefined" &&
  window.portfolioDefaults &&
  typeof window.portfolioDefaults === "object"
    ? window.portfolioDefaults
    : {};

const RISK_SCORE_PARAMS =
  aiPortfolioDefaults && typeof aiPortfolioDefaults.riskScoreParams === "object"
    ? aiPortfolioDefaults.riskScoreParams
    : {};

const aiCorrelationMatrix =
  (typeof aiPortfolioDefaults === "object" &&
    aiPortfolioDefaults !== null &&
    typeof aiPortfolioDefaults.correlations === "object"
      ? aiPortfolioDefaults.correlations
      : null) ||
  (typeof window !== "undefined" &&
    typeof window.correlations === "object"
      ? window.correlations
      : null) ||
  (typeof correlations !== "undefined" && typeof correlations === "object"
      ? correlations
      : {});

const PHS_WEIGHTS = {
  allocation: 0.2,
  diversification: 0.15,
  cost: 0.15,
  risk: 0.2,
  performance: 0.15,
  liquidity: 0.1,
  tax: 0.05,
};

const PHS_RISK_TARGET_VOL =
  typeof aiPortfolioDefaults.riskTargetVol === "number"
    ? aiPortfolioDefaults.riskTargetVol
    : 0.18;

const PHS_RISK_TOLERANCE =
  typeof aiPortfolioDefaults.riskToleranceRatio === "number"
    ? aiPortfolioDefaults.riskToleranceRatio
    : 0.2;

const RISK_IN_BAND_FLOOR = clamp(
  safeNumber(RISK_SCORE_PARAMS.inBandFloor, 60),
  0,
  95
);
const RISK_IN_BAND_POWER = Math.max(
  1,
  safeNumber(RISK_SCORE_PARAMS.inBandPower, 1.6)
);
const RISK_OUT_OF_BAND_DECAY = Math.max(
  0.5,
  safeNumber(RISK_SCORE_PARAMS.outOfBandDecay, 3.2)
);

const PHS_COST_CAP =
  typeof aiPortfolioDefaults.costCap === "number"
    ? aiPortfolioDefaults.costCap
    : 0.015;

const PHS_ADVISORY_FEE =
  typeof aiPortfolioDefaults.advisoryFee === "number"
    ? aiPortfolioDefaults.advisoryFee
    : 0;

const PHS_PLATFORM_FEE =
  typeof aiPortfolioDefaults.platformFee === "number"
    ? aiPortfolioDefaults.platformFee
    : 0;

const PHS_FIXED_FEE =
  typeof aiPortfolioDefaults.fixedFeePerValue === "number"
    ? aiPortfolioDefaults.fixedFeePerValue
    : 0;

const PHS_PERFORMANCE_A = 1.5;
const PHS_PERFORMANCE_B = 0.3;
const PHS_GUARDRAIL_WEIGHT =
  typeof aiPortfolioDefaults.guardrailWeight === "number"
    ? clamp(aiPortfolioDefaults.guardrailWeight, 0, 0.3)
    : 0.1;
const CORE_GUARDRAIL_THRESHOLD = 10;
const CORE_GUARDRAIL_MULTIPLIER = 0.25;
const CORE_GUARDRAIL_FLOOR = 5;
const SATELLITE_GUARDRAIL_MULTIPLIER = 0.25;
const HIGH_VOL_GUARDRAIL_MULTIPLIER = 0.5;
const SMALL_POSITION_THRESHOLD = 3.5;
const HIGH_VOL_TICKERS = new Set(["AMZN", "IBIT"]);
const CRYPTO_TICKERS = new Set(["IBIT"]);
const CRYPTO_ABSOLUTE_CAP = 5;
const GUARDRAIL_SCORE_TIERS = [
  { max: 0.5, score: 100 },
  { max: 1.0, score: 80 },
  { max: 1.5, score: 60 },
  { max: 2.0, score: 40 },
];
const ROTH_TAX_SCORE = 100;
const DEFAULT_EXPENSE_FALLBACK =
  typeof aiPortfolioDefaults.defaultExpenseRatio === "number"
    ? aiPortfolioDefaults.defaultExpenseRatio
    : 0.0015;

function safeNumber(value, fallback = 0) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function sumObjectValues(obj) {
  return Object.values(obj || {}).reduce(
    (total, value) => total + safeNumber(value, 0),
    0
  );
}

function getAssetList(targets, currentValues) {
  const list = new Set();
  if (Array.isArray(assetKeys)) {
    assetKeys.forEach((key) => list.add(key));
  }
  Object.keys(targets || {}).forEach((key) => list.add(key));
  Object.keys(currentValues || {}).forEach((key) => list.add(key));
  return Array.from(list);
}

function normalizePercents(map) {
  const cleaned = {};
  Object.keys(map || {}).forEach((key) => {
    cleaned[key] = Math.max(0, safeNumber(map[key]));
  });
  const total = sumObjectValues(cleaned);
  if (total <= 0) {
    const keys = Object.keys(cleaned);
    if (!keys.length) return {};
    const evenWeight = 1 / keys.length;
    const normalized = {};
    keys.forEach((key) => {
      normalized[key] = evenWeight;
    });
    return normalized;
  }
  const normalized = {};
  Object.keys(cleaned).forEach((key) => {
    normalized[key] = cleaned[key] / total;
  });
  return normalized;
}

function computeCurrentPercents(currentValues, assetList) {
  const percents = {};
  const cleaned = {};
  assetList.forEach((asset) => {
    cleaned[asset] = Math.max(0, safeNumber(currentValues[asset]));
  });
  const total = sumObjectValues(cleaned);
  if (total <= 0) {
    assetList.forEach((asset) => {
      percents[asset] = 0;
    });
    return percents;
  }
  assetList.forEach((asset) => {
    percents[asset] = (cleaned[asset] / total) * 100;
  });
  return percents;
}

function computeDeviationMap(targetPercents, currentPercents, assetList) {
  const deviations = {};
  assetList.forEach((asset) => {
    const target = safeNumber(targetPercents[asset]);
    const current = safeNumber(currentPercents[asset], target);
    deviations[asset] = current - target;
  });
  return deviations;
}

function herfindahlIndex(weights) {
  let sumSquares = 0;
  Object.keys(weights || {}).forEach((key) => {
    const weight = safeNumber(weights[key]);
    sumSquares += weight * weight;
  });
  return sumSquares;
}

function weightedAverage(weights, valuesMap, fallback = 0) {
  let total = 0;
  Object.keys(weights || {}).forEach((asset) => {
    const weight = safeNumber(weights[asset]);
    const value = safeNumber(
      valuesMap && valuesMap[asset] !== undefined
        ? valuesMap[asset]
        : fallback
    );
    total += weight * value;
  });
  return total;
}

function getAssetVolatility(asset, volMap, fallback = 0.2) {
  if (volMap && Number.isFinite(volMap[asset]) && volMap[asset] > 0) {
    return Number(volMap[asset]);
  }
  if (
    DEFAULT_VOLATILITIES &&
    Number.isFinite(DEFAULT_VOLATILITIES[asset]) &&
    DEFAULT_VOLATILITIES[asset] > 0
  ) {
    return Number(DEFAULT_VOLATILITIES[asset]);
  }
  return fallback;
}

function getCorrelationEstimate(assetA, assetB) {
  if (assetA === assetB) {
    return 1;
  }
  const matrix =
    typeof aiCorrelationMatrix === "object" && aiCorrelationMatrix !== null
      ? aiCorrelationMatrix
      : {};
  const key = assetA < assetB ? `${assetA}_${assetB}` : `${assetB}_${assetA}`;
  const estimated = safeNumber(matrix[key], 0);
  return clamp(estimated, -1, 1);
}

function determineGuardrailBand(asset, targetWeight) {
  const weight = Math.max(0, safeNumber(targetWeight));
  if (weight === 0) return 0;
  const isHighVolHolding =
    HIGH_VOL_TICKERS.has(asset) || weight <= SMALL_POSITION_THRESHOLD;
  if (isHighVolHolding) {
    return weight * HIGH_VOL_GUARDRAIL_MULTIPLIER;
  }
  if (weight >= CORE_GUARDRAIL_THRESHOLD) {
    return Math.max(CORE_GUARDRAIL_FLOOR, weight * CORE_GUARDRAIL_MULTIPLIER);
  }
  return weight * SATELLITE_GUARDRAIL_MULTIPLIER;
}

function scoreGuardrailRatio(ratio) {
  if (!Number.isFinite(ratio)) {
    return 0;
  }
  for (let i = 0; i < GUARDRAIL_SCORE_TIERS.length; i += 1) {
    if (ratio <= GUARDRAIL_SCORE_TIERS[i].max) {
      return GUARDRAIL_SCORE_TIERS[i].score;
    }
  }
  return 0;
}

function calculatePortfolioMetrics(
  assetList,
  targetPercents,
  currentPercents,
  returnsMap,
  volMap,
  betaMap
) {
  const targetWeights = {};
  let targetTotal = 0;
  assetList.forEach((asset) => {
    const value = Math.max(0, safeNumber(targetPercents[asset]));
    targetWeights[asset] = value;
    targetTotal += value;
  });

  let normalizedTargets = {};
  if (targetTotal <= 0) {
    const evenWeight = 100 / Math.max(assetList.length, 1);
    assetList.forEach((asset) => {
      normalizedTargets[asset] = evenWeight;
    });
  } else {
    assetList.forEach((asset) => {
      normalizedTargets[asset] = (targetWeights[asset] / targetTotal) * 100;
    });
  }

  const targetFractions = normalizePercents(normalizedTargets);
  const currentFractions = normalizePercents(currentPercents);
  const deviations = computeDeviationMap(
    normalizedTargets,
    currentPercents,
    assetList
  );

  let maxDeviation = 0;
  let sumAbsDeviation = 0;
  assetList.forEach((asset) => {
    const deviation = Math.abs(deviations[asset]);
    if (deviation > maxDeviation) {
      maxDeviation = deviation;
    }
    sumAbsDeviation += deviation;
  });
  const averageDeviation =
    assetList.length > 0 ? sumAbsDeviation / assetList.length : 0;

  const expectedReturn = weightedAverage(
    targetFractions,
    returnsMap || {},
    0.06
  );
  const beta = weightedAverage(targetFractions, betaMap || {}, 1);

  const weightVector = assetList.map((asset) =>
    Math.max(0, safeNumber(targetFractions[asset]))
  );
  const volatilityVector = assetList.map((asset) =>
    getAssetVolatility(asset, volMap)
  );

  let variance = 0;
  for (let i = 0; i < assetList.length; i += 1) {
    const weightI = weightVector[i];
    const sigmaI = volatilityVector[i];
    if (
      !Number.isFinite(weightI) ||
      weightI <= 0 ||
      !Number.isFinite(sigmaI) ||
      sigmaI <= 0
    ) {
      continue;
    }
    for (let j = 0; j < assetList.length; j += 1) {
      const weightJ = weightVector[j];
      const sigmaJ = volatilityVector[j];
      if (
        !Number.isFinite(weightJ) ||
        weightJ <= 0 ||
        !Number.isFinite(sigmaJ) ||
        sigmaJ <= 0
      ) {
        continue;
      }
      const correlation = getCorrelationEstimate(assetList[i], assetList[j]);
      variance += weightI * weightJ * sigmaI * sigmaJ * correlation;
    }
  }
  const volatility = Math.sqrt(Math.max(variance, 0));

  const sharpe =
    volatility > 0
      ? (expectedReturn - AI_RISK_FREE_RATE) / volatility
      : 0;

  const hhi = herfindahlIndex(targetFractions);
  const assetCount = Math.max(assetList.length, 1);
  const minHHI = 1 / assetCount;
  const normalizedHHI =
    assetCount > 1 ? (hhi - minHHI) / (1 - minHHI) : 1;
  const diversificationIndex = clamp(1 - normalizedHHI, 0, 1);

  return {
    assetList,
    targetPercents: normalizedTargets,
    targetFractions,
    currentPercents,
    currentFractions,
    deviations,
    expectedReturn,
    volatility,
    sharpe,
    beta,
    diversificationIndex,
    maxDeviation,
    averageDeviation,
  };
}

function computeGuardrailAssessment(metrics) {
  if (!metrics || !Array.isArray(metrics.assetList) || !metrics.assetList.length) {
    return {
      score: 100,
      items: [],
      breaches: [],
      warnings: [],
      absoluteBreaches: [],
    };
  }

  const items = [];
  let weightedScore = 0;
  let totalWeight = 0;
  const breaches = [];
  const warnings = [];
  const absoluteBreaches = [];

  metrics.assetList.forEach((asset) => {
    const targetWeight = Math.max(0, safeNumber(metrics.targetPercents[asset]));
    const currentWeight = Math.max(
      0,
      safeNumber(metrics.currentPercents[asset], targetWeight)
    );
    const guardrailBand = determineGuardrailBand(asset, targetWeight);
    const deviation = Math.abs(currentWeight - targetWeight);
    const ratio =
      guardrailBand > 0
        ? deviation / guardrailBand
        : deviation > 0
          ? Number.POSITIVE_INFINITY
          : 0;
    const score = scoreGuardrailRatio(ratio);
    const weightFraction = Math.max(
      0,
      safeNumber(metrics.targetFractions[asset], targetWeight / 100)
    );

    weightedScore += score * weightFraction;
    totalWeight += weightFraction;

    const detail = {
      asset,
      targetWeight,
      currentWeight,
      guardrailBand,
      deviation,
      ratio,
      score,
    };

    items.push(detail);

    if (ratio > 1 + 1e-6) {
      breaches.push(detail);
    } else if (ratio > 0.5 + 1e-6) {
      warnings.push(detail);
    }

    if (CRYPTO_TICKERS.has(asset) && currentWeight > CRYPTO_ABSOLUTE_CAP + 1e-6) {
      absoluteBreaches.push({
        asset,
        cap: CRYPTO_ABSOLUTE_CAP,
        currentWeight,
      });
    }
  });

  const score =
    totalWeight > 0 ? weightedScore / totalWeight : 100;

  return {
    score: clamp(score, 0, 100),
    items,
    breaches,
    warnings,
    absoluteBreaches,
  };
}

function buildImmediateActions(
  metrics,
  currentValues,
  threshold = 1.5
) {
  const totalCurrentValue = sumObjectValues(currentValues);
  const actions = [];
  metrics.assetList.forEach((asset) => {
    const deviation = metrics.deviations[asset];
    const absDeviation = Math.abs(deviation);
    if (absDeviation < threshold) {
      return;
    }

    let priorityLevel = "medium";
    if (absDeviation >= 6) {
      priorityLevel = "critical";
    } else if (absDeviation >= 4) {
      priorityLevel = "high";
    } else if (absDeviation < 2.4) {
      priorityLevel = "medium";
    }

    const currentPercent = safeNumber(metrics.currentPercents[asset]);
    const targetPercent = safeNumber(metrics.targetPercents[asset]);
    const actionType = deviation > 0 ? "sell" : "buy";
    const actionAmount =
      totalCurrentValue > 0
        ? (Math.abs(deviation) / 100) * totalCurrentValue
        : 0;
    const formattedAmount =
      typeof formatCurrency === "function"
        ? formatCurrency(actionAmount)
        : `$${actionAmount.toFixed(0)}`;

    const reason =
      actionType === "sell"
        ? `Trim ${asset} by about ${absDeviation.toFixed(
            1
          )}% to free up roughly ${formattedAmount}.`
        : `Increase ${asset} by about ${absDeviation.toFixed(
            1
          )}% using roughly ${formattedAmount}.`;

    actions.push({
      asset,
      priorityLevel,
      actionType,
      deviation: deviation.toFixed(1),
      currentPercent: currentPercent.toFixed(1),
      targetPercent: targetPercent.toFixed(1),
      amount: actionAmount,
      reason,
    });
  });

  const priorityOrder = { critical: 3, high: 2, medium: 1 };
  actions.sort((a, b) => {
    const scoreA = priorityOrder[a.priorityLevel] || 0;
    const scoreB = priorityOrder[b.priorityLevel] || 0;
    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    return Math.abs(parseFloat(b.deviation)) - Math.abs(parseFloat(a.deviation));
  });

  return actions;
}

function computeAllocationFitScore(metrics) {
  if (!metrics || !Array.isArray(metrics.assetList)) {
    return { score: 0, totalAbsDeviation: 0, averageDeviation: 0, maxDeviation: 0 };
  }

  let totalAbsDeviation = 0;
  metrics.assetList.forEach((asset) => {
    totalAbsDeviation += Math.abs(safeNumber(metrics.deviations[asset]));
  });

  const averageDeviation = safeNumber(metrics.averageDeviation);
  const maxDeviation = safeNumber(metrics.maxDeviation);
  const normalizedGap = Math.min(totalAbsDeviation / 200, 1);
  const avgGap = Math.min(averageDeviation / 5, 1);
  const blendedPenalty = 0.7 * normalizedGap + 0.3 * avgGap;
  const score = clamp((1 - blendedPenalty) * 100, 0, 100);

  return {
    score,
    totalAbsDeviation,
    averageDeviation,
    maxDeviation,
  };
}

function computeDiversificationScore(metrics) {
  if (!metrics || !Array.isArray(metrics.assetList)) {
    return {
      score: 0,
      effectivePositions: 0,
      topHolding: 0,
      topThree: 0,
      assetCount: 0,
    };
  }

  const hhi = herfindahlIndex(metrics.targetFractions);
  const effectivePositions = hhi > 0 ? 1 / hhi : 0;
  const assetCount = metrics.assetList.length;
  const baseScore = clamp(metrics.diversificationIndex * 100, 0, 100);

  const currentWeights = metrics.assetList
    .map((asset) => safeNumber(metrics.currentPercents[asset]))
    .sort((a, b) => b - a);

  const topHolding = currentWeights[0] || 0;
  const topTwo = currentWeights.slice(0, 2).reduce((sum, weight) => sum + weight, 0);
  const topThree = currentWeights.slice(0, 3).reduce((sum, weight) => sum + weight, 0);

  let penalty = 0;
  if (assetCount < 5) {
    penalty += (5 - assetCount) * 5;
  }
  if (topHolding > 30) {
    penalty += Math.min((topHolding - 30) * 1.2, 15);
  }
  if (topTwo > 60) {
    penalty += Math.min((topTwo - 60) * 0.8, 12);
  }

  const score = clamp(baseScore - penalty, 0, 100);

  return {
    score,
    effectivePositions,
    topHolding,
    topTwo,
    topThree,
    assetCount,
  };
}

function computeCostScore(metrics) {
  if (!metrics || !Array.isArray(metrics.assetList)) {
    return { score: 0, weightedExpense: 0, allInFee: 0 };
  }

  let weightedExpense = 0;
  metrics.assetList.forEach((asset) => {
    const weight = safeNumber(metrics.targetFractions[asset]);
    const expenseRatio =
      aiExpenseRatios && aiExpenseRatios[asset] !== undefined
        ? safeNumber(aiExpenseRatios[asset])
        : DEFAULT_EXPENSE_FALLBACK;
    weightedExpense += weight * expenseRatio;
  });

  const allInFee = weightedExpense + PHS_ADVISORY_FEE + PHS_PLATFORM_FEE + PHS_FIXED_FEE;
  const normalized = Math.min(allInFee / PHS_COST_CAP, 1);
  const score = clamp((1 - normalized) * 100, 0, 100);

  return {
    score,
    weightedExpense,
    allInFee,
  };
}

function computeRiskBudgetScore(metrics) {
  if (!metrics) {
    return {
      score: 0,
      targetVol: PHS_RISK_TARGET_VOL,
      tolerance: PHS_RISK_TOLERANCE,
      deviationRatio: 1,
      gap: 0,
      guardrailBandwidth: PHS_RISK_TARGET_VOL * PHS_RISK_TOLERANCE,
      utilization: 1,
      withinGuardrail: false,
    };
  }

  let portfolioVol = Math.max(0, safeNumber(metrics.volatility));
  if (
    portfolioVol <= 0 &&
    typeof window !== "undefined" &&
    window.lastVolatilitySnapshot &&
    Number.isFinite(window.lastVolatilitySnapshot.volatility)
  ) {
    portfolioVol = Math.max(0, window.lastVolatilitySnapshot.volatility);
  }
  const targetVol = Math.max(0.01, PHS_RISK_TARGET_VOL);
  const tolerance = Math.max(0.05, PHS_RISK_TOLERANCE);

  const gap = Math.abs(portfolioVol - targetVol);
  const normalizedGap = gap / targetVol;
  const guardrailBandwidth = tolerance * targetVol;
  const deviationRatio =
    guardrailBandwidth > 0 ? normalizedGap / tolerance : normalizedGap;
  const withinGuardrail = normalizedGap <= tolerance + 1e-8;
  const bandUtilization =
    guardrailBandwidth > 0 ? gap / guardrailBandwidth : null;

  let score;
  if (withinGuardrail) {
    const falloff = Math.pow(
      clamp(bandUtilization ?? 0, 0, 1),
      RISK_IN_BAND_POWER
    );
    score = 100 - (100 - RISK_IN_BAND_FLOOR) * falloff;
  } else {
    const overrun =
      guardrailBandwidth > 0 ? (gap - guardrailBandwidth) / guardrailBandwidth : gap;
    const decay = Math.exp(-RISK_OUT_OF_BAND_DECAY * Math.max(overrun, 0));
    score = RISK_IN_BAND_FLOOR * decay;
  }

  const utilizationRatio = Number.isFinite(bandUtilization)
    ? clamp(bandUtilization, 0, 1)
    : 1;

  return {
    score: clamp(score, 0, 100),
    targetVol,
    tolerance,
    deviationRatio,
    gap,
    normalizedGap,
    guardrailBandwidth,
    utilization: utilizationRatio,
    bandUtilization,
    withinGuardrail,
  };
}

function computePerformanceScore(metrics) {
  const sharpe = safeNumber(metrics.sharpe);
  const adjustedSharpe = Number.isFinite(sharpe) ? sharpe : 0;
  const rawScore =
    50 + 40 * Math.tanh(PHS_PERFORMANCE_A * adjustedSharpe - PHS_PERFORMANCE_B);
  const score = clamp(rawScore, 0, 100);

  return {
    score,
    sharpe: adjustedSharpe,
  };
}

function computeLiquidityScore(metrics) {
  if (!metrics || !Array.isArray(metrics.assetList)) {
    return { score: 70, etfWeight: 0, singleWeight: 0, thematicWeight: 0 };
  }

  const singleNames = ["AMZN"];
  const thematicNames = ["IBIT", "SMH"];
  let singleWeight = 0;
  let thematicWeight = 0;
  let etfWeight = 0;

  metrics.assetList.forEach((asset) => {
    const weight = safeNumber(metrics.targetFractions[asset]);
    if (singleNames.includes(asset)) {
      singleWeight += weight;
      return;
    }
    if (thematicNames.includes(asset)) {
      thematicWeight += weight;
    }
    etfWeight += weight;
  });

  const baseScore = clamp((1 - singleWeight) * 100, 0, 100);
  const thematicPenalty =
    thematicWeight > 0.3 ? Math.min((thematicWeight - 0.3) * 120, 20) : 0;
  const score = clamp(baseScore - thematicPenalty, 0, 100);

  return {
    score,
    etfWeight: clamp(etfWeight, 0, 1),
    singleWeight: clamp(singleWeight, 0, 1),
    thematicWeight: clamp(thematicWeight, 0, 1),
  };
}

function computeTaxScore() {
  return {
    score: ROTH_TAX_SCORE,
  };
}

function buildPortfolioHealth(metrics, actions) {
  const allocation = computeAllocationFitScore(metrics);
  const diversification = computeDiversificationScore(metrics);
  const cost = computeCostScore(metrics);
  const risk = computeRiskBudgetScore(metrics);
  const performance = computePerformanceScore(metrics);
  const liquidity = computeLiquidityScore(metrics);
  const tax = computeTaxScore();

  const expectedReturn = safeNumber(metrics.expectedReturn);
  const portfolioVol = Math.max(0, safeNumber(metrics.volatility));
  const sharpeRatio = safeNumber(metrics.sharpe);

  let compositeScore =
    allocation.score * PHS_WEIGHTS.allocation +
    diversification.score * PHS_WEIGHTS.diversification +
    cost.score * PHS_WEIGHTS.cost +
    risk.score * PHS_WEIGHTS.risk +
    performance.score * PHS_WEIGHTS.performance +
    liquidity.score * PHS_WEIGHTS.liquidity +
    tax.score * PHS_WEIGHTS.tax;

  compositeScore = clamp(compositeScore, 0, 100);

  const topHolding = diversification.topHolding;
  const topTwo = diversification.topTwo || diversification.topThree || 0;
  const effectiveContributors = diversification.effectivePositions;

  const guardrailAssessment = computeGuardrailAssessment(metrics);
  const guardrailScore = guardrailAssessment.score;
  const guardrailPenalty = 0; // Guardrail is monitored separately; no longer affects health score.
  const guardrailWeight = clamp(PHS_GUARDRAIL_WEIGHT, 0, 1);
  const pillarWeightScale = Math.max(0, 1 - guardrailWeight);
  const componentWeights = {
    allocation: PHS_WEIGHTS.allocation * pillarWeightScale,
    diversification: PHS_WEIGHTS.diversification * pillarWeightScale,
    cost: PHS_WEIGHTS.cost * pillarWeightScale,
    risk: PHS_WEIGHTS.risk * pillarWeightScale,
    performance: PHS_WEIGHTS.performance * pillarWeightScale,
    liquidity: PHS_WEIGHTS.liquidity * pillarWeightScale,
    tax: PHS_WEIGHTS.tax * pillarWeightScale,
    guardrail: guardrailWeight,
    total: pillarWeightScale + guardrailWeight,
  };
  const compositeContribution = compositeScore * pillarWeightScale;
  const guardrailContribution = guardrailScore * guardrailWeight;

  const guardrailBreaches = [];
  const guardrailAlerts = [];

  const formatDriftMessage = (entry) =>
    `${entry.asset}: drift ${entry.deviation.toFixed(1)}% vs guardrail +/-${entry.guardrailBand.toFixed(1)}%.`;

  guardrailAssessment.breaches.forEach((entry) => {
    guardrailBreaches.push(formatDriftMessage(entry));
  });

  guardrailAssessment.warnings
    .filter((entry) => entry.ratio > 0.75)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, 2)
    .forEach((entry) => {
      guardrailAlerts.push(
        `${entry.asset} is at ${(Math.min(entry.ratio, 2) * 100).toFixed(
          0
        )}% of its guardrail band (drift ${entry.deviation.toFixed(1)}%).`
      );
    });

  guardrailAssessment.absoluteBreaches.forEach((entry) => {
    guardrailBreaches.push(
      `${entry.asset} weight ${entry.currentWeight.toFixed(1)}% exceeds the ${entry.cap}% hard cap.`
    );
  });

  const currentPercents = metrics.currentPercents || {};
  const targetPercents = metrics.targetPercents || {};
  const weightOf = (ticker) =>
    safeNumber(currentPercents[ticker], safeNumber(targetPercents[ticker]));

  const computeExposure = (map) =>
    metrics.assetList.reduce(
      (sum, ticker) => sum + weightOf(ticker) * safeNumber(map[ticker], 0),
      0
    );

  const techExposure = computeExposure({
    VOO: 0.3,
    QQQM: 0.65,
    SMH: 1.0,
    VXUS: 0.12,
    AVUV: 0.08,
    AMZN: 1.0,
  });
  if (techExposure > 35) {
    guardrailBreaches.push(
      `Technology exposure ${techExposure.toFixed(1)}% exceeds the ~35% guideline.`
    );
  } else if (techExposure > 32) {
    guardrailAlerts.push(
      `Technology exposure ${techExposure.toFixed(1)}% is nearing the 35% guideline.`
    );
  }

  const semisExposure = computeExposure({
    SMH: 1.0,
    QQQM: 0.18,
    VOO: 0.12,
  });
  if (semisExposure > 15) {
    guardrailBreaches.push(
      `Semiconductor exposure ${semisExposure.toFixed(1)}% exceeds the ~15% guideline.`
    );
  } else if (semisExposure > 13) {
    guardrailAlerts.push(
      `Semiconductor exposure ${semisExposure.toFixed(1)}% is approaching the 15% guideline.`
    );
  }

  const weightedExpensePct = cost.weightedExpense * 100;
  if (weightedExpensePct > 0.2) {
    guardrailBreaches.push(
      `Weighted expense ratio ${weightedExpensePct.toFixed(2)}% exceeds the 0.20% guardrail.`
    );
  } else if (weightedExpensePct > 0.15) {
    guardrailAlerts.push(
      `Weighted expense ratio ${weightedExpensePct.toFixed(2)}% is above the 0.15% soft guardrail.`
    );
  }

  if (effectiveContributors > 0 && effectiveContributors < 2) {
    guardrailBreaches.push(
      `Effective risk contributors ${effectiveContributors.toFixed(1)} below 2 guardrail.`
    );
  }

  if (topTwo > 40) {
    guardrailBreaches.push(
      `Top holdings concentration ${topTwo.toFixed(1)}% exceeds the 40% diversification guardrail.`
    );
  } else if (topTwo > 38) {
    guardrailAlerts.push(
      `Top holdings concentration ${topTwo.toFixed(1)}% is approaching the 40% diversification guardrail.`
    );
  }

  const hasGuardrailBreach = guardrailBreaches.length > 0;
  const finalScore = clamp(compositeContribution + guardrailContribution, 0, 100);

  let status = "Healthy";
  let color = "green";
  let priorityLevel = "Monitor";
  let priorityColor = "light-green";

  const baseColor = color;
  const basePriorityLevel = priorityLevel;
  const basePriorityColor = priorityColor;

  if (finalScore < 60) {
    status = "Critical";
    color = "red";
    priorityLevel = "Critical";
    priorityColor = "dark-red";
  } else if (finalScore < 80) {
    status = "Watch";
    color = "yellow";
    priorityLevel = "High";
    priorityColor = "medium-green";
  }

  if (hasGuardrailBreach) {
    if (finalScore < 60) {
      status = "Critical - guardrail breach";
      color = "red";
      priorityLevel = "Critical";
      priorityColor = "dark-red";
    } else if (finalScore < 80) {
      status = "Guardrail breach";
      color = "yellow";
      priorityLevel = "High";
      priorityColor = "medium-green";
    } else {
      status = "Guardrail breach (review)";
      color = baseColor;
      priorityLevel = "Review";
      priorityColor = basePriorityColor;
    }
  } else if (guardrailScore < 80) {
    status = "Watch - guardrail drift";
    color = "yellow";
    priorityLevel = "High";
    priorityColor = "medium-green";
  }

  const leadingAction = actions[0];
  const driftNote =
    allocation.maxDeviation >= 4
      ? `Largest allocation gap is ${allocation.maxDeviation.toFixed(1)}%`
      : allocation.maxDeviation >= 2
        ? `Allocation drift peaks at ${allocation.maxDeviation.toFixed(1)}%`
        : "Allocations remain within the policy tolerance.";

  const descriptionParts = [
    `Projected return ${(expectedReturn * 100).toFixed(1)}%`,
    `vol ${(portfolioVol * 100).toFixed(1)}%`,
    `Sharpe ${sharpeRatio.toFixed(2)}`,
    `All-in cost ${(cost.allInFee * 100).toFixed(2)}%`,
  ];
  const pillarWeightPercent = Math.round(pillarWeightScale * 100);
  const guardrailWeightPercent = Math.round(guardrailWeight * 100);
  const guardrailSummaryShort =
    guardrailWeight > 0
      ? `Guardrail score ${guardrailScore.toFixed(1)} (${guardrailWeightPercent}% weight)`
      : `Guardrail score ${guardrailScore.toFixed(1)}`;
  const guardrailSummaryDetail = guardrailSummaryShort;
  descriptionParts.push(guardrailSummaryShort);

  const watchlist = [];
  if (leadingAction) {
    watchlist.push(
      `${leadingAction.asset} ${leadingAction.actionType.toUpperCase()} ${leadingAction.deviation}%`
    );
  }
  if (allocation.totalAbsDeviation > 20) {
    watchlist.push(
      `Total drift ${allocation.totalAbsDeviation.toFixed(1)}% across portfolio.`
    );
  }
  if (diversification.score < 70) {
    const concentrationNote =
      topTwo > 0
        ? `Concentration risk: top 2 holdings ${topTwo.toFixed(1)}%.`
        : `Concentration risk: top holding ${topHolding.toFixed(1)}%.`;
    watchlist.push(concentrationNote);
  }
  if (risk.score < 75) {
    const direction = portfolioVol >= risk.targetVol ? "above" : "below";
    const gapNote = Number.isFinite(risk.gap)
      ? `${(risk.gap * 100).toFixed(1)} pts ${direction}`
      : direction;
    const rawUtilization =
      Number.isFinite(risk.bandUtilization) && risk.bandUtilization >= 0
        ? risk.bandUtilization * 100
        : Number.isFinite(risk.utilization)
          ? risk.utilization * 100
          : null;
    const utilizationNote =
      rawUtilization !== null
        ? `band usage ${rawUtilization.toFixed(rawUtilization >= 100 ? 0 : 1)}%.`
        : "band usage n/a.";
    watchlist.push(
      `Vol ${(portfolioVol * 100).toFixed(1)}% vs ${(risk.targetVol * 100).toFixed(
        1
      )}% target (${gapNote}, ${utilizationNote})`
    );
  }
  if (liquidity.singleWeight > 0.15) {
    watchlist.push(
      `Single-name exposure ${(liquidity.singleWeight * 100).toFixed(0)}% of portfolio.`
    );
  }
  guardrailBreaches.forEach((item) => {
    if (!watchlist.includes(item)) {
      watchlist.push(item);
    }
  });
  if (!hasGuardrailBreach && guardrailAlerts.length) {
    guardrailAlerts.forEach((item) => {
      if (!watchlist.includes(item)) {
        watchlist.push(item);
      }
    });
  }

  return {
    score: finalScore,
    status,
    color,
    priorityLevel,
    priorityColor,
    description: `${descriptionParts.join(", ")}. ${driftNote}.`,
    watchlist,
    components: {
      allocation: {
        weight: componentWeights.allocation,
        score: allocation.score,
        note: `Avg drift ${allocation.averageDeviation.toFixed(
          1
        )}%, max ${allocation.maxDeviation.toFixed(1)}%.`,
      },
      diversification: {
        weight: componentWeights.diversification,
        score: diversification.score,
        note: `Effective contributors ${effectiveContributors.toFixed(
          1
        )}. Top holding ${topHolding.toFixed(1)}%.`,
      },
      cost: {
        weight: componentWeights.cost,
        score: cost.score,
        note: `WER ${(cost.weightedExpense * 100).toFixed(2)}%, all-in ${(cost.allInFee * 100).toFixed(
          2
        )}%.`,
      },
      risk: {
        weight: componentWeights.risk,
        score: risk.score,
        note: `Vol ${(portfolioVol * 100).toFixed(1)}% vs ${(risk.targetVol * 100).toFixed(
          1
        )}% target (+/-${Math.round(risk.tolerance * 100)}%).`,
      },
      performance: {
        weight: componentWeights.performance,
        score: performance.score,
        note: `Sharpe ${performance.sharpe.toFixed(
          2
        )}, expected return ${(expectedReturn * 100).toFixed(1)}%.`,
      },
      liquidity: {
        weight: componentWeights.liquidity,
        score: liquidity.score,
        note: `ETF sleeve ${(liquidity.etfWeight * 100).toFixed(
          0
        )}%, single-name ${(liquidity.singleWeight * 100).toFixed(0)}%.`,
      },
      tax: {
        weight: componentWeights.tax,
        score: tax.score,
        note: "Roth IRA: qualified withdrawals \u2192 0% tax drag.",
      },
      guardrail: {
        weight: componentWeights.guardrail,
        score: guardrailScore,
        note: hasGuardrailBreach
          ? guardrailBreaches[0] || "Guardrail breach detected."
          : guardrailAlerts[0] || "Guardrail parameters remain within tolerance.",
      },
      total: {
        weight: componentWeights.total,
        score: finalScore,
        note: (hasGuardrailBreach
          ? `${guardrailSummaryDetail}. ${guardrailBreaches[0] || "Guardrail breach detected."}`
          : `${guardrailSummaryDetail}. ${status}.`
        ).concat(
          guardrailWeight > 0
            ? ` Blend: ${pillarWeightPercent}% pillars + ${guardrailWeightPercent}% guardrail.`
            : ""
        ),
      },
    },
    guardrailPenalty,
    guardrailWeight,
    guardrail: {
      score: guardrailScore,
      penalty: guardrailPenalty,
      breaches: guardrailBreaches,
      alerts: guardrailAlerts,
      assessment: guardrailAssessment,
    },
  };
}

function buildStrategicAdvice(metrics, actions) {
  const leadingAction = actions[0];
  const rebalanceSummary = leadingAction
    ? `${leadingAction.asset} is ${leadingAction.deviation}% ${leadingAction.deviation > 0 ? "over" : "under"} target.`
    : "All positions remain inside the drift tolerance band.";

  const growthWeight = ["QQQM", "SMH", "IBIT", "AMZN"].reduce(
    (acc, asset) => acc + safeNumber(metrics.targetFractions[asset]),
    0
  );

  const advice = [
    {
      title: "Rebalance and Cash Deployment",
      summary: rebalanceSummary,
      focus: leadingAction
        ? `First move: ${leadingAction.actionType.toUpperCase()} ${leadingAction.asset}.`
        : "Portfolio drift is minimal; keep contributions on schedule.",
      actions: [
        leadingAction
          ? `Execute a ${leadingAction.actionType.toUpperCase()} of about ${Math.abs(
              parseFloat(leadingAction.deviation)
            ).toFixed(1)}%.`
          : "Confirm allocation weights before next contribution.",
        "Review transfer from cash or dividends to align with targets.",
        "Log rebalance moves for Roth IRA audit trail.",
      ],
    },
    {
      title: "Growth versus Stability Dial",
      summary: `Growth sleeve stands at ${(growthWeight * 100).toFixed(
        1
      )}%.`,
      focus:
        growthWeight > 0.55
          ? "Moderate growth tilt to keep volatility contained."
          : "You can lean slightly more into growth if risk tolerance allows.",
      actions: [
        "Revisit VOO versus QQQM weights before the next major contribution.",
        "Use scenario lab to model 20% drawdown and recovery timing.",
        "Track factor sleeves (AVUV alongside the core ETFs) to maintain diversification.",
      ],
    },
    {
      title: "Narrative and Habit Check",
      summary:
        metrics.beta > 1.05
          ? "Beta is running above market; stay ready for swings."
          : "Risk posture remains aligned with long-term objective.",
      focus:
        metrics.beta > 1.05
          ? "Verify emergency cash runway and Roth conversion steps."
          : "Continue automated deposits and quarterly reviews.",
      actions: [
        "Confirm contribution schedule (monthly or quarterly) is automated.",
        "Document thesis for thematic holdings (SMH, IBIT) to revisit annually.",
        "Set calendar reminder for year-end tax and Roth paperwork review.",
      ],
    },
  ];

  return advice;
}

function buildRiskManagement(metrics, actions) {
  return [
    {
      title: "Drawdown Preparedness",
      description:
        metrics.volatility > 0.22
          ? "Projected volatility is above comfort targets. Refresh playbook for 15-20% drawdowns."
          : "Volatility profile is reasonable. Keep drawdown paperwork ready.",
      steps: [
        "Review emergency fund and Roth withdrawal contingencies.",
        "Document rebalancing triggers for a 10% market slide.",
        "Check stop gaps for concentrated positions (IBIT, individual stock).",
      ],
    },
    {
      title: "Position Concentration",
      description:
        metrics.diversificationIndex < 0.6
          ? "Concentration risk elevated. Rotate cash toward underweight assets."
          : "Concentration in line with plan. Maintain drift guardrails.",
      steps: [
        "Keep position caps (no holding above 45% of portfolio).",
        "Limit same-sector exposure when adding new capital.",
        "If overweight persists, schedule incremental trims rather than single large orders.",
      ],
    },
    {
      title: "Scenario Monitoring",
      description: "Track macro triggers that would change allocation quickly.",
      steps: [
        "Set alerts for Fed policy shifts and recession probability models.",
        "Watch semiconductor and AI earnings; tie to SMH/QQQM exposure.",
        "Revisit international thesis if USD trend breaks 200-day moving average.",
      ],
    },
  ];
}

function buildMarketInsights(metrics) {
  const insights = [];
  insights.push({
    theme: "Macro Pulse",
    insight:
      metrics.beta > 1.1
        ? "Portfolio beta above market emphasises growth themes."
        : "Beta near market keeps macro sensitivity balanced.",
    items: [
      {
        label: "Inflation Watch",
        detail:
          "Core CPI cooling supports equities. Keep an eye on rate path expectations.",
      },
      {
        label: "Treasury Yields",
        detail:
          "10-year yield hovering near 4%. Rising yields would pressure high beta names first.",
      },
      {
        label: "Global Growth",
        detail:
          "International PMI readings stabilising. VXUS can benefit if USD weakens.",
      },
    ],
  });
  insights.push({
    theme: "Theme Radar",
    insight:
      metrics.targetFractions.IBIT
        ? "Digital asset allocation introduces non-correlated risk."
        : "No digital asset sleeve detected; optional diversifier if desired.",
    items: [
      {
        label: "AI and Semiconductors",
        detail:
          "SMH remains sensitive to supply chain and policy headlines. Monitor earnings momentum.",
      },
      {
        label: "Small Cap Value",
        detail:
          "AVUV adds factor diversification. Confirm liquidity before large allocations.",
      },
      {
        label: "Mega Cap Concentration",
        detail:
          "QQQM and AMZN concentrate tech exposure. Ensure thesis covers regulation and margin risks.",
      },
    ],
  });
  return insights;
}

function buildFuturePredictions(metrics) {
  return [
    {
      scenario: "Base Case",
      outlook:
        "Moderate growth with inflation easing. Expect 6-8% equity returns next 12 months.",
      probability: "55%",
      guidance:
        "Stay the course. Execute scheduled contributions and rebalance quarterly.",
    },
    {
      scenario: "Bull Case",
      outlook:
        "AI-driven productivity boosts earnings. Growth assets outperform broad market.",
      probability: "25%",
      guidance:
        "Allow winners to run but cap any single sleeve at 45%. Revisit upgrade path for underweights.",
    },
    {
      scenario: "Bear Case",
      outlook:
        "Hard landing triggers 20% drawdown. High beta names would move first.",
      probability: "20%",
      guidance:
        "Follow pre-planned rebalance bands. Use cash buffers and avoid panic selling.",
    },
  ];
}

function buildPersonalizedTips(metrics, actions) {
  const tips = [];
  if (actions.length === 0) {
    tips.push(
      "Allocations look balanced. Log this checkpoint and revisit after the next contribution."
    );
  } else {
    tips.push(
      `Tackle ${actions[0].asset} first. A small ${actions[0].actionType} keeps drift in line.`
    );
  }
  tips.push(
    `Reconfirm emergency cash runway covers at least six months before adding more to high-beta assets.`
  );
  tips.push(
    `Schedule a 15-minute review to capture rationale for each thematic holding.`
  );
  tips.push(
    `Prepare Roth paperwork for year-end contributions three weeks before custodian deadlines.`
  );
  return tips;
}

class AIRecommendationEngine {
  analyzePortfolio(
    targets = {},
    currentValues = {},
    returnsMap = DEFAULT_EXPECTED_RETURNS,
    volMap = DEFAULT_VOLATILITIES
  ) {
    const assetList = getAssetList(targets, currentValues);
    if (!assetList.length) {
      return {
        portfolioHealth: {
          score: 0,
          status: "No data",
          color: "yellow",
          priorityLevel: "Data",
          priorityColor: "medium-green",
          description: "Unable to calculate AI insights without allocation inputs.",
          watchlist: ["Add target weights to unlock AI analysis."],
          components: {},
        },
        immediateActions: [],
        strategicAdvice: [],
        riskManagement: [],
        marketInsights: [],
        futurePredictions: [],
        personalizedTips: [],
      };
    }

    const currentPercents = computeCurrentPercents(currentValues, assetList);
    const metrics = calculatePortfolioMetrics(
      assetList,
      targets,
      currentPercents,
      returnsMap,
      volMap,
      aiAssetBetas
    );
    const immediateActions = buildImmediateActions(metrics, currentValues);
    const portfolioHealth = buildPortfolioHealth(metrics, immediateActions);
    const strategicAdvice = buildStrategicAdvice(metrics, immediateActions);
    const riskManagement = buildRiskManagement(metrics, immediateActions);
    const marketInsights = buildMarketInsights(metrics);
    const futurePredictions = buildFuturePredictions(metrics);
    const personalizedTips = buildPersonalizedTips(metrics, immediateActions);

    return {
      metrics,
      portfolioHealth,
      immediateActions,
      strategicAdvice,
      riskManagement,
      marketInsights,
      futurePredictions,
      personalizedTips,
    };
  }
}
function collectPortfolioSnapshot() {
  const targets = {};
  const currentValues = {};
  const currentPercents = {};

  const list =
    Array.isArray(assetKeys) && assetKeys.length
      ? assetKeys
      : [];

  const assetsToCheck = list.length
    ? list
    : Array.from(
        document.querySelectorAll(
          "input[data-stock][data-field='target']"
        )
      ).map((input) => input.getAttribute("data-stock"));

  assetsToCheck.forEach((asset) => {
    const targetInput = document.querySelector(
      `input[data-stock="${asset}"][data-field="target"]`
    );
    const currentValueInput = document.querySelector(
      `input[data-stock="${asset}"][data-field="currentValue"]`
    );
    const currentPercentInput = document.querySelector(
      `input[data-stock="${asset}"][data-field="currentPercent"]`
    );
    targets[asset] = targetInput ? safeNumber(targetInput.value) : 0;
    currentValues[asset] = currentValueInput
      ? safeNumber(currentValueInput.value)
      : 0;
    if (currentPercentInput) {
      currentPercents[asset] = safeNumber(currentPercentInput.value);
    }
  });

  return { targets, currentValues, currentPercents };
}

let aiEngine = new AIRecommendationEngine();
let latestAIRecommendations = null;

function mapPriorityBadgeClasses(priorityColor) {
  if (priorityColor === "dark-red") {
    return "bg-red-500/20 text-red-200 border border-red-500/40";
  }
  if (priorityColor === "medium-green") {
    return "bg-amber-400/20 text-amber-200 border border-amber-400/40";
  }
  return "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30";
}

function mapStatusColor(color) {
  if (color === "red") return "text-rose-400";
  if (color === "yellow") return "text-amber-400";
  return "text-emerald-400";
}

function mapProgressGradient(color) {
  if (color === "red") return "from-rose-400 via-red-500 to-amber-400";
  if (color === "yellow") return "from-amber-300 via-yellow-400 to-amber-500";
  return "from-emerald-400 via-teal-400 to-sky-400";
}

function mapScoreVisuals(score) {
  const safeScore = clamp(safeNumber(score), 0, 100);
  const ratio = safeScore / 100;
  const hue = Math.round(ratio * 120);
  const textLightness = 38 + ratio * 20;
  const accentLightness = Math.min(textLightness + 10, 70);
  const badgeLightness = Math.min(textLightness + 18, 75);

  const textColor = `hsl(${hue}, 78%, ${textLightness}%)`;
  const subtleText = `hsl(${hue}, 70%, ${Math.min(textLightness + 6, 72)}%)`;
  const glowColor = `hsla(${hue}, 82%, ${accentLightness}%, 0.45)`;
  const badgeBackground = `hsla(${hue}, 82%, ${badgeLightness}%, 0.18)`;
  const badgeBorder = `hsla(${hue}, 78%, ${Math.max(textLightness - 4, 30)}%, 0.45)`;

  return {
    textColor,
    subtleText,
    glowColor,
    badgeBackground,
    badgeBorder,
  };
}

function updatePortfolioHealth(health) {
  const container = document.getElementById("ai-portfolio-health");
  if (!container) return;

  const statusColor = mapStatusColor(health.color);
  const badgeClasses = mapPriorityBadgeClasses(health.priorityColor);
  const progressGradient = mapProgressGradient(health.color);
  const scorePercentage = clamp(safeNumber(health.score), 0, 100);
  const nextAction =
    health.watchlist && health.watchlist.length
      ? health.watchlist[0]
      : "Allocations remain within tolerance; continue scheduled contributions.";

  const watchlistMarkup =
    health.watchlist && health.watchlist.length
      ? `<div class="rounded-2xl border border-white/40 dark:border-white/10 bg-white/60 dark:bg-white/5 px-4 py-3">
           <span class="text-xs font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">Focus watchlist</span>
           <div class="mt-2 flex flex-wrap gap-2">
             ${health.watchlist
               .slice(0, 4)
               .map(
                 (item) =>
                   `<span class="px-3 py-1 rounded-full text-xs font-medium bg-white/70 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-white/40 dark:border-white/15">${item}</span>`
               )
               .join("")}
           </div>
         </div>`
      : "";

  const tileColumns = watchlistMarkup ? "md:grid-cols-2" : "md:grid-cols-1";

  container.innerHTML = `
    <div class="rounded-3xl bg-white/80 dark:bg-slate-950/70 backdrop-blur-sm border border-white/60 dark:border-white/10 p-6 md:p-8 shadow-[0_25px_60px_-25px_rgba(79,70,229,0.35)]">
      <div class="grid gap-6 md:grid-cols-[230px_1fr] md:items-center">
        <div class="rounded-2xl bg-white/80 dark:bg-white/5 border border-white/60 dark:border-white/10 px-6 py-7 shadow-inner flex flex-col items-center md:items-start text-center md:text-left">
          <span class="text-[10px] uppercase tracking-[0.45em] text-purple-500 dark:text-purple-300 mb-3">Score</span>
          <div class="flex items-center gap-3">
            <span class="text-6xl font-black ${statusColor} drop-shadow-sm">${health.score.toFixed(1)}</span>
            <span class="px-3 py-1 rounded-full text-xs font-semibold ${badgeClasses}">${health.priorityLevel}</span>
          </div>
          <span class="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-white/80 dark:bg-white/10 text-gray-700 dark:text-gray-200 border border-white/60 dark:border-white/15 shadow-sm">
            <span class="w-2.5 h-2.5 rounded-full ${statusColor.replace("text-", "bg-")} shadow"></span>
            ${health.status}
          </span>
          <p class="mt-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">AI powered Roth IRA diagnostics</p>
        </div>
        <div class="space-y-6">
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            ${health.description}
          </p>
          <div class="relative">
            <div class="h-3 w-full rounded-full bg-gray-200/80 dark:bg-slate-800 overflow-hidden">
              <div class="h-full bg-gradient-to-r ${progressGradient} rounded-full transition-all duration-700 ease-out" style="width: ${scorePercentage}%"></div>
            </div>
            <div class="absolute inset-0 pointer-events-none">
              <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-white/70 dark:border-white/20 bg-white shadow" style="left: calc(${scorePercentage}% - 6px);"></div>
            </div>
            <div class="mt-2 flex justify-between text-xs font-semibold text-gray-400 dark:text-gray-500">
              <span>0</span>
              <span>100</span>
            </div>
          </div>
          <div class="grid gap-3 ${tileColumns}">
            <div class="rounded-2xl border border-white/50 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-3">
              <span class="text-xs font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">Next action</span>
              <p class="mt-1 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">${nextAction}</p>
            </div>
            ${watchlistMarkup}
          </div>
        </div>
      </div>
    </div>
  `;

  updatePhsBreakdown(health);
}

function updatePhsBreakdown(health) {
  const tbody = document.getElementById("phs-breakdown-body");
  if (!tbody || !health || !health.components) return;

  tbody.querySelectorAll("tr[data-component]").forEach((row) => {
    const key = row.getAttribute("data-component");
    const data = health.components[key];
    if (!data) return;

    const scoreEl = row.querySelector('[data-role="score"]');
    const noteEl = row.querySelector('[data-role="note"]');
    const weightEl = row.querySelector('[data-role="weight"]');
    if (scoreEl) scoreEl.textContent = data.score.toFixed(1);
    if (noteEl) noteEl.textContent = data.note;
    if (weightEl && typeof data.weight === "number") {
      const pct = data.weight * 100;
      const formatted =
        Math.abs(pct - Math.round(pct)) < 0.05 ? `${Math.round(pct)}%` : `${pct.toFixed(1)}%`;
      weightEl.textContent = formatted;
    }
  });
}
function updateImmediateActions(actions) {
  const container = document.getElementById("ai-immediate-actions");
  if (!container) return;

  if (!Array.isArray(actions) || actions.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6">
        <p class="text-green-600 dark:text-green-400 text-lg font-semibold">Portfolio is well-balanced!</p>
        <p class="text-gray-500 dark:text-gray-400">No immediate allocation changes are required at this time.</p>
      </div>
    `;
    return;
  }

  const summaryCounts = actions.reduce(
    (acc, action) => {
      if (acc[action.priorityLevel] !== undefined) {
        acc[action.priorityLevel] += 1;
      }
      return acc;
    },
    { critical: 0, high: 0, medium: 0 }
  );

  const summaryBlock = (count, label, color) =>
    count > 0
      ? `<div class="flex-1 p-2 ${color.bg} rounded text-center">
          <div class="text-lg font-bold ${color.text}">${count}</div>
          <div class="text-xs ${color.text}">${label}</div>
        </div>`
      : "";

  let html = `
    <div class="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100">Allocation Summary</h3>
        <span class="text-xs text-gray-500 dark:text-gray-400">${actions.length} assets</span>
      </div>
      <div class="flex gap-2 text-center">
        ${summaryBlock(summaryCounts.critical, "Critical", {
          bg: "bg-red-100 dark:bg-red-900/30",
          text: "text-red-700 dark:text-red-300",
        })}
        ${summaryBlock(summaryCounts.high, "High", {
          bg: "bg-orange-100 dark:bg-orange-900/30",
          text: "text-orange-700 dark:text-orange-300",
        })}
        ${summaryBlock(summaryCounts.medium, "Medium", {
          bg: "bg-yellow-100 dark:bg-yellow-900/30",
          text: "text-yellow-700 dark:text-yellow-300",
        })}
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
  `;

  actions.forEach((action) => {
    const deviation = parseFloat(action.deviation);
    const currentPercent = safeNumber(action.currentPercent);
    const targetPercent = safeNumber(action.targetPercent);

    let cardBg = "bg-slate-50 dark:bg-slate-900/10 border-slate-200 dark:border-slate-700";
    let borderClass = "border-l-slate-400";
    let icon = "->";

    if (action.priorityLevel === "critical") {
      cardBg = "bg-red-200/70 dark:bg-red-900/30 border-red-500 dark:border-red-600";
      borderClass = "border-l-red-600";
      icon = "!!";
    } else if (action.priorityLevel === "high") {
      cardBg = "bg-red-100/70 dark:bg-red-900/20 border-red-400 dark:border-red-500";
      borderClass = "border-l-red-500";
      icon = "UP";
    } else if (action.priorityLevel === "medium") {
      cardBg =
        deviation > 0
          ? "bg-red-50 dark:bg-red-900/10 border-red-300 dark:border-red-400"
          : "bg-blue-50 dark:bg-blue-900/10 border-blue-300 dark:border-blue-400";
      borderClass = deviation > 0 ? "border-l-red-400" : "border-l-blue-400";
      icon = deviation > 0 ? "TRIM" : "ADD";
    }

    const priorityBadge =
      action.priorityLevel === "critical"
        ? "bg-red-200 text-red-900"
        : action.priorityLevel === "high"
          ? "bg-orange-200 text-orange-900"
          : "bg-yellow-200 text-yellow-900";

    const progressRatio =
      targetPercent !== 0
        ? clamp((currentPercent / targetPercent) * 100, 0, 200)
        : 0;
    const progressColor =
      progressRatio > 110
        ? "bg-red-500"
        : progressRatio > 90
          ? "bg-green-500"
          : "bg-yellow-500";

    html += `
      <div class="p-3 rounded-lg border-l-4 ${cardBg} ${borderClass} shadow-sm hover:shadow-md transition-all duration-200">
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wide">${icon}</span>
            <div>
              <div class="font-semibold text-gray-900 dark:text-gray-100 text-sm">${action.asset}</div>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium ${priorityBadge}">${action.priorityLevel.toUpperCase()}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="font-bold text-gray-900 dark:text-gray-100 text-lg">${deviation.toFixed(1)}%</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">deviation</div>
          </div>
        </div>
        <div class="mb-2">
          <div class="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Current: ${currentPercent.toFixed(1)}%</span>
            <span>Target: ${targetPercent.toFixed(1)}%</span>
          </div>
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div class="${progressColor} h-1.5 rounded-full transition-all duration-300" style="width: ${Math.min(
              progressRatio,
              100
            )}%"></div>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 text-xs leading-tight">${action.reason}</p>
        ${
          Number.isFinite(action.amount) && action.amount > 0
            ? `<div class="mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-gray-600 dark:text-gray-400">Amount:</span>
                  <span class="font-medium text-gray-900 dark:text-gray-100">${
                    typeof formatCurrency === "function"
                      ? formatCurrency(action.amount)
                      : `$${action.amount.toFixed(0)}`
                  }</span>
                </div>
              </div>`
            : ""
        }
      </div>
    `;
  });

  html += "</div>";
  container.innerHTML = html;
}
function updateStrategicAdvice(advice) {
  const container = document.getElementById("ai-strategic-advice");
  if (!container) return;

  if (!Array.isArray(advice) || advice.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500 dark:text-gray-400 text-sm">Generate the AI analysis to see tailored playbooks.</p>';
    return;
  }

  const cards = advice
    .map(
      (item) => `
        <div class="p-4 rounded-lg border card bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/40 dark:to-slate-800/20 space-y-3 text-left">
          <div class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">${item.title}</div>
          <p class="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">${item.summary}</p>
          <p class="text-sm font-medium text-blue-600 dark:text-blue-300 leading-relaxed">${item.focus}</p>
          <ul class="list-disc pl-5 text-xs text-gray-600 dark:text-gray-300 space-y-1">
            ${item.actions
              .map((action) => `<li>${action}</li>`)
              .join("")}
          </ul>
        </div>
      `
    )
    .join("");

  container.innerHTML = `<div class="space-y-4">${cards}</div>`;
}

function updateRiskManagement(items) {
  const container = document.getElementById("ai-risk-management");
  if (!container) return;

  if (!Array.isArray(items) || items.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-gray-500 dark:text-gray-400">Run the AI analysis to surface risk controls.</p>';
    return;
  }

  container.innerHTML = items
    .map(
      (item) => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/80 dark:bg-gray-900/40 space-y-2">
          <div class="text-sm font-semibold text-red-600 dark:text-red-300 uppercase tracking-wide">${item.title}</div>
          <p class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">${item.description}</p>
          <ul class="list-disc pl-5 text-xs text-gray-500 dark:text-gray-400 space-y-1">
            ${item.steps.map((step) => `<li>${step}</li>`).join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

function updateMarketInsights(insights) {
  const container = document.getElementById("ai-market-insights");
  if (!container) return;

  if (!Array.isArray(insights) || insights.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-gray-500 dark:text-gray-400">Insights will appear after generating the AI review.</p>';
    return;
  }

  container.innerHTML = insights
    .map(
      (insight) => `
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white/70 dark:bg-gray-900/40 space-y-2">
          <div class="text-sm font-semibold text-emerald-600 dark:text-emerald-300 uppercase tracking-wide">${insight.theme}</div>
          <p class="text-sm text-gray-600 dark:text-gray-300">${insight.insight}</p>
          <ul class="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            ${insight.items
              .map(
                (detail) =>
                  `<li><span class="font-semibold text-gray-700 dark:text-gray-200">${detail.label}:</span> ${detail.detail}</li>`
              )
              .join("")}
          </ul>
        </div>
      `
    )
    .join("");
}

function updateFuturePredictions(predictions) {
  const container = document.getElementById("ai-future-predictions");
  if (!container) return;

  if (!Array.isArray(predictions) || predictions.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-gray-500 dark:text-gray-400">Run the AI engine to view scenario planning guidance.</p>';
    return;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      ${predictions
        .map(
          (scenario) => `
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-900/30 space-y-3">
              <div class="text-sm font-semibold text-indigo-600 dark:text-indigo-300 uppercase tracking-wide">${scenario.scenario}</div>
              <p class="text-sm text-gray-700 dark:text-gray-200">${scenario.outlook}</p>
              <div class="text-xs font-semibold text-gray-600 dark:text-gray-400">Probability: ${scenario.probability}</div>
              <p class="text-xs text-gray-500 dark:text-gray-400">${scenario.guidance}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function updatePersonalizedTips(tips) {
  const container = document.getElementById("ai-personalized-tips");
  if (!container) return;

  if (!Array.isArray(tips) || tips.length === 0) {
    container.innerHTML =
      '<p class="text-sm text-gray-500 dark:text-gray-400">Tips will appear after running the AI engine.</p>';
    return;
  }

  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      ${tips
        .map(
          (tip) => `
            <div class="p-4 rounded-lg border border-purple-200 dark:border-purple-700 bg-purple-50/70 dark:bg-purple-900/20">
              <p class="text-sm text-gray-700 dark:text-gray-200">${tip}</p>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}
function updateAllocationAIReview(existingRecommendations) {
  const cardEl = document.getElementById("allocation-ai-review-card");
  const scoreEl = document.getElementById("allocation-ai-score");
  const statusEl = document.getElementById("allocation-ai-status");
  const summaryEl = document.getElementById("allocation-ai-summary");
  const focusEl = document.getElementById("allocation-ai-focus");
  const priorityEl = document.getElementById("allocation-ai-priority");

  if (!cardEl || !scoreEl || !statusEl || !summaryEl || !focusEl || !priorityEl) {
    return;
  }

  let recommendations = existingRecommendations || latestAIRecommendations;
  if (!recommendations) {
    const { targets, currentValues } = collectPortfolioSnapshot();
    recommendations = aiEngine.analyzePortfolio(
      targets,
      currentValues,
      DEFAULT_EXPECTED_RETURNS,
      DEFAULT_VOLATILITIES
    );
    latestAIRecommendations = recommendations;
  }

  const health = recommendations.portfolioHealth;
  scoreEl.textContent = health.score.toFixed(1);
  statusEl.textContent = health.status;
  summaryEl.textContent = health.description;
  priorityEl.textContent = health.priorityLevel;
  const scoreVisuals = mapScoreVisuals(health.score);

  scoreEl.style.color = scoreVisuals.textColor;
  scoreEl.style.textShadow = `0 0 18px ${scoreVisuals.glowColor}`;
  scoreEl.style.transition = "color 180ms ease, text-shadow 280ms ease";
  statusEl.style.color = scoreVisuals.subtleText;
  statusEl.style.transition = "color 180ms ease";
  priorityEl.style.color = scoreVisuals.textColor;
  priorityEl.style.backgroundColor = scoreVisuals.badgeBackground;
  priorityEl.style.borderColor = scoreVisuals.badgeBorder;
  priorityEl.style.boxShadow = `0 0 14px ${scoreVisuals.glowColor}`;
  priorityEl.style.transition =
    "color 180ms ease, background-color 220ms ease, border-color 220ms ease, box-shadow 320ms ease";

  const classListToRemove = [
    "border-gray-200",
    "border-green-300",
    "border-yellow-300",
    "border-red-300",
    "shadow-md",
    "shadow-lg",
    "shadow-green-200/40",
    "shadow-yellow-200/40",
    "shadow-red-200/40",
  ];
  cardEl.classList.remove(...classListToRemove);

  if (health.color === "green") {
    cardEl.classList.add("border-green-300", "shadow-lg", "shadow-green-200/40");
  } else if (health.color === "yellow") {
    cardEl.classList.add("border-yellow-300", "shadow-lg", "shadow-yellow-200/40");
  } else {
    cardEl.classList.add("border-red-300", "shadow-lg", "shadow-red-200/40");
  }

  const focusAction =
    recommendations.immediateActions.find(
      (action) => action.priorityLevel === "critical"
    ) ||
    recommendations.immediateActions.find(
      (action) => action.priorityLevel === "high"
    ) ||
    recommendations.immediateActions[0];

  if (focusAction) {
    focusEl.textContent = `Next move: ${focusAction.actionType.toUpperCase()} ${focusAction.asset} by about ${Math.abs(
      parseFloat(focusAction.deviation)
    ).toFixed(1)}%.`;
  } else if (health.watchlist && health.watchlist.length) {
    focusEl.textContent = `Watch: ${health.watchlist[0]}`;
  } else {
    focusEl.textContent = "Allocations on target. Monitor quarterly.";
  }
}

function updateAIRecommendationsSection(options = {}) {
  const userInitiated = Boolean(options && options.userInitiated);
  if (userInitiated && typeof window.showActionFeedback === "function") {
    window.showActionFeedback("Running AI diagnostics...", {
      state: "progress",
      autoHide: false,
    });
  }

  try {
    const { targets, currentValues } = collectPortfolioSnapshot();
    const recommendations = aiEngine.analyzePortfolio(
      targets,
      currentValues,
      DEFAULT_EXPECTED_RETURNS,
      DEFAULT_VOLATILITIES
    );
    latestAIRecommendations = recommendations;

    updatePortfolioHealth(recommendations.portfolioHealth);
    updateImmediateActions(recommendations.immediateActions);
    updateStrategicAdvice(recommendations.strategicAdvice);
    updateRiskManagement(recommendations.riskManagement);
    updateMarketInsights(recommendations.marketInsights);
    updateFuturePredictions(recommendations.futurePredictions);
    updatePersonalizedTips(recommendations.personalizedTips);
    updateAllocationAIReview(recommendations);

    if (userInitiated && typeof window.showActionFeedback === "function") {
      window.showActionFeedback("AI diagnostics refreshed.", {
        state: "success",
        autoHide: 2600,
      });
    }
    return recommendations;
  } catch (error) {
    console.error("AI recommendation update failed:", error);
    if (userInitiated && typeof window.showActionFeedback === "function") {
      window.showActionFeedback("AI diagnostics failed. Check console logs.", {
        state: "error",
        autoHide: 4200,
      });
    }
    return null;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const refreshBtn = document.getElementById("ai-refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      updateAIRecommendationsSection({ userInitiated: true });
    });
  }

  // Initial load: warm up allocation card immediately, full AI after short delay.
  updateAllocationAIReview();
  setTimeout(() => updateAIRecommendationsSection(), 800);
});

window.addEventListener("portfolio-assumptions-reset", () => {
  latestAIRecommendations = null;
  updateAllocationAIReview();
  updateAIRecommendationsSection();
});
