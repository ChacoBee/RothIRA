"use strict";

(function setupHangarSettings() {
  const HOLDINGS_STORAGE_KEY = "hangar.customHoldings.v1";
  const SETTINGS_STORAGE_KEY = "hangar.userSettings.v1";
  const AUDIT_STORAGE_KEY = "hangar.auditLog.v1";
  const DEFAULT_LIVE_PRICE_SHEET =
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwZrG7ms2qeaAEqYcpHs_kaE7cOwuGvU0d4G0fTSXPUL5wgHk3mPdhpJlEHeUaZw/pub?output=csv";

  const defaultHoldings = {
    VOO: {
      target: 45,
      currentValue: 45,
      currentPercent: 45,
      sector: "Core US",
      region: "United States",
      exposureCategory: "us",
      assetClass: "equity",
    },
    VXUS: {
      target: 20,
      currentValue: 20,
      currentPercent: 20,
      sector: "International Multi-Sector",
      region: "Global ex-US",
      exposureCategory: "international",
      assetClass: "equity",
    },
    AVUV: {
      target: 10,
      currentValue: 10,
      currentPercent: 10,
      sector: "Small Cap Value",
      region: "United States",
      exposureCategory: "us",
      assetClass: "equity",
    },
    AVDV: {
      target: 10,
      currentValue: 10,
      currentPercent: 10,
      sector: "International Small Cap Value",
      region: "Global ex-US",
      exposureCategory: "international",
      assetClass: "equity",
    },
    SPMO: {
      target: 10,
      currentValue: 10,
      currentPercent: 10,
      sector: "Momentum Large Cap",
      region: "United States",
      exposureCategory: "us",
      assetClass: "equity",
    },
    AMZN: {
      target: 5,
      currentValue: 5,
      currentPercent: 5,
      sector: "Consumer Discretionary",
      region: "United States",
      exposureCategory: "us",
      assetClass: "equity",
    },
  };

  const localStore = {
    read(key, fallback) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
      } catch (error) {
        console.warn("Local storage unavailable, falling back to defaults.", error);
        return fallback;
      }
    },
    write(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.warn("Unable to persist settings to storage.", error);
      }
    },
  };

  function sanitizeTicker(value) {
    return (value || "").toUpperCase().replace(/[^A-Z0-9.-]/g, "").slice(0, 15);
  }

  function sanitizeHoldingPayload(payload) {
    if (!payload || typeof payload !== "object") return null;
    const ticker = sanitizeTicker(payload.ticker);
    if (!ticker) return null;
    const toNumber = (input, fallback = 0) => {
      const num = Number(input);
      return Number.isFinite(num) ? num : fallback;
    };
    const normalized = {
      ticker,
      target: Math.max(0, toNumber(payload.target, 0)),
      currentValue: Math.max(0, toNumber(payload.currentValue, 0)),
      currentPercent: Math.max(0, toNumber(payload.currentPercent, payload.target)),
      sector: (payload.sector || "Unassigned").trim() || "Unassigned",
      region: (payload.region || "Unspecified").trim() || "Unspecified",
      exposureCategory: (payload.exposureCategory || "us").toLowerCase(),
      assetClass: (payload.assetClass || "equity").trim() || "equity",
      notes: (payload.notes || "").trim(),
    };
    if (!["us", "international", "alternative"].includes(normalized.exposureCategory)) {
      normalized.exposureCategory = "us";
    }
    return normalized;
  }

  function clone(object) {
    return JSON.parse(JSON.stringify(object || {}));
  }

  const storedCustomHoldings = localStore.read(HOLDINGS_STORAGE_KEY, {});
  const customHoldings = {};
  Object.keys(storedCustomHoldings || {}).forEach((key) => {
    const normalized = sanitizeHoldingPayload({
      ...storedCustomHoldings[key],
      ticker: key,
    });
    if (normalized && !defaultHoldings[normalized.ticker]) {
      customHoldings[normalized.ticker] = normalized;
    }
  });

  const holdings = Object.assign({}, defaultHoldings, customHoldings);
  const assetKeys = Object.keys(holdings);

  window.initialStockData = holdings;
  window.assetKeys = assetKeys;

  const holdingsListeners = new Set();
  const settingsListeners = new Set();
  const auditListeners = new Set();

  const defaultSettings = {
    alphaVantageKey: "",
    livePriceSheetUrl: DEFAULT_LIVE_PRICE_SHEET,
    livePriceTickers: [],
  };
  let userSettings = Object.assign({}, defaultSettings, localStore.read(SETTINGS_STORAGE_KEY, {}));
  if (!Array.isArray(userSettings.livePriceTickers)) {
    userSettings.livePriceTickers = [];
  }
  userSettings.livePriceTickers = userSettings.livePriceTickers
    .map((ticker) => sanitizeTicker(ticker))
    .filter(Boolean);

  let auditLog = Array.isArray(localStore.read(AUDIT_STORAGE_KEY, []))
    ? localStore.read(AUDIT_STORAGE_KEY, [])
    : [];

  function persistCustomHoldings() {
    const serialisable = {};
    Object.keys(customHoldings).forEach((key) => {
      serialisable[key] = customHoldings[key];
    });
    localStore.write(HOLDINGS_STORAGE_KEY, serialisable);
  }

  function persistSettings() {
    localStore.write(SETTINGS_STORAGE_KEY, userSettings);
  }

  function persistAuditLog() {
    localStore.write(AUDIT_STORAGE_KEY, auditLog);
  }

  function notifyHoldingsChange(detail) {
    const payload = Object.assign(
      {
        holdings: clone(holdings),
        assetKeys: assetKeys.slice(),
      },
      detail || {}
    );
    holdingsListeners.forEach((fn) => {
      try {
        fn(payload);
      } catch (error) {
        console.error("holdings listener failed", error);
      }
    });
    window.dispatchEvent(new CustomEvent("hangar-holdings-changed", { detail: payload }));
  }

  function notifySettingsChange() {
    const snapshot = SettingsStore.getSettings();
    settingsListeners.forEach((fn) => {
      try {
        fn(snapshot);
      } catch (error) {
        console.error("settings listener failed", error);
      }
    });
    window.dispatchEvent(
      new CustomEvent("hangar-settings-changed", { detail: { settings: snapshot } })
    );
  }

  function notifyAuditChange() {
    const snapshot = SettingsStore.getAuditLog();
    auditListeners.forEach((fn) => {
      try {
        fn(snapshot);
      } catch (error) {
        console.error("audit listener failed", error);
      }
    });
    window.dispatchEvent(
      new CustomEvent("hangar-audit-changed", { detail: { entries: snapshot } })
    );
  }

  function addHolding(payload) {
    const normalized = sanitizeHoldingPayload(payload);
    if (!normalized) {
      throw new Error("Invalid holding payload");
    }
    const { ticker } = normalized;
    holdings[ticker] = {
      target: normalized.target,
      currentValue: normalized.currentValue,
      currentPercent: normalized.currentPercent,
      sector: normalized.sector,
      region: normalized.region,
      exposureCategory: normalized.exposureCategory,
      assetClass: normalized.assetClass,
      notes: normalized.notes,
    };

    if (!assetKeys.includes(ticker)) {
      assetKeys.push(ticker);
    }

    if (!defaultHoldings[ticker]) {
      customHoldings[ticker] = holdings[ticker];
      persistCustomHoldings();
    }

    if (
      userSettings.livePriceTickers.length === 0 &&
      !userSettings.livePriceTickers.includes(ticker)
    ) {
      userSettings.livePriceTickers = assetKeys.slice();
      persistSettings();
    }

    const response = Object.assign({ ticker }, clone(holdings[ticker]));
    notifyHoldingsChange({ action: "add", ticker, holding: response });
    return response;
  }

  function getSettings() {
    return {
      alphaVantageKey: userSettings.alphaVantageKey || "",
      livePriceSheetUrl: userSettings.livePriceSheetUrl || DEFAULT_LIVE_PRICE_SHEET,
      livePriceTickers: userSettings.livePriceTickers.slice(),
    };
  }

  function updateSettings(patch) {
    const next = Object.assign({}, getSettings(), patch || {});
    next.alphaVantageKey = (next.alphaVantageKey || "").trim();
    next.livePriceSheetUrl =
      (next.livePriceSheetUrl || DEFAULT_LIVE_PRICE_SHEET).trim() ||
      DEFAULT_LIVE_PRICE_SHEET;
    if (!Array.isArray(next.livePriceTickers)) {
      next.livePriceTickers = [];
    }
    next.livePriceTickers = next.livePriceTickers
      .map((item) => sanitizeTicker(item))
      .filter(Boolean);

    userSettings = next;
    persistSettings();
    notifySettingsChange();
    return getSettings();
  }

  function getAlphaVantageKey() {
    const key = (userSettings.alphaVantageKey || "").trim();
    return key || null;
  }

  function getLivePriceSheetUrl() {
    return (
      (userSettings.livePriceSheetUrl || DEFAULT_LIVE_PRICE_SHEET).trim() ||
      DEFAULT_LIVE_PRICE_SHEET
    );
  }

  function getLivePriceTickers() {
    if (userSettings.livePriceTickers.length) {
      return userSettings.livePriceTickers.slice();
    }
    return assetKeys.slice();
  }

  function recordAuditEntry(entry) {
    if (!entry || typeof entry !== "object") return;
    const normalized = Object.assign(
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        type: entry.type || "rebalance",
        label: entry.label || "Portfolio action",
        timestamp: entry.timestamp || new Date().toISOString(),
        totals: entry.totals || {},
        legs: Array.isArray(entry.legs) ? entry.legs : [],
        notes: entry.notes || "",
      },
      entry
    );
    auditLog.unshift(normalized);
    auditLog = auditLog.slice(0, 50);
    persistAuditLog();
    notifyAuditChange();
  }

  function clearAuditLog() {
    auditLog = [];
    persistAuditLog();
    notifyAuditChange();
  }

  const SettingsStore = {
    getHoldingsSnapshot() {
      return clone(holdings);
    },
    getDefaultHoldings() {
      return clone(defaultHoldings);
    },
    addHolding,
    getAssetKeys() {
      return assetKeys.slice();
    },
    getSettings,
    updateSettings,
    getAlphaVantageKey,
    getLivePriceSheetUrl,
    getLivePriceTickers,
    onHoldingsChange(listener) {
      if (typeof listener === "function") {
        holdingsListeners.add(listener);
        return () => holdingsListeners.delete(listener);
      }
      return () => {};
    },
    onSettingsChange(listener) {
      if (typeof listener === "function") {
        settingsListeners.add(listener);
        return () => settingsListeners.delete(listener);
      }
      return () => {};
    },
    getAuditLog() {
      return auditLog.map((entry) => Object.assign({}, entry));
    },
    recordAuditEntry,
    clearAuditLog,
    onAuditChange(listener) {
      if (typeof listener === "function") {
        auditListeners.add(listener);
        return () => auditListeners.delete(listener);
      }
      return () => {};
    },
  };

  window.SettingsStore = SettingsStore;
  window.dispatchEvent(
    new CustomEvent("hangar-settings-ready", { detail: { settings: getSettings() } })
  );
})();
