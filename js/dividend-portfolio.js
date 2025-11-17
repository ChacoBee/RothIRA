(() => {
  const DEFAULT_SHEET_URL =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwZrG7ms2qeaAEqYcpHs_kaE7cOwuGvU0d4G0fTSXPUL5wgHk3mPdhpJlEHeUaZw/pub?output=csv";
  const TABLE_BODY_ID = "dividendPortfolioBody";
  const STATUS_ID = "dividendPortfolioStatus";
  const REFRESH_BUTTON_ID = "dividendPortfolioRefreshBtn";
  const SHEET_MARKER = "DIVIDEND PORTFOLIO";
  const REQUIRED_COLUMNS = [
    "stock",
    "total invested",
    "current value",
    "yield return",
    "total return",
    "change",
  ];

  let isLoading = false;
  let lastSync = 0;
  let refreshBtn = null;

  function getSheetUrl() {
    try {
      if (window.SettingsStore && typeof window.SettingsStore.getSettings === "function") {
        const settings = window.SettingsStore.getSettings();
        if (settings && settings.livePriceSheetUrl) {
          return settings.livePriceSheetUrl;
        }
      }
    } catch (error) {
      console.warn("Unable to read SettingsStore for dividend sheet URL.", error);
    }
    return DEFAULT_SHEET_URL;
  }

  function parseCSVLine(line) {
    const row = [];
    let buffer = "";
    let insideQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        const next = line[i + 1];
        if (insideQuotes && next === '"') {
          buffer += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === "," && !insideQuotes) {
        row.push(buffer);
        buffer = "";
      } else {
        buffer += char;
      }
    }
    row.push(buffer);
    return row;
  }

  function parseCSV(text) {
    return text
      .split(/\r?\n/)
      .map((line) => parseCSVLine(line))
      .filter((row) => row.length);
  }

  function parseNumber(input) {
    if (input === undefined || input === null) return null;
    let cleaned = String(input).trim();
    if (!cleaned) return null;
    cleaned = cleaned.replace(/[$%]/g, "").replace(/\s/g, "");
    cleaned = cleaned.replace(/\./g, "").replace(/,/g, ".");
    cleaned = cleaned.replace(/[^0-9+-.]/g, "");
    if (!cleaned || cleaned === "+" || cleaned === "-") return null;
    const number = Number(cleaned);
    return Number.isFinite(number) ? number : null;
  }

  function formatCurrency(value) {
    if (value === null || value === undefined) return "--";
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  function formatChange(value) {
    if (value === null || value === undefined) return "--";
    const formatted = formatCurrency(Math.abs(value));
    if (value > 0) return `+${formatted}`;
    if (value < 0) return `-${formatted}`;
    return formatted;
  }

  function setLoadingState(loading) {
    if (!refreshBtn) {
      refreshBtn = document.getElementById(REFRESH_BUTTON_ID);
    }
    if (!refreshBtn) return;
    refreshBtn.disabled = loading;
    refreshBtn.setAttribute("aria-busy", loading ? "true" : "false");
    refreshBtn.textContent = loading ? "Syncing…" : "Refresh";
  }

  function updateStatus(message, state = "idle") {
    const statusEl = document.getElementById(STATUS_ID);
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.dataset.state = state;
  }

  function extractDividendRows(matrix) {
    const markerIndex = matrix.findIndex((row) =>
      row.some((value) => value && value.trim().toUpperCase() === SHEET_MARKER)
    );
    if (markerIndex === -1) return [];

    let headerIndex = -1;
    for (let i = markerIndex + 1; i < matrix.length; i++) {
      const row = matrix[i];
      if (row.some((value) => value && value.trim().toLowerCase() === "stock")) {
        headerIndex = i;
        break;
      }
    }
    if (headerIndex === -1) return [];

    const header = matrix[headerIndex].map((value) => value.trim().toLowerCase());
    const columnMap = {};
    header.forEach((label, index) => {
      if (label) columnMap[label] = index;
    });

    const hasAllColumns = REQUIRED_COLUMNS.every(
      (label) => typeof columnMap[label] === "number"
    );
    if (!hasAllColumns) return [];

    const rows = [];
    for (let i = headerIndex + 1; i < matrix.length; i++) {
      const row = matrix[i];
      const stock = (row[columnMap["stock"]] || "").trim();
      if (!stock || stock.toLowerCase().startsWith("total")) break;
      rows.push({
        stock,
        invested: parseNumber(row[columnMap["total invested"]]),
        value: parseNumber(row[columnMap["current value"]]),
        yieldReturn: parseNumber(row[columnMap["yield return"]]),
        totalReturn: parseNumber(row[columnMap["total return"]]),
        change: parseNumber(row[columnMap["change"]]),
      });
    }
    return rows;
  }

  function renderTable(rows) {
    const tbody = document.getElementById(TABLE_BODY_ID);
    if (!tbody) return;
    tbody.innerHTML = "";

    if (!rows.length) {
      const emptyRow = document.createElement("tr");
      emptyRow.innerHTML = `<td colspan="6" class="dividend-table__cell text-center text-slate-500 dark:text-slate-300">No dividend data found in Google Sheets.</td>`;
      tbody.appendChild(emptyRow);
      return;
    }

    rows.forEach((row) => {
      const changeClass =
        row.change > 0
          ? "dividend-table__gain dividend-table__gain--positive"
          : row.change < 0
          ? "dividend-table__gain dividend-table__gain--negative"
          : "dividend-table__gain dividend-table__gain--neutral";

      const tr = document.createElement("tr");
      tr.className = "dividend-table__row";
      tr.innerHTML = `
        <td class="dividend-table__symbol">${row.stock}</td>
        <td class="dividend-table__cell">${formatCurrency(row.invested)}</td>
        <td class="dividend-table__cell">${formatCurrency(row.value)}</td>
        <td class="dividend-table__cell">${formatCurrency(row.yieldReturn)}</td>
        <td class="dividend-table__cell">${formatCurrency(row.totalReturn)}</td>
        <td class="${changeClass}">${formatChange(row.change)}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  async function fetchDividendPortfolio({ silent = false, userInitiated = false } = {}) {
    if (isLoading) return;
    isLoading = true;
    if (!silent) {
      updateStatus("Syncing with Google Sheets…", "loading");
    }
    setLoadingState(true);

    const sheetUrl = getSheetUrl();
    const url = sheetUrl.includes("?")
      ? `${sheetUrl}&t=${Date.now()}`
      : `${sheetUrl}?t=${Date.now()}`;

    try {
      const response = await fetch(url, { cache: "no-cache" });
      if (!response.ok) {
        throw new Error(`Sheet responded with ${response.status}`);
      }
      const text = await response.text();
      const matrix = parseCSV(text);
      const rows = extractDividendRows(matrix);
      renderTable(rows);
      lastSync = Date.now();
      updateStatus(`Synced from Google Sheets · ${new Date(lastSync).toLocaleTimeString()}`, "success");
      if (userInitiated && typeof window.showActionFeedback === "function") {
        window.showActionFeedback("Dividend portfolio refreshed.", { state: "success", autoHide: 2600 });
      }
    } catch (error) {
      console.error("Failed to sync dividend portfolio", error);
      if (!silent || lastSync === 0) {
        updateStatus("Unable to read dividend data from Google Sheets.", "error");
      }
      if (lastSync === 0) {
        renderTable([]);
      }
      if (userInitiated && typeof window.showActionFeedback === "function") {
        window.showActionFeedback("Unable to refresh dividend data.", { state: "error", autoHide: 3200 });
      }
    } finally {
      isLoading = false;
      setLoadingState(false);
    }
  }

  function scheduleInitialLoad() {
    const triggerLoad = () => {
      fetchDividendPortfolio();
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(triggerLoad, { timeout: 1500 });
    } else {
      window.addEventListener("load", () => {
        setTimeout(triggerLoad, 300);
      });
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById(TABLE_BODY_ID);
    if (!table) return;
    refreshBtn = document.getElementById(REFRESH_BUTTON_ID);
    if (refreshBtn) {
      refreshBtn.addEventListener("click", () => fetchDividendPortfolio({ userInitiated: true }));
    }
    scheduleInitialLoad();
  });

  document.addEventListener("livePriceSheetUpdated", () => {
    if (Date.now() - lastSync > 60000) {
      fetchDividendPortfolio({ silent: true });
    }
  });
})();
