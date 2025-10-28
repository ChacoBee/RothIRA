(() => {
  const indicesConfig = [
    {
      symbol: "^GSPC",
      name: "S&P 500",
      region: "Earth Sphere - Strategic Large Cap",
      cluster: "earth-sphere",
      description: "Core Federation equities - 500 issuers across the command sector.",
      accent: "#52d0d3",
    },
    {
      symbol: "^DJI",
      name: "Dow Jones",
      region: "Earth Sphere - Blue Chip Wing",
      cluster: "earth-sphere",
      description: "Price-weighted composite of 30 Earth Sphere industrial leaders.",
      accent: "#1f4d63",
    },
    {
      symbol: "^IXIC",
      name: "NASDAQ 100",
      region: "Earth Sphere - Tech Advance",
      cluster: "earth-sphere",
      description: "Growth-focused systems and avionics manufacturers driving innovation.",
      accent: "#ff6a1a",
    },
    {
      symbol: "^RUT",
      name: "Russell 2000",
      region: "Earth Sphere - Tactical Small Cap",
      cluster: "earth-sphere",
      description: "Federation light industry and support manufacturers on the rise.",
      accent: "#d64d3f",
    },
    {
      symbol: "^FTSE",
      name: "FTSE 100",
      region: "Outer Colonies - London Hub",
      cluster: "outer-colonies",
      description: "Mega-cap infrastructure and finance anchors from Britannia sector.",
      accent: "#9faed6",
    },
    {
      symbol: "^GDAXI",
      name: "DAX",
      region: "Outer Colonies - Euro Manufacturing",
      cluster: "outer-colonies",
      description: "Zeonic engineering and continental logistics consortium tracker.",
      accent: "#3d7ea6",
    },
    {
      symbol: "^N225",
      name: "Nikkei 225",
      region: "Outer Colonies - Pacific Command",
      cluster: "outer-colonies",
      description: "Advanced robotics and aerospace suppliers across the Pacific Rim.",
      accent: "#ffb347",
    },
    {
      symbol: "^HSI",
      name: "Hang Seng",
      region: "Neo Zeon - Frontier Capital",
      cluster: "neo-zeon",
      description: "Outer rim financial hubs with elevated intel sensitivity.",
      accent: "#233042",
    },
    {
      symbol: "^BSESN",
      name: "BSE Sensex",
      region: "Neo Zeon - Indo-Pacific Vanguard",
      cluster: "neo-zeon",
      description: "High-growth colonial outposts powering expanding supply lines.",
      accent: "#4dd0c8",
    },
  ];

  const REGION_KEYS = ["all", "earth-sphere", "outer-colonies", "neo-zeon"];
  const REFRESH_INTERVAL = 60 * 1000;
  const EVENTS_REFRESH_INTERVAL = 15 * 60 * 1000;
  const HISTORICAL_TIMESERIES = 45;
  const HISTORICAL_CACHE_TTL = 10 * 60 * 1000;
  const FMP_BASE_URL = "https://financialmodelingprep.com/api/v3";
  const YAHOO_BASE_URL =
    "https://query1.finance.yahoo.com/v7/finance/quote?symbols=";
  const YAHOO_CHART_BASE_URL =
    "https://query1.finance.yahoo.com/v8/finance/chart/";
  const sectionEl = document.getElementById("marketIndices");
  const gridEl = document.getElementById("marketIndicesGrid");
  const refreshBtn = document.getElementById("refreshIndicesBtn");
  const lastUpdatedEl = document.getElementById("indicesLastUpdated");
  const errorEl = document.getElementById("marketIndicesError");
  const fallbackContainer = document.getElementById("marketIndicesFallback");
  const fallbackWidgetEl = document.getElementById("marketIndicesWidget");
  const filtersContainer = document.getElementById("indicesRegionFilters");
  const regionButtons = filtersContainer
    ? Array.from(filtersContainer.querySelectorAll(".indices-filter-btn"))
    : [];
  const autoSyncToggle = document.getElementById("indicesAutoSyncToggle");
  const statsContainer = document.getElementById("marketIndicesStats");
  const eventsListEl = document.getElementById("marketIndicesEventsList");
  const timelineStatusEl = document.getElementById("marketIndicesTimelineStatus");
  const fmpApiKey = sectionEl?.dataset?.fmpKey || "demo";

  if (!sectionEl || !gridEl || !refreshBtn || !lastUpdatedEl) {
    return;
  }

  let hasInitialRender = false;
  let refreshTimer = null;
  let isFetching = false;
  let fallbackActive = false;
  let fallbackScript = null;
  let activeRegion = "all";
  let autoSyncEnabled = true;
  const sparklineCharts = new Map();
  const historicalCache = new Map();
  let latestQuoteMap = {};
  let analyticsRequestId = 0;
  let eventsRefreshTimer = null;

  const skeletonTemplate = `
    <article class="market-index-card market-index-card--skeleton">
      <div class="market-index-card__glow"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--badge"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--title"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--subtitle"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--price"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--change"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--sparkline"></div>
      <div class="market-index-card__skeleton market-index-card__skeleton--range"></div>
      <div class="market-index-card__skeleton-group">
        <div class="market-index-card__skeleton market-index-card__skeleton--stat"></div>
        <div class="market-index-card__skeleton market-index-card__skeleton--stat"></div>
        <div class="market-index-card__skeleton market-index-card__skeleton--stat"></div>
      </div>
    </article>
  `;

  function getActiveConfigs() {
    if (activeRegion === "all") {
      return indicesConfig;
    }
    return indicesConfig.filter((cfg) => cfg.cluster === activeRegion);
  }

  function setLoading(isLoading) {
    if (fallbackActive) {
      refreshBtn.disabled = isLoading;
      refreshBtn.classList.toggle("opacity-60", isLoading);
      refreshBtn.classList.remove("pointer-events-none");
      refreshBtn.textContent = isLoading ? "Retrying..." : "Retry Data Feed";
      return;
    }

    refreshBtn.disabled = isLoading;
    refreshBtn.classList.toggle("opacity-60", isLoading);
    refreshBtn.textContent = isLoading ? "Refreshing..." : "Refresh Now";

    if (isLoading && !hasInitialRender) {
      const skeletonCount = Math.max(1, getActiveConfigs().length);
      gridEl.innerHTML = Array.from({ length: skeletonCount })
        .map(() => skeletonTemplate)
        .join("");
    }
  }

  function formatNumber(value, options = {}) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "--";
    }

    const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return "--";
    }
    return numeric.toLocaleString("en-US", {
      minimumFractionDigits,
      maximumFractionDigits,
    });
  }

  function formatSigned(value, options = {}) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "--";
    }
    const { minimumFractionDigits = 2, maximumFractionDigits = 2 } = options;
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return "--";
    }
    const formatted = numeric.toLocaleString("en-US", {
      minimumFractionDigits,
      maximumFractionDigits,
    });
    return `${numeric >= 0 ? "+" : ""}${formatted}`;
  }

  function formatPercent(value) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "--";
    }
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return "--";
    }
    return `${numeric >= 0 ? "+" : ""}${numeric.toFixed(2)}%`;
  }

  function formatCompact(value) {
    if (value === undefined || value === null || Number.isNaN(value)) {
      return "--";
    }
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return "--";
    }
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: numeric >= 1 ? 1 : 2,
    }).format(numeric);
  }

  function hexToRgb(hex) {
    if (typeof hex !== "string") {
      return null;
    }
    let normalized = hex.trim().replace(/^#/, "");
    if (!normalized) {
      return null;
    }
    if (normalized.length === 3) {
      normalized = normalized
        .split("")
        .map((char) => char + char)
        .join("");
    }
    if (normalized.length !== 6) {
      return null;
    }
    const int = parseInt(normalized, 16);
    if (Number.isNaN(int)) {
      return null;
    }
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function createAccentStyle(hex) {
    if (typeof hex !== "string" || !hex.trim()) {
      return "";
    }
    const rgb = hexToRgb(hex);
    const parts = [`--accent-color:${hex}`];
    if (rgb) {
      parts.push(`--accent-color-rgb:${rgb.join(",")}`);
    }
    return ` style="${parts.join("; ")}"`;
  }

  function formatRelativeTimestamp(timestamp) {
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
      return "";
    }
    const diffMs = Date.now() - timestamp;
    if (diffMs <= 60 * 1000) {
      return "just now";
    }
    const diffMinutes = Math.round(diffMs / 60000);
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    }
    const diffHours = Math.round(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours}h ago`;
    }
    const diffDays = Math.round(diffHours / 24);
    return `${diffDays}d ago`;
  }

  function toNumeric(value) {
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : null;
    }
    if (typeof value === "string" && value.trim() === "") {
      return null;
    }
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  }

  function renderCards(dataMap = latestQuoteMap) {
    const sourceMap = dataMap || {};
    const configs = getActiveConfigs();

    if (configs.length === 0) {
      gridEl.innerHTML = `
        <article class="market-index-card market-index-card--empty">
          <div class="market-index-card__glow"></div>
          <div class="market-index-card__empty">
            <p>No indices assigned to this theatre yet.</p>
            <p class="market-index-card__empty-subtext">
              Adjust the filter or configure new watch targets to resume telemetry.
            </p>
          </div>
        </article>
      `;
      return;
    }

    const cards = configs.map((cfg) => {
      const quote = sourceMap[cfg.symbol] || {};
      const price = toNumeric(
        quote.price ?? quote.regularMarketPrice ?? quote.markPrice ?? null
      );
      const change = toNumeric(
        quote.change ?? quote.regularMarketChange ?? quote.percentChange ?? null
      );
      const changePct = toNumeric(
        quote.changesPercentage ??
          quote.regularMarketChangePercent ??
          quote.percentChange ??
          null
      );
      const open = toNumeric(quote.open ?? quote.regularMarketOpen ?? null);
      const dayLow = toNumeric(quote.dayLow ?? quote.regularMarketDayLow ?? null);
      const dayHigh = toNumeric(
        quote.dayHigh ?? quote.regularMarketDayHigh ?? null
      );
      const previousClose = toNumeric(
        quote.previousClose ?? quote.regularMarketPreviousClose ?? null
      );
      const volume = toNumeric(
        quote.volume ?? quote.regularMarketVolume ?? quote.totalVolume ?? null
      );
      const yearHigh = toNumeric(quote.yearHigh ?? quote.fiftyTwoWeekHigh ?? null);
      const yearLow = toNumeric(quote.yearLow ?? quote.fiftyTwoWeekLow ?? null);
      const updatedAtMs =
        typeof quote.timestamp === "number" && quote.timestamp > 0
          ? quote.timestamp * 1000
          : null;
      const isFresh =
        typeof updatedAtMs === "number"
          ? Date.now() - updatedAtMs < 15 * 60 * 1000
          : false;
      const stateLabel = updatedAtMs ? (isFresh ? "LIVE" : "DELAYED") : "OFFLINE";
      const badgeClass = isFresh
        ? "market-index-card__badge market-index-card__badge--live"
        : "market-index-card__badge market-index-card__badge--delayed";
      const hasChangeData = change !== null || changePct !== null;
      const trendMetric =
        change !== null
          ? change
          : changePct !== null
          ? changePct
          : 0;
      const isTrendDown = hasChangeData ? trendMetric < 0 : false;
      const trendClass = hasChangeData
        ? isTrendDown
          ? "market-index-card__change market-index-card__change--down"
          : "market-index-card__change market-index-card__change--up"
        : "market-index-card__change";
      const changeArrow = hasChangeData
        ? isTrendDown
          ? "&#9660;"
          : "&#9650;"
        : "&mdash;";
      const rangeAvailable =
        price !== null &&
        dayLow !== null &&
        dayHigh !== null &&
        dayHigh > dayLow;
      const rangePosition = rangeAvailable
        ? Math.min(
            100,
            Math.max(0, ((price - dayLow) / (dayHigh - dayLow)) * 100)
          )
        : null;
      const rangeClass = `market-index-card__range${
        rangeAvailable ? "" : " market-index-card__range--disabled"
      }`;
      const rangeAttributes = rangeAvailable
        ? ` style="--range-position:${rangePosition.toFixed(2)}%;"`
        : "";
      const displaySymbol = cfg.symbol.replace(/^\^/, "");
      const accentStyleAttr = createAccentStyle(cfg.accent);
      const updatedTime = updatedAtMs
        ? new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
          }).format(new Date(updatedAtMs))
        : "--";
      const relativeTime = updatedAtMs
        ? formatRelativeTimestamp(updatedAtMs)
        : "";
      const relativeSuffix = relativeTime ? ` &middot; ${relativeTime}` : "";
      const description = cfg.description || "";
      const rangeSummary =
        yearHigh !== null && yearLow !== null && price !== null && yearHigh > yearLow
          ? `${Math.round(((price - yearLow) / (yearHigh - yearLow)) * 100)}% of 52w band`
          : "";

      return `
        <article class="market-index-card" data-symbol="${cfg.symbol}"${accentStyleAttr}>
          <div class="market-index-card__glow"></div>
          <header class="market-index-card__header">
            <div class="market-index-card__identity">
              <span class="market-index-card__symbol">${displaySymbol}</span>
              <h4 class="market-index-card__name">${cfg.name}</h4>
              <p class="market-index-card__region">${cfg.region}</p>
            </div>
            <span class="${badgeClass}">${stateLabel}</span>
          </header>
          <div class="market-index-card__price-row">
            <span class="market-index-card__price">${formatNumber(price)}</span>
            <span class="${trendClass}">
              <span class="market-index-card__change-icon">${changeArrow}</span>
              <span class="market-index-card__change-value">${formatSigned(change)}</span>
              <span class="market-index-card__change-percent">${formatPercent(changePct)}</span>
            </span>
          </div>
          <p class="market-index-card__subtext">${description}</p>
          <div class="market-index-card__sparkline" data-symbol="${cfg.symbol}">
            <canvas data-symbol="${cfg.symbol}" aria-hidden="true"></canvas>
            <span class="market-index-card__sparkline-status">Calibrating telemetry...</span>
          </div>
          <div class="${rangeClass}"${rangeAttributes}>
            <div class="market-index-card__range-track">
              <div class="market-index-card__range-fill"></div>
              <div class="market-index-card__range-handle"></div>
            </div>
            <div class="market-index-card__range-labels">
              <span>${formatNumber(dayLow)}</span>
              <span>${formatNumber(dayHigh)}</span>
            </div>
          </div>
          <dl class="market-index-card__stats">
            <div class="market-index-card__stat">
              <dt>Open</dt>
              <dd>${formatNumber(open)}</dd>
            </div>
            <div class="market-index-card__stat">
              <dt>Prev Close</dt>
              <dd>${formatNumber(previousClose)}</dd>
            </div>
            <div class="market-index-card__stat">
              <dt>Volume</dt>
              <dd>${formatCompact(volume)}</dd>
            </div>
            <div class="market-index-card__stat market-index-card__stat--range">
              <dt>52w Util</dt>
              <dd>${rangeSummary || "--"}</dd>
            </div>
          </dl>
          <footer class="market-index-card__footer">
            <span class="market-index-card__timestamp">
              Updated ${updatedTime}${relativeSuffix}
            </span>
          </footer>
        </article>
      `;
    });

    gridEl.innerHTML = cards.join("");
    if (typeof window.reapplyRevealTransitions === "function") {
      window.reapplyRevealTransitions(gridEl);
    }
    clearError();
    hasInitialRender = true;
    if (fallbackActive) {
      deactivateFallback();
    }

    requestAnimationFrame(() => {
      configs.forEach((cfg) => {
        updateSparklineForSymbol(cfg.symbol).catch((error) => {
          console.warn(`Failed to render sparkline for ${cfg.symbol}:`, error);
        });
      });
    });

    updateAnalytics(configs, sourceMap);
  }

  async function updateSparklineForSymbol(symbol) {
    if (!gridEl) {
      return;
    }
    const sparklineHost = gridEl.querySelector(
      `.market-index-card__sparkline[data-symbol="${symbol}"]`
    );
    if (!sparklineHost) {
      return;
    }
    const canvas = sparklineHost.querySelector("canvas");
    const statusEl = sparklineHost.querySelector(
      ".market-index-card__sparkline-status"
    );
    const cfg = indicesConfig.find((item) => item.symbol === symbol);
    if (!canvas || !cfg) {
      if (statusEl) {
        statusEl.textContent = "Telemetry offline";
        statusEl.removeAttribute("hidden");
      }
      return;
    }

    if (typeof window.Chart === "undefined") {
      if (statusEl) {
        statusEl.textContent = "Chart module unavailable";
        statusEl.removeAttribute("hidden");
      }
      return;
    }

    try {
      const series = await getHistoricalSeries(symbol);
      const isSynthetic = Boolean(series && series.isSynthetic);
      if (!series || series.length < 2) {
        if (statusEl) {
          statusEl.textContent = "Awaiting historical feed";
          statusEl.removeAttribute("hidden");
        }
        return;
      }

      const chartLabels = series.map((point) => new Date(point.t));
      const labelFormatter = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      });
      const chartData = series.map((point) => toNumeric(point.v));
      const labels = chartLabels.map((date) => labelFormatter.format(date));

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Unable to initialise canvas context.");
      }

      if (!canvas.dataset.prepared) {
        canvas.width = canvas.offsetWidth || 240;
        canvas.height = canvas.offsetHeight || 92;
        canvas.dataset.prepared = "true";
      }

      let chart = sparklineCharts.get(symbol);
      const palette = getSparklinePalette(cfg.accent);
      const datasetFill = !isSynthetic;
      const datasetBackground = isSynthetic
        ? toRgba(
            palette.stroke,
            document.documentElement.classList.contains("dark-mode")
              ? 0.18
              : 0.12
          )
        : palette.fill;
      const datasetBorderDash = isSynthetic ? [4, 3] : [];
      const datasetBorderWidth = isSynthetic ? 1.5 : 2;

      if (!chart) {
        chart = new window.Chart(ctx, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: `${cfg.name} trend`,
                data: chartData,
                borderColor: palette.stroke,
                backgroundColor: datasetBackground,
                borderWidth: datasetBorderWidth,
                pointRadius: 0,
                tension: 0.35,
                fill: datasetFill,
                borderDash: datasetBorderDash,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: false,
              },
              y: {
                display: false,
              },
            },
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                intersect: false,
                callbacks: {
                  title() {
                    return "";
                  },
                  label(context) {
                    const value = context.parsed.y;
                    const label = labels[context.dataIndex] || "";
                    return ` ${label} : ${formatNumber(value, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`;
                  },
                },
              },
            },
            elements: {
              line: {
                borderCapStyle: "round",
              },
            },
          },
        });
        sparklineCharts.set(symbol, chart);
      } else {
        chart.data.labels = labels;
        chart.data.datasets[0].data = chartData;
        chart.data.datasets[0].borderColor = palette.stroke;
        chart.data.datasets[0].backgroundColor = datasetBackground;
        chart.data.datasets[0].fill = datasetFill;
        chart.data.datasets[0].borderDash = datasetBorderDash;
        chart.data.datasets[0].borderWidth = datasetBorderWidth;
        chart.update("none");
      }

      if (statusEl) {
        statusEl.textContent = isSynthetic ? "Synthetic telemetry" : "";
        if (isSynthetic) {
          statusEl.setAttribute("data-synthetic", "true");
        } else {
          statusEl.removeAttribute("data-synthetic");
        }
        statusEl.setAttribute("hidden", "hidden");
      }
      if (isSynthetic) {
        sparklineHost.setAttribute("data-synthetic", "true");
        sparklineHost.setAttribute("title", "Synthetic telemetry preview");
      } else {
        sparklineHost.removeAttribute("data-synthetic");
        sparklineHost.removeAttribute("title");
      }
      sparklineHost.classList.add("market-index-card__sparkline--ready");
      if (!isSynthetic) {
        applySeriesSnapshotToCard(symbol, series);
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = "Sparkline offline";
        statusEl.removeAttribute("hidden");
      }
      throw error;
    }
  }

  async function getHistoricalSeries(symbol) {
    const cached = historicalCache.get(symbol);
    if (cached) {
      const ttl = cached.synthetic ? 60 * 1000 : HISTORICAL_CACHE_TTL;
      if (Date.now() - cached.timestamp < ttl) {
        return cached.data;
      }
    }

    const encodedSymbol = encodeURIComponent(symbol);
    const query =
      "?range=1mo&interval=1d&includePrePost=false&events=div%2Csplits";
    const basePath = `${YAHOO_CHART_BASE_URL}${encodedSymbol}${query}`;
    const endpoints = [
      basePath,
      `https://cors.isomorphic-git.org/${basePath}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(basePath)}`,
      `https://corsproxy.io/?${encodeURIComponent(basePath)}`,
      `https://thingproxy.freeboard.io/fetch/${basePath}`,
      `https://r.jina.ai/${basePath}`,
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { cache: "no-cache" });
        if (!response.ok) {
          lastError = new Error(
            `Yahoo chart request failed (${response.status}).`
          );
          continue;
        }

        const text = await response.text();
        if (!text) {
          lastError = new Error("Yahoo chart returned an empty response.");
          continue;
        }

        const payload = JSON.parse(text);
        const result = payload?.chart?.result?.[0];
        if (!result) {
          lastError = new Error("Yahoo chart returned no result payload.");
          continue;
        }

        const timestamps = Array.isArray(result.timestamp)
          ? result.timestamp
          : [];
        const closeSeries = Array.isArray(result?.indicators?.quote)
          ? result.indicators.quote[0]?.close
          : null;
        const closes = Array.isArray(closeSeries) ? closeSeries : [];

        if (!timestamps.length || !closes.length) {
          lastError = new Error("Yahoo chart data incomplete.");
          continue;
        }

        const sanitized = [];
        const length = Math.min(timestamps.length, closes.length);
        for (let index = 0; index < length; index += 1) {
          const timestamp = Number(timestamps[index]);
          const closeValue = toNumeric(closes[index]);
          if (
            Number.isFinite(timestamp) &&
            closeValue !== null &&
            closeValue !== undefined
          ) {
            sanitized.push({
              t: timestamp * 1000,
              v: closeValue,
            });
          }
        }

        if (!sanitized.length) {
          lastError = new Error("Yahoo chart data had no valid points.");
          continue;
        }

        sanitized.sort((a, b) => a.t - b.t);
        const trimmed = sanitized.slice(-HISTORICAL_TIMESERIES);
        historicalCache.set(symbol, {
          timestamp: Date.now(),
          data: trimmed,
          synthetic: false,
        });
        return trimmed;
      } catch (error) {
        lastError = error;
      }
    }

    const synthetic = buildSyntheticSeriesFromQuote(symbol);
    if (synthetic) {
      console.warn(
        `Using synthetic sparkline series for ${symbol} after data fetch fallback.`
      );
      Object.defineProperty(synthetic, "isSynthetic", {
        value: true,
        enumerable: false,
      });
      historicalCache.set(symbol, {
        timestamp: Date.now(),
        data: synthetic,
        synthetic: true,
      });
      return synthetic;
    }

    throw (
      lastError ||
      new Error("Unable to retrieve historical data from Yahoo Finance.")
    );
  }

  function buildSyntheticSeriesFromQuote(symbol) {
    if (!latestQuoteMap || !latestQuoteMap[symbol]) {
      return null;
    }

    const quote = latestQuoteMap[symbol];
    const price = toNumeric(
      quote.price ?? quote.regularMarketPrice ?? quote.markPrice ?? null
    );
    if (price === null) {
      return null;
    }

    const changeValue = toNumeric(
      quote.change ?? quote.regularMarketChange ?? null
    );
    const changePercent = toNumeric(
      quote.changesPercentage ?? quote.regularMarketChangePercent ?? null
    );

    let startValue = null;
    if (changeValue !== null) {
      startValue = price - changeValue;
    } else if (changePercent !== null && changePercent !== -100) {
      startValue = price / (1 + changePercent / 100);
    }

    if (startValue === null || !Number.isFinite(startValue) || startValue <= 0) {
      startValue = price * 0.95;
    }

    const steps = HISTORICAL_TIMESERIES;
    const intervalMs = 24 * 60 * 60 * 1000;
    const delta = (price - startValue) / Math.max(steps - 1, 1);
    const now = Date.now();
    const series = [];

    for (let index = 0; index < steps; index += 1) {
      const progress = steps > 1 ? index / (steps - 1) : 1;
      const base = startValue + delta * index;
      const waveAmplitude = Math.abs(delta) * 0.4 || price * 0.01;
      const wave =
        waveAmplitude *
        Math.sin(progress * Math.PI * 1.65 + symbol.length * 0.45);
      let value = base + wave;
      if (index === 0) {
        value = startValue;
      } else if (index === steps - 1) {
        value = price;
      }
      value = Math.max(0, value);
      series.push({
        t: now - (steps - 1 - index) * intervalMs,
        v: Number(value.toFixed(2)),
      });
    }

    return series;
  }

  function getSparklinePalette(accentHex) {
    const stroke = accentHex || "#52d0d3";
    return {
      stroke,
      fill: toRgba(stroke, document.documentElement.classList.contains("dark-mode") ? 0.18 : 0.12),
    };
  }

  function toRgba(hexColor, alpha = 1) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) {
      return `rgba(82, 208, 220, ${alpha})`;
    }
    const [r, g, b] = rgb;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function hexToRgb(hexColor) {
    if (!hexColor) {
      return null;
    }
    let sanitized = hexColor.trim();
    if (sanitized.startsWith("#")) {
      sanitized = sanitized.slice(1);
    }
    if (sanitized.length === 3) {
      sanitized = sanitized
        .split("")
        .map((char) => char + char)
        .join("");
    }
    if (sanitized.length !== 6) {
      return null;
    }
    const r = parseInt(sanitized.slice(0, 2), 16);
    const g = parseInt(sanitized.slice(2, 4), 16);
    const b = parseInt(sanitized.slice(4, 6), 16);
    if ([r, g, b].some((component) => Number.isNaN(component))) {
      return null;
    }
    return [r, g, b];
  }

  function setStatValue(statKey, value) {
    if (!statsContainer) {
      return;
    }
    const target = statsContainer.querySelector(`[data-stat="${statKey}"]`);
    if (target) {
      target.textContent = value;
    }
  }

  function applySeriesSnapshotToCard(symbol, series) {
    if (!Array.isArray(series) || series.length === 0) {
      return;
    }
    const card = gridEl?.querySelector(`[data-symbol="${symbol}"]`);
    if (!card) {
      return;
    }
    const sorted = [...series].sort((a, b) => a.t - b.t);
    const latestPoint = sorted[sorted.length - 1];
    const previousPoint = sorted.length > 1 ? sorted[sorted.length - 2] : null;
    if (!latestPoint) {
      return;
    }

    const price = toNumeric(latestPoint.v);
    const prevClose = previousPoint ? toNumeric(previousPoint.v) : null;
    const change =
      prevClose !== null && price !== null ? price - prevClose : null;
    const changePct =
      prevClose !== null && price !== null && prevClose !== 0
        ? (change / prevClose) * 100
        : null;

    const priceEl = card.querySelector(".market-index-card__price");
    if (priceEl && price !== null) {
      priceEl.textContent = formatNumber(price);
    }

    const changeWrapper = card.querySelector(".market-index-card__change");
    const changeValueEl = card.querySelector(".market-index-card__change-value");
    const changePercentEl = card.querySelector(
      ".market-index-card__change-percent"
    );
    const changeIconEl = card.querySelector(".market-index-card__change-icon");

    if (changeWrapper) {
      changeWrapper.classList.remove(
        "market-index-card__change--up",
        "market-index-card__change--down"
      );
      if (change !== null && changePct !== null) {
        const isDown = change < 0;
        changeWrapper.classList.add(
          isDown
            ? "market-index-card__change--down"
            : "market-index-card__change--up"
        );
        if (changeIconEl) {
          changeIconEl.innerHTML = isDown ? "&#9660;" : "&#9650;";
        }
        if (changeValueEl) {
          changeValueEl.textContent = formatSigned(change);
        }
        if (changePercentEl) {
          changePercentEl.textContent = formatPercent(changePct);
        }
      } else {
        if (changeIconEl) {
          changeIconEl.innerHTML = "&mdash;";
        }
        if (changeValueEl) {
          changeValueEl.textContent = "--";
        }
        if (changePercentEl) {
          changePercentEl.textContent = "--";
        }
      }
    }

    const statValues = card.querySelectorAll(".market-index-card__stat dd");
    if (statValues[0]) {
      statValues[0].textContent =
        sorted.length > 1
          ? formatNumber(sorted[sorted.length - 2].v)
          : formatNumber(price);
    }
    if (statValues[1]) {
      statValues[1].textContent =
        prevClose !== null ? formatNumber(prevClose) : "--";
    }

    const timestampEl = card.querySelector(".market-index-card__timestamp");
    if (timestampEl) {
      const updatedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(latestPoint.t));
      const dateLabel = new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }).format(new Date(latestPoint.t));
      timestampEl.textContent = `Updated ${updatedTime} ${dateLabel} (Yahoo)`;
    }

    const badgeEl = card.querySelector(".market-index-card__badge");
    if (badgeEl) {
      badgeEl.textContent = "DELAYED";
      badgeEl.classList.remove("market-index-card__badge--delayed");
      badgeEl.classList.add("market-index-card__badge--delayed");
    }

    const rangeLabels =
      card.querySelectorAll(".market-index-card__range-labels span");
    if (rangeLabels.length === 2) {
      const closes = sorted
        .map((point) => toNumeric(point.v))
        .filter((value) => value !== null);
      if (closes.length > 0) {
        const min = Math.min(...closes);
        const max = Math.max(...closes);
        rangeLabels[0].textContent = formatNumber(min);
        rangeLabels[1].textContent = formatNumber(max);

        const rangeTrack = card.querySelector(".market-index-card__range");
        if (rangeTrack) {
          const position =
            max > min ? ((price - min) / (max - min)) * 100 : 0;
          rangeTrack.classList.remove("market-index-card__range--disabled");
          rangeTrack.style.setProperty(
            "--range-position",
            `${Math.min(Math.max(position, 0), 100).toFixed(2)}%`
          );
        }
      }
    }
  }

  function computeReturns(closes) {
    const results = [];
    for (let i = 1; i < closes.length; i += 1) {
      const prev = toNumeric(closes[i - 1]);
      const curr = toNumeric(closes[i]);
      if (prev !== null && prev !== 0 && curr !== null) {
        results.push((curr - prev) / prev);
      }
    }
    return results;
  }

  function average(values) {
    if (!Array.isArray(values) || values.length === 0) {
      return null;
    }
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length;
  }

  function standardDeviation(values) {
    if (!Array.isArray(values) || values.length < 2) {
      return null;
    }
    const mean = average(values);
    const variance =
      values.reduce((acc, value) => acc + (value - mean) ** 2, 0) /
      (values.length - 1 || 1);
    return Math.sqrt(Math.max(variance, 0));
  }

  function computeCorrelation(seriesA, seriesB) {
    if (!Array.isArray(seriesA) || !Array.isArray(seriesB)) {
      return null;
    }
    const length = Math.min(seriesA.length, seriesB.length);
    if (length < 2) {
      return null;
    }
    const sliceA = seriesA.slice(-length);
    const sliceB = seriesB.slice(-length);
    const meanA = average(sliceA);
    const meanB = average(sliceB);
    let numerator = 0;
    let denomA = 0;
    let denomB = 0;
    for (let index = 0; index < length; index += 1) {
      const diffA = sliceA[index] - meanA;
      const diffB = sliceB[index] - meanB;
      numerator += diffA * diffB;
      denomA += diffA ** 2;
      denomB += diffB ** 2;
    }
    if (denomA <= 0 || denomB <= 0) {
      return null;
    }
    return numerator / Math.sqrt(denomA * denomB);
  }

  async function updateAnalytics(configs, dataMap) {
    if (!statsContainer) {
      return;
    }
    const statKeys = ["volatility", "momentum", "range", "correlation"];
    statKeys.forEach((key) => setStatValue(key, "..."));
    const requestId = ++analyticsRequestId;

    try {
      const results = await Promise.all(
        configs.map(async (cfg) => {
          try {
            const series = await getHistoricalSeries(cfg.symbol);
            if (!series || series.length < 2 || series.isSynthetic) {
              return null;
            }
            const closes = series.map((point) => point.v);
            const returns = computeReturns(closes);
            return {
              cfg,
              series,
              closes,
              returns,
            };
          } catch (error) {
            console.warn(`Historical analytics unavailable for ${cfg.symbol}`, error);
            return null;
          }
        })
      );

      if (requestId !== analyticsRequestId) {
        return;
      }

      const valid = results.filter(Boolean);
      if (!valid.length) {
        statKeys.forEach((key) => setStatValue(key, "--"));
        return;
      }

      const volatilityValues = valid
        .map(({ returns }) => standardDeviation(returns))
        .filter((value) => Number.isFinite(value));
      const avgVolatility = volatilityValues.length
        ? average(volatilityValues) * 100
        : null;
      setStatValue(
        "volatility",
        avgVolatility !== null ? `${avgVolatility.toFixed(2)}%` : "--"
      );

      const momentumValues = valid
        .map(({ closes }) => {
          const start = closes[0];
          const end = closes[closes.length - 1];
          if (!Number.isFinite(start) || start === 0 || !Number.isFinite(end)) {
            return null;
          }
          return ((end - start) / start) * 100;
        })
        .filter((value) => Number.isFinite(value));
      const avgMomentum = momentumValues.length
        ? average(momentumValues)
        : null;
      setStatValue(
        "momentum",
        avgMomentum !== null
          ? `${avgMomentum >= 0 ? "+" : ""}${avgMomentum.toFixed(2)}%`
          : "--"
      );

      const rangeValues = valid
        .map(({ cfg }) => {
          const quote =
            dataMap?.[cfg.symbol] ?? latestQuoteMap?.[cfg.symbol] ?? {};
          const price = toNumeric(
            quote.price ??
              quote.regularMarketPrice ??
              quote.markPrice ??
              quote.close ??
              null
          );
          const yearHigh = toNumeric(
            quote.yearHigh ?? quote.fiftyTwoWeekHigh ?? null
          );
          const yearLow = toNumeric(
            quote.yearLow ?? quote.fiftyTwoWeekLow ?? null
          );
          if (
            price === null ||
            yearHigh === null ||
            yearLow === null ||
            yearHigh <= yearLow
          ) {
            return null;
          }
          return ((price - yearLow) / (yearHigh - yearLow)) * 100;
        })
        .filter((value) => Number.isFinite(value));
      const avgRange = rangeValues.length ? average(rangeValues) : null;
      setStatValue(
        "range",
        avgRange !== null ? `${avgRange.toFixed(1)}% engaged` : "--"
      );

      let correlationValue = null;
      if (valid.length >= 2) {
        const correlations = [];
        for (let i = 0; i < valid.length; i += 1) {
          for (let j = i + 1; j < valid.length; j += 1) {
            const corr = computeCorrelation(
              valid[i].returns,
              valid[j].returns
            );
            if (Number.isFinite(corr)) {
              correlations.push(corr);
            }
          }
        }
        if (correlations.length) {
          correlationValue = average(correlations);
        }
      }
      setStatValue(
        "correlation",
        correlationValue !== null ? correlationValue.toFixed(2) : "--"
      );
    } catch (error) {
      console.warn("Unable to refresh analytics panel:", error);
      if (requestId === analyticsRequestId) {
        statKeys.forEach((key) => setStatValue(key, "--"));
      }
    }
  }

  function refreshSparklineThemes() {
    if (!sparklineCharts.size) {
      return;
    }
    sparklineCharts.forEach((chart, symbol) => {
      const cfg = indicesConfig.find((item) => item.symbol === symbol);
      if (!cfg || !chart?.data?.datasets?.[0]) {
        return;
      }
      const palette = getSparklinePalette(cfg.accent);
      const dataset = chart.data.datasets[0];
      const host = chart.canvas?.parentNode;
      const hostSynthetic = host?.dataset?.synthetic === "true";
      const datasetSynthetic =
        hostSynthetic ||
        dataset.fill === false ||
        (Array.isArray(dataset.borderDash) && dataset.borderDash.length > 0);
      const backgroundColor = datasetSynthetic
        ? toRgba(
            palette.stroke,
            document.documentElement.classList.contains("dark-mode")
              ? 0.18
              : 0.12
          )
        : palette.fill;
      dataset.borderColor = palette.stroke;
      dataset.backgroundColor = backgroundColor;
      if (datasetSynthetic) {
        dataset.borderDash =
          Array.isArray(dataset.borderDash) && dataset.borderDash.length
            ? dataset.borderDash
            : [4, 3];
        dataset.fill = false;
        dataset.borderWidth = dataset.borderWidth ?? 1.5;
      } else {
        dataset.borderDash = [];
        dataset.fill = true;
        dataset.borderWidth = 2;
      }
      chart.update("none");
    });
  }

  function updateFilterSelectionState() {
    if (!regionButtons || !regionButtons.length) {
      return;
    }
    regionButtons.forEach((button) => {
      const regionKey = button.dataset.region || "all";
      const isActive = regionKey === activeRegion;
      button.setAttribute("aria-selected", String(isActive));
      button.classList.toggle("indices-filter-btn--active", isActive);
    });
  }

  function setActiveRegion(nextRegion) {
    const normalized = REGION_KEYS.includes(nextRegion) ? nextRegion : "all";
    if (normalized === activeRegion) {
      return;
    }
    activeRegion = normalized;
    updateFilterSelectionState();
    if (Object.keys(latestQuoteMap).length > 0) {
      renderCards(latestQuoteMap);
    } else {
      renderCards({});
    }
  }

  function updateAutoSyncToggleUI() {
    if (!autoSyncToggle) {
      return;
    }
    autoSyncToggle.setAttribute("aria-checked", String(autoSyncEnabled));
    autoSyncToggle.classList.toggle("auto-sync-toggle--off", !autoSyncEnabled);
    const indicator = autoSyncToggle.querySelector(".toggle-indicator");
    if (indicator) {
      indicator.style.transform = autoSyncEnabled
        ? "translateX(16px)"
        : "translateX(0)";
    }
    const labelEl = autoSyncToggle.querySelector(".auto-sync-label");
    if (labelEl) {
      labelEl.textContent = autoSyncEnabled ? "Auto-sync" : "Manual";
    }
  }

  function formatIsoDate(date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function addDays(baseDate, days) {
    const copy = new Date(baseDate);
    copy.setUTCDate(copy.getUTCDate() + days);
    return copy;
  }

  async function refreshMacroEvents() {
    if (!eventsListEl) {
      return;
    }
    if (timelineStatusEl) {
      timelineStatusEl.textContent = "Syncing...";
    }

    try {
      const now = new Date();
      const from = formatIsoDate(now);
      const to = formatIsoDate(addDays(now, 7));
      const endpoint = `${FMP_BASE_URL}/economic_calendar?from=${from}&to=${to}&apikey=${fmpApiKey}&_=${Date.now()}`;
      const response = await fetch(endpoint, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`Calendar feed unavailable (${response.status}).`);
      }

      const payload = await response.json();
      const events = Array.isArray(payload) ? payload : [];
      const refined = events
        .filter((event) => event && event.date)
        .map((event) => {
          const timeToken = event.time || "00:00";
          const isoTimestamp = `${event.date}T${timeToken.length === 5 ? `${timeToken}:00` : timeToken}Z`;
          const eventDate = new Date(isoTimestamp);
          return { ...event, eventDate };
        })
        .filter((event) => Number.isFinite(event.eventDate?.getTime()))
        .sort((a, b) => a.eventDate - b.eventDate)
        .slice(0, 6);

      if (!refined.length) {
        eventsListEl.innerHTML = `
          <li class="market-indices-event market-indices-event--empty">
            <div>
              <p class="market-indices-event__title">No major transmissions</p>
              <p class="market-indices-event__meta">No high-impact macro events detected in the next 7 days.</p>
            </div>
          </li>
        `;
      } else {
        eventsListEl.innerHTML = refined
          .map((event) => {
            const dateLabel = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
            }).format(event.eventDate);
            const timeLabel = new Intl.DateTimeFormat("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "UTC",
            }).format(event.eventDate);
            const title = event.event || "Macro event";
            const region = event.country ? event.country.toUpperCase() : "GLOBAL";
            const impact = event.impact || event.importance || "";
            const metaParts = [region, impact].filter(Boolean).join(" | ");
            const detailParts = [];
            if (event.estimate !== null && event.estimate !== undefined) {
              detailParts.push(`Est ${event.estimate}`);
            }
            if (event.previous !== null && event.previous !== undefined) {
              detailParts.push(`Prev ${event.previous}`);
            }
            if (event.actual !== null && event.actual !== undefined) {
              detailParts.push(`Actual ${event.actual}`);
            }
            const detailLine = detailParts.join(" | ");
            return `
              <li class="market-indices-event">
                <div class="market-indices-event__time">
                  <span class="market-indices-event__date">${dateLabel}</span>
                  <span class="market-indices-event__clock">${timeLabel}Z</span>
                </div>
                <div>
                  <p class="market-indices-event__title">${title}</p>
                  <p class="market-indices-event__meta">${metaParts || "Intel broadcast pending"}</p>
                  ${
                    detailLine
                      ? `<p class="market-indices-event__detail">${detailLine}</p>`
                      : ""
                  }
                </div>
              </li>
            `;
          })
          .join("");
      }

      if (timelineStatusEl) {
        const stamp = new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "UTC",
        }).format(new Date());
        timelineStatusEl.textContent = `Updated ${stamp}Z`;
      }
    } catch (error) {
      console.warn("Macro events unavailable:", error);
      eventsListEl.innerHTML = `
        <li class="market-indices-event market-indices-event--error">
          <div>
            <p class="market-indices-event__title">Macro feed offline</p>
            <p class="market-indices-event__meta">Attempt a manual refresh or verify your API allowance.</p>
          </div>
        </li>
      `;
      if (timelineStatusEl) {
        timelineStatusEl.textContent = "Offline";
      }
    }
  }

  function scheduleEventRefresh() {
    if (eventsRefreshTimer) {
      clearInterval(eventsRefreshTimer);
      eventsRefreshTimer = null;
    }
    if (!eventsListEl) {
      return;
    }
    eventsRefreshTimer = setInterval(() => {
      refreshMacroEvents();
    }, EVENTS_REFRESH_INTERVAL);
  }

  function getCurrentColorTheme() {
    if (typeof isDarkMode !== "undefined") {
      return isDarkMode ? "dark" : "light";
    }
    return document.documentElement.classList.contains("dark-mode")
      ? "dark"
      : "light";
  }

  function renderFallbackWidget() {
    if (!fallbackWidgetEl) {
      return;
    }

    fallbackWidgetEl.innerHTML =
      '<div class="tradingview-widget-container__widget"></div>';
    fallbackScript = document.createElement("script");
    fallbackScript.type = "text/javascript";
    fallbackScript.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
    fallbackScript.async = true;

    const colorTheme = getCurrentColorTheme();
    fallbackScript.text = JSON.stringify({
      colorTheme,
      dateRange: "1D",
      showChart: true,
      locale: "en",
      largeChartUrl: "",
      isTransparent: false,
      width: "100%",
      height: "420",
      plotLineColorGrowing: "rgba(82, 208, 220, 1)",
      plotLineColorFalling: "rgba(214, 77, 63, 1)",
      gridLineColor:
        colorTheme === "dark"
          ? "rgba(55, 65, 81, 0.6)"
          : "rgba(219, 222, 227, 0.5)",
      scaleFontColor:
        colorTheme === "dark"
          ? "rgba(226, 232, 240, 1)"
          : "rgba(55, 65, 81, 1)",
      belowLineFillColorGrowing: "rgba(82, 208, 220, 0.18)",
      belowLineFillColorFalling: "rgba(214, 77, 63, 0.18)",
      symbolActiveColor: "rgba(255, 106, 26, 0.3)",
      tabs: [
        {
          title: "Global Indices",
          symbols: [
            { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
            { s: "FOREXCOM:DJI", d: "Dow Jones 30" },
            { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
            { s: "FOREXCOM:UK100", d: "FTSE 100" },
          ],
        },
      ],
    });

    fallbackWidgetEl.appendChild(fallbackScript);
  }

  function deactivateFallback() {
    if (!fallbackActive) {
      return;
    }
    fallbackActive = false;
    refreshBtn.disabled = false;
    refreshBtn.classList.remove("opacity-60", "pointer-events-none");
    refreshBtn.textContent = "Refresh Now";
    if (gridEl) {
      gridEl.classList.remove("hidden");
      if (typeof window.reapplyRevealTransitions === "function") {
        window.reapplyRevealTransitions(gridEl);
      }
    }
    if (fallbackContainer) {
      fallbackContainer.classList.add("hidden");
    }
    if (fallbackWidgetEl) {
      fallbackWidgetEl.innerHTML = "";
    }
    fallbackScript = null;
    startAutoRefresh();
    if (errorEl) {
      errorEl.classList.add("hidden");
    }
  }

  function activateFallback(reason) {
    if (fallbackActive) {
      return;
    }
    fallbackActive = true;
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
    refreshBtn.disabled = false;
    refreshBtn.classList.remove("opacity-60", "pointer-events-none");
    refreshBtn.textContent = "Retry Data Feed";
    if (gridEl) {
      gridEl.classList.add("hidden");
    }
    if (fallbackContainer) {
      fallbackContainer.classList.remove("hidden");
      if (typeof window.reapplyRevealTransitions === "function") {
        window.reapplyRevealTransitions(fallbackContainer);
      }
    }
    if (lastUpdatedEl) {
      lastUpdatedEl.textContent = "Updated: via TradingView feed";
    }
    renderFallbackWidget();

    if (errorEl) {
      const hint =
        "Switched to TradingView live feed. Confirm your Financial Modeling Prep API key and plan include index data to restore the card view.";
      const message = reason ? `${reason}. ${hint}` : hint;
      errorEl.classList.remove("hidden");
      errorEl.textContent = message;
    }
  }

  function updateTimestamp(quotes, sourceLabel) {
    const timestamps = quotes
      .map((q) => {
        if (typeof q.timestamp === "number" && q.timestamp > 0) {
          return q.timestamp;
        }
        return q.regularMarketTime || q.postMarketTime || q.preMarketTime;
      })
      .filter(Boolean);

    const latest =
      timestamps.length > 0
        ? new Date(Math.max(...timestamps) * 1000)
        : new Date();

    const timePart = latest.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    const datePart = latest.toLocaleDateString([], {
      month: "short",
      day: "numeric",
    });

    const sourceSuffix = sourceLabel ? ` (${sourceLabel})` : "";
    lastUpdatedEl.textContent = `Updated: ${timePart} ${datePart}${sourceSuffix}`;
  }

  function handleError(message) {
    if (errorEl) {
      errorEl.classList.remove("hidden");
      const helpful =
        fmpApiKey === "demo"
          ? " (demo key is rate-limited; consider upgrading or supplying a personal Financial Modeling Prep API key.)"
          : " (check your API credentials and network connection.)";
      errorEl.textContent =
        (message ||
          "Unable to load market data right now. Please try again shortly.") +
        helpful;
    }
  }

  function clearError() {
    if (errorEl) {
      errorEl.classList.add("hidden");
    }
  }

  async function fetchMarketIndices() {
    if (isFetching) {
      return;
    }

    isFetching = true;
    setLoading(true);
    clearError();

    try {
      const symbolsQuery = indicesConfig.map((cfg) => cfg.symbol).join(",");
      let quotes;
      let sourceLabel = "FMP";
      try {
        quotes = await requestFmpQuotes(symbolsQuery);
      } catch (fmpError) {
        console.warn("FMP market data request failed, attempting Yahoo:", fmpError);
        try {
          quotes = await requestYahooQuotes(symbolsQuery);
          sourceLabel = "Yahoo Finance";
        } catch (yahooError) {
          console.error("Yahoo Finance fallback failed:", yahooError);
          const combinedMessage = `FMP: ${fmpError?.message || "unavailable"} | Yahoo: ${yahooError?.message || "unavailable"}`;
          const combinedError = new Error(combinedMessage);
          combinedError.cause = { fmpError, yahooError };
          throw combinedError;
        }
      }

      const dataMap = quotes.reduce((acc, quote) => {
        if (quote && quote.symbol) {
          acc[quote.symbol] = quote;
        }
        return acc;
      }, {});

      const targetSymbols = indicesConfig.map((cfg) => cfg.symbol);
      const missingSymbols = targetSymbols.filter(
        (symbol) => !dataMap[symbol]
      );

      if (missingSymbols.length > 0) {
        try {
          const yahooFillQuotes = await requestYahooQuotes(
            missingSymbols.join(",")
          );
          yahooFillQuotes.forEach((quote) => {
            if (quote && quote.symbol) {
              dataMap[quote.symbol] = quote;
            }
          });

          quotes = targetSymbols
            .map((symbol) => dataMap[symbol])
            .filter(Boolean);
          sourceLabel =
            sourceLabel === "FMP" ? "FMP + Yahoo" : "Yahoo Finance";
        } catch (fillError) {
          console.warn("Yahoo fallback for missing symbols failed:", fillError);
        }
      }

      latestQuoteMap = { ...dataMap };
      renderCards(dataMap);
      updateTimestamp(quotes, sourceLabel);
    } catch (err) {
      console.error("Failed to fetch market indices:", err);
      const reason = err?.message || "Market data service unavailable.";
      const shouldFallback =
        /401|403|429/i.test(reason) ||
        reason.toLowerCase().includes("apikey") ||
        fmpApiKey === "demo";

      if (shouldFallback) {
        activateFallback(reason);
      } else {
        handleError(
          reason ||
            "Unable to load market data right now. Please try again shortly."
        );
      }
    } finally {
      isFetching = false;
      setLoading(false);
    }
  }

  async function requestFmpQuotes(symbolsQuery) {
    const encodedSymbols = symbolsQuery
      .split(",")
      .map((symbol) => encodeURIComponent(symbol))
      .join(",");
    const cacheBuster = Date.now();

    const endpoints = [
      `${FMP_BASE_URL}/quote/${encodedSymbols}?apikey=${fmpApiKey}&_=${cacheBuster}`,
      `${FMP_BASE_URL}/quotes/index?apikey=${fmpApiKey}&_=${cacheBuster}`,
    ];

    const targetSymbols = new Set(
      symbolsQuery.split(",").map((symbol) => symbol.trim())
    );

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          cache: "no-cache",
          mode: "cors",
        });

        if (!response.ok) {
          lastError = new Error(
            `Market data request failed (${response.status}).`
          );
          continue;
        }

        const payload = await response.json();
        if (!Array.isArray(payload) || payload.length === 0) {
          lastError = new Error("No market data returned.");
          continue;
        }

        if (endpoint.includes("/quotes/index")) {
          const filtered = payload.filter((item) =>
            targetSymbols.has(item.symbol)
          );
          if (filtered.length === 0) {
            lastError = new Error("Requested indices not found in feed.");
            continue;
          }
          return filtered;
        }

        const filteredPrimary = payload.filter((item) =>
          targetSymbols.has(item.symbol)
        );

        if (filteredPrimary.length === 0) {
          lastError = new Error("Requested indices not found in feed.");
          continue;
        }

        return filteredPrimary;
      } catch (error) {
        lastError = error;
      }
    }

    throw (
      lastError ||
      new Error("Unable to reach market data provider at this time.")
    );
  }

  async function requestYahooQuotes(symbolsQuery) {
    const encodedSymbols = encodeURIComponent(symbolsQuery);
    const basePath = `${YAHOO_BASE_URL}${encodedSymbols}`;
    const endpoints = [
      basePath,
      `https://cors.isomorphic-git.org/${basePath}`,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(basePath)}`,
      `https://corsproxy.io/?${encodeURIComponent(basePath)}`,
    ];

    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, { cache: "no-cache" });
        if (!response.ok) {
          lastError = new Error(
            `Yahoo Finance request failed (${response.status}).`
          );
          continue;
        }

        const text = await response.text();
        if (!text) {
          lastError = new Error("Yahoo Finance returned an empty response.");
          continue;
        }

        const payload = JSON.parse(text);
        const quotes = payload?.quoteResponse?.result;
        if (Array.isArray(quotes) && quotes.length > 0) {
          return quotes;
        }

        lastError = new Error("Yahoo Finance returned no market data.");
      } catch (error) {
        lastError = error;
      }
    }

    throw (
      lastError ||
      new Error("Unable to retrieve market data from Yahoo Finance.")
    );
  }

  function startAutoRefresh() {
    if (!autoSyncEnabled) {
      return;
    }
    if (refreshTimer) {
      clearInterval(refreshTimer);
    }
    refreshTimer = setInterval(() => {
      fetchMarketIndices();
    }, REFRESH_INTERVAL);
  }

  function stopAutoRefresh() {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
    }
  }

  if (regionButtons.length) {
    regionButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const nextRegion = button.dataset.region || "all";
        setActiveRegion(nextRegion);
      });
    });
  }

  if (autoSyncToggle) {
    autoSyncToggle.addEventListener("click", () => {
      autoSyncEnabled = !autoSyncEnabled;
      if (autoSyncEnabled) {
        updateAutoSyncToggleUI();
        fetchMarketIndices();
        startAutoRefresh();
      } else {
        stopAutoRefresh();
        updateAutoSyncToggleUI();
      }
    });
  }

  refreshBtn.addEventListener("click", () => {
    fetchMarketIndices();
  });

  window.addEventListener("themechange", () => {
    if (fallbackActive) {
      renderFallbackWidget();
      refreshBtn.disabled = false;
      refreshBtn.classList.remove("opacity-60", "pointer-events-none");
      refreshBtn.textContent = "Retry Data Feed";
    }
    refreshSparklineThemes();
    updateAutoSyncToggleUI();
  });

  updateFilterSelectionState();
  updateAutoSyncToggleUI();

  if (eventsListEl) {
    refreshMacroEvents();
    scheduleEventRefresh();
  }

  fetchMarketIndices();
  startAutoRefresh();
})();
