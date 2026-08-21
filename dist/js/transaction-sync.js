"use strict";

(function initTransactionSheetSync() {
  const DEFAULT_CONFIG = {
    enabled: false,
    csvUrl: "",
    tickerColumn: "ticket",
    sharesColumn: "shares acquired",
    amountColumn: "amount paid",
    priceColumn: "buy price",
    typeColumn: "type",
    timestampColumn: "timestamp",
  };

  const globalConfig =
    (window.APP_CONFIG &&
      window.APP_CONFIG.sheets &&
      window.APP_CONFIG.sheets.transactions) ||
    {};
  const config = Object.assign({}, DEFAULT_CONFIG, globalConfig);
  const sheetUrl = (config.csvUrl || "").trim();
  const syncEnabled = config.enabled !== false && sheetUrl.length > 0;

  const STATUS_CLASS_RESET = [
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

  let statusEl = null;
  let refreshBtn = null;
  let latestPriceRows = (window.livePriceSheetData && window.livePriceSheetData.rows) || null;
  let holdingsSnapshot = null;
  let inFlightPromise = null;

  function ready(callback) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  }

  function parseCsvLine(line) {
    const result = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i += 1) {
      const char = line[i];
      if (char === '"') {
        const next = line[i + 1];
        if (insideQuotes && next === '"') {
          current += '"';
          i += 1;
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

  function normaliseHeader(value) {
    return (value || "").trim().toLowerCase();
  }

  function parseNumeric(input) {
    if (input === undefined || input === null) return null;
    let cleaned = String(input).trim();
    if (!cleaned) return null;
    cleaned = cleaned
      .replace(/[$€₫£¥%]/g, "")
      .replace(/\s/g, "")
      .replace(/[(](.*)[)]/g, "-$1");

    const commaCount = (cleaned.match(/,/g) || []).length;
    const dotCount = (cleaned.match(/\./g) || []).length;
    if (commaCount && dotCount) {
      if (cleaned.lastIndexOf(",") > cleaned.lastIndexOf(".")) {
        cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
      } else {
        cleaned = cleaned.replace(/,/g, "");
      }
    } else if (commaCount && !dotCount) {
      cleaned = cleaned.replace(/,/g, ".");
    }

    cleaned = cleaned.replace(/[^0-9+-.]/g, "");
    if (!cleaned || cleaned === "-" || cleaned === "+") return null;
    const value = Number(cleaned);
    return Number.isFinite(value) ? value : null;
  }

  function buildAliasList(primary, defaults) {
    const aliases = [];
    if (primary) aliases.push(primary);
    if (Array.isArray(defaults)) aliases.push(...defaults);
    return aliases
      .map((entry) => normaliseHeader(entry))
      .filter((entry, index, array) => entry && array.indexOf(entry) === index);
  }

  function findColumn(headers, aliases) {
    for (let i = 0; i < headers.length; i += 1) {
      if (aliases.includes(headers[i])) {
        return i;
      }
    }
    return -1;
  }

  function detectColumns(headers) {
    const tickerIndex = findColumn(
      headers,
      buildAliasList(config.tickerColumn, ["ticker", "ticket", "symbol", "stock", "mã", "ma ck"])
    );
    const sharesIndex = findColumn(
      headers,
      buildAliasList(config.sharesColumn, ["shares acquired", "shares", "qty", "quantity", "shares delta"])
    );
    const amountIndex = findColumn(
      headers,
      buildAliasList(config.amountColumn, ["amount paid", "notional", "cash flow", "gross amount"])
    );
    const priceIndex = findColumn(
      headers,
      buildAliasList(config.priceColumn, ["price", "buy price", "unit price", "cost basis"])
    );
    const typeIndex = findColumn(
      headers,
      buildAliasList(config.typeColumn, ["type", "side", "action", "transaction type"])
    );
    const timestampIndex = findColumn(
      headers,
      buildAliasList(config.timestampColumn, ["timestamp", "date", "trade date", "executed at"])
    );

    if (tickerIndex === -1 || sharesIndex === -1) {
      throw new Error("CSV is missing required columns for ticker or shares.");
    }

    return {
      tickerIndex,
      sharesIndex,
      amountIndex,
      priceIndex,
      typeIndex,
      timestampIndex,
    };
  }

  function parseTransactionCsv(text) {
    const lines = text.split(/\r?\n/).filter((line) => line.trim().length > 0);
    if (!lines.length) {
      throw new Error("CSV file is empty.");
    }

    const headerIndex = lines.findIndex((line) =>
      normaliseHeader(line).includes(normaliseHeader(config.tickerColumn || "ticket"))
    );
    if (headerIndex === -1) {
      throw new Error("Unable to locate header row in CSV.");
    }

    const headers = parseCsvLine(lines[headerIndex]).map(normaliseHeader);
    const columnMap = detectColumns(headers);
    const entries = [];

    for (let i = headerIndex + 1; i < lines.length; i += 1) {
      const row = parseCsvLine(lines[i]);
      const ticker = (row[columnMap.tickerIndex] || "").trim().toUpperCase();
      if (!ticker) continue;

      const rawShares =
        columnMap.sharesIndex !== -1 ? parseNumeric(row[columnMap.sharesIndex]) : null;
      if (!Number.isFinite(rawShares) || rawShares === 0) {
        continue;
      }

      const rawType =
        columnMap.typeIndex !== -1 ? normaliseHeader(row[columnMap.typeIndex]) : "";
      let shares = rawShares;
      if (rawType.startsWith("sell") && shares > 0) {
        shares = -shares;
      } else if (rawType.startsWith("buy") && shares < 0) {
        shares = Math.abs(shares);
      }

      const price =
        columnMap.priceIndex !== -1 ? parseNumeric(row[columnMap.priceIndex]) : null;
      const absoluteAmount =
        columnMap.amountIndex !== -1 ? parseNumeric(row[columnMap.amountIndex]) : null;
      let signedAmount = null;
      if (Number.isFinite(absoluteAmount)) {
        signedAmount = shares >= 0 ? Math.abs(absoluteAmount) : -Math.abs(absoluteAmount);
      } else if (Number.isFinite(price)) {
        signedAmount = shares * price;
      }

      const timestamp =
        columnMap.timestampIndex !== -1 ? row[columnMap.timestampIndex] : null;

      entries.push({
        ticker,
        shares,
        price: Number.isFinite(price) ? price : null,
        amount: Number.isFinite(signedAmount) ? signedAmount : null,
        timestamp: timestamp && timestamp.trim().length ? timestamp.trim() : null,
      });
    }

    return entries;
  }

  function aggregateTransactions(entries) {
    const holdings = {};

    entries.forEach((entry) => {
      if (!Number.isFinite(entry.shares) || entry.shares === 0) return;
      const ticker = entry.ticker;
      const record =
        holdings[ticker] || {
          ticker,
          netShares: 0,
          buyShares: 0,
          buyCost: 0,
          netInvested: 0,
          lastPrice: null,
          avgCost: null,
          lastTimestamp: null,
        };

      record.netShares += entry.shares;
      if (entry.shares > 0) {
        record.buyShares += entry.shares;
        if (Number.isFinite(entry.amount)) {
          record.buyCost += entry.amount;
          record.netInvested += entry.amount;
        } else if (Number.isFinite(entry.price)) {
          const implied = entry.price * entry.shares;
          record.buyCost += implied;
          record.netInvested += implied;
        }
      } else {
        if (Number.isFinite(entry.amount)) {
          record.netInvested += entry.amount;
        }
      }

      if (Number.isFinite(entry.price)) {
        record.lastPrice = entry.price;
      }

      if (entry.timestamp) {
        const parsed = Date.parse(entry.timestamp);
        if (!Number.isNaN(parsed)) {
          if (!record.lastTimestamp || parsed > record.lastTimestamp) {
            record.lastTimestamp = parsed;
          }
        }
      }

      holdings[ticker] = record;
    });

    Object.keys(holdings).forEach((ticker) => {
      const record = holdings[ticker];
      if (record.buyShares > 0) {
        record.avgCost = record.buyCost / record.buyShares;
      }
    });

    return holdings;
  }

  function resolvePrice(holding, priceRow) {
    if (priceRow && Number.isFinite(priceRow.price)) {
      return priceRow.price;
    }
    if (
      priceRow &&
      Number.isFinite(priceRow.currentValue) &&
      Number.isFinite(priceRow.shares) &&
      priceRow.shares !== 0
    ) {
      return priceRow.currentValue / priceRow.shares;
    }
    if (Number.isFinite(holding.lastPrice)) {
      return holding.lastPrice;
    }
    if (Number.isFinite(holding.avgCost)) {
      return holding.avgCost;
    }
    return null;
  }

  function buildRebalanceValues(holdings, priceRows) {
    const values = {};
    if (!holdings) {
      return values;
    }

    Object.keys(holdings).forEach((ticker) => {
      const holding = holdings[ticker];
      const shares = holding.netShares;
      if (!Number.isFinite(shares)) return;
      const resolvedPrice = resolvePrice(holding, priceRows ? priceRows[ticker] : null);
      if (!Number.isFinite(resolvedPrice)) return;
      const marketValue = shares * resolvedPrice;
      values[ticker] = marketValue > 0 ? marketValue : 0;
    });

    return values;
  }

  function applyValuesToInputs(values) {
    if (typeof assetKeys === "undefined") return false;
    let changed = false;
    const snapshot = {};

    assetKeys.forEach((ticker) => {
      const input = document.querySelector(
        `input[data-stock="${ticker}"][data-field="currentValue"]`
      );
      if (!input) return;

      const hasUpdate = Object.prototype.hasOwnProperty.call(values, ticker);
      const currentInputValue = parseFloat(input.value) || 0;
      const nextValue = hasUpdate ? Number(values[ticker]) : currentInputValue;

      if (hasUpdate && Number.isFinite(nextValue)) {
        const formatted = nextValue.toFixed(2);
        if (input.value !== formatted) {
          input.value = formatted;
          changed = true;
        }
        snapshot[ticker] = nextValue;
      } else {
        snapshot[ticker] = currentInputValue;
      }
    });

    if (changed) {
      try {
        localStorage.setItem("portfolioCurrentValues", JSON.stringify(snapshot));
      } catch (error) {
        console.warn("Unable to persist synced holdings", error);
      }
      if (typeof updatePortfolioMetrics === "function") {
        updatePortfolioMetrics();
      }
    }

    return changed;
  }

  function showFeedback(message, state = "info") {
    if (typeof window.showActionFeedback === "function") {
      window.showActionFeedback(message, { state, autoHide: 2800 });
    }
  }

  function updateStatus(message, tone) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.remove(...STATUS_CLASS_RESET);
    if (tone === "success") {
      statusEl.classList.add(
        "bg-emerald-500/10",
        "dark:bg-emerald-900/30",
        "text-emerald-400",
        "dark:text-emerald-300"
      );
    } else if (tone === "error") {
      statusEl.classList.add(
        "bg-rose-500/10",
        "dark:bg-rose-900/40",
        "text-rose-400",
        "dark:text-rose-300"
      );
    } else {
      statusEl.classList.add(
        "bg-gray-100",
        "dark:bg-gray-900/80",
        "text-gray-600",
        "dark:text-gray-300"
      );
    }
  }

  function applyHoldingsToRebalance(options = {}) {
    if (!holdingsSnapshot) return false;
    const values = buildRebalanceValues(holdingsSnapshot, latestPriceRows);
    const updated = applyValuesToInputs(values);
    if (updated && options.shouldAnnounce) {
      showFeedback("Rebalance inputs synced from Google Sheets.", "success");
    }
    return updated;
  }

  async function fetchTransactions(options = {}) {
    if (!syncEnabled) {
      return;
    }
    if (inFlightPromise) {
      return inFlightPromise;
    }

    const userInitiated = Boolean(options.userInitiated);

    if (statusEl) {
      updateStatus("Syncing transactions from Google Sheets...");
    }

    inFlightPromise = fetch(sheetUrl, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Unable to fetch CSV (${response.status})`);
        }
        return response.text();
      })
      .then((text) => {
        const entries = parseTransactionCsv(text);
        holdingsSnapshot = aggregateTransactions(entries);
        const applied = applyHoldingsToRebalance({ shouldAnnounce: userInitiated });
        if (statusEl) {
          const label = applied
            ? `Synced from Google Sheets at ${new Date().toLocaleTimeString()}`
            : "Google Sheets synced (no changes detected)";
          updateStatus(label, "success");
        }
        if (userInitiated && !applied) {
          showFeedback("Google Sheets synced, no rebalance inputs needed updating.", "info");
        }
      })
      .catch((error) => {
        console.error("Transaction sheet sync failed", error);
        if (statusEl) {
          updateStatus("Unable to read transactions from Google Sheets.", "error");
        }
        if (userInitiated) {
          showFeedback("Sync failed. Check the sheet URL or column names.", "error");
        }
      })
      .finally(() => {
        inFlightPromise = null;
      });

    return inFlightPromise;
  }

  function bootstrap() {
    statusEl = document.getElementById("transactionSheetStatus");
    refreshBtn = document.getElementById("transactionSheetRefreshBtn");

    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => {
        fetchTransactions({ userInitiated: true });
      });
    }

    if (!syncEnabled) {
      if (statusEl) {
        updateStatus("Connect your Google Sheet in config.js to enable auto-sync.");
      }
      return;
    }

    fetchTransactions({ userInitiated: false });
  }

  document.addEventListener("livePriceSheetUpdated", (event) => {
    latestPriceRows = (event && event.detail && event.detail.rows) || null;
    applyHoldingsToRebalance({ shouldAnnounce: false });
  });

  ready(bootstrap);
})();
