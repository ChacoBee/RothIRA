const LIVE_PRICE_TICKERS = ["VOO", "VXUS", "AVUV", "AVDV", "SPMO", "AMZN"];
const LIVE_PRICE_CSV_PATH =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwZrG7ms2qeaAEqYcpHs_kaE7cOwuGvU0d4G0fTSXPUL5wgHk3mPdhpJlEHeUaZw/pub?output=csv';
let livePriceTimer = null;
let livePriceInitialized = false;

function initializeLivePriceTest() {
  if (livePriceInitialized) return;
  const tbody = document.getElementById("livePriceRows");
  if (!tbody) {
    console.warn("livePriceRows element not found; skipping live price tracker init.");
    return;
  }
  livePriceInitialized = true;

  const refreshBtn = document.getElementById("livePriceRefreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      fetchAndRenderLivePrices({ userInitiated: true });
    });
  }

  tbody.innerHTML = "";
  LIVE_PRICE_TICKERS.forEach((ticker) => {
    const row = document.createElement("tr");
    row.id = `live-price-row-${ticker}`;
    row.innerHTML = `
      <td class="px-4 py-3 font-semibold">${ticker}</td>
      <td class="px-4 py-3 text-right" data-field="totalInvested">--</td>
      <td class="px-4 py-3 text-right">
        <div class="flex items-center justify-end gap-2">
          <div class="w-20 h-2.5 rounded-full bg-slate-200/70 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-sky-400 dark:bg-sky-500 transition-all duration-500" data-field="heldBar" style="width: 0%"></div>
          </div>
          <span data-field="held">--</span>
        </div>
      </td>
      <td class="px-4 py-3 text-right" data-field="shares">--</td>
      <td class="px-4 py-3 text-right" data-field="price">--</td>
      <td class="px-4 py-3 text-right" data-field="currentValue">--</td>
      <td class="px-4 py-3 text-right">
        <div class="flex items-center justify-end gap-2">
          <div class="w-20 h-2.5 rounded-full bg-slate-200/70 dark:bg-slate-700 overflow-hidden">
            <div class="h-full bg-emerald-400 dark:bg-emerald-500 transition-all duration-500" data-field="currentBar" style="width: 0%"></div>
          </div>
          <span data-field="currentPercent">--</span>
        </div>
      </td>
      <td class="px-4 py-3 text-right" data-field="gain">--</td>
      <td class="px-4 py-3 text-right" data-field="gainPercent">--</td>
      <td class="px-4 py-3 text-right" data-field="yield">--</td>
      <td class="px-4 py-3 text-right" data-field="totalReturn">--</td>
    `;
    tbody.appendChild(row);
  });

  fetchAndRenderLivePrices();
  if (livePriceTimer) clearInterval(livePriceTimer);
  livePriceTimer = setInterval(() => fetchAndRenderLivePrices(), 60000);
}

function formatNumber(value, digits = 2) {
  if (value === undefined || value === null || Number.isNaN(value)) return "--";
  return Number(value).toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function formatCurrency(value) {
  if (value === undefined || value === null || Number.isNaN(value)) return "--";
  return `$${formatNumber(value, 2)}`;
}

function formatTime(timestamp) {
  if (!timestamp) return "--";
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function parseCSVLine(line) {
  const result = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      const next = line[i + 1];
      if (insideQuotes && next === '"') {
        current += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

function normaliseHeader(header) {
  return (header || "").trim().toLowerCase();
}

function parseNumeric(input) {
  if (!input) return null;
  let cleaned = input.replace(/[$%]/g, "").replace(/\s/g, "");
  cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
  cleaned = cleaned.replace(/[^0-9+-.]/g, "");
  if (cleaned === "" || cleaned === "-" || cleaned === "+") return null;
  const value = Number(cleaned);
  return Number.isFinite(value) ? value : null;
}

async function fetchSheetPrices() {
  const response = await fetch(LIVE_PRICE_CSV_PATH, { cache: "no-cache" });
  if (!response.ok) {
    throw new Error("Unable to read CSV");
  }
  const text = await response.text();
  const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
  const headerIndex = lines.findIndex((line) =>
    normaliseHeader(line).startsWith("stock,")
  );
  if (headerIndex === -1) {
    throw new Error("Cannot locate header row in CSV");
  }
  const headersRaw = parseCSVLine(lines[headerIndex]);
  const headers = headersRaw.map(normaliseHeader);

  const stockIndex = headers.indexOf("stock");
  const totalInvestedIndex = headers.indexOf("total invested");
  const heldIndex = headers.indexOf("held %");
  const sharesIndex = headers.indexOf("shares held");
  const priceIndex = headers.indexOf("stock current price");
  const changeValueIndex = headers.indexOf("gain/loss");
  const changePercentIndex = headers.indexOf("gain/loss %");
  const currentValueIndex = headers.indexOf("current value");
  const currentPercentIndex = headers.indexOf("current %");
  const yieldIndex = headers.indexOf("total income from yield");
  const totalReturnIndex = headers.indexOf("total return");

  if (stockIndex === -1 || priceIndex === -1) {
    throw new Error("CSV missing required columns");
  }

  const results = {};
  let totals = null;
  for (let i = headerIndex + 1; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine.trim()) continue;
    const values = parseCSVLine(rawLine);
    const ticker = (values[stockIndex] || "").trim().toUpperCase();
    if (!ticker) continue;
    const entry = {
      totalInvested:
        totalInvestedIndex !== -1 ? parseNumeric(values[totalInvestedIndex]) : null,
      heldPercent: heldIndex !== -1 ? parseNumeric(values[heldIndex]) : null,
      shares: sharesIndex !== -1 ? parseNumeric(values[sharesIndex]) : null,
      price: parseNumeric(values[priceIndex]),
      currentValue:
        currentValueIndex !== -1 ? parseNumeric(values[currentValueIndex]) : null,
      currentPercent:
        currentPercentIndex !== -1 ? parseNumeric(values[currentPercentIndex]) : null,
      changeValue:
        changeValueIndex !== -1 ? parseNumeric(values[changeValueIndex]) : null,
      changePercent:
        changePercentIndex !== -1 ? parseNumeric(values[changePercentIndex]) : null,
      yieldIncome: yieldIndex !== -1 ? parseNumeric(values[yieldIndex]) : null,
      totalReturn:
        totalReturnIndex !== -1 ? parseNumeric(values[totalReturnIndex]) : null,
    };

    if (ticker === "TOTAL") {
      totals = entry;
    } else {
      results[ticker] = entry;
    }
  }
  return { rows: results, totals };
}

async function fetchAndRenderLivePrices(options = {}) {
  const userInitiated = Boolean(options && options.userInitiated);
  const statusEl = document.getElementById("livePriceStatus");
  const statusClassReset = [
    "bg-gray-100",
    "dark:bg-gray-900/80",
    "text-gray-600",
    "dark:text-gray-300",
    "bg-emerald-500/10",
    "dark:bg-emerald-900/30",
    "text-emerald-400",
    "dark:text-emerald-300",
    "bg-rose-500/10",
    "dark:bg-rose-900/40",
    "text-rose-400",
    "dark:text-rose-300",
  ];
  if (statusEl) {
    statusEl.textContent = "Syncing data from Google Sheets...";
    statusEl.classList.remove(...statusClassReset);
    statusEl.classList.add(
      "bg-gray-100",
      "dark:bg-gray-900/80",
      "text-gray-600",
      "dark:text-gray-300"
    );
  }

  if (userInitiated && typeof window.showActionFeedback === "function") {
    window.showActionFeedback("Syncing Google Sheets snapshot...", {
      state: "progress",
      autoHide: false,
    });
  }

  const highlightGainClasses = [
    "ring-2",
    "ring-emerald-500/40",
    "bg-emerald-500/5",
    "shadow-lg",
  ];
  const highlightLossClasses = [
    "ring-2",
    "ring-rose-500/40",
    "bg-rose-500/5",
    "shadow-lg",
  ];
  const highlightClassesToClear = Array.from(
    new Set([...highlightGainClasses, ...highlightLossClasses])
  );
  const performanceMetrics = [];

  try {
    const { rows: quoteMap, totals } = await fetchSheetPrices();
    const now = Date.now();

    LIVE_PRICE_TICKERS.forEach((ticker) => {
      const row = document.getElementById(`live-price-row-${ticker}`);
      const quote = quoteMap[ticker];
      if (!row) return;

       row.classList.remove(...highlightClassesToClear);

      const totalInvestedEl = row.querySelector('[data-field="totalInvested"]');
      const heldEl = row.querySelector('[data-field="held"]');
      const heldBarEl = row.querySelector('[data-field="heldBar"]');
      const sharesEl = row.querySelector('[data-field="shares"]');
      const priceEl = row.querySelector('[data-field="price"]');
      const currentValueEl = row.querySelector('[data-field="currentValue"]');
      const currentPercentEl = row.querySelector('[data-field="currentPercent"]');
      const currentBarEl = row.querySelector('[data-field="currentBar"]');
      const gainEl = row.querySelector('[data-field="gain"]');
      const gainPercentEl = row.querySelector('[data-field="gainPercent"]');
      const yieldEl = row.querySelector('[data-field="yield"]');
      const returnEl = row.querySelector('[data-field="totalReturn"]');

      if (!quote) {
        if (totalInvestedEl) totalInvestedEl.textContent = "--";
        if (heldEl) heldEl.textContent = "--";
        if (heldBarEl) {
          heldBarEl.style.width = "0%";
          heldBarEl.style.opacity = "0.25";
        }
        if (sharesEl) sharesEl.textContent = "--";
        if (priceEl) priceEl.textContent = "--";
        if (currentValueEl) currentValueEl.textContent = "--";
        if (currentPercentEl) currentPercentEl.textContent = "--";
        if (currentBarEl) {
          currentBarEl.style.width = "0%";
          currentBarEl.style.opacity = "0.25";
        }
        if (gainEl) gainEl.textContent = "--";
        if (gainPercentEl) gainPercentEl.textContent = "--";
        if (yieldEl) yieldEl.textContent = "--";
        if (returnEl) returnEl.textContent = "--";
        return;
      }

      const heldPercentValue =
        quote.heldPercent !== null && quote.heldPercent !== undefined
          ? quote.heldPercent
          : null;
      const currentPercentValue =
        quote.currentPercent !== null && quote.currentPercent !== undefined
          ? quote.currentPercent
          : null;

      if (totalInvestedEl)
        totalInvestedEl.textContent =
          quote.totalInvested !== null && quote.totalInvested !== undefined
            ? formatCurrency(quote.totalInvested)
            : "--";
      if (heldEl)
        heldEl.textContent =
          heldPercentValue !== null
            ? `${formatNumber(heldPercentValue)}%`
            : "--";
      if (heldBarEl) {
        if (heldPercentValue !== null) {
          const clamped = Math.max(0, Math.min(120, heldPercentValue));
          heldBarEl.style.width = `${clamped}%`;
          heldBarEl.style.opacity = "1";
        } else {
          heldBarEl.style.width = "0%";
          heldBarEl.style.opacity = "0.25";
        }
      }
      if (sharesEl)
        sharesEl.textContent =
          quote.shares !== null && quote.shares !== undefined
            ? formatNumber(quote.shares, 6)
            : "--";
      if (priceEl)
        priceEl.textContent =
          quote.price !== null && quote.price !== undefined
            ? formatCurrency(quote.price)
            : "--";
      if (currentValueEl)
        currentValueEl.textContent =
          quote.currentValue !== null && quote.currentValue !== undefined
            ? formatCurrency(quote.currentValue)
            : "--";
      if (currentPercentEl)
        currentPercentEl.textContent =
          currentPercentValue !== null
            ? `${formatNumber(currentPercentValue)}%`
            : "--";
      if (currentBarEl) {
        if (currentPercentValue !== null) {
          const clamped = Math.max(0, Math.min(120, currentPercentValue));
          currentBarEl.style.width = `${clamped}%`;
          currentBarEl.style.opacity = "1";
        } else {
          currentBarEl.style.width = "0%";
          currentBarEl.style.opacity = "0.25";
        }
      }

      if (gainEl) {
        gainEl.textContent =
          quote.changeValue !== null && quote.changeValue !== undefined
            ? formatCurrency(quote.changeValue)
            : "--";
        gainEl.classList.remove("text-green-500", "text-red-500");
        if (quote.changeValue > 0) gainEl.classList.add("text-green-500");
        else if (quote.changeValue < 0) gainEl.classList.add("text-red-500");
      }
      if (gainPercentEl) {
        gainPercentEl.textContent =
          quote.changePercent !== null && quote.changePercent !== undefined
            ? `${formatNumber(quote.changePercent)}%`
            : "--";
        gainPercentEl.classList.remove("text-green-500", "text-red-500");
        if (quote.changePercent > 0) gainPercentEl.classList.add("text-green-500");
        else if (quote.changePercent < 0) gainPercentEl.classList.add("text-red-500");
      }
      if (yieldEl)
        yieldEl.textContent =
          quote.yieldIncome !== null && quote.yieldIncome !== undefined
            ? formatCurrency(quote.yieldIncome)
            : "--";
      if (returnEl)
        returnEl.textContent =
          quote.totalReturn !== null && quote.totalReturn !== undefined
            ? formatCurrency(quote.totalReturn)
            : "--";


      if (
        typeof quote.changeValue === "number" &&
        Number.isFinite(quote.changeValue)
      ) {
        performanceMetrics.push({
          ticker,
          row,
          changeValue: quote.changeValue,
        });
      }
    });

    const bestPerformer = performanceMetrics.reduce((best, item) => {
      if (!best || item.changeValue > best.changeValue) return item;
      return best;
    }, null);
    if (bestPerformer && bestPerformer.changeValue > 0) {
      bestPerformer.row.classList.add(...highlightGainClasses);
    }

    const worstPerformer = performanceMetrics.reduce((worst, item) => {
      if (!worst || item.changeValue < worst.changeValue) return item;
      return worst;
    }, null);
    if (worstPerformer && worstPerformer.changeValue < 0) {
      worstPerformer.row.classList.add(...highlightLossClasses);
    }

    const totalRow = document.getElementById("live-price-total-row");
    if (totalRow && totals) {
      const setField = (field, value, formatter, extraClasses = false) => {
        const el = totalRow.querySelector(`[data-field="${field}"]`);
        if (!el) return;
        if (value === null || value === undefined) {
          el.textContent = "--";
          if (extraClasses) el.classList.remove("text-green-500", "text-red-500");
          return;
        }
        el.textContent = formatter(value);
        if (extraClasses) {
          el.classList.remove("text-green-500", "text-red-500");
          if (value > 0) el.classList.add("text-green-500");
          else if (value < 0) el.classList.add("text-red-500");
        }
      };

      setField("totalInvested", totals.totalInvested, formatCurrency);
      setField("held", totals.heldPercent, (v) => `${formatNumber(v)}%`);
      setField("shares", totals.shares, (v) => formatNumber(v, 6));
      setField("price", totals.price, formatCurrency);
      setField("currentValue", totals.currentValue, formatCurrency);
      setField("currentPercent", totals.currentPercent, (v) => `${formatNumber(v)}%`);
      setField("gain", totals.changeValue, formatCurrency, true);
      setField("gainPercent", totals.changePercent, (v) => `${formatNumber(v)}%`, true);
      setField("yield", totals.yieldIncome, formatCurrency);
      setField("totalReturn", totals.totalReturn, formatCurrency);
    }

    if (totals) {
      const summaryValueEl = document.getElementById("livePriceSummaryValue");
      if (summaryValueEl) {
        summaryValueEl.textContent =
          totals.currentValue !== null && totals.currentValue !== undefined
            ? formatCurrency(totals.currentValue)
            : "--";
      }

      const summaryGainEl = document.getElementById("livePriceSummaryGain");
      if (summaryGainEl) {
        summaryGainEl.classList.remove(
          "text-emerald-400",
          "dark:text-emerald-300",
          "text-rose-400",
          "dark:text-rose-300",
          "text-gray-600",
          "dark:text-gray-300"
        );
        if (totals.changeValue === null || totals.changeValue === undefined) {
          summaryGainEl.textContent = "--";
          summaryGainEl.classList.add("text-gray-600", "dark:text-gray-300");
        } else {
          const gain = totals.changeValue;
          const formatted = formatCurrency(Math.abs(gain));
          if (gain > 0) {
            summaryGainEl.textContent = `+${formatted}`;
            summaryGainEl.classList.add("text-emerald-400", "dark:text-emerald-300");
          } else if (gain < 0) {
            summaryGainEl.textContent = `-${formatted}`;
            summaryGainEl.classList.add("text-rose-400", "dark:text-rose-300");
          } else {
            summaryGainEl.textContent = formatted;
            summaryGainEl.classList.add("text-gray-600", "dark:text-gray-300");
          }
        }
      }

      const summaryYieldEl = document.getElementById("livePriceSummaryYield");
      if (summaryYieldEl) {
        summaryYieldEl.textContent =
          totals.yieldIncome !== null && totals.yieldIncome !== undefined
            ? formatCurrency(totals.yieldIncome)
            : "--";
      }
    }

    if (statusEl) {
      statusEl.textContent = `Synced at ${formatTime(now)}`;
      statusEl.classList.remove(...statusClassReset);
      statusEl.classList.add(
        "bg-emerald-500/10",
        "dark:bg-emerald-900/30",
        "text-emerald-400",
        "dark:text-emerald-300"
      );
    }

    if (userInitiated && typeof window.showActionFeedback === "function") {
      window.showActionFeedback("Google Sheets snapshot refreshed.", {
        state: "success",
        autoHide: 2600,
      });
    }

    window.livePriceSheetData = { rows: quoteMap, totals, lastUpdated: now };
    document.dispatchEvent(
      new CustomEvent("livePriceSheetUpdated", {
        detail: { rows: quoteMap, totals, lastUpdated: now },
      })
    );
  } catch (error) {
    if (statusEl) {
      statusEl.textContent = "Unable to read data from Google Sheets";
      statusEl.classList.remove(...statusClassReset);
      statusEl.classList.add(
        "bg-rose-500/10",
        "dark:bg-rose-900/40",
        "text-rose-400",
        "dark:text-rose-300"
      );
    }
    if (userInitiated && typeof window.showActionFeedback === "function") {
      window.showActionFeedback(
        "Sync failed. Showing last known Google Sheets snapshot.",
        { state: "error", autoHide: 4200 }
      );
    }
  }
}

function scheduleLivePriceInitialization() {
  const triggerInitialization = () => {
    if (livePriceInitialized) return;

    if (typeof requestIdleCallback === "function") {
      requestIdleCallback(
        () => {
          initializeLivePriceTest();
        },
        { timeout: 1000 }
      );
    } else {
      setTimeout(initializeLivePriceTest, 0);
    }
  };

  const trackerSection = document.getElementById("advanced-tracker");
  if (trackerSection && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observerRef.disconnect();
            triggerInitialization();
          }
        });
      },
      {
        rootMargin: "200px 0px",
        threshold: 0.1,
      }
    );
    observer.observe(trackerSection);
  } else {
    triggerInitialization();
  }
}

document.addEventListener("DOMContentLoaded", scheduleLivePriceInitialization);
