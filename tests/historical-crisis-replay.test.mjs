import assert from 'node:assert/strict';
import {
  getHistoricalCrisisPreset,
  simulateHistoricalCrisisReplay,
} from '../src/lib/historical-crisis-replay.mjs';

function makeSeries(values, startDate = '2020-01-01') {
  const start = new Date(`${startDate}T00:00:00Z`);
  return values.map((price, index) => {
    const date = new Date(start.getTime() + index * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    return { date, price };
  });
}

{
  const preset = getHistoricalCrisisPreset('covid-crash');
  assert.equal(preset.startDate, '2020-02-19');
  assert.equal(preset.endDate, '2020-03-23');
}

{
  const replay = simulateHistoricalCrisisReplay({
    assetSeriesByKey: {
      VOO: makeSeries([100, 80, 100, 105]),
    },
    weightByKey: { VOO: 1 },
    startDate: '2020-01-01',
    endDate: '2020-01-04',
    benchmarkSeries: makeSeries([100, 90, 95, 110]),
  });

  assert.equal(replay.ok, true);
  assert.equal(Number(replay.drawdown.maxDrawdown.toFixed(4)), 0.2);
  assert.equal(replay.drawdown.troughDate, '2020-01-02');
  assert.equal(replay.drawdown.recoveryDate, '2020-01-03');
}

{
  const replay = simulateHistoricalCrisisReplay({
    assetSeriesByKey: {
      VOO: makeSeries([100, 95, 90, 92]),
      VXUS: makeSeries([100, 98], '2020-01-03'),
    },
    weightByKey: { VOO: 0.6, VXUS: 0.4 },
    startDate: '2020-01-01',
    endDate: '2020-01-04',
    benchmarkSeries: makeSeries([100, 96, 93, 97]),
  });

  assert.equal(replay.ok, true);
  assert.deepEqual(replay.coveredKeys, ['VOO']);
  assert.deepEqual(replay.excludedKeys, ['VXUS']);
  assert.equal(Number(replay.coveragePercent.toFixed(1)), 60);
}

{
  const replay = simulateHistoricalCrisisReplay({
    assetSeriesByKey: {
      VOO: makeSeries([100, 95], '2020-01-03'),
    },
    weightByKey: { VOO: 1 },
    startDate: '2020-01-01',
    endDate: '2020-01-04',
    benchmarkSeries: makeSeries([100, 96, 93, 97]),
  });

  assert.equal(replay.ok, false);
  assert.equal(replay.reason, 'NO_COVERAGE');
}

console.log('All historical crisis replay tests passed.');

