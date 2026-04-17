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

  const calculateRebalanceBtn = document.getElementById("calculateRebalanceBtn");
  if (calculateRebalanceBtn) {
    calculateRebalanceBtn.addEventListener("click", () => {
      window.__lastRebalanceTrigger = "manual";
      updatePortfolioMetrics();
    });
    // When user explicitly clicks Calculate Rebalance, save the current Target % to localStorage
    calculateRebalanceBtn.addEventListener("click", () => {
      // Small timeout to allow updatePortfolioMetrics to finish DOM updates first
      setTimeout(() => {
        saveTargetsToLocalStorage();
      }, 50);
    });
  }
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

  const pageProgressBar = document.getElementById("pageProgressBar");
  if (pageProgressBar) {
    const updatePageProgress = () => {
      const doc = document.documentElement;
      const scrollableHeight = doc.scrollHeight - doc.clientHeight;
      const progress =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, window.scrollY / scrollableHeight))
          : 0;
      pageProgressBar.style.width = `${(progress * 100).toFixed(2)}%`;
    };

    window.addEventListener("scroll", updatePageProgress, { passive: true });
    window.addEventListener("resize", updatePageProgress);
    updatePageProgress();
  }

  const sidebarLinks = Array.from(document.querySelectorAll(".app-sidebar__link"));
  if (sidebarLinks.length) {
    const sidebarList = document.querySelector(".app-sidebar__list");
    const sidebarSearchInput = document.getElementById("sidebarSearchInput");
    const sidebarSearchStatus = document.getElementById("sidebarSearchStatus");
    const sidebarSearchClearBtn = document.getElementById("sidebarSearchClearBtn");
    let sidebarHighlight = null;

    if (sidebarList) {
      sidebarHighlight = document.createElement("div");
      sidebarHighlight.className = "app-sidebar__highlight";
      sidebarList.appendChild(sidebarHighlight);
    }

    const observedSections = [];
    const linkBySectionId = new Map();
    let activeSidebarLink = null;
    const isSidebarLinkVisible = (link) => {
      const item = link ? link.closest("li") : null;
      return Boolean(link && item && !item.classList.contains("app-sidebar__item--hidden"));
    };
    const getVisibleSidebarLinks = () =>
      sidebarLinks.filter((link) => isSidebarLinkVisible(link));
    const pickFirstVisibleSidebarLink = () => {
      const links = getVisibleSidebarLinks();
      return links.length ? links[0] : null;
    };
    const keepSidebarLinkInView = (link) => {
      if (!sidebarList || !link || !isSidebarLinkVisible(link)) return;

      const listRect = sidebarList.getBoundingClientRect();
      const linkRect = link.getBoundingClientRect();
      const edgePadding = 8;

      if (linkRect.top < listRect.top) {
        sidebarList.scrollTop -= listRect.top - linkRect.top + edgePadding;
      } else if (linkRect.bottom > listRect.bottom) {
        sidebarList.scrollTop += linkRect.bottom - listRect.bottom + edgePadding;
      }

      if (linkRect.left < listRect.left) {
        sidebarList.scrollLeft -= listRect.left - linkRect.left + edgePadding;
      } else if (linkRect.right > listRect.right) {
        sidebarList.scrollLeft += linkRect.right - listRect.right + edgePadding;
      }
    };

    const moveHighlightToLink = (link) => {
      if (!sidebarHighlight || !sidebarList || !link || !isSidebarLinkVisible(link)) return;

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
      let nextLink = link;
      if (!nextLink || !isSidebarLinkVisible(nextLink)) {
        nextLink = pickFirstVisibleSidebarLink();
      }
      if (!nextLink) return;

      if (nextLink !== activeSidebarLink) {
        if (activeSidebarLink) {
          activeSidebarLink.classList.remove("active");
          activeSidebarLink.removeAttribute("aria-current");
        }
        nextLink.classList.add("active");
        nextLink.setAttribute("aria-current", "true");
        activeSidebarLink = nextLink;
      } else if (!nextLink.classList.contains("active")) {
        nextLink.classList.add("active");
        nextLink.setAttribute("aria-current", "true");
      }

      keepSidebarLinkInView(nextLink);
      moveHighlightToLink(nextLink);
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
        const sectionLink = linkBySectionId.get(section.id);
        if (!sectionLink || !isSidebarLinkVisible(sectionLink)) return;
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

    const applySidebarFilter = (rawTerm = "") => {
      const term = String(rawTerm || "").trim().toLowerCase();
      let visibleCount = 0;

      sidebarLinks.forEach((link) => {
        const item = link.closest("li");
        if (!item) return;
        const label = (link.textContent || "").toLowerCase();
        const matches = !term || label.includes(term);
        item.classList.toggle("app-sidebar__item--hidden", !matches);
        if (matches) {
          visibleCount += 1;
        }
      });

      if (sidebarSearchStatus) {
        if (!term) {
          sidebarSearchStatus.textContent = "Showing all sections";
        } else if (visibleCount === 0) {
          sidebarSearchStatus.textContent = `No matches for "${term}"`;
        } else {
          sidebarSearchStatus.textContent = `${visibleCount} section${visibleCount === 1 ? "" : "s"} matched`;
        }
      }

      if (visibleCount === 0 && sidebarHighlight) {
        sidebarHighlight.classList.remove("visible");
      }

      if (!activeSidebarLink || !isSidebarLinkVisible(activeSidebarLink)) {
        setActiveSidebarLink(pickFirstVisibleSidebarLink());
      } else {
        moveHighlightToLink(activeSidebarLink);
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

    if (sidebarSearchInput) {
      sidebarSearchInput.addEventListener("input", () => {
        applySidebarFilter(sidebarSearchInput.value);
      });
    }
    if (sidebarSearchClearBtn) {
      sidebarSearchClearBtn.addEventListener("click", () => {
        if (sidebarSearchInput) {
          sidebarSearchInput.value = "";
          sidebarSearchInput.focus();
        }
        applySidebarFilter("");
      });
    }

    document.addEventListener("keydown", (event) => {
      if (!sidebarSearchInput) return;
      if (event.defaultPrevented) return;

      const target = event.target;
      const targetTag = target && target.tagName ? target.tagName.toLowerCase() : "";
      const isTypingContext =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        targetTag === "select" ||
        (target instanceof HTMLElement && target.isContentEditable);

      if (
        event.key === "/" &&
        !isTypingContext &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey
      ) {
        event.preventDefault();
        sidebarSearchInput.focus();
        sidebarSearchInput.select();
      } else if (event.key === "Escape" && document.activeElement === sidebarSearchInput) {
        sidebarSearchInput.value = "";
        applySidebarFilter("");
        sidebarSearchInput.blur();
      }
    });

    requestAnimationFrame(() => {
      applySidebarFilter(sidebarSearchInput ? sidebarSearchInput.value : "");
      syncSidebarToViewport(true);
    });

    window.addEventListener("scroll", () => scheduleSidebarSync(false), {
      passive: true,
    });
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

  updatePortfolioMetrics();
  updateStockDetails("VOO"); // Load VOO details and set VOO as default chart
  runSimulation();

  // Prime deposit rebalance helper without crashing if optional APIs are unavailable
  if (typeof recalculateDepositRebalance === "function") {
    recalculateDepositRebalance();
  }

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


