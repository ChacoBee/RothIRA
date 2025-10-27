// --- HÀM KHỞI TẠO INPUTS BẢNG 6A ---
function initializeRebalanceInputs() {
  const rebalanceInputsEl = document.getElementById("rebalanceInputs");
  rebalanceInputsEl.innerHTML = "";

  // Khôi phục currentValue từ localStorage nếu có
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
    // Nếu có giá trị lưu, dùng giá trị đó, không thì lấy từ data
    let currentValue =
      savedCurrentValues && savedCurrentValues[key] !== undefined
        ? savedCurrentValues[key]
        : data.currentValue;
    row.innerHTML = `
      <td class="px-2 py-3 whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">${key}</td>
      <td class="px-2 py-2"><input type="number" data-stock="${key}" data-field="target" value="${
      data.target
    }" class="w-full styled-input p-1 text-right" min="0" max="100" step="0.01"></td>
      <td class="px-2 py-2"><input type="number" data-stock="${key}" data-field="currentValue" value="${Number(
      currentValue
    ).toFixed(
      2
    )}" class="w-full styled-input p-1 text-right" min="0" step="0.01"></td>
      <td class="px-2 py-2"><input type="number" data-stock="${key}" data-field="currentPercent" value="${data.currentPercent.toFixed(
      2
    )}" class="w-full styled-input p-1 text-right" min="0" max="100" step="0.01" readonly></td>
      <td class="px-2 py-3 text-right font-bold" id="rebalance-${key}">-</td>
    `;
    rebalanceInputsEl.appendChild(row);
  });
  // Chỉ updatePortfolioMetrics khi input thay đổi, KHÔNG lưu vào localStorage ở đây
  document
    .querySelectorAll(
      "#rebalanceInputs input[data-field='target'], #rebalanceInputs input[data-field='currentValue']"
    )
    .forEach((input) => {
      input.addEventListener("input", function (e) {
        updatePortfolioMetrics();
      });
    });

  // Gắn sự kiện lưu currentValue vào localStorage khi bấm nút Update Target %
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

// --- CẬP NHẬT BIỂU ĐỒ VÀ MỌI CHỈ SỐ ---
function updatePortfolioMetrics() {
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

  // 1. GATHER DATA & CALCULATE
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

    const target = parseFloat(targetEl.value) || 0;
    const currentValue = parseFloat(currentValueEl.value) || 0;

    currentDataMap[key] = {
      target,
      currentValue,
      currentPercent: 0, // sẽ cập nhật sau
    };

    totalTarget += target;
    totalCurrentValue += currentValue;
  });

  // 2. Tính lại Current % cho từng dòng: luôn là currentValue / tổng currentValue
  assetKeys.forEach((key) => {
    const currentValue = currentDataMap[key].currentValue;
    let percent = 0;
    if (totalCurrentValue > 0) {
      percent = (currentValue / totalCurrentValue) * 100;
    }
    currentDataMap[key].currentPercent = percent;
    // Gán lại vào input readonly
    const currentPercentEl = document.querySelector(
      `input[data-stock="${key}"][data-field="currentPercent"]`
    );
    if (currentPercentEl) {
      currentPercentEl.value = percent.toFixed(2);
    }
    totalCurrentPercent += percent;
  });

  // 3. Tính Buy/Sell để sau khi thực hiện, Current % sẽ bằng Target %
  let rebalanceMap = {};
  let totalBuySell = 0;
  assetKeys.forEach((key) => {
    const target = currentDataMap[key].target;
    const idealValue = (target / 100) * totalCurrentValue;
    const currentValue = currentDataMap[key].currentValue;
    const buySell = idealValue - currentValue;
    rebalanceMap[key] = buySell;
    totalBuySell += buySell;
  });
  // Phân bổ lại số dư nhỏ do làm tròn
  if (Math.abs(totalBuySell) > 0.01) {
    let maxKey = assetKeys.reduce((a, b) =>
      Math.abs(rebalanceMap[a]) > Math.abs(rebalanceMap[b]) ? a : b
    );
    rebalanceMap[maxKey] -= totalBuySell;
  }

  // Hiển thị Buy/Sell và kết quả
  let totalRebalance = 0;
  assetKeys.forEach((key) => {
    const buySell = rebalanceMap[key];
    let actionClass = "neutral";
    let actionText = formatCurrency(0);
    const deviationPercent =
      currentDataMap[key].target - currentDataMap[key].currentPercent;

    if (Math.abs(buySell) > 0.01) {
      isRebalancingNeeded = true;
      if (buySell > 0) {
        actionClass = "profit";
        actionText = formatCurrency(buySell);
        buyResults.push({
          deviation: deviationPercent,
          html: createRebalanceResult(
            key,
            deviationPercent,
            buySell,
            "BUY",
            currentDataMap
          )
        });
      } else {
        actionClass = "loss";
        actionText = formatCurrency(buySell);
        sellResults.push({
          deviation: deviationPercent,
          html: createRebalanceResult(
            key,
            deviationPercent,
            Math.abs(buySell),
            "SELL",
            currentDataMap
          )
        });
      }
    } else {
      actionText = formatCurrency(0);
      actionClass = "text-gray-500 dark:text-gray-400";
    }
    document.getElementById(
      `rebalance-${key}`
    ).innerHTML = `<span class=\"${actionClass}\">${actionText}</span>`;
    chartData.push(currentDataMap[key].currentPercent);
    chartLabels.push(
      `${key} (${currentDataMap[key].currentPercent.toFixed(1)}%)`
    );
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

  // 4. UPDATE TOTALS ROW
  document.getElementById("totalTarget").textContent =
    formatPercent(totalTarget);
  document.getElementById("totalCurrentValue").textContent =
    formatCurrency(totalCurrentValue);
  document.getElementById("totalCurrentPercent").textContent =
    formatPercent(totalCurrentPercent);

  // Tổng Buy/Sell để màu trắng (không class)
  document.getElementById(
    "totalRebalance"
  ).innerHTML = `<span style=\"color:#fff;\">${formatCurrency(
    totalRebalance
  )}</span>`;

  // 5. UPDATE OTHER UI ELEMENTS
  document.getElementById("currentTotalValueDisplay").textContent =
    formatCurrency(totalCurrentValue);
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

  // Keep Section 4 stock tab labels in sync with 6A Target % inputs
  if (typeof updateStockTabsLabels === "function") {
    updateStockTabsLabels();
  }
  if (typeof refreshActiveStockDetails === "function") {
    refreshActiveStockDetails();
  }
  if (typeof updateAllocationAIReview === "function") {
    updateAllocationAIReview();
  }

  // 6. DISPLAY REBALANCE RESULTS (Section 6A)
  const rebalanceResultsEl = document.getElementById("rebalanceResults");
  if (
    isRebalancingNeeded &&
    Math.abs(totalCurrentPercent - 100) < 0.1 &&
    Math.abs(totalTarget - 100) < 0.1
  ) {
    rebalanceResultsEl.innerHTML = `<h4 class="text-xl font-bold text-red-600 dark:text-red-400 mb-2">⚠ REBALANCE NEEDED ($):</h4>${resultsHTML}`;
  } else if (
    Math.abs(totalCurrentPercent - 100) > 0.1 ||
    Math.abs(totalTarget - 100) > 0.1
  ) {
    rebalanceResultsEl.innerHTML = `<p class="text-center text-xl font-bold text-red-600 dark:text-red-400">⚠ Error: Total Current % (${totalCurrentPercent.toFixed(
      1
    )}%) or Target % (${totalTarget.toFixed(
      1
    )}%) is not 100%. Please check input data.</p>`;
  } else {
    rebalanceResultsEl.innerHTML = `<h4 class="text-xl font-bold text-green-600 dark:text-green-400 mb-2">✅ Portfolio is within safe tolerance (±${REBALANCE_THRESHOLD}%).</h4>`;
  }

  // Also update the 6B input rows whenever 6A changes (do NOT auto-calculate)
  if (typeof initializeDepositAllocationInputs === "function") {
    setTimeout(() => initializeDepositAllocationInputs(), 50);
  }
  if (typeof recalculateDepositRebalance === "function") {
    setTimeout(() => recalculateDepositRebalance(), 60);
  }
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
        const wrapperRect = btn
          .closest(".metric-dropdown-wrapper")
          ?.getBoundingClientRect();
        const dropdownRect = target.getBoundingClientRect();
        const viewportWidth =
          window.innerWidth || document.documentElement.clientWidth || 0;
        if (wrapperRect && dropdownRect.right > viewportWidth - 16) {
          target.style.left = "auto";
          target.style.right = "0";
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


