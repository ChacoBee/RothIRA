const EPSILON = 1e-6;
const DEFAULT_SEED = 42;
const DEFAULT_SIMULATION_COUNT = 10000;

export function createSeededRandom(seed = DEFAULT_SEED) {
  let state = (Number(seed) >>> 0) || 1;
  return () => {
    state = (Math.imul(1664525, state) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createStandardNormalSource(random) {
  let spare = null;
  return () => {
    if (spare !== null) {
      const cached = spare;
      spare = null;
      return cached;
    }

    const u1 = Math.max(random(), EPSILON);
    const u2 = Math.max(random(), EPSILON);
    const magnitude = Math.sqrt(-2 * Math.log(u1));
    spare = magnitude * Math.sin(2 * Math.PI * u2);
    return magnitude * Math.cos(2 * Math.PI * u2);
  };
}

function percentile(sortedValues, ratio) {
  if (!sortedValues.length) {
    return 0;
  }
  const clampedRatio = Math.min(1, Math.max(0, ratio));
  const index = (sortedValues.length - 1) * clampedRatio;
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  const weight = index - lowerIndex;

  if (lowerIndex === upperIndex) {
    return sortedValues[lowerIndex];
  }

  return (
    sortedValues[lowerIndex] * (1 - weight) +
    sortedValues[upperIndex] * weight
  );
}

export function buildRetirementTarget({
  yearsToRetirement,
  desiredAnnualSpending,
  inflationRate,
}) {
  const years = Math.max(0, Number(yearsToRetirement) || 0);
  const spending = Math.max(0, Number(desiredAnnualSpending) || 0);
  const inflation = Math.max(-0.99, Number(inflationRate) || 0);
  const inflatedAnnualSpending = spending * Math.pow(1 + inflation, years);

  return {
    yearsToRetirement: years,
    inflatedAnnualSpending,
    targetNestEgg: inflatedAnnualSpending / 0.04,
  };
}

export function simulateRetirementPath({
  currentPortfolioValue,
  yearsToRetirement,
  annualContribution,
  annualContributionGrowth,
  expectedReturn,
  volatility,
  seed = DEFAULT_SEED,
} = {}) {
  const startingBalance = Math.max(0, Number(currentPortfolioValue) || 0);
  const years = Math.max(0, Number(yearsToRetirement) || 0);
  const months = Math.round(years * 12);
  const contribution = Math.max(0, Number(annualContribution) || 0) / 12;
  const contributionGrowth = Number(annualContributionGrowth) || 0;
  const annualReturn = Number(expectedReturn) || 0;
  const annualVolatility = Math.max(0, Number(volatility) || 0);
  const monthlyDrift =
    (annualReturn - (annualVolatility * annualVolatility) / 2) / 12;
  const monthlyVolatility = annualVolatility / Math.sqrt(12);
  const random = createSeededRandom(seed);
  const normal = createStandardNormalSource(random);

  let balance = startingBalance;
  let monthlyContribution = contribution;

  for (let month = 0; month < months; month += 1) {
    if (month > 0 && month % 12 === 0) {
      monthlyContribution *= 1 + contributionGrowth;
    }

    const shock = monthlyVolatility > 0 ? normal() : 0;
    const grossReturn = Math.exp(monthlyDrift + monthlyVolatility * shock);
    balance = balance * grossReturn + monthlyContribution;
  }

  return balance;
}

export function runMonteCarloRetirementLab({
  currentPortfolioValue,
  currentAge,
  retirementAge,
  annualContribution,
  annualContributionGrowth,
  expectedReturn,
  volatility,
  inflationRate,
  desiredAnnualSpending,
  simulationCount = DEFAULT_SIMULATION_COUNT,
  seed = DEFAULT_SEED,
} = {}) {
  const yearsToRetirement = Math.max(
    0,
    (Number(retirementAge) || 0) - (Number(currentAge) || 0)
  );
  const simulations = Math.max(1, Math.floor(Number(simulationCount) || 0));
  const target = buildRetirementTarget({
    yearsToRetirement,
    desiredAnnualSpending,
    inflationRate,
  });

  const endingBalances = [];
  for (let index = 0; index < simulations; index += 1) {
    endingBalances.push(
      simulateRetirementPath({
        currentPortfolioValue,
        yearsToRetirement,
        annualContribution,
        annualContributionGrowth,
        expectedReturn,
        volatility,
        seed: seed + index,
      })
    );
  }

  const sortedBalances = [...endingBalances].sort((left, right) => left - right);
  const p10 = percentile(sortedBalances, 0.1);
  const p50 = percentile(sortedBalances, 0.5);
  const p90 = percentile(sortedBalances, 0.9);
  const successCount = sortedBalances.filter(
    (balance) => balance >= target.targetNestEgg - EPSILON
  ).length;
  const successProbability = successCount / simulations;

  return {
    simulationCount: simulations,
    yearsToRetirement,
    endingBalances: sortedBalances,
    successProbability,
    shortfallProbability: 1 - successProbability,
    percentiles: {
      p10,
      p50,
      p90,
    },
    inflatedAnnualSpending: target.inflatedAnnualSpending,
    targetNestEgg: target.targetNestEgg,
    medianSurplus: p50 - target.targetNestEgg,
    impliedSafeAnnualSpend: p50 * 0.04,
  };
}

