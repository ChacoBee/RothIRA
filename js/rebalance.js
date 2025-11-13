const DEPOSIT_PRICE_STORAGE_KEY = "depositAllocationPrices";
const DEPOSIT_ROUNDING_STORAGE_KEY = "depositRoundingMode";
const DEPOSIT_ALLOCATIONS_STORAGE_KEY = "depositAllocations";
const ROUNDING_LABELS = {
  exact: "Exact dollars",
  floor: "Whole shares (down)",
  nearest: "Whole shares (nearest)",
};
const SHARE_DISPLAY_EPS = 1e-6;

let depositPriceOverridesCache = null;
let depositPriceListenerBound = false;

const computeDepositPlanCore =
  typeof DepositAllocationCore !== "undefined" &&
  typeof DepositAllocationCore.computeDepositAllocationPlan === "function"
    ? DepositAllocationCore.computeDepositAllocationPlan
    : null;

function loadDepositPriceOverrides() {
  try {
    const raw = localStorage.getItem(DEPOSIT_PRICE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const overrides = {};
    assetKeys.forEach((key) => {
      const value = parseFloat(parsed[key]);
      if (Number.isFinite(value) && value > 0) {
        overrides[key] = value;
      }
    });
    return overrides;
  } catch (e) {
    return {};
  }
}

function getDepositPriceOverrides() {
  if (!depositPriceOverridesCache) {
    depositPriceOverridesCache = loadDepositPriceOverrides();
  }
  return depositPriceOverridesCache;
}

function setDepositPriceOverride(key, value) {
  const overrides = getDepositPriceOverrides();
  if (Number.isFinite(value) && value > 0) {
    overrides[key] = value;
  } else {
    delete overrides[key];
  }
  try {
    localStorage.setItem(DEPOSIT_PRICE_STORAGE_KEY, JSON.stringify(overrides));
  } catch (e) {}
}

function normalizeRoundingMode(mode) {
  if (typeof mode !== "string") return "exact";
  const normalized = mode.toLowerCase();
  return ["exact", "floor", "nearest"].includes(normalized)
    ? normalized
    : "exact";
}

function sanitizePercentage(value) {
  const number = parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

function sanitizeDepositAmount(value) {
  const number = parseFloat(value);
  if (!Number.isFinite(number) || number < 0) return 0;
  return number;
}

function parsePositiveNumber(value) {
  const num = parseFloat(value);
  if (!Number.isFinite(num) || num <= 0) return null;
  return num;
}

function formatSharesForDisplay(value, roundingMode) {
  if (!Number.isFinite(value)) return "--";
  if (Math.abs(value) < SHARE_DISPLAY_EPS) return "0";
  if (roundingMode === "exact") {
    const abs = Math.abs(value);
    if (abs >= 100) return value.toFixed(2);
    if (abs >= 10) return value.toFixed(3);
    return value.toFixed(4);
  }
  return value.toFixed(0);
}

function getLivePriceFromRows(key, rows) {
  if (!rows || typeof rows !== "object") return null;
  const entry = rows[key];
  if (!entry) return null;
  return parsePositiveNumber(entry.price);
}

function updateDepositPriceStatus({ note, missingTickers } = {}) {
  const statusEl = document.getElementById("depositPriceStatus");
  if (!statusEl) return;

  const inputs = document.querySelectorAll(
    'input[data-field="price"][data-stock]'
  );
  const total = inputs.length || assetKeys.length;
  let ready = 0;
  inputs.forEach((input) => {
    if (parsePositiveNumber(input.value) !== null) {
      ready += 1;
    }
  });

  let message;
  if (total === 0) {
    message = "No holdings configured.";
  } else if (ready === 0) {
    message = "Waiting for price data...";
  } else if (ready === total) {
    message = `Prices loaded for all ${total} holdings.`;
  } else {
    message = `Prices available for ${ready}/${total} holdings.`;
  }

  if (typeof note === "string" && note.trim().length) {
    message += ` - ${note.trim()}`;
  }

  statusEl.textContent = message;
  if (Array.isArray(missingTickers) && missingTickers.length) {
    statusEl.title = `Missing prices: ${missingTickers.join(", ")}`;
  } else {
    statusEl.title = "";
  }
}

function applyLivePricesToDepositInputs(rows, options = {}) {
  const sourceRows =
    rows ||
    (typeof window !== "undefined" &&
      window.livePriceSheetData &&
      window.livePriceSheetData.rows) ||
    null;
  const overrides = getDepositPriceOverrides();
  let applied = 0;

  if (sourceRows) {
    assetKeys.forEach((key) => {
      const priceInput = document.querySelector(
        `input[data-stock="${key}"][data-field="price"]`
      );
      if (!priceInput) return;
      if (priceInput.dataset.userEdited === "true") return;
      if (overrides[key]) return;

      const livePrice = getLivePriceFromRows(key, sourceRows);
      if (livePrice === null) return;

      const formatted = livePrice.toFixed(2);
      if (priceInput.value !== formatted) {
        priceInput.value = formatted;
        priceInput.dataset.source = "live";
        applied += 1;
      }
    });
  }

  const note =
    typeof options.note === "string" && options.note.trim().length
      ? options.note.trim()
      : sourceRows
      ? applied > 0
        ? `${applied} live update${applied !== 1 ? "s" : ""}`
        : "Live feed ready"
      : "No live feed";

  updateDepositPriceStatus({ note });
  if (applied > 0 && typeof recalculateDepositRebalance === "function") {
    recalculateDepositRebalance();
  }
}

function computeDepositPlanWrapper(params) {
  if (typeof computeDepositPlanCore === "function") {
    return computeDepositPlanCore(params);
  }

  const assets = Array.isArray(params.assets) ? params.assets : [];
  const deposit = Number(params.deposit) || 0;
  const roundingMode = normalizeRoundingMode(params.roundingMode);

  let targetSum = 0;
  assets.forEach((asset) => {
    targetSum += sanitizePercentage(asset.targetPercent);
  });
  const effectiveTarget = targetSum > 0 ? targetSum : 100;

  const rows = {};
  let rawTotal = 0;
  assets.forEach((asset) => {
    const key = asset.key;
    const targetPercent = sanitizePercentage(asset.targetPercent);
    const weight = effectiveTarget > 0 ? targetPercent / effectiveTarget : 0;
    const rawAmount = deposit * weight;
    const price = parsePositiveNumber(asset.price);

    rawTotal += rawAmount;
    rows[key] = {
      key,
      targetPercent,
      price,
      rawAmount,
      finalAmount: rawAmount,
      diffAmount: 0,
      shares: price ? rawAmount / price : null,
      rawShares: price ? rawAmount / price : null,
      roundingApplied: false,
    };
  });

  return {
    rows,
    totals: {
      targetSum,
      effectiveTarget,
      rawTotal,
      finalTotal: rawTotal,
      diffTotal: 0,
      leftover: deposit - rawTotal,
      deposit,
      roundingMode,
      roundingApplied: false,
      priceCoverageCount: assets.filter(
        (asset) => parsePositiveNumber(asset.price) !== null
      ).length,
      missingPriceTickers: [],
      assetsCount: assets.length,
    },
    warnings: {
      nonHundredTarget: Math.abs(targetSum - 100) > 0.1,
      missingPrices: false,
      zeroDeposit: deposit <= 0,
    },
  };
}

function restoreSavedDepositAllocations() {
  try {
    const raw = localStorage.getItem(DEPOSIT_ALLOCATIONS_STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return;

    assetKeys.forEach((key) => {
      const row = document.getElementById(`deposit-allocation-row-${key}`);
      if (!row) return;
      const finalCell = row.querySelector('[data-field="final"]');
      if (!finalCell) return;

      const value = Number(saved[key]);
      if (Number.isFinite(value)) {
        finalCell.textContent = formatCurrency(value);
      }
    });
  } catch (e) {}
}

// --- NEW DEPOSIT ALLOCATION TOOL (Section 6B) ---
function initializeDepositAllocationInputs() {
  const allocationRowsEl = document.getElementById("depositAllocationRows");
  if (!allocationRowsEl) return;
  allocationRowsEl.innerHTML = "";

  const depositInput = document.getElementById("newDepositInput");
  if (depositInput) {
    const savedDeposit = localStorage.getItem("depositAmount");
    if (savedDeposit !== null && savedDeposit !== "" && !isNaN(savedDeposit)) {
      depositInput.value = savedDeposit;
    }
    if (!depositInput.dataset.bound) {
      depositInput.dataset.bound = "true";
      depositInput.addEventListener("input", () => {
        localStorage.setItem("depositAmount", depositInput.value);
      });
    }
  }

  const roundingSelect = document.getElementById("depositRoundingMode");
  if (roundingSelect) {
    const savedMode = localStorage.getItem(DEPOSIT_ROUNDING_STORAGE_KEY);
    if (savedMode && ["exact", "floor", "nearest"].includes(savedMode)) {
      roundingSelect.value = savedMode;
    }
    if (!roundingSelect.dataset.bound) {
      roundingSelect.dataset.bound = "true";
      roundingSelect.addEventListener("change", () => {
        const normalized = normalizeRoundingMode(roundingSelect.value);
        roundingSelect.value = normalized;
        try {
          localStorage.setItem(DEPOSIT_ROUNDING_STORAGE_KEY, normalized);
        } catch (e) {}
      });
    }
  }

  const overrides = getDepositPriceOverrides();
  const liveRows =
    typeof window !== "undefined" &&
    window.livePriceSheetData &&
    window.livePriceSheetData.rows
      ? window.livePriceSheetData.rows
      : null;

  assetKeys.forEach((key) => {
    const targetInput = document.querySelector(
      `input[data-stock="${key}"][data-field="target"]`
    );
    const target = sanitizePercentage(targetInput ? targetInput.value : 0);
    const livePrice = getLivePriceFromRows(key, liveRows);
    const overridePrice = overrides[key];
    const initialPrice = Number.isFinite(overridePrice)
      ? overridePrice
      : Number.isFinite(livePrice)
      ? livePrice
      : null;
    const pricePrefill = Number.isFinite(initialPrice)
      ? initialPrice.toFixed(2)
      : "";

    const row = document.createElement("tr");
    row.id = `deposit-allocation-row-${key}`;
    row.classList.add(
      "text-sm",
      "text-gray-700",
      "dark:text-gray-300",
      "hover:bg-blue-50/50",
      "dark:hover:bg-slate-700/50",
      "transition-colors"
    );
    row.innerHTML = `
      <td class="px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">${key}</td>
      <td class="px-2 py-2">
        <input
          type="number"
          data-stock="${key}"
          data-field="target5B"
          value="${target.toFixed(2)}"
          class="w-full styled-input p-1 text-right text-blue-600 dark:text-blue-300 font-bold"
          min="0"
          max="100"
          step="0.01"
        >
      </td>
      <td class="px-2 py-2">
        <input
          type="number"
          data-stock="${key}"
          data-field="price"
          value="${pricePrefill}"
          class="w-full styled-input p-1 text-right text-slate-600 dark:text-slate-200"
          min="0"
          step="0.01"
          placeholder="Auto"
        >
      </td>
      <td class="px-2 py-2 text-right" data-field="raw">--</td>
      <td class="px-2 py-2 text-right" data-field="shares">--</td>
      <td class="px-2 py-2 text-right font-semibold text-blue-600 dark:text-blue-300" data-field="final">--</td>
    `;
    allocationRowsEl.appendChild(row);

    const priceInput = row.querySelector('input[data-field="price"]');
    if (priceInput) {
      if (Number.isFinite(overridePrice)) {
        priceInput.value = overridePrice.toFixed(2);
        priceInput.dataset.userEdited = "true";
      } else if (Number.isFinite(livePrice)) {
        priceInput.value = livePrice.toFixed(2);
        priceInput.dataset.source = "live";
      } else if (!Number.isFinite(initialPrice)) {
        priceInput.value = "";
      }

      priceInput.addEventListener("input", () => {
        if (priceInput.value === "") {
          delete priceInput.dataset.userEdited;
        }
      });

      priceInput.addEventListener("change", () => {
        const numeric = parsePositiveNumber(priceInput.value);
        if (numeric !== null) {
          priceInput.value = numeric.toFixed(2);
          priceInput.dataset.userEdited = "true";
          setDepositPriceOverride(key, numeric);
        } else {
          priceInput.value = "";
          delete priceInput.dataset.userEdited;
          setDepositPriceOverride(key, null);
          applyLivePricesToDepositInputs(null, { note: "awaiting price" });
        }
        updateDepositPriceStatus();
    if (typeof recalculateDepositRebalance === "function") {
      recalculateDepositRebalance();
    }
      });
    }
  });

  const calcBtn = document.getElementById("calculateDepositAllocationBtn");
  if (calcBtn) {
    try {
      calcBtn.removeEventListener("click", calculateDepositAllocation);
    } catch (e) {}
    calcBtn.addEventListener("click", () => calculateDepositAllocation(false));
  }

  if (!depositPriceListenerBound) {
    document.addEventListener("livePriceSheetUpdated", (event) => {
      applyLivePricesToDepositInputs(event?.detail?.rows || null);
    });
    depositPriceListenerBound = true;
  }

  applyLivePricesToDepositInputs(null);
  updateDepositPriceStatus();
  restoreSavedDepositAllocations();
}

function calculateDepositAllocation(isAutoUpdate = false) {
  if (isAutoUpdate) {
    initializeDepositAllocationInputs();
  }

  const depositInput = document.getElementById("newDepositInput");
  const roundingSelect = document.getElementById("depositRoundingMode");

  const depositAmount = sanitizeDepositAmount(
    depositInput ? depositInput.value : 0
  );
  const roundingModeRaw = roundingSelect ? roundingSelect.value : "exact";
  const roundingMode = normalizeRoundingMode(roundingModeRaw);

  if (roundingSelect) {
    roundingSelect.value = roundingMode;
    try {
      localStorage.setItem(DEPOSIT_ROUNDING_STORAGE_KEY, roundingMode);
    } catch (e) {}
  }

  const assets = assetKeys.map((key) => {
    const targetInput = document.querySelector(
      `input[data-stock="${key}"][data-field="target5B"]`
    );
    const priceInput = document.querySelector(
      `input[data-stock="${key}"][data-field="price"]`
    );
    const targetPercent = sanitizePercentage(
      targetInput ? targetInput.value : 0
    );
    const price = parsePositiveNumber(priceInput ? priceInput.value : null);
    if (priceInput && price !== null) {
      priceInput.value = price.toFixed(2);
    }
    return { key, targetPercent, price };
  });

  const plan = computeDepositPlanWrapper({
    assets,
    deposit: depositAmount,
    roundingMode,
  });

  const depositResultsEl = document.getElementById("depositAllocationResults");
  if (depositResultsEl) {
    const existingWarn = document.getElementById("depositWarning");
    if (existingWarn) existingWarn.remove();
    if (plan.warnings.nonHundredTarget) {
      const warn = document.createElement("div");
      warn.id = "depositWarning";
      warn.className =
        "px-2 py-3 text-center text-rose-500 dark:text-rose-300";
      warn.textContent = `Target weights sum to ${formatPercent(
        plan.totals.targetSum
      )}. Dollar allocations were normalized to match the deposit.`;
      const tableEl =
        depositResultsEl.querySelector(".overflow-x-auto") ||
        depositResultsEl.querySelector("table");
      if (tableEl) {
        depositResultsEl.insertBefore(warn, tableEl);
      } else {
        depositResultsEl.prepend(warn);
      }
    }
  }

  assetKeys.forEach((key) => {
    const row = document.getElementById(`deposit-allocation-row-${key}`);
    if (!row) return;
    const data = plan.rows[key] || {
      rawAmount: 0,
      finalAmount: 0,
      diffAmount: 0,
      shares: null,
      rawShares: null,
    };

    const setCell = (field, value, formatter) => {
      const el = row.querySelector(`[data-field="${field}"]`);
      if (!el) return;
      if (typeof formatter === "function") {
        el.textContent = formatter(value);
      } else {
        el.textContent = value;
      }
    };

    setCell("raw", data.rawAmount, formatCurrency);
    setCell("final", data.finalAmount, formatCurrency);

    const sharesValue =
      data.shares !== undefined && data.shares !== null
        ? data.shares
        : data.rawShares || null;
    setCell("shares", sharesValue, (val) =>
      formatSharesForDisplay(val, roundingMode)
    );

  });

  const totalTargetEl = document.getElementById("totalTargetAlloc");
  if (totalTargetEl) {
    totalTargetEl.textContent = formatPercent(plan.totals.targetSum);
  }
  const totalRawEl = document.getElementById("totalRawAmount");
  if (totalRawEl) {
    totalRawEl.textContent = formatCurrency(plan.totals.rawTotal);
  }
  const totalFinalEl = document.getElementById("totalAllocatedAmount");
  if (totalFinalEl) {
    totalFinalEl.textContent = formatCurrency(plan.totals.finalTotal);
  }

  const leftoverEl = document.getElementById("depositLeftoverAmount");
  const leftoverNoteEl = document.getElementById("depositLeftoverNote");
  if (leftoverEl) {
    const leftover = plan.totals.leftover || 0;
    leftoverEl.classList.remove(
      "text-emerald-500",
      "text-rose-500",
      "text-blue-800",
      "dark:text-blue-200"
    );
    let noteText =
      "Calculated after applying the selected rounding mode.";
    if (Math.abs(leftover) < 0.005) {
      leftoverEl.textContent = "$0.00";
      leftoverEl.classList.add("text-blue-800", "dark:text-blue-200");
      noteText = "Great! Every dollar has been allocated.";
    } else if (leftover > 0) {
      leftoverEl.textContent = formatCurrency(leftover);
      leftoverEl.classList.add("text-emerald-500");
      noteText =
        "Unallocated cash remains after rounding. You can leave it idle or assign it manually.";
    } else {
      leftoverEl.textContent = formatCurrency(leftover);
      leftoverEl.classList.add("text-rose-500");
      noteText =
        "Allocations exceed the deposit. Reduce targets or adjust the rounding mode.";
    }
    if (leftoverNoteEl) {
      leftoverNoteEl.textContent = noteText;
    }
  }

  const integritySummaryEl = document.getElementById(
    "depositIntegritySummary"
  );
  const integrityNoteEl = document.getElementById("depositIntegrityNote");
  const roundingLabel =
    ROUNDING_LABELS[roundingMode] || ROUNDING_LABELS.exact;
  if (integritySummaryEl) {
    integritySummaryEl.textContent = `${formatPercent(
      plan.totals.targetSum
    )} total target - ${roundingLabel}`;
  }
  if (integrityNoteEl) {
    if (plan.totals.priceCoverageCount === 0) {
      integrityNoteEl.textContent =
        "Add share prices or enable the live feed to unlock share-based rounding.";
    } else if (
      plan.warnings.missingPrices &&
      plan.totals.missingPriceTickers.length
    ) {
      integrityNoteEl.textContent = `Missing prices for: ${plan.totals.missingPriceTickers.join(
        ", "
      )}. Those holdings stayed in dollar mode.`;
    } else {
      integrityNoteEl.textContent =
        "Prices synced for all holdings. Rounding adjustments factor in live updates automatically.";
    }
  }

  const calcSummaryEl = document.getElementById("depositCalcSummary");
  if (calcSummaryEl) {
    if (plan.warnings.zeroDeposit) {
      calcSummaryEl.textContent =
        "Enter a deposit above $0 and click calculate to preview allocations.";
    } else {
      const finalText = formatCurrency(plan.totals.finalTotal);
      const depositText = formatCurrency(plan.totals.deposit);
      const timestamp = new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      calcSummaryEl.textContent = `${depositText} deposit -> ${finalText} allocated (${roundingLabel}, ${timestamp})`;
    }
  }

  updateDepositPriceStatus({
    missingTickers: plan.totals.missingPriceTickers,
    note:
      plan.warnings.missingPrices &&
      plan.totals.missingPriceTickers.length
        ? `Need price for ${plan.totals.missingPriceTickers.join(", ")}`
        : undefined,
  });

  const allocationSaveObj = {};
  assetKeys.forEach((key) => {
    allocationSaveObj[key] =
      plan.rows[key] && Number.isFinite(plan.rows[key].finalAmount)
        ? plan.rows[key].finalAmount
        : 0;
  });
  try {
    localStorage.setItem(
      DEPOSIT_ALLOCATIONS_STORAGE_KEY,
      JSON.stringify(allocationSaveObj)
    );
  } catch (e) {}

  if (typeof window !== "undefined") {
    window.latestDepositPlanTotals = plan.totals;
  }
  if (typeof document !== "undefined" && typeof document.dispatchEvent === "function") {
    document.dispatchEvent(
      new CustomEvent("depositAllocationPlanUpdated", {
        detail: {
          plan,
          totals: plan.totals,
          generatedAt: Date.now(),
        },
      })
    );
  }
}

const REBALANCE_DEPOSIT_STORAGE_KEY = "rebalanceDepositAmount";
const REBALANCE_ROUNDING_STORAGE_KEY = "rebalanceDepositRoundingMode";
const REBALANCE_LOCKS_STORAGE_KEY = "rebalanceDepositLocks";
const REBALANCE_OPTIONS_STORAGE_KEY = "rebalanceDepositOptions";
const DEFAULT_REBALANCE_OPTIONS = { autoDistributeLeftover: true };

let rebalanceDepositLocksCache = null;
let rebalanceDepositOptionsCache = null;

function loadRebalanceDepositAmount() {
  try {
    return localStorage.getItem(REBALANCE_DEPOSIT_STORAGE_KEY) || "";
  } catch (e) {
    return "";
  }
}

function saveRebalanceDepositAmount(value) {
  try {
    localStorage.setItem(REBALANCE_DEPOSIT_STORAGE_KEY, value || "");
  } catch (e) {}
}

function loadRebalanceRoundingMode() {
  try {
    const stored = localStorage.getItem(REBALANCE_ROUNDING_STORAGE_KEY);
    if (stored) return normalizeRoundingMode(stored);
  } catch (e) {}
  return "exact";
}

function saveRebalanceRoundingMode(mode) {
  try {
    localStorage.setItem(
      REBALANCE_ROUNDING_STORAGE_KEY,
      normalizeRoundingMode(mode)
    );
  } catch (e) {}
}

function loadRebalanceLocksFromStorage() {
  try {
    const raw = localStorage.getItem(REBALANCE_LOCKS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((value) => String(value));
  } catch (e) {
    return [];
  }
}

function getRebalanceLockSet() {
  if (!rebalanceDepositLocksCache) {
    rebalanceDepositLocksCache = new Set(loadRebalanceLocksFromStorage());
  }
  return rebalanceDepositLocksCache;
}

function persistRebalanceLocks() {
  if (!rebalanceDepositLocksCache) return;
  try {
    localStorage.setItem(
      REBALANCE_LOCKS_STORAGE_KEY,
      JSON.stringify(Array.from(rebalanceDepositLocksCache))
    );
  } catch (e) {}
}

function applyRebalanceLockVisual(button, isLocked) {
  if (!button) return;
  button.dataset.locked = isLocked ? "true" : "false";
  button.setAttribute("aria-pressed", isLocked ? "true" : "false");
  button.textContent = isLocked ? "OFF" : "ON";
  button.classList.toggle("bg-amber-500/20", !isLocked);
  button.classList.toggle("border-amber-400/80", !isLocked);
  button.classList.toggle("text-amber-600", !isLocked);
  button.classList.toggle("bg-slate-800/40", isLocked);
  button.classList.toggle("border-slate-500/60", isLocked);
  button.classList.toggle("text-slate-300", isLocked);
}

function loadRebalanceOptionsFromStorage() {
  try {
    const raw = localStorage.getItem(REBALANCE_OPTIONS_STORAGE_KEY);
    if (!raw) return { ...DEFAULT_REBALANCE_OPTIONS };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return { ...DEFAULT_REBALANCE_OPTIONS };
    }
    return Object.assign({}, DEFAULT_REBALANCE_OPTIONS, parsed);
  } catch (e) {
    return { ...DEFAULT_REBALANCE_OPTIONS };
  }
}

function getRebalanceOptions() {
  if (!rebalanceDepositOptionsCache) {
    rebalanceDepositOptionsCache = loadRebalanceOptionsFromStorage();
  }
  return rebalanceDepositOptionsCache;
}

function updateRebalanceOptions(patch) {
  const next = Object.assign({}, getRebalanceOptions(), patch || {});
  rebalanceDepositOptionsCache = next;
  try {
    localStorage.setItem(
      REBALANCE_OPTIONS_STORAGE_KEY,
      JSON.stringify(next)
    );
  } catch (e) {}
  return next;
}

function getEffectivePriceForKey(key) {
  const overrides = typeof getDepositPriceOverrides === "function"
    ? getDepositPriceOverrides()
    : {};
  const overridePrice = overrides && overrides[key];
  const fromOverride = parsePositiveNumber(overridePrice);
  if (fromOverride !== null) return fromOverride;

  const priceInput = document.querySelector(
    `input[data-stock="${key}"][data-field="price"]`
  );
  const fromInput = priceInput ? parsePositiveNumber(priceInput.value) : null;
  if (fromInput !== null) return fromInput;

  const liveRows =
    window.livePriceSheetData && window.livePriceSheetData.rows
      ? window.livePriceSheetData.rows
      : null;
  if (liveRows && liveRows[key]) {
    const fromLive = parsePositiveNumber(liveRows[key].price);
    if (fromLive !== null) return fromLive;
  }
  return null;
}

function getEffectivePriceMap() {
  const map = {};
  assetKeys.forEach((key) => {
    map[key] = getEffectivePriceForKey(key);
  });
  return map;
}

function initializeDepositRebalanceHelper() {
  const tableBody = document.getElementById("rebalanceDepositRows");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  const lockSet = getRebalanceLockSet();

  assetKeys.forEach((key) => {
    const row = document.createElement("tr");
    row.id = `rebalance-deposit-row-${key}`;
    row.classList.add(
      "text-sm",
      "text-gray-700",
      "dark:text-gray-300",
      "hover:bg-amber-50/40",
      "dark:hover:bg-amber-900/20",
      "transition-colors"
    );
    row.innerHTML = `
      <td class="px-1 py-2">
        <button
          type="button"
          class="rebalance-lock-btn inline-flex items-center justify-center w-9 h-7 rounded-md border text-[11px] font-semibold tracking-wide transition"
          data-role="rebalance-lock"
          data-stock="${key}"
          aria-pressed="false"
        >ON</button>
      </td>
      <td class="px-1 py-2 font-medium text-gray-900 dark:text-gray-200">${key}</td>
      <td class="px-1 py-2 text-right" data-field="current">--</td>
      <td class="px-1 py-2 text-right" data-field="target">--</td>
      <td class="px-1 py-2 text-right" data-field="currentPercent">--</td>
      <td class="px-1 py-2 text-right" data-field="deposit"><span class="inline-flex items-center justify-end min-w-[72px] px-2 py-1 rounded bg-amber-500/15 text-amber-600 dark:bg-amber-500/25 dark:text-amber-200 font-semibold">--</span></td>
      <td class="px-1 py-2 text-right" data-field="newValue">--</td>
      <td class="px-1 py-2 text-right" data-field="newPercent">--</td>
      <td class="px-1 py-2 text-right" data-field="delta">--</td>
    `;
    tableBody.appendChild(row);
    const lockBtn = row.querySelector('[data-role="rebalance-lock"]');
    const isLocked = lockSet.has(key);
    applyRebalanceLockVisual(lockBtn, isLocked);
    lockBtn.addEventListener("click", () => {
      const locks = getRebalanceLockSet();
      if (locks.has(key)) {
        locks.delete(key);
      } else {
        locks.add(key);
      }
      persistRebalanceLocks();
      applyRebalanceLockVisual(lockBtn, locks.has(key));
      recalculateDepositRebalance();
    });
  });

  const depositInput = document.getElementById("rebalanceDepositAmount");
  const calcBtn = document.getElementById("rebalanceDepositCalcBtn");
  const roundingSelect = document.getElementById("rebalanceRoundingMode");
  const autoCheckbox = document.getElementById(
    "rebalanceAutoDistributeCheckbox"
  );

  if (depositInput) {
    const saved = loadRebalanceDepositAmount();
    if (saved) depositInput.value = saved;
    depositInput.addEventListener("input", () => {
      saveRebalanceDepositAmount(depositInput.value);
    });
    depositInput.addEventListener("change", () => {
      recalculateDepositRebalance();
    });
    depositInput.addEventListener("keyup", (evt) => {
      if (evt.key === "Enter") {
        recalculateDepositRebalance();
      }
    });
  }

  if (roundingSelect) {
    const savedMode = loadRebalanceRoundingMode();
    roundingSelect.value = savedMode;
    roundingSelect.addEventListener("change", () => {
      const mode = normalizeRoundingMode(roundingSelect.value);
      roundingSelect.value = mode;
      saveRebalanceRoundingMode(mode);
      recalculateDepositRebalance();
    });
  }

  if (autoCheckbox) {
    const options = getRebalanceOptions();
    autoCheckbox.checked = options.autoDistributeLeftover !== false;
    autoCheckbox.addEventListener("change", () => {
      updateRebalanceOptions({
        autoDistributeLeftover: !!autoCheckbox.checked,
      });
      recalculateDepositRebalance();
    });
  }

  if (calcBtn) {
    calcBtn.addEventListener("click", () => {
      recalculateDepositRebalance();
    });
  }

  const fallbackDepositInput = document.getElementById("newDepositInput");
  if (fallbackDepositInput) {
    fallbackDepositInput.addEventListener("input", () => {
      if (!depositInput || depositInput.value === "") {
        recalculateDepositRebalance();
      }
    });
  }

  recalculateDepositRebalance();
}

function getPortfolioSnapshot() {
  const snapshot = {};
  let totalCurrent = 0;
  let totalTarget = 0;

  assetKeys.forEach((key) => {
    const targetEl = document.querySelector(
      `input[data-stock="${key}"][data-field="target"]`
    );
    const currentValueEl = document.querySelector(
      `input[data-stock="${key}"][data-field="currentValue"]`
    );
    const currentPercentEl = document.querySelector(
      `input[data-stock="${key}"][data-field="currentPercent"]`
    );

    const target = parseFloat(targetEl ? targetEl.value : "") || 0;
    const currentValue =
      parseFloat(currentValueEl ? currentValueEl.value : "") || 0;
    const currentPercent =
      parseFloat(currentPercentEl ? currentPercentEl.value : "") || 0;

    snapshot[key] = {
      target,
      currentValue,
      currentPercent,
    };
    totalCurrent += currentValue;
    totalTarget += target;
  });

  snapshot.totalCurrent = totalCurrent;
  snapshot.totalTarget = totalTarget || 100;
  return snapshot;
}

function recalculateDepositRebalance() {
  const tableBody = document.getElementById("rebalanceDepositRows");
  if (!tableBody) return;

  const depositInput = document.getElementById("rebalanceDepositAmount");
  const fallbackDepositInput = document.getElementById("newDepositInput");
  const roundingSelect = document.getElementById("rebalanceRoundingMode");
  const options = getRebalanceOptions();

  let deposit =
    parseFloat(depositInput ? depositInput.value : "") ||
    parseFloat(fallbackDepositInput ? fallbackDepositInput.value : "") ||
    0;
  deposit = Math.max(0, deposit);

  if (depositInput && depositInput.value === "" && deposit > 0) {
    depositInput.value = deposit.toFixed(2);
  }

  if (depositInput) {
    saveRebalanceDepositAmount(depositInput.value);
  }

  const roundingMode = roundingSelect
    ? normalizeRoundingMode(roundingSelect.value)
    : loadRebalanceRoundingMode();
  if (roundingSelect && roundingSelect.value !== roundingMode) {
    roundingSelect.value = roundingMode;
  }
  saveRebalanceRoundingMode(roundingMode);

  const locks = getRebalanceLockSet();
  const snapshot = getPortfolioSnapshot();
  const assets = assetKeys.map((key) => ({
    key,
    targetPercent: snapshot[key] ? snapshot[key].target : 0,
    currentValue: snapshot[key] ? snapshot[key].currentValue : 0,
    currentPercent: snapshot[key] ? snapshot[key].currentPercent : 0,
  }));
  const priceMap = getEffectivePriceMap();

  let plan = null;
  if (
    typeof DepositRebalanceCore !== "undefined" &&
    typeof DepositRebalanceCore.computeRebalanceDepositPlan === "function"
  ) {
    plan = DepositRebalanceCore.computeRebalanceDepositPlan({
      assets,
      deposit,
      roundingMode,
      priceMap,
      lockedKeys: Array.from(locks),
      autoDistributeLeftover: options.autoDistributeLeftover !== false,
    });
  }

  if (!plan) {
    console.warn("DepositRebalanceCore missing - skipping calculation");
    return;
  }

  const totalRow = document.getElementById("rebalance-deposit-total-row");
  let totalCurrent = 0;

  assetKeys.forEach((key) => {
    const rowEl = document.getElementById(`rebalance-deposit-row-${key}`);
    const rowData = plan.rows[key] || {
      targetPercent: snapshot[key] ? snapshot[key].target : 0,
      currentValue: snapshot[key] ? snapshot[key].currentValue : 0,
      currentPercent: snapshot[key] ? snapshot[key].currentPercent : 0,
      finalAllocation: 0,
      newValue: snapshot[key] ? snapshot[key].currentValue : 0,
      newPercent: snapshot[key] ? snapshot[key].currentPercent : 0,
      delta: snapshot[key] ? snapshot[key].currentPercent - (snapshot[key].target || 0) : 0,
      shares: null,
      locked: locks.has(key),
    };
    if (!rowEl) return;

    const isLocked = rowData.locked || locks.has(key);
    rowEl.classList.toggle("opacity-40", isLocked);

    const lockBtn = rowEl.querySelector('[data-role="rebalance-lock"]');
    applyRebalanceLockVisual(lockBtn, isLocked);

    totalCurrent += rowData.currentValue || 0;

    const updateCell = (field, value, formatter = (v) => v, forceSpan = false) => {
      const container = rowEl.querySelector(`[data-field="${field}"]`);
      if (!container) return;
      const targetEl = forceSpan
        ? container.querySelector("span") || container
        : field === "deposit"
        ? container.querySelector("span") || container
        : container;
      if (value === null || value === undefined) {
        targetEl.textContent = "--";
        return;
      }
      targetEl.textContent = formatter(value);
    };

    updateCell("current", rowData.currentValue, formatCurrency);
    updateCell("target", rowData.targetPercent, (v) => formatPercent(v));
    updateCell("currentPercent", rowData.currentPercent, (v) => formatPercent(v));
    if (isLocked) {
      updateCell("deposit", null, () => "--", true);
    } else {
      updateCell("deposit", rowData.finalAllocation, formatCurrency, true);
    }
    updateCell("newValue", rowData.newValue, formatCurrency);
    updateCell("newPercent", rowData.newPercent, (v) => formatPercent(v));

    const deltaEl = rowEl.querySelector('[data-field="delta"]');
    if (deltaEl) {
      if (rowData.delta === null || rowData.delta === undefined) {
        deltaEl.textContent = "--";
        deltaEl.classList.remove("text-green-500", "text-red-500", "text-blue-500");
      } else {
        deltaEl.textContent = formatPercent(rowData.delta);
        deltaEl.classList.remove("text-green-500", "text-red-500", "text-blue-500");
        if (Math.abs(rowData.delta) <= 0.05) {
          deltaEl.classList.add("text-green-500");
        } else if (rowData.delta > 0.05) {
          deltaEl.classList.add("text-red-500");
        } else {
          deltaEl.classList.add("text-blue-500");
        }
      }
    }
  });

  if (totalRow) {
    const updateTotalCell = (field, value, formatter = (v) => v) => {
      const container = totalRow.querySelector(`[data-field="${field}"]`);
      if (!container) return;
      const targetEl =
        field === "deposit"
          ? container.querySelector("span") || container
          : container;
      if (value === null || value === undefined) {
        targetEl.textContent = "--";
        return;
      }
      targetEl.textContent = formatter(value);
    };

    const labelCell = totalRow.querySelector("td");
    if (labelCell) {
      labelCell.textContent = `Locks: ${plan.totals.lockedCount || 0}`;
    }

    updateTotalCell("current", plan.totals.totalCurrent, formatCurrency);
    updateTotalCell(
      "currentPercent",
      plan.totals.totalCurrent > 0 ? formatPercent(100) : "--"
    );
    updateTotalCell("deposit", plan.totals.assigned, formatCurrency);
    updateTotalCell("newValue", plan.totals.finalTotalValue, formatCurrency);
    updateTotalCell(
      "newPercent",
      plan.totals.finalTotalValue > 0 ? formatPercent(100) : "--"
    );
    updateTotalCell("delta", plan.totals.finalTotalValue > 0 ? formatPercent(0) : "--");
  }

  const spentSummary = document.getElementById("rebalanceSpentSummary");
  const leftoverSummary = document.getElementById("rebalanceLeftoverSummary");
  const impactSummary = document.getElementById("rebalanceImpactSummary");
  const impactNote = document.getElementById("rebalanceImpactNote");

  if (spentSummary) {
    spentSummary.textContent = `${formatCurrency(plan.totals.assigned)} spent`;
  }
  if (leftoverSummary) {
    leftoverSummary.textContent = `${formatCurrency(
      plan.totals.leftoverCash
    )} leftover`;
  }

  if (impactSummary) {
    if (plan.warnings.zeroDeposit && plan.totals.assigned <= 0.0001) {
      impactSummary.textContent = "Awaiting deposit";
    } else if (plan.warnings.noActiveAssets) {
      impactSummary.textContent = "All holdings locked";
    } else if (plan.totals.needsCount > 0) {
      impactSummary.textContent = `Resolved ${plan.totals.needsCount} of ${plan.totals.resolvedCount} underweights`;
    } else {
      impactSummary.textContent = "Portfolio already on target";
    }
  }

  if (impactNote) {
    const parts = [];
    parts.push(`Max remaining drift ${formatPercent(plan.totals.maxDeltaAfter || 0)}`);
    if (roundingMode !== "exact") {
      parts.push(
        `Prices ready for ${plan.totals.priceCoverageCount}/${assetKeys.length}`
      );
    }
    if (plan.totals.missingPriceTickers.length) {
      parts.push(
        `Missing prices: ${plan.totals.missingPriceTickers.join(", ")}`
      );
    }
    if (plan.warnings.zeroDeposit && plan.totals.assigned <= 0.0001) {
      parts.push("Enter a deposit and run the helper to deploy cash.");
    }
    impactNote.textContent = parts.join(" - ");
  }

  if (typeof document !== "undefined" && typeof document.dispatchEvent === "function") {
    document.dispatchEvent(
      new CustomEvent("rebalanceDepositPlanUpdated", {
        detail: {
          plan,
          totals: plan.totals,
          generatedAt: Date.now(),
        },
      })
    );
  }
}
