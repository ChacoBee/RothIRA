// --- THEME TOGGLE LOGIC ---
function updateThemeToggleA11yState(isDark) {
  const toggleBtn = document.getElementById("themeToggleBtn");
  if (!toggleBtn) {
    return;
  }
  toggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
  toggleBtn.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
}

function syncDocumentTheme(mode) {
  const isDark = mode === "dark";

  if (typeof window.__syncDocumentThemeClasses === "function") {
    window.__syncDocumentThemeClasses(isDark ? "dark" : "light");
    return isDark;
  }

  const htmlEl = document.documentElement;
  htmlEl.classList.toggle("dark-mode", isDark);
  htmlEl.classList.toggle("dark", isDark);
  htmlEl.style.colorScheme = isDark ? "dark" : "light";
  return isDark;
}

function toggleTheme() {
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");

  if (document.documentElement.classList.contains("dark-mode")) {
    isDarkMode = syncDocumentTheme("light");
    try {
      localStorage.setItem("theme", "light");
    } catch (_) {
      /* Ignore storage errors */
    }
    moonIcon.classList.remove("hidden");
    sunIcon.classList.add("hidden");
  } else {
    isDarkMode = syncDocumentTheme("dark");
    try {
      localStorage.setItem("theme", "dark");
    } catch (_) {
      /* Ignore storage errors */
    }
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
  }

  updateThemeToggleA11yState(isDarkMode);

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
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("theme");
  } catch (_) {
    savedTheme = null;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    isDarkMode = syncDocumentTheme("dark");
    document.getElementById("moonIcon").classList.add("hidden");
    document.getElementById("sunIcon").classList.remove("hidden");
  } else {
    isDarkMode = syncDocumentTheme("light");
    document.getElementById("moonIcon").classList.remove("hidden");
    document.getElementById("sunIcon").classList.add("hidden");
  }

  updateThemeToggleA11yState(isDarkMode);

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
