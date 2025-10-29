(function () {
  "use strict";

  const FILTER_LABELS = {
    sp500: "S&P 500",
    dow30: "Dow Jones 30",
    nasdaq100: "Nasdaq 100",
    russell2000: "Russell 2000",
  };

  // TradingView dataset identifiers for the stock heatmap
  const FILTER_SOURCES = {
    sp500: "S&P500",
    dow30: "DOWJONES",
    nasdaq100: "NASDAQ100",
    russell2000: "RUSSELL2000",
  };

  const HEATMAP_INTEL_LIBRARY = {
    sp500: {
      day: [
        "Quan sát độ rộng của nhóm vốn hóa lớn để xác nhận đà tăng/giảm của S&P.",
        "Theo dõi nhóm phòng thủ (healthcare, utilities) để nhận diện dòng tiền trú ẩn.",
        "Nếu mega-cap dẫn dắt nhiệt độ, hãy kiểm tra tỷ trọng ETF lõi để tránh lệch mục tiêu.",
      ],
      week: [
        "Động lực trong tuần thể hiện xu hướng trung hạn; so sánh với mục tiêu tái cân bằng của bạn.",
        "Xem xét phân bổ giữa tăng trưởng và giá trị để điều chỉnh độ lệch nếu cần.",
      ],
    },
    dow30: {
      day: [
        "Dow 30 phản ánh cổ phiếu blue-chip; dùng để kiểm tra tâm lý nhà đầu tư bảo thủ.",
        "Tín hiệu đỏ có thể kéo chỉ số công nghiệp xuống – cân nhắc phòng thủ ngắn hạn.",
      ],
      week: [
        "Nếu Dow mạnh hơn S&P, dòng tiền đang ưu tiên chất lượng cao với biến động thấp.",
        "Lập kế hoạch bổ sung các vị thế giá trị nếu trend tiếp diễn.",
      ],
    },
    nasdaq100: {
      day: [
        "Nasdaq thể hiện khẩu vị rủi ro đối với công nghệ; giám sát để điều chỉnh sleeve tăng trưởng.",
        "Kiểm tra các cổ phiếu cloud/AI quan trọng nếu nhiệt map chuyển đỏ.",
      ],
      week: [
        "Xu hướng tuần phản ánh momentum công nghệ – phù hợp với các ETF QQQM/SMH trong danh mục.",
        "Cân nhắc khóa lợi nhuận nếu đà tăng quá nóng so với mục tiêu rủi ro.",
      ],
    },
    russell2000: {
      day: [
        "Russell 2000 theo dõi small-cap; biến động mạnh có thể ảnh hưởng sleeve AVUV.",
        "Dùng làm thước đo thanh khoản thị trường nội địa.",
      ],
      week: [
        "Nếu small-cap yếu, giữ tỷ trọng phòng thủ và giảm đòn bẩy tăng trưởng.",
        "Khi small-cap phục hồi, xem xét nâng vị thế giá trị nhỏ (AVUV).",
      ],
    },
  };

  const HEATMAP_PORTFOLIO_MEMBERSHIP = {
    sp500: ["VOO", "AMZN", "SPMO", "SPHQ"],
    dow30: ["VOO", "AMZN"],
    nasdaq100: ["QQQM", "SMH", "AMZN"],
    russell2000: ["AVUV"],
  };

  const WATCHLIST_STORAGE_KEY = "heatmapWatchlist";
  const MAX_INTEL_ITEMS = 4;
  const WATCHLIST_LIMIT = 12;

  const safeNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  };

  function sanitizeTicker(input) {
    if (!input) return "";
    const cleaned = String(input)
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9.\-]/g, "");
    return cleaned.slice(0, 10);
  }

  function loadWatchlistFromStorage() {
    try {
      const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return [];
      return parsed
        .map((ticker) => sanitizeTicker(ticker))
        .filter(Boolean)
        .slice(0, WATCHLIST_LIMIT);
    } catch (error) {
      console.warn("Failed to load heatmap watchlist:", error);
      return [];
    }
  }

  function saveWatchlistToStorage(list) {
    try {
      localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(list));
    } catch (error) {
      console.warn("Failed to persist heatmap watchlist:", error);
    }
  }

  function formatPercentInline(value) {
    if (typeof formatPercent === "function") {
      return formatPercent(value);
    }
    return `${Number(value || 0).toFixed(2)}%`;
  }

  function getTradingViewSymbolUrl(ticker) {
    if (typeof getTradingViewSymbol === "function") {
      const mapped = getTradingViewSymbol(ticker);
      if (mapped && typeof mapped === "string") {
        const path = mapped.replace(":", "-");
        return `https://www.tradingview.com/symbols/${path}/`;
      }
    }
    return `https://www.tradingview.com/symbols/${ticker}/`;
  }

  const SCRIPT_URL = "https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js";
  const HEATMAP_DEFAULT_METRIC_LABEL = "1-Day Change";
  const HEATMAP_DEFAULT_METRIC_RANGE = "1D";

  document.addEventListener("DOMContentLoaded", () => {
    const widgetContainer = document.getElementById("heatmapWidgetContainer");
    const loadingEl = document.getElementById("heatmapLoading");
    const errorEl = document.getElementById("heatmapError");
    const labelEl = document.getElementById("heatmapSelectedLabel");
    const updatedEl = document.getElementById("heatmapLastUpdated");
    const reloadBtn = document.getElementById("heatmapReloadBtn");
    const reloadLabelEl = reloadBtn ? reloadBtn.querySelector(".heatmap-reload-label") : null;
    const filterButtons = Array.from(document.querySelectorAll(".heatmap-filter-btn"));
    const intelListEl = document.getElementById("heatmapIntelList");
    const intelEmptyEl = document.getElementById("heatmapIntelEmpty");
    const watchlistListEl = document.getElementById("heatmapWatchlist");
    const watchlistEmptyEl = document.getElementById("heatmapWatchlistEmpty");
    const watchlistSummaryEl = document.getElementById("heatmapWatchlistSummary");
    const watchlistForm = document.getElementById("heatmapWatchlistForm");
    const watchlistInput = document.getElementById("heatmapWatchlistInput");

    if (!widgetContainer) {
      return;
    }

    let activeFilter = filterButtons[0]?.dataset.filter || "sp500";
    if (!FILTER_SOURCES[activeFilter]) {
      activeFilter = "sp500";
    }

    let currentTheme = document.documentElement.classList.contains("dark-mode") ? "dark" : "light";
    try {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme === "dark" || storedTheme === "light") {
        currentTheme = storedTheme;
      }
    } catch (_) {
      /* Ignore preference errors */
    }

    let widgetObserver = null;
    let loadTimeoutId = null;
    const reloadDefaultLabel = reloadLabelEl ? reloadLabelEl.textContent.trim() : "Reload TradingView heatmap";
    let heatmapWatchlist = loadWatchlistFromStorage();

    function renderHeatmapIntel(filter) {
      if (!(intelListEl && intelEmptyEl)) {
        return;
      }
      const filterKey = filter && FILTER_SOURCES[filter] ? filter : "sp500";
      const label = FILTER_LABELS[filterKey] || FILTER_LABELS.sp500;
      const metricLabel = HEATMAP_DEFAULT_METRIC_LABEL;

      const baseIntel =
        (HEATMAP_INTEL_LIBRARY[filterKey] && HEATMAP_INTEL_LIBRARY[filterKey].day) || [];
      const intelNotes = Array.isArray(baseIntel) ? [...baseIntel] : [];

      const overlapTickers =
        (HEATMAP_PORTFOLIO_MEMBERSHIP[filterKey] || []).filter(
          (ticker) => initialStockData && initialStockData[ticker]
        ) || [];
      if (overlapTickers.length) {
        const exposure = overlapTickers
          .map((ticker) => safeNumber(initialStockData[ticker]?.target))
          .reduce((sum, value) => sum + value, 0);
        intelNotes.push(
          `Danh mục của bạn có ${overlapTickers.join(", ")} trong ${label} chiếm khoảng ${formatPercentInline(
            exposure
          )}.`
        );
      }

      if (window.latestAnalyticsScores) {
        const { expectedReturn, volatility, sharpeRatio } = window.latestAnalyticsScores;
        const expectedLabel = formatPercentInline((expectedReturn || 0) * 100);
        const volatilityLabel = formatPercentInline((volatility || 0) * 100);
        intelNotes.push(
          `Danh mục đang kỳ vọng ${expectedLabel} với độ biến động ${volatilityLabel}; đối chiếu với ${
            metricLabel || ""
          } của ${label} để điều chỉnh rủi ro.`
        );
        if (Number.isFinite(sharpeRatio)) {
          intelNotes.push(
            `Sharpe ratio hiện tại ${sharpeRatio.toFixed(2)} – cân nhắc chốt lời khi heatmap quá nóng.`
          );
        }
      }

      const watchlistOverlap = heatmapWatchlist.filter((ticker) =>
        (HEATMAP_PORTFOLIO_MEMBERSHIP[filterKey] || []).includes(ticker)
      );
      if (watchlistOverlap.length) {
        intelNotes.push(
          `Watchlist giao nhau với ${label}: ${watchlistOverlap.join(", ")} – theo dõi sát phản ứng giá.`
        );
      } else if (heatmapWatchlist.length) {
        intelNotes.push(
          `Watchlist hiện không trùng ${label}; cân nhắc thêm mã liên quan để giám sát theo chiến lược.`
        );
      }

      const uniqueIntel = Array.from(
        new Set(
          intelNotes
            .map((note) => (note || "").trim())
            .filter(Boolean)
        )
      ).slice(0, MAX_INTEL_ITEMS);

      if (uniqueIntel.length) {
        intelListEl.innerHTML = uniqueIntel
          .map(
            (note) => `
              <li class="flex gap-3">
                <span class="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-sky-400/80 dark:bg-sky-400"></span>
                <span>${note}</span>
              </li>
            `
          )
          .join("");
        intelEmptyEl.classList.add("hidden");
      } else {
        intelListEl.innerHTML = "";
        intelEmptyEl.classList.remove("hidden");
      }
    }

    function renderPortfolioOverlap(filter) {
      return;
    }

    function renderWatchlist() {
      if (!(watchlistListEl && watchlistEmptyEl && watchlistSummaryEl)) {
        return;
      }
      if (!heatmapWatchlist.length) {
        watchlistListEl.innerHTML = "";
        watchlistEmptyEl.classList.remove("hidden");
        watchlistSummaryEl.textContent = "";
        return;
      }

      watchlistEmptyEl.classList.add("hidden");
      const filterTickers = HEATMAP_PORTFOLIO_MEMBERSHIP[activeFilter] || [];

      const items = heatmapWatchlist.slice(0, WATCHLIST_LIMIT).map((ticker) => {
        const url = getTradingViewSymbolUrl(ticker);
        const inPortfolio =
          initialStockData && initialStockData[ticker] && Number.isFinite(initialStockData[ticker].target);
        const target = inPortfolio ? safeNumber(initialStockData[ticker].target) : null;
        const inCurrentFilter = filterTickers.includes(ticker);

        const badges = [];
        if (inPortfolio) {
          badges.push(
            `<span class="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-300">Portfolio</span>`
          );
        }
        if (inCurrentFilter) {
          badges.push(
            `<span class="inline-flex items-center rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-600 dark:text-sky-300">${FILTER_LABELS[activeFilter] || "Heatmap"}</span>`
          );
        }

        const badgeMarkup = badges.join("");

        return `
          <li
            class="flex items-start justify-between gap-3 rounded-xl border border-slate-200/80 bg-white/70 px-3 py-3 text-sm shadow-sm dark:border-slate-700 dark:bg-slate-900/50"
          >
            <div>
              <p class="font-semibold text-gray-800 dark:text-gray-100">${ticker}</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                ${inPortfolio ? `Target ${formatPercentInline(target)}` : "Outside current portfolio"}
              </p>
              <div class="mt-2 flex flex-wrap gap-1">${badgeMarkup}</div>
            </div>
            <div class="flex items-center gap-2">
              <a
                class="inline-flex items-center gap-1 rounded-lg bg-slate-900/5 px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-sky-500/10 hover:text-sky-600 dark:bg-slate-100/5 dark:text-slate-300 dark:hover:bg-sky-500/20 dark:hover:text-sky-300"
                href="${url}"
                target="_blank"
                rel="noopener"
              >
                Open
              </a>
              <button
                type="button"
                class="heatmap-watchlist-remove inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/80 p-1 text-xs text-slate-500 transition hover:bg-rose-500/10 hover:text-rose-500 dark:border-slate-600 dark:bg-slate-900/60 dark:text-slate-300 dark:hover:bg-rose-500/20 dark:hover:text-rose-300"
                data-ticker="${ticker}"
                aria-label="Remove ${ticker} from watchlist"
              >
                <svg
                  class="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
          </li>
        `;
      });

      watchlistListEl.innerHTML = items.join("");

      const inFilterCount = heatmapWatchlist.filter((ticker) =>
        (HEATMAP_PORTFOLIO_MEMBERSHIP[activeFilter] || []).includes(ticker)
      ).length;

      watchlistSummaryEl.textContent = `${heatmapWatchlist.length} ticker được theo dõi · ${inFilterCount} trùng với ${
        FILTER_LABELS[activeFilter] || "heatmap"
      }.`;
    }

    function syncCompanionPanels() {
      renderHeatmapIntel(activeFilter);
      renderWatchlist();
    }

    function setLoading(isLoading) {
      if (loadingEl) {
        loadingEl.classList.toggle("hidden", !isLoading);
      }
      if (reloadBtn) {
        reloadBtn.disabled = isLoading;
        reloadBtn.classList.toggle("opacity-70", isLoading);
      }
      if (reloadLabelEl) {
        reloadLabelEl.textContent = isLoading ? "Loading..." : reloadDefaultLabel;
      }
    }

    function showError(message) {
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove("hidden");
      }
    }

    function hideError() {
      if (errorEl) {
        errorEl.classList.add("hidden");
      }
    }

    function updateLabel() {
      const filter = FILTER_LABELS[activeFilter] || FILTER_LABELS.sp500;
      if (labelEl) {
        labelEl.textContent = `${filter} | ${HEATMAP_DEFAULT_METRIC_LABEL}`;
      }
      syncCompanionPanels();
    }

    function updateTimestamp() {
      if (!updatedEl) {
        return;
      }
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      updatedEl.textContent = `Updated: ${timeString} (TradingView)`;
    }

    function setActiveFilterButton() {
      filterButtons.forEach((btn) => {
        if (btn.dataset.filter === activeFilter) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    }

    function buildWidgetMarkup() {
      widgetContainer.innerHTML = `
        <div class="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright text-xs text-gray-500 dark:text-gray-400 mt-3">
          <a href="https://www.tradingview.com/heatmap/" rel="noopener" target="_blank" class="hover:underline">
            Heatmap data by TradingView
          </a>
        </div>
      `;
    }

    function buildWidgetConfig() {
      return {
        width: "100%",
        height: 520,
        colorTheme: currentTheme === "dark" ? "dark" : "light",
        dataSource: FILTER_SOURCES[activeFilter] || FILTER_SOURCES.sp500,
        dateRange: HEATMAP_DEFAULT_METRIC_RANGE,
        grouping: "sector",
        blockSize: "market_cap",
        blockColor: "change",
        locale: "en",
        symbolUrl: "https://www.tradingview.com/symbols/{symbol}/",
        hasTopBar: true,
        isDataSetEnabled: false,
        isZoomEnabled: true,
        hasSymbolTooltip: true,
      };
    }

    function clearExistingObserver() {
      if (widgetObserver) {
        widgetObserver.disconnect();
        widgetObserver = null;
      }
    }

    function clearLoadTimeout() {
      if (loadTimeoutId) {
        clearTimeout(loadTimeoutId);
        loadTimeoutId = null;
      }
    }

    function loadHeatmapWidget() {
      if (!widgetContainer) {
        return;
      }

      setLoading(true);
      hideError();
      clearExistingObserver();
      clearLoadTimeout();
      buildWidgetMarkup();

      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = SCRIPT_URL;
      script.async = true;
      script.text = JSON.stringify(buildWidgetConfig());
      script.onerror = () => {
        setLoading(false);
        showError("Unable to load the heatmap from TradingView. Please try again later.");
        clearExistingObserver();
        clearLoadTimeout();
      };

      widgetContainer.appendChild(script);

      widgetObserver = new MutationObserver(() => {
        const iframe = widgetContainer.querySelector("iframe");
        if (iframe) {
          setLoading(false);
          hideError();
          updateTimestamp();
          clearExistingObserver();
          clearLoadTimeout();
        }
      });

      widgetObserver.observe(widgetContainer, { childList: true, subtree: true });

      loadTimeoutId = setTimeout(() => {
        setLoading(false);
        showError("TradingView is responding slowly. Try refreshing the heatmap.");
        clearExistingObserver();
        loadTimeoutId = null;
      }, 15000);
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.dataset.filter === activeFilter) {
          return;
        }
        activeFilter = button.dataset.filter;
        if (!FILTER_SOURCES[activeFilter]) {
          activeFilter = "sp500";
        }
        updateLabel();
        setActiveFilterButton();
        loadHeatmapWidget();
      });
    });

    if (reloadBtn) {
      reloadBtn.addEventListener("click", () => {
        loadHeatmapWidget();
      });
    }

    window.addEventListener("themechange", (event) => {
      currentTheme = event.detail?.isDarkMode ? "dark" : "light";
      loadHeatmapWidget();
    });

    if (watchlistInput) {
      watchlistInput.addEventListener("blur", () => {
        watchlistInput.value = sanitizeTicker(watchlistInput.value);
      });
    }

    if (watchlistForm) {
      watchlistForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!watchlistInput) return;
        const raw = watchlistInput.value;
        const ticker = sanitizeTicker(raw);
        if (!ticker) {
          if (watchlistSummaryEl) {
            watchlistSummaryEl.textContent = "Ticker không hợp lệ. Chỉ sử dụng chữ cái, số, dấu '.' hoặc '-'.";
          }
          return;
        }
        if (heatmapWatchlist.includes(ticker)) {
          if (watchlistSummaryEl) {
            watchlistSummaryEl.textContent = `${ticker} đã có trong watchlist.`;
          }
          watchlistInput.value = "";
          return;
        }
        if (heatmapWatchlist.length >= WATCHLIST_LIMIT) {
          if (watchlistSummaryEl) {
            watchlistSummaryEl.textContent = `Watchlist chỉ hỗ trợ tối đa ${WATCHLIST_LIMIT} ticker.`;
          }
          return;
        }
        heatmapWatchlist.push(ticker);
        heatmapWatchlist = Array.from(new Set(heatmapWatchlist)).sort();
        saveWatchlistToStorage(heatmapWatchlist);
        watchlistInput.value = "";
        syncCompanionPanels();
      });
    }

    if (watchlistListEl) {
      watchlistListEl.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const btn = target.closest(".heatmap-watchlist-remove");
        if (!btn) return;
        const ticker = btn.getAttribute("data-ticker");
        if (!ticker) return;
        heatmapWatchlist = heatmapWatchlist.filter((item) => item !== ticker);
        saveWatchlistToStorage(heatmapWatchlist);
        syncCompanionPanels();
      });
    }

    updateLabel();
    setActiveFilterButton();
    loadHeatmapWidget();
  });
})();
