
(() => {
  const API_ENDPOINT =
    "https://production.dataviz.cnn.io/index/fearandgreed/graphdata";
  const ALTERNATIVE_URL =
    "https://api.allorigins.win/raw?url=https%3A%2F%2Fapi.alternative.me%2Ffng%2F%3Flimit%3D1%26format%3Djson";
  const STOOQ_BASE_URL = "https://api.allorigins.win/raw?url=";

  const STORAGE_KEY = "fearGreedCache";
  const ALERT_STORAGE_KEY = "fearGreedAlertConfig";
  const HISTORY_TARGETS = [
    { label: "Yesterday", offset: 1 },
    { label: "Last week", offset: 7 },
    { label: "Last month", offset: 30 },
  ];
  const COMPARISON_ASSETS = {
    SPY: { symbol: "spy.us", label: "S&P 500 (SPY)" },
    VIXY: { symbol: "vixy.us", label: "Volatility Complex (VIX proxy)" },
    BTC: { symbol: "btc.us", label: "Bitcoin (BTC-USD)" },
  };
  const RADAR_AXES = [
    { key: "market", label: "Market breadth" },
    { key: "social", label: "Social pulse" },
    { key: "flows", label: "Fund flows" },
    { key: "options", label: "Options skew" },
  ];
  const DEFAULT_ALERT_CONFIG = {
    lower: 25,
    upper: 75,
    enabled: false,
    sound: false,
    flash: true,
  };
  const FORECAST_LOOKBACK = 60;
  const FORECAST_HORIZON = 14;
  const COMPARE_WINDOW = 14;

  const SYNTHETIC_DATASET = (() => {
    const days = 260;
    const dayMs = 24 * 60 * 60 * 1000;
    const start = Date.now() - days * dayMs;
    const buildSeries = (base, drift, volatility, volumeBase) => {
      let level = base;
      const series = [];
      for (let i = 0; i < days; i += 1) {
        const progress = i / days;
        const wave =
          Math.sin(i / 9.5) * volatility * 0.65 +
          Math.cos(i / 17.2) * volatility * 0.35 +
          Math.sin(i / 3.8) * volatility * 0.2;
        level = Math.max(5, level * (1 + drift + wave * 0.6));
        const close = Number(level.toFixed(2));
        const high = Number((close * (1 + volatility * 0.9)).toFixed(2));
        const low = Number((close * (1 - volatility * 0.9)).toFixed(2));
        const volume =
          volumeBase *
          (1 +
            0.18 * Math.sin(i / 4.2) +
            0.12 * Math.cos(i / 6.4) +
            0.05 * Math.sin(progress * Math.PI * 2));
        series.push({
          date: new Date(start + i * dayMs),
          close,
          high,
          low,
          volume: Math.max(10_000, Math.round(volume)),
        });
      }
      return series;
    };

    return {
      altSentiment: {
        value: 42,
        label: "Fear",
      },
      SPY: buildSeries(420, 0.00018, 0.008, 82_000_000),
      VIXY: buildSeries(25, -0.00012, 0.025, 6_200_000),
      BTC: buildSeries(42_000, 0.00065, 0.021, 18_000),
    };
  })();

  const SYMBOL_LOOKUP = {
    "spy.us": "SPY",
    "vixy.us": "VIXY",
    "btc.us": "BTC",
  };

  const SAMPLE_DATA = (() => {
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;
    return Array.from({ length: 31 }).map((_, index) => {
      const value = 35 + Math.round(Math.sin(index / 3.5) * 12 + 15);
      const timestamp = Math.floor((now - index * day) / 1000);
      const classification =
        value >= 75
          ? "Extreme Greed"
          : value >= 60
          ? "Greed"
          : value >= 45
          ? "Neutral"
          : value >= 25
          ? "Fear"
          : "Extreme Fear";
      return {
        value: String(Math.max(0, Math.min(100, value))),
        value_classification: classification,
        timestamp: String(timestamp),
        time_until_update: "43200",
      };
    });
  })();

  let gaugeChart = null;
  let radarChart = null;
  let forecastChart = null;
  let correlationChart = null;
  let scatterChart = null;
  let countdownTimer = null;
  let latestSeries = [];
  let radarCache = null;
  let comparisonCache = {};
  let alertConfig = loadAlertConfig();
  let alertState = { activeZone: null, flashActive: false, flashZone: null };
  let audioCtx = null;

  function $(id) {
    return document.getElementById(id);
  }

  function clamp(value, min, max) {
    if (!Number.isFinite(value)) return min;
    return Math.min(max, Math.max(min, value));
  }

  function average(values) {
    if (!Array.isArray(values) || values.length === 0) return 0;
    const valid = values.filter((val) => Number.isFinite(val));
    if (!valid.length) return 0;
    const total = valid.reduce((acc, val) => acc + val, 0);
    return total / valid.length;
  }
  function variance(values) {
    if (!Array.isArray(values) || values.length < 2) return 0;
    const mean = average(values);
    const sq = values.reduce((acc, val) => {
      if (!Number.isFinite(val)) {
        return acc;
      }
      const diff = val - mean;
      return acc + diff * diff;
    }, 0);
    return sq / (values.length - 1);
  }

  function standardDeviation(values) {
    return Math.sqrt(Math.max(variance(values), 0));
  }

  function covariance(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return 0;
    const length = Math.min(a.length, b.length);
    if (length < 2) return 0;
    const xMean = average(a.slice(0, length));
    const yMean = average(b.slice(0, length));
    let sum = 0;
    for (let i = 0; i < length; i += 1) {
      const x = a[i];
      const y = b[i];
      if (!Number.isFinite(x) || !Number.isFinite(y)) {
        continue;
      }
      sum += (x - xMean) * (y - yMean);
    }
    return sum / (length - 1);
  }

  function correlation(a, b) {
    const cov = covariance(a, b);
    const sdA = standardDeviation(a);
    const sdB = standardDeviation(b);
    if (!sdA || !sdB) return 0;
    return clamp(cov / (sdA * sdB), -1, 1);
  }

  function toClassificationLabel(label) {
    if (!label) return "--";
    return String(label)
      .split(/\s+/)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function estimateTimeUntilUpdate(timestampInput) {
    const timestampMs =
      typeof timestampInput === "number"
        ? timestampInput
        : Date.parse(timestampInput);
    if (!Number.isFinite(timestampMs)) {
      return 0;
    }
    const nextRefresh = timestampMs + 24 * 60 * 60 * 1000;
    return Math.max(0, Math.round((nextRefresh - Date.now()) / 1000));
  }

  function normalizeFearGreedPayload(payload) {
    if (!payload || typeof payload !== "object") {
      return null;
    }

    const rawHistory = Array.isArray(
      payload?.fear_and_greed_historical?.data
    )
      ? payload.fear_and_greed_historical.data
      : [];

    const history = rawHistory
      .map((point) => {
        const timestampMs = Number(point?.x);
        const score = Number(point?.y);
        if (!Number.isFinite(timestampMs) || !Number.isFinite(score)) {
          return null;
        }
        return {
          value: String(Math.round(score)),
          value_raw: Number.isFinite(score) ? score : null,
          value_classification: toClassificationLabel(point?.rating),
          timestamp: String(Math.round(timestampMs / 1000)),
          time_until_update: "0",
        };
      })
      .filter(Boolean)
      .sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

    const latest = payload?.fear_and_greed;
    if (latest && Number.isFinite(Number(latest.score))) {
      const intradayScore = Number(latest.score);
      const previousCloseScore = Number(latest.previous_close);
      const parsedTimestamp = Date.parse(latest.timestamp);
      const timestampMs = Number.isFinite(parsedTimestamp)
        ? parsedTimestamp
        : Number(history[0]?.timestamp) * 1000 || NaN;
      const normalizedLatest = {
        value: String(Math.round(intradayScore)),
        value_raw: Number.isFinite(intradayScore) ? intradayScore : null,
        previous_close: Number.isFinite(previousCloseScore)
          ? Math.round(previousCloseScore)
          : null,
        previous_close_raw: Number.isFinite(previousCloseScore)
          ? previousCloseScore
          : null,
        value_classification: toClassificationLabel(latest.rating),
        timestamp: Number.isFinite(timestampMs)
          ? String(Math.round(timestampMs / 1000))
          : history[0]?.timestamp || "",
        time_until_update: String(estimateTimeUntilUpdate(timestampMs)),
      };
      const duplicateIndex = history.findIndex(
        (entry) => entry.timestamp === normalizedLatest.timestamp
      );
      if (duplicateIndex !== -1) {
        history.splice(duplicateIndex, 1);
      }
      history.unshift(normalizedLatest);
    }

    return history.length > 0 ? history : null;
  }

  function initGauge(canvas) {
    if (!canvas || typeof Chart === "undefined") {
      return null;
    }
    return new Chart(canvas.getContext("2d"), {
      type: "doughnut",
      data: {
        labels: [
          "Extreme Fear",
          "Fear",
          "Neutral",
          "Greed",
          "Extreme Greed",
        ],
        datasets: [
          {
            data: [20, 20, 20, 20, 20],
            backgroundColor: [
              "#d64d3f",
              "#ff6a1a",
              "#9faed6",
              "#52d0d3",
              "#1f4d63",
            ],
            borderWidth: 0,
            borderJoinStyle: "round",
            hoverOffset: 0,
            spacing: 4,
            cutout: "65%",
          },
        ],
      },
      options: {
        rotation: -90,
        circumference: 180,
        responsive: true,
        maintainAspectRatio: false,
        animation: { animateRotate: true, duration: 900 },
        plugins: { tooltip: { enabled: false }, legend: { display: false } },
      },
    });
  }

  function rotateNeedle(needleEl, value) {
    if (!needleEl) {
      return;
    }
    const clamped = clamp(Number(value) || 0, 0, 100);
    const rotation = clamped * 1.8 - 90;
    needleEl.style.setProperty("--needle-rotation", `${rotation}deg`);
  }

  function formatTimestamp(ts) {
    if (!ts) return "--";
    const numeric = Number(ts);
    const date = Number.isNaN(numeric)
      ? new Date(ts)
      : new Date(numeric * 1000);
    if (Number.isNaN(date.getTime())) {
      return "--";
    }
    return date.toLocaleString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function formatShortDate(ts) {
    const date = new Date(ts);
    if (Number.isNaN(date.getTime())) return "--";
    return date
      .toLocaleDateString([], {
        month: "short",
        day: "numeric",
      })
      .replace(",", "");
  }
  function formatCountdown(seconds) {
    if (!Number.isFinite(seconds) || seconds <= 0) {
      return "Updating soon";
    }
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hrs <= 0 && mins <= 0) {
      return "Less than a minute";
    }
    if (hrs <= 0) {
      return `${mins} min`;
    }
    if (mins <= 0) {
      return `${hrs} hr`;
    }
    return `${hrs} hr ${mins} min`;
  }

  function startCountdown(targetSeconds, displayEl) {
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    if (!displayEl) {
      return;
    }
    let remaining = Math.max(0, Number(targetSeconds) || 0);
    displayEl.textContent = formatCountdown(remaining);
    if (remaining <= 0) {
      return;
    }
    countdownTimer = setInterval(() => {
      remaining = Math.max(0, remaining - 60);
      displayEl.textContent = formatCountdown(remaining);
      if (remaining <= 0) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }, 60000);
  }

  function setBadge(badgeEl, classification) {
    if (!badgeEl) return;
    const baseClass = "fear-greed-badge";
    const key = (classification || "").toLowerCase().replace(/\s+/g, "-");
    badgeEl.className = baseClass;
    if (key) {
      badgeEl.classList.add(`${baseClass}--${key}`);
    }
    badgeEl.textContent = classification || "--";
  }

  function setChange(changeEl, latestValue, previousValue, previousLabel) {
    if (!changeEl) return;
    const latest = Number(latestValue);
    const prev = Number(previousValue);
    if (!Number.isFinite(latest) || !Number.isFinite(prev)) {
      changeEl.textContent = "Not enough history to compare";
      changeEl.classList.remove(
        "fear-greed-change--up",
        "fear-greed-change--down"
      );
      return;
    }
    const delta = latest - prev;
    const formatted =
      delta > 0
        ? `+${delta.toFixed(0)} pts vs ${previousLabel}`
        : `${delta.toFixed(0)} pts vs ${previousLabel}`;
    changeEl.textContent = formatted;
    changeEl.classList.remove(
      "fear-greed-change--up",
      "fear-greed-change--down"
    );
    if (delta > 0) {
      changeEl.classList.add("fear-greed-change--up");
    } else if (delta < 0) {
      changeEl.classList.add("fear-greed-change--down");
    }
  }

  function computeAverage(data, days = 30) {
    if (!Array.isArray(data) || data.length === 0) {
      return null;
    }
    const slice = data.slice(0, days);
    const sum = slice.reduce((acc, item) => {
      const value = Number(item?.value);
      return Number.isFinite(value) ? acc + value : acc;
    }, 0);
    return slice.length ? Math.round(sum / slice.length) : null;
  }

  function buildHistoryMarkup(data) {
    return HISTORY_TARGETS.map(({ label, offset }) => {
      const entry = data[offset];
      if (!entry) {
        return `
          <li class="sentiment-history__item">
            <p class="sentiment-history__label">${label}</p>
            <p class="sentiment-history__meta">Not available</p>
            <span class="sentiment-history__value">--</span>
          </li>
        `;
      }
      const value = Number(entry.value);
      const classification = entry.value_classification || "--";
      const timestamp = formatTimestamp(entry.timestamp);
      return `
        <li class="sentiment-history__item">
          <p class="sentiment-history__label">${label}</p>
          <p class="sentiment-history__meta">${classification} | ${timestamp}</p>
          <span class="sentiment-history__value">${Number.isFinite(value) ? value : "--"}</span>
        </li>
      `;
    }).join("");
  }

  function readCache() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.data) && parsed.data.length > 0) {
        return parsed;
      }
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function writeCache(payload) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      /* ignore */
    }
  }

  function loadAlertConfig() {
    try {
      const raw = localStorage.getItem(ALERT_STORAGE_KEY);
      if (!raw) return { ...DEFAULT_ALERT_CONFIG };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_ALERT_CONFIG,
        ...parsed,
        lower: clamp(Number(parsed?.lower), 0, 95),
        upper: clamp(Number(parsed?.upper), 5, 100),
        enabled: Boolean(parsed?.enabled),
        sound: Boolean(parsed?.sound),
        flash: parsed?.flash !== undefined ? Boolean(parsed.flash) : true,
      };
    } catch (_) {
      return { ...DEFAULT_ALERT_CONFIG };
    }
  }

  function saveAlertConfig(config) {
    try {
      localStorage.setItem(ALERT_STORAGE_KEY, JSON.stringify(config));
    } catch (_) {
      /* ignore */
    }
  }

  function sentimentScoreDescriptor(score) {
    if (!Number.isFinite(score)) return "--";
    if (score >= 80) return "Overheat";
    if (score >= 60) return "Aggressive";
    if (score >= 40) return "Balanced";
    if (score >= 20) return "Guarded";
    return "Stressed";
  }

  function formatDateKey(date) {
    return date.toISOString().slice(0, 10);
  }
  function getSyntheticSeries(symbol) {
    const key = SYMBOL_LOOKUP[symbol.toLowerCase()] || symbol;
    const sample = SYNTHETIC_DATASET[key];
    return Array.isArray(sample)
      ? sample.slice()
      : [];
  }

  function parseCsvSeries(symbol, limit = 220) {
    return fetch(
      `${STOOQ_BASE_URL}${encodeURIComponent(
        `https://stooq.com/q/d/l/?s=${symbol}&i=d`
      )}`,
      { cache: "no-cache" }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`CSV fetch failed (${response.status})`);
        }
        return response.text();
      })
      .then((text) => {
        const lines = text.trim().split(/\r?\n/);
        if (lines.length <= 1) {
          throw new Error("CSV payload empty");
        }
        return lines
          .slice(-limit)
          .slice(1)
          .map((line) => {
            const [date, open, high, low, close, volume] = line.split(",");
            const parsedDate = new Date(date);
            const closeVal = Number(close);
            const volVal = Number(volume);
            const highVal = Number(high);
            const lowVal = Number(low);
            if (Number.isNaN(parsedDate.getTime()) || !Number.isFinite(closeVal)) {
              return null;
            }
          return {
            date: parsedDate,
            close: closeVal,
            volume: Number.isFinite(volVal) ? volVal : null,
            high: Number.isFinite(highVal) ? highVal : null,
            low: Number.isFinite(lowVal) ? lowVal : null,
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.date.getTime() - b.date.getTime());
      })
      .catch((error) => {
        console.warn(`CSV fetch failed for ${symbol}`, error);
        return getSyntheticSeries(symbol).slice(-limit);
      });
  }

  async function fetchAlternativeSentiment() {
    try {
      const response = await fetch(ALTERNATIVE_URL, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`Alt sentiment request failed (${response.status})`);
      }
      const payload = await response.json();
      const record = payload?.data?.[0];
      if (!record) {
        return null;
      }
      return {
        value: Number(record.value),
        label: toClassificationLabel(record.value_classification),
      };
    } catch (error) {
      console.warn("Alternative sentiment fetch failed", error);
      return { ...SYNTHETIC_DATASET.altSentiment };
    }
  }

  function computeFlowScore(series) {
    const volumes = series
      .map((row) => row.volume)
      .filter((val) => Number.isFinite(val));
    if (volumes.length < 15) return null;
    const recent = average(volumes.slice(-5));
    const baseline = average(volumes.slice(-35, -5));
    if (!baseline) return null;
    const ratio = recent / baseline;
    return clamp(50 + (ratio - 1) * 140, 0, 100);
  }

  function computeVolatilityScore(series) {
    if (!series || series.length < 30) return null;
    const closes = series.map((row) => row.close);
    const returns = [];
    for (let i = 1; i < closes.length; i += 1) {
      const prev = closes[i - 1];
      const curr = closes[i];
      if (!prev || !curr) continue;
      returns.push(Math.log(curr / prev));
    }
    if (returns.length < 60) return null;
    const vol14 = standardDeviation(returns.slice(-14)) * Math.sqrt(252) * 100;
    const vol60 = standardDeviation(returns.slice(-60)) * Math.sqrt(252) * 100;
    if (!Number.isFinite(vol14) || !Number.isFinite(vol60) || vol60 === 0) {
      return null;
    }
    const ratio = vol14 / vol60;
    return clamp(100 - (ratio - 1) * 140, 0, 100);
  }

  function updateRadarModule(series) {
    if (!series?.length) return;

    const fallbackValues = {
      market: clamp(
        Number(series[0]?.value) || SYNTHETIC_DATASET.altSentiment.value,
        0,
        100
      ),
      social: clamp(SYNTHETIC_DATASET.altSentiment.value, 0, 100),
      flows: computeFlowScore(SYNTHETIC_DATASET.SPY),
      options: computeVolatilityScore(SYNTHETIC_DATASET.VIXY),
    };
    RADAR_AXES.forEach((axis) => {
      if (!Number.isFinite(fallbackValues[axis.key])) {
        fallbackValues[axis.key] = axis.key === "social" ? 48 : 56;
      } else {
        fallbackValues[axis.key] = clamp(fallbackValues[axis.key], 0, 100);
      }
    });
    drawRadarChart(fallbackValues);
    updateRadarList(fallbackValues);

    if (!radarCache || Date.now() - radarCache.timestamp > 15 * 60 * 1000) {
      radarCache = {
        timestamp: Date.now(),
        promise: Promise.all([
          fetchAlternativeSentiment(),
          parseCsvSeries(COMPARISON_ASSETS.SPY.symbol),
          parseCsvSeries(COMPARISON_ASSETS.VIXY.symbol),
        ]),
      };
    }
    radarCache.promise
      .then(([social, spySeries, vixySeries]) => {
        const latestValue = Number(series[0]?.value);
        const resolved = {
          market: Number.isFinite(latestValue) ? clamp(latestValue, 0, 100) : null,
          social: Number.isFinite(social?.value)
            ? clamp(social.value, 0, 100)
            : null,
          flows: computeFlowScore(spySeries),
          options: computeVolatilityScore(vixySeries),
        };
        RADAR_AXES.forEach((axis) => {
          if (!Number.isFinite(resolved[axis.key])) {
            resolved[axis.key] = fallbackValues[axis.key];
          } else {
            resolved[axis.key] = clamp(resolved[axis.key], 0, 100);
          }
        });
        drawRadarChart(resolved);
        updateRadarList(resolved);
      })
      .catch((error) => {
        console.warn("Radar module failed", error);
      });
  }

  function drawRadarChart(values) {
    const canvas = $("sentimentRadarChart");
    if (!canvas || typeof Chart === "undefined") return;
    const labels = RADAR_AXES.map((axis) => axis.label);
    const data = RADAR_AXES.map((axis) => {
      const score = values[axis.key];
      return Number.isFinite(score) ? clamp(score, 0, 100) : 0;
    });

    const createFillGradient = (context) => {
      const { chart } = context;
      const { ctx, chartArea } = chart;
      if (!chartArea) {
        return "rgba(82, 208, 220, 0.18)";
      }
      const cx = chartArea.left + chartArea.width / 2;
      const cy = chartArea.top + chartArea.height / 2;
      const radius = Math.min(chartArea.width, chartArea.height) / 2;
      const gradient = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.05,
        cx,
        cy,
        radius * 0.95
      );
      gradient.addColorStop(0, "rgba(82, 208, 220, 0.42)");
      gradient.addColorStop(0.55, "rgba(255, 106, 26, 0.18)");
      gradient.addColorStop(1, "rgba(82, 208, 220, 0.05)");
      return gradient;
    };

    const glowPlugin = {
      id: "radarGlow",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        const dataset = chart.getDatasetMeta(0);
        if (!dataset || !dataset.dataset) return;
        ctx.save();
        ctx.shadowColor = "rgba(255, 106, 26, 0.36)";
        ctx.shadowBlur = 18;
        ctx.lineWidth = 0;
        ctx.fillStyle = "rgba(82, 208, 220, 0.12)";
        ctx.beginPath();
        dataset.dataset.draw(ctx);
        ctx.restore();
      },
    };

    const datasetConfig = {
      label: "Sentiment mesh",
      data,
      borderWidth: 2.6,
      borderColor: "rgba(82, 208, 220, 0.85)",
      backgroundColor: createFillGradient,
      pointBackgroundColor: "rgba(245, 247, 255, 0.95)",
      pointBorderColor: "rgba(255, 106, 26, 0.85)",
      pointBorderWidth: 2,
      pointRadius: 4.8,
      pointHoverRadius: 6.2,
      pointHoverBorderWidth: 2.4,
    };

    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: { top: 20, bottom: 12, left: 12, right: 12 },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: "rgba(6, 20, 30, 0.92)",
          borderColor: "rgba(82, 208, 220, 0.35)",
          borderWidth: 1,
          titleFont: { weight: "600", size: 12 },
          bodyFont: { weight: "500", size: 12 },
          displayColors: false,
          callbacks: {
            label(context) {
              const label = labels[context.dataIndex] || "";
              const value = context.parsed?.r ?? 0;
              return `${label}: ${Math.round(value)} pts`;
            },
          },
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            display: false,
          },
          grid: {
            color: "rgba(82, 208, 220, 0.18)",
            lineWidth: 1,
          },
          angleLines: {
            color: "rgba(255, 106, 26, 0.22)",
            lineWidth: 1,
          },
          pointLabels: {
            color: "rgba(204, 238, 255, 0.86)",
            padding: 18,
            font: {
              family: '"Space Grotesk", "Orbitron", sans-serif',
              size: 13,
              weight: "600",
            },
          },
        },
      },
    };

    if (!radarChart) {
      radarChart = new Chart(canvas.getContext("2d"), {
        type: "radar",
        data: {
          labels,
          datasets: [datasetConfig],
        },
        options: baseOptions,
        plugins: [glowPlugin],
      });
      return;
    }

    radarChart.data.labels = labels;
    radarChart.data.datasets[0].data = data;
    radarChart.data.datasets[0].backgroundColor = createFillGradient;
    radarChart.config.plugins = [glowPlugin];
    radarChart.options = { ...radarChart.options, ...baseOptions };
    radarChart.update();
  }

  function updateRadarList(values) {
    const list = $("sentimentSourceList");
    if (!list) return;
    const items = Array.from(
      list.querySelectorAll(".sentiment-source-list__item")
    );
    RADAR_AXES.forEach((axis, index) => {
      const item = items[index];
      if (!item) return;
      const labelEl = item.querySelector(".sentiment-source-list__label");
      const valueEl = item.querySelector(".sentiment-source-list__value");
      if (labelEl) {
        labelEl.textContent = axis.label;
      }
      if (valueEl) {
        const score = values[axis.key];
        valueEl.textContent = Number.isFinite(score)
          ? `${Math.round(score)} · ${sentimentScoreDescriptor(score)}`
          : "--";
      }
    });
  }

  function prepareChronologicalSeries(series) {
    return [...series]
      .map((entry) => ({
        timestamp: Number(entry.timestamp) * 1000,
        value: Number(entry.value),
      }))
      .filter((entry) => Number.isFinite(entry.timestamp) && Number.isFinite(entry.value))
      .sort((a, b) => a.timestamp - b.timestamp);
  }
  function computeForecast(series) {
    const chronological = prepareChronologicalSeries(series);
    const lookback = chronological.slice(-FORECAST_LOOKBACK);
    if (lookback.length < 8) {
      return null;
    }
    const xs = lookback.map((_, idx) => idx);
    const ys = lookback.map((point) => point.value);
    const xMean = average(xs);
    const yMean = average(ys);
    let numerator = 0;
    let denominator = 0;
    for (let i = 0; i < xs.length; i += 1) {
      const xDelta = xs[i] - xMean;
      numerator += xDelta * (ys[i] - yMean);
      denominator += xDelta * xDelta;
    }
    const slope = denominator === 0 ? 0 : numerator / denominator;
    const intercept = yMean - slope * xMean;
    const residuals = ys.map((value, idx) => {
      const fitted = slope * xs[idx] + intercept;
      return value - fitted;
    });
    const stderr = standardDeviation(residuals);
    const forecastPoints = [];
    const lastIndex = xs.length - 1;
    for (let i = 1; i <= FORECAST_HORIZON; i += 1) {
      const nextIdx = lastIndex + i;
      const rawValue = slope * nextIdx + intercept;
      const upper = rawValue + stderr * 2;
      const lower = rawValue - stderr * 2;
      const anchor =
        chronological[chronological.length - 1]?.timestamp || Date.now();
      const nextTimestamp = anchor + i * 24 * 60 * 60 * 1000;
      forecastPoints.push({
        timestamp: nextTimestamp,
        value: clamp(rawValue, 0, 100),
        upper: clamp(upper, 0, 100),
        lower: clamp(lower, 0, 100),
      });
    }
    return {
      historical: chronological.slice(-Math.max(FORECAST_LOOKBACK, 30)),
      forecast: forecastPoints,
      slope,
      stderr,
    };
  }

  function updateForecastChart(series) {
    const canvas = $("sentimentForecastChart");
    if (!canvas || typeof Chart === "undefined") return;
    const forecast = computeForecast(series);
    if (!forecast) {
      if (forecastChart) {
        forecastChart.data.labels = [];
        forecastChart.update();
      }
      updateForecastStats(null);
      return;
    }
    const historical = forecast.historical;
    const timeline = [
      ...historical.map((point) => ({
        timestamp: point.timestamp,
        value: point.value,
        type: "actual",
      })),
      ...forecast.forecast.map((point) => ({
        timestamp: point.timestamp,
        value: point.value,
        upper: point.upper,
        lower: point.lower,
        type: "forecast",
      })),
    ];
    const labels = timeline.map((point) => formatShortDate(point.timestamp));
    const actualData = timeline.map((point) =>
      point.type === "actual" ? point.value : null
    );
    const forecastData = timeline.map((point) =>
      point.type === "forecast" ? point.value : null
    );
    const lowerBand = timeline.map((point) =>
      point.type === "forecast" ? point.lower : null
    );
    const upperBand = timeline.map((point) =>
      point.type === "forecast" ? point.upper : null
    );
    if (!forecastChart) {
      forecastChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Actual",
              data: actualData,
              borderColor: "#ff6a1a",
              backgroundColor: "rgba(255, 106, 26, 0.16)",
              fill: false,
              tension: 0.35,
              pointRadius: 0,
              spanGaps: false,
            },
            {
              label: "Forecast",
              data: forecastData,
              borderColor: "#52d0d3",
              backgroundColor: "rgba(82, 208, 220, 0.2)",
              borderDash: [6, 6],
              fill: false,
              tension: 0.35,
              pointRadius: 0,
              spanGaps: false,
            },
            {
              label: "Confidence lower",
              data: lowerBand,
              borderColor: "transparent",
              backgroundColor: "rgba(82, 208, 220, 0.12)",
              fill: false,
              tension: 0.35,
              pointRadius: 0,
              spanGaps: false,
            },
            {
              label: "Confidence upper",
              data: upperBand,
              borderColor: "transparent",
              backgroundColor: "rgba(82, 208, 220, 0.12)",
              fill: "-1",
              tension: 0.35,
              pointRadius: 0,
              spanGaps: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { mode: "index" } },
          interaction: { intersect: false },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: { color: "rgba(159, 174, 214, 0.75)" },
              grid: { color: "rgba(82, 208, 220, 0.14)" },
            },
            x: {
              ticks: { color: "rgba(159, 174, 214, 0.7)", autoSkip: true },
              grid: { color: "rgba(82, 208, 220, 0.08)" },
            },
          },
        },
      });
    } else {
      forecastChart.data.labels = labels;
      forecastChart.data.datasets[0].data = actualData;
      forecastChart.data.datasets[1].data = forecastData;
      forecastChart.data.datasets[2].data = lowerBand;
      forecastChart.data.datasets[3].data = upperBand;
      forecastChart.update();
    }
    updateForecastStats(forecast);
  }

  function updateForecastStats(forecast) {
    const trendEl = $("forecastTrendLabel");
    const rangeEl = $("forecastRangeLabel");
    const confidenceEl = $("forecastConfidenceLabel");
    if (!forecast || !forecast.forecast?.length) {
      if (trendEl) trendEl.textContent = "--";
      if (rangeEl) rangeEl.textContent = "--";
      if (confidenceEl) confidenceEl.textContent = "--";
      return;
    }
    const slope = forecast.slope;
    const lastPoint = forecast.forecast[forecast.forecast.length - 1];
    const minVal = Math.min(...forecast.forecast.map((point) => point.lower));
    const maxVal = Math.max(...forecast.forecast.map((point) => point.upper));
    if (trendEl) {
      const direction =
        slope > 0.15
          ? "Rising"
          : slope < -0.15
          ? "Fading"
          : Math.abs(slope) <= 0.15
          ? "Stable"
          : "Mixed";
      const slopeLabel =
        slope > 0
          ? `+${slope.toFixed(2)} pts/day`
          : `${slope.toFixed(2)} pts/day`;
      trendEl.textContent = `${direction} · ${slopeLabel}`;
    }
    if (rangeEl) {
      rangeEl.textContent = `${Math.round(minVal)} – ${Math.round(
        maxVal
      )} pts (${formatShortDate(forecast.forecast[0].timestamp)} ? ${formatShortDate(
        lastPoint.timestamp
      )})`;
    }
    if (confidenceEl) {
      const confidenceScore = clamp(
        100 - forecast.stderr * 140,
        28,
        96
      );
      const bandDescriptor =
        confidenceScore >= 80
          ? "High"
          : confidenceScore >= 60
          ? "Medium"
          : "Soft";
      confidenceEl.textContent = `${bandDescriptor} (${Math.round(
        confidenceScore
      )}%)`;
    }
  }
  function initCompareControls() {
    const select = $("sentimentCompareSelect");
    const windowLabel = $("sentimentCompareWindowLabel");
    if (windowLabel) {
      windowLabel.textContent = `${COMPARE_WINDOW}`;
    }
    if (!select) return;
    select.addEventListener("change", () => {
      updateCompareCharts(select.value);
    });
  }

  function getComparisonAsset(symbolKey) {
    if (comparisonCache[symbolKey]) {
      return comparisonCache[symbolKey];
    }
    const asset = COMPARISON_ASSETS[symbolKey];
    if (!asset) return Promise.reject(new Error("Unknown asset"));
    const promise = parseCsvSeries(asset.symbol, 400).then((series) => {
      const fallback = getSyntheticSeries(asset.symbol);
      const resolvedSeries =
        Array.isArray(series) && series.length ? series : fallback;
      comparisonCache[symbolKey] = resolvedSeries;
      return resolvedSeries;
    });
    comparisonCache[symbolKey] = promise;
    return promise;
  }

  function buildComparisonPairs(sentimentSeries, assetSeries) {
    const assetMap = new Map(
      assetSeries.map((row) => [formatDateKey(row.date), row])
    );
    const pairs = [];
    for (let i = 1; i < sentimentSeries.length; i += 1) {
      const current = sentimentSeries[i];
      const previous = sentimentSeries[i - 1];
      const dateKey = formatDateKey(new Date(current.timestamp));
      const prevKey = formatDateKey(new Date(previous.timestamp));
      const assetRow = assetMap.get(dateKey);
      const prevRow = assetMap.get(prevKey);
      if (!assetRow || !prevRow) {
        continue;
      }
      const sentimentChange = current.value - previous.value;
      if (!Number.isFinite(sentimentChange)) {
        continue;
      }
      const assetReturn = Math.log(assetRow.close / prevRow.close) * 100;
      if (!Number.isFinite(assetReturn)) {
        continue;
      }
      pairs.push({
        date: new Date(current.timestamp),
        sentiment: sentimentChange,
        asset: assetReturn,
      });
    }
    return pairs.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  function computeRollingCorrelation(pairs, window) {
    if (pairs.length < window) return [];
    const results = [];
    for (let i = window - 1; i < pairs.length; i += 1) {
      const slice = pairs.slice(i - window + 1, i + 1);
      const sentimentValues = slice.map((point) => point.sentiment);
      const assetValues = slice.map((point) => point.asset);
      results.push({
        date: slice[slice.length - 1].date,
        value: correlation(sentimentValues, assetValues),
      });
    }
    return results;
  }

  function updateCompareCharts(symbolKey = "SPY") {
    if (!latestSeries.length) return;
    const select = $("sentimentCompareSelect");
    if (select && select.value !== symbolKey) {
      select.value = symbolKey;
    }
    const asset = COMPARISON_ASSETS[symbolKey];
    const baselineSeries = asset ? getSyntheticSeries(asset.symbol) : [];
    const baselinePairs = buildComparisonPairs(
      prepareChronologicalSeries(latestSeries),
      baselineSeries
    );
    if (baselinePairs.length) {
      const baselineRolling = computeRollingCorrelation(
        baselinePairs,
        Math.min(COMPARE_WINDOW, baselinePairs.length)
      );
      if (baselineRolling.length) {
        drawCorrelationChart(baselineRolling);
        drawScatterChart(baselinePairs.slice(-120));
        updateCompareNote(baselineRolling, symbolKey);
      }
    }
    getComparisonAsset(symbolKey)
      .then((assetSeries) => {
        const sentimentChrono = prepareChronologicalSeries(latestSeries);
        const pairs = buildComparisonPairs(sentimentChrono, assetSeries);
        const rolling = computeRollingCorrelation(pairs, COMPARE_WINDOW);
        drawCorrelationChart(rolling);
        drawScatterChart(pairs.slice(-120));
        updateCompareNote(rolling, symbolKey);
      })
      .catch((error) => {
        console.warn("Compare module failed", error);
        drawCorrelationChart([]);
        drawScatterChart([]);
        updateCompareNote(null, symbolKey);
      });
  }

  function drawCorrelationChart(points) {
    const canvas = $("sentimentCorrelationChart");
    if (!canvas || typeof Chart === "undefined") return;
    const labels = points.map((point) => formatShortDate(point.date));
    const data = points.map((point) => point.value);
    if (!correlationChart) {
      correlationChart = new Chart(canvas.getContext("2d"), {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Rolling correlation",
              data,
              borderColor: "#52d0d3",
              backgroundColor: "rgba(82, 208, 220, 0.22)",
              fill: true,
              tension: 0.3,
              pointRadius: 0,
              spanGaps: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false }, tooltip: { mode: "index" } },
          interaction: { intersect: false },
          scales: {
            y: {
              suggestedMin: -1,
              suggestedMax: 1,
              ticks: { color: "rgba(159, 174, 214, 0.7)" },
              grid: { color: "rgba(82, 208, 220, 0.12)" },
            },
            x: {
              ticks: { color: "rgba(159, 174, 214, 0.7)", autoSkip: true },
              grid: { color: "rgba(82, 208, 220, 0.08)" },
            },
          },
        },
      });
      return;
    }
    correlationChart.data.labels = labels;
    correlationChart.data.datasets[0].data = data;
    correlationChart.update();
  }

  function drawScatterChart(pairs) {
    const canvas = $("sentimentScatterChart");
    if (!canvas || typeof Chart === "undefined") return;
    const data = pairs.map((pair) => ({
      x: pair.asset,
      y: pair.sentiment,
      label: formatShortDate(pair.date),
    }));
    if (!scatterChart) {
      scatterChart = new Chart(canvas.getContext("2d"), {
        type: "scatter",
        data: {
          datasets: [
            {
              label: "Sentiment vs asset",
              data,
              pointBackgroundColor: "#ff6a1a",
              pointBorderColor: "#f5f7ff",
              pointRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(context) {
                  const { x, y } = context.parsed;
                  const label = context.raw?.label || "";
                  return `${label}: Sentiment ${y.toFixed(
                    2
                  )} pts / Asset ${x.toFixed(2)}%`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Asset return (%)",
                color: "rgba(159, 174, 214, 0.8)",
              },
              ticks: { color: "rgba(159, 174, 214, 0.7)" },
              grid: { color: "rgba(82, 208, 220, 0.1)" },
            },
            y: {
              title: {
                display: true,
                text: "Sentiment change (pts)",
                color: "rgba(159, 174, 214, 0.8)",
              },
              ticks: { color: "rgba(159, 174, 214, 0.7)" },
              grid: { color: "rgba(82, 208, 220, 0.1)" },
            },
          },
        },
      });
      return;
    }
    scatterChart.data.datasets[0].data = data;
    scatterChart.update();
  }

  function updateCompareNote(rolling, symbolKey) {
    const note = $("sentimentCompareNote");
    if (!note) return;
    const asset = COMPARISON_ASSETS[symbolKey];
    if (!rolling || rolling.length === 0) {
      note.textContent = `Awaiting data synchronisation for ${asset?.label || symbolKey}…`;
      return;
    }
    const latest = rolling[rolling.length - 1];
    const corr = latest?.value ?? 0;
    const tone =
      corr > 0.55
        ? "Strong positive correlation"
        : corr > 0.2
        ? "Positive correlation"
        : corr < -0.55
        ? "Strong inverse correlation"
        : corr < -0.2
        ? "Inverse correlation"
        : "Muted relationship";
    note.textContent = `${tone} (${corr.toFixed(
      2
    )}) versus ${asset.label} over ${COMPARE_WINDOW} sessions.`;
  }
  function applyAlertConfig() {
    const lowerInput = $("alertLowerInput");
    const upperInput = $("alertUpperInput");
    const lowerLabel = $("alertLowerLabel");
    const upperLabel = $("alertUpperLabel");
    const enableToggle = $("alertEnableToggle");
    const soundToggle = $("alertSoundToggle");
    const themeToggle = $("alertThemeToggle");
    if (lowerInput) lowerInput.value = alertConfig.lower;
    if (upperInput) upperInput.value = alertConfig.upper;
    if (lowerLabel) lowerLabel.textContent = `${alertConfig.lower}`;
    if (upperLabel) upperLabel.textContent = `${alertConfig.upper}`;
    if (enableToggle) enableToggle.checked = alertConfig.enabled;
    if (soundToggle) soundToggle.checked = alertConfig.sound;
    if (themeToggle) themeToggle.checked = alertConfig.flash;
  }

  function initAlertControls() {
    applyAlertConfig();
    const lowerInput = $("alertLowerInput");
    const upperInput = $("alertUpperInput");
    const lowerLabel = $("alertLowerLabel");
    const upperLabel = $("alertUpperLabel");
    const enableToggle = $("alertEnableToggle");
    const soundToggle = $("alertSoundToggle");
    const themeToggle = $("alertThemeToggle");
    if (lowerInput) {
      lowerInput.addEventListener("input", (event) => {
        const value = clamp(Number(event.target.value), 0, alertConfig.upper - 1);
        alertConfig.lower = value;
        if (lowerLabel) lowerLabel.textContent = `${Math.round(value)}`;
        saveAlertConfig(alertConfig);
        evaluateAlerts(Number(latestSeries[0]?.value), latestSeries[0]?.value_classification);
      });
    }
    if (upperInput) {
      upperInput.addEventListener("input", (event) => {
        const value = clamp(Number(event.target.value), alertConfig.lower + 1, 100);
        alertConfig.upper = value;
        if (upperLabel) upperLabel.textContent = `${Math.round(value)}`;
        saveAlertConfig(alertConfig);
        evaluateAlerts(Number(latestSeries[0]?.value), latestSeries[0]?.value_classification);
      });
    }
    if (enableToggle) {
      enableToggle.addEventListener("change", (event) => {
        alertConfig.enabled = event.target.checked;
        saveAlertConfig(alertConfig);
        evaluateAlerts(Number(latestSeries[0]?.value), latestSeries[0]?.value_classification);
      });
    }
    if (soundToggle) {
      soundToggle.addEventListener("change", (event) => {
        alertConfig.sound = event.target.checked;
        saveAlertConfig(alertConfig);
      });
    }
    if (themeToggle) {
      themeToggle.addEventListener("change", (event) => {
        alertConfig.flash = event.target.checked;
        saveAlertConfig(alertConfig);
        evaluateAlerts(Number(latestSeries[0]?.value), latestSeries[0]?.value_classification);
      });
    }
  }

  function ensureAudioContext() {
    if (audioCtx) return audioCtx;
    if (typeof window.AudioContext !== "undefined") {
      audioCtx = new window.AudioContext();
    }
    return audioCtx;
  }

  function startGlobalFlash(zone) {
    if (!document.body) return;
    document.body.classList.remove("alert-flash-lower", "alert-flash-upper");
    document.body.classList.add("alert-flash-active");
    document.body.classList.add(
      zone === "upper" ? "alert-flash-upper" : "alert-flash-lower"
    );
  }

  function stopGlobalFlash() {
    if (document.body) {
      document.body.classList.remove(
        "alert-flash-active",
        "alert-flash-lower",
        "alert-flash-upper"
      );
    }
  }

  function playAlertTone(zone) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    try {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = "sawtooth";
      oscillator.frequency.value = zone === "lower" ? 320 : 740;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.65);
    } catch (error) {
      console.warn("Alert tone failed", error);
    }
  }

  function evaluateAlerts(currentValue, classification) {
    const statusEl = $("sentimentAlertStatus");
    const currentEl = $("sentimentAlertCurrent");
    const hudShell = $("sentimentHud");
    if (currentEl) {
      if (Number.isFinite(currentValue)) {
        currentEl.textContent = `${Math.round(currentValue)} · ${classification || "--"}`;
      } else {
        currentEl.textContent = "--";
      }
    }
    if (!alertConfig.enabled) {
      if (statusEl) statusEl.textContent = "Standby";
      if (hudShell) hudShell.classList.remove("sentiment-hud--alert-active");
      if (alertState.flashActive) {
        stopGlobalFlash();
        alertState.flashActive = false;
        alertState.flashZone = null;
      }
      alertState.activeZone = null;
      return;
    }
    let zone = null;
    let label = "Monitoring";
    if (Number.isFinite(currentValue)) {
      if (currentValue <= alertConfig.lower) {
        zone = "lower";
        label = "ALERT · Defensive posture";
      } else if (currentValue >= alertConfig.upper) {
        zone = "upper";
        label = "ALERT · Overheated";
      }
    }
    if (statusEl) statusEl.textContent = label;
    const shouldFlash = zone && alertConfig.flash;
    if (hudShell) {
      if (shouldFlash) {
        hudShell.classList.add("sentiment-hud--alert-active");
      } else {
        hudShell.classList.remove("sentiment-hud--alert-active");
      }
    }

    if (shouldFlash) {
      if (!alertState.flashActive || alertState.flashZone !== zone) {
        startGlobalFlash(zone);
      }
      alertState.flashActive = true;
      alertState.flashZone = zone;
    } else if (alertState.flashActive) {
      stopGlobalFlash();
      alertState.flashActive = false;
      alertState.flashZone = null;
    }

    if (zone && alertConfig.sound && alertState.activeZone !== zone) {
      playAlertTone(zone);
    }
    alertState.activeZone = zone;
  }
  function renderFearGreed(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return;
    }

    latestSeries = data;
    const latest = data[0];
    const previousCloseEntry = data[1];
    const priorEntry = data[2];
    const gaugeValue = Number(latest.value);
    const previousCloseValue = Number.isFinite(Number(latest.previous_close))
      ? Number(latest.previous_close)
      : Number(previousCloseEntry?.value);
    const usingIntraday = Number.isFinite(gaugeValue);
    const displayValue = usingIntraday
      ? gaugeValue
      : Number.isFinite(previousCloseValue)
      ? previousCloseValue
      : NaN;
    const displayClassification = usingIntraday
      ? latest.value_classification
      : previousCloseEntry?.value_classification || latest.value_classification;

    rotateNeedle($("fearGreedNeedle"), gaugeValue);

    const valueEl = $("fearGreedValue");
    const labelEl = $("fearGreedLabel");
    if (valueEl) {
      valueEl.textContent = Number.isFinite(displayValue)
        ? Math.round(displayValue)
        : "--";
    }
    if (labelEl) {
      labelEl.textContent = displayClassification || "--";
    }

    setBadge($("fearGreedStatusBadge"), displayClassification);
    const changeBaselineValue = Number.isFinite(previousCloseValue)
      ? previousCloseValue
      : Number(priorEntry?.value);
    const changeBaselineLabel = Number.isFinite(previousCloseValue)
      ? previousCloseEntry?.value_classification
        ? `${previousCloseEntry.value_classification} (previous close)`
        : "previous close"
      : priorEntry?.value_classification
      ? `${priorEntry.value_classification} (prior close)`
      : "prior close";

    setChange(
      $("fearGreedChange"),
      displayValue,
      changeBaselineValue,
      changeBaselineLabel
    );

    const comparisonEl = $("fearGreedComparison");
    if (comparisonEl) {
      comparisonEl.classList.remove(
        "text-emerald-500",
        "dark:text-emerald-300",
        "text-rose-500",
        "dark:text-rose-300",
        "text-gray-500",
        "dark:text-gray-400"
      );
      if (Number.isFinite(gaugeValue) && Number.isFinite(previousCloseValue)) {
        const intradayRounded = Math.round(gaugeValue);
        const previousRounded = Math.round(previousCloseValue);
        const delta = intradayRounded - previousRounded;
        const deltaText =
          delta > 0 ? `+${Math.abs(delta)}` : delta < 0 ? `-${Math.abs(delta)}` : "0";
        comparisonEl.textContent = `Intraday ${intradayRounded} vs prev close ${previousRounded} (${deltaText} pts)`;
        if (delta > 0) {
          comparisonEl.classList.add("text-emerald-500", "dark:text-emerald-300");
        } else if (delta < 0) {
          comparisonEl.classList.add("text-rose-500", "dark:text-rose-300");
        } else {
          comparisonEl.classList.add("text-gray-500", "dark:text-gray-400");
        }
      } else {
        comparisonEl.textContent = "Intraday vs previous close unavailable";
        comparisonEl.classList.add("text-gray-500", "dark:text-gray-400");
      }
    }

    const updatedEl = $("fearGreedUpdated");
    if (updatedEl) {
      updatedEl.textContent = formatTimestamp(latest.timestamp);
    }

    const countdownEl = $("fearGreedCountdown");
    startCountdown(Number(latest.time_until_update), countdownEl);

    const average = computeAverage(data, 30);
    const averageEl = $("fearGreedAverage");
    if (averageEl) {
      averageEl.textContent = Number.isFinite(average) ? `${average}` : "--";
    }

    const historyEl = $("fearGreedHistory");
    if (historyEl) {
      historyEl.innerHTML = buildHistoryMarkup(data);
    }

    updateForecastChart(data);
    updateCompareCharts($("sentimentCompareSelect")?.value || "SPY");
    updateRadarModule(data);
    evaluateAlerts(Number(latest.value), latest.value_classification);
  }

  function setLoadingState(isLoading) {
    const btn = $("fearGreedRefreshBtn");
    if (!btn) return;
    btn.disabled = isLoading;
    const label = btn.querySelector(".fear-greed-refresh-label");
    if (label) {
      label.textContent = isLoading ? "Refreshing..." : "Refresh now";
    }
  }

  function buildFearGreedUrl() {
    const cacheBust = Date.now();
    const target = `${API_ENDPOINT}?_=${cacheBust}`;
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`;
  }

  async function fetchFearGreed(options = {}) {
    const userInitiated = Boolean(options && options.userInitiated);
    if (userInitiated && typeof window.showActionFeedback === "function") {
      window.showActionFeedback("Pulling sentiment telemetry...", {
        state: "progress",
        autoHide: false,
      });
    }
    setLoadingState(true);
    const errorEl = $("fearGreedError");
    if (errorEl) {
      errorEl.classList.add("hidden");
    }
    let cached = null;
    try {
      const response = await fetch(buildFearGreedUrl(), { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const payload = await response.json();
      const normalized = normalizeFearGreedPayload(payload);
      if (!Array.isArray(normalized) || normalized.length === 0) {
        throw new Error("Empty payload");
      }
      writeCache({ data: normalized });
      renderFearGreed(normalized);
      if (userInitiated && typeof window.showActionFeedback === "function") {
        window.showActionFeedback("Sentiment telemetry refreshed.", {
          state: "success",
          autoHide: 2500,
        });
      }
    } catch (error) {
      console.error("Failed to load fear & greed index", error);
      cached = readCache();
      if (errorEl) {
        errorEl.classList.remove("hidden");
      }
      if (cached) {
        renderFearGreed(cached.data);
      } else {
        renderFearGreed(SAMPLE_DATA);
      }
      if (userInitiated && typeof window.showActionFeedback === "function") {
        const fallbackMessage = cached
          ? "Live sentiment feed down. Showing cached telemetry."
          : "Live sentiment feed down. Loaded sample telemetry.";
        window.showActionFeedback(fallbackMessage, {
          state: "error",
          autoHide: 4200,
        });
      }
    } finally {
      setLoadingState(false);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const section = $("fearGreed");
    if (!section) {
      return;
    }
    gaugeChart = initGauge($("fearGreedGauge"));
    initAlertControls();
    initCompareControls();
    const btn = $("fearGreedRefreshBtn");
    if (btn) {
      btn.addEventListener("click", () => {
        fetchFearGreed({ userInitiated: true });
      });
    }
    fetchFearGreed();
  });
})();



