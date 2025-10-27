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

const DEFAULT_BENCHMARK_RETURN =
  typeof BENCHMARK_EXPECTED_RETURN === 'number'
    ? BENCHMARK_EXPECTED_RETURN
    : 0.085;

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

function getCorrelation(asset1, asset2) {
  if (asset1 === asset2) return 1;
  const corrKey = asset1 < asset2 ? `${asset1}_${asset2}` : `${asset2}_${asset1}`;
  return correlations[corrKey] ?? 0;
}

function clampScore(value, min = 0, max = 10) {
  if (!Number.isFinite(value)) return min;
  return Math.max(min, Math.min(max, value));
}

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

// Calculate portfolio expected return using normalized weights
function calculateExpectedReturn(targets) {
  const weights = normalizeWeights(targets);
  return assetKeys.reduce((sum, key) => {
    const assetReturn = expectedReturns[key] ?? 0;
    return sum + (weights[key] || 0) * assetReturn;
  }, 0);
}

// Calculate portfolio volatility (standard deviation)
function calculateVolatility(targets) {
  const weights = normalizeWeights(targets);
  let variance = 0;

  for (let i = 0; i < assetKeys.length; i += 1) {
    const assetI = assetKeys[i];
    const weightI = weights[assetI] || 0;
    const sigmaI = volatilities[assetI] ?? 0;
    variance += weightI * weightI * sigmaI * sigmaI;

    for (let j = i + 1; j < assetKeys.length; j += 1) {
      const assetJ = assetKeys[j];
      const weightJ = weights[assetJ] || 0;
      if (weightJ <= 0) continue;
      const sigmaJ = volatilities[assetJ] ?? 0;
      const correlation = getCorrelation(assetI, assetJ);
      variance += 2 * weightI * weightJ * sigmaI * sigmaJ * correlation;
    }
  }

  return Math.sqrt(Math.max(variance, 0));
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
  if (!Number.isFinite(downsideDeviation) || downsideDeviation <= 0) return 0;
  return (expectedReturn - riskFreeRate) / downsideDeviation;
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

function computeDrawdownFromSeries(series) {
  if (!Array.isArray(series) || series.length === 0) {
    return { maxDrawdown: 0, recoveryMonths: null };
  }
  let peak = series[0];
  let peakIndex = 0;
  let maxDrawdown = 0;
  let maxDrawdownPeakIndex = 0;
  let maxDrawdownTroughIndex = 0;

  for (let i = 1; i < series.length; i += 1) {
    const value = series[i];
    if (value > peak) {
      peak = value;
      peakIndex = i;
      continue;
    }
    const drawdown = peak > 0 ? (peak - value) / peak : 0;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
      maxDrawdownPeakIndex = peakIndex;
      maxDrawdownTroughIndex = i;
    }
  }

  if (maxDrawdown === 0) {
    return { maxDrawdown: 0, recoveryMonths: 0 };
  }

  const recoveryTarget = series[maxDrawdownPeakIndex];
  let recoveryMonths = null;
  for (let i = maxDrawdownTroughIndex + 1; i < series.length; i += 1) {
    if (series[i] >= recoveryTarget) {
      recoveryMonths = i - maxDrawdownPeakIndex;
      break;
    }
  }

  return { maxDrawdown, recoveryMonths };
}

function simulateDrawdownMetrics(expectedReturn, volatility, simulations = 60) {
  if (!Number.isFinite(expectedReturn)) expectedReturn = 0;
  if (!Number.isFinite(volatility) || volatility <= 0) {
    return { maxDrawdown: 0, recoveryMonths: 0 };
  }

  const rng = createDeterministicRandom();
  const normalSample = createNormalSampler(rng);
  const periods = 120; // monthly over 10 years
  const monthlyReturn = Math.pow(1 + expectedReturn, 1 / 12) - 1;
  const monthlyVol = volatility / Math.sqrt(12);

  let maxDrawdownSum = 0;
  let recoverySum = 0;
  let recoveryCount = 0;

  for (let sim = 0; sim < simulations; sim += 1) {
    const path = [1];
    for (let i = 1; i <= periods; i += 1) {
      const shock = normalSample();
      const r = monthlyReturn + monthlyVol * shock;
      const nextValue = Math.max(path[i - 1] * (1 + r), 0.01);
      path.push(nextValue);
    }

    const { maxDrawdown, recoveryMonths } = computeDrawdownFromSeries(path);
    maxDrawdownSum += maxDrawdown;
    if (Number.isFinite(recoveryMonths) && recoveryMonths !== null) {
      recoverySum += recoveryMonths;
      recoveryCount += 1;
    }
  }

  const avgDrawdown = Math.max(maxDrawdownSum / simulations, 0);
  const avgRecovery =
    recoveryCount > 0 ? recoverySum / recoveryCount : periods / 2;

  return {
    maxDrawdown: Math.min(avgDrawdown, 0.95),
    recoveryMonths: avgRecovery,
  };
}

// Calculate Portfolio Beta (weighted average of asset betas)
function calculatePortfolioBeta(targets) {
  const weights = normalizeWeights(targets);
  return assetKeys.reduce((sum, key) => {
    const assetBeta = portfolioAssetBetas[key] ?? 1;
    return sum + (weights[key] || 0) * assetBeta;
  }, 0);
}

function calculateWeightedExpenseRatio(targets) {
  const weights = normalizeWeights(targets);
  return assetKeys.reduce((sum, key) => {
    const ratio = portfolioExpenseRatios[key] ?? 0;
    return sum + (weights[key] || 0) * ratio;
  }, 0);
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

function calculatePortfolioScore({ sharpeRatio, volatility, beta, diversityIndex }) {
  const sharpeScore = scoreSharpe(sharpeRatio);
  const volatilityScore = scoreVolatility(volatility);
  const betaScore = scoreBeta(beta);
  const diversityScore = scoreDiversity(diversityIndex);
  const composite =
    sharpeScore * 0.35 +
    volatilityScore * 0.25 +
    betaScore * 0.15 +
    diversityScore * 0.25;

  return {
    score: clampScore(composite),
    components: {
      sharpeScore,
      volatilityScore,
      betaScore,
      diversityScore,
    },
  };
}

// Function to calculate Diversity Score
function calculateDiversityScore(targets) {
  const weights = Object.values(normalizeWeights(targets));
  if (!weights.length) {
    return { index: 0, score: 0 };
  }

  const hhi = weights.reduce((sum, weight) => sum + weight * weight, 0);
  const diversityIndex = Math.max(0, Math.min(1, 1 - hhi));
  const diversityScore = scoreDiversity(diversityIndex);

  return { index: diversityIndex, score: diversityScore };
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
    const assetReturn = expectedReturns[key] ?? 0;
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

    if (currentMode === 'risk' && riskMetrics) {
      signalValue = riskMetrics.marginalRisk[key] ?? 0;
      contributionValue = riskMetrics.contributionFraction[key] ?? 0;
    } else if (currentMode === 'sharpe' && sharpeMetrics) {
      signalValue = sharpeMetrics.sharpeValues[key] ?? 0;
      contributionValue = (weight || 0) * signalValue;
    } else {
      signalValue = (expectedReturns[key] ?? 0) * 100;
      contributionValue = (expectedReturns[key] ?? 0) * weight;
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
      expectedReturnInput.value = ((expectedReturns[key] ?? 0) * 100).toFixed(1);
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

function formatRecoveryLabel(months) {
  if (!Number.isFinite(months) || months <= 0) return ' - ';
  const rounded = Math.round(months);
  if (rounded < 12) {
    return `${rounded} mo`;
  }
  const years = Math.floor(rounded / 12);
  const remainingMonths = rounded % 12;
  if (remainingMonths === 0) {
    return `${years} yr${years > 1 ? 's' : ''}`;
  }
  return `${years}y ${remainingMonths}m`;
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

function describeResilience({ maxDrawdown, recoveryMonths }) {
  if (!Number.isFinite(maxDrawdown)) {
    return 'No drawdown simulation available to evaluate crash resilience.';
  }
  const drawdownLabel = formatPercent(Math.abs(maxDrawdown) * 100);
  const recoveryLabel = formatRecoveryLabel(recoveryMonths);

  if (maxDrawdown <= 0.2) {
    return `Simulated max drawdown holds to ${drawdownLabel}; recovery cadence of ~${recoveryLabel} keeps capital resilient.`;
  }
  if (maxDrawdown <= 0.35) {
    return `Expect about ${drawdownLabel} drawdowns with a ${recoveryLabel} recovery window - maintain cash buffers for that stress.`;
  }
  return `Drawdowns could reach ${drawdownLabel} and stay underwater for roughly ${recoveryLabel}; consider rebalancing or hedges to boost resilience.`;
}

function describeEfficiency({ alpha, expenseRatio }) {
  const expenseLabel = Number.isFinite(expenseRatio) ? formatPercent(expenseRatio * 100) : ' - ';
  const alphaPercent = Number.isFinite(alpha) ? alpha * 100 : null;

  if (alphaPercent !== null && alphaPercent > 1 && Number.isFinite(expenseRatio) && expenseRatio <= 0.003) {
    return `Cost discipline (${expenseLabel}) plus ${alphaPercent.toFixed(1)}% alpha indicates the portfolio is compounding efficiently versus the benchmark.`;
  }
  if (alphaPercent !== null && alphaPercent >= 0 && Number.isFinite(expenseRatio) && expenseRatio <= 0.004) {
    return `Fees stay moderate at ${expenseLabel}; keep nudging alpha above zero (${alphaPercent.toFixed(1)}%) to justify the risk budget.`;
  }
  if (alphaPercent !== null && alphaPercent < 0) {
    return `Current alpha of ${alphaPercent.toFixed(1)}% trails the market; review sleeve tilts or execution costs (fees at ${expenseLabel}) to close the gap.`;
  }
  return `Monitor cost drag (${expenseLabel}) and risk-adjusted skill to confirm the strategy stays competitive.`;
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
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide expected returns for each asset.' };
        }
        if (v >= 0.12) {
          return { status: 'High growth', tone: 'excellent', message: formatted + ' suits an aggressive growth strategy with a long runway.' };
        }
        if (v >= 0.08) {
          return { status: 'On track', tone: 'strong', message: formatted + ' aligns with the balanced growth objective for this Roth IRA.' };
        }
        if (v >= 0.06) {
          return { status: 'Stable', tone: 'balanced', message: formatted + ' steady, but consider adding more growth tilt if expectations are higher.' };
        }
        return { status: 'Below goal', tone: 'negative', message: formatted + ' may undershoot long-term goals; revisit assumptions and allocation.' };
      },
    },
    {
      id: 'volatilityDiagnostic',
      value: (m) => m.volatility,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide volatility data for each asset.' };
        }
        if (v <= 0.15) {
          return { status: 'Low', tone: 'excellent', message: formatted + ' keeps drawdown risk in a comfortable range.' };
        }
        if (v <= 0.22) {
          return { status: 'Moderate', tone: 'balanced', message: formatted + ' suits the target balance between growth and defense.' };
        }
        return { status: 'Elevated', tone: 'watch', message: formatted + ' signals larger swings; make sure return assumptions justify the risk.' };
      },
    },
    {
      id: 'sharpeDiagnostic',
      value: (m) => m.sharpeRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need expected returns and volatility to compute Sharpe.' };
        }
        if (v >= 1.2) {
          return { status: 'Highly efficient', tone: 'excellent', message: 'Sharpe ' + formatted + ' shows the portfolio is well compensated after accounting for risk.' };
        }
        if (v >= 0.8) {
          return { status: 'Efficient', tone: 'strong', message: 'Sharpe ' + formatted + ' suits a diversified equity portfolio.' };
        }
        if (v >= 0.35) {
          return { status: 'Fair', tone: 'balanced', message: 'Sharpe ' + formatted + ' shows return versus risk remains acceptable.' };
        }
        return { status: 'Needs improvement', tone: 'watch', message: 'Sharpe ' + formatted + ' is low; rebalance the trade-off between growth and stability.' };
      },
    },
    {
      id: 'betaDiagnostic',
      value: (m) => m.beta,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Assign market beta estimates to each asset.' };
        }
        if (v < 0.9) {
          return { status: 'Defensive', tone: 'excellent', message: 'Beta ' + formatted + ' helps dampen market volatility for the portfolio.' };
        }
        if (v <= 1.1) {
          return { status: 'Market-like', tone: 'strong', message: 'Beta ' + formatted + ' keeps the portfolio moving with the benchmark.' };
        }
        if (v <= 1.3) {
          return { status: 'Somewhat aggressive', tone: 'watch', message: 'Beta ' + formatted + ' makes the portfolio more sensitive than the market; only maintain if you accept higher risk.' };
        }
        return { status: 'Highly sensitive', tone: 'negative', message: 'Beta ' + formatted + ' is too high; reassess high-beta allocations.' };
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
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Define target weights to assess diversification.' };
        }
        if (v >= 0.75) {
          return { status: 'Highly diversified', tone: 'excellent', message: formatted + ' shows allocation is even with low concentration risk.' };
        }
        if (v >= 0.6) {
          return { status: 'Balanced', tone: 'strong', message: formatted + ' solid; just monitor sleeves that are overweight.' };
        }
        if (v >= 0.45) {
          return { status: 'Some concentration', tone: 'watch', message: formatted + ' shows a few sleeves dominate weight; confirm that is intentional.' };
        }
        return { status: 'Highly concentrated', tone: 'negative', message: formatted + ' signals concentration risk; broaden exposure with additional sleeves.' };
      },
    },
    {
      id: 'sortinoDiagnostic',
      value: (m) => m.sortinoRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need expected returns and downside deviation to compute Sortino.' };
        }
        if (v >= 1.3) {
          return { status: 'Strong protection', tone: 'excellent', message: 'Sortino ' + formatted + ' shows returns more than compensate for downside risk.' };
        }
        if (v >= 1.0) {
          return { status: 'OK', tone: 'strong', message: 'Sortino ' + formatted + ' at a healthy level; losses are compensated appropriately.' };
        }
        if (v >= 0.7) {
          return { status: 'Monitor', tone: 'watch', message: 'Sortino ' + formatted + ' acceptable; smooth volatility or add higher-quality sleeves.' };
        }
        return { status: 'Inefficient', tone: 'negative', message: 'Sortino ' + formatted + ' shows downside risk is eroding return efficiency.' };
      },
    },
    {
      id: 'maxDrawdownDiagnostic',
      value: (m) => m.maxDrawdown,
      format: (v) => (Number.isFinite(v) ? formatPercent(Math.abs(v) * 100) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need volatility data to simulate drawdown.' };
        }
        if (v <= 0.2) {
          return { status: 'Very resilient', tone: 'excellent', message: formatted + ' remains within the tolerance of most investors.' };
        }
        if (v <= 0.35) {
          return { status: 'Acceptable', tone: 'balanced', message: formatted + ' demands discipline; confirm the plan accounts for this scenario.' };
        }
        return { status: 'Very deep', tone: 'negative', message: formatted + ' flags a severe shock; revisit allocation or hedging plans.' };
      },
    },
    {
      id: 'calmarDiagnostic',
      value: (m) => m.calmarRatio,
      format: (v) => (Number.isFinite(v) ? v.toFixed(2) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Calmar requires both expected return and drawdown estimates.' };
        }
        if (v >= 0.5) {
          return { status: 'High quality', tone: 'excellent', message: 'Calmar ' + formatted + ' shows each 1% drawdown is backed by at least 0.5% annual return.' };
        }
        if (v >= 0.3) {
          return { status: 'Balanced', tone: 'strong', message: 'Calmar ' + formatted + ' reasonable; seek slightly higher returns or lower drawdowns to improve.' };
        }
        if (v >= 0.15) {
          return { status: 'Monitor', tone: 'watch', message: 'Calmar ' + formatted + ' shows the portfolio is under heavy drawdown; tighten risk controls.' };
        }
        return { status: 'Unattractive', tone: 'negative', message: 'Calmar ' + formatted + ' means drawdowns outpace returns; revisit assumptions and hedging.' };
      },
    },
    {
      id: 'alphaDiagnostic',
      value: (m) => m.alpha,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Need return assumptions and beta to compute alpha.' };
        }
        if (v >= 0.015) {
          return { status: 'Outperforming', tone: 'excellent', message: 'Alpha ' + formatted + ' shows the portfolio is beating the benchmark after adjusting for risk.' };
        }
        if (v >= 0.005) {
          return { status: 'Positive', tone: 'strong', message: 'Alpha ' + formatted + ' small but still adds value versus the market.' };
        }
        if (v >= -0.005) {
          return { status: 'Inline with market', tone: 'balanced', message: 'Alpha ' + formatted + ' near zero; focus on costs and diversification to improve.' };
        }
        return { status: 'Lagging the benchmark', tone: 'negative', message: 'Alpha ' + formatted + ' trails the benchmark; review tilts and trading costs.' };
      },
    },
    {
      id: 'expenseDiagnostic',
      value: (m) => m.expenseRatio,
      format: (v) => (Number.isFinite(v) ? formatPercent(v * 100) : '--'),
      evaluate: (v, _metrics, formatted) => {
        if (!Number.isFinite(v)) {
          return { status: 'Data missing', tone: 'neutral', message: 'Provide expense ratios for each holding.' };
        }
        if (v <= 0.002) {
          return { status: 'Ultra low cost', tone: 'excellent', message: formatted + ' helps compounding, which is ideal for a Roth IRA.' };
        }
        if (v <= 0.004) {
          return { status: 'Efficient', tone: 'strong', message: formatted + ' still competitive; continue policing active fund fees.' };
        }
        if (v <= 0.006) {
          return { status: 'Average', tone: 'balanced', message: formatted + ' acceptable, but look for lower-fee products when possible.' };
        }
        return { status: 'High cost', tone: 'negative', message: formatted + ' quite high for a long-term account; consider moving to lower-cost options.' };
      },
    },
    {
      id: 'recoveryDiagnostic',
      value: (m) => m.recoveryMonths,
      format: (v) => (Number.isFinite(v) ? formatRecoveryLabel(v) : '--'),
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
// Initialize Analytics
function initializeAnalytics() {
  const targets = getCurrentTargets();
  const expectedReturn = calculateExpectedReturn(targets);
  const volatility = calculateVolatility(targets);
  const sharpe = calculateSharpeRatio(expectedReturn, volatility);
  const beta = calculatePortfolioBeta(targets);
  const sortino = calculateSortinoRatio(expectedReturn, DEFAULT_RISK_FREE_RATE, volatility);
  const { maxDrawdown, recoveryMonths } = simulateDrawdownMetrics(expectedReturn, volatility);
  const calmar = calculateCalmarRatio(expectedReturn, maxDrawdown);
  const alpha = calculateAlpha(expectedReturn, beta);
  const weightedExpenseRatio = calculateWeightedExpenseRatio(targets);
  const { index: diversityIndex, score: diversityComponentScore } = calculateDiversityScore(targets);
  const { score: portfolioScore, components } = calculatePortfolioScore({
    sharpeRatio: sharpe,
    volatility,
    beta,
    diversityIndex,
  });

  document.getElementById('expectedReturnValue').textContent = formatPercent(expectedReturn * 100);
  document.getElementById('volatilityValue').textContent = formatPercent(volatility * 100);
  document.getElementById('sharpeValue').textContent = sharpe.toFixed(2);
  document.getElementById('portfolioBetaValue').textContent = beta.toFixed(2);
  document.getElementById('diversityScoreValue').textContent = formatPercent(diversityIndex * 100);
  document.getElementById('analyticsPortfolioScore').textContent = portfolioScore.toFixed(1);
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
  const recoveryEl = document.getElementById('recoveryTimeValue');
  if (recoveryEl) recoveryEl.textContent = formatRecoveryLabel(recoveryMonths);

  updatePortfolioScoreAndRisk(volatility, sharpe, beta, diversityIndex);

  window.latestAnalyticsScores = {
    expectedReturn,
    volatility,
    sharpeRatio: sharpe,
    beta,
    diversityIndex,
    diversityScore: diversityComponentScore,
    portfolioScore,
    componentScores: components,
    riskFreeRate: DEFAULT_RISK_FREE_RATE,
    sortinoRatio: sortino,
    maxDrawdown,
    calmarRatio: calmar,
    alpha,
    expenseRatio: weightedExpenseRatio,
    recoveryMonths,
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
    sortinoRatio: sortino,
    calmarRatio: calmar,
    maxDrawdown,
    recoveryMonths,
    alpha,
    expenseRatio: weightedExpenseRatio,
  });
  updateMetricBreakdown({
    expectedReturn,
    volatility,
    sharpeRatio: sharpe,
    beta,
    portfolioScore,
    diversityIndex,
    sortinoRatio: sortino,
    maxDrawdown,
    calmarRatio: calmar,
    alpha,
    expenseRatio: weightedExpenseRatio,
    recoveryMonths,
  });
}

// Function to update portfolio score and risk level
function updatePortfolioScoreAndRisk(volatility, sharpe, beta, diversityIndex) {
  const { score } = calculatePortfolioScore({
    sharpeRatio: sharpe,
    volatility,
    beta,
    diversityIndex,
  });
  let riskLevel = 'Medium';

  // Determine risk level
  if (volatility > 0.25) riskLevel = 'High';
  else if (volatility > 0.15) riskLevel = 'Medium';
  else riskLevel = 'Low';

  // Update DOM
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

  // Update the risk level bar after setting the text
  updateRiskLevelBar();
}

// Load expected returns from localStorage
function loadExpectedReturnsFromStorage() {
  assetKeys.forEach(key => {
    const stored = localStorage.getItem(`expectedReturn_${key}`);
    if (stored !== null) {
      expectedReturns[key] = parseFloat(stored);
    }
  });
}

// Event listener for refresh button
document.addEventListener('DOMContentLoaded', function() {
  loadExpectedReturnsFromStorage();
  bindContributionControls();
  updateContributionToggleState();

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


