// Performance Analytics Module

let performanceChart = null;
let currentPeriod = 1; // 1, 5, 10, 20, 30, 35 years

const PERFORMANCE_BENCHMARK_SYMBOL =
  typeof BENCHMARK_SYMBOL === "string" && BENCHMARK_SYMBOL
    ? BENCHMARK_SYMBOL
    : "^GSPC";
const FALLBACK_STARTING_VALUE = 10000;
const HISTORICAL_CACHE = new Map();
const RANGE_CONFIG = [
  { maxYears: 1, range: "1y", interval: "1d", periodsPerYear: 252 },
  { maxYears: 5, range: "5y", interval: "1wk", periodsPerYear: 52 },
  { maxYears: 10, range: "10y", interval: "1wk", periodsPerYear: 52 },
  { maxYears: 20, range: "20y", interval: "1mo", periodsPerYear: 12 },
  { maxYears: Infinity, range: "max", interval: "1mo", periodsPerYear: 12 },
];

const SYMBOL_OVERRIDES = {
  "^GSPC": "^GSPC",
};

function setPerformanceLoading(isLoading) {
  const metricIds = [
    "annualizedReturn",
    "benchmarkReturn",
    "excessAnnualizedReturn",
    "totalReturn",
    "benchmarkTotalReturn",
    "excessTotalReturn",
    "maxDrawdown",
    "performanceVolatility",
    "portfolioSharpe",
    "informationRatio",
    "trackingError",
  ];

  metricIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (isLoading) {
      el.textContent = "Loading...";
      el.dataset.loading = "1";
    } else {
      delete el.dataset.loading;
    }
  });

  const refreshBtn = document.getElementById("refreshPerformanceBtn");
  if (refreshBtn) {
    refreshBtn.disabled = isLoading;
    refreshBtn.textContent = isLoading ? "Updating..." : "Refresh Performance";
  }
}

function getPortfolioComposition() {
  const values = {};
  let total = 0;

  assetKeys.forEach((key) => {
    const valueInput = document.querySelector(
      `input[data-stock="${key}"][data-field="currentValue"]`
    );
    let value = parseFloat(valueInput?.value || "0");
    if (Number.isNaN(value) || value < 0) {
      value = 0;
    }
    if (value === 0) {
      value = initialStockData[key]?.currentValue || 0;
    }
    if (value > 0) {
      values[key] = value;
      total += value;
    }
  });

  if (total === 0) {
    // Fall back to target allocations if no current value exists
    let fallbackTotal = 0;
    assetKeys.forEach((key) => {
      const target = initialStockData[key]?.target || 0;
      if (target > 0) {
        const pseudoValue = target;
        values[key] = pseudoValue;
        fallbackTotal += pseudoValue;
      }
    });
    total = fallbackTotal || FALLBACK_STARTING_VALUE;
  }

  const weights = {};
  Object.entries(values).forEach(([key, value]) => {
    weights[key] = total > 0 ? value / total : 0;
  });

  return {
    weights,
    totalValue: total > 0 ? total : FALLBACK_STARTING_VALUE,
  };
}

function getRangeConfig(years) {
  return RANGE_CONFIG.find((cfg) => years <= cfg.maxYears) || RANGE_CONFIG[RANGE_CONFIG.length - 1];
}

function getSymbolForHistoricalFetch(assetKey) {
  return SYMBOL_OVERRIDES[assetKey] || assetKey;
}

async function fetchHistoricalSeries(symbol, range, interval) {
  const cacheKey = `${symbol}|${range}|${interval}`;
  if (HISTORICAL_CACHE.has(cacheKey)) {
    return HISTORICAL_CACHE.get(cacheKey);
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
    symbol
  )}?range=${range}&interval=${interval}&events=div%2Csplits`;

  const response = await fetch(url, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Failed to fetch historical data for ${symbol} (${response.status}).`);
  }

  const payload = await response.json();
  const result = payload?.chart?.result?.[0];
  const timestamps = result?.timestamp || [];
  const adjClose = result?.indicators?.adjclose?.[0]?.adjclose || result?.indicators?.quote?.[0]?.close || [];

  if (!timestamps.length || !adjClose.length) {
    throw new Error(`No historical price data returned for ${symbol}.`);
  }

  const series = timestamps
    .map((ts, index) => ({
      time: ts * 1000,
      price: adjClose[index],
    }))
    .filter((point) => Number.isFinite(point.price));

  if (!series.length) {
    throw new Error(`Filtered historical data empty for ${symbol}.`);
  }

  HISTORICAL_CACHE.set(cacheKey, series);
  return series;
}

function getCommonTimestamps(seriesList) {
  if (!seriesList.length) return [];
  let common = new Set(seriesList[0].map((point) => point.time));
  for (let i = 1; i < seriesList.length; i += 1) {
    const seriesTimes = new Set(seriesList[i].map((point) => point.time));
    common = new Set([...common].filter((ts) => seriesTimes.has(ts)));
    if (!common.size) break;
  }
  return [...common].sort((a, b) => a - b);
}

async function prepareHistoricalPerformance(years) {
  const { weights, totalValue } = getPortfolioComposition();
  const activeAssets = Object.entries(weights).filter(([, weight]) => weight > 0);
  if (!activeAssets.length) {
    throw new Error("No active holdings available to build historical performance.");
  }

  const { range, interval, periodsPerYear } = getRangeConfig(years);

  const assetSeriesPromises = activeAssets.map(async ([key, weight]) => {
    const symbol = getSymbolForHistoricalFetch(key);
    const series = await fetchHistoricalSeries(symbol, range, interval);
    return { key, weight, series };
  });

  const assetSeries = await Promise.all(assetSeriesPromises);
  const benchmarkSeries = await fetchHistoricalSeries(
    PERFORMANCE_BENCHMARK_SYMBOL,
    range,
    interval
  );

  const commonTimestamps = getCommonTimestamps([
    ...assetSeries.map((item) => item.series),
    benchmarkSeries,
  ]);

  if (commonTimestamps.length < 2) {
    throw new Error("Insufficient overlapping historical data across holdings and benchmark.");
  }

  const assetMaps = assetSeries.map(({ key, weight, series }) => ({
    key,
    weight,
    priceMap: new Map(series.map((point) => [point.time, point.price])),
  }));

  const benchmarkMap = new Map(benchmarkSeries.map((point) => [point.time, point.price]));
  const basePrices = {};

  assetMaps.forEach(({ key, priceMap }) => {
    const firstPrice = priceMap.get(commonTimestamps[0]);
    if (!Number.isFinite(firstPrice) || firstPrice === 0) {
      throw new Error(`Invalid starting price detected for ${key}.`);
    }
    basePrices[key] = firstPrice;
  });

  const benchmarkBase = benchmarkMap.get(commonTimestamps[0]);
  if (!Number.isFinite(benchmarkBase) || benchmarkBase === 0) {
    throw new Error("Invalid starting price detected for benchmark.");
  }

  const portfolioValues = [];
  const benchmarkValues = [];

  commonTimestamps.forEach((ts) => {
    let portfolioValue = 0;
    assetMaps.forEach(({ key, weight, priceMap }) => {
      const price = priceMap.get(ts);
      if (!Number.isFinite(price) || !Number.isFinite(basePrices[key])) return;
      const growth = price / basePrices[key];
      portfolioValue += totalValue * weight * growth;
    });
    const benchmarkPrice = benchmarkMap.get(ts);
    const benchmarkGrowth = benchmarkPrice / benchmarkBase;
    portfolioValues.push(Number.isFinite(portfolioValue) ? portfolioValue : 0);
    benchmarkValues.push(Number.isFinite(benchmarkGrowth) ? totalValue * benchmarkGrowth : 0);
  });

  const yearsCovered =
    (commonTimestamps[commonTimestamps.length - 1] - commonTimestamps[0]) /
    (1000 * 60 * 60 * 24 * 365.25);

  const rangeLabel =
    Number.isFinite(yearsCovered) && yearsCovered > 0
      ? `Real data (~${yearsCovered.toFixed(1)}y)`
      : range === "max"
        ? "Real data (max range)"
        : `Real data (${range})`;

  return {
    timestamps: commonTimestamps,
    portfolioValues,
    benchmarkValues,
    periodsPerYear,
    yearsCovered,
    sourceLabel: rangeLabel,
  };
}

function createSyntheticTimestamps(length, years) {
  const now = Date.now();
  const totalMilliseconds = years * 365.25 * 24 * 60 * 60 * 1000;
  const start = now - totalMilliseconds;
  const step = totalMilliseconds / Math.max(1, length - 1);
  return Array.from({ length }, (_, index) => start + index * step);
}

function formatDateLabel(timestamp, approxYears) {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "";
  if (approxYears <= 1.5) {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  }
  if (approxYears <= 5) {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  return date.toLocaleDateString("en-US", { year: "numeric" });
}

// Function to simulate portfolio performance over time using accurate expected returns
function createSeededRandom(seed = 123456789) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;
  return function random() {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };
}

function generateStandardNormal(random) {
  let u = 0;
  let v = 0;
  while (u === 0) u = random();
  while (v === 0) v = random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function simulatePerformance(targets, years) {
  const dataPoints = years * 12; // Monthly data points
  const { totalValue } = getPortfolioComposition();
  const startingValue = totalValue > 0 ? totalValue : FALLBACK_STARTING_VALUE;

  const weights = {};
  let totalWeight = 0;
  assetKeys.forEach((key) => {
    const targetWeight = typeof targets[key] === "number" ? targets[key] : 0;
    if (targetWeight > 0) {
      weights[key] = targetWeight;
      totalWeight += targetWeight;
    } else {
      weights[key] = 0;
    }
  });

  if (totalWeight <= 0) {
    const equalWeight = 1 / assetKeys.length;
    assetKeys.forEach((key) => {
      weights[key] = equalWeight;
    });
  } else {
    assetKeys.forEach((key) => {
      weights[key] = weights[key] / totalWeight;
    });
  }

  const portfolioValues = [startingValue];
  const benchmarkValues = [startingValue];
  let portfolioValue = startingValue;
  let benchmarkValue = startingValue;

  const rand = createSeededRandom(987654321);
  const benchmarkMean = 0.08 / 12;
  const benchmarkVol = 0.16 / Math.sqrt(12); // 16% annualised volatility

  for (let i = 0; i < dataPoints; i += 1) {
    let monthlyReturn = 0;
    assetKeys.forEach((key) => {
      const weight = weights[key] || 0;
      if (weight <= 0) return;
      const mean = (expectedReturns[key] || 0) / 12;
      const assetVolAnnual = volatilities[key] || 0.2;
      const assetVolMonthly = assetVolAnnual / Math.sqrt(12);
      const shock = generateStandardNormal(rand);
      const assetReturn = mean + shock * assetVolMonthly;
      monthlyReturn += weight * assetReturn;
    });

    const boundedReturn = Math.max(-0.9, monthlyReturn);
    portfolioValue *= 1 + boundedReturn;
    portfolioValues.push(portfolioValue);

    const benchmarkShock = generateStandardNormal(rand);
    const benchReturn = benchmarkMean + benchmarkShock * benchmarkVol;
    const boundedBenchReturn = Math.max(-0.9, benchReturn);
    benchmarkValue *= 1 + boundedBenchReturn;
    benchmarkValues.push(benchmarkValue);
  }

  return { portfolioValues, benchmarkValues };
}

// Calculate performance metrics
function calculateMetrics(portfolioValues, benchmarkValues, periodsPerYear) {
  if (!portfolioValues.length || portfolioValues.length !== benchmarkValues.length) {
    return {
      annualizedReturn: 0,
      benchmarkReturn: 0,
      excessAnnualizedReturn: 0,
      totalReturn: 0,
      benchmarkTotalReturn: 0,
      excessTotalReturn: 0,
      maxDrawdown: 0,
      volatility: 0,
      trackingError: 0,
      sharpeRatio: 0,
      informationRatio: 0,
    };
  }

  const initialValue = portfolioValues[0] || 0;
  const finalValue = portfolioValues[portfolioValues.length - 1] || 0;
  const totalReturn = initialValue > 0 ? (finalValue - initialValue) / initialValue : 0;
  const totalPeriods = Math.max(1, portfolioValues.length - 1);
  const years = periodsPerYear > 0 ? totalPeriods / periodsPerYear : 0;
  const annualizedReturn =
    years > 0 && totalReturn > -1 ? Math.pow(1 + totalReturn, 1 / years) - 1 : 0;

  let peak = initialValue;
  let maxDrawdown = 0;
  portfolioValues.forEach((value) => {
    if (value > peak) peak = value;
    if (peak > 0) {
      const drawdown = (peak - value) / peak;
      if (drawdown > maxDrawdown) maxDrawdown = drawdown;
    }
  });

  const periodReturns = [];
  const excessReturns = [];
  for (let i = 1; i < portfolioValues.length; i += 1) {
    const prev = portfolioValues[i - 1];
    const current = portfolioValues[i];
    const benchPrev = benchmarkValues[i - 1];
    const benchCurrent = benchmarkValues[i];

    let portfolioPeriodReturn = Number.NaN;
    if (prev > 0) {
      portfolioPeriodReturn = (current - prev) / prev;
      periodReturns.push(portfolioPeriodReturn);
    }

    let benchmarkPeriodReturn = Number.NaN;
    if (benchPrev > 0) {
      benchmarkPeriodReturn = (benchCurrent - benchPrev) / benchPrev;
    }

    if (Number.isFinite(portfolioPeriodReturn) && Number.isFinite(benchmarkPeriodReturn)) {
      excessReturns.push(portfolioPeriodReturn - benchmarkPeriodReturn);
    }
  }

  const avgPeriodReturn =
    periodReturns.reduce((sum, value) => sum + value, 0) / (periodReturns.length || 1);
  const variance =
    periodReturns.reduce((sum, value) => sum + Math.pow(value - avgPeriodReturn, 2), 0) /
    (periodReturns.length || 1);
  const volatility = Math.sqrt(Math.max(variance, 0) * periodsPerYear);

  const benchInitial = benchmarkValues[0] || 0;
  const benchFinal = benchmarkValues[benchmarkValues.length - 1] || 0;
  const benchmarkTotalReturn =
    benchInitial > 0 ? (benchFinal - benchInitial) / benchInitial : 0;
  const benchmarkReturn =
    years > 0 && benchmarkTotalReturn > -1
      ? Math.pow(1 + benchmarkTotalReturn, 1 / years) - 1
      : 0;

  const excessAnnualizedReturn = annualizedReturn - benchmarkReturn;
  const excessTotalReturn = totalReturn - benchmarkTotalReturn;

  const excessAvg =
    excessReturns.reduce((sum, value) => sum + value, 0) / (excessReturns.length || 1);
  const excessVariance =
    excessReturns.reduce((sum, value) => sum + Math.pow(value - excessAvg, 2), 0) /
    (excessReturns.length || 1);
  const trackingErrorRaw = Math.sqrt(Math.max(excessVariance, 0) * periodsPerYear);

  const EPSILON = 1e-4;
  const trackingError = Math.abs(trackingErrorRaw) < EPSILON ? 0 : trackingErrorRaw;
  const safeVolatility = Math.abs(volatility) < EPSILON ? 0 : volatility;

  const riskFreeRate = 0.03;
  const sharpeRatioRaw =
    safeVolatility > 0 ? (annualizedReturn - riskFreeRate) / safeVolatility : 0;
  const informationRatioRaw =
    trackingError > 0 ? excessAnnualizedReturn / trackingError : 0;

  const clampRatio = (value) => {
    if (!Number.isFinite(value)) return 0;
    if (value > 99) return 99;
    if (value < -99) return -99;
    return value;
  };

  const sharpeRatio = clampRatio(sharpeRatioRaw);
  const informationRatio = clampRatio(informationRatioRaw);

  return {
    annualizedReturn,
    benchmarkReturn,
    excessAnnualizedReturn,
    totalReturn,
    benchmarkTotalReturn,
    excessTotalReturn,
    maxDrawdown,
    volatility: safeVolatility,
    trackingError,
    sharpeRatio,
    informationRatio,
  };
}

function formatMetricValue(value, format = "percent") {
  if (!Number.isFinite(value)) return "N/A";

  switch (format) {
    case "ratio":
      return value.toFixed(2);
    case "signedPercent": {
      const formatted = formatPercent(value * 100);
      return value > 0 ? `+${formatted}` : formatted;
    }
    case "percent":
    default:
      return formatPercent(value * 100);
  }
}

function updatePerformanceMetricsDisplay(metrics, sourceLabel) {
  const mapping = [
    { id: "annualizedReturn", value: metrics.annualizedReturn, format: "percent" },
    { id: "benchmarkReturn", value: metrics.benchmarkReturn, format: "percent" },
    { id: "excessAnnualizedReturn", value: metrics.excessAnnualizedReturn, format: "signedPercent" },
    { id: "totalReturn", value: metrics.totalReturn, format: "percent" },
    { id: "benchmarkTotalReturn", value: metrics.benchmarkTotalReturn, format: "percent" },
    { id: "excessTotalReturn", value: metrics.excessTotalReturn, format: "signedPercent" },
    { id: "maxDrawdown", value: metrics.maxDrawdown, format: "percent" },
    { id: "performanceVolatility", value: metrics.volatility, format: "percent" },
    { id: "portfolioSharpe", value: metrics.sharpeRatio, format: "ratio" },
    { id: "informationRatio", value: metrics.informationRatio, format: "ratio" },
    { id: "trackingError", value: metrics.trackingError, format: "percent" },
  ];

  mapping.forEach(({ id, value, format }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = formatMetricValue(value, format);
    delete el.dataset.loading;
  });

  const benchmarkEl = document.getElementById("benchmarkReturn");
  if (benchmarkEl && sourceLabel) {
    benchmarkEl.title = `Data source: ${sourceLabel}`;
  }
}

// Render performance chart
function renderPerformanceChart(timestamps, portfolioValues, benchmarkValues, approxYears) {
  const ctx = document.getElementById("performanceChart");
  if (!ctx) return;

  if (performanceChart) {
    performanceChart.destroy();
  }

  const labels = timestamps.map((ts) => formatDateLabel(ts, approxYears));
  const darkModeActive =
    typeof isDarkMode !== "undefined"
      ? isDarkMode
      : document.documentElement.classList.contains("dark-mode");

  performanceChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Custom Portfolio",
          data: portfolioValues,
          borderColor: "rgba(255, 106, 26, 1)",
          backgroundColor: "rgba(255, 106, 26, 0.15)",
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.15,
          fill: true,
        },
        {
          label: "S&P 500 Benchmark",
          data: benchmarkValues,
          borderColor: "rgba(82, 208, 220, 1)",
          backgroundColor: "rgba(82, 208, 220, 0.18)",
          borderDash: [6, 6],
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.15,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: "index",
      },
      plugins: {
        tooltip: {
          callbacks: {
            label(context) {
              const label = context.dataset.label || "";
              const value = context.parsed.y || 0;
              return `${label}: ${formatCurrency(value)}`;
            },
          },
        },
        legend: {
          labels: {
            color: darkModeActive ? "#e2e8f0" : "#1f2937",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: darkModeActive ? "#cbd5f5" : "#1f2937",
            maxTicksLimit: 12,
          },
          grid: {
            color: darkModeActive ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.4)",
          },
        },
        y: {
          beginAtZero: false,
          ticks: {
            color: darkModeActive ? "#cbd5f5" : "#1f2937",
            callback(value) {
              return `$${Number(value).toLocaleString()}`;
            },
          },
          grid: {
            color: darkModeActive ? "rgba(148, 163, 184, 0.2)" : "rgba(203, 213, 225, 0.4)",
          },
        },
      },
    },
  });
}

// Initialize performance analytics
async function initializePerformance() {
  setPerformanceLoading(true);

  try {
    const {
      timestamps,
      portfolioValues,
      benchmarkValues,
      periodsPerYear,
      yearsCovered,
      sourceLabel,
    } = await prepareHistoricalPerformance(currentPeriod);

    const metrics = calculateMetrics(portfolioValues, benchmarkValues, periodsPerYear);
    updatePerformanceMetricsDisplay(metrics, sourceLabel);
    renderPerformanceChart(
      timestamps,
      portfolioValues,
      benchmarkValues,
      yearsCovered || currentPeriod
    );
  } catch (error) {
    console.error("Falling back to simulated performance data:", error);
    const targets = getCurrentTargets();
    const { portfolioValues, benchmarkValues } = simulatePerformance(targets, currentPeriod);
    const timestamps = createSyntheticTimestamps(portfolioValues.length, currentPeriod);
    const metrics = calculateMetrics(portfolioValues, benchmarkValues, 12);
    updatePerformanceMetricsDisplay(metrics, "Modelled projection");
    renderPerformanceChart(timestamps, portfolioValues, benchmarkValues, currentPeriod);
  } finally {
    setPerformanceLoading(false);
  }
}

// Populate Asset Performance Table
function populateAssetPerformanceTable() {
  const tableBody = document.getElementById('assetPerformanceTable');
  tableBody.innerHTML = '';

  const years = [1, 5, 10, 15, 20, 30, 35];
  const totals = {1: 0, 5: 0, 10: 0, 15: 0, 20: 0, 30: 0, 35: 0};

  assetKeys.forEach(key => {
    const row = document.createElement('tr');
    row.classList.add('text-sm', 'text-gray-700', 'dark:text-gray-300', 'hover:bg-blue-50/50', 'dark:hover:bg-slate-700/50', 'transition-colors');

    let rowHTML = `<td class="px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">${key}</td>`;

    // Get current value from section 6A
    const currentValueInput = document.querySelector(`input[data-stock="${key}"][data-field="currentValue"]`);
    const P0 = currentValueInput ? parseFloat(currentValueInput.value) || 0 : initialStockData[key].currentValue;

    // Get monthly allocation from section 6B
    const allocationEl = document.getElementById(`allocation-amount-${key}`);
    const PMT = allocationEl ? parseFloat(allocationEl.textContent.replace(/[$,]/g, '')) || 0 : 0;

    // Get expected return
    const r = expectedReturns[key];

    years.forEach((year, index) => {
      // Future Value calculation: FV = (P0 * (1 + r)^t) + (PMT * ((1 + r/12)^(12*t) - 1) / (r/12))
      const FV_initial = P0 * Math.pow(1 + r, year);
      const FV_monthly = PMT * (Math.pow(1 + (r / 12), (12 * year)) - 1) / (r / 12);
      const futureValue = FV_initial + FV_monthly;
      totals[year] += futureValue;
      const formattedValue = formatCurrency(futureValue);
      rowHTML += `<td class="px-2 py-3 text-right font-bold text-green-600 dark:text-green-400">${formattedValue}</td>`;
    });

    row.innerHTML = rowHTML;
    tableBody.appendChild(row);
  });

  // Update totals in tfoot
  years.forEach(year => {
    const totalEl = document.getElementById(`total${year}Y`);
    if (totalEl) {
      totalEl.textContent = formatCurrency(totals[year]);
    }
  });
}

// Event listeners for period buttons
document.addEventListener('DOMContentLoaded', function() {
  const period1YBtn = document.getElementById('period1Y');
  const period5YBtn = document.getElementById('period5Y');
  const period10YBtn = document.getElementById('period10Y');
  const refreshBtn = document.getElementById('refreshPerformanceBtn');

  if (period1YBtn) {
    period1YBtn.addEventListener('click', function() {
      currentPeriod = 1;
      period1YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      period5YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period10YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      initializePerformance();
    });
  }

  if (period5YBtn) {
    period5YBtn.addEventListener('click', function() {
      currentPeriod = 5;
      period1YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period5YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      period10YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      initializePerformance();
    });
  }

  if (period10YBtn) {
    period10YBtn.addEventListener('click', function() {
      currentPeriod = 10;
      period1YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period5YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period10YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      period20YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period30YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period35YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      initializePerformance();
    });
  }

  const period20YBtn = document.getElementById('period20Y');
  const period30YBtn = document.getElementById('period30Y');
  const period35YBtn = document.getElementById('period35Y');

  if (period20YBtn) {
    period20YBtn.addEventListener('click', function() {
      currentPeriod = 20;
      period1YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period5YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period10YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period20YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      period30YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period35YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      initializePerformance();
    });
  }

  if (period30YBtn) {
    period30YBtn.addEventListener('click', function() {
      currentPeriod = 30;
      period1YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period5YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period10YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period20YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period30YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      period35YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      initializePerformance();
    });
  }

  if (period35YBtn) {
    period35YBtn.addEventListener('click', function() {
      currentPeriod = 35;
      period1YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period5YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period10YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period20YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period30YBtn.className = 'bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700';
      period35YBtn.className = 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700';
      initializePerformance();
    });
  }

  if (refreshBtn) {
    refreshBtn.addEventListener('click', function() {
      initializePerformance();
      populateAssetPerformanceTable();
    });
  }

  // Initial render
  initializePerformance();
  populateAssetPerformanceTable();
});
