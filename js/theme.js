// --- THEME TOGGLE LOGIC ---
function toggleTheme() {
  const htmlEl = document.documentElement;
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");

  if (htmlEl.classList.contains("dark-mode")) {
    htmlEl.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
    isDarkMode = false;
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  } else {
    htmlEl.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
    isDarkMode = true;
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }

  // Update charts and UI colors
  updatePortfolioMetrics();
  runSimulation();

  // Re-render TradingView widget with the correct theme
  const activeTab = document.querySelector(".tab-btn.active");
  const currentStockKey = activeTab ? activeTab.dataset.stock : "VOO";
  const currentSymbol = getTradingViewSymbol(currentStockKey);
  if (window.TradingViewLoader) {
    TradingViewLoader.setDesiredRender(
      currentSymbol,
      isDarkMode ? "dark" : "light"
    );
    if (TradingViewLoader.hasLoaded()) {
      TradingViewLoader.requestRender();
    }
  } else {
    createTradingViewWidget(currentSymbol, isDarkMode ? "dark" : "light");
  }

  // Re-render the active stock details tab for styling
  if (activeTab) updateStockDetails(currentStockKey);

  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { isDarkMode } })
  );
}

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add("dark-mode");
    isDarkMode = true;
    document.getElementById("moonIcon").classList.add("hidden");
    document.getElementById("sunIcon").classList.remove("hidden");
  } else {
    isDarkMode = false;
    document.getElementById("moonIcon").classList.remove("hidden");
    document.getElementById("sunIcon").classList.add("hidden");
  }

  // Initialize the full TradingView widget immediately with the correct theme
  const initialSymbol = getTradingViewSymbol("VOO");
  if (window.TradingViewLoader) {
    TradingViewLoader.setDesiredRender(
      initialSymbol,
      isDarkMode ? "dark" : "light"
    );
  } else {
    createTradingViewWidget(initialSymbol, isDarkMode ? "dark" : "light");
  }

  window.dispatchEvent(
    new CustomEvent("themechange", { detail: { isDarkMode } })
  );
}
