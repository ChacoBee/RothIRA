import assert from 'node:assert/strict';
import {
  buildRetirementTarget,
  runMonteCarloRetirementLab,
} from '../src/lib/monte-carlo-retirement.mjs';

{
  const target = buildRetirementTarget({
    yearsToRetirement: 10,
    desiredAnnualSpending: 50000,
    inflationRate: 0.02,
  });

  assert(target.inflatedAnnualSpending > 50000);
  assert.equal(Number(target.targetNestEgg.toFixed(2)), Number((target.inflatedAnnualSpending / 0.04).toFixed(2)));
}

{
  const first = runMonteCarloRetirementLab({
    currentPortfolioValue: 100000,
    currentAge: 30,
    retirementAge: 60,
    annualContribution: 7000,
    annualContributionGrowth: 0.03,
    expectedReturn: 0.08,
    volatility: 0.16,
    inflationRate: 0.025,
    desiredAnnualSpending: 50000,
    simulationCount: 2000,
    seed: 7,
  });
  const second = runMonteCarloRetirementLab({
    currentPortfolioValue: 100000,
    currentAge: 30,
    retirementAge: 60,
    annualContribution: 7000,
    annualContributionGrowth: 0.03,
    expectedReturn: 0.08,
    volatility: 0.16,
    inflationRate: 0.025,
    desiredAnnualSpending: 50000,
    simulationCount: 2000,
    seed: 7,
  });

  assert.deepEqual(first.percentiles, second.percentiles);
  assert.equal(first.successProbability, second.successProbability);
}

{
  const result = runMonteCarloRetirementLab({
    currentPortfolioValue: 80000,
    currentAge: 30,
    retirementAge: 55,
    annualContribution: 8000,
    annualContributionGrowth: 0.02,
    expectedReturn: 0.07,
    volatility: 0.14,
    inflationRate: 0.02,
    desiredAnnualSpending: 45000,
    simulationCount: 1500,
    seed: 3,
  });

  assert(result.percentiles.p10 <= result.percentiles.p50);
  assert(result.percentiles.p50 <= result.percentiles.p90);
}

{
  const highSuccess = runMonteCarloRetirementLab({
    currentPortfolioValue: 500000,
    currentAge: 40,
    retirementAge: 50,
    annualContribution: 30000,
    annualContributionGrowth: 0,
    expectedReturn: 0.12,
    volatility: 0.08,
    inflationRate: 0.02,
    desiredAnnualSpending: 30000,
    simulationCount: 1500,
    seed: 9,
  });
  const lowSuccess = runMonteCarloRetirementLab({
    currentPortfolioValue: 20000,
    currentAge: 45,
    retirementAge: 50,
    annualContribution: 2000,
    annualContributionGrowth: 0,
    expectedReturn: 0.02,
    volatility: 0.05,
    inflationRate: 0.03,
    desiredAnnualSpending: 90000,
    simulationCount: 1500,
    seed: 9,
  });

  assert(highSuccess.successProbability > 0.9);
  assert(lowSuccess.successProbability < 0.1);
}

console.log('All Monte Carlo retirement tests passed.');

