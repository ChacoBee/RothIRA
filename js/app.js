const REBALANCE_CLOCK_STORAGE_KEY = "hangar.rebalanceClock.v1";
const DEFAULT_REBALANCE_CLOCK_STATE = {
  targetMonth: 1,
  targetDay: 1,
  bufferDays: 3,
  lastCompletedISO: null,
  checklist: {},
};
const REBALANCE_CHECKLIST_TASKS = [
  {
    id: "syncSheet",
    label: "Sync the Google Sheet and refresh live prices.",
  },
  {
    id: "reviewTargets",
    label: "Review Target % and update them if the strategy changed.",
  },
  {
    id: "runRebalance",
    label: "Run modules 6A + 6B to determine buy/sell orders.",
  },
  {
    id: "documentResult",
    label: "Document results and capture the dashboard for records.",
  },
];

let rebalanceClockState = null;
let rebalanceCountdownTimer = null;

// --- Initialization ---
window.addEventListener("DOMContentLoaded", () => {
  // Kick off real market data hydration without blocking the UI thread
  const dataLoadPromise = initializeData();
  if (dataLoadPromise && typeof dataLoadPromise.catch === "function") {
    dataLoadPromise.catch((error) => {
      console.error("initializeData failed:", error);
    });
  }

  loadTheme();
  // Restore any saved Target % values from previous sessions
  loadTargetsFromLocalStorage();
  initializeRebalanceInputs(); // Setup 6A inputs
  initializeRebalanceControlPanel(); // Advanced controls for 6A
  initializeDepositAllocationInputs(); // Setup 6B inputs
  initializeDepositRebalanceHelper(); // Setup 6C inputs
  initializeStockTabs();

  if (window.TradingViewLoader) {
    const chartSection = document.getElementById("chart-section");
    const requestTradingView = () => {
      TradingViewLoader.requestRender();
    };

    if (chartSection && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries, entryObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entryObserver.disconnect();
              requestTradingView();
            }
          });
        },
        {
          rootMargin: "200px 0px",
          threshold: 0.1,
        }
      );
      observer.observe(chartSection);
    } else {
      requestTradingView();
    }
  }

  document.addEventListener("livePriceSheetUpdated", (event) => {
    if (typeof applyLiveDataToRebalance === "function") {
      applyLiveDataToRebalance(event?.detail?.rows || null);
    }
  });
  if (window.livePriceSheetData && typeof applyLiveDataToRebalance === "function") {
    applyLiveDataToRebalance(window.livePriceSheetData.rows || null);
  }

  document.getElementById("simForm").addEventListener("submit", (e) => {
    e.preventDefault();
    runSimulation();
  });

  document
    .getElementById("calculateRebalanceBtn")
    .addEventListener("click", updatePortfolioMetrics);
  // When user explicitly clicks Calculate Rebalance, save the current Target % to localStorage
  document
    .getElementById("calculateRebalanceBtn")
    .addEventListener("click", () => {
      // Small timeout to allow updatePortfolioMetrics to finish DOM updates first
      setTimeout(() => {
        saveTargetsToLocalStorage();
      }, 50);
    });
  document
    .getElementById("themeToggleBtn")
    .addEventListener("click", toggleTheme);

  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (scrollToTopBtn) {
    const toggleScrollBtnVisibility = () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleScrollBtnVisibility);
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    toggleScrollBtnVisibility();
  }

  const sidebarLinks = Array.from(document.querySelectorAll(".app-sidebar__link"));
  if (sidebarLinks.length) {
    const sidebarList = document.querySelector(".app-sidebar__list");
    let sidebarHighlight = null;

    if (sidebarList) {
      sidebarHighlight = document.createElement("div");
      sidebarHighlight.className = "app-sidebar__highlight";
      sidebarList.appendChild(sidebarHighlight);
    }

    const observedSections = [];
    const linkBySectionId = new Map();
    let activeSidebarLink = null;

    const moveHighlightToLink = (link) => {
      if (!sidebarHighlight || !sidebarList || !link) return;

      const listRect = sidebarList.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const offsetTop = linkRect.top - listRect.top + (sidebarList.scrollTop || 0);
      const offsetLeft =
        linkRect.left - listRect.left + (sidebarList.scrollLeft || 0);

      const applyPosition = () => {
        sidebarHighlight.style.transform = `translate3d(${offsetLeft}px, ${offsetTop}px, 0)`;
        sidebarHighlight.style.width = `${linkRect.width}px`;
        sidebarHighlight.style.height = `${linkRect.height}px`;
      };

      if (!sidebarHighlight.classList.contains("visible")) {
        sidebarHighlight.style.transition = "none";
        applyPosition();
        requestAnimationFrame(() => {
          sidebarHighlight.style.transition = "";
          sidebarHighlight.classList.add("visible");
        });
      } else {
        applyPosition();
      }
    };

    const setActiveSidebarLink = (link) => {
      if (!link) return;

      if (link !== activeSidebarLink) {
        if (activeSidebarLink) {
          activeSidebarLink.classList.remove("active");
        }
        link.classList.add("active");
        activeSidebarLink = link;
      } else if (!link.classList.contains("active")) {
        link.classList.add("active");
      }

      moveHighlightToLink(link);
    };

    sidebarLinks.forEach((link) => {
      const targetHash = link.getAttribute("href") || "";
      if (!targetHash.startsWith("#")) return;
      const sectionId = targetHash.slice(1);
      if (!sectionId) return;
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return;
      observedSections.push(sectionEl);
      linkBySectionId.set(sectionEl.id, link);
    });

    const resolveLinkForHash = (hash) => {
      if (!hash || !hash.startsWith("#")) return null;
      const sectionId = hash.slice(1);
      return linkBySectionId.get(sectionId) || null;
    };

    const findSectionNearestViewportTop = () => {
      const viewportHeight =
        window.innerHeight || document.documentElement.clientHeight || 0;
      let nearestSection = null;
      let smallestOffset = Number.POSITIVE_INFINITY;

      observedSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= viewportHeight) return;
        const offset = Math.abs(rect.top);
        if (offset < smallestOffset) {
          nearestSection = section;
          smallestOffset = offset;
        }
      });

      return nearestSection;
    };

    const syncSidebarToViewport = (preferHash = true) => {
      if (preferHash) {
        const hashLink = resolveLinkForHash(window.location.hash);
        if (hashLink) {
          setActiveSidebarLink(hashLink);
          return;
        }
      }

      const inView = findSectionNearestViewportTop();
      if (inView) {
        const link = linkBySectionId.get(inView.id);
        if (link) {
          setActiveSidebarLink(link);
          return;
        }
      }

      const fallbackSection = observedSections[0];
      if (fallbackSection) {
        const fallbackLink = linkBySectionId.get(fallbackSection.id);
        if (fallbackLink) {
          setActiveSidebarLink(fallbackLink);
        }
      }
    };

    let scrollSyncScheduled = false;
    const scheduleSidebarSync = (preferHash = false) => {
      if (scrollSyncScheduled) return;
      scrollSyncScheduled = true;
      requestAnimationFrame(() => {
        syncSidebarToViewport(preferHash);
        scrollSyncScheduled = false;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
          .forEach((entry) => {
            const link = linkBySectionId.get(entry.target.id);
            if (link) {
              setActiveSidebarLink(link);
            }
          });
      },
      {
        root: null,
        threshold: [0.3, 0.6],
        rootMargin: "0px 0px -35%",
      }
    );

    observedSections.forEach((section) => observer.observe(section));

    sidebarLinks.forEach((link) => {
      link.addEventListener("click", () => {
        setActiveSidebarLink(link);
      });
    });

    requestAnimationFrame(() => {
      syncSidebarToViewport(true);
    });

    window.addEventListener("scroll", () => scheduleSidebarSync(false));
    window.addEventListener("resize", () => scheduleSidebarSync(false));

    window.addEventListener("hashchange", () => {
      scheduleSidebarSync(true);
    });
  }

  const autoRevealSelectors = [
    ".hero",
    ".section",
    ".card",
    ".market-index-card",
    ".heatmap-filter-btn",
    ".app-sidebar__link",
    ".heatmap-widget-shell",
  ];

  const revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
              }
            });
          },
          {
            threshold: 0.15,
            rootMargin: "0px 0px -12%",
          }
        )
      : null;

  const observeRevealTarget = (el) => {
    if (!el || !(el instanceof Element)) return;
    if (!el.classList.contains("reveal-on-scroll")) {
      el.classList.add("reveal-on-scroll");
    }
    if (el.classList.contains("is-visible")) {
      if (revealObserver) {
        revealObserver.unobserve(el);
      }
      return;
    }
    if (revealObserver) {
      revealObserver.observe(el);
    } else {
      el.classList.add("is-visible");
    }
  };

  const registerRevealTargets = (root = document) => {
    if (!root) return;

    const processElement = (element) => {
      observeRevealTarget(element);
    };

    autoRevealSelectors.forEach((selector) => {
      if (root instanceof Element && root.matches(selector)) {
        processElement(root);
      }
      root.querySelectorAll(selector).forEach(processElement);
    });
  };

  requestAnimationFrame(() => {
    registerRevealTargets();
  });

  window.reapplyRevealTransitions = (scope) => {
    if (scope instanceof Element) {
      registerRevealTargets(scope);
    } else {
      registerRevealTargets(document);
    }
  };

  if ("MutationObserver" in window) {
    const revealMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            registerRevealTargets(node);
          }
        });
      });
    });
    revealMutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Do not auto-calculate on deposit input changes. Calculation only runs on button click.

  // Lightweight sanitizer for #initial: remove non-digits except the first dot; do not force two decimals
  function sanitizeInitialInput(e) {
    const el = e.target || e;
    if (!el) return;
    let s = (el.value || "") + "";
    s = s.replace(/[,\s]/g, "");
    // Keep digits and dots, but only the first dot
    s = s.replace(/[^0-9.]/g, "");
    const parts = s.split(".");
    if (parts.length > 1) {
      s = parts.shift() + "." + parts.join("");
    }
    if (el.value !== s) el.value = s;
  }

  const initialElSan = document.getElementById("initial");
  if (initialElSan) {
    initialElSan.addEventListener("input", sanitizeInitialInput);
  }

  initializeAlphaVantageKeyForm();
  initializeRebalanceClockPanel();
  updatePortfolioMetrics();
  updateStockDetails("VOO"); // Load VOO details and set VOO as default chart
  runSimulation();

  // Auto-populate rebalance table on load
  populateRebalanceTable();

  // Update risk level bar after initial load
  updateRiskLevelBar();
});

// Update risk level bar based on risk level text
function updateRiskLevelBar() {
  const riskLevelEl = document.getElementById('riskLevel');
  const riskLevelBar = document.getElementById('riskLevelBar');

  if (riskLevelEl && riskLevelBar) {
    const riskText = riskLevelEl.textContent.trim().toLowerCase();
    let width = '50%'; // default

    if (riskText === 'low') {
      width = '25%';
    } else if (riskText === 'medium') {
      width = '50%';
    } else if (riskText === 'high') {
      width = '85%';
    }

    riskLevelBar.style.width = width;
  }
}

function initializeAlphaVantageKeyForm() {
  const form = document.getElementById("alphaKeyForm");
  const manager = window.AlphaVantageKeyManager;
  if (!form || !manager) {
    return;
  }

  const input = document.getElementById("alphaKeyInput");
  const statusEl = document.getElementById("alphaKeyStatus");
  const badgeEl = document.getElementById("alphaKeyStatusBadge");
  const clearBtn = document.getElementById("alphaKeyClearBtn");
  const toggleBtn = document.getElementById("alphaKeyToggleBtn");

  if (!input || !statusEl || !badgeEl) {
    return;
  }

  const demoBadgeClasses = ["bg-slate-100", "dark:bg-slate-900", "text-slate-600", "dark:text-slate-300"];
  const customBadgeClasses = ["bg-emerald-500/15", "dark:bg-emerald-500/10", "text-emerald-700", "dark:text-emerald-200"];
  let revealKey = false;

  const showKeyFeedback = (message, state = "success") => {
    if (typeof window.showActionFeedback === "function") {
      window.showActionFeedback(message, { state, autoHide: 2600 });
    }
  };

  const refreshBadgeState = (isDemo) => {
    demoBadgeClasses.forEach((cls) => badgeEl.classList.toggle(cls, isDemo));
    customBadgeClasses.forEach((cls) => badgeEl.classList.toggle(cls, !isDemo));
    badgeEl.textContent = isDemo ? "Demo" : "Custom";
  };

  const refreshStatus = () => {
    const isDemo = typeof manager.isDemo === "function" ? manager.isDemo() : false;
    input.value = isDemo ? "" : manager.getKey() || "";
    refreshBadgeState(isDemo);
    statusEl.textContent = isDemo
      ? "No custom key yet - limited to the Alpha Vantage demo feed (IBM, max 5 requests/min)."
      : "Personal key stored locally. All Alpha Vantage calls will use it until you clear it.";
  };

  const refreshVisibility = () => {
    input.type = revealKey ? "text" : "password";
    if (toggleBtn) {
      toggleBtn.textContent = revealKey ? "Hide" : "Show";
    }
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nextKey = (input.value || "").trim();
    if (!nextKey) {
      manager.clearKey();
      refreshStatus();
      refreshVisibility();
      showKeyFeedback("Alpha Vantage key removed. Dashboard reverted to demo mode.", "info");
      return;
    }
    manager.setKey(nextKey);
    refreshStatus();
    refreshVisibility();
    showKeyFeedback("Alpha Vantage key saved for this session.", "success");
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", (event) => {
      event.preventDefault();
      manager.clearKey();
      input.value = "";
      refreshStatus();
      refreshVisibility();
      showKeyFeedback("Alpha Vantage key removed. Dashboard reverted to demo mode.", "info");
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", (event) => {
      event.preventDefault();
      revealKey = !revealKey;
      refreshVisibility();
    });
  }

  window.addEventListener("alpha-vantage-key-changed", () => {
    refreshStatus();
    refreshVisibility();
  });

  refreshStatus();
  refreshVisibility();
}
function initializeRebalanceClockPanel() {
  const countdownPrimary = document.getElementById("rebalanceCountdownPrimary");
  const countdownSecondary = document.getElementById("rebalanceCountdownSecondary");
  const bufferBadge = document.getElementById("rebalanceBufferBadge");
  const progressBar = document.getElementById("rebalanceYearProgress");
  const nextDateLabel = document.getElementById("rebalanceNextDateLabel");
  const lastDoneLabel = document.getElementById("rebalanceLastDoneLabel");
  const scheduleForm = document.getElementById("rebalanceScheduleForm");
  const targetInput = document.getElementById("rebalanceTargetInput");
  const bufferInput = document.getElementById("rebalanceBufferInput");
  const markCompleteBtn = document.getElementById("rebalanceMarkCompleteBtn");
  const checklistContainer = document.getElementById("rebalanceChecklist");
  const resetChecklistBtn = document.getElementById("rebalanceResetChecklistBtn");

  if (
    !countdownPrimary ||
    !countdownSecondary ||
    !bufferBadge ||
    !progressBar ||
    !nextDateLabel ||
    !lastDoneLabel ||
    !scheduleForm ||
    !targetInput ||
    !bufferInput ||
    !markCompleteBtn
  ) {
    return;
  }

  const showFeedback = (message, state = "success") => {
    if (typeof window.showActionFeedback === "function") {
      window.showActionFeedback(message, { state, autoHide: 2600 });
    }
  };

  const loadState = () => {
    if (rebalanceClockState) {
      return rebalanceClockState;
    }
    let stored = null;
    if (typeof localStorage !== "undefined") {
      try {
        const raw = localStorage.getItem(REBALANCE_CLOCK_STORAGE_KEY);
        if (raw) {
          stored = JSON.parse(raw);
        }
      } catch (error) {
        console.warn("Unable to read rebalance clock state from localStorage", error);
      }
    }
    rebalanceClockState = Object.assign({}, DEFAULT_REBALANCE_CLOCK_STATE, stored || {});
    if (!rebalanceClockState.checklist || typeof rebalanceClockState.checklist !== "object") {
      rebalanceClockState.checklist = {};
    }
    return rebalanceClockState;
  };

  const persistState = () => {
    if (typeof localStorage === "undefined") return;
    try {
      localStorage.setItem(REBALANCE_CLOCK_STORAGE_KEY, JSON.stringify(rebalanceClockState));
    } catch (error) {
      console.warn("Unable to persist rebalance clock state", error);
    }
  };

  const formatDateForDisplay = (date) => {
    if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
      return "--";
    }
    return date.toLocaleDateString("vi-VN", {
      weekday: "short",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatRelativeTime = (date) => {
    if (!date) return "Not recorded yet";
    const timestamp = typeof date === "string" ? new Date(date) : date;
    if (Number.isNaN(timestamp.getTime())) return "Not recorded yet";
    return timestamp.toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const computeNextTargetDate = () => {
    const state = loadState();
    const now = new Date();
    let year = now.getFullYear();
    let candidate = new Date(year, (state.targetMonth || 1) - 1, state.targetDay || 1, 9, 0, 0);
    if (candidate <= now) {
      candidate = new Date(year + 1, (state.targetMonth || 1) - 1, state.targetDay || 1, 9, 0, 0);
    }
    return candidate;
  };

  const computeCycleBounds = () => {
    const next = computeNextTargetDate();
    const previous = new Date(next);
    previous.setFullYear(previous.getFullYear() - 1);
    return { next, previous };
  };

  const updateInputsFromState = () => {
    const state = loadState();
    const now = new Date();
    const inputYear = now.getFullYear();
    const targetDate = new Date(inputYear, (state.targetMonth || 1) - 1, state.targetDay || 1);
    if (!Number.isNaN(targetDate.getTime())) {
      const iso = targetDate.toISOString().split("T")[0];
      targetInput.value = iso;
    }
    bufferInput.value = Number.isFinite(state.bufferDays) ? state.bufferDays : 3;
  };

  const renderChecklist = () => {
    if (!checklistContainer) {
      return;
    }
    const state = loadState();
    checklistContainer.innerHTML = "";
    REBALANCE_CHECKLIST_TASKS.forEach((task) => {
      const id = `rebalanceTask-${task.id}`;
      const wrapper = document.createElement("li");
      wrapper.className = "flex items-start gap-3";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "mt-1 h-4 w-4 rounded border-gray-300 text-amber-500 focus:ring-amber-500";
      checkbox.id = id;
      checkbox.dataset.taskId = task.id;
      checkbox.checked = Boolean(state.checklist?.[task.id]);
      const label = document.createElement("label");
      label.setAttribute("for", id);
      label.className = "flex-1 leading-snug";
      label.textContent = task.label;
      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      checklistContainer.appendChild(wrapper);
    });
  };

  const updateCountdownUi = () => {
    const state = loadState();
    const { next, previous } = computeCycleBounds();
    const now = new Date();
    const diffMs = next - now;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    const wholeDays = Math.max(0, Math.floor(diffDays));
    const hours = Math.max(0, Math.floor((diffMs / (1000 * 60 * 60)) % 24));
    if (diffMs <= 0) {
      countdownPrimary.textContent = "Due now";
      countdownSecondary.textContent = "Run the rebalance as soon as possible.";
    } else {
      countdownPrimary.textContent = `${wholeDays} days`;
      countdownSecondary.textContent = `${hours} hours until the window opens`;
    }

    const totalCycleMs = next - previous;
    const elapsedMs = now - previous;
    const progress = Math.max(0, Math.min(1, elapsedMs / totalCycleMs));
    progressBar.style.width = `${(progress * 100).toFixed(1)}%`;

    nextDateLabel.textContent = formatDateForDisplay(next);
    lastDoneLabel.textContent = state.lastCompletedISO ? formatRelativeTime(state.lastCompletedISO) : "Not recorded yet";

    const bufferDays = Number.isFinite(state.bufferDays) ? state.bufferDays : DEFAULT_REBALANCE_CLOCK_STATE.bufferDays;
    bufferBadge.classList.remove(
      "bg-emerald-500/10",
      "border-emerald-400/40",
      "text-emerald-300",
      "bg-amber-500/15",
      "border-amber-400/50",
      "text-amber-400",
      "bg-rose-500/15",
      "border-rose-400/50",
      "text-rose-300"
    );
    if (diffMs <= 0) {
      bufferBadge.classList.add("bg-rose-500/15", "border-rose-400/50", "text-rose-300");
      bufferBadge.textContent = "Overdue";
    } else if (diffDays <= bufferDays) {
      bufferBadge.classList.add("bg-amber-500/15", "border-amber-400/50", "text-amber-400");
      bufferBadge.textContent = "Prep window";
    } else {
      bufferBadge.classList.add("bg-emerald-500/10", "border-emerald-400/40", "text-emerald-300");
      bufferBadge.textContent = "Monitoring";
    }
  };

  const startCountdownInterval = () => {
    if (rebalanceCountdownTimer) {
      clearInterval(rebalanceCountdownTimer);
    }
    updateCountdownUi();
    rebalanceCountdownTimer = window.setInterval(() => {
      updateCountdownUi();
    }, 60000);
  };

  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const dateValue = targetInput.value;
    if (!dateValue) {
      showFeedback("Pick a valid target date before saving.", "error");
      return;
    }
    const parsed = new Date(dateValue);
    if (Number.isNaN(parsed.getTime())) {
      showFeedback("Target date is invalid.", "error");
      return;
    }
    let bufferValue = Number(bufferInput.value);
    if (!Number.isFinite(bufferValue) || bufferValue < 0) {
      bufferValue = DEFAULT_REBALANCE_CLOCK_STATE.bufferDays;
    }
    const state = loadState();
    state.targetMonth = parsed.getMonth() + 1;
    state.targetDay = parsed.getDate();
    state.bufferDays = Math.min(60, Math.round(bufferValue));
    persistState();
    updateCountdownUi();
    showFeedback("Annual rebalance schedule saved.");
  });

  markCompleteBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const state = loadState();
    state.lastCompletedISO = new Date().toISOString();
    state.checklist = {};
    persistState();
    renderChecklist();
    updateCountdownUi();
    showFeedback("Marked complete. Next cycle armed.");
  });

  if (checklistContainer) {
    checklistContainer.addEventListener("change", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") return;
      const taskId = target.dataset.taskId;
      if (!taskId) return;
      const state = loadState();
      if (!state.checklist) state.checklist = {};
      state.checklist[taskId] = target.checked;
      persistState();
    });
  }

  if (resetChecklistBtn) {
    resetChecklistBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const state = loadState();
      state.checklist = {};
      persistState();
      renderChecklist();
      showFeedback("Checklist reset.");
    });
  }

  renderChecklist();
  updateInputsFromState();
  startCountdownInterval();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      startCountdownInterval();
    }
  });
}











