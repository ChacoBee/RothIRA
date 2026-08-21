import assert from 'node:assert/strict';
import {
  buildRelativeSignalScores,
  computeSignalMetrics,
  optimizeContributionAllocation,
} from '../src/lib/contribution-optimizer.mjs';

{
  const priceSeries = Array.from({ length: 140 }).map((_, index) => ({
    date: `2025-01-${String((index % 28) + 1).padStart(2, '0')}`,
    price: 100 + index,
  }));

  const metrics = computeSignalMetrics(priceSeries);
  assert.equal(metrics.hasCompleteHistory, true);
  assert(metrics.momentum63 > 0);
  assert(metrics.momentum126 > 0);
  assert.equal(metrics.drawdownFromHigh, 0);
}

{
  const scores = buildRelativeSignalScores({
    VOO: {
      momentum63: 0.12,
      momentum126: 0.18,
      drawdownFromHigh: 0.03,
      hasCompleteHistory: true,
    },
    VXUS: {
      momentum63: 0.02,
      momentum126: 0.04,
      drawdownFromHigh: 0.12,
      hasCompleteHistory: true,
    },
    AVUV: {
      momentum63: -0.08,
      momentum126: -0.02,
      drawdownFromHigh: 0.05,
      hasCompleteHistory: true,
    },
  });

  assert(scores.VOO.score > scores.VXUS.score);
  assert(scores.VXUS.score > scores.AVUV.score);
}

{
  const plan = optimizeContributionAllocation({
    assets: [
      { key: 'VOO', targetPercent: 50, currentValue: 400, price: 100 },
      { key: 'GOOGL', targetPercent: 50, currentValue: 600, price: 100 },
    ],
    depositAmount: 200,
    signalScoreMap: {
      VOO: {
        momentum63: 0.01,
        momentum126: 0.02,
        drawdownFromHigh: 0.01,
        hasCompleteHistory: true,
      },
      GOOGL: {
        momentum63: 0.22,
        momentum126: 0.3,
        drawdownFromHigh: 0.14,
        hasCompleteHistory: true,
      },
    },
  });

  const googl = plan.rows.find((row) => row.key === 'GOOGL');
  const voo = plan.rows.find((row) => row.key === 'VOO');

  assert.equal(plan.mode, 'market-tilt');
  assert(googl.postWeightPercent <= 52 + 1e-6);
  assert(googl.reasons.includes('tilt capped'));
  assert(voo.recommendedAmount > googl.recommendedAmount);
}

{
  const plan = optimizeContributionAllocation({
    assets: [
      { key: 'VOO', targetPercent: 60, currentValue: 500, price: 100 },
      { key: 'VXUS', targetPercent: 40, currentValue: 500, price: 50 },
    ],
    depositAmount: 100,
    signalScoreMap: {
      VOO: {
        momentum63: 0.08,
        momentum126: 0.1,
        drawdownFromHigh: 0.04,
        hasCompleteHistory: true,
      },
      VXUS: {
        momentum63: null,
        momentum126: null,
        drawdownFromHigh: null,
        hasCompleteHistory: false,
      },
    },
  });

  const voo = plan.rows.find((row) => row.key === 'VOO');
  const vxus = plan.rows.find((row) => row.key === 'VXUS');

  assert.equal(plan.mode, 'pure-drift-fallback');
  assert.equal(voo.recommendedAmount, 100);
  assert.equal(vxus.recommendedAmount, 0);
  assert.match(plan.warning, /falls back to pure drift/i);
}

{
  const plan = optimizeContributionAllocation({
    assets: [
      { key: 'VOO', targetPercent: 50, currentValue: 420, price: 105 },
      { key: 'AVUV', targetPercent: 50, currentValue: 380, price: 95 },
    ],
    depositAmount: 120,
    signalScoreMap: {
      VOO: {
        momentum63: 0.09,
        momentum126: 0.11,
        drawdownFromHigh: 0.02,
        hasCompleteHistory: true,
      },
      AVUV: {
        momentum63: 0.05,
        momentum126: 0.06,
        drawdownFromHigh: 0.11,
        hasCompleteHistory: true,
      },
    },
  });

  const avuv = plan.rows.find((row) => row.key === 'AVUV');
  assert(avuv.reasons.includes('underweight'));
  assert(avuv.reasons.includes('trend strong'));
  assert(avuv.reasons.includes('pullback attractive'));
}

console.log('All contribution optimizer tests passed.');

