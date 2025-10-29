// Analytics Module for Portfolio Insights

const DEFAULT_RISK_FREE_RATE =
  typeof RISK_FREE_RATE === 'number' ? RISK_FREE_RATE : 0.045;
const portfolioAssetBetas =
  typeof assetBetas === 'object' && assetBetas !== null
    ? assetBetas
    : {
        VOO: 1.0,
        QQQM: 1.2,
        SMH: 1.3,
        VXUS: 0.9,
        AVUV: 1.1,
        IBIT: 1.5,
        AMZN: 1.4,
      };

const portfolioExpenseRatios =
  typeof expenseRatios === 'object' && expenseRatios !== null
    ? expenseRatios
    : {
        VOO: 0.0003,
        QQQM: 0.0015,
        SMH: 0.0035,
        VXUS: 0.0007,
        AVUV: 0.0025,
        IBIT: 0.0025,
        AMZN: 0,
      };

const multiFactorConfigSource =
  typeof window !== 'undefined' &&
  window.multiFactorDefaults &&
  typeof window.multiFactorDefaults === 'object'
    ? window.multiFactorDefaults
    : typeof window !== 'undefined' &&
      window.portfolioDefaults &&
      typeof window.portfolioDefaults === 'object'
    ? {
        factorNames: window.portfolioDefaults.factorNames || ['MKT', 'SMB', 'HML', 'MOM'],
        loadings: window.portfolioDefaults.multiFactorLoadings || {},
        covariance: window.portfolioDefaults.factorCovariances || {},
        residualVols: window.portfolioDefaults.residualVols || {},
      }
    : {
        factorNames: ['MKT', 'SMB', 'HML', 'MOM'],
        loadings: {},
        covariance: {},
        residualVols: {},
      };

const DEFAULT_FACTOR_NAMES = Array.isArray(multiFactorConfigSource.factorNames)
  ? [...multiFactorConfigSource.factorNames]
  : ['MKT', 'SMB', 'HML', 'MOM'];
const ASSET_MULTI_FACTOR_LOADINGS =
  typeof multiFactorConfigSource.loadings === 'object' &&
  multiFactorConfigSource.loadings !== null
    ? multiFactorConfigSource.loadings
    : {};
const FACTOR_COVARIANCES =
  typeof multiFactorConfigSource.covariance === 'object' &&
  multiFactorConfigSource.covariance !== null
    ? multiFactorConfigSource.covariance
    : {};
const ASSET_RESIDUAL_VOLS =
  typeof multiFactorConfigSource.residualVols === 'object' &&
  multiFactorConfigSource.residualVols !== null
    ? multiFactorConfigSource.residualVols
    : {};

const DEFAULT_BENCHMARK_RETURN =
  typeof BENCHMARK_EXPECTED_RETURN === 'number'
    ? BENCHMARK_EXPECTED_RETURN
    : 0.085;
const DEFAULT_EQUITY_RISK_PREMIUM = Math.max(
  0,
  DEFAULT_BENCHMARK_RETURN - DEFAULT_RISK_FREE_RATE
);
const DEFAULT_BENCHMARK_VOLATILITY =
  typeof BENCHMARK_VOLATILITY === 'number'
    ? BENCHMARK_VOLATILITY
    : typeof volatilities === 'object' &&
      volatilities !== null &&
      Number.isFinite(volatilities.VOO)
    ? volatilities.VOO
    : 0.16;
const capmExpectedReturnFn =
  typeof deriveCapmExpectedReturn === 'function'
    ? deriveCapmExpectedReturn
    : null;

let analyticsCharts = {}; // Store chart instances

const CONTRIBUTION_MODES = ['return', 'risk', 'sharpe'];
const CONTRIBUTION_MODE_STORAGE_KEY = 'assetContributionMode';
const CONTRIBUTION_SNAPSHOT_STORAGE_KEY = 'assetContributionSnapshot';

let assetContributionMode =
  localStorage.getItem(CONTRIBUTION_MODE_STORAGE_KEY) || 'return';
if (!CONTRIBUTION_MODES.includes(assetContributionMode)) {
  assetContributionMode = 'return';
}

let contributionSnapshots = loadContributionSnapshots();
let stressTestBaseline = null;
let lastVolatilitySnapshot = null;
let lastBetaSnapshot = null;
let lastDiversitySnapshot = null;
let lastSortinoSnapshot = null;
let lastDrawdownSnapshot = null;
let lastExpenseSnapshot = null;
let lastCaptureSnapshot = null;
let lastMultiFactorSnapshot = null;
let lastTailRiskSnapshot = null;
let lastTrackingSnapshot = null;

// Function to get current target percentages from rebalance section
function getCurrentTargets() {
  const targets = {};
  assetKeys.forEach((key) => {
    const inputEl = document.querySelector(
      `input[data-stock="${key}"][data-field="target"]`
    );
    const fallbackTarget = initialStockData[key]?.target ?? 0;
    const rawValue = parseFloat(inputEl ? inputEl.value : fallbackTarget);
    const normalized = Number.isFinite(rawValue) ? rawValue / 100 : 0;
    targets[key] = normalized > 0 ? normalized : 0;
  });
  return targets;
}

function normalizeWeights(weightMap) {
  const weights = {};
  let total = 0;

  assetKeys.forEach((key) => {
    const value = Number(weightMap[key]);
    if (Number.isFinite(value) && value > 0) {
      total += value;
    }
  });

  if (total <= 0) {
    assetKeys.forEach((key) => {
      weights[key] = 0;
    });
    return weights;
  }

  assetKeys.forEach((key) => {
    const value = Number(weightMap[key]);
    weights[key] = Number.isFinite(value) && value > 0 ? value / total : 0;
  });

  return weights;
}

function computeDefaultFactorExposureTargets() {
  try {
    const defaults =
      typeof window !== 'undefined' && window.defaultTargetAllocations
        ? window.defaultTargetAllocations
        : null;
    if (!defaults || typeof defaults !== 'object') {
      return null;
    }
    const normalizedDefaults = normalizeWeights(defaults);
    const exposures = DEFAULT_FACTOR_NAMES.reduce((acc, factor) => {
      acc[factor] = 0;
      return acc;
    }, {});

    assetKeys.forEach((key) => {
      const weight = Number.isFinite(normalizedDefaults[key])
        ? normalizedDefaults[key]
        : 0;
      if (!weight) {
        return;
      }
      const loadings =
        typeof ASSET_MULTI_FACTOR_LOADINGS[key] === 'object' &&
        ASSET_MULTI_FACTOR_LOADINGS[key] !== null
          ? ASSET_MULTI_FACTOR_LOADINGS[key]
          : null;
      DEFAULT_FACTOR_NAMES.forEach((factor) => {
        const loading =
          loadings && Number.isFinite(loadings[factor]) ? loadings[factor] : 0;
        exposures[factor] += weight * loading;
      });
    });

    return exposures;
  } catch (error) {
    console.warn('Failed to compute default factor exposure targets:', error);
    return null;
  }
}

const DEFAULT_FACTOR_EXPOSURE_TARGETS = computeDefaultFactorExposureTargets();

function getCorrelation(asset1, asset2) {
  if (asset1 === asset2) return 1;
  const corrKey = asset1 < asset2 ? `${asset1}_${asset2}` : `${asset2}_${asset1}`;
  return correlations[corrKey] ?? 0;
}

function clampScore(value, min = 0, max = 10) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

function clampToScale(value, min = 0, max = 100) {
  if (!Number.isFinite(value)) {
    return null;
  }
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function interpolateScore(value, points) {
  if (!Number.isFinite(value) || !Array.isArray(points) || !points.length) {
    return null;
  }
  const sorted = points
    .map((point) => ({
      value: Number(point.value),
      score: Number(point.score),
    }))
    .filter((point) => Number.isFinite(point.value) && Number.isFinite(point.score))
    .sort((a, b) => a.value - b.value);

  if (!sorted.length) {
    return null;
  }

  if (value <= sorted[0].value) {
    return sorted[0].score;
  }

  for (let i = 1; i < sorted.length; i += 1) {
    const prev = sorted[i - 1];
    const next = sorted[i];
    if (value <= next.value) {
      const span = next.value - prev.value;
      if (!Number.isFinite(span) || span === 0) {
        return next.score;
      }
      const t = (value - prev.value) / span;
      return prev.score + t * (next.score - prev.score);
    }
  }

  return sorted[sorted.length - 1].score;
}

function scoreFromAnchors(value, anchors) {
  const interpolated = interpolateScore(value, anchors);
  return clampToScale(interpolated);
}

function scoreTargetOptimal100(value, config) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const target = Number(config?.target);
  const band = Number(config?.band);
  const penalty = Number.isFinite(config?.penalty) ? config.penalty : 1;
  if (!Number.isFinite(target) || !Number.isFinite(band) || band <= 0) {
    return null;
  }
  const distance = Math.abs(value - target);
  const normalized = Math.max(
    0,
    1 - Math.pow(distance / band, Math.max(0.5, penalty))
  );
  return clampToScale(100 * normalized);
}

function weightedAverageScore(entries) {
  if (!Array.isArray(entries) || !entries.length) {
    return null;
  }
  let weightedSum = 0;
  let weightSum = 0;
  entries.forEach((entry) => {
    const weight = Number(entry?.weight);
    const score = entry?.score;
    if (!Number.isFinite(weight) || weight <= 0 || !Number.isFinite(score)) {
      return;
    }
    weightedSum += score * weight;
    weightSum += weight;
  });
  if (weightSum <= 0) {
    return null;
  }
  return clampToScale(weightedSum / weightSum);
}

function computeMultiFactorAlignmentDeviation(metrics) {
  if (
    !metrics ||
    typeof metrics !== 'object' ||
    !metrics.multiFactorExposures ||
    !metrics.multiFactorFactorNames ||
    !Array.isArray(metrics.multiFactorFactorNames) ||
    !metrics.multiFactorFactorNames.length ||
    !DEFAULT_FACTOR_EXPOSURE_TARGETS
  ) {
    return null;
  }

  let squaredError = 0;
  let count = 0;
  metrics.multiFactorFactorNames.forEach((factor) => {
    if (!factor) {
      return;
    }
    const target = Number(
      DEFAULT_FACTOR_EXPOSURE_TARGETS[factor] ?? 0
    );
    const actual = Number(metrics.multiFactorExposures[factor]);
    if (!Number.isFinite(actual)) {
      return;
    }
    const diff = actual - target;
    squaredError += diff * diff;
    count += 1;
  });

  if (count <= 0) {
    return null;
  }

  return Math.sqrt(squaredError / count);
}

function deriveRecoveryMonthsMetric(metrics) {
  if (!metrics || typeof metrics !== 'object') {
    return null;
  }
  if (Number.isFinite(metrics.recoveryMonths)) {
    return metrics.recoveryMonths;
  }
  if (Number.isFinite(metrics.recoveryTradingDays)) {
    return metrics.recoveryTradingDays / 21;
  }
  if (Number.isFinite(metrics.recoveryCalendarDays)) {
    return metrics.recoveryCalendarDays / 30.4375;
  }
  return null;
}

const PORTFOLIO_PILLAR_WEIGHTS = Object.freeze({
  performance: 0.4,
  risk: 0.3,
  structure: 0.2,
  cost: 0.1,
});

const PORTFOLIO_SCORE_METRICS = Object.freeze({
  expectedReturn: {
    label: 'Expected Annual Return',
    pillar: 'performance',
    weight: 0.08,
    mode: 'anchors',
    anchors: [
      { value: 0.0, score: 5 },
      { value: 0.03, score: 35 },
      { value: 0.05, score: 55 },
      { value: 0.07, score: 70 },
      { value: 0.09, score: 85 },
      { value: 0.12, score: 95 },
      { value: 0.15, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.expectedReturn) ? metrics.expectedReturn : null,
  },
  sharpeRatio: {
    label: 'Sharpe Ratio',
    pillar: 'performance',
    weight: 0.08,
    mode: 'anchors',
    anchors: [
      { value: -0.2, score: 5 },
      { value: 0.0, score: 25 },
      { value: 0.25, score: 45 },
      { value: 0.5, score: 65 },
      { value: 0.75, score: 78 },
      { value: 1.0, score: 88 },
      { value: 1.5, score: 97 },
      { value: 2.0, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.sharpeRatio) ? metrics.sharpeRatio : null,
  },
  sortinoRatio: {
    label: 'Sortino Ratio',
    pillar: 'performance',
    weight: 0.04,
    mode: 'anchors',
    anchors: [
      { value: 0.0, score: 10 },
      { value: 0.5, score: 45 },
      { value: 1.0, score: 68 },
      { value: 1.5, score: 85 },
      { value: 2.0, score: 95 },
      { value: 3.0, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.sortinoRatio) ? metrics.sortinoRatio : null,
  },
  calmarRatio: {
    label: 'Calmar Ratio',
    pillar: 'performance',
    weight: 0.04,
    mode: 'anchors',
    anchors: [
      { value: 0.0, score: 10 },
      { value: 0.5, score: 55 },
      { value: 1.0, score: 78 },
      { value: 1.5, score: 92 },
      { value: 2.0, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.calmarRatio) ? metrics.calmarRatio : null,
  },
  alpha: {
    label: 'Alpha vs Market',
    pillar: 'performance',
    weight: 0.06,
    mode: 'anchors',
    anchors: [
      { value: -0.05, score: 5 },
      { value: -0.02, score: 25 },
      { value: 0.0, score: 50 },
      { value: 0.02, score: 72 },
      { value: 0.04, score: 92 },
      { value: 0.06, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.alpha) ? metrics.alpha : null,
  },
  informationRatio: {
    label: 'Information Ratio',
    pillar: 'performance',
    weight: 0.06,
    mode: 'anchors',
    anchors: [
      { value: -0.5, score: 5 },
      { value: 0.0, score: 40 },
      { value: 0.3, score: 65 },
      { value: 0.5, score: 82 },
      { value: 0.7, score: 94 },
      { value: 1.0, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.informationRatio) ? metrics.informationRatio : null,
  },
  upCaptureRatio: {
    label: 'Up Capture Ratio',
    pillar: 'performance',
    weight: 0.02,
    mode: 'anchors',
    anchors: [
      { value: 0.7, score: 20 },
      { value: 0.8, score: 35 },
      { value: 0.9, score: 55 },
      { value: 1.0, score: 75 },
      { value: 1.05, score: 88 },
      { value: 1.1, score: 95 },
      { value: 1.2, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.upCaptureRatio) ? metrics.upCaptureRatio : null,
  },
  downCaptureRatio: {
    label: 'Down Capture Ratio',
    pillar: 'performance',
    weight: 0.02,
    mode: 'anchors',
    anchors: [
      { value: 0.6, score: 100 },
      { value: 0.7, score: 92 },
      { value: 0.8, score: 78 },
      { value: 0.9, score: 60 },
      { value: 1.0, score: 40 },
      { value: 1.1, score: 20 },
      { value: 1.2, score: 5 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.downCaptureRatio) ? metrics.downCaptureRatio : null,
  },
  volatility: {
    label: 'Portfolio Volatility',
    pillar: 'risk',
    weight: 0.07,
    mode: 'anchors',
    anchors: [
      { value: 0.05, score: 100 },
      { value: 0.08, score: 92 },
      { value: 0.10, score: 82 },
      { value: 0.12, score: 70 },
      { value: 0.15, score: 55 },
      { value: 0.2, score: 35 },
      { value: 0.3, score: 12 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.volatility) ? metrics.volatility : null,
  },
  maxDrawdown: {
    label: 'Max Drawdown',
    pillar: 'risk',
    weight: 0.07,
    mode: 'anchors',
    anchors: [
      { value: 0.05, score: 100 },
      { value: 0.1, score: 88 },
      { value: 0.15, score: 72 },
      { value: 0.2, score: 55 },
      { value: 0.25, score: 40 },
      { value: 0.3, score: 25 },
      { value: 0.4, score: 10 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.maxDrawdown) ? Math.abs(metrics.maxDrawdown) : null,
  },
  recoveryTime: {
    label: 'Recovery Time',
    pillar: 'risk',
    weight: 0.04,
    mode: 'anchors',
    anchors: [
      { value: 1, score: 100 },
      { value: 3, score: 85 },
      { value: 6, score: 70 },
      { value: 9, score: 55 },
      { value: 12, score: 45 },
      { value: 18, score: 25 },
      { value: 24, score: 10 },
      { value: 36, score: 5 },
    ],
    accessor: (metrics) => deriveRecoveryMonthsMetric(metrics),
  },
  cvarLoss: {
    label: 'CVaR / Expected Shortfall',
    pillar: 'risk',
    weight: 0.06,
    mode: 'anchors',
    anchors: [
      { value: 0.02, score: 100 },
      { value: 0.05, score: 85 },
      { value: 0.1, score: 68 },
      { value: 0.15, score: 52 },
      { value: 0.2, score: 35 },
      { value: 0.3, score: 18 },
      { value: 0.4, score: 5 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.cvarLoss) ? Math.abs(metrics.cvarLoss) : null,
  },
  beta: {
    label: 'Portfolio Beta',
    pillar: 'risk',
    weight: 0.06,
    mode: 'target',
    target: 1,
    band: 0.15,
    penalty: 2,
    accessor: (metrics) =>
      Number.isFinite(metrics?.beta) ? metrics.beta : null,
  },
  diversityIndex: {
    label: 'Diversity Score',
    pillar: 'structure',
    weight: 0.08,
    mode: 'anchors',
    anchors: [
      { value: 0.2, score: 15 },
      { value: 0.3, score: 32 },
      { value: 0.4, score: 50 },
      { value: 0.5, score: 68 },
      { value: 0.6, score: 82 },
      { value: 0.7, score: 92 },
      { value: 0.8, score: 98 },
      { value: 0.9, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.diversityIndex) ? metrics.diversityIndex : null,
  },
  multiFactorAlignment: {
    label: 'Multi-factor Betas',
    pillar: 'structure',
    weight: 0.06,
    mode: 'target',
    target: 0,
    band: 0.25,
    penalty: 1.4,
    accessor: (metrics) => computeMultiFactorAlignmentDeviation(metrics),
  },
  multiFactorRSquared: {
    label: 'R² vs Factors',
    pillar: 'structure',
    weight: 0.03,
    mode: 'anchors',
    anchors: [
      { value: 0.4, score: 25 },
      { value: 0.55, score: 45 },
      { value: 0.7, score: 65 },
      { value: 0.85, score: 82 },
      { value: 0.92, score: 93 },
      { value: 0.97, score: 100 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.multiFactorRSquared) ? metrics.multiFactorRSquared : null,
  },
  trackingError: {
    label: 'Tracking Error',
    pillar: 'structure',
    weight: 0.03,
    mode: 'target',
    target: 0.05,
    band: 0.03,
    penalty: 1.5,
    accessor: (metrics) =>
      Number.isFinite(metrics?.trackingError) ? metrics.trackingError : null,
  },
  expenseRatio: {
    label: 'Weighted Expense Ratio',
    pillar: 'cost',
    weight: 0.1,
    mode: 'anchors',
    anchors: [
      { value: 0.0, score: 100 },
      { value: 0.001, score: 92 },
      { value: 0.0025, score: 78 },
      { value: 0.004, score: 60 },
      { value: 0.006, score: 40 },
      { value: 0.01, score: 20 },
      { value: 0.015, score: 5 },
    ],
    accessor: (metrics) =>
      Number.isFinite(metrics?.expenseRatio) ? metrics.expenseRatio : null,
  },
});

function scoreVolatility(volatility) {
  const pct = volatility * 100;
  if (pct < 10) return 10;
  if (pct < 13) return 9;
  if (pct < 16) return 8;
  if (pct < 19) return 7;
  if (pct < 23) return 6;
  if (pct < 27) return 5;
  return 4;
}

function scoreSharpe(sharpe) {
  if (!Number.isFinite(sharpe)) return 0;
  if (sharpe >= 0.8) return 10;
  if (sharpe >= 0.6) return 9;
  if (sharpe >= 0.45) return 8;
  if (sharpe >= 0.35) return 7;
  if (sharpe >= 0.25) return 6;
  if (sharpe >= 0.15) return 5;
  if (sharpe >= 0.0) return 4;
  return 3;
}

function scoreBeta(beta) {
  const absBeta = Math.abs(beta);
  if (absBeta <= 0.85) return 10;
  if (absBeta <= 0.9) return 9;
  if (absBeta <= 1.0) return 8;
  if (absBeta <= 1.1) return 7;
  if (absBeta <= 1.3) return 6;
  if (absBeta <= 1.5) return 5;
  return 4;
}

function scoreExpectedReturn(expectedReturn) {
  if (!Number.isFinite(expectedReturn) || expectedReturn <= 0) return 0;
  const pct = expectedReturn * 100;
  if (pct >= 12) return 10;
  if (pct >= 10) return 9;
  if (pct >= 8) return 8;
  if (pct >= 6) return 7;
  if (pct >= 5) return 6;
  if (pct >= 4) return 5;
  if (pct >= 3) return 4;
  if (pct >= 2) return 3;
  if (pct >= 1) return 2;
  return 1;
}

function scoreDiversity(index) {
  if (!Number.isFinite(index)) return 5;
  if (index >= 0.85) return 10;
  if (index >= 0.75) return 9;
  if (index >= 0.65) return 8;
  if (index >= 0.55) return 7;
  if (index >= 0.45) return 6;
  if (index >= 0.35) return 5;
  return 4;
}

function computeCapmExpectedReturn(betaEstimate) {
  if (capmExpectedReturnFn) {
    return capmExpectedReturnFn(betaEstimate);
  }
  const beta = Number.isFinite(betaEstimate) ? betaEstimate : 1;
  return DEFAULT_RISK_FREE_RATE + beta * DEFAULT_EQUITY_RISK_PREMIUM;
}

function getAssetExpectedReturnValue(key) {
  const overrides =
    typeof expectedReturns === 'object' && expectedReturns !== null
      ? expectedReturns
      : null;
  const overrideValue = overrides ? overrides[key] : undefined;
  if (Number.isFinite(overrideValue)) {
    return overrideValue;
  }
  const betaEstimate =
    typeof portfolioAssetBetas === 'object' && portfolioAssetBetas !== null
      ? portfolioAssetBetas[key]
      : undefined;
  return computeCapmExpectedReturn(betaEstimate);
}

// Calculate portfolio expected return (CAPM baseline with per-asset overrides) using normalized weights
function calculateExpectedReturn(targets) {
  const weights = normalizeWeights(targets);
  return assetKeys.reduce((sum, key) => {
    const assetReturn = getAssetExpectedReturnValue(key);
    return sum + (weights[key] || 0) * assetReturn;
  }, 0);
}

// Calculate portfolio volatility (standard deviation)
function calculateVolatility(targets) {
  const weights = normalizeWeights(targets);
  const covarianceMatrix = buildCovarianceMatrix();
  const weightVector = assetKeys.map((key) => weights[key] || 0);

  const variance = weightVector.reduce((sum, weightI, i) => {
    if (!Number.isFinite(weightI) || weightI === 0) return sum;
    const row = covarianceMatrix[i] || [];
    const contribution = weightVector.reduce((inner, weightJ, j) => {
      if (!Number.isFinite(weightJ) || weightJ === 0) return inner;
      const covariance = row[j] ?? 0;
      return inner + covariance * weightJ;
    }, 0);
    return sum + weightI * contribution;
  }, 0);

  const clampedVariance = Math.max(variance, 0);
  const volatility = Math.sqrt(clampedVariance);
  const weightSum = weightVector.reduce(
    (acc, weight) => acc + (Number.isFinite(weight) ? weight : 0),
    0
  );

  lastVolatilitySnapshot = {
    normalizedWeights: { ...weights },
    weightVector: [...weightVector],
    covarianceMatrix,
    variance: clampedVariance,
    volatility,
    weightSum,
  };

  return volatility;
}

// Calculate Sharpe Ratio with configurable risk-free rate
function calculateSharpeRatio(expectedReturn, volatility) {
  if (!Number.isFinite(volatility) || volatility <= 0) return 0;
  return (expectedReturn - DEFAULT_RISK_FREE_RATE) / volatility;
}



function approximateDownsideDeviation(meanReturn, volatility, floorReturn) {
  if (!Number.isFinite(volatility) || volatility <= 0) return 0;
  const target = Number.isFinite(floorReturn) ? floorReturn : DEFAULT_RISK_FREE_RATE;
  const steps = 480;
  const std = volatility;
  const mu = meanReturn;
  const lowerBound = mu - 6 * std;
  const upperBound = mu + 6 * std;
  const step = (upperBound - lowerBound) / steps;
  let integral = 0;

  for (let i = 0; i <= steps; i += 1) {
    const x = lowerBound + i * step;
    const pdf =
      Math.exp(-0.5 * ((x - mu) / std) ** 2) / (std * Math.sqrt(2 * Math.PI));
    const shortfall = target - x;
    if (shortfall <= 0 || pdf <= 0) continue;
    const weight = i === 0 || i === steps ? 0.5 : 1;
    integral += weight * shortfall * shortfall * pdf;
  }

  return Math.sqrt(Math.max(integral * step, 0));
}

function calculateSortinoRatio(expectedReturn, riskFreeRate, volatility) {
  const downsideDeviation = approximateDownsideDeviation(
    expectedReturn,
    volatility,
    riskFreeRate
  );
  const sanitizedDeviation = Number.isFinite(downsideDeviation) ? Math.max(downsideDeviation, 0) : null;
  const meanExcess = expectedReturn - riskFreeRate;
  if (!Number.isFinite(downsideDeviation) || downsideDeviation <= 0) {
    lastSortinoSnapshot = {
      target: riskFreeRate,
      downsideDeviation: sanitizedDeviation,
      meanExcess,
      ratio: 0,
    };
    return 0;
  }
  const ratio = meanExcess / downsideDeviation;
  lastSortinoSnapshot = {
    target: riskFreeRate,
    downsideDeviation,
    meanExcess,
    ratio,
  };
  return ratio;
}

function createDeterministicRandom(seed = 1234567) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return function next() {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

function createNormalSampler(rng) {
  let spare = null;
  return function sample() {
    if (spare !== null) {
      const value = spare;
      spare = null;
      return value;
    }
    let u = 0;
    let v = 0;
    let s = 0;
    do {
      u = rng() * 2 - 1;
      v = rng() * 2 - 1;
      s = u * u + v * v;
    } while (s === 0 || s >= 1);
    const mul = Math.sqrt((-2 * Math.log(s)) / s);
    spare = v * mul;
    return u * mul;
  };
}

function computeDrawdownFromSeries(
  series,
  options = {}
) {
  const {
    stepMonths = 1,
    stepTradingDays = null,
    stepCalendarDays = null,
  } = options || {};

  const multiplyIfFinite = (steps, multiplier) => {
    if (
      !Number.isFinite(steps) ||
      steps === null ||
      !Number.isFinite(multiplier) ||
      multiplier <= 0
    ) {
      return null;
    }
    return steps * multiplier;
  };

  if (!Array.isArray(series) || series.length === 0) {
    return {
      maxDrawdown: 0,
      recoveryMonths: null,
      recoveryTradingDays: null,
      recoveryCalendarDays: null,
      recoverySteps: null,
      timeUnderWaterMonths: null,
      timeUnderWaterTradingDays: null,
      timeUnderWaterSteps: null,
      peakIndex: 0,
      troughIndex: 0,
      peakValue: 0,
      troughValue: 0,
      durationMonths: 0,
      durationTradingDays: null,
      durationCalendarDays: null,
      durationSteps: 0,
    };
  }

  let peak = series[0];
  let peakIndex = 0;
  let peakValue = series[0];
  let maxDrawdown = 0;
  let maxDrawdownPeakIndex = 0;
  let maxDrawdownTroughIndex = 0;
  let maxDrawdownPeakValue = series[0];
  let maxDrawdownTroughValue = series[0];

  for (let i = 1; i < series.length; i += 1) {
    const value = series[i];
    if (value > peak) {
      peak = value;
      peakIndex = i;
      peakValue = value;
      continue;
    }
    const drawdown = peak > 0 ? (peak - value) / peak : 0;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownPeakIndex = peakIndex;
      maxDrawdownTroughIndex = i;
      maxDrawdownPeakValue = peak;
      maxDrawdownTroughValue = value;
    }
  }

  if (maxDrawdown === 0) {
    return {
      maxDrawdown: 0,
      recoveryMonths: 0,
      recoveryTradingDays: stepTradingDays ? 0 : null,
      recoveryCalendarDays: stepCalendarDays ? 0 : null,
      recoverySteps: 0,
      timeUnderWaterMonths: 0,
      timeUnderWaterTradingDays: stepTradingDays ? 0 : null,
      timeUnderWaterSteps: 0,
      peakIndex: 0,
      troughIndex: 0,
      peakValue: series[0],
      troughValue: series[0],
      durationMonths: 0,
      durationTradingDays: stepTradingDays ? 0 : null,
      durationCalendarDays: stepCalendarDays ? 0 : null,
      durationSteps: 0,
    };
  }

  const recoveryTarget = series[maxDrawdownPeakIndex];
  let recoveryStepCount = null;
  let timeUnderWaterStepCount = null;
  for (let i = maxDrawdownTroughIndex + 1; i < series.length; i += 1) {
    if (series[i] >= recoveryTarget) {
      recoveryStepCount = i - maxDrawdownTroughIndex;
      timeUnderWaterStepCount = i - maxDrawdownPeakIndex;
      break;
    }
  }

  const durationSteps = Math.max(
    0,
    maxDrawdownTroughIndex - maxDrawdownPeakIndex
  );

  const recoveryMonths = multiplyIfFinite(
    recoveryStepCount,
    stepMonths
  );
  const recoveryTradingDays = multiplyIfFinite(
    recoveryStepCount,
    stepTradingDays
  );
  const recoveryCalendarDays = multiplyIfFinite(
    recoveryStepCount,
    stepCalendarDays
  );

  const timeUnderWaterMonths = multiplyIfFinite(
    timeUnderWaterStepCount,
    stepMonths
  );
  const timeUnderWaterTradingDays = multiplyIfFinite(
    timeUnderWaterStepCount,
    stepTradingDays
  );

  const durationMonths = multiplyIfFinite(durationSteps, stepMonths);
  const durationTradingDays = multiplyIfFinite(
    durationSteps,
    stepTradingDays
  );
  const durationCalendarDays = multiplyIfFinite(
    durationSteps,
    stepCalendarDays
  );

  return {
    maxDrawdown,
    recoveryMonths,
    recoveryTradingDays,
    recoveryCalendarDays,
    recoverySteps: recoveryStepCount,
    timeUnderWaterMonths,
    timeUnderWaterTradingDays,
    timeUnderWaterSteps: timeUnderWaterStepCount,
    peakIndex: maxDrawdownPeakIndex,
    troughIndex: maxDrawdownTroughIndex,
    peakValue: maxDrawdownPeakValue,
    troughValue: maxDrawdownTroughValue,
    durationMonths,
    durationTradingDays,
    durationCalendarDays,
    durationSteps,
  };
}

function simulateDrawdownMetrics(expectedReturn, volatility, simulations = 60) {
  if (!Number.isFinite(expectedReturn)) expectedReturn = 0;
  if (!Number.isFinite(volatility) || volatility <= 0) {
    lastDrawdownSnapshot = {
      averageDrawdown: 0,
      averageRecoveryMonths: 0,
      averageRecoveryTradingDays: 0,
      averageRecoveryCalendarDays: 0,
      horizonMonths: 0,
      simulations: 0,
      monthlyReturn: 0,
      monthlyVolatility: 0,
      worstCase: null,
    };
    return {
      maxDrawdown: 0,
      recoveryMonths: 0,
      recoveryTradingDays: 0,
      recoveryCalendarDays: 0,
    };
  }

  const rng = createDeterministicRandom();
  const normalSample = createNormalSampler(rng);
  const periods = 120; // monthly over 10 years
  const monthlyReturn = Math.pow(1 + expectedReturn, 1 / 12) - 1;
  const monthlyVol = volatility / Math.sqrt(12);
  const stepOptions = {
    stepMonths: 1,
    stepTradingDays: 252 / 12,
    stepCalendarDays: 365 / 12,
  };

  let maxDrawdownSum = 0;
  let recoveryMonthSum = 0;
  let recoveryTradingDaySum = 0;
  let recoveryCalendarDaySum = 0;
  let recoveryMonthCount = 0;
  let worstDrawdown = -Infinity;
  let worstDetails = null;

  for (let sim = 0; sim < simulations; sim += 1) {
    const path = [1];
    for (let i = 1; i <= periods; i += 1) {
      const shock = normalSample();
      const r = monthlyReturn + monthlyVol * shock;
      const nextValue = Math.max(path[i - 1] * (1 + r), 0.01);
      path.push(nextValue);
    }

    const drawdownMetrics = computeDrawdownFromSeries(path, stepOptions);
    const {
      maxDrawdown,
      recoveryMonths,
      recoveryTradingDays,
      recoveryCalendarDays,
    } = drawdownMetrics;
    maxDrawdownSum += maxDrawdown;
    if (Number.isFinite(recoveryMonths) && recoveryMonths !== null) {
      recoveryMonthSum += recoveryMonths;
      recoveryMonthCount += 1;
    }
    if (Number.isFinite(recoveryTradingDays) && recoveryTradingDays !== null) {
      recoveryTradingDaySum += recoveryTradingDays;
    }
    if (
      Number.isFinite(recoveryCalendarDays) &&
      recoveryCalendarDays !== null
    ) {
      recoveryCalendarDaySum += recoveryCalendarDays;
    }
    if (maxDrawdown > worstDrawdown) {
      worstDrawdown = maxDrawdown;
      worstDetails = {
        maxDrawdown,
        recoveryMonths,
        recoveryTradingDays,
        recoveryCalendarDays,
        peakIndex: drawdownMetrics.peakIndex,
        troughIndex: drawdownMetrics.troughIndex,
        peakValue: drawdownMetrics.peakValue,
        troughValue: drawdownMetrics.troughValue,
        durationMonths: drawdownMetrics.durationMonths,
        durationTradingDays: drawdownMetrics.durationTradingDays,
        durationCalendarDays: drawdownMetrics.durationCalendarDays,
        recoverySteps: drawdownMetrics.recoverySteps,
        timeUnderWaterMonths: drawdownMetrics.timeUnderWaterMonths,
        timeUnderWaterTradingDays: drawdownMetrics.timeUnderWaterTradingDays,
        timeUnderWaterSteps: drawdownMetrics.timeUnderWaterSteps,
      };
    }
  }

  const avgDrawdown = Math.max(maxDrawdownSum / simulations, 0);
  const avgRecoveryMonths =
    recoveryMonthCount > 0 ? recoveryMonthSum / recoveryMonthCount : null;
  const avgRecoveryTradingDays =
    recoveryMonthCount > 0
      ? recoveryTradingDaySum / recoveryMonthCount
      : null;
  const avgRecoveryCalendarDays =
    recoveryMonthCount > 0
      ? recoveryCalendarDaySum / recoveryMonthCount
      : null;

  lastDrawdownSnapshot = {
    averageDrawdown: avgDrawdown,
    averageRecoveryMonths: avgRecoveryMonths,
    averageRecoveryTradingDays: avgRecoveryTradingDays,
    averageRecoveryCalendarDays: avgRecoveryCalendarDays,
    horizonMonths: periods,
    simulations,
    monthlyReturn,
    monthlyVolatility: monthlyVol,
    worstCase: worstDetails,
  };

  return {
    maxDrawdown: Math.min(avgDrawdown, 0.95),
    recoveryMonths: avgRecoveryMonths,
    recoveryTradingDays: avgRecoveryTradingDays,
    recoveryCalendarDays: avgRecoveryCalendarDays,
  };
}

function calculateUpDownCaptureRatios({
  expectedReturn,
  volatility,
  beta,
  benchmarkReturn = DEFAULT_BENCHMARK_RETURN,
  benchmarkVolatility = DEFAULT_BENCHMARK_VOLATILITY,
  periods = 120,
} = {}) {
  const sanitizedExpected =
    Number.isFinite(expectedReturn) && expectedReturn !== null ? expectedReturn : null;
  const sanitizedVolatility =
    Number.isFinite(volatility) && volatility > 0 ? volatility : null;
  const sanitizedBenchmarkReturn = Number.isFinite(benchmarkReturn)
    ? benchmarkReturn
    : DEFAULT_BENCHMARK_RETURN;
  const sanitizedBenchmarkVolatility =
    Number.isFinite(benchmarkVolatility) && benchmarkVolatility > 0
      ? benchmarkVolatility
      : sanitizedVolatility !== null
      ? sanitizedVolatility
      : DEFAULT_BENCHMARK_VOLATILITY;
  const sanitizedBeta = Number.isFinite(beta) ? beta : 1;

  if (sanitizedExpected === null || sanitizedVolatility === null || sanitizedBenchmarkVolatility <= 0) {
    lastCaptureSnapshot = {
      upCapture: null,
      downCapture: null,
      upGeometricMean: null,
      benchmarkUpGeometricMean: null,
      downGeometricMean: null,
      benchmarkDownGeometricMean: null,
      upPeriods: 0,
      downPeriods: 0,
      monthlyPortfolioMean: null,
      monthlyPortfolioVol: null,
      monthlyBenchmarkMean: null,
      monthlyBenchmarkVol: null,
      beta: sanitizedBeta,
      residualVolatility: null,
      systematicVolatility: null,
      periods: 0,
      expectedReturn: sanitizedExpected,
      portfolioVolatility: sanitizedVolatility,
      benchmarkReturn: sanitizedBenchmarkReturn,
      benchmarkVolatility: sanitizedBenchmarkVolatility,
    };
    return {
      upCaptureRatio: null,
      downCaptureRatio: null,
      details: lastCaptureSnapshot,
    };
  }

  const rng = createDeterministicRandom(908172635);
  const normalSample = createNormalSampler(rng);
  const monthlyPortfolioMean = Math.pow(1 + sanitizedExpected, 1 / 12) - 1;
  const monthlyPortfolioVol = sanitizedVolatility / Math.sqrt(12);
  const monthlyBenchmarkMean = Math.pow(1 + sanitizedBenchmarkReturn, 1 / 12) - 1;
  const monthlyBenchmarkVol = sanitizedBenchmarkVolatility / Math.sqrt(12);
  const systematicVol = Math.abs(sanitizedBeta) * monthlyBenchmarkVol;
  const residualVariance = Math.max(
    monthlyPortfolioVol * monthlyPortfolioVol - systematicVol * systematicVol,
    0
  );
  const residualVol = Math.sqrt(residualVariance);

  const benchmarkReturns = [];
  const portfolioReturns = [];

  for (let i = 0; i < periods; i += 1) {
    const marketShock = normalSample();
    const benchReturn = monthlyBenchmarkMean + monthlyBenchmarkVol * marketShock;
    let residualShock = 0;
    if (residualVol > 0) {
      residualShock = normalSample() * residualVol;
    }
    const portfolioReturn =
      monthlyPortfolioMean +
      sanitizedBeta * monthlyBenchmarkVol * marketShock +
      residualShock;

    benchmarkReturns.push(benchReturn);
    portfolioReturns.push(portfolioReturn);
  }

  const computeCapture = (indices) => {
    if (!indices.length) {
      return {
        ratio: null,
        geometricBenchmark: null,
        geometricPortfolio: null,
        count: 0,
      };
    }
    let portfolioProduct = 1;
    let benchmarkProduct = 1;
    indices.forEach((idx) => {
      const benchFactor = 1 + benchmarkReturns[idx];
      const portFactor = 1 + portfolioReturns[idx];
      const safeBench = benchFactor > 0 ? benchFactor : 0.01;
      const safePort = portFactor > 0 ? portFactor : 0.01;
      benchmarkProduct *= safeBench;
      portfolioProduct *= safePort;
    });
    const geometricBenchmark = Math.pow(benchmarkProduct, 1 / indices.length) - 1;
    const geometricPortfolio = Math.pow(portfolioProduct, 1 / indices.length) - 1;
    const ratio =
      Number.isFinite(geometricBenchmark) && Math.abs(geometricBenchmark) > 1e-6
        ? geometricPortfolio / geometricBenchmark
        : null;
    return {
      ratio,
      geometricBenchmark,
      geometricPortfolio,
      count: indices.length,
    };
  };

  const upIndices = [];
  const downIndices = [];
  benchmarkReturns.forEach((value, idx) => {
    if (value > 0) upIndices.push(idx);
    else if (value < 0) downIndices.push(idx);
  });

  const upMetrics = computeCapture(upIndices);
  const downMetrics = computeCapture(downIndices);

  lastCaptureSnapshot = {
    upCapture: upMetrics.ratio,
    downCapture: downMetrics.ratio,
    upGeometricMean: upMetrics.geometricPortfolio,
    benchmarkUpGeometricMean: upMetrics.geometricBenchmark,
    downGeometricMean: downMetrics.geometricPortfolio,
    benchmarkDownGeometricMean: downMetrics.geometricBenchmark,
    upPeriods: upMetrics.count,
    downPeriods: downMetrics.count,
    monthlyPortfolioMean,
    monthlyPortfolioVol,
    monthlyBenchmarkMean,
    monthlyBenchmarkVol,
    beta: sanitizedBeta,
    residualVolatility: residualVol,
    systematicVolatility: systematicVol,
    periods,
    expectedReturn: sanitizedExpected,
    portfolioVolatility: sanitizedVolatility,
    benchmarkReturn: sanitizedBenchmarkReturn,
    benchmarkVolatility: sanitizedBenchmarkVolatility,
  };

  return {
    upCaptureRatio: upMetrics.ratio,
    downCaptureRatio: downMetrics.ratio,
    details: lastCaptureSnapshot,
  };
}

function computeMultiFactorMetrics({ weights, variance }) {
  const factorList =
    Array.isArray(DEFAULT_FACTOR_NAMES) && DEFAULT_FACTOR_NAMES.length
      ? DEFAULT_FACTOR_NAMES
      : [];
  if (!factorList.length) {
    lastMultiFactorSnapshot = {
      exposures: {},
      factorNames: [],
      covarianceMatrix: [],
      explainedVariance: 0,
      residualVariance: 0,
      totalVariance: Number.isFinite(variance) ? variance : 0,
      rSquared: null,
      weights: weights ? { ...weights } : {},
    };
    return {
      exposures: {},
      factorNames: [],
      covarianceMatrix: [],
      explainedVariance: 0,
      residualVariance: 0,
      totalVariance: Number.isFinite(variance) ? variance : 0,
      rSquared: null,
    };
  }

  const exposures = factorList.reduce((acc, factor) => {
    acc[factor] = 0;
    return acc;
  }, {});

  assetKeys.forEach((key) => {
    const weight = weights && Number.isFinite(weights[key]) ? weights[key] : 0;
    if (!weight) {
      return;
    }
    const loadings =
      typeof ASSET_MULTI_FACTOR_LOADINGS[key] === 'object' &&
      ASSET_MULTI_FACTOR_LOADINGS[key] !== null
        ? ASSET_MULTI_FACTOR_LOADINGS[key]
        : null;
    factorList.forEach((factor) => {
      const loading =
        loadings && Number.isFinite(loadings[factor]) ? loadings[factor] : 0;
      exposures[factor] += weight * loading;
    });
  });

  const covarianceMatrix = factorList.map((rowFactor) =>
    factorList.map((colFactor) => {
      const row =
        typeof FACTOR_COVARIANCES[rowFactor] === 'object' &&
        FACTOR_COVARIANCES[rowFactor] !== null
          ? FACTOR_COVARIANCES[rowFactor]
          : null;
      const value =
        row && Number.isFinite(row[colFactor]) ? row[colFactor] : 0;
      return value;
    })
  );

  const exposureVector = factorList.map((factor) =>
    Number.isFinite(exposures[factor]) ? exposures[factor] : 0
  );

  let explainedVariance = 0;
  for (let i = 0; i < factorList.length; i += 1) {
    for (let j = 0; j < factorList.length; j += 1) {
      explainedVariance +=
        exposureVector[i] * covarianceMatrix[i][j] * exposureVector[j];
    }
  }
  explainedVariance = Math.max(explainedVariance, 0);

  let residualVarianceEstimate = 0;
  assetKeys.forEach((key) => {
    const weight = weights && Number.isFinite(weights[key]) ? weights[key] : 0;
    if (!weight) {
      return;
    }
    const residualVol = Number.isFinite(ASSET_RESIDUAL_VOLS[key])
      ? ASSET_RESIDUAL_VOLS[key]
      : 0;
    residualVarianceEstimate += weight * weight * residualVol * residualVol;
  });

  let totalVariance =
    Number.isFinite(variance) && variance > 0 ? variance : null;
  if (!Number.isFinite(totalVariance) || totalVariance === null) {
    totalVariance = explainedVariance + residualVarianceEstimate;
  } else if (explainedVariance > totalVariance) {
    totalVariance = explainedVariance + residualVarianceEstimate;
  }

  const residualVariance =
    totalVariance > explainedVariance
      ? totalVariance - explainedVariance
      : Math.max(residualVarianceEstimate, 0);

  const rSquared =
    totalVariance > 0
      ? Math.max(0, Math.min(1, explainedVariance / totalVariance))
      : null;

  lastMultiFactorSnapshot = {
    exposures: { ...exposures },
    factorNames: [...factorList],
    covarianceMatrix,
    explainedVariance,
    residualVariance,
    residualVarianceEstimate,
    totalVariance,
    rSquared,
    weights: weights ? { ...weights } : {},
  };

  return {
    exposures,
    factorNames: factorList,
    covarianceMatrix,
    explainedVariance,
    residualVariance,
    totalVariance,
    rSquared,
  };
}

function calculateTailRiskMetrics({
  expectedReturn,
  volatility,
  periods = 120,
  confidenceLevel = 0.95,
} = {}) {
  if (!Number.isFinite(expectedReturn)) expectedReturn = 0;
  if (!Number.isFinite(volatility) || volatility <= 0) {
    lastTailRiskSnapshot = {
      cvar: null,
      var: null,
      confidenceLevel,
      tailProbability: 1 - confidenceLevel,
      simulatedReturns: [],
      losses: [],
    };
    return { cvar: null, var: null, confidenceLevel };
  }

  const rng = createDeterministicRandom(710274);
  const normalSample = createNormalSampler(rng);
  const monthlyReturn = Math.pow(1 + expectedReturn, 1 / 12) - 1;
  const monthlyVol = volatility / Math.sqrt(12);
  const returns = [];
  for (let i = 0; i < periods; i += 1) {
    const z = normalSample();
    returns.push(monthlyReturn + monthlyVol * z);
  }
  const losses = returns.map((r) => -r);
  const sortedLosses = [...losses].sort((a, b) => b - a);
  const tailProbability = 1 - confidenceLevel;
  const tailCount = Math.max(1, Math.floor(sortedLosses.length * tailProbability));
  const varIndex = Math.min(sortedLosses.length - 1, tailCount - 1);
  const varLoss = sortedLosses[varIndex];
  let cvarLoss = null;
  if (tailCount > 0) {
    const tailSlice = sortedLosses.slice(0, tailCount);
    const sum = tailSlice.reduce((acc, value) => acc + value, 0);
    cvarLoss = sum / tailSlice.length;
  }
  lastTailRiskSnapshot = {
    cvar: cvarLoss,
    var: varLoss,
    confidenceLevel,
    tailProbability,
    simulatedReturns: returns,
    losses,
    sortedLosses,
  };
  return { cvar: cvarLoss, var: varLoss, confidenceLevel };
}

function calculateTrackingErrorMetrics({
  expectedReturn,
  variance,
  beta,
  benchmarkReturn = DEFAULT_BENCHMARK_RETURN,
  benchmarkVolatility = DEFAULT_BENCHMARK_VOLATILITY,
} = {}) {
  const activeReturn = Number.isFinite(expectedReturn) ? expectedReturn - benchmarkReturn : null;
  const portfolioVariance = Number.isFinite(variance) ? variance : null;
  const benchmarkSigma = Number.isFinite(benchmarkVolatility) ? benchmarkVolatility : null;
  const betaValue = Number.isFinite(beta) ? beta : null;

  let trackingError = null;
  if (
    portfolioVariance !== null &&
    benchmarkSigma !== null &&
    betaValue !== null &&
    portfolioVariance >= 0 &&
    benchmarkSigma >= 0
  ) {
    const varPortfolio = portfolioVariance;
    const varBenchmark = benchmarkSigma * benchmarkSigma;
    const covar = betaValue * varBenchmark;
    const activeVariance = varPortfolio + varBenchmark - 2 * covar;
    trackingError = Math.sqrt(Math.max(activeVariance, 0));
  }

  const informationRatio =
    trackingError && trackingError > 0 && Number.isFinite(activeReturn)
      ? activeReturn / trackingError
      : null;

  lastTrackingSnapshot = {
    trackingError,
    informationRatio,
    activeReturn,
    benchmarkReturn,
    benchmarkVolatility,
  };

  return {
    trackingError,
    informationRatio,
    activeReturn,
    benchmarkReturn,
    benchmarkVolatility,
  };
}

// Calculate Portfolio Beta (weighted average of asset betas)
function calculatePortfolioBeta(targets) {
  const weights = normalizeWeights(targets);
  const betaContributions = {};
  let portfolioBeta = 0;

  assetKeys.forEach((key) => {
    const weight = weights[key] || 0;
    if (!Number.isFinite(weight) || weight === 0) {
      betaContributions[key] = 0;
      return;
    }
    const assetBeta = portfolioAssetBetas[key] ?? 1;
    const contribution = weight * assetBeta;
    betaContributions[key] = contribution;
    portfolioBeta += contribution;
  });

  lastBetaSnapshot = {
    normalizedWeights: { ...weights },
    contributions: { ...betaContributions },
    assetBetas: { ...portfolioAssetBetas },
    portfolioBeta,
  };

  return portfolioBeta;
}

function calculateWeightedExpenseRatio(targets) {
  const weights = normalizeWeights(targets);
  const contributions = {};
  let total = 0;

  assetKeys.forEach((key) => {
    const weight = weights[key] || 0;
    if (!Number.isFinite(weight) || weight <= 0) {
      contributions[key] = 0;
      return;
    }
    const ratio = portfolioExpenseRatios[key] ?? 0;
    const contribution = weight * ratio;
    contributions[key] = contribution;
    total += contribution;
  });

  lastExpenseSnapshot = {
    normalizedWeights: { ...weights },
    contributions,
    total,
  };

  return total;
}

function calculateAlpha(expectedReturn, beta) {
  const marketReturn = DEFAULT_BENCHMARK_RETURN;
  return (
    expectedReturn - DEFAULT_RISK_FREE_RATE - beta * (marketReturn - DEFAULT_RISK_FREE_RATE)
  );
}

function calculateCalmarRatio(expectedReturn, maxDrawdown) {
  const risk = Math.abs(maxDrawdown);
  if (!Number.isFinite(expectedReturn) || !Number.isFinite(risk) || risk <= 0) {
    return 0;
  }
  return expectedReturn / risk;
}

function calculatePortfolioScore(metrics) {
  const metricScores = {};
  const metricValues = {};
  let metricWeightTotal = 0;
  let metricWeightCovered = 0;

  Object.entries(PORTFOLIO_SCORE_METRICS).forEach(([key, config]) => {
    const rawValue =
      typeof config.accessor === 'function'
        ? config.accessor(metrics)
        : metrics && metrics[key];
    metricValues[key] = Number.isFinite(rawValue) ? rawValue : null;

    let score = null;
    if (config.mode === 'target') {
      score = scoreTargetOptimal100(rawValue, config);
    } else {
      score = scoreFromAnchors(rawValue, config.anchors);
    }

    metricScores[key] = score;
    const weight = Number(config.weight);
    if (Number.isFinite(weight) && weight > 0) {
      metricWeightTotal += weight;
      if (Number.isFinite(score)) {
        metricWeightCovered += weight;
      }
    }
  });

  const pillarScores = {};
  let pillarWeightTotal = 0;
  let pillarWeightCovered = 0;

  Object.entries(PORTFOLIO_PILLAR_WEIGHTS).forEach(([pillarKey, pillarWeight]) => {
    const entries = Object.entries(PORTFOLIO_SCORE_METRICS)
      .filter(([, config]) => config.pillar === pillarKey)
      .map(([metricKey, config]) => ({
        weight: config.weight,
        score: metricScores[metricKey],
      }));
    const pillarScore = weightedAverageScore(entries);
    pillarScores[pillarKey] = pillarScore;
    if (Number.isFinite(pillarWeight) && pillarWeight > 0) {
      pillarWeightTotal += pillarWeight;
      if (Number.isFinite(pillarScore)) {
        pillarWeightCovered += pillarWeight;
      }
    }
  });

  const overallScore = weightedAverageScore(
    Object.entries(pillarScores).map(([pillarKey, score]) => ({
      weight: PORTFOLIO_PILLAR_WEIGHTS[pillarKey] || 0,
      score,
    }))
  );

  const normalizedScore = Number.isFinite(overallScore)
    ? clampToScale(overallScore)
    : 0;
  const score10 = clampScore(normalizedScore / 10);

  return {
    score: score10,
    normalizedScore,
    components: {
      overall: normalizedScore,
      pillarScores,
      metricScores,
      metricValues,
      weights: {
        pillars: { ...PORTFOLIO_PILLAR_WEIGHTS },
        metrics: Object.fromEntries(
          Object.entries(PORTFOLIO_SCORE_METRICS).map(([key, config]) => [
            key,
            config.weight,
          ])
        ),
      },
      coverage: {
        pillars:
          pillarWeightTotal > 0 ? pillarWeightCovered / pillarWeightTotal : 0,
        metrics:
          metricWeightTotal > 0 ? metricWeightCovered / metricWeightTotal : 0,
      },
      missingMetrics: Object.entries(metricScores)
        .filter(([, value]) => !Number.isFinite(value))
        .map(([name]) => name),
    },
  };
}

// Function to calculate Diversity Score
function calculateDiversityScore(targets) {
  const normalizedWeights = normalizeWeights(targets);
  const weights = assetKeys
    .map((key) => normalizedWeights[key] || 0)
    .filter((weight) => Number.isFinite(weight) && weight > 0);
  const assetCount = weights.length;

  if (!assetCount) {
    lastDiversitySnapshot = null;
    return { index: 0, score: 0, details: null };
  }

  const hhi = weights.reduce((sum, weight) => sum + weight * weight, 0);
  const effectiveHoldings = hhi > 0 ? 1 / hhi : 0;
  let diversityQuick = 0;
  if (assetCount > 1) {
    const denominator = 1 - 1 / assetCount;
    diversityQuick = denominator > 0 ? (1 - hhi) / denominator : 0;
  }
  diversityQuick = Math.max(0, Math.min(1, diversityQuick));

  const covarianceMatrix = buildCovarianceMatrix();
  const fullWeightVector = assetKeys.map((key) => normalizedWeights[key] || 0);
  const variance = fullWeightVector.reduce((sum, weightI, i) => {
    if (!Number.isFinite(weightI) || weightI === 0) return sum;
    const row = covarianceMatrix[i] || [];
    const contribution = fullWeightVector.reduce((inner, weightJ, j) => {
      if (!Number.isFinite(weightJ) || weightJ === 0) return inner;
      const covariance = row[j] ?? 0;
      return inner + covariance * weightJ;
    }, 0);
    return sum + weightI * contribution;
  }, 0);

  let diversityCorr = Number.isFinite(diversityQuick) ? diversityQuick : 0;
  const riskShares = {};

  if (Number.isFinite(variance) && variance > 0) {
    let sumSquares = 0;
    assetKeys.forEach((key, i) => {
      const weight = fullWeightVector[i];
      if (!Number.isFinite(weight) || weight === 0) {
        riskShares[key] = 0;
        return;
      }
      const row = covarianceMatrix[i] || [];
      const contribution = fullWeightVector.reduce((inner, weightJ, j) => {
        if (!Number.isFinite(weightJ) || weightJ === 0) return inner;
        const covariance = row[j] ?? 0;
        return inner + covariance * weightJ;
      }, 0);
      const riskShare = contribution > 0 ? (weight * contribution) / variance : 0;
      riskShares[key] = riskShare;
      sumSquares += riskShare * riskShare;
    });

    if (sumSquares > 0) {
      const effectiveRiskContributors = 1 / sumSquares;
      if (assetCount > 1) {
        const denominator = assetCount - 1;
        const numerator = effectiveRiskContributors - 1;
        diversityCorr = Math.max(
          0,
          Math.min(1, numerator / (denominator > 0 ? denominator : 1))
        );
      } else {
        diversityCorr = 0;
      }
    }
  }

  const diversityIndex = Number.isFinite(diversityCorr) ? diversityCorr : diversityQuick;
  const diversityScore = scoreDiversity(diversityIndex);

  lastDiversitySnapshot = {
    weights: { ...normalizedWeights },
    weightOnlyHHI: hhi,
    weightOnlyEffectiveHoldings: effectiveHoldings,
    diversityQuick,
    diversityCorr,
    variance,
    riskShares,
    assetCount,
  };

  return {
    index: diversityIndex,
    score: diversityScore,
    details: {
      hhi,
      effectiveHoldings,
      diversityQuick,
      diversityCorr,
      variance,
      riskShares,
      assetCount,
    },
  };
}

function loadContributionSnapshots() {
  try {
    const stored = localStorage.getItem(CONTRIBUTION_SNAPSHOT_STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    if (typeof parsed !== 'object' || parsed === null) return {};
    return parsed;
  } catch (error) {
    console.warn('Failed to load contribution snapshots, resetting.', error);
    return {};
  }
}

function persistContributionSnapshots() {
  try {
    localStorage.setItem(
      CONTRIBUTION_SNAPSHOT_STORAGE_KEY,
      JSON.stringify(contributionSnapshots)
    );
  } catch (error) {
    console.warn('Failed to store contribution snapshots.', error);
  }
}

function getContributionSnapshotForMode(mode) {
  return contributionSnapshots[mode] || { values: {}, total: null };
}

function updateContributionSnapshot(mode, values, total) {
  contributionSnapshots[mode] = {
    values,
    total,
    timestamp: Date.now(),
  };
  persistContributionSnapshots();
}

function formatContributionValue(value, mode) {
  if (!Number.isFinite(value)) return '--';
  if (mode === 'sharpe') {
    return value.toFixed(2);
  }
  return formatPercent(value * 100);
}

function formatContributionDelta(value, mode) {
  if (!Number.isFinite(value)) return '--';
  if (mode === 'sharpe') {
    const absValue = Math.abs(value).toFixed(2);
    if (value > 0) return `+${absValue}`;
    if (value < 0) return `-${absValue}`;
    return absValue;
  }
  const formatted = formatPercent(Math.abs(value) * 100);
  if (value > 0) return `+${formatted}`;
  if (value < 0) return `-${formatted}`;
  return formatted;
}

function updateContributionHeaders(mode) {
  const signalHeader = document.getElementById('contributionSignalHeader');
  const valueHeader = document.getElementById('contributionValueHeader');
  if (!signalHeader || !valueHeader) return;

  const headerMap = {
    return: {
      signal: 'Expected Return (%)',
      value: 'Return Contribution',
    },
    risk: {
      signal: 'Marginal Risk (%)',
      value: 'Risk Contribution',
    },
    sharpe: {
      signal: 'Sharpe Ratio',
      value: 'Sharpe Contribution',
    },
  };

  const config = headerMap[mode] || headerMap.return;
  signalHeader.textContent = config.signal;
  valueHeader.textContent = config.value;
}

function updateContributionToggleState() {
  const buttons = document.querySelectorAll('.contribution-toggle');
  buttons.forEach((button) => {
    const mode = button.getAttribute('data-mode');
    if (mode === assetContributionMode) {
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
    } else {
      button.classList.remove('active');
      button.setAttribute('aria-pressed', 'false');
    }
  });
  updateContributionHeaders(assetContributionMode);
}

function buildCovarianceMatrix() {
  return assetKeys.map((assetI) =>
    assetKeys.map((assetJ) => {
      const sigmaI = volatilities[assetI] ?? 0;
      const sigmaJ = volatilities[assetJ] ?? 0;
      const correlation =
        assetI === assetJ ? 1 : getCorrelation(assetI, assetJ);
      return sigmaI * sigmaJ * correlation;
    })
  );
}

function calculateRiskContributionMetrics(normalizedWeights) {
  const covarianceMatrix = buildCovarianceMatrix();
  const weightVector = assetKeys.map((key) => normalizedWeights[key] || 0);
  const sigmaTimesWeights = assetKeys.map((_, i) =>
    weightVector.reduce(
      (sum, weightJ, j) => sum + covarianceMatrix[i][j] * weightJ,
      0
    )
  );

  const portfolioVariance = weightVector.reduce(
    (sum, weightI, i) => sum + weightI * sigmaTimesWeights[i],
    0
  );
  const portfolioVolatility = Math.sqrt(Math.max(portfolioVariance, 0));

  const marginalRisk = {};
  const contributionFraction = {};
  const contributionAbsolute = {};

  assetKeys.forEach((key, i) => {
    const weight = weightVector[i];
    if (weight <= 0 || !Number.isFinite(weight)) {
      marginalRisk[key] = 0;
      contributionFraction[key] = 0;
      contributionAbsolute[key] = 0;
      return;
    }
    const marginalVol =
      portfolioVolatility > 0 ? sigmaTimesWeights[i] / portfolioVolatility : 0;
    const absoluteContribution = weight * marginalVol;
    const share =
      portfolioVolatility > 0 ? absoluteContribution / portfolioVolatility : 0;

    marginalRisk[key] = marginalVol;
    contributionAbsolute[key] = absoluteContribution;
    contributionFraction[key] = share;
  });

  return {
    portfolioVolatility,
    marginalRisk,
    contributionFraction,
    contributionAbsolute,
  };
}

function calculateSharpeMetrics(normalizedWeights) {
  const sharpeValues = {};
  let totalWeightedSharpe = 0;

  assetKeys.forEach((key) => {
    const assetReturn = getAssetExpectedReturnValue(key);
    const assetVol = volatilities[key] ?? 0;
    let sharpe = 0;
    if (Number.isFinite(assetVol) && assetVol > 0) {
      sharpe = (assetReturn - DEFAULT_RISK_FREE_RATE) / assetVol;
    }
    sharpeValues[key] = sharpe;
    totalWeightedSharpe += (normalizedWeights[key] || 0) * sharpe;
  });

  return {
    sharpeValues,
    totalWeightedSharpe,
  };
}

function markStressTestHighlight(row, key) {
  if (
    !window.recentStressTestHighlights ||
    !window.recentStressTestHighlights.has(key)
  ) {
    return;
  }
  row.classList.add('stress-test-glow');
  setTimeout(() => {
    row.classList.remove('stress-test-glow');
  }, 1500);
  window.recentStressTestHighlights.delete(key);
}

function refreshAssetContributionTable() {
  populateAssetContributionTable(getCurrentTargets());
}

function setContributionMode(mode) {
  if (!CONTRIBUTION_MODES.includes(mode) || mode === assetContributionMode) {
    return;
  }
  assetContributionMode = mode;
  localStorage.setItem(CONTRIBUTION_MODE_STORAGE_KEY, mode);
  refreshAssetContributionTable();
}

function applyStressScenario(scalePercent) {
  if (stressTestBaseline === null) {
    stressTestBaseline = {};
    assetKeys.forEach((key) => {
      stressTestBaseline[key] = expectedReturns[key];
    });
  }

  if (scalePercent === 0) {
    if (stressTestBaseline) {
      assetKeys.forEach((key) => {
        const baselineValue = stressTestBaseline[key];
        if (Number.isFinite(baselineValue)) {
          expectedReturns[key] = baselineValue;
          localStorage.setItem(`expectedReturn_${key}`, baselineValue);
        }
      });
    }
    stressTestBaseline = null;
  } else {
    const multiplier = 1 + scalePercent / 100;
    assetKeys.forEach((key) => {
      const base =
        stressTestBaseline && Number.isFinite(stressTestBaseline[key])
          ? stressTestBaseline[key]
          : expectedReturns[key];
      const adjusted = base * multiplier;
      expectedReturns[key] = adjusted;
      localStorage.setItem(`expectedReturn_${key}`, adjusted);
    });
  }

  window.recentStressTestHighlights = new Set(assetKeys);
  initializeAnalytics();
}

function bindContributionControls() {
  const toggleButtons = document.querySelectorAll('.contribution-toggle');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const mode = button.getAttribute('data-mode');
      setContributionMode(mode);
    });
  });

  const stressSlider = document.getElementById('stressTestSlider');
  const stressValueLabel = document.getElementById('stressTestValue');
  const stressMultiplierLabel = document.getElementById('stressTestMultiplier');
  const applyStressButton = document.getElementById('applyStressTestBtn');

  if (stressSlider && stressValueLabel) {
    stressSlider.addEventListener('input', () => {
      const value = parseFloat(stressSlider.value);
      stressValueLabel.textContent = `${value.toFixed(1)}%`;
      if (stressMultiplierLabel) {
        const multiplier = 1 + value / 100;
        stressMultiplierLabel.textContent = `${multiplier.toFixed(2)}x`;
      }
    });
  }

  if (applyStressButton && stressSlider) {
    applyStressButton.addEventListener('click', () => {
      const value = parseFloat(stressSlider.value);
      if (!Number.isFinite(value)) return;
      applyStressScenario(value);
    });
  }
}

// Populate Asset Contribution Table
function populateAssetContributionTable(targets) {
  const tableBody = document.getElementById('assetContributionTable');
  if (!tableBody) return;
  tableBody.innerHTML = '';

  const normalizedTargets = normalizeWeights(targets);
  updateContributionToggleState();

  const currentMode = assetContributionMode;
  const snapshot = getContributionSnapshotForMode(currentMode);
  const hasSnapshot =
    snapshot && typeof snapshot.total === 'number' && !Number.isNaN(snapshot.total);
  const newSnapshotValues = {};

  let riskMetrics = null;
  if (currentMode === 'risk') {
    riskMetrics = calculateRiskContributionMetrics(normalizedTargets);
  }

  let sharpeMetrics = null;
  if (currentMode === 'sharpe') {
    sharpeMetrics = calculateSharpeMetrics(normalizedTargets);
  }

  let summarySignalValue = null;
  let summaryContributionValue = 0;

  const portfolioReturn = calculateExpectedReturn(targets);
  const portfolioVolatility = calculateVolatility(targets);
  const portfolioSharpe = calculateSharpeRatio(
    portfolioReturn,
    portfolioVolatility
  );

  const tableFragment = document.createDocumentFragment();

  assetKeys.forEach((key) => {
    const weight = normalizedTargets[key] || 0;
    const row = document.createElement('tr');
    row.classList.add(
      'text-sm',
      'text-gray-700',
      'dark:text-gray-300',
      'hover:bg-blue-50/50',
      'dark:hover:bg-slate-700/50',
      'transition-colors'
    );

    const rawTarget = Number(targets[key]);
    const targetPercent = Number.isFinite(rawTarget)
      ? (rawTarget * 100).toFixed(1)
      : '0.0';

    const assetVol = volatilities[key] ?? 0;
    const volLabel = formatPercent(assetVol * 100);

    let signalValue;
    let contributionValue;
    let assetExpectedReturn = null;

    if (currentMode === 'risk' && riskMetrics) {
      signalValue = riskMetrics.marginalRisk[key] ?? 0;
      contributionValue = riskMetrics.contributionFraction[key] ?? 0;
    } else if (currentMode === 'sharpe' && sharpeMetrics) {
      signalValue = sharpeMetrics.sharpeValues[key] ?? 0;
      contributionValue = (weight || 0) * signalValue;
    } else {
      assetExpectedReturn = getAssetExpectedReturnValue(key);
      const sanitizedReturn = Number.isFinite(assetExpectedReturn)
        ? assetExpectedReturn
        : 0;
      signalValue = sanitizedReturn * 100;
      contributionValue = sanitizedReturn * weight;
    }

    newSnapshotValues[key] = contributionValue;
    summaryContributionValue += contributionValue;

    const previousValue =
      hasSnapshot && typeof snapshot.values?.[key] === 'number'
        ? snapshot.values[key]
        : 0;
    const delta = hasSnapshot ? contributionValue - previousValue : null;

    // Cells
    const assetCell = document.createElement('td');
    assetCell.className =
      'px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200';
    assetCell.textContent = key;

    const targetCell = document.createElement('td');
    targetCell.className = 'px-2 py-3 text-right';
    targetCell.textContent = `${targetPercent}%`;

    const signalCell = document.createElement('td');
    signalCell.className = 'px-2 py-3 text-right';

    if (currentMode === 'return') {
      const expectedReturnInput = document.createElement('input');
      expectedReturnInput.type = 'number';
      const displayReturn = Number.isFinite(assetExpectedReturn)
        ? assetExpectedReturn
        : getAssetExpectedReturnValue(key);
      const inputValue = Number.isFinite(displayReturn) ? displayReturn : 0;
      expectedReturnInput.value = (inputValue * 100).toFixed(1);
      expectedReturnInput.step = '0.1';
      expectedReturnInput.min = '0';
      expectedReturnInput.max = '50';
      expectedReturnInput.className =
        'w-20 styled-input p-1 text-right text-blue-600 dark:text-blue-300 font-bold';
      expectedReturnInput.addEventListener('input', function onInput() {
        const newValue = parseFloat(this.value);
        if (!Number.isFinite(newValue)) return;
        expectedReturns[key] = newValue / 100;
        localStorage.setItem(`expectedReturn_${key}`, newValue / 100);
        initializeAnalytics();
      });
      signalCell.appendChild(expectedReturnInput);
    } else if (currentMode === 'risk') {
      signalCell.textContent = formatPercent((signalValue || 0) * 100);
    } else {
      signalCell.textContent = Number.isFinite(signalValue)
        ? signalValue.toFixed(2)
        : '--';
    }

    const volatilityCell = document.createElement('td');
    volatilityCell.className = 'px-2 py-3 text-right';
    volatilityCell.textContent = volLabel;

    const contributionCell = document.createElement('td');
    contributionCell.className = 'px-2 py-3 text-right font-bold';
    if (contributionValue > 0) {
      contributionCell.classList.add('text-green-600', 'dark:text-green-400');
    } else if (contributionValue < 0) {
      contributionCell.classList.add('text-rose-600', 'dark:text-rose-400');
    } else {
      contributionCell.classList.add('text-gray-500', 'dark:text-gray-400');
    }
    contributionCell.textContent = formatContributionValue(
      contributionValue,
      currentMode
    );

    if (currentMode === 'return') {
      // contributions sum equals expected return -> use portfolioReturn for summary in header
      summarySignalValue = portfolioReturn;
    } else if (currentMode === 'risk' && riskMetrics) {
      summarySignalValue = riskMetrics.portfolioVolatility;
    } else if (currentMode === 'sharpe') {
      summarySignalValue = Number.isFinite(portfolioSharpe)
        ? portfolioSharpe
        : null;
    }

    const deltaCell = document.createElement('td');
    deltaCell.className = 'px-2 py-3 text-right text-xs';
    if (hasSnapshot && Number.isFinite(delta)) {
      deltaCell.textContent = formatContributionDelta(delta, currentMode);
      if (delta > 0) {
        deltaCell.classList.add('text-emerald-600', 'dark:text-emerald-400');
      } else if (delta < 0) {
        deltaCell.classList.add('text-rose-600', 'dark:text-rose-400');
      } else {
        deltaCell.classList.add('text-gray-500', 'dark:text-gray-400');
      }
    } else {
      deltaCell.textContent = ' - ';
      deltaCell.classList.add('text-gray-400', 'dark:text-gray-500');
    }

    row.appendChild(assetCell);
    row.appendChild(targetCell);
    row.appendChild(signalCell);
    row.appendChild(volatilityCell);
    row.appendChild(contributionCell);
    row.appendChild(deltaCell);

    tableFragment.appendChild(row);
    markStressTestHighlight(row, key);
  });

  tableBody.appendChild(tableFragment);

  const summaryRow = document.getElementById('assetContributionSummary');
  if (summaryRow) {
    const signalTotalEl = document.getElementById('summarySignalValue');
    const contributionTotalEl = document.getElementById(
      'summaryContributionValue'
    );
    const deltaTotalEl = document.getElementById('summaryDeltaValue');

    if (signalTotalEl) {
      if (currentMode === 'sharpe') {
        signalTotalEl.textContent = Number.isFinite(summarySignalValue)
          ? summarySignalValue.toFixed(2)
          : '--';
      } else if (Number.isFinite(summarySignalValue)) {
        signalTotalEl.textContent = formatPercent(summarySignalValue * 100);
      } else {
        signalTotalEl.textContent = '--';
      }
    }

    if (contributionTotalEl) {
      contributionTotalEl.textContent = formatContributionValue(
        summaryContributionValue,
        currentMode
      );
    }

    if (deltaTotalEl) {
      if (hasSnapshot) {
        const previousTotal =
          typeof snapshot.total === 'number' ? snapshot.total : 0;
        const totalDelta = summaryContributionValue - previousTotal;
        deltaTotalEl.textContent = `Delta ${formatContributionDelta(
          totalDelta,
          currentMode
        )}`;
      } else {
        deltaTotalEl.textContent = 'Delta --';
      }
    }
  }

  updateContributionSnapshot(
    currentMode,
    newSnapshotValues,
    summaryContributionValue
  );
}

function formatRecoveryLabel(input) {
  let months = null;
  let tradingDays = null;
  let calendarDays = null;

  if (input && typeof input === 'object') {
    months = Number.isFinite(input.months) ? input.months : null;
    tradingDays = Number.isFinite(input.tradingDays)
      ? input.tradingDays
      : null;
    calendarDays = Number.isFinite(input.calendarDays)
      ? input.calendarDays
      : null;
  } else if (Number.isFinite(input)) {
    months = input;
  }

  const formatMonthsDisplay = (value, { approx = false } = {}) => {
    if (!Number.isFinite(value) || value <= 0) return null;
    const prefix = approx ? '~' : '';
    if (value < 12) {
      const rounded =
        value >= 10 ? Math.round(value) : Math.round(value * 10) / 10;
      return `${prefix}${rounded}${rounded === 1 ? ' mo' : ' mo'}`;
    }
    const years = value / 12;
    const displayYears =
      years >= 5 ? Math.round(years) : Math.round(years * 10) / 10;
    return `${prefix}${displayYears}${displayYears === 1 ? ' yr' : ' yrs'}`;
  };

  const tradingLabel =
    Number.isFinite(tradingDays) && tradingDays > 0
      ? `${Math.round(tradingDays)} trading days`
      : null;
  const monthsLabel = formatMonthsDisplay(months, {
    approx: Boolean(tradingLabel),
  });
  const calendarLabel =
    Number.isFinite(calendarDays) && calendarDays > 0
      ? `${Math.round(calendarDays)} cal days`
      : null;

  if (tradingLabel) {
    const extras = [monthsLabel, calendarLabel].filter(Boolean);
    if (extras.length) {
      return `${tradingLabel} (${extras.join(' / ')})`;
    }
    return tradingLabel;
  }

  if (monthsLabel) return monthsLabel;
  if (calendarLabel) return calendarLabel.replace('~', '');
  if (Number.isFinite(tradingDays) && tradingDays === 0) return '0 trading days';
  if (Number.isFinite(months) && months === 0) return '0 mo';
  if (Number.isFinite(calendarDays) && calendarDays === 0) return '0 calendar days';
  return ' - ';
}

function describeReturnQuality({ expectedReturn, sortinoRatio, calmarRatio, volatility }) {
  if (!Number.isFinite(expectedReturn)) return 'Unable to gauge return quality without a valid expected return.';

  const expectedLabel = formatPercent(expectedReturn * 100);
  const sortinoLabel = Number.isFinite(sortinoRatio) ? sortinoRatio.toFixed(2) : ' - ';
  const calmarLabel = Number.isFinite(calmarRatio) ? calmarRatio.toFixed(2) : ' - ';
  const volLabel = Number.isFinite(volatility) ? formatPercent(volatility * 100) : ' - ';

  if (Number.isFinite(sortinoRatio) && sortinoRatio >= 1.3 && Number.isFinite(calmarRatio) && calmarRatio >= 0.5) {
    return `Growth is outpacing downside risk: Sortino ${sortinoLabel} and Calmar ${calmarLabel}, with ${expectedLabel} expected return versus ${volLabel} volatility.`;
  }
  if (Number.isFinite(sortinoRatio) && sortinoRatio >= 1.0 && Number.isFinite(calmarRatio) && calmarRatio >= 0.35) {
    return `Return profile is balanced - Sortino ${sortinoLabel} and Calmar ${calmarLabel} show decent protection while aiming for ${expectedLabel} a year.`;
  }
  return `Downside-adjusted efficiency needs work: Sortino ${sortinoLabel} and Calmar ${calmarLabel} suggest the ${expectedLabel} target relies on elevated volatility (${volLabel}).`;
}

function describeResilience({
  maxDrawdown,
  recoveryMonths,
  drawdownDetails,
  cvarLoss,
  varLoss,
  tailRiskDetails,
}) {
  if (!Number.isFinite(maxDrawdown)) {
    return 'No drawdown simulation available to evaluate crash resilience.';
  }
  const drawdownLabel = formatPercent(Math.abs(maxDrawdown) * 100);
  const recoveryLabel = formatRecoveryLabel({
    months: recoveryMonths,
    tradingDays: drawdownDetails?.averageRecoveryTradingDays,
    calendarDays: drawdownDetails?.averageRecoveryCalendarDays,
  });
  const hasRecoveryLabel = recoveryLabel && recoveryLabel !== ' - ';
  const cadencePhrase = hasRecoveryLabel
    ? `recovery cadence of ${recoveryLabel}`
    : 'recovery cadence data unavailable';
  let detailNote = '';

  if (drawdownDetails && typeof drawdownDetails === 'object') {
    const { worstCase, horizonMonths, averageRecoveryMonths } = drawdownDetails;
    const horizonYears =
      Number.isFinite(horizonMonths) && horizonMonths > 0
        ? (horizonMonths / 12).toFixed(1)
        : null;
    if (worstCase && typeof worstCase === 'object') {
      const worstDrop = Number.isFinite(worstCase.maxDrawdown)
        ? formatPercent(Math.abs(worstCase.maxDrawdown) * 100)
        : null;
      const worstDuration =
        Number.isFinite(worstCase.durationMonths) && worstCase.durationMonths > 0
          ? `${worstCase.durationMonths} mo to trough`
          : null;
      const worstRecovery =
        (Number.isFinite(worstCase.recoveryMonths) &&
          worstCase.recoveryMonths > 0) ||
        (Number.isFinite(worstCase.recoveryTradingDays) &&
          worstCase.recoveryTradingDays > 0) ||
        (Number.isFinite(worstCase.recoveryCalendarDays) &&
          worstCase.recoveryCalendarDays > 0)
          ? formatRecoveryLabel({
              months: worstCase.recoveryMonths,
              tradingDays: worstCase.recoveryTradingDays,
              calendarDays: worstCase.recoveryCalendarDays,
            })
          : null;
      const pieces = [];
      if (worstDrop) pieces.push(`worst path fell ${worstDrop}`);
      if (worstDuration) pieces.push(`over ~${worstDuration}`);
      if (worstRecovery && worstRecovery !== ' - ') {
        pieces.push(`and needed ${worstRecovery} to recover`);
      }
      if (pieces.length) {
        detailNote += ` ${pieces.join(', ')}.`;
      }
    } else if (
      Number.isFinite(averageRecoveryMonths) &&
      averageRecoveryMonths > 0
    ) {
        const avgRecoveryLabel = formatRecoveryLabel({
          months: averageRecoveryMonths,
          tradingDays: drawdownDetails.averageRecoveryTradingDays,
          calendarDays: drawdownDetails.averageRecoveryCalendarDays,
        });
      if (avgRecoveryLabel && avgRecoveryLabel !== ' - ') {
        detailNote += ` Average recovery across simulations is ~${avgRecoveryLabel}.`;
      }
    }
    if (horizonYears) {
      detailNote += ` Horizon assumes ${horizonYears} years of monthly observations.`;
    }
  }

  const recoveryWindow = hasRecoveryLabel ? recoveryLabel : null;
  const confidenceLevel =
    tailRiskDetails && Number.isFinite(tailRiskDetails.confidenceLevel)
      ? tailRiskDetails.confidenceLevel
      : 0.95;
  const cvarLabel = Number.isFinite(cvarLoss)
    ? formatPercent(Math.abs(cvarLoss) * 100)
    : null;
  const varLabel = Number.isFinite(varLoss)
    ? formatPercent(Math.abs(varLoss) * 100)
    : null;
  const tailConfidenceLabel = `${Math.round(confidenceLevel * 100)}%`;
  const tailNote =
    cvarLabel && varLabel
      ? ` Tail risk at ${tailConfidenceLabel}: CVaR ${cvarLabel}, VaR ${varLabel}.`
      : cvarLabel
      ? ` Tail risk at ${tailConfidenceLabel}: CVaR ${cvarLabel}.`
      : '';

  if (maxDrawdown <= 0.2) {
    return `Simulated max drawdown holds to ${drawdownLabel}; ${cadencePhrase} keeps capital resilient.${tailNote}${detailNote}`;
  }
  if (maxDrawdown <= 0.35) {
    return hasRecoveryLabel
      ? `Expect about ${drawdownLabel} drawdowns with ${recoveryWindow} recovery window - maintain cash buffers for that stress.${tailNote}${detailNote}`
      : `Expect about ${drawdownLabel} drawdowns; recovery timing data is unavailable - maintain cash buffers for that stress.${tailNote}${detailNote}`;
  }
  return hasRecoveryLabel
    ? `Drawdowns could reach ${drawdownLabel} and stay underwater for roughly ${recoveryWindow}; consider rebalancing or hedges to boost resilience.${tailNote}${detailNote}`
    : `Drawdowns could reach ${drawdownLabel}; recovery timing is unclear, so consider rebalancing or hedges to boost resilience.${tailNote}${detailNote}`;
}

function describeEfficiency({
  alpha,
  expenseRatio,
  upCaptureRatio,
  downCaptureRatio,
  trackingError,
  informationRatio,
  activeReturn,
}) {
  const expenseLabel = Number.isFinite(expenseRatio) ? formatPercent(expenseRatio * 100) : ' - ';
  const alphaPercent = Number.isFinite(alpha) ? alpha * 100 : null;
  let notes = '';
  if (Number.isFinite(upCaptureRatio) && Number.isFinite(downCaptureRatio)) {
    const upLabel = formatPercent(upCaptureRatio * 100);
    const downLabel = formatPercent(downCaptureRatio * 100);
    const spread = (upCaptureRatio - downCaptureRatio) * 100;
    const spreadLabel = Number.isFinite(spread) ? `${spread.toFixed(1)} pts` : null;
    if (spread >= 15) {
      notes += ` Capture asymmetry (${upLabel} up / ${downLabel} down${spreadLabel ? `, spread ${spreadLabel}` : ''}) shows rallies are compounding faster than selloffs.`;
    } else if (spread >= 0) {
      notes += ` Capture mix (${upLabel} up / ${downLabel} down${spreadLabel ? `, spread ${spreadLabel}` : ''}) leans positive; keep the edge intact.`;
    } else {
      notes += ` Capture mix (${upLabel} up / ${downLabel} down${spreadLabel ? `, spread ${spreadLabel}` : ''}) now skews defensive; confirm that tilt is intentional.`;
    }
  }
  if (Number.isFinite(trackingError)) {
    const tePct = formatPercent(trackingError * 100);
    if (trackingError <= 0.04) {
      notes += ` Tracking error ${tePct} keeps active risk tight versus the benchmark.`;
    } else if (trackingError <= 0.08) {
      notes += ` Tracking error ${tePct} sits in a balanced range; ensure it matches mandate.`;
    } else {
      notes += ` Tracking error ${tePct} is elevated; verify active bets justify the risk.`;
    }
  }
  if (Number.isFinite(informationRatio)) {
    const irLabel = informationRatio.toFixed(2);
    if (informationRatio >= 0.75) {
      notes += ` IR ${irLabel} signals strong skill per unit of active risk.`;
    } else if (informationRatio >= 0.4) {
      notes += ` IR ${irLabel} is competitive; keep compounding the edge.`;
    } else if (informationRatio >= 0) {
      notes += ` IR ${irLabel} is modest; tighten execution or reduce noise.`;
    } else {
      notes += ` IR ${irLabel} negative; active bets are not paying off.`;
    }
  }
  if (Number.isFinite(activeReturn)) {
    const diffLabel = formatPercent(activeReturn * 100);
    notes += ` Active return ${diffLabel} annualised.`;
  }

  if (alphaPercent !== null && alphaPercent > 1 && Number.isFinite(expenseRatio) && expenseRatio <= 0.003) {
    return `Cost discipline (${expenseLabel}) plus ${alphaPercent.toFixed(1)}% alpha indicates the portfolio is compounding efficiently versus the benchmark.${notes}`;
  }
  if (alphaPercent !== null && alphaPercent >= 0 && Number.isFinite(expenseRatio) && expenseRatio <= 0.004) {
    return `Fees stay moderate at ${expenseLabel}; keep nudging alpha above zero (${alphaPercent.toFixed(1)}%) to justify the risk budget.${notes}`;
  }
  if (alphaPercent !== null && alphaPercent < 0) {
    return `Current alpha of ${alphaPercent.toFixed(1)}% trails the market; review sleeve tilts or execution costs (fees at ${expenseLabel}) to close the gap.${notes}`;
  }
  return `Monitor cost drag (${expenseLabel}) and risk-adjusted skill to confirm the strategy stays competitive.${notes}`;
}

function updateAnalyticsNarrative(metrics) {
  const container = document.getElementById('analyticsNarrative');
  if (!container) return;

  if (!metrics || typeof metrics !== 'object') {
    container.innerHTML = `<p class="italic text-gray-500 dark:text-gray-400">Analytics narrative unavailable.</p>`;
    return;
  }

  const points = [
    describeReturnQuality(metrics),
    describeResilience(metrics),
    describeEfficiency(metrics),
  ];

  container.innerHTML = `
    <ul class="list-disc list-inside space-y-2 marker:text-emerald-500">
      ${points.map((text) => `<li>${text}</li>`).join('')}
    </ul>
  `;
}

const METRIC_TONE_CLASSES = {
  excellent: 'text-emerald-500',
  strong: 'text-teal-500',
  balanced: 'text-amber-500',
  watch: 'text-orange-500',
  negative: 'text-rose-500',
  neutral: 'text-gray-500',
};

function updateMetricBreakdown(metrics) {
  const toneClasses = Object.values(METRIC_TONE_CLASSES);
  const hasMetrics = metrics && typeof metrics === 'object';

  const metricDefinitions = [
    {
      id: 'expectedReturnDiagnostic',
      value: (m) => m.expectedReturn,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide expected returns for each asset.' };
        }
        const riskFreeRate =
          metrics && Number.isFinite(metrics.riskFreeRate)
            ? metrics.riskFreeRate
            : DEFAULT_RISK_FREE_RATE;
        const marketReturn =
          metrics && Number.isFinite(metrics.marketReturn)
            ? metrics.marketReturn
            : DEFAULT_BENCHMARK_RETURN;
        const equityPremium =
          metrics && Number.isFinite(metrics.equityRiskPremium)
            ? metrics.equityRiskPremium
            : Math.max(0, marketReturn - riskFreeRate);
        const riskFreeLabel = Number.isFinite(riskFreeRate)
          ? formatPercent(riskFreeRate * 100)
          : '--';
        const equityPremiumLabel = Number.isFinite(equityPremium)
          ? formatPercent(equityPremium * 100)
          : '--';
        const capmNote =
          riskFreeLabel !== '--' && equityPremiumLabel !== '--'
            ? `CAPM baseline uses ${riskFreeLabel} + beta * ${equityPremiumLabel}.`
            : 'CAPM baseline applied to align return assumptions with market risk.';
        if (v >= 0.12) {
          return {
            status: 'High growth',
            tone: 'excellent',
            message: `${formatted} suits an aggressive growth strategy with a long runway. ${capmNote}`,
          };
        }
        if (v >= 0.08) {
          return {
            status: 'On track',
            tone: 'strong',
            message: `${formatted} aligns with the balanced growth objective for this Roth IRA. ${capmNote}`,
          };
        }
        if (v >= 0.06) {
          return {
            status: 'Stable',
            tone: 'balanced',
            message: `${formatted} is steady, but consider adding more growth tilt if expectations are higher. ${capmNote}`,
          };
        }
        return {
          status: 'Below goal',
          tone: 'negative',
          message: `${formatted} may undershoot long-term goals; revisit assumptions and allocation. ${capmNote}`,
        };
      },
    },
    {
      id: 'volatilityDiagnostic',
      value: (m) => m.volatility,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide volatility data for each asset.' };
        }
        const weightSum =
          metrics && Number.isFinite(metrics.weightSum)
            ? metrics.weightSum.toFixed(2)
            : null;
        const matrixNote = `Sigma computed as sqrt(w^T Sigma w) with the normalized weight vector${
          weightSum ? ` (sum ~ ${weightSum})` : ''
        } and the annualized covariance matrix.`;
        if (v <= 0.15) {
          return {
            status: 'Low',
            tone: 'excellent',
            message: `${formatted} keeps drawdown risk in a comfortable range. ${matrixNote}`,
          };
        }
        if (v <= 0.22) {
          return {
            status: 'Moderate',
            tone: 'balanced',
            message: `${formatted} suits the target balance between growth and defense. ${matrixNote}`,
          };
        }
        return {
          status: 'Elevated',
          tone: 'watch',
          message: `${formatted} signals larger swings; make sure return assumptions justify the risk and the covariance inputs use a consistent frequency. ${matrixNote}`,
        };
      },
    },
    {
      id: 'sharpeDiagnostic',
      value: (m) => m.sharpeRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need expected returns and volatility to compute Sharpe.' };
        }
        const rfLabel =
          metrics && Number.isFinite(metrics.riskFreeRate)
            ? formatPercent(metrics.riskFreeRate * 100)
            : '--';
        const excessLabel =
          metrics && Number.isFinite(metrics.excessReturn)
            ? formatPercent(metrics.excessReturn * 100)
            : null;
        const baseNote = excessLabel
          ? `Sharpe uses (E[R] - Rf) / sigma with excess return ${excessLabel} vs risk-free ${rfLabel}.`
          : `Sharpe uses (E[R] - Rf) / sigma with Rf ${rfLabel}; keep return and risk inputs on the same frequency.`;
        if (v >= 1.2) {
          return {
            status: 'Highly efficient',
            tone: 'excellent',
            message: `Sharpe ${formatted} shows the portfolio is well compensated after accounting for risk. ${baseNote}`,
          };
        }
        if (v >= 0.8) {
          return {
            status: 'Efficient',
            tone: 'strong',
            message: `Sharpe ${formatted} suits a diversified equity portfolio. ${baseNote}`,
          };
        }
        if (v >= 0.35) {
          return {
            status: 'Fair',
            tone: 'balanced',
            message: `Sharpe ${formatted} shows return versus risk remains acceptable. ${baseNote}`,
          };
        }
        return {
          status: 'Needs improvement',
          tone: 'watch',
          message: `Sharpe ${formatted} is low; rebalance the trade-off between growth and stability or verify the risk-free rate frequency. ${baseNote}`,
        };
      },
    },
    {
      id: 'betaDiagnostic',
      value: (m) => m.beta,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Assign market beta estimates to each asset.' };
        }
        const contributions =
          metrics && typeof metrics.betaContributions === 'object'
            ? metrics.betaContributions
            : null;
        const weightsForBeta =
          metrics && typeof metrics.betaWeights === 'object'
            ? metrics.betaWeights
            : null;
        let driverNote = 'Beta blends each sleeve\'s beta via the weighted sum Σ w_i β_i against the policy benchmark.';
        if (contributions) {
          const topDriver = Object.entries(contributions).reduce(
            (best, [key, value]) => {
              const magnitude = Math.abs(Number(value) || 0);
              if (!best || magnitude > best.magnitude) {
                return { key, value: Number(value) || 0, magnitude };
              }
              return best;
            },
            null
          );
          if (topDriver && topDriver.magnitude > 0) {
            const weight = weightsForBeta ? weightsForBeta[topDriver.key] || 0 : 0;
            const assetBeta = portfolioAssetBetas[topDriver.key] ?? null;
            const weightLabel = formatPercent((weight || 0) * 100);
            const assetBetaLabel = Number.isFinite(assetBeta)
              ? assetBeta.toFixed(2)
              : '--';
            const contributionLabel = topDriver.value.toFixed(2);
            driverNote = `Dominant driver: ${topDriver.key} contributes ${contributionLabel} to portfolio beta (weight ${weightLabel}, beta ${assetBetaLabel}).`;
          }
        }
        if (v < 0.9) {
          return {
            status: 'Defensive',
            tone: 'excellent',
            message: `Beta ${formatted} helps dampen market volatility for the portfolio. ${driverNote}`,
          };
        }
        if (v <= 1.1) {
          return {
            status: 'Market-like',
            tone: 'strong',
            message: `Beta ${formatted} keeps the portfolio moving with the benchmark. ${driverNote}`,
          };
        }
        if (v <= 1.3) {
          return {
            status: 'Somewhat aggressive',
            tone: 'watch',
            message: `Beta ${formatted} makes the portfolio more sensitive than the market; only maintain if you accept higher risk. ${driverNote}`,
          };
        }
        return {
          status: 'Highly sensitive',
          tone: 'negative',
          message: `Beta ${formatted} is too high; reassess high-beta allocations or trim the biggest contributors. ${driverNote}`,
        };
      },
    },
    {
      id: 'portfolioScoreDiagnostic',
      value: (m) => m.portfolioScore,
      format: (v) => (Number.isFinite(v) ? v.toFixed(1) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need both risk and return data to score.' };
        }
        if (v >= 8.5) {
          return { status: 'Excellent', tone: 'excellent', message: 'Score ' + formatted + ' shows the portfolio is optimised extremely well.' };
        }
        if (v >= 7) {
          return { status: 'Strong', tone: 'strong', message: 'Score ' + formatted + ' strong; only minor tuning needed to improve quality further.' };
        }
        if (v >= 6) {
          return { status: 'OK', tone: 'balanced', message: 'Score ' + formatted + ' acceptable, but review weaker sleeves for improvements.' };
        }
        return { status: 'Action needed', tone: 'negative', message: 'Score ' + formatted + ' flags multiple issues; revisit allocation and planning assumptions.' };
      },
    },
    {
      id: 'diversityDiagnostic',
      value: (m) => m.diversityIndex,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Define target weights to assess diversification.' };
        }
        const details =
          metrics && metrics.diversityDetails && typeof metrics.diversityDetails === 'object'
            ? metrics.diversityDetails
            : null;
        const effectiveHoldings = details && Number.isFinite(details.effectiveHoldings)
          ? details.effectiveHoldings
          : null;
        const diversityQuick = details && Number.isFinite(details.diversityQuick)
          ? details.diversityQuick
          : null;
        const corrScore = details && Number.isFinite(details.diversityCorr)
          ? details.diversityCorr
          : null;
        const assetCount = details && Number.isFinite(details.assetCount) ? details.assetCount : null;

        const holdingsLabel = effectiveHoldings
          ? `${effectiveHoldings.toFixed(1)} effective positions`
          : null;
        const quickLabel =
          diversityQuick !== null ? `weight-only index ${formatPercent(diversityQuick * 100)}` : null;
        const corrLabel =
          corrScore !== null ? `correlation-adjusted index ${formatPercent(corrScore * 100)}` : null;

        const noteParts = [];
        if (holdingsLabel) noteParts.push(holdingsLabel);
        if (quickLabel) noteParts.push(quickLabel);
        if (corrLabel) noteParts.push(corrLabel);
        const diversityNote = noteParts.length ? ` (${noteParts.join(', ')})` : '';

        if (v >= 0.75) {
          return {
            status: 'Highly diversified',
            tone: 'excellent',
            message: `${formatted} shows allocation is even with low concentration risk${diversityNote}.`,
          };
        }
        if (v >= 0.6) {
          return {
            status: 'Balanced',
            tone: 'strong',
            message: `${formatted} is solid; continue monitoring overweight sleeves${diversityNote}.`,
          };
        }
        if (v >= 0.45) {
          return {
            status: 'Some concentration',
            tone: 'watch',
            message: `${formatted} signals a few sleeves dominate exposure; verify that tilt${diversityNote}.`,
          };
        }
        return {
          status: 'Highly concentrated',
          tone: 'negative',
          message: `${formatted} flags concentration risk; broaden the mix or rebalance${diversityNote}.`,
        };
      },
    },
    {
      id: 'sortinoDiagnostic',
      value: (m) => m.sortinoRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need expected returns and downside deviation to compute Sortino.' };
        }
        const riskFreeRate =
          metrics && Number.isFinite(metrics.riskFreeRate)
            ? metrics.riskFreeRate
            : DEFAULT_RISK_FREE_RATE;
        const downsideDeviation =
          metrics && metrics.sortinoDetails && Number.isFinite(metrics.sortinoDetails.downsideDeviation)
            ? metrics.sortinoDetails.downsideDeviation
            : null;
        const excessLabel =
          metrics && Number.isFinite(metrics.excessReturn)
            ? formatPercent(metrics.excessReturn * 100)
            : null;
        const targetLabel = formatPercent(riskFreeRate * 100);
        const deviationLabel = downsideDeviation !== null ? formatPercent(downsideDeviation * 100) : null;
        const baseNote = excessLabel
          ? `Sortino compares excess return ${excessLabel} to downside deviation${deviationLabel ? ` ${deviationLabel}` : ''} using target ${targetLabel}.`
          : `Sortino compares return to downside deviation${deviationLabel ? ` ${deviationLabel}` : ''} using target ${targetLabel}.`;
        if (v >= 1.3) {
          return {
            status: 'Strong protection',
            tone: 'excellent',
            message: `Sortino ${formatted} shows returns more than compensate for downside risk. ${baseNote}`,
          };
        }
        if (v >= 1.0) {
          return {
            status: 'OK',
            tone: 'strong',
            message: `Sortino ${formatted} at a healthy level; losses are compensated appropriately. ${baseNote}`,
          };
        }
        if (v >= 0.7) {
          return {
            status: 'Monitor',
            tone: 'watch',
            message: `Sortino ${formatted} acceptable; smooth volatility or add higher-quality sleeves. ${baseNote}`,
          };
        }
        return {
          status: 'Inefficient',
          tone: 'negative',
          message: `Sortino ${formatted} shows downside risk is eroding return efficiency; reduce drawdown exposure or lift target returns. ${baseNote}`,
        };
      },
    },
    {
      id: 'maxDrawdownDiagnostic',
      value: (m) => m.maxDrawdown,
      format: (v) => (Number.isFinite(v) ? formatPercent(Math.abs(v) * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need volatility data to simulate drawdown.' };
        }
        const recoveryLabel = formatRecoveryLabel({
          months:
            metrics && Number.isFinite(metrics.recoveryMonths)
              ? metrics.recoveryMonths
              : null,
          tradingDays:
            metrics && metrics.drawdownDetails
              ? metrics.drawdownDetails.averageRecoveryTradingDays
              : null,
          calendarDays:
            metrics && metrics.drawdownDetails
              ? metrics.drawdownDetails.averageRecoveryCalendarDays
              : null,
        });
        const details =
          metrics && metrics.drawdownDetails && typeof metrics.drawdownDetails === 'object'
            ? metrics.drawdownDetails
            : null;
        let detailNote = '';
        if (details) {
          const worst = details.worstCase;
          if (worst && typeof worst === 'object') {
            const worstDrop = Number.isFinite(worst.maxDrawdown)
              ? formatPercent(Math.abs(worst.maxDrawdown) * 100)
              : null;
            const duration =
              Number.isFinite(worst.durationMonths) && worst.durationMonths > 0
                ? `${worst.durationMonths} mo to trough`
                : null;
            const worstRecovery =
              (Number.isFinite(worst.recoveryMonths) &&
                worst.recoveryMonths > 0) ||
              (Number.isFinite(worst.recoveryTradingDays) &&
                worst.recoveryTradingDays > 0) ||
              (Number.isFinite(worst.recoveryCalendarDays) &&
                worst.recoveryCalendarDays > 0)
                ? formatRecoveryLabel({
                    months: worst.recoveryMonths,
                    tradingDays: worst.recoveryTradingDays,
                    calendarDays: worst.recoveryCalendarDays,
                  })
                : null;
            const parts = [];
            if (worstDrop) parts.push(`worst path saw ${worstDrop}`);
            if (duration) parts.push(duration);
            if (worstRecovery && worstRecovery !== ' - ') {
              parts.push(`recovery ${worstRecovery}`);
            }
            if (parts.length) {
              detailNote += ` (${parts.join(', ')})`;
            }
          } else if (
            Number.isFinite(details.averageRecoveryMonths) &&
            details.averageRecoveryMonths > 0
          ) {
            detailNote += ` (avg recovery ~${formatRecoveryLabel({
              months: details.averageRecoveryMonths,
              tradingDays: details.averageRecoveryTradingDays,
              calendarDays: details.averageRecoveryCalendarDays,
            })})`;
          }
        }
        if (v <= 0.2) {
          return {
            status: 'Very resilient',
            tone: 'excellent',
            message: `${formatted} remains within the tolerance of most investors${detailNote}.`,
          };
        }
        if (v <= 0.35) {
          return {
            status: 'Acceptable',
            tone: 'balanced',
            message: `${formatted} demands discipline; confirm the plan accounts for this scenario${detailNote}.`,
          };
        }
        return {
          status: 'Very deep',
          tone: 'negative',
          message: `${formatted} flags a severe shock; revisit allocation or hedging plans${detailNote}.`,
        };
      },
    },
    {
      id: 'calmarDiagnostic',
      value: (m) => m.calmarRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Calmar requires both expected return and drawdown estimates.' };
        }
        const expectedReturn =
          metrics && Number.isFinite(metrics.expectedReturn) ? metrics.expectedReturn : null;
        const maxDrawdownValue =
          metrics && Number.isFinite(metrics.maxDrawdown) ? metrics.maxDrawdown : null;
        const drawdownDetails =
          metrics && metrics.drawdownDetails && typeof metrics.drawdownDetails === 'object'
            ? metrics.drawdownDetails
            : null;
        const returnLabel = expectedReturn !== null ? formatPercent(expectedReturn * 100) : '--';
        const drawdownLabel =
          maxDrawdownValue !== null ? formatPercent(Math.abs(maxDrawdownValue) * 100) : '--';
        const horizonLabel =
          drawdownDetails && Number.isFinite(drawdownDetails.horizonMonths) && drawdownDetails.horizonMonths > 0
            ? `${(drawdownDetails.horizonMonths / 12).toFixed(1)}y`
            : null;
        let baseNote = `Calmar divides ${returnLabel} by ${drawdownLabel} using the same simulation window`;
        if (horizonLabel) {
          baseNote += ` (~${horizonLabel})`;
        }
        baseNote += '.';

        if (maxDrawdownValue !== null && Math.abs(maxDrawdownValue) < 1e-6) {
          return {
            status: 'No drawdown',
            tone: 'excellent',
            message: `No material drawdown observed; Calmar is effectively unbounded. ${baseNote}`,
          };
        }

        if (v >= 0.5) {
          return {
            status: 'High quality',
            tone: 'excellent',
            message: `Calmar ${formatted} shows each 1% drawdown is backed by at least 0.5% annual return. ${baseNote}`,
          };
        }
        if (v >= 0.3) {
          return {
            status: 'Balanced',
            tone: 'strong',
            message: `Calmar ${formatted} is reasonable; seek slightly higher returns or lower drawdowns to improve. ${baseNote}`,
          };
        }
        if (v >= 0.15) {
          return {
            status: 'Monitor',
            tone: 'watch',
            message: `Calmar ${formatted} shows the portfolio is under heavy drawdown; tighten risk controls. ${baseNote}`,
          };
        }
        return {
          status: 'Unattractive',
          tone: 'negative',
          message: `Calmar ${formatted} means drawdowns outpace returns; revisit assumptions and hedging. ${baseNote}`,
        };
      },
    },
    {
      id: 'alphaDiagnostic',
      value: (m) => m.alpha,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need return assumptions and beta to compute alpha.' };
        }
        const expectedReturn =
          metrics && Number.isFinite(metrics.expectedReturn) ? metrics.expectedReturn : null;
        const marketReturn =
          metrics && Number.isFinite(metrics.marketReturn) ? metrics.marketReturn : DEFAULT_BENCHMARK_RETURN;
        const riskFreeRate =
          metrics && Number.isFinite(metrics.riskFreeRate) ? metrics.riskFreeRate : DEFAULT_RISK_FREE_RATE;
        const betaValue =
          metrics && Number.isFinite(metrics.beta) ? metrics.beta : null;
        const marketExcess = marketReturn - riskFreeRate;
        const expectedLabel = expectedReturn !== null ? formatPercent(expectedReturn * 100) : '--';
        const marketLabel = formatPercent(marketReturn * 100);
        const rfLabel = formatPercent(riskFreeRate * 100);
        const betaLabel = betaValue !== null ? betaValue.toFixed(2) : 'β';
        const baseNote = `Computed as ${expectedLabel} - ${rfLabel} - ${betaLabel} × (${marketLabel} - ${rfLabel}).`;

        if (v >= 0.015) {
          return {
            status: 'Outperforming',
            tone: 'excellent',
            message: `Alpha ${formatted} shows the portfolio is beating the benchmark after adjusting for risk. ${baseNote}`,
          };
        }
        if (v >= 0.005) {
          return {
            status: 'Positive',
            tone: 'strong',
            message: `Alpha ${formatted} is small but still adds value versus the market. ${baseNote}`,
          };
        }
        if (v >= -0.005) {
          return {
            status: 'Inline with market',
            tone: 'balanced',
            message: `Alpha ${formatted} sits near zero; focus on costs and diversification to improve. ${baseNote}`,
          };
        }
        return {
          status: 'Lagging the benchmark',
          tone: 'negative',
          message: `Alpha ${formatted} trails the benchmark; review tilts and trading costs. ${baseNote}`,
        };
      },
    },
    {
      id: 'captureDiagnostic',
      value: (m) => ({
        up: Number.isFinite(m.upCaptureRatio) ? m.upCaptureRatio : null,
        down: Number.isFinite(m.downCaptureRatio) ? m.downCaptureRatio : null,
        details:
          m && m.captureDetails && typeof m.captureDetails === 'object'
            ? m.captureDetails
            : null,
      }),
      format: (data) => {
        if (!data || data.up === null || data.down === null) {
          return '--';
        }
        const upLabel = formatPercent(data.up * 100);
        const downLabel = formatPercent(data.down * 100);
        return `${upLabel} / ${downLabel}`;
      },
      evaluate: (data, metrics, formatted) => {
        const details =
          (data && data.details) ||
          (metrics &&
            metrics.captureDetails &&
            typeof metrics.captureDetails === 'object'
              ? metrics.captureDetails
              : null);
        if (!data || data.up === null || data.down === null) {
          return {
            status: 'Data missing',
            tone: 'neutral',
            message:
              'Need portfolio and benchmark return assumptions to estimate capture ratios.',
          };
        }
        const upPct = data.up * 100;
        const downPct = data.down * 100;
        const spread = upPct - downPct;
        const spreadLabel = Number.isFinite(spread) ? `${spread.toFixed(1)} pts` : null;
        const spreadText = spreadLabel ? `spread ${spreadLabel}` : 'spread n/a';
        const sampleNote =
          details &&
          Number.isFinite(details.upPeriods) &&
          Number.isFinite(details.downPeriods)
            ? ` (samples: up ${details.upPeriods}, down ${details.downPeriods})`
            : '';
        if (upPct >= 115 && downPct <= 85) {
          return {
            status: 'Asymmetry favors you',
            tone: 'excellent',
            message: `${formatted} capture with ${spreadText} shows rallies contribute far more than selloffs${sampleNote}.`,
          };
        }
        if (upPct >= 105 && downPct <= 95) {
          return {
            status: 'Favorable balance',
            tone: 'strong',
            message: `${formatted} capture keeps upside ahead of downside (${spreadText})${sampleNote}.`,
          };
        }
        if (upPct >= 95 && downPct <= 105) {
          return {
            status: 'Neutral symmetry',
            tone: 'balanced',
            message: `${formatted} capture is roughly market-like (${spreadText}); fine-tune tilts to build an edge${sampleNote}.`,
          };
        }
        if (upPct < 90 && downPct > 110) {
          return {
            status: 'Unfavorable asymmetry',
            tone: 'negative',
            message: `${formatted} capture reverses the edge (${spreadText}); losses are outrunning gains${sampleNote}.`,
          };
        }
        return {
          status: 'Watch asymmetry',
          tone: 'watch',
          message: `${formatted} capture mix is drifting (${spreadText}); recalibrate sleeve weights to regain a positive spread${sampleNote}.`,
        };
      },
    },
    {
      id: 'multiFactorDiagnostic',
      value: (m) => ({
        rSquared: Number.isFinite(m.multiFactorRSquared) ? m.multiFactorRSquared : null,
        exposures:
          m && m.multiFactorExposures && typeof m.multiFactorExposures === 'object'
            ? m.multiFactorExposures
            : null,
        factorNames:
          m && Array.isArray(m.multiFactorFactorNames) ? m.multiFactorFactorNames : null,
      }),
      format: (data) =>
        data && Number.isFinite(data.rSquared) ? formatPercent(data.rSquared * 100) : '--',
      evaluate: (data, _metrics, formatted) => {
        if (!data || !Number.isFinite(data.rSquared)) {
          return {
            status: 'Data missing',
            tone: 'neutral',
            message: 'Need factor exposures and covariance estimates to compute regression fit.',
          };
        }
        const factorNames = Array.isArray(data.factorNames) ? data.factorNames : [];
        const exposures = data.exposures && typeof data.exposures === 'object' ? data.exposures : {};
        let topFactor = null;
        factorNames.forEach((factor) => {
          const value = exposures && Number.isFinite(exposures[factor]) ? exposures[factor] : null;
          if (value === null) return;
          const magnitude = Math.abs(value);
          if (!topFactor || magnitude > topFactor.magnitude) {
            topFactor = { factor, value, magnitude };
          }
        });
        if (!topFactor) {
          const entries = Object.entries(exposures || {});
          entries.forEach(([factor, value]) => {
            if (!Number.isFinite(value)) return;
            const magnitude = Math.abs(value);
            if (!topFactor || magnitude > topFactor.magnitude) {
              topFactor = { factor, value, magnitude };
            }
          });
        }
        const driverNote =
          topFactor && Number.isFinite(topFactor.value)
            ? ` Primary driver: ${topFactor.factor} β ${topFactor.value.toFixed(2)}.`
            : '';
        const rSquared = data.rSquared;
        if (rSquared >= 0.7) {
          return {
            status: 'Well explained',
            tone: 'excellent',
            message: `R² ${formatted} shows factor exposures capture most portfolio variance.${driverNote}`,
          };
        }
        if (rSquared >= 0.5) {
          return {
            status: 'Aligned',
            tone: 'strong',
            message: `R² ${formatted} indicates a solid factor model fit.${driverNote}`,
          };
        }
        if (rSquared >= 0.3) {
          return {
            status: 'Partial fit',
            tone: 'watch',
            message: `R² ${formatted} leaves notable idiosyncratic risk; consider additional factors or shorter windows.${driverNote}`,
          };
        }
        return {
          status: 'Weak fit',
          tone: 'negative',
          message: `R² ${formatted} suggests factors explain little of the variance; reassess exposures or factor mix.${driverNote}`,
        };
      },
    },
    {
      id: 'trackingErrorDiagnostic',
      value: (m) => ({
        trackingError: Number.isFinite(m.trackingError) ? m.trackingError : null,
        informationRatio: Number.isFinite(m.informationRatio) ? m.informationRatio : null,
        activeReturn: Number.isFinite(m.activeReturn) ? m.activeReturn : null,
      }),
      format: (data) =>
        data && Number.isFinite(data.trackingError)
          ? formatPercent(data.trackingError * 100)
          : '--',
      evaluate: (data, _metrics, formatted) => {
        if (!data || !Number.isFinite(data.trackingError)) {
          return {
            status: 'Data missing',
            tone: 'neutral',
            message: 'Need portfolio variance, beta, and benchmark volatility to estimate tracking error.',
          };
        }
        const ir = Number.isFinite(data.informationRatio) ? data.informationRatio : null;
        const activeReturn = Number.isFinite(data.activeReturn) ? data.activeReturn : null;
        let tone = 'strong';
        let status = 'Active risk aligned';
        let message = `Tracking error ${formatted} keeps risk relative to the benchmark in check.`;
        if (data.trackingError <= 0.04) {
          tone = 'excellent';
          status = 'Tightly managed';
          message = `Tracking error ${formatted} indicates a benchmark-hugging sleeve.`;
        } else if (data.trackingError <= 0.08) {
          tone = 'balanced';
          status = 'Moderate drift';
          message = `Tracking error ${formatted} reflects meaningful but controlled active bets.`;
        } else if (data.trackingError <= 0.12) {
          tone = 'watch';
          status = 'High drift';
          message = `Tracking error ${formatted} is elevated; confirm mandate allows this active risk.`;
        } else {
          tone = 'negative';
          status = 'Extreme drift';
          message = `Tracking error ${formatted} far exceeds typical mandates; review exposures.`;
        }
        if (ir !== null) {
          const irLabel = ir.toFixed(2);
          const irNote =
            ir >= 0.75
              ? ` IR ${irLabel} shows strong skill per unit of tracking error.`
              : ir >= 0.4
              ? ` IR ${irLabel} is solid; maintain discipline.`
              : ir >= 0
              ? ` IR ${irLabel} is modest; sharpen active positions.`
              : ` IR ${irLabel} negative; active bets are lagging.`;
          message += irNote;
        }
        if (activeReturn !== null) {
          message += ` Active return ${formatPercent(activeReturn * 100)}.`;
        }
        return { status, tone, message };
      },
    },
    {
      id: 'cvarDiagnostic',
      value: (m) => ({
        cvar: Number.isFinite(m.cvarLoss) ? m.cvarLoss : null,
        var: Number.isFinite(m.varLoss) ? m.varLoss : null,
        tailRiskDetails:
          m && typeof m.tailRiskDetails === 'object' ? m.tailRiskDetails : null,
      }),
      format: (data) =>
        data && Number.isFinite(data.cvar)
          ? formatPercent(Math.abs(data.cvar) * 100)
          : '--',
      evaluate: (data) => {
        if (!data || !Number.isFinite(data.cvar)) {
          return {
            status: 'Data missing',
            tone: 'neutral',
            message: 'Need volatility assumptions to simulate CVaR.',
          };
        }
        const confidence =
          data.tailRiskDetails && Number.isFinite(data.tailRiskDetails.confidenceLevel)
            ? data.tailRiskDetails.confidenceLevel
            : 0.95;
        const confidenceLabel = `${Math.round(confidence * 100)}%`;
        const cvarPct = Math.abs(data.cvar) * 100;
        const varPct = Number.isFinite(data.var) ? Math.abs(data.var) * 100 : null;
        const varNote =
          varPct !== null ? ` VaR ${formatPercent(varPct)} accompanies this tail estimate.` : '';
        if (cvarPct <= 6) {
          return {
            status: 'Contained tail risk',
            tone: 'excellent',
            message: `CVaR(${confidenceLabel}) ${formatPercent(cvarPct)} keeps worst-case losses manageable.${varNote}`,
          };
        }
        if (cvarPct <= 10) {
          return {
            status: 'Moderate tail risk',
            tone: 'balanced',
            message: `CVaR(${confidenceLabel}) ${formatPercent(cvarPct)} is acceptable; monitor leverage and hedges.${varNote}`,
          };
        }
        if (cvarPct <= 15) {
          return {
            status: 'Elevated tail risk',
            tone: 'watch',
            message: `CVaR(${confidenceLabel}) ${formatPercent(cvarPct)} signals heavy downside; tighten risk controls.${varNote}`,
          };
        }
        return {
          status: 'Extreme tail risk',
          tone: 'negative',
          message: `CVaR(${confidenceLabel}) ${formatPercent(cvarPct)} implies large tail losses; reassess allocation and stress hedges.${varNote}`,
        };
      },
    },
    {
      id: 'expenseDiagnostic',
      value: (m) => m.expenseRatio,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide expense ratios for each holding.' };
        }
        const details =
          metrics && metrics.expenseDetails && typeof metrics.expenseDetails === 'object'
            ? metrics.expenseDetails
            : null;
        const weights =
          details && details.normalizedWeights && typeof details.normalizedWeights === 'object'
            ? details.normalizedWeights
            : null;
        const contributions =
          details && details.contributions && typeof details.contributions === 'object'
            ? details.contributions
            : null;
        let costNote = 'Weighted expense equals the sum of weight × expense ratio across holdings.';
        if (contributions) {
          const top = Object.entries(contributions).reduce(
            (best, [key, value]) => {
              const amount = Number(value) || 0;
              if (!best || amount > best.amount) {
                return { key, amount };
              }
              return best;
            },
            null
          );
          if (top && top.amount > 0) {
            const weight = weights && Number.isFinite(weights[top.key]) ? weights[top.key] : null;
            const ratio = Number.isFinite(portfolioExpenseRatios[top.key])
              ? portfolioExpenseRatios[top.key]
              : null;
            const weightLabel = weight !== null ? formatPercent(weight * 100) : '--';
            const ratioLabel = ratio !== null ? formatPercent(ratio * 100) : '--';
            const contributionLabel = formatPercent(top.amount * 100);
            costNote += ` Top contributor: ${top.key} adds ${contributionLabel} (weight ${weightLabel}, ER ${ratioLabel}).`;
          }
        }
        if (v <= 0.002) {
          return {
            status: 'Ultra low cost',
            tone: 'excellent',
            message: `${formatted} helps compounding, which is ideal for a Roth IRA. ${costNote}`,
          };
        }
        if (v <= 0.004) {
          return {
            status: 'Efficient',
            tone: 'strong',
            message: `${formatted} still competitive; continue policing active fund fees. ${costNote}`,
          };
        }
        if (v <= 0.006) {
          return {
            status: 'Average',
            tone: 'balanced',
            message: `${formatted} acceptable, but look for lower-fee products when possible. ${costNote}`,
          };
        }
        return {
          status: 'High cost',
          tone: 'negative',
          message: `${formatted} quite high for a long-term account; consider moving to lower-cost options. ${costNote}`,
        };
      },
    },
    {
      id: 'recoveryDiagnostic',
      value: (m) => m.recoveryMonths,
      format: (v, metrics) =>
        formatRecoveryLabel({
          months: v,
          tradingDays:
            metrics && metrics.drawdownDetails
              ? metrics.drawdownDetails.averageRecoveryTradingDays
              : metrics && Number.isFinite(metrics.recoveryTradingDays)
              ? metrics.recoveryTradingDays
              : null,
          calendarDays:
            metrics && metrics.drawdownDetails
              ? metrics.drawdownDetails.averageRecoveryCalendarDays
              : metrics && Number.isFinite(metrics.recoveryCalendarDays)
              ? metrics.recoveryCalendarDays
              : null,
        }),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need drawdown simulation to estimate recovery time.' };
        }
        if (v <= 18) {
          return { status: 'Fast recovery', tone: 'excellent', message: 'Recovery within about ' + formatted + ' helps capital return to profit quickly.' };
        }
        if (v <= 36) {
          return { status: 'Acceptable', tone: 'balanced', message: formatted + ' manageable; keep contributions steady to track the recovery.' };
        }
        return { status: 'Slow recovery', tone: 'negative', message: formatted + ' shows recovery will take time; add defensive assets or lower risk.' };
      },
    },
  ];
  metricDefinitions.forEach((definition) => {
    const element = document.getElementById(definition.id);
    if (!element) {
      return;
    }

    toneClasses.forEach((className) => element.classList.remove(className));
    element.removeAttribute('data-status');

    if (!hasMetrics) {
      element.textContent = 'Telemetry standby - run analytics to activate this diagnostic.';
      element.classList.add(METRIC_TONE_CLASSES.neutral);
      return;
    }

    const rawValue = definition.value(metrics);
    const formattedValue = definition.format(rawValue, metrics);
    const { status, tone, message } = definition.evaluate(rawValue, metrics, formattedValue);
    const toneClass = METRIC_TONE_CLASSES[tone] || METRIC_TONE_CLASSES.neutral;
    const displayMessage = status ? `${status} - ${message}` : message;

    if (status) {
      element.setAttribute('data-status', status);
    }

    element.textContent = displayMessage || 'Telemetry active.';
    element.classList.add(toneClass);
  });
}

// Update Summary Insights
function updateSummaryInsights(expectedReturn, volatility, sharpe, beta, diversityIndex) {
  const diversification =
    diversityIndex >= 0.75 ? 'High' : diversityIndex >= 0.55 ? 'Medium' : 'Low';
  document.getElementById('diversificationLevel').textContent = diversification;

  const riskAdjusted =
    sharpe > 1.5 ? 'Excellent' : sharpe > 1.0 ? 'Good' : sharpe > 0.5 ? 'Fair' : 'Poor';
  document.getElementById('riskAdjustedReturn').textContent = riskAdjusted;

  const growth = expectedReturn > 0.12 ? 'High' : expectedReturn > 0.08 ? 'Medium' : 'Low';
  document.getElementById('growthPotential').textContent = growth;

  const rec1 = document.getElementById('rec1');
  const rec2 = document.getElementById('rec2');
  const rec3 = document.getElementById('rec3');

  if (!(rec1 && rec2 && rec3)) {
    return;
  }

  if (sharpe < 1.0) {
    rec1.textContent = 'Dial back exposure to high-volatility assets to keep the risk budget stable.';
    rec2.textContent = 'Add steadier sleeves such as broad ETFs or short-duration treasuries.';
    rec3.textContent = 'Monitor volatility spikes and rebalance to improve risk-adjusted returns.';
  } else if (expectedReturn < 0.08) {
    rec1.textContent = 'Gradually increase growth allocations if your risk appetite allows.';
    rec2.textContent = 'Explore opportunities in emerging markets or breakout sectors.';
    rec3.textContent = 'Set clear return targets and rebalance on schedule to lift efficiency.';
  } else {
    rec1.textContent = 'Maintain the current allocation to pursue balanced growth.';
    rec2.textContent = 'Scale into higher-growth assets when market conditions are supportive.';
    rec3.textContent = 'Track volatility and rebalance quarterly to keep performance steady.';
  }
}

function updateOperationalHealthGrid(metrics) {
  const riskBar = document.getElementById('healthRiskBar');
  const riskValue = document.getElementById('healthRiskValue');
  const diversificationBar = document.getElementById('healthDiversificationBar');
  const diversificationValue = document.getElementById('healthDiversificationValue');
  const growthBar = document.getElementById('healthGrowthBar');
  const growthValue = document.getElementById('healthGrowthValue');

  if (
    !(
      riskBar &&
      riskValue &&
      diversificationBar &&
      diversificationValue &&
      growthBar &&
      growthValue
    )
  ) {
    return;
  }

  const {
    volatility = 0,
    beta = 0,
    diversityIndex = 0,
    expectedReturn = 0,
    sharpeRatio = 0,
  } = metrics || {};

  const scoreToPercent = (score) =>
    Math.round((Math.max(0, Math.min(10, score)) / 10) * 100);

  const riskScore = scoreVolatility(volatility) * 0.6 + scoreBeta(beta) * 0.4;
  const riskPercent = scoreToPercent(riskScore);
  riskBar.style.width = `${riskPercent}%`;
  riskBar.setAttribute('aria-valuenow', String(riskPercent));
  riskValue.textContent = `${riskPercent}%`;

  const diversificationScore = scoreDiversity(diversityIndex);
  const diversificationPercent = scoreToPercent(diversificationScore);
  diversificationBar.style.width = `${diversificationPercent}%`;
  diversificationBar.setAttribute('aria-valuenow', String(diversificationPercent));
  diversificationValue.textContent = `${diversificationPercent}%`;

  const growthScore =
    scoreExpectedReturn(expectedReturn) * 0.6 + scoreSharpe(sharpeRatio) * 0.4;
  const growthPercent = scoreToPercent(growthScore);
  growthBar.style.width = `${growthPercent}%`;
  growthBar.setAttribute('aria-valuenow', String(growthPercent));
  growthValue.textContent = `${growthPercent}%`;
}

function updateMultiFactorCard(metrics) {
  const r2El = document.getElementById('multiFactorR2');
  if (r2El) {
    if (metrics && Number.isFinite(metrics.rSquared)) {
      r2El.textContent = formatPercent(metrics.rSquared * 100);
    } else {
      r2El.textContent = '--';
    }
  }

  const listEl = document.getElementById('multiFactorBetaList');
  if (!listEl) {
    return;
  }

  if (
    !metrics ||
    !Array.isArray(metrics.factorNames) ||
    !metrics.factorNames.length
  ) {
    listEl.innerHTML =
      '<span class="hud-card__factor-pill"><span>--</span></span>';
    return;
  }

  const exposures = metrics.exposures || {};
  listEl.innerHTML = metrics.factorNames
    .map((factor) => {
      const display = Number.isFinite(exposures[factor])
        ? exposures[factor].toFixed(2)
        : '--';
      return `<span class="hud-card__factor-pill"><span>${factor}</span><span class="hud-card__factor-pill-value">${display}</span></span>`;
    })
    .join('');
}

function updateTailRiskCard(metrics) {
  const cvarEl = document.getElementById('cvarValue');
  const varEl = document.getElementById('varValue');
  if (cvarEl) {
    cvarEl.textContent =
      metrics && Number.isFinite(metrics.cvar)
        ? formatPercent(Math.abs(metrics.cvar) * 100)
        : '--';
  }
  if (varEl) {
    varEl.textContent =
      metrics && Number.isFinite(metrics.var)
        ? formatPercent(Math.abs(metrics.var) * 100)
        : '--';
  }
}

function updateTrackingCard(metrics) {
  const teEl = document.getElementById('trackingErrorValue');
  if (teEl) {
    teEl.textContent =
      metrics && Number.isFinite(metrics.trackingError)
        ? formatPercent(metrics.trackingError * 100)
        : '--';
  }

  const irEl = document.getElementById('informationRatioValue');
  if (irEl) {
    irEl.textContent =
      metrics && Number.isFinite(metrics.informationRatio)
        ? metrics.informationRatio.toFixed(2)
        : '--';
  }
}
// Initialize Analytics
function initializeAnalytics() {
  const targets = getCurrentTargets();
  const normalizedTargets = normalizeWeights(targets);
  const expectedReturn = calculateExpectedReturn(targets);
  const volatility = calculateVolatility(targets);
  const excessReturn = expectedReturn - DEFAULT_RISK_FREE_RATE;
  const sharpe = calculateSharpeRatio(expectedReturn, volatility);
  const beta = calculatePortfolioBeta(targets);
  const sortino = calculateSortinoRatio(expectedReturn, DEFAULT_RISK_FREE_RATE, volatility);
  const sortinoDetails =
    typeof lastSortinoSnapshot === 'object' && lastSortinoSnapshot !== null
      ? lastSortinoSnapshot
      : null;
  const drawdownDetails =
    typeof lastDrawdownSnapshot === 'object' && lastDrawdownSnapshot !== null
      ? lastDrawdownSnapshot
      : null;
  const {
    maxDrawdown,
    recoveryMonths,
    recoveryTradingDays,
    recoveryCalendarDays,
  } = simulateDrawdownMetrics(expectedReturn, volatility);
  const calmar = calculateCalmarRatio(expectedReturn, maxDrawdown);
  const alpha = calculateAlpha(expectedReturn, beta);
  const weightedExpenseRatio = calculateWeightedExpenseRatio(targets);
  const expenseDetails =
    typeof lastExpenseSnapshot === 'object' && lastExpenseSnapshot !== null
      ? lastExpenseSnapshot
      : null;
  const captureMetrics = calculateUpDownCaptureRatios({
    expectedReturn,
    volatility,
    beta,
  });
  const upCaptureRatio =
    captureMetrics && Number.isFinite(captureMetrics.upCaptureRatio)
      ? captureMetrics.upCaptureRatio
      : null;
  const downCaptureRatio =
    captureMetrics && Number.isFinite(captureMetrics.downCaptureRatio)
      ? captureMetrics.downCaptureRatio
      : null;
  const captureDetails =
    captureMetrics && captureMetrics.details ? captureMetrics.details : null;
  const tailRiskMetrics = calculateTailRiskMetrics({
    expectedReturn,
    volatility,
  });
  const cvarLoss =
    tailRiskMetrics && Number.isFinite(tailRiskMetrics.cvar)
      ? tailRiskMetrics.cvar
      : null;
  const varLoss =
    tailRiskMetrics && Number.isFinite(tailRiskMetrics.var)
      ? tailRiskMetrics.var
      : null;
  const {
    index: diversityIndex,
    score: diversityComponentScore,
    details: diversityDetails,
  } = calculateDiversityScore(targets);

  document.getElementById('expectedReturnValue').textContent = formatPercent(expectedReturn * 100);
  document.getElementById('volatilityValue').textContent = formatPercent(volatility * 100);
  document.getElementById('sharpeValue').textContent = sharpe.toFixed(2);
  document.getElementById('portfolioBetaValue').textContent = beta.toFixed(2);
  document.getElementById('diversityScoreValue').textContent = formatPercent(diversityIndex * 100);
  const sortinoEl = document.getElementById('sortinoValue');
  if (sortinoEl) sortinoEl.textContent = sortino.toFixed(2);
  const maxDrawdownEl = document.getElementById('maxDrawdownValue');
  if (maxDrawdownEl) maxDrawdownEl.textContent = formatPercent(maxDrawdown * 100);
  const calmarEl = document.getElementById('calmarValue');
  if (calmarEl) calmarEl.textContent = calmar.toFixed(2);
  const alphaEl = document.getElementById('alphaValue');
  if (alphaEl) alphaEl.textContent = formatPercent(alpha * 100);
  const expenseEl = document.getElementById('expenseRatioValue');
  if (expenseEl) expenseEl.textContent = formatPercent(weightedExpenseRatio * 100);
  const upCaptureEl = document.getElementById('upCaptureValue');
  if (upCaptureEl) {
    upCaptureEl.textContent = Number.isFinite(upCaptureRatio)
      ? formatPercent(upCaptureRatio * 100)
      : '--';
  }
  const downCaptureEl = document.getElementById('downCaptureValue');
  if (downCaptureEl) {
    downCaptureEl.textContent = Number.isFinite(downCaptureRatio)
      ? formatPercent(downCaptureRatio * 100)
      : '--';
  }
  const recoveryEl = document.getElementById('recoveryTimeValue');
  if (recoveryEl) {
    recoveryEl.textContent = formatRecoveryLabel({
      months: recoveryMonths,
      tradingDays: recoveryTradingDays,
      calendarDays: recoveryCalendarDays,
    });
  }
  updateTailRiskCard({
    cvar: cvarLoss,
    var: varLoss,
    confidenceLevel:
      tailRiskMetrics && Number.isFinite(tailRiskMetrics.confidenceLevel)
        ? tailRiskMetrics.confidenceLevel
        : 0.95,
  });

  const volatilitySnapshot = lastVolatilitySnapshot;
  const fallbackNormalizedWeights = { ...normalizedTargets };
  const fallbackWeightVector = assetKeys.map((key) => normalizedTargets[key] || 0);
  const fallbackWeightSum = fallbackWeightVector.reduce(
    (sum, weight) => sum + (Number.isFinite(weight) ? weight : 0),
    0
  );
  const covarianceMatrix =
    volatilitySnapshot && Array.isArray(volatilitySnapshot.covarianceMatrix)
      ? volatilitySnapshot.covarianceMatrix
      : buildCovarianceMatrix();
  const variance =
    volatilitySnapshot && Number.isFinite(volatilitySnapshot.variance)
      ? volatilitySnapshot.variance
      : volatility * volatility;
  const trackingMetrics = calculateTrackingErrorMetrics({
    expectedReturn,
    variance,
    beta,
  });
  const trackingErrorValue =
    trackingMetrics && Number.isFinite(trackingMetrics.trackingError)
      ? trackingMetrics.trackingError
      : null;
  const informationRatioValue =
    trackingMetrics && Number.isFinite(trackingMetrics.informationRatio)
      ? trackingMetrics.informationRatio
      : null;
  const activeReturnValue =
    trackingMetrics && Number.isFinite(trackingMetrics.activeReturn)
      ? trackingMetrics.activeReturn
      : null;
  updateTrackingCard({
    trackingError: trackingErrorValue,
    informationRatio: informationRatioValue,
  });
  const activeDriftEl = document.getElementById('activeDriftValue');
  if (activeDriftEl) {
    if (Number.isFinite(trackingErrorValue) && Number.isFinite(informationRatioValue)) {
      const teLabel = formatPercent(trackingErrorValue * 100);
      activeDriftEl.textContent = `${teLabel} | IR ${informationRatioValue.toFixed(2)}`;
    } else if (Number.isFinite(trackingErrorValue)) {
      activeDriftEl.textContent = formatPercent(trackingErrorValue * 100);
    } else {
      activeDriftEl.textContent = '--';
    }
  }
  const normalizedWeightsForExport =
    volatilitySnapshot && volatilitySnapshot.normalizedWeights
      ? { ...volatilitySnapshot.normalizedWeights }
      : fallbackNormalizedWeights;
  const weightVectorForExport =
    volatilitySnapshot && Array.isArray(volatilitySnapshot.weightVector)
      ? [...volatilitySnapshot.weightVector]
      : fallbackWeightVector;
  const weightSumForExport =
    volatilitySnapshot && Number.isFinite(volatilitySnapshot.weightSum)
      ? volatilitySnapshot.weightSum
      : fallbackWeightSum;
  const betaSnapshot = lastBetaSnapshot;
  const fallbackBetaContributions = assetKeys.reduce((acc, key) => {
    const weight = normalizedTargets[key] || 0;
    const assetBeta = portfolioAssetBetas[key] ?? 1;
    acc[key] = weight * assetBeta;
    return acc;
  }, {});
  const betaContributionsForExport =
    betaSnapshot && betaSnapshot.contributions
      ? { ...betaSnapshot.contributions }
      : fallbackBetaContributions;
  const betaWeightsForExport =
    betaSnapshot && betaSnapshot.normalizedWeights
      ? { ...betaSnapshot.normalizedWeights }
      : { ...normalizedTargets };
  const multiFactorMetrics = computeMultiFactorMetrics({
    weights: normalizedTargets,
    variance,
  });
  updateMultiFactorCard(multiFactorMetrics);
  const multiFactorRSquared =
    multiFactorMetrics && Number.isFinite(multiFactorMetrics.rSquared)
      ? multiFactorMetrics.rSquared
      : null;

  const portfolioScoreInputs = {
    expectedReturn,
    volatility,
    sharpeRatio: sharpe,
    beta,
    diversityIndex,
    sortinoRatio: sortino,
    maxDrawdown,
    calmarRatio: calmar,
    alpha,
    expenseRatio: weightedExpenseRatio,
    upCaptureRatio,
    downCaptureRatio,
    cvarLoss,
    trackingError: trackingErrorValue,
    informationRatio: informationRatioValue,
    multiFactorRSquared,
    multiFactorExposures:
      multiFactorMetrics && multiFactorMetrics.exposures
        ? { ...multiFactorMetrics.exposures }
        : null,
    multiFactorFactorNames:
      multiFactorMetrics && Array.isArray(multiFactorMetrics.factorNames)
        ? [...multiFactorMetrics.factorNames]
        : null,
    recoveryMonths,
    recoveryTradingDays,
    recoveryCalendarDays,
  };

  const portfolioScoreResult = calculatePortfolioScore(portfolioScoreInputs);
  const {
    score: portfolioScore,
    normalizedScore: portfolioScore100,
    components,
  } = portfolioScoreResult;

  const portfolioScoreEl = document.getElementById('analyticsPortfolioScore');
  if (portfolioScoreEl) {
    portfolioScoreEl.textContent = portfolioScore.toFixed(1);
  }

  updatePortfolioScoreAndRisk(portfolioScoreInputs, portfolioScoreResult);

  window.latestAnalyticsScores = {
    expectedReturn,
    volatility,
    excessReturn,
    variance,
    sharpeRatio: sharpe,
    beta,
    diversityIndex,
    diversityScore: diversityComponentScore,
    diversityDetails,
    portfolioScore,
    portfolioScore100,
    componentScores: components,
    portfolioScoreInputs: { ...portfolioScoreInputs },
    portfolioScoreDetails: portfolioScoreResult,
    sortinoDetails,
    drawdownDetails,
    expenseDetails,
    covarianceMatrix,
    normalizedWeights: normalizedWeightsForExport,
    weightVector: weightVectorForExport,
    weightSum: weightSumForExport,
    betaContributions: betaContributionsForExport,
    betaWeights: betaWeightsForExport,
    riskFreeRate: DEFAULT_RISK_FREE_RATE,
    marketReturn: DEFAULT_BENCHMARK_RETURN,
    equityRiskPremium: DEFAULT_EQUITY_RISK_PREMIUM,
    sortinoRatio: sortino,
    maxDrawdown,
    calmarRatio: calmar,
    alpha,
    expenseRatio: weightedExpenseRatio,
    recoveryMonths,
    recoveryTradingDays,
    recoveryCalendarDays,
    upCaptureRatio,
    downCaptureRatio,
    captureDetails,
    cvarLoss,
    varLoss,
    tailRiskDetails: tailRiskMetrics,
    trackingError: trackingErrorValue,
    informationRatio: informationRatioValue,
    activeReturn: activeReturnValue,
    multiFactorRSquared,
    multiFactorExposures: multiFactorMetrics ? { ...multiFactorMetrics.exposures } : null,
    multiFactorFactorNames: multiFactorMetrics ? [...multiFactorMetrics.factorNames] : [],
    multiFactorExplainedVariance: multiFactorMetrics ? multiFactorMetrics.explainedVariance : null,
    multiFactorResidualVariance: multiFactorMetrics ? multiFactorMetrics.residualVariance : null,
    multiFactorCovariance: multiFactorMetrics ? multiFactorMetrics.covarianceMatrix : null,
  };

  populateAssetContributionTable(targets);
  updateSummaryInsights(expectedReturn, volatility, sharpe, beta, diversityIndex);
  updateOperationalHealthGrid({
    expectedReturn,
    volatility,
    sharpeRatio: sharpe,
    beta,
    diversityIndex,
  });
  updateAnalyticsNarrative({
    expectedReturn,
    volatility,
    excessReturn,
    sortinoRatio: sortino,
    calmarRatio: calmar,
    maxDrawdown,
    recoveryMonths,
    alpha,
    expenseRatio: weightedExpenseRatio,
    upCaptureRatio,
    multiFactorRSquared,
    multiFactorExposures: multiFactorMetrics ? multiFactorMetrics.exposures : null,
    multiFactorFactorNames: multiFactorMetrics ? multiFactorMetrics.factorNames : null,
    cvarLoss,
    varLoss,
    tailRiskDetails: tailRiskMetrics,
    trackingError: trackingErrorValue,
    informationRatio: informationRatioValue,
    activeReturn: activeReturnValue,
    downCaptureRatio,
    drawdownDetails,
  });
  updateMetricBreakdown({
    expectedReturn,
    volatility,
    excessReturn,
    sharpeRatio: sharpe,
    beta,
    portfolioScore,
    diversityIndex,
    diversityDetails,
    sortinoDetails,
    drawdownDetails,
    expenseDetails,
    sortinoRatio: sortino,
    maxDrawdown,
    calmarRatio: calmar,
    alpha,
    expenseRatio: weightedExpenseRatio,
    upCaptureRatio,
    downCaptureRatio,
    captureDetails,
    cvarLoss,
    varLoss,
    tailRiskDetails: tailRiskMetrics,
    trackingError: trackingErrorValue,
    informationRatio: informationRatioValue,
    activeReturn: activeReturnValue,
    multiFactorRSquared,
    multiFactorExposures: multiFactorMetrics ? multiFactorMetrics.exposures : null,
    multiFactorFactorNames: multiFactorMetrics ? multiFactorMetrics.factorNames : null,
    recoveryMonths,
    covarianceMatrix,
    variance,
    normalizedWeights: normalizedWeightsForExport,
    weightVector: weightVectorForExport,
    weightSum: weightSumForExport,
    betaContributions: betaContributionsForExport,
    betaWeights: betaWeightsForExport,
    riskFreeRate: DEFAULT_RISK_FREE_RATE,
    marketReturn: DEFAULT_BENCHMARK_RETURN,
    equityRiskPremium: DEFAULT_EQUITY_RISK_PREMIUM,
  });
}

// Function to update portfolio score and risk level
function updatePortfolioScoreAndRisk(scoreInputs, cachedResult) {
  const result =
    cachedResult && typeof cachedResult === 'object'
      ? cachedResult
      : calculatePortfolioScore(scoreInputs || {});
  const score = Number.isFinite(result?.score) ? result.score : 0;

  if (typeof window !== 'undefined') {
    window.latestPortfolioScoreDetails = result;
  }

  const volatility =
    scoreInputs && Number.isFinite(scoreInputs.volatility)
      ? scoreInputs.volatility
      : null;
  let riskLevel;

  if (!Number.isFinite(volatility)) {
    riskLevel = 'Unknown';
  } else if (volatility > 0.25) {
    riskLevel = 'High';
  } else if (volatility > 0.15) {
    riskLevel = 'Medium';
  } else {
    riskLevel = 'Low';
  }

  const scoreEl = document.getElementById('portfolioScore');
  if (scoreEl) {
    scoreEl.textContent = score.toFixed(1);
  }

  const clampedScore = Math.max(0, Math.min(10, score));
  const scoreProgress = document.getElementById('portfolioScoreBar');
  if (scoreProgress) {
    const percent = (clampedScore / 10) * 100;
    scoreProgress.style.width = `${percent}%`;
    scoreProgress.setAttribute('aria-valuenow', clampedScore.toFixed(1));
  }

  const riskLevelEl = document.getElementById('riskLevel');
  if (riskLevelEl) {
    riskLevelEl.textContent = riskLevel;
  }

  updateRiskLevelBar();
}

// Load expected returns from localStorage
function loadExpectedReturnsFromStorage() {
  if (typeof window !== "undefined" && typeof window.hydratePortfolioDefaults === "function") {
    window.hydratePortfolioDefaults();
  }

  assetKeys.forEach(key => {
    const stored = localStorage.getItem(`expectedReturn_${key}`);
    if (stored !== null) {
      const parsed = parseFloat(stored);
      if (Number.isFinite(parsed)) {
        expectedReturns[key] = parsed;
      }
    }
  });
}

// Event listener for refresh button
document.addEventListener('DOMContentLoaded', function() {
  loadExpectedReturnsFromStorage();
  bindContributionControls();
  updateContributionToggleState();

  const resetAssumptionsBtn = document.getElementById('resetAssumptionsBtn');
  if (resetAssumptionsBtn) {
    resetAssumptionsBtn.addEventListener('click', () => {
      if (typeof window.showActionFeedback === 'function') {
        window.showActionFeedback('Resetting portfolio assumptions…', {
          state: 'progress',
          autoHide: false,
        });
      }
      try {
        if (typeof window.resetPortfolioAssumptionsToDefaults === 'function') {
          window.resetPortfolioAssumptionsToDefaults();
        }
      } catch (error) {
        console.error('Failed to trigger portfolio assumption reset:', error);
        if (typeof window.showActionFeedback === 'function') {
          window.showActionFeedback(
            'Could not reset assumptions. Check console logs.',
            { state: 'error', autoHide: 4200 }
          );
        }
      }
    });
  }

  window.addEventListener('portfolio-assumptions-reset', (event) => {
    loadExpectedReturnsFromStorage();
    const cleared = Boolean(event && event.detail && event.detail.clearedStorage);
    let initError = null;
    try {
      initializeAnalytics();
    } catch (error) {
      initError = error;
      console.error('Failed to reinitialize analytics after reset:', error);
    }
    if (typeof window.showActionFeedback === 'function') {
      if (initError) {
        window.showActionFeedback(
          'Baseline reset but analytics refresh failed. Check console logs.',
          { state: 'error', autoHide: 4200 }
        );
      } else {
        const message = cleared
          ? 'Baseline assumptions restored and overrides cleared.'
          : 'Baseline assumptions restored.';
        window.showActionFeedback(message, {
          state: 'success',
          autoHide: 2600,
        });
      }
    }
  });

  const stressSlider = document.getElementById('stressTestSlider');
  if (stressSlider) {
    stressSlider.dispatchEvent(new Event('input'));
  }

  const refreshBtn = document.getElementById('refreshAnalyticsBtn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', initializeAnalytics);
  }

  const hudToggle = document.getElementById('hudModeToggle');
  const hudShell = document.getElementById('analysisHud');
  if (hudToggle && hudShell) {
    hudToggle.addEventListener('click', () => {
      const isCombatMode = hudShell.classList.toggle('analysis-hud--combat');
      hudToggle.setAttribute('aria-pressed', isCombatMode ? 'true' : 'false');
    });
  }

  // Initial render (deferred to idle time for smoother page load)
  const runInitialAnalytics = () => {
    try {
      initializeAnalytics();
    } catch (error) {
      console.error("Analytics initialization failed:", error);
    }
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(runInitialAnalytics, { timeout: 1200 });
  } else {
    setTimeout(runInitialAnalytics, 0);
  }
});


