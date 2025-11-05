(() => {
  const RANGE_CONFIG = {
    "1D": {
      label: "Today",
      getStart(now) {
        return now - 24 * 60 * 60 * 1000;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
      },
    },
    "1W": {
      label: "This Week",
      getStart(now) {
        return now - 7 * 24 * 60 * 60 * 1000;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
    "1M": {
      label: "Last 30 Days",
      getStart(now) {
        return now - 30 * 24 * 60 * 60 * 1000;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
    "3M": {
      label: "Last 3 Months",
      getStart(now) {
        return now - 90 * 24 * 60 * 60 * 1000;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
    YTD: {
      label: "Year to Date",
      getStart(now) {
        const current = new Date(now);
        return new Date(current.getFullYear(), 0, 1).getTime();
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      },
    },
    "1Y": {
      label: "Last 12 Months",
      getStart(now) {
        return now - 365 * 24 * 60 * 60 * 1000;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      },
    },
    ALL: {
      label: "All Time",
      getStart() {
        return -Infinity;
      },
      formatTick(timestamp) {
        return new Date(timestamp).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        });
      },
    },
  };

  const RANGE_STORAGE_KEY = "livePortfolioEquityActiveRange";
  const HISTORY_STORAGE_KEY = "livePortfolioEquityHistory";
  const MAX_HISTORY_POINTS = 1500;
  const MAX_HISTORY_AGE_MS = 400 * 24 * 60 * 60 * 1000; // ~400 days
  const RANGE_ORDER = ["1D", "1W", "1M", "3M", "YTD", "1Y", "ALL"];

  const ACTIVE_BTN_CLASSES = [
    "bg-emerald-500/15",
    "text-emerald-400",
    "border-emerald-400/60",
    "shadow",
    "shadow-emerald-500/30",
  ];
  const INACTIVE_BTN_TEXT = ["text-gray-400", "dark:text-gray-500"];
  const INACTIVE_BTN_BORDER = ["border-transparent"];
  const POSITIVE_CHANGE_CLASSES = ["text-emerald-400", "dark:text-emerald-300"];
  const NEGATIVE_CHANGE_CLASSES = ["text-rose-400", "dark:text-rose-300"];
  const ZERO_CHANGE_CLASSES = ["text-slate-700", "dark:text-slate-100"];

  let history = [];
  let chartInstance = null;
  let activeRange = localStorage.getItem(RANGE_STORAGE_KEY) || "1D";
  if (!RANGE_CONFIG[activeRange]) {
    activeRange = "1D";
  }

  let latestTotals = null;
  let latestTimestamp = null;

  const dom = {
    chart: null,
    emptyState: null,
    status: null,
    totalValue: null,
    totalChange: null,
    rangeButtons: [],
    resetButton: null,
  };

  function isDarkModeActive() {
    return document.documentElement.classList.contains("dark-mode");
  }

  function getPalette() {
    const dark = isDarkModeActive();
    return {
      line: dark ? "rgba(34,197,94,1)" : "rgba(16,185,129,1)",
      grid: dark ? "rgba(148,163,184,0.12)" : "rgba(148,163,184,0.18)",
      axis: dark ? "rgba(226,232,240,0.65)" : "rgba(30,41,59,0.65)",
      tooltipBg: dark ? "rgba(2,6,23,0.92)" : "rgba(255,255,255,0.95)",
      tooltipBorder: dark ? "rgba(52,211,153,0.45)" : "rgba(16,185,129,0.4)",
      tooltipText: dark ? "#e2e8f0" : "#0f172a",
    };
  }

  function formatCurrency(value) {
    if (!Number.isFinite(value)) return "--";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  function formatSignedCurrency(value) {
    if (!Number.isFinite(value)) return "--";
    const abs = Math.abs(value);
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    const formatted = formatCurrency(abs);
    return value === 0 ? formatted : `${sign}${formatted}`;
  }

  function formatPercent(value) {
    if (!Number.isFinite(value)) return "--";
    return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
  }

  function formatCompactCurrency(value) {
    if (!Number.isFinite(value)) return "";
    return `$${new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(value)}`;
  }

  function formatTimestamp(timestamp) {
    if (!Number.isFinite(timestamp)) return "--";
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) return "--";
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const now = Date.now();
      return parsed
        .map((entry) => ({
          timestamp: Number(entry.timestamp),
          value: Number(entry.value),
        }))
        .filter(
          (entry) =>
            Number.isFinite(entry.timestamp) &&
            Number.isFinite(entry.value) &&
            now - entry.timestamp <= MAX_HISTORY_AGE_MS
        )
        .sort((a, b) => a.timestamp - b.timestamp);
    } catch (error) {
      console.warn("Failed to load equity history from storage:", error);
      return [];
    }
  }

  function persistHistory() {
    try {
      const serialized = JSON.stringify(history);
      localStorage.setItem(HISTORY_STORAGE_KEY, serialized);
    } catch (error) {
      console.warn("Unable to persist equity history:", error);
    }
  }

  function addHistoryPoint(timestamp, value) {
    if (!Number.isFinite(timestamp) || !Number.isFinite(value)) return false;
    const cutoff = Date.now() - MAX_HISTORY_AGE_MS;
    history = history.filter((entry) => entry.timestamp >= cutoff);

    const last = history[history.length - 1];
    if (last) {
      if (timestamp < last.timestamp) {
        history.push({ timestamp, value });
        history.sort((a, b) => a.timestamp - b.timestamp);
      } else if (timestamp === last.timestamp) {
        if (Math.abs(last.value - value) > 0.0001) {
          last.value = value;
        }
      } else if (timestamp - last.timestamp >= 30 * 1000 || Math.abs(last.value - value) > 0.5) {
        history.push({ timestamp, value });
      } else {
        // Skip noisy duplicates that arrive too quickly without meaningful delta.
        return false;
      }
    } else {
      history.push({ timestamp, value });
    }

    if (history.length > MAX_HISTORY_POINTS) {
      history = history.slice(history.length - MAX_HISTORY_POINTS);
    }
    persistHistory();
    return true;
  }

  function resetHistory(options = {}) {
    history = [];
    persistHistory();

    let seeded = false;
    if (
      latestTotals &&
      Number.isFinite(latestTotals.currentValue)
    ) {
      const seedTimestamp = Date.now();
      latestTimestamp = seedTimestamp;
      seeded = addHistoryPoint(seedTimestamp, Number(latestTotals.currentValue));
    } else {
      latestTimestamp = null;
    }

    renderRange(activeRange);

    if (!seeded) {
      setEmptyState(true);
      updateSummary([]);
      updateStatusText();
    }

    if (!options.silent && typeof window.showActionFeedback === "function") {
      window.showActionFeedback("Equity history reset.", {
        state: "success",
        autoHide: 2200,
      });
    }
  }

  function ensureChart() {
    if (chartInstance || !dom.chart || typeof Chart === "undefined") return chartInstance;
    const palette = getPalette();
    const context = dom.chart.getContext("2d");
    chartInstance = new Chart(context, {
      type: "line",
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            borderColor: palette.line,
            borderWidth: 2.5,
            pointRadius: 0,
            pointHoverRadius: 0,
            tension: 0.35,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: {
          mode: "index",
          intersect: false,
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: palette.tooltipBg,
            borderColor: palette.tooltipBorder,
            borderWidth: 1,
            titleColor: palette.tooltipText,
            bodyColor: palette.tooltipText,
            displayColors: false,
            callbacks: {
              label(context) {
                const value = context.parsed.y;
                if (!Number.isFinite(value)) return "";
                return formatCurrency(value);
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: palette.axis,
              maxRotation: 0,
              autoSkip: true,
              maxTicksLimit: 7,
            },
          },
          y: {
            grid: {
              color: palette.grid,
              drawBorder: false,
            },
            ticks: {
              color: palette.axis,
              padding: 8,
              callback(value) {
                return formatCompactCurrency(value);
              },
            },
          },
        },
        layout: {
          padding: {
            top: 16,
            bottom: 12,
            left: 8,
            right: 12,
          },
        },
      },
    });
    return chartInstance;
  }

  function updateChartAppearance() {
    if (!chartInstance) return;
    const palette = getPalette();
    const dataset = chartInstance.data.datasets[0];
    dataset.borderColor = palette.line;

    if (chartInstance.options.plugins && chartInstance.options.plugins.tooltip) {
      const tooltip = chartInstance.options.plugins.tooltip;
      tooltip.backgroundColor = palette.tooltipBg;
      tooltip.borderColor = palette.tooltipBorder;
      tooltip.titleColor = palette.tooltipText;
      tooltip.bodyColor = palette.tooltipText;
    }

    const { scales } = chartInstance.options;
    if (scales && scales.x && scales.x.ticks) {
      scales.x.ticks.color = palette.axis;
    }
    if (scales && scales.y) {
      if (scales.y.grid) {
        scales.y.grid.color = palette.grid;
      }
      if (scales.y.ticks) {
        scales.y.ticks.color = palette.axis;
      }
    }

    chartInstance.update("none");
  }

  function setEmptyState(isEmpty) {
    if (!dom.emptyState) return;
    if (isEmpty) {
      dom.emptyState.classList.remove("hidden");
      dom.emptyState.setAttribute("aria-hidden", "false");
    } else {
      dom.emptyState.classList.add("hidden");
      dom.emptyState.setAttribute("aria-hidden", "true");
    }
  }

  function getRangeData(rangeKey) {
    if (!history.length) return [];
    const config = RANGE_CONFIG[rangeKey] || RANGE_CONFIG["1D"];
    const startTime = config.getStart(Date.now());
    let filtered = history.filter((entry) => entry.timestamp >= startTime);
    if (filtered.length < 2) {
      filtered = history.slice(-Math.min(history.length, 200));
    }
    return filtered;
  }

  function formatRangeTick(rangeKey, timestamp) {
    const config = RANGE_CONFIG[rangeKey] || RANGE_CONFIG["1D"];
    try {
      return config.formatTick(timestamp);
    } catch (error) {
      return formatTimestamp(timestamp);
    }
  }

  function updateSummary(rangeData) {
    if (!dom.totalValue || !dom.totalChange) return;
    const latestPoint =
      rangeData && rangeData.length ? rangeData[rangeData.length - 1] : history[history.length - 1];
    const firstPoint = rangeData && rangeData.length ? rangeData[0] : latestPoint;

    if (!latestPoint || !Number.isFinite(latestPoint.value)) {
      dom.totalValue.textContent = "--";
      dom.totalChange.textContent = "--";
      dom.totalChange.classList.remove(...POSITIVE_CHANGE_CLASSES, ...NEGATIVE_CHANGE_CLASSES);
      return;
    }

    dom.totalValue.textContent = formatCurrency(latestPoint.value);

    const baseValue = firstPoint && Number.isFinite(firstPoint.value) ? firstPoint.value : latestPoint.value;
    const rawChange = latestPoint.value - baseValue;
    const percentChange = baseValue !== 0 ? (rawChange / baseValue) * 100 : 0;
    const changeText = `${formatSignedCurrency(rawChange)} (${formatPercent(percentChange)}) ${(
      RANGE_CONFIG[activeRange] || RANGE_CONFIG["1D"]
    ).label}`;

    dom.totalChange.textContent = changeText;
    dom.totalChange.classList.remove(
      ...POSITIVE_CHANGE_CLASSES,
      ...NEGATIVE_CHANGE_CLASSES,
      ...ZERO_CHANGE_CLASSES
    );
    if (rawChange > 0.0001) {
      dom.totalChange.classList.add(...POSITIVE_CHANGE_CLASSES);
    } else if (rawChange < -0.0001) {
      dom.totalChange.classList.add(...NEGATIVE_CHANGE_CLASSES);
    } else {
      dom.totalChange.classList.add(...ZERO_CHANGE_CLASSES);
    }
  }

  function updateStatusText() {
    if (!dom.status) return;
    const timeText = latestTimestamp ? formatTimestamp(latestTimestamp) : null;
    const rangeLabel = (RANGE_CONFIG[activeRange] || RANGE_CONFIG["1D"]).label;
    if (timeText) {
      dom.status.textContent = `Synced at ${timeText} • View: ${rangeLabel}`;
    } else {
      dom.status.textContent = "Waiting for Google Sheets data...";
    }
  }

  function renderRange(rangeKey) {
    if (!ensureChart()) {
      setEmptyState(true);
      return;
    }

    const rangeData = getRangeData(rangeKey);
    const hasRawData = Array.isArray(rangeData) && rangeData.length > 0;
    let plotPoints = hasRawData ? [...rangeData] : [];

    if (hasRawData && plotPoints.length === 1) {
      const singlePoint = plotPoints[0];
      const earlierTimestamp = Math.max(
        singlePoint.timestamp - 5 * 60 * 1000,
        singlePoint.timestamp - 1
      );
      plotPoints = [
        { timestamp: earlierTimestamp, value: singlePoint.value },
        singlePoint,
      ];
    }

    const hasDataset = plotPoints.length >= 2;
    setEmptyState(!hasRawData);

    const palette = getPalette();
    chartInstance.data.labels = hasDataset
      ? plotPoints.map((entry) => formatRangeTick(rangeKey, entry.timestamp))
      : [];
    chartInstance.data.datasets[0].data = hasDataset
      ? plotPoints.map((entry) => Number(entry.value))
      : [];
    chartInstance.data.datasets[0].borderColor = palette.line;

    if (hasDataset) {
      const values = plotPoints.map((entry) => Number(entry.value));
      const min = Math.min(...values);
      const max = Math.max(...values);
      const spread = Math.max(max - min, min * 0.02 || 1);
      const padding = spread * 0.12;
      chartInstance.options.scales.y.suggestedMin = min - padding;
      chartInstance.options.scales.y.suggestedMax = max + padding;
    } else {
      delete chartInstance.options.scales.y.suggestedMin;
      delete chartInstance.options.scales.y.suggestedMax;
    }

    chartInstance.update();
    updateSummary(rangeData);
    updateStatusText();
  }

  function setActiveRange(rangeKey) {
    if (!RANGE_CONFIG[rangeKey]) rangeKey = "1D";
    activeRange = rangeKey;
    try {
      localStorage.setItem(RANGE_STORAGE_KEY, activeRange);
    } catch (error) {
      console.warn("Unable to persist active equity range:", error);
    }
    updateRangeButtons();
    renderRange(activeRange);
  }

  function updateRangeButtons() {
    dom.rangeButtons.forEach((button) => {
      const buttonRange = button.dataset.range;
      if (!buttonRange) return;
      const isActive = buttonRange === activeRange;
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
      if (isActive) {
        button.classList.add(...ACTIVE_BTN_CLASSES);
        button.classList.remove(...INACTIVE_BTN_TEXT);
        button.classList.remove(...INACTIVE_BTN_BORDER);
      } else {
        button.classList.remove(...ACTIVE_BTN_CLASSES);
        button.classList.add(...INACTIVE_BTN_TEXT);
        button.classList.add(...INACTIVE_BTN_BORDER);
      }
    });
  }

  function handleLiveUpdate(payload) {
    if (!payload || !payload.totals) return;
    latestTotals = payload.totals;
    latestTimestamp = Number(payload.lastUpdated) || Date.now();
    const equityValue = Number(payload.totals.currentValue);
    if (!Number.isFinite(equityValue)) {
      updateStatusText();
      return;
    }
    const pointAdded = addHistoryPoint(latestTimestamp, equityValue);
    if (pointAdded) {
      renderRange(activeRange);
    } else {
      updateSummary(getRangeData(activeRange));
      updateStatusText();
    }
  }

  function hydrateFromWindow() {
    if (window.livePriceSheetData) {
      handleLiveUpdate(window.livePriceSheetData);
    } else if (history.length) {
      latestTimestamp = history[history.length - 1].timestamp;
      renderRange(activeRange);
    } else {
      setEmptyState(true);
      updateStatusText();
    }
  }

  function bindRangeButtons() {
    dom.rangeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const range = button.dataset.range;
        setActiveRange(range);
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    dom.chart = document.getElementById("livePortfolioChart");
    dom.emptyState = document.getElementById("livePortfolioChartEmpty");
    dom.status = document.getElementById("livePortfolioChartStatus");
    dom.totalValue = document.getElementById("livePortfolioTotalValue");
    dom.totalChange = document.getElementById("livePortfolioTotalChange");
    dom.rangeButtons = Array.from(document.querySelectorAll(".live-equity-range-btn"));
    dom.resetButton = document.getElementById("livePortfolioResetBtn");

    RANGE_ORDER.forEach((key) => {
      if (!RANGE_CONFIG[key]) {
        console.warn(`Range configuration missing for key: ${key}`);
      }
    });

    history = loadHistory();
    ensureChart();
    bindRangeButtons();
    updateRangeButtons();
    if (dom.resetButton) {
      dom.resetButton.addEventListener("click", () => {
        resetHistory();
      });
    }
    hydrateFromWindow();
  });

  document.addEventListener("livePriceSheetUpdated", (event) => {
    if (!event || !event.detail) return;
    handleLiveUpdate(event.detail);
  });

  window.addEventListener("themechange", () => {
    updateChartAppearance();
  });

  window.resetLivePortfolioHistory = resetHistory;
})();
