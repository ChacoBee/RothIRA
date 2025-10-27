// --- Initialize inputs for table 6A ---

const actionFeedbackManager = (() => {
  const panel = document.getElementById("actionFeedbackPanel");
  if (!panel) {
    return {
      show: () => {},
      hide: () => {},
    };
  }

  const stateClasses = [
    "action-feedback--progress",
    "action-feedback--success",
    "action-feedback--error",
    "action-feedback--info",
  ];
  const validStates = new Set(["progress", "success", "error", "info"]);
  let hideTimer = null;

  function ensureMessageContainer() {
    let messageEl = panel.querySelector(".action-feedback__message");
    if (!messageEl) {
      messageEl = document.createElement("span");
      messageEl.className = "action-feedback__message";
      panel.appendChild(messageEl);
    }
    return messageEl;
  }

  function hideInternal() {
    panel.classList.remove("action-feedback--visible");
    panel.classList.add("action-feedback--hidden");
    panel.classList.remove(...stateClasses);
    panel.setAttribute("aria-hidden", "true");
  }

  function show(message, options = {}) {
    if (!message) {
      hide();
      return;
    }
    const { state = "info", autoHide = 2200 } = options;
    clearTimeout(hideTimer);
    const messageEl = ensureMessageContainer();
    messageEl.textContent = message;

    panel.classList.remove("action-feedback--hidden", ...stateClasses);
    panel.classList.add("action-feedback--visible");

    const normalizedState = validStates.has(state) ? state : "info";
    panel.classList.add(`action-feedback--${normalizedState}`);
    panel.setAttribute("aria-hidden", "false");
    panel.setAttribute("data-state", normalizedState);

    if (autoHide !== false) {
      hideTimer = window.setTimeout(() => {
        hideInternal();
      }, Math.max(600, Number(autoHide) || 2200));
    }
  }

  function hide(delay = 0) {
    clearTimeout(hideTimer);
    if (delay > 0) {
      hideTimer = window.setTimeout(() => {
        hideInternal();
      }, delay);
    } else {
      hideInternal();
    }
  }

  return { show, hide };
})();

window.showActionFeedback = actionFeedbackManager.show;
window.hideActionFeedback = actionFeedbackManager.hide;

const REBALANCE_TOLERANCE_STORAGE_KEY = "rebalanceTolerancePercent";

const DEFAULT_REBALANCE_TOLERANCE =

  typeof REBALANCE_THRESHOLD === "number" ? REBALANCE_THRESHOLD : 5;



function normalizeTargets() {

  const targetInputs = Array.from(

    document.querySelectorAll("#rebalanceInputs input[data-field='target']")

  );

  if (!targetInputs.length) return;



  let total = 0;

  const numericTargets = targetInputs.map((input) => {

    const value = parseFloat(input.value);

    const safeValue = Number.isFinite(value) ? value : 0;

    total += safeValue;

    return { input, value: safeValue };

  });



  if (total === 0) {

    return;

  }



  numericTargets.forEach(({ input, value }) => {

    const normalized = (value / total) * 100;

    input.value = normalized.toFixed(2);

  });



  saveTargetsToLocalStorage();

  updatePortfolioMetrics();

}



function resetTargetsToDefaults() {

  const defaults = window.defaultTargetAllocations || {};

  let didUpdate = false;

  assetKeys.forEach((key) => {

    const input = document.querySelector(

      `input[data-stock="${key}"][data-field="target"]`

    );

    if (!input) return;

    const defaultValue = defaults[key];

    if (typeof defaultValue === "number" && !Number.isNaN(defaultValue)) {

      input.value = Number(defaultValue).toFixed(2);

      didUpdate = true;

    }

  });

  if (didUpdate) {

    saveTargetsToLocalStorage();

    updatePortfolioMetrics();

  }

}



function initializeRebalanceInputs() {

  const rebalanceInputsEl = document.getElementById("rebalanceInputs");

  rebalanceInputsEl.innerHTML = "";



  // Restore currentValue from localStorage if present

  let savedCurrentValues = {};

  try {

    const raw = localStorage.getItem("portfolioCurrentValues");

    if (raw) savedCurrentValues = JSON.parse(raw);

  } catch (e) {}



  assetKeys.forEach((key) => {

    const data = initialStockData[key];

    const row = document.createElement("tr");

    row.classList.add(

      "text-sm",

      "text-gray-700",

      "dark:text-gray-300",

      "hover:bg-green-50/50",

      "dark:hover:bg-slate-700/50",

      "transition-colors"

    );

    // Prefer stored values; otherwise fallback to dataset defaults

    let currentValue =

      savedCurrentValues && savedCurrentValues[key] !== undefined

        ? savedCurrentValues[key]

        : data.currentValue;

    row.innerHTML = `

        <td class="px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">${key}</td>

        <td class="px-2 py-2">

          <input

            type="number"

            data-stock="${key}"

            data-field="target"

            value="${data.target}"

            class="w-full styled-input p-1 text-right"

            min="0"

            max="100"

            step="0.01"

          >

        </td>

        <td class="px-2 py-2">

          <input

            type="number"

            data-stock="${key}"

            data-field="currentValue"

            value="${Number(currentValue).toFixed(2)}"

            class="w-full styled-input p-1 text-right"

            min="0"

            step="0.01"

          >

        </td>

        <td class="px-2 py-2">

          <input

            type="number"

            data-stock="${key}"

            data-field="currentPercent"

            value="${data.currentPercent.toFixed(2)}"

            class="w-full styled-input p-1 text-right"

            min="0"

            max="100"

            step="0.01"

            readonly

          >

        </td>

        <td class="px-2 py-3 text-right font-semibold text-slate-500" id="drift-${key}">--</td>

        <td class="px-2 py-3 text-right font-bold" id="rebalance-${key}">-</td>

      `;

    rebalanceInputsEl.appendChild(row);

  });

  // Only update portfolio metrics when the input changes; do not write to localStorage here

  document

    .querySelectorAll(

      "#rebalanceInputs input[data-field='target'], #rebalanceInputs input[data-field='currentValue']"

    )

    .forEach((input) => {

      input.addEventListener("input", function (e) {

        updatePortfolioMetrics();

      });

    });



  // Persist currentValue to localStorage when the Update Target % button is pressed

  const updateBtn = document.getElementById("calculateRebalanceBtn");

    if (updateBtn) {

      updateBtn.addEventListener("click", function () {

        let values = {};

        assetKeys.forEach((key) => {

          const el = document.querySelector(

            `input[data-stock='${key}'][data-field='currentValue']`

          );

          values[key] = el ? parseFloat(el.value) || 0 : 0;

        });

        try {

          localStorage.setItem(

            "portfolioCurrentValues",

            JSON.stringify(values)

          );

        } catch (e) {}

      });

    }



    const normalizeBtn = document.getElementById("rebalanceNormalizeBtn");

    if (normalizeBtn) {

      normalizeBtn.addEventListener("click", normalizeTargets);

    }

    const resetBtn = document.getElementById("rebalanceResetTargetsBtn");

    if (resetBtn) {

      resetBtn.addEventListener("click", resetTargetsToDefaults);

    }

  }



// Persist and restore Target % values (6A) using localStorage

function saveTargetsToLocalStorage() {

  const targets = {};

  assetKeys.forEach((key) => {

    const targetEl = document.querySelector(

      `input[data-stock="${key}"][data-field="target"]`

    );

    const targetVal = parseFloat(targetEl ? targetEl.value : NaN);

    if (!isNaN(targetVal)) targets[key] = targetVal;

  });

  try {

    localStorage.setItem("portfolioTargets", JSON.stringify(targets));

  } catch (e) {

    console.warn("Unable to save targets to localStorage", e);

  }

}



function loadTargetsFromLocalStorage() {

  try {

    const raw = localStorage.getItem("portfolioTargets");

    if (!raw) return false;

    const parsed = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") return false;

    // Apply loaded targets to initialStockData so initialization uses them

    Object.keys(parsed).forEach((key) => {

      if (initialStockData[key] && typeof parsed[key] === "number") {

        initialStockData[key].target = parsed[key];

      }

    });

    return true;

  } catch (e) {

    console.warn("Unable to load targets from localStorage", e);

    return false;

  }

}



// --- Refresh charts and computed metrics ---

function updatePortfolioMetrics() {

  const activeThreshold = getActiveRebalanceThreshold();

  let totalTarget = 0;

  let totalCurrentValue = 0;

  let totalCurrentPercent = 0;

  let resultsHTML = "";

  const buyResults = [];

  const sellResults = [];

  let isRebalancingNeeded = false;

  const chartLabels = [];

  const chartData = [];

  const currentDataMap = {};

  let totalAbsDrift = 0;

  let largestOver = { key: null, drift: Infinity };

  let largestUnder = { key: null, drift: -Infinity };

  const driftEntries = [];

  let totalBuyAmount = 0;

  let totalSellAmount = 0;



  assetKeys.forEach((key) => {

    const targetInput = document.querySelector(

      `input[data-stock="${key}"][data-field="target"]`

    );

    const currentValueInput = document.querySelector(

      `input[data-stock="${key}"][data-field="currentValue"]`

    );



    const target = parseFloat(targetInput ? targetInput.value : "") || 0;

    const currentValue =

      parseFloat(currentValueInput ? currentValueInput.value : "") || 0;



    currentDataMap[key] = {

      target,

      currentValue,

      currentPercent: 0,

      drift: 0,

    };



    totalTarget += target;

    totalCurrentValue += currentValue;

  });



  const thresholdValue = Math.max(0, activeThreshold);

  assetKeys.forEach((key) => {

    const data = currentDataMap[key];

    const currentPercentInput = document.querySelector(

      `input[data-stock="${key}"][data-field="currentPercent"]`

    );



    let percent = 0;

    if (totalCurrentValue > 0) {

      percent = (data.currentValue / totalCurrentValue) * 100;

    }

    data.currentPercent = percent;

    if (currentPercentInput) {

      currentPercentInput.value = percent.toFixed(2);

    }

    totalCurrentPercent += percent;



    const drift = data.target - percent;

    data.drift = drift;

    totalAbsDrift += Math.abs(drift);

    const meetsThreshold =

      Math.abs(drift) >= thresholdValue - 1e-6;

    driftEntries.push({

      key,

      drift,

      currentPercent: percent,

      target: data.target,

      meetsThreshold,

    });



    if (meetsThreshold && drift < 0 && drift < largestOver.drift) {

      largestOver = { key, drift };

    }

    if (meetsThreshold && drift > 0 && drift > largestUnder.drift) {

      largestUnder = { key, drift };

    }

  });



  const rebalanceMap = {};

  let totalBuySell = 0;

  assetKeys.forEach((key) => {

    const data = currentDataMap[key];

    const idealValue = (data.target / 100) * totalCurrentValue;

    const buySell = idealValue - data.currentValue;

    rebalanceMap[key] = buySell;

    totalBuySell += buySell;

  });



  if (Math.abs(totalBuySell) > 0.01) {

    const maxKey = assetKeys.reduce((a, b) =>

      Math.abs(rebalanceMap[a]) > Math.abs(rebalanceMap[b]) ? a : b

    );

    rebalanceMap[maxKey] -= totalBuySell;

  }



  let totalRebalance = 0;



  assetKeys.forEach((key) => {

    const plannedMove = rebalanceMap[key];

    const data = currentDataMap[key];

    let actionClass = "text-gray-500 dark:text-gray-400";

    let actionText = "--";

    const deviationPercent = data.target - data.currentPercent;

    const absDeviation = Math.abs(deviationPercent);

    const meetsThreshold = absDeviation >= thresholdValue - 1e-6;

    const buySell = meetsThreshold ? plannedMove : 0;

    rebalanceMap[key] = buySell;



    if (Math.abs(buySell) > 0.01) {

      isRebalancingNeeded = true;

      if (buySell > 0) {

        actionClass = "profit";

        actionText = formatCurrency(buySell);

        totalBuyAmount += buySell;

        buyResults.push({

          deviation: deviationPercent,

          html: createRebalanceResult(

            key,

            deviationPercent,

            buySell,

            "BUY",

            currentDataMap

          ),

        });

      } else {

        actionClass = "loss";

        actionText = formatCurrency(buySell);

        totalSellAmount += Math.abs(buySell);

        sellResults.push({

          deviation: deviationPercent,

          html: createRebalanceResult(

            key,

            deviationPercent,

            Math.abs(buySell),

            "SELL",

            currentDataMap

          ),

        });

      }

    }



    const rebalanceCell = document.getElementById(`rebalance-${key}`);

    if (rebalanceCell) {

      rebalanceCell.innerHTML = `<span class="${actionClass}">${actionText}</span>`;

    }



    const driftCell = document.getElementById(`drift-${key}`);

    if (driftCell) {

      const driftValue = data.drift || 0;

      const driftAbs = Math.abs(driftValue);

      driftCell.textContent = `${driftValue >= 0 ? "+" : ""}${driftValue.toFixed(2)}%`;

      driftCell.className = "px-2 py-3 text-right font-semibold";

      if (driftAbs <= 0.25) {

        driftCell.classList.add("text-slate-400");

      } else if (driftValue > 0) {

        driftCell.classList.add("text-emerald-500");

      } else if (driftValue < 0) {

        driftCell.classList.add("text-rose-500");

      } else {

        driftCell.classList.add("text-slate-500");

      }

    }



    chartData.push(data.currentPercent);

    chartLabels.push(`${key} (${data.currentPercent.toFixed(1)}%)`);

    totalRebalance += buySell;

  });



  buyResults.sort((a, b) => b.deviation - a.deviation);

  sellResults.sort((a, b) => Math.abs(b.deviation) - Math.abs(a.deviation));

  const buysMarkup = buyResults.length

    ? buyResults.map((item) => item.html).join("")

    : `<p class="text-sm text-emerald-700 dark:text-emerald-300">No buys required.</p>`;

  const sellsMarkup = sellResults.length

    ? sellResults.map((item) => item.html).join("")

    : `<p class="text-sm text-red-700 dark:text-red-300">No sells required.</p>`;



  resultsHTML = `

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>

          <h5 class="text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2 uppercase tracking-wide">Buy Targets</h5>

          ${buysMarkup}

        </div>

        <div>

          <h5 class="text-sm font-semibold text-red-700 dark:text-red-300 mb-2 uppercase tracking-wide">Sell Targets</h5>

          ${sellsMarkup}

        </div>

      </div>

    `;



  const topDrifts = driftEntries

    .slice()

    .sort((a, b) => Math.abs(b.drift) - Math.abs(a.drift))

    .slice(0, 3);



  const formatDriftLabel = (value) =>

    `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;

  const largestOverValue =

    largestOver.key &&

    largestOver.drift < 0 &&

    Math.abs(largestOver.drift) >= thresholdValue - 1e-6

      ? `${largestOver.key}: ${formatDriftLabel(largestOver.drift)} - Sell ${formatCurrency(

          Math.abs(rebalanceMap[largestOver.key] || 0)

        )}`

      : "None";

  const largestUnderValue =

    largestUnder.key &&

    largestUnder.drift > 0 &&

    Math.abs(largestUnder.drift) >= thresholdValue - 1e-6

      ? `${largestUnder.key}: ${formatDriftLabel(largestUnder.drift)} - Buy ${formatCurrency(

          Math.abs(rebalanceMap[largestUnder.key] || 0)

        )}`

      : "None";

  const holdingsWithinTolerance = assetKeys.filter(

    (key) => Math.abs(currentDataMap[key].drift) <= activeThreshold

  ).length;

  const summaryMarkup = `

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div class="rounded-lg border border-rose-300/80 dark:border-rose-600/70 bg-rose-100/60 dark:bg-rose-900/30 p-3">

          <p class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Largest Overweight</p>

          <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">${largestOverValue}</p>

        </div>

        <div class="rounded-lg border border-emerald-300/80 dark:border-emerald-600/70 bg-emerald-100/60 dark:bg-emerald-900/30 p-3">

          <p class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Largest Underweight</p>

          <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">${largestUnderValue}</p>

        </div>

        <div class="rounded-lg border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/40 p-3">

          <p class="text-[11px] uppercase tracking-wide text-slate-500 dark:text-slate-400">Cumulative Drift</p>

          <p class="text-sm font-semibold text-slate-900 dark:text-slate-100">${totalAbsDrift.toFixed(2)}%</p>

          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Within +/-${activeThreshold.toFixed(

            2

          )}%: ${holdingsWithinTolerance}/${assetKeys.length}</p>

        </div>

      </div>

    `;



  const totalTargetCell = document.getElementById("totalTarget");

  if (totalTargetCell) {

    totalTargetCell.textContent = formatPercent(totalTarget);

  }

  const totalCurrentValueCell = document.getElementById("totalCurrentValue");

  if (totalCurrentValueCell) {

    totalCurrentValueCell.textContent = formatCurrency(totalCurrentValue);

  }

  const totalCurrentPercentCell = document.getElementById("totalCurrentPercent");

  if (totalCurrentPercentCell) {

    totalCurrentPercentCell.textContent = formatPercent(totalCurrentPercent);

  }

  const totalDriftCell = document.getElementById("totalDrift");

  if (totalDriftCell) {

    const totalDriftValue = totalCurrentPercent - totalTarget;

    const totalDriftAbs = Math.abs(totalDriftValue);

    totalDriftCell.textContent = `${totalDriftValue >= 0 ? "+" : ""}${totalDriftValue.toFixed(2)}%`;

    totalDriftCell.className = "px-3 py-2 text-right font-semibold";

    if (totalDriftAbs <= 0.25) {

      totalDriftCell.classList.add("text-slate-500");

    } else if (totalDriftValue > 0) {

      totalDriftCell.classList.add("text-rose-500");

    } else if (totalDriftValue < 0) {

      totalDriftCell.classList.add("text-emerald-500");

    }

  }

  const totalRebalanceCell = document.getElementById("totalRebalance");

  if (totalRebalanceCell) {

    totalRebalanceCell.innerHTML = `<span style="color:#fff;">${formatCurrency(totalRebalance)}</span>`;

  }

  const currentTotalDisplay = document.getElementById("currentTotalValueDisplay");

  if (currentTotalDisplay) {

    currentTotalDisplay.textContent = formatCurrency(totalCurrentValue);

  }

  const initialInput = document.getElementById("initial");

  if (initialInput) {

    initialInput.value = (totalCurrentValue || 0).toFixed(2);

  }

  window.portfolioLastMetricsUpdatedAt = new Date();

  updateHeroMetricTilesSummary();

  updateAllocationChart(

    chartLabels,

    chartData,

    "Portfolio Allocation (%)",

    totalCurrentPercent

  );

  runSimulation();

  initializeMetricDropdownToggles();



  if (typeof updateStockTabsLabels === "function") {

    updateStockTabsLabels();

  }

  if (typeof refreshActiveStockDetails === "function") {

    refreshActiveStockDetails();

  }

  if (typeof updateAllocationAIReview === "function") {

    updateAllocationAIReview();

  }



  const netFlow = totalSellAmount - totalBuyAmount;

  const clipboardSummaryLines = [

    `Rebalance summary (${new Date().toLocaleString()}):`,

    `Tolerance: +/-${activeThreshold.toFixed(2)}%`,

    `Buys required: ${formatCurrency(totalBuyAmount)} | Sells required: ${formatCurrency(

      totalSellAmount

    )} | Net flow: ${formatCurrency(netFlow)}`,

  ];

  if (topDrifts.length) {

    clipboardSummaryLines.push(

      "Top drifted holdings:",

      ...topDrifts.map(

        (entry) =>

          `- ${entry.key}: drift ${formatDriftLabel(entry.drift)} (Target ${entry.target.toFixed(

            2

          )}%, Current ${entry.currentPercent.toFixed(2)}%)`

      )

    );

  } else {

    clipboardSummaryLines.push("Top drifted holdings: None");

  }

  clipboardSummaryLines.push(

    `Status: ${isRebalancingNeeded ? "Rebalance required" : "Within tolerance"}`

  );

  const clipboardSummary = clipboardSummaryLines.join("\n");



  const rebalanceResultsEl = document.getElementById("rebalanceResults");

  if (

    isRebalancingNeeded &&

    Math.abs(totalCurrentPercent - 100) < 0.1 &&

    Math.abs(totalTarget - 100) < 0.1

  ) {

    rebalanceResultsEl.innerHTML = `

      <div class="rebalance-results-content">

        <div class="rebalance-results-header flex items-start justify-between gap-3">

          <div>

            <h4 class="text-xl font-bold text-red-600 dark:text-red-400">WARNING: REBALANCE NEEDED ($)</h4>

            <p class="text-xs text-red-600/80 dark:text-red-300/80">Holdings breached the +/-${activeThreshold.toFixed(

              2

            )}% guardrail. Review the trade flow snapshot and execute recommended orders.</p>

          </div>

          <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 text-[11px] font-semibold uppercase tracking-wide">Action</span>

        </div>

        <div class="rebalance-results-scroll fancy-scrollbar">

          ${summaryMarkup}${resultsHTML}

        </div>

      </div>`;

  } else if (

    Math.abs(totalCurrentPercent - 100) > 0.1 ||

    Math.abs(totalTarget - 100) > 0.1

  ) {

    rebalanceResultsEl.innerHTML = `

      <div class="rebalance-results-content rebalance-results-empty">

        <p class="text-center text-xl font-bold text-red-600 dark:text-red-400">ERROR: Total Current % (${totalCurrentPercent.toFixed(

          1

        )}%) or Target % (${totalTarget.toFixed(

          1

        )}%) is not 100%. Please check input data.</p>

      </div>`;

  } else {

    rebalanceResultsEl.innerHTML = `

      <div class="rebalance-results-content">

        <div class="rebalance-results-header flex items-start justify-between gap-3">

          <div>

            <h4 class="text-xl font-bold text-green-600 dark:text-green-400">Portfolio is within safe tolerance (+/-${activeThreshold.toFixed(

              2

            )}%).</h4>

            <p class="text-xs text-green-600/80 dark:text-green-300/80">No trades required. Keep monitoring drift or tighten the guardrail to catch movements sooner.</p>

          </div>

          <span class="inline-flex items-center px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200 text-[11px] font-semibold uppercase tracking-wide">Stable</span>

        </div>

        <div class="rebalance-results-scroll fancy-scrollbar">

          ${summaryMarkup}

        </div>

      </div>`;

  }



  updateRebalanceAdvancedDiagnostics({

    threshold: activeThreshold,

    totalBuy: totalBuyAmount,

    totalSell: totalSellAmount,

    netFlow,

    topDrifts,

    summaryText: clipboardSummary,

    needsRebalance: isRebalancingNeeded,

  });



  if (typeof initializeDepositAllocationInputs === "function") {

    setTimeout(() => initializeDepositAllocationInputs(), 50);

  }

  if (typeof recalculateDepositRebalance === "function") {

    setTimeout(() => recalculateDepositRebalance(), 60);

  }

}



function updateRebalanceAdvancedDiagnostics(diagnostics) {

  const {

    threshold,

    totalBuy,

    totalSell,

    netFlow,

    topDrifts,

    summaryText,

    needsRebalance,

  } = diagnostics || {};



  const toleranceDisplay = document.getElementById("rebalanceToleranceValue");

  if (toleranceDisplay && Number.isFinite(threshold)) {

    toleranceDisplay.textContent = `${threshold.toFixed(1)}%`;

  }



  const buyEl = document.getElementById("rebalanceTotalBuy");

  if (buyEl) {

    buyEl.textContent = formatCurrency(totalBuy || 0);

  }

  const sellEl = document.getElementById("rebalanceTotalSell");

  if (sellEl) {

    sellEl.textContent = formatCurrency(totalSell || 0);

  }

  const netEl = document.getElementById("rebalanceNetFlow");

  if (netEl) {

    netEl.textContent = formatCurrency(netFlow || 0);

    netEl.classList.remove(

      "text-emerald-900",

      "dark:text-emerald-100",

      "text-rose-600",

      "dark:text-rose-300"

    );

    if ((netFlow || 0) < 0) {

      netEl.classList.add("text-rose-600", "dark:text-rose-300");

    } else {

      netEl.classList.add("text-emerald-900", "dark:text-emerald-100");

    }

  }



  const topDriftsContainer = document.getElementById("rebalanceTopDrifts");

  if (topDriftsContainer) {

    if (Array.isArray(topDrifts) && topDrifts.length) {

      topDriftsContainer.innerHTML = topDrifts

        .map((entry) => {

          const driftClass =

            entry.drift > 0

              ? "bg-emerald-100/70 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-200"

              : "bg-rose-100/70 dark:bg-rose-900/40 text-rose-700 dark:text-rose-200";

          return `<div class="p-2 rounded-lg border border-slate-200/70 dark:border-slate-700/60 bg-white/70 dark:bg-slate-900/40">

            <div class="flex items-center justify-between gap-3">

              <span class="text-sm font-semibold text-slate-700 dark:text-slate-200">${entry.key}</span>

              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold ${driftClass}">

                ${entry.drift >= 0 ? "+" : ""}${entry.drift.toFixed(2)}%

              </span>

            </div>

            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Target ${entry.target.toFixed(

              2

            )}%, current ${entry.currentPercent.toFixed(2)}%</p>

          </div>`;

        })

        .join("");

    } else {

      topDriftsContainer.innerHTML = `<p class="text-xs text-slate-500 dark:text-slate-400">

        All holdings sit within the current guardrail. Tighten the tolerance to surface smaller drifts.

      </p>`;

    }

  }



  const copyBtn = document.getElementById("rebalanceCopySummaryBtn");

  if (copyBtn) {

    copyBtn.dataset.summary = summaryText || "";

    copyBtn.dataset.defaultLabel =

      copyBtn.dataset.defaultLabel || copyBtn.textContent || "Copy trade summary";

    if (!copyBtn.dataset.bound) {

      copyBtn.dataset.bound = "true";

      copyBtn.addEventListener("click", async () => {

        const text = copyBtn.dataset.summary || "";

        if (!text) {

          return;

        }

        try {

          if (navigator?.clipboard?.writeText) {

            await navigator.clipboard.writeText(text);

          } else {

            const tempArea = document.createElement("textarea");

            tempArea.value = text;

            tempArea.setAttribute("readonly", "");

            tempArea.style.position = "absolute";

            tempArea.style.left = "-9999px";

            document.body.appendChild(tempArea);

            tempArea.select();

            document.execCommand("copy");

            document.body.removeChild(tempArea);

          }

          copyBtn.textContent = "Summary copied!";

          setTimeout(() => {

            copyBtn.textContent =

              copyBtn.dataset.defaultLabel || "Copy trade summary";

          }, 1800);

        } catch (err) {

          copyBtn.textContent = "Copy failed";

          setTimeout(() => {

            copyBtn.textContent =

              copyBtn.dataset.defaultLabel || "Copy trade summary";

          }, 2000);

        }

      });

    }

  }



  const advancedTools = document.getElementById("rebalanceAdvancedTools");

  if (advancedTools) {

    advancedTools.classList.remove("border-rose-400/60", "border-emerald-400/60");

    if (needsRebalance) {

      advancedTools.classList.add("border-rose-400/60");

      advancedTools.style.borderWidth = "1px";

      advancedTools.style.borderStyle = "solid";

    } else {

      advancedTools.classList.add("border-emerald-400/60");

      advancedTools.style.borderWidth = "1px";

      advancedTools.style.borderStyle = "solid";

    }

  }

}



function getStoredRebalanceTolerance() {

  try {

    const raw = localStorage.getItem(REBALANCE_TOLERANCE_STORAGE_KEY);

    if (!raw) return DEFAULT_REBALANCE_TOLERANCE;

    const parsed = parseFloat(raw);

    return Number.isFinite(parsed)

      ? Math.min(15, Math.max(1, parsed))

      : DEFAULT_REBALANCE_TOLERANCE;

  } catch (e) {

    return DEFAULT_REBALANCE_TOLERANCE;

  }

}



function setStoredRebalanceTolerance(value) {

  const numeric = parseFloat(value);

  const clamped = Math.min(15, Math.max(1, Number.isFinite(numeric) ? numeric : DEFAULT_REBALANCE_TOLERANCE));

  try {

    localStorage.setItem(REBALANCE_TOLERANCE_STORAGE_KEY, clamped.toString());

  } catch (e) {}

  window.rebalanceTolerancePercent = clamped;

  return clamped;

}



function getActiveRebalanceThreshold() {

  if (typeof window.rebalanceTolerancePercent === "number") {

    return window.rebalanceTolerancePercent;

  }

  const slider = document.getElementById("rebalanceToleranceInput");

  if (slider) {

    const sliderValue = parseFloat(slider.value);

    if (Number.isFinite(sliderValue)) {

      window.rebalanceTolerancePercent = sliderValue;

      return sliderValue;

    }

  }

  const stored = getStoredRebalanceTolerance();

  window.rebalanceTolerancePercent = stored;

  return stored;

}



function initializeRebalanceControlPanel() {

  const slider = document.getElementById("rebalanceToleranceInput");

  const resetBtn = document.getElementById("rebalanceResetControlsBtn");



  const applyTolerance = (value, triggerUpdate = true) => {

    const normalized = setStoredRebalanceTolerance(value);

    if (slider && slider.value !== normalized.toString()) {

      slider.value = normalized;

    }

    updateRebalanceAdvancedDiagnostics({

      threshold: normalized,

      totalBuy: 0,

      totalSell: 0,

      netFlow: 0,

      topDrifts: [],

      summaryText: "",

      needsRebalance: false,

    });

    if (triggerUpdate) {

      updatePortfolioMetrics();

    }

  };



  const startingTolerance = getStoredRebalanceTolerance();

  window.rebalanceTolerancePercent = startingTolerance;



  if (slider) {

    slider.value = startingTolerance;

    slider.addEventListener("input", (event) => {

      const newValue = parseFloat(event.target.value);

      if (!Number.isFinite(newValue)) return;

      setStoredRebalanceTolerance(newValue);

      updatePortfolioMetrics();

    });

  }



  if (resetBtn && !resetBtn.dataset.bound) {

    resetBtn.dataset.bound = "true";

    resetBtn.addEventListener("click", () =>

      applyTolerance(DEFAULT_REBALANCE_TOLERANCE)

    );

  }



  updateRebalanceAdvancedDiagnostics({

    threshold: startingTolerance,

    totalBuy: 0,

    totalSell: 0,

    netFlow: 0,

    topDrifts: [],

    summaryText: "",

    needsRebalance: false,

  });

}



function createRebalanceResult(key, deviation, value, action, dataMap) {

  const actionClass =

    action === "BUY"

      ? "bg-green-100/50 dark:bg-green-900/50"

      : "bg-red-100/50 dark:bg-red-900/50";

  const textColor =

    action === "BUY"

      ? "text-green-700 dark:text-green-300"

      : "text-red-700 dark:text-red-300";

  const deviationLabel =

    (deviation >= 0 ? "+" : "") + deviation.toFixed(2) + "%";

  const currentPercentLabel =

    (dataMap[key].currentPercent || 0).toFixed(2) + "%";

  return `

              <div class="p-3 my-2 rounded-lg ${actionClass}">

                  <p class="font-semibold text-base text-gray-900 dark:text-gray-100">${key}: ${action} ${formatCurrency(

    value

  )}</p>

                  <p class="text-sm ${textColor}">Deviation: ${deviationLabel} (Target: ${dataMap[key].target.toFixed(

    2

  )}%, Current: ${currentPercentLabel})</p>

          </div>

       `;

}



function applyLiveDataToRebalance(rows) {

  if (!rows || typeof rows !== "object") return;



  let updated = false;

  const valuesToStore = {};



  assetKeys.forEach((key) => {

    const currentInput = document.querySelector(

      `input[data-stock="${key}"][data-field="currentValue"]`

    );

    if (!currentInput) return;



    const liveData = rows[key];

    let numericValue = parseFloat(currentInput.value) || 0;



    if (liveData && liveData.currentValue !== null && liveData.currentValue !== undefined) {

      const liveNumber = Number(liveData.currentValue);

      if (Number.isFinite(liveNumber)) {

        const formatted = liveNumber.toFixed(2);

        if (currentInput.value !== formatted) {

          currentInput.value = formatted;

          updated = true;

        }

        numericValue = liveNumber;

      }

    }



    valuesToStore[key] = numericValue;

  });



  if (updated) {

    try {

      localStorage.setItem(

        "portfolioCurrentValues",

        JSON.stringify(valuesToStore)

      );

    } catch (e) {}

    window.portfolioDataRefreshedAt = new Date();

    updatePortfolioMetrics();

  }

}



function getPortfolioMetadataSummary() {

  const sectors = new Set();

  const regions = new Set();

  const assets = assetKeys.slice();



  assetKeys.forEach((key) => {

    const meta = initialStockData[key] || {};

    if (meta && meta.sector) {

      sectors.add(meta.sector);

    }

    if (meta && meta.region) {

      regions.add(meta.region);

    }

  });



  const sectorList = Array.from(sectors).sort((a, b) =>

    a.localeCompare(b)

  );

  const regionList = Array.from(regions).sort((a, b) =>

    a.localeCompare(b)

  );



  return {

    assetCount: assets.length,

    sectorCount: sectorList.length,

    regionCount: regionList.length,

    assets,

    sectors: sectorList,

    regions: regionList,

  };

}



function formatLastUpdatedLabels(input) {

  let referenceDate = input instanceof Date ? input : null;

  if (!referenceDate && input) {

    const parsed = new Date(input);

    if (!Number.isNaN(parsed.getTime())) {

      referenceDate = parsed;

    }

  }



  if (!referenceDate) {

    referenceDate = new Date();

  }



  const now = new Date();

  const startOfToday = new Date(

    now.getFullYear(),

    now.getMonth(),

    now.getDate()

  );

  const startOfReference = new Date(

    referenceDate.getFullYear(),

    referenceDate.getMonth(),

    referenceDate.getDate()

  );



  const diffMs = startOfToday.getTime() - startOfReference.getTime();

  const diffDays = Math.round(diffMs / 86400000);



  let dayLabel = referenceDate.toLocaleDateString(undefined, {

    month: "short",

    day: "numeric",

  });



  if (diffDays === 0) {

    dayLabel = "Today";

  } else if (diffDays === 1) {

    dayLabel = "Yesterday";

  }



  const timeLabel = referenceDate.toLocaleTimeString([], {

    hour: "2-digit",

    minute: "2-digit",

  });



  return { dayLabel, timeLabel };

}



function renderMetricList(container, items, emptyMessage) {

  if (!container) return;

  const entries = Array.isArray(items) ? items : [];

  if (!entries.length) {

    container.innerHTML = `<li class="metric-dropdown__empty">${emptyMessage}</li>`;

    return;

  }

  container.innerHTML = entries

    .map((entry) => {

      if (typeof entry === "string") {

        return `<li class="metric-dropdown__item"><span class="metric-dropdown__primary">${entry}</span></li>`;

      }

      const primary = entry?.primary ?? "";

      const secondary = entry?.secondary ?? "";

      const meta = entry?.meta ?? "";

      return `<li class="metric-dropdown__item">

        <span class="metric-dropdown__primary">${primary}</span>

        ${secondary ? `<span class="metric-dropdown__secondary">${secondary}</span>` : ""}

        ${meta ? `<span class="metric-dropdown__meta">${meta}</span>` : ""}

      </li>`;

    })

    .join("");

}



function updateHeroMetricTilesSummary() {

  const summary = getPortfolioMetadataSummary();

  const assetCountEl = document.getElementById("metricAssetCount");

  if (assetCountEl) {

    assetCountEl.textContent =

      summary.assetCount > 0 ? summary.assetCount.toString() : "--";

  }

  const assetCaptionEl = document.getElementById("metricAssetCaption");

  if (assetCaptionEl) {

    assetCaptionEl.textContent =

      summary.assetCount === 1 ? "Holding" : "Holdings";

  }



  const sectorCountEl = document.getElementById("metricSectorCount");

  if (sectorCountEl) {

    sectorCountEl.textContent =

      summary.sectorCount > 0 ? summary.sectorCount.toString() : "--";

  }

  const sectorCaptionEl = document.getElementById("metricSectorCaption");

  if (sectorCaptionEl) {

    sectorCaptionEl.textContent =

      summary.sectorCount === 1 ? "Sector covered" : "Sectors covered";

  }



  const regionCountEl = document.getElementById("metricRegionCount");

  if (regionCountEl) {

    regionCountEl.textContent =

      summary.regionCount > 0 ? summary.regionCount.toString() : "--";

  }

  const regionCaptionEl = document.getElementById("metricRegionCaption");

  if (regionCaptionEl) {

    regionCaptionEl.textContent =

      summary.regionCount === 1 ? "Region tracked" : "Regions tracked";

  }



  const assetListEl = document.getElementById("metricAssetList");

  if (assetListEl) {

    const assetDisplay = summary.assets.map((ticker) => {

      const meta = initialStockData[ticker] || {};

      const metaParts = [meta.sector, meta.region].filter(Boolean);

      return {

        primary: ticker,

        meta: metaParts.join(" / "),

      };

    });

    renderMetricList(assetListEl, assetDisplay, "No holdings configured.");

  }



  renderMetricList(

    document.getElementById("metricSectorList"),

    summary.sectors.map((sector) => ({ primary: sector })),

    "No sectors configured."

  );

  renderMetricList(

    document.getElementById("metricRegionList"),

    summary.regions.map((region) => ({ primary: region })),

    "No regions configured."

  );



  const lastUpdatedSource =

    window.portfolioDataRefreshedAt ||

    window.portfolioLastMetricsUpdatedAt ||

    new Date();



  const { dayLabel, timeLabel } = formatLastUpdatedLabels(lastUpdatedSource);

  const lastValueEl = document.getElementById("metricLastUpdateValue");

  if (lastValueEl) {

    lastValueEl.textContent = dayLabel;

  }

  const lastCaptionEl = document.getElementById("metricLastUpdateCaption");

  if (lastCaptionEl) {

    lastCaptionEl.textContent = `Data refreshed at ${timeLabel}`;

  }

}



function initializeMetricDropdownToggles() {

  const toggles = document.querySelectorAll("[data-metric-toggle]");



  const closeAll = (exceptId = null) => {

    document.querySelectorAll(".metric-dropdown").forEach((panel) => {

      if (panel.id === exceptId) return;

      if (panel.classList.contains("hidden")) return;

      panel.classList.add("hidden");

      panel.setAttribute("aria-hidden", "true");

      panel.classList.remove("metric-dropdown--align-right");

      panel.style.left = "";

      panel.style.right = "";

      const button = document.querySelector(

        `[data-metric-toggle="${panel.id}"]`

      );

      if (button) {

        button.setAttribute("aria-expanded", "false");

        button.classList.remove("is-active");

      }

    });

  };



  toggles.forEach((btn) => {

    if (btn.dataset.metricToggleReady === "true") {

      return;

    }

    btn.dataset.metricToggleReady = "true";

    btn.addEventListener("click", (event) => {

      event.preventDefault();

      event.stopPropagation();

      const targetId = btn.getAttribute("data-metric-toggle");

      if (!targetId) return;

      const target = document.getElementById(targetId);

      if (!target) return;

      const isHidden = target.classList.contains("hidden");

      if (isHidden) {

        closeAll(targetId);

        target.classList.remove("hidden");

        target.setAttribute("aria-hidden", "false");

        btn.setAttribute("aria-expanded", "true");

        btn.classList.add("is-active");



        target.style.left = "";

        target.style.right = "";

        target.classList.remove("metric-dropdown--align-right");

        const wrapperRect = btn

          .closest(".metric-dropdown-wrapper")

          ?.getBoundingClientRect();

        const dropdownRect = target.getBoundingClientRect();

        const viewportWidth =

          window.innerWidth || document.documentElement.clientWidth || 0;

        if (wrapperRect && dropdownRect.right > viewportWidth - 16) {

          target.style.left = "auto";

          target.style.right = "0";

          target.classList.add("metric-dropdown--align-right");

        } else {

          target.classList.remove("metric-dropdown--align-right");

        }

      } else {

        target.classList.add("hidden");

        target.setAttribute("aria-hidden", "true");

        btn.setAttribute("aria-expanded", "false");

        btn.classList.remove("is-active");

      }

    });

  });



  if (!window.metricDropdownGlobalListener) {

    document.addEventListener("click", (event) => {

      if (

        event.target.closest(".metric-dropdown") ||

        event.target.closest(".metric-dropdown-toggle")

      ) {

        return;

      }

      closeAll();

    });

    window.metricDropdownGlobalListener = true;

  }



  if (!window.metricDropdownKeyListener) {

    document.addEventListener("keydown", (event) => {

      if (event.key === "Escape") {

        closeAll();

      }

    });

    window.metricDropdownKeyListener = true;

  }

}




