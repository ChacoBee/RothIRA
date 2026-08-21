(() => {
  const LOG_STORAGE_KEY = "hangar.activityLog.v1";
  const MAX_LOG_ITEMS = 20;
  const SCENARIO_STORAGE_KEY = "hangar.scenarioSandbox.v1";
  const CASH_PREF_KEY = "hangar.cashPrefs.v1";
  const ACCOUNT_LABELS = {
    accountTagRoth: "Roth IRA",
    accountTagTaxable: "Brokerage",
    accountTagCash: "Cash bucket",
  };
  const EVENT_MAP = {
    rebalance: { label: "Guardrail scan", icon: "🎯", iconClass: "ops-log-icon--rebalance" },
    depositAllocation: { label: "Deposit allocation", icon: "📦", iconClass: "ops-log-icon--deposit" },
    depositRebalance: { label: "Deposit helper", icon: "⚙️", iconClass: "ops-log-icon--helper" },
    liveRefresh: { label: "Live sheet refresh", icon: "🛰️", iconClass: "ops-log-icon--refresh" },
  };

  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const detailedCurrencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const percentFormatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", callback, { once: true });
    } else {
      callback();
    }
  };

  ready(() => {
    initActivityLog();
    initScenarioSandbox();
    initCashRunway();
  });

  /* -------------------------------------------------------------------------- */
  /*                               Activity Log                                 */
  /* -------------------------------------------------------------------------- */
  function initActivityLog() {
    const listEl = document.getElementById("logisticsActivityList");
    const statusEl = document.getElementById("logisticsActivityStatus");
    const hintEl = document.getElementById("activityLogHint");
    const clearBtn = document.getElementById("activityLogClearBtn");
    const exportBtn = document.getElementById("activityLogExportBtn");
    if (!listEl) return;

    let entries = loadActivityEntries();

    const saveEntries = () => {
      try {
        localStorage.setItem(LOG_STORAGE_KEY, JSON.stringify(entries));
      } catch (error) {
        console.warn("Unable to persist activity log", error);
      }
    };

    const updateStatus = () => {
      if (entries.length && statusEl) {
        const last = entries[0];
        statusEl.textContent = `Last action ${formatRelativeTime(last.timestamp)} (${new Date(
          last.timestamp
        ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })})`;
      } else if (statusEl) {
        statusEl.textContent = "Waiting for actions";
      }
      if (hintEl) {
        hintEl.textContent =
          entries.length > 0
            ? `${entries.length} events logged in this session.`
            : "Feed tracks refreshes, guardrail scans, deposits, and helper runs.";
      }
    };

    const render = () => {
      listEl.innerHTML = "";
      if (!entries.length) {
        const emptyLi = document.createElement("li");
        emptyLi.className = "ops-log-empty";
        emptyLi.textContent =
          "No actions recorded yet. Run a refresh or rebalance to populate the feed.";
        listEl.appendChild(emptyLi);
        updateStatus();
        return;
      }

      entries.forEach((entry) => {
        const config = EVENT_MAP[entry.type] || {};
        const li = document.createElement("li");
        li.className = "ops-log-item";
        li.dataset.type = entry.type;

        const icon = document.createElement("span");
        icon.className = `ops-log-icon ${config.iconClass || ""}`.trim();
        icon.textContent = config.icon || "•";

        const body = document.createElement("div");
        body.className = "ops-log-body";

        const heading = document.createElement("strong");
        heading.textContent = config.label || entry.type;

        const meta = document.createElement("div");
        meta.className = "ops-log-meta";
        meta.textContent = new Date(entry.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });

        const detail = document.createElement("p");
        detail.textContent = entry.detailText;

        body.appendChild(heading);
        body.appendChild(meta);
        body.appendChild(detail);

        li.appendChild(icon);
        li.appendChild(body);

        listEl.appendChild(li);
      });

      updateStatus();
    };

    const record = (type, detail = {}) => {
      if (!type) return;
      const detailText = buildActivityDetail(type, detail);
      const entry = {
        id: `${type}-${Date.now()}`,
        type,
        detailText,
        timestamp: Date.now(),
      };
      if (entries.length) {
        const last = entries[0];
        if (
          last.type === entry.type &&
          last.detailText === entry.detailText &&
          entry.timestamp - last.timestamp < 1500
        ) {
          return;
        }
      }
      entries.unshift(entry);
      if (entries.length > MAX_LOG_ITEMS) {
        entries = entries.slice(0, MAX_LOG_ITEMS);
      }
      saveEntries();
      render();
    };

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        entries = [];
        saveEntries();
        render();
      });
    }

    if (exportBtn) {
      exportBtn.addEventListener("click", async () => {
        if (!entries.length) return;
        const text = entries
          .map(
            (entry) =>
              `${new Date(entry.timestamp).toLocaleString()} — ${eventLabel(entry.type)} ${
                entry.detailText
              }`
          )
          .join("\n");
        try {
          await navigator.clipboard.writeText(text);
          exportBtn.textContent = "Copied!";
          setTimeout(() => {
            exportBtn.textContent = "Copy summary";
          }, 1500);
        } catch (error) {
          console.warn("Unable to copy summary", error);
        }
      });
    }

    document.addEventListener("rebalanceRunCompleted", (event) => {
      if (!event?.detail?.userInitiated) return;
      record("rebalance", event.detail);
    });
    document.addEventListener("depositAllocationPlanUpdated", (event) => {
      record("depositAllocation", event.detail);
    });
    document.addEventListener("rebalanceDepositPlanUpdated", (event) => {
      record("depositRebalance", event.detail);
    });
    document.addEventListener("livePriceSheetUpdated", (event) => {
      if (!event?.detail?.userInitiated) return;
      record("liveRefresh", event.detail);
    });

    render();
  }

  function loadActivityEntries() {
    try {
      const raw = localStorage.getItem(LOG_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter((entry) => entry && typeof entry === "object")
        .map((entry) => ({
          ...entry,
          detailText: entry.detailText || "",
          timestamp: Number(entry.timestamp) || Date.now(),
        }));
    } catch (error) {
      console.warn("Unable to load activity log", error);
      return [];
    }
  }

  function buildActivityDetail(type, detail) {
    if (!detail || typeof detail !== "object") return "";
    switch (type) {
      case "rebalance": {
        const threshold = Number(detail.threshold) || 0;
        const buy = Number(detail.totalBuy) || 0;
        const sell = Number(detail.totalSell) || 0;
        const status = detail.needsRebalance ? "Action required" : "Stable";
        return `Guardrail ${threshold.toFixed(1)}% • Buys ${formatCurrencyLocal(
          buy
        )} / Sells ${formatCurrencyLocal(sell)} • ${status}`;
      }
      case "depositAllocation": {
        const deposit = Number(detail?.totals?.deposit) || 0;
        const rounding = (detail?.totals?.roundingMode || "exact").toUpperCase();
        return `${formatCurrencyLocal(deposit)} staged via allocation tool • ${rounding} mode`;
      }
      case "depositRebalance": {
        const assigned = Number(detail?.totals?.assigned ?? detail?.totals?.deposit) || 0;
        const locks = Number(detail?.totals?.lockedCount) || 0;
        return `${formatCurrencyLocal(assigned)} deployed by helper • ${locks} locks`;
      }
      case "liveRefresh": {
        const totalValue = Number(detail?.totals?.currentValue) || 0;
        return `Synced Google Sheet (${formatCurrencyLocal(totalValue)} total value)`;
      }
      default:
        return "Event captured";
    }
  }

  function eventLabel(type) {
    return EVENT_MAP[type]?.label || type;
  }

  /* -------------------------------------------------------------------------- */
  /*                           Scenario Sandbox (6B)                            */
  /* -------------------------------------------------------------------------- */
  function initScenarioSandbox() {
    const slider = document.getElementById("depositScenarioMove");
    const sliderValueEl = document.getElementById("depositScenarioMoveValue");
    const splitsInput = document.getElementById("depositScenarioSplits");
    const statusEl = document.getElementById("depositScenarioStatus");
    const summaryEl = document.getElementById("depositScenarioSummary");
    const detailEl = document.getElementById("depositScenarioDetail");
    const resetBtn = document.getElementById("depositScenarioResetBtn");
    if (!slider || !splitsInput || !statusEl || !summaryEl || !detailEl) return;

    const state = loadScenarioState();
    let latestTotals = null;
    let latestTimestamp = null;

    const saveState = () => {
      try {
        localStorage.setItem(SCENARIO_STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn("Unable to persist scenario state", error);
      }
    };

    const updateMoveChip = () => {
      if (!sliderValueEl) return;
      sliderValueEl.textContent = `${state.move >= 0 ? "+" : ""}${state.move.toFixed(1)}%`;
    };

    const updateSummary = () => {
      if (!latestTotals || (latestTotals.finalTotal ?? latestTotals.deposit) <= 0) {
        statusEl.textContent = "Run an allocation to unlock the forecast.";
        summaryEl.textContent = "--";
        detailEl.textContent =
          "Forecast will display the projected value after applying the selected drift scenario.";
        return;
      }
      const base =
        Number(latestTotals.finalTotal) ||
        Number(latestTotals.deposit) ||
        Number(latestTotals.rawTotal) ||
        0;
      const moveDecimal = state.move / 100;
      const splits = Math.max(1, Math.round(state.splits) || 1);
      const projected = base * Math.pow(1 + moveDecimal, splits);
      const delta = projected - base;

      summaryEl.textContent = `${detailedCurrencyFormatter.format(projected)} projected`;
      detailEl.textContent =
        moveDecimal === 0
          ? `Neutral drift across ${splits} wave(s).`
          : `${splits} wave${splits > 1 ? "s" : ""} @ ${
              state.move >= 0 ? "+" : ""
            }${state.move.toFixed(1)}% ⇒ ${delta >= 0 ? "+" : ""}${detailedCurrencyFormatter.format(
              delta
            )} vs. base ${detailedCurrencyFormatter.format(base)}.`;
      const timestamp = latestTimestamp
        ? new Date(latestTimestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        : "recent";
      statusEl.textContent = `Synced with ${formatCurrencyLocal(
        Number(latestTotals.deposit) || base
      )} deposit (${timestamp})`;
    };

    slider.value = Number.isFinite(state.move) ? state.move : 0;
    splitsInput.value = Number.isFinite(state.splits) ? state.splits : 1;
    updateMoveChip();

    slider.addEventListener("input", (event) => {
      state.move = parseFloat(event.target.value) || 0;
      updateMoveChip();
      saveState();
      updateSummary();
    });
    splitsInput.addEventListener("change", (event) => {
      const next = Math.max(1, parseInt(event.target.value, 10) || 1);
      state.splits = next;
      splitsInput.value = next;
      saveState();
      updateSummary();
    });
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state.move = 0;
        state.splits = 1;
        slider.value = "0";
        splitsInput.value = "1";
        updateMoveChip();
        saveState();
        updateSummary();
      });
    }

    document.addEventListener("depositAllocationPlanUpdated", (event) => {
      latestTotals = event?.detail?.totals || null;
      latestTimestamp = event?.detail?.generatedAt || Date.now();
      updateSummary();
    });

    updateSummary();
  }

  function loadScenarioState() {
    try {
      const raw = localStorage.getItem(SCENARIO_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") {
        return { move: 0, splits: 1 };
      }
      return {
        move: Number(parsed.move) || 0,
        splits: Math.max(1, Number(parsed.splits) || 1),
      };
    } catch (error) {
      console.warn("Unable to load scenario state", error);
      return { move: 0, splits: 1 };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                        Cash Runway & Account Tags                          */
  /* -------------------------------------------------------------------------- */
  function initCashRunway() {
    const cashInput = document.getElementById("cashOnHandInput");
    const burnInput = document.getElementById("monthlyBurnInput");
    const summaryEl = document.getElementById("cashRunwaySummary");
    const noteEl = document.getElementById("cashRunwayNote");
    const intelEl = document.getElementById("cashRunwayIntel");
    const tagSummaryEl = document.getElementById("accountTagSummary");
    const resetBtn = document.getElementById("cashRunwayResetBtn");
    const tagEls = Array.from(document.querySelectorAll(".account-tag"));
    if (!cashInput || !burnInput || !summaryEl || !noteEl || !tagSummaryEl) return;

    let state = loadCashState();

    const saveState = () => {
      try {
        localStorage.setItem(CASH_PREF_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn("Unable to persist runway inputs", error);
      }
    };

    const updateAccountSummary = () => {
      const activeTags = Object.entries(state.tags || {})
        .filter(([, active]) => active)
        .map(([key]) => ACCOUNT_LABELS[key] || key);
      if (!activeTags.length) {
        tagSummaryEl.textContent = "All accounts eligible — no overrides.";
      } else {
        tagSummaryEl.textContent = `Focus: ${activeTags.join(" + ")}`;
      }
    };

    const updateRunway = () => {
      const cash = Number(state.cash) || 0;
      const burn = Number(state.burn) || 0;
      if (burn <= 0 && cash <= 0) {
        summaryEl.textContent = "--";
        noteEl.textContent = "Enter cash and a monthly withdrawal to model coverage.";
        return;
      }

      if (burn <= 0) {
        summaryEl.textContent = formatCurrencyLocal(cash);
        noteEl.textContent = "Set a monthly withdrawal to calculate runway months.";
        return;
      }
      const months = cash / burn;
      summaryEl.textContent = `${months.toFixed(1)} months`;
      const days = Math.max(0, Math.round(months * 30));
      noteEl.textContent = days
        ? `~${days} days of runway with ${formatCurrencyLocal(cash)} on hand.`
        : "Runway under a month — consider topping up cash.";
    };

    const updateIntel = (source, totals) => {
      if (!intelEl || !totals) return;
      const deposit =
        Number(totals.deposit) ||
        Number(totals.assigned) ||
        Number(totals.finalTotalValue) ||
        0;
      const holdings =
        Number(totals.assetsCount) ||
        (totals.rows ? Object.keys(totals.rows).length : 0) ||
        "";
      const label = source === "helper" ? "deposit helper" : "allocation tool";
      intelEl.textContent = `${formatCurrencyLocal(deposit)} via ${label}${
        holdings ? ` (${holdings} holdings)` : ""
      }`;
      state.lastIntel = {
        source,
        deposit,
        holdings,
        timestamp: Date.now(),
      };
      saveState();
    };

    cashInput.value = state.cash || "";
    burnInput.value = state.burn || "";
    tagEls.forEach((label) => {
      const input = label.querySelector("input[type='checkbox']");
      if (!input) return;
      const key = input.id;
      const active = Boolean(state.tags?.[key]);
      input.checked = active;
      label.classList.toggle("account-tag--active", active);
      input.addEventListener("change", () => {
        state.tags = state.tags || {};
        state.tags[key] = input.checked;
        label.classList.toggle("account-tag--active", input.checked);
        saveState();
        updateAccountSummary();
      });
    });

    cashInput.addEventListener("input", (event) => {
      state.cash = event.target.value;
      saveState();
      updateRunway();
    });
    burnInput.addEventListener("input", (event) => {
      state.burn = event.target.value;
      saveState();
      updateRunway();
    });
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        state = {
          cash: "",
          burn: "",
          tags: {
            accountTagRoth: true,
            accountTagTaxable: false,
            accountTagCash: false,
          },
        };
        cashInput.value = "";
        burnInput.value = "";
        tagEls.forEach((label) => {
          const input = label.querySelector("input[type='checkbox']");
          if (!input) return;
          input.checked = Boolean(state.tags?.[input.id]);
          label.classList.toggle("account-tag--active", input.checked);
        });
        saveState();
        updateAccountSummary();
        updateRunway();
        intelEl.textContent = "Awaiting sandbox data";
      });
    }

    document.addEventListener("depositAllocationPlanUpdated", (event) => {
      updateIntel("allocation", event?.detail?.totals);
    });
    document.addEventListener("rebalanceDepositPlanUpdated", (event) => {
      updateIntel("helper", event?.detail?.totals);
    });

    updateAccountSummary();
    updateRunway();
    if (state.lastIntel && intelEl) {
      intelEl.textContent = `${formatCurrencyLocal(
        state.lastIntel.deposit || 0
      )} via previous ${state.lastIntel.source || "run"}`;
    }
  }

  function loadCashState() {
    try {
      const raw = localStorage.getItem(CASH_PREF_KEY);
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || typeof parsed !== "object") {
        return {
          cash: "",
          burn: "",
          tags: {
            accountTagRoth: true,
            accountTagTaxable: false,
            accountTagCash: false,
          },
        };
      }
      return {
        cash: parsed.cash ?? "",
        burn: parsed.burn ?? "",
        tags: {
          accountTagRoth: parsed.tags?.accountTagRoth ?? true,
          accountTagTaxable: parsed.tags?.accountTagTaxable ?? false,
          accountTagCash: parsed.tags?.accountTagCash ?? false,
        },
        lastIntel: parsed.lastIntel || null,
      };
    } catch (error) {
      console.warn("Unable to load runway preferences", error);
      return {
        cash: "",
        burn: "",
        tags: {
          accountTagRoth: true,
          accountTagTaxable: false,
          accountTagCash: false,
        },
      };
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                              Helper Functions                              */
  /* -------------------------------------------------------------------------- */
  function formatCurrencyLocal(value) {
    return currencyFormatter.format(Number(value) || 0);
  }

  function formatRelativeTime(timestamp) {
    const delta = Date.now() - Number(timestamp || 0);
    if (delta < 5_000) return "just now";
    if (delta < 60_000) return `${Math.round(delta / 1000)}s ago`;
    if (delta < 3_600_000) return `${Math.round(delta / 60000)}m ago`;
    return `${Math.round(delta / 3_600_000)}h ago`;
  }
})();
