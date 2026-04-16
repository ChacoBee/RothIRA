// --- SECTION 4: ASSET DETAILS WITH TABS ---

function initializeStockTabs() {
  const stockTabsContainer = document.getElementById("stockTabs");
  stockTabsContainer.innerHTML = "";

  assetKeys.forEach((key) => {
    // Read the latest target from 6A inputs for the button label
    const targetEl = document.querySelector(
      `input[data-stock="${key}"][data-field="target"]`
    );
    const targetPercent =
      parseFloat(
        targetEl ? targetEl.value : initialStockData[key].target
      ) || initialStockData[key].target;

    const tabButton = document.createElement("button");
    tabButton.dataset.stock = key;
    tabButton.classList.add(
      "tab-btn",
      "text-sm",
      "md:text-base",
      "font-medium",
      "py-2",
      "px-4",
      "rounded-full",
      "transition",
      "duration-300",
      "ease-in-out",
      "hover:bg-green-100",
      "dark:hover:bg-green-700",
      "text-gray-700",
      "dark:text-gray-300",
      "bg-gray-50",
      "dark:bg-slate-700"
    );
    tabButton.textContent = `${key} (${targetPercent.toFixed(1)}%)`;
    stockTabsContainer.appendChild(tabButton);
  });

  document.getElementById("stockTabs").addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button && button.dataset.stock) {
      updateStockDetails(button.dataset.stock);
    }
  });
}

function getStockAllocationSnapshot(stockKey) {
  const targetEl = document.querySelector(
    `input[data-stock="${stockKey}"][data-field="target"]`
  );
  const currentValueEl = document.querySelector(
    `input[data-stock="${stockKey}"][data-field="currentValue"]`
  );
  const currentPercentEl = document.querySelector(
    `input[data-stock="${stockKey}"][data-field="currentPercent"]`
  );

  const targetPercent =
    parseFloat(targetEl ? targetEl.value : initialStockData[stockKey].target) ||
    initialStockData[stockKey].target ||
    0;

  const currentValue =
    parseFloat(
      currentValueEl ? currentValueEl.value : initialStockData[stockKey].currentValue
    ) || 0;

  let currentPercent =
    parseFloat(currentPercentEl ? currentPercentEl.value : initialStockData[stockKey].currentPercent) ||
    0;

  if (!currentPercent) {
    const totalCurrent = assetKeys.reduce((sum, key) => {
      const valEl = document.querySelector(
        `input[data-stock="${key}"][data-field="currentValue"]`
      );
      const val =
        parseFloat(valEl ? valEl.value : initialStockData[key].currentValue) || 0;
      return sum + val;
    }, 0);
    currentPercent = totalCurrent > 0 ? (currentValue / totalCurrent) * 100 : 0;
  }

  return {
    targetPercent,
    currentValue,
    currentPercent,
  };
}

// Update only the labels of the stock tabs to reflect the latest Target % from 6A
function updateStockTabsLabels() {
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    const key = btn.dataset.stock;
    if (!key) return;
    const targetEl = document.querySelector(
      `input[data-stock="${key}"][data-field="target"]`
    );
    const targetPercent =
      parseFloat(
        targetEl ? targetEl.value : initialStockData[key].target
      ) || initialStockData[key].target;
    btn.textContent = `${key} (${targetPercent.toFixed(1)}%)`;
  });
}

function updateStockDetails(stockKey) {
  const { targetPercent, currentValue, currentPercent } =
    getStockAllocationSnapshot(stockKey);

  const detailContent = stockDetailsContent[stockKey];
  const stockDetailContentEl =
    document.getElementById("stockDetailContent");

  // Create mini chart container
  const theme = isDarkMode ? "dark" : "light";
  const symbolToLoad = getTradingViewSymbol(stockKey);

  // Show loading state
  stockDetailContentEl.innerHTML = `
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
        <p class="text-gray-500 dark:text-gray-400">Loading ${stockKey} analysis...</p>
      </div>
    </div>
  `;

  // Update tab styles immediately
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active", "bg-green-600", "text-white", "shadow-lg", "transform", "scale-105");
    btn.classList.add(
      "bg-gray-50",
      "dark:bg-slate-700",
      "text-gray-700",
      "dark:text-gray-300",
      "hover:bg-gray-100",
      "dark:hover:bg-slate-600",
      "transition-all",
      "duration-300"
    );
    if (btn.dataset.stock === stockKey) {
      btn.classList.add("active", "bg-green-600", "text-white", "shadow-lg", "transform", "scale-105");
      btn.classList.remove(
        "bg-gray-50",
        "dark:bg-slate-700",
        "text-gray-700",
        "dark:text-gray-300",
        "hover:bg-gray-100",
        "dark:hover:bg-slate-600"
      );
    }
  });

  // Simulate loading delay for better UX
  setTimeout(() => {
    stockDetailContentEl.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
        <!-- Left: Analysis Content -->
        <div class="space-y-6">
          <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800">
            <h3 class="text-2xl font-bold text-green-600 dark:text-green-400 mb-4 flex items-center gap-3">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
              ${stockKey} Analysis
            </h3>
            <p class="text-base text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">${detailContent.desc}</p>
            <div class="grid grid-cols-1 gap-4">
              <div class="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border border-green-200 dark:border-green-700 hover:shadow-md transition-shadow duration-300">
                <h4 class="text-lg font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Advantages (Pros) & Role
                </h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">${detailContent.pros}</p>
              </div>
              <div class="bg-white/70 dark:bg-gray-800/70 rounded-lg p-4 border border-red-200 dark:border-red-700 hover:shadow-md transition-shadow duration-300">
                <h4 class="text-lg font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
                </svg>
                Challenges (Cons) & Risks
              </h4>
                <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">${detailContent.cons}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Key Metrics -->
        <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div class="p-4 border-b border-gray-200 dark:border-gray-700">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              Key Metrics
            </h4>
          </div>
          <div class="p-6 space-y-6">
            <!-- Target Allocation -->
            <div class="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-700">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Target Allocation</span>
                <span class="text-lg font-bold text-green-600 dark:text-green-400">${targetPercent.toFixed(1)}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div class="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full transition-all duration-1000" style="width: ${Math.max(0, Math.min(100, targetPercent))}%"></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Current weight: ${currentPercent.toFixed(1)}% (${(currentPercent - targetPercent >= 0 ? '+' : '') + (currentPercent - targetPercent).toFixed(1)}% vs target)</p>
            </div>

            <!-- Current Allocation -->
            <div class="bg-gradient-to-r from-sky-50 to-sky-100 dark:from-sky-900/20 dark:to-sky-800/20 rounded-lg p-4 border border-sky-200 dark:border-sky-700">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Current Allocation</span>
                <span class="text-lg font-bold text-sky-600 dark:text-sky-400">${currentPercent.toFixed(1)}%</span>
              </div>
              <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                <div class="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all duration-1000" style="width: ${Math.max(0, Math.min(100, currentPercent))}%"></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400">Delta vs target: ${(currentPercent - targetPercent >= 0 ? '+' : '') + (currentPercent - targetPercent).toFixed(1)}%</p>
            </div>

            <!-- Current Value -->
            <div class="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Current Value</span>
                <span class="text-lg font-bold text-blue-600 dark:text-blue-400">${formatCurrency(currentValue)}</span>
              </div>
            </div>

            <!-- Expected Return -->
            <div class="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-700">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Expected Return</span>
                <span class="text-lg font-bold text-purple-600 dark:text-purple-400">${(expectedReturns[stockKey] * 100).toFixed(1)}%</span>
              </div>
            </div>

            <!-- Volatility -->
            <div class="bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-700">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Volatility</span>
                <span class="text-lg font-bold text-orange-600 dark:text-orange-400">${(volatilities[stockKey] * 100).toFixed(1)}%</span>
              </div>
            </div>

            <!-- Sharpe Ratio -->
            <div class="bg-gradient-to-r from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 rounded-lg p-4 border border-teal-200 dark:border-teal-700">
              <div class="flex justify-between items-center">
                <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Sharpe Ratio</span>
                <span class="text-lg font-bold text-teal-600 dark:text-teal-400">${(expectedReturns[stockKey] / volatilities[stockKey]).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }, 500);

  // Also update the main chart in section 3
  if (window.TradingViewLoader) {
    TradingViewLoader.setDesiredRender(symbolToLoad, theme);
    TradingViewLoader.requestRender();
  } else {
    createTradingViewWidget(symbolToLoad, theme);
  }
}

function refreshActiveStockDetails() {
  const activeBtn = document.querySelector(".tab-btn.active");
  if (activeBtn && activeBtn.dataset.stock) {
    updateStockDetails(activeBtn.dataset.stock);
  }
}
