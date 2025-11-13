
(() => {
  const ready = (callback) => {
    if (document.readyState === "loading") {
      document.addEventListener(
        "DOMContentLoaded",
        () => callback(),
        { once: true }
      );
    } else {
      callback();
    }
  };

  const numberFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
  });
  const percentFormatter = new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  });
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const safeFeedback = (message, options) => {
    if (typeof window.showActionFeedback === "function") {
      window.showActionFeedback(message, options);
    } else if (message) {
      console.info("[feedback]", message);
    }
  };

  ready(() => {
    initTelemetryConsole();
    initLoadoutLab();
    initTelemetryBuilder();
    initInventoryGrid();
    initScenarioLab();
    initLogisticsEnhancer();
  });
  /* -------------------------------------------------------------------------- */
  /*                             LIVE TELEMETRY UI                              */
  /* -------------------------------------------------------------------------- */
  function initTelemetryConsole() {
    const toggleBtn = document.getElementById("telemetryToggleBtn");
    const lastPacketEl = document.getElementById("telemetryLastPacket");
    const lastDeltaEl = document.getElementById("telemetryLastDelta");
    const sourceLabelEl = document.getElementById("telemetrySourceLabel");
    const statusLabelEl = document.getElementById("telemetryStatusLabel");
    const autoPinToggle = document.getElementById("telemetryAutoPinToggle");
    const pinsList = document.getElementById("telemetryPinsList");
    const clearPinsBtn = document.getElementById("telemetryClearPinsBtn");

    if (
      !toggleBtn ||
      !lastPacketEl ||
      !lastDeltaEl ||
      !sourceLabelEl ||
      !statusLabelEl ||
      !pinsList
    ) {
      return;
    }

    const telemetryConfig = window.APP_CONFIG?.telemetry || {};
    const streamInterval = telemetryConfig.intervalMs || 5000;
    const sparklineLimit = telemetryConfig.sparklinePoints || 30;

    const metricRefs = {
      score: {
        valueEl: document.getElementById("portfolioScore"),
        barEl: document.getElementById("portfolioScoreBar"),
        sparkline: document.getElementById("telemetrySparklineScore"),
        trendEl: document.getElementById("telemetryScoreTrend"),
        latencyEl: document.getElementById("telemetryScoreLatency"),
        unitMax: 10,
        format: (value) => numberFormatter.format(value ?? 0),
        color: "#34d399",
      },
      value: {
        valueEl: document.getElementById("currentTotalValueDisplay"),
        sparkline: document.getElementById("telemetrySparklineValue"),
        trendEl: document.getElementById("telemetryValueTrend"),
        latencyEl: document.getElementById("telemetryValueLatency"),
        format: (value) => currencyFormatter.format(value ?? 0),
        color: "#60a5fa",
      },
      risk: {
        valueEl: document.getElementById("riskLevel"),
        barEl: document.getElementById("riskLevelBar"),
        sparkline: document.getElementById("telemetrySparklineRisk"),
        trendEl: document.getElementById("telemetryRiskTrend"),
        latencyEl: document.getElementById("telemetryRiskLatency"),
        unitMax: 100,
        color: "#fbbf24",
      },
    };

    const telemetryState = {
      streaming: true,
      timer: null,
      lastPacket: null,
      autoPin: true,
      pins: [],
      series: {
        score: [],
        value: [],
        risk: [],
      },
    };

    const metricLastUpdateEl = document.getElementById("metricLastUpdateValue");
    const metricLastUpdateCaption = document.getElementById(
      "metricLastUpdateCaption"
    );

    function setStatus(message, tone = "info") {
      statusLabelEl.textContent = message;
      statusLabelEl.dataset.tone = tone;
    }

    function drawSparkline(canvas, dataPoints, color) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const width = (canvas.width = canvas.clientWidth || 120);
      const height = (canvas.height = canvas.clientHeight || 40);
      ctx.clearRect(0, 0, width, height);

      if (!dataPoints.length) {
        ctx.strokeStyle = "#9ca3af";
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      const min = Math.min(...dataPoints);
      const max = Math.max(...dataPoints);
      const range = Math.max(max - min, 0.0001);
      const step = width / Math.max(dataPoints.length - 1, 1);

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = color;
      ctx.beginPath();

      dataPoints.forEach((value, index) => {
        const x = step * index;
        const normalized = (value - min) / range;
        const y = height - normalized * height;
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      ctx.fillStyle = color;
      const lastValue = dataPoints[dataPoints.length - 1];
      const normalized = (lastValue - min) / range;
      const y = height - normalized * height;
      ctx.beginPath();
      ctx.arc(width - 3, y, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    function formatDelta(delta, unitSymbol = "") {
      if (!Number.isFinite(delta) || delta === 0) return "0";
      const sign = delta > 0 ? "+" : "";
      const formatted = numberFormatter.format(delta);
      return `${sign}${formatted}${unitSymbol}`;
    }

    function pinTelemetry(event) {
      if (!pinsList) return;
      const entry = document.createElement("li");
      entry.className = "telemetry-console__pin";
      entry.textContent = `${event.timestamp} | ${event.message}`;
      pinsList.prepend(entry);
      telemetryState.pins.unshift(event);
      while (telemetryState.pins.length > 5) {
        telemetryState.pins.pop();
        pinsList.lastElementChild?.remove();
      }
    }

    function handleSnapshot(snapshot) {
      telemetryState.lastPacket = new Date();
      lastPacketEl.textContent = telemetryState.lastPacket.toLocaleTimeString();
      sourceLabelEl.textContent =
        telemetryConfig.sourceLabel || snapshot.source || "Simulated bus";

      const deltas = [];

      ["score", "value", "risk"].forEach((metricKey) => {
        const metric = metricRefs[metricKey];
        if (!metric) return;
        const rawValue = snapshot[metricKey];

        if (metric.valueEl && rawValue != null) {
          if (metricKey === "value") {
            metric.valueEl.textContent = metric.format(rawValue);
          } else if (metricKey === "risk") {
            const label =
              rawValue >= 75
                ? "High"
                : rawValue >= 45
                ? "Moderate"
                : "Conservative";
            metric.valueEl.textContent = label;
          } else {
            metric.valueEl.textContent = metric.format(rawValue);
          }
        }

        if (metric.barEl && rawValue != null && metric.unitMax) {
          const pct = Math.min(
            100,
            Math.max(0, (rawValue / metric.unitMax) * 100)
          );
          metric.barEl.style.width = `${pct}%`;
          metric.barEl.setAttribute("aria-valuenow", rawValue.toFixed(1));
        }

        const series = telemetryState.series[metricKey];
        if (series) {
          series.push(rawValue);
          if (series.length > sparklineLimit) {
            series.shift();
          }
          drawSparkline(metric.sparkline, series, metric.color);

          const previous = series.length > 1 ? series[series.length - 2] : null;
          if (
            metric.trendEl &&
            Number.isFinite(rawValue) &&
            Number.isFinite(previous)
          ) {
            const delta = rawValue - previous;
            metric.trendEl.textContent = formatDelta(
              delta,
              metricKey === "value" ? "" : metricKey === "risk" ? " pts" : ""
            );
            metric.trendEl.dataset.trend = delta === 0 ? "flat" : delta > 0 ? "up" : "down";
            deltas.push(delta);
          }

          if (metric.latencyEl) {
            metric.latencyEl.textContent = snapshot.latency
              ? `${snapshot.latency} ms`
              : "Realtime";
          }
        }
      });

      if (metricLastUpdateEl) {
        metricLastUpdateEl.textContent =
          telemetryState.lastPacket?.toLocaleTimeString() || "--";
      }
      if (metricLastUpdateCaption) {
        metricLastUpdateCaption.textContent = "Telemetry uplink";
      }

      if (
        telemetryState.autoPin &&
        deltas.some((delta) => Math.abs(delta) > 0.5)
      ) {
        pinTelemetry({
          timestamp: telemetryState.lastPacket.toLocaleTimeString(),
          message: `Spikes detected (delta ${deltas
            .map((delta) => formatDelta(delta))
            .join(", ")})`,
        });
      }

      if (lastDeltaEl && deltas.length) {
        lastDeltaEl.textContent = deltas
          .map((delta) => formatDelta(delta))
          .join(" / ");
      }
    }

    function generateMockTelemetry() {
      const baselineValue =
        telemetryState.series.value[telemetryState.series.value.length - 1] ||
        449.12;
      const nextValue = baselineValue * (1 + (Math.random() - 0.5) * 0.01);
      return {
        source: "Simulated loopback",
        score: Math.max(
          2,
          Math.min(
            9.5,
            (telemetryState.series.score.slice(-1)[0] || 7.4) +
              (Math.random() - 0.5) * 0.3
          )
        ),
        value: nextValue,
        risk: Math.max(
          15,
          Math.min(
            95,
            (telemetryState.series.risk.slice(-1)[0] || 82) +
              (Math.random() - 0.5) * 3
          )
        ),
        latency: Math.round(50 + Math.random() * 25),
      };
    }

    function fetchSnapshot() {
      const endpoint = telemetryConfig.endpoint;
      if (!endpoint) {
        return Promise.resolve(generateMockTelemetry());
      }

      const controller = new AbortController();
      const timeout = window.setTimeout(
        () => controller.abort(),
        telemetryConfig.timeoutMs || 4000
      );

      return fetch(endpoint, {
        method: "GET",
        headers: telemetryConfig.headers || {},
        signal: controller.signal,
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.json();
        })
        .catch((error) => {
          console.warn("Telemetry endpoint failed, using mock data", error);
          return generateMockTelemetry();
        })
        .finally(() => window.clearTimeout(timeout));
    }

    function pollTelemetry(immediate = false) {
      clearTimeout(telemetryState.timer);
      if (!telemetryState.streaming) return;

      const run = () =>
        fetchSnapshot()
          .then((snapshot) => {
            handleSnapshot(snapshot);
            setStatus("Streaming", "success");
          })
          .catch((error) => {
            console.error("Telemetry poll failure", error);
            setStatus("Degraded", "error");
          })
          .finally(() => {
            telemetryState.timer = window.setTimeout(
              () => pollTelemetry(),
              streamInterval
            );
          });

      if (immediate) {
        run();
      } else {
        telemetryState.timer = window.setTimeout(run, streamInterval);
      }
    }

    toggleBtn.addEventListener("click", () => {
      telemetryState.streaming = !telemetryState.streaming;
      toggleBtn.textContent = telemetryState.streaming
        ? "Pause stream"
        : "Resume stream";
      toggleBtn.setAttribute("aria-pressed", String(!telemetryState.streaming));
      if (telemetryState.streaming) {
        setStatus("Resuming...", "info");
        pollTelemetry(true);
      } else {
        clearTimeout(telemetryState.timer);
        setStatus("Paused", "info");
      }
    });

    autoPinToggle?.addEventListener("change", (event) => {
      telemetryState.autoPin = event.target.checked;
    });

    clearPinsBtn?.addEventListener("click", () => {
      telemetryState.pins = [];
      pinsList.innerHTML = "";
    });

    pollTelemetry(true);
  }
  /* -------------------------------------------------------------------------- */
  /*                               LOADOUT  LAB                                 */
  /* -------------------------------------------------------------------------- */
  function initLoadoutLab() {
    const frameSelect = document.getElementById("loadoutFrameSelect");
    const inventoryList = document.getElementById("loadoutInventoryList");
    const slotLists = document.querySelectorAll("[data-slot-list]");
    const resetBtn = document.getElementById("loadoutResetBtn");
    const applyBtn = document.getElementById("loadoutApplyBtn");
    const randomizeBtn = document.getElementById("loadoutRandomizeBtn");
    const logList = document.getElementById("loadoutLog");
    const logClearBtn = document.getElementById("loadoutLogClearBtn");
    const massLockToggle = document.getElementById("loadoutMassLockToggle");

    if (
      !frameSelect ||
      !inventoryList ||
      !slotLists.length ||
      !applyBtn ||
      !logList
    ) {
      return;
    }

    const FRAMES = {
      rx78: {
        label: "RX-78 GP01",
        baseMass: 72,
        thrust: 84,
        mobility: 78,
        limit: 120,
      },
      astray: {
        label: "MBF-P02 Astray",
        baseMass: 61,
        thrust: 90,
        mobility: 86,
        limit: 105,
      },
      barbatos: {
        label: "ASW-G-08 Barbatos",
        baseMass: 78,
        thrust: 82,
        mobility: 72,
        limit: 135,
      },
      unicorn: {
        label: "RX-0 Unicorn",
        baseMass: 68,
        thrust: 96,
        mobility: 90,
        limit: 110,
      },
    };

    const EQUIPMENT = [
      {
        id: "beamRifle",
        name: "Beam rifle",
        slot: ["ranged"],
        mass: 12,
        thrustDelta: -4,
        mobilityDelta: -2,
      },
      {
        id: "bazooka",
        name: "Hyper bazooka",
        slot: ["ranged", "optional"],
        mass: 18,
        thrustDelta: -6,
        mobilityDelta: -4,
      },
      {
        id: "shield",
        name: "I-field shield",
        slot: ["melee", "support"],
        mass: 8,
        thrustDelta: -2,
        mobilityDelta: -1,
      },
      {
        id: "beamSaber",
        name: "Dual beam saber",
        slot: ["melee"],
        mass: 4,
        thrustDelta: -1,
        mobilityDelta: 1,
      },
      {
        id: "funnels",
        name: "Remote funnels",
        slot: ["ranged", "optional"],
        mass: 6,
        thrustDelta: -1,
        mobilityDelta: 3,
      },
      {
        id: "booster",
        name: "Assault booster",
        slot: ["support"],
        mass: 10,
        thrustDelta: 6,
        mobilityDelta: 5,
      },
      {
        id: "medKit",
        name: "Field repair kit",
        slot: ["support", "optional"],
        mass: 5,
        thrustDelta: -1,
        mobilityDelta: 0,
      },
      {
        id: "psychoFrame",
        name: "Psycho-frame relay",
        slot: ["optional"],
        mass: 7,
        thrustDelta: 2,
        mobilityDelta: 4,
      },
    ];

    const statEls = {
      mass: document.getElementById("loadoutMassReadout"),
      thrust: document.getElementById("loadoutThrustReadout"),
      mobility: document.getElementById("loadoutMobilityReadout"),
      compliance: document.getElementById("loadoutComplianceReadout"),
    };

    const loadoutState = {
      frame: frameSelect.value || "rx78",
      slots: {
        melee: [],
        ranged: [],
        support: [],
        optional: [],
      },
      log: [],
      attachmentCount: 0,
    };
    function renderInventory() {
      inventoryList.innerHTML = "";
      EQUIPMENT.forEach((item) => {
        const li = document.createElement("li");
        li.className = "loadout-item";
        li.setAttribute("draggable", "true");
        li.dataset.id = item.id;
        li.dataset.mass = String(item.mass);
        li.dataset.thrust = String(item.thrustDelta);
        li.dataset.mobility = String(item.mobilityDelta);
        li.dataset.slots = item.slot.join(",");
        li.innerHTML = `
          <span class="loadout-item__name">${item.name}</span>
          <span class="loadout-item__meta">
            ${item.mass}kg | ${item.thrustDelta >= 0 ? "+" : ""}${item.thrustDelta}T |
            ${item.mobilityDelta >= 0 ? "+" : ""}${item.mobilityDelta}M
          </span>
        `;
        li.addEventListener("dragstart", (event) => {
          event.dataTransfer.setData(
            "application/json",
            JSON.stringify(item)
          );
        });
        inventoryList.appendChild(li);
      });
    }

    function renderSlots() {
      slotLists.forEach((list) => {
        const slotName = list.dataset.slotList;
        const items = loadoutState.slots[slotName] || [];
        list.innerHTML = "";
        if (!items.length) {
          const empty = document.createElement("li");
          empty.className = "loadout-slot__empty";
          empty.textContent = "Drop components here";
          list.appendChild(empty);
          return;
        }

        items.forEach((item) => {
          const li = document.createElement("li");
          li.className = "loadout-slot__item";
          li.innerHTML = `
            <div>
              <p>${item.name}</p>
              <span>${item.mass}kg | ${item.thrustDelta >= 0 ? "+" : ""}${
            item.thrustDelta
          }T | ${item.mobilityDelta >= 0 ? "+" : ""}${item.mobilityDelta}M</span>
            </div>
            <button type="button" aria-label="Remove ${item.name}">&times;</button>
          `;
          li.querySelector("button").addEventListener("click", () => {
            removeItemFromSlot(slotName, item.uid);
          });
          list.appendChild(li);
        });
      });
    }

    function removeItemFromSlot(slotName, uid) {
      loadoutState.slots[slotName] = loadoutState.slots[slotName].filter(
        (item) => item.uid !== uid
      );
      renderSlots();
      updateStats();
    }

    function addItemToSlot(slotName, payload) {
      if (!payload.slot || !payload.slot.includes(slotName)) {
        safeFeedback(`Cannot slot ${payload.name} into ${slotName}`, {
          state: "error",
        });
        return;
      }
      const clone = {
        ...payload,
        uid: `${payload.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      };
      loadoutState.slots[slotName].push(clone);
      renderSlots();
      updateStats();
      logEvent(`Mounted ${payload.name} to ${slotName} slot`);
    }

    function updateStats() {
      const frame = FRAMES[loadoutState.frame];
      if (!frame) return;
      const baseMass = frame.baseMass;
      let totalMass = baseMass;
      let thrust = frame.thrust;
      let mobility = frame.mobility;

      Object.values(loadoutState.slots).forEach((items) => {
        items.forEach((item) => {
          totalMass += item.mass;
          thrust += item.thrustDelta;
          mobility += item.mobilityDelta;
        });
      });

      const isLocked = massLockToggle?.checked;
      const limit = frame.limit;
      const overweight = totalMass - limit;
      const compliance = overweight > 0 ? overweight : 0;

      const effectiveMass =
        isLocked && totalMass > limit ? limit : Math.round(totalMass);

      if (statEls.mass) {
        statEls.mass.textContent = `${effectiveMass} kg`;
      }
      if (statEls.thrust) {
        const adjustedThrust =
          thrust - (overweight > 0 && isLocked ? Math.round(overweight / 2) : 0);
        statEls.thrust.textContent = `${Math.max(adjustedThrust, 0)} %`;
      }
      if (statEls.mobility) {
        statEls.mobility.textContent = `${Math.max(
          Math.round(mobility),
          0
        )} pts`;
      }
      if (statEls.compliance) {
        statEls.compliance.textContent =
          compliance > 0
            ? `Overweight by ${Math.round(compliance)} kg`
            : "Within tolerance";
        statEls.compliance.dataset.state =
          compliance > 0 ? "warning" : "ok";
      }
    }

    function logEvent(message) {
      if (!logList) return;
      const timestamp = new Date().toLocaleTimeString();
      const entry = document.createElement("li");
      entry.innerHTML = `<span>${timestamp}</span><p>${message}</p>`;
      logList.prepend(entry);
      loadoutState.log.unshift({ timestamp, message });
      while (logList.children.length > 6) {
        logList.removeChild(logList.lastElementChild);
      }
    }

    slotLists.forEach((list) => {
      list.addEventListener("dragover", (event) => {
        event.preventDefault();
        list.classList.add("loadout-slot__list--hover");
      });
      list.addEventListener("dragleave", () => {
        list.classList.remove("loadout-slot__list--hover");
      });
      list.addEventListener("drop", (event) => {
        event.preventDefault();
        list.classList.remove("loadout-slot__list--hover");
        const data = event.dataTransfer.getData("application/json");
        if (!data) return;
        const payload = JSON.parse(data);
        addItemToSlot(list.dataset.slotList, payload);
      });
    });

    frameSelect.addEventListener("change", () => {
      loadoutState.frame = frameSelect.value;
      updateStats();
      logEvent(`Swapped frame to ${FRAMES[frameSelect.value].label}`);
    });

    resetBtn?.addEventListener("click", () => {
      Object.keys(loadoutState.slots).forEach((key) => {
        loadoutState.slots[key] = [];
      });
      renderSlots();
      updateStats();
      logEvent("Cleared all loadout slots");
    });

    applyBtn.addEventListener("click", () => {
      const frame = FRAMES[loadoutState.frame];
      safeFeedback(
        `Applied ${frame.label} loadout (${Object.values(loadoutState.slots)
          .map((items) => items.length)
          .reduce((a, b) => a + b, 0)} components)`,
        { state: "success" }
      );
      logEvent("Configuration pushed to hangar manifest");
    });

    randomizeBtn?.addEventListener("click", () => {
      Object.keys(loadoutState.slots).forEach((slot) => {
        loadoutState.slots[slot] = [];
        const eligible = EQUIPMENT.filter((item) =>
          item.slot.includes(slot)
        );
        const roll = Math.random() > 0.5 ? 1 : 0;
        for (let i = 0; i < roll; i++) {
          const pick = eligible[Math.floor(Math.random() * eligible.length)];
          if (pick) {
            addItemToSlot(slot, pick);
          }
        }
      });
      renderSlots();
      updateStats();
      logEvent("Randomized loadout for stress test");
    });

    logClearBtn?.addEventListener("click", () => {
      logList.innerHTML = "";
      loadoutState.log = [];
    });

    renderInventory();
    renderSlots();
    updateStats();
  }
  /* -------------------------------------------------------------------------- */
  /*                           TELEMETRY BUILDER LAB                            */
  /* -------------------------------------------------------------------------- */
  function initTelemetryBuilder() {
    const form = document.getElementById("telemetryBuilderForm");
    const chartCanvas = document.getElementById("telemetryCustomChart");
    const presetSelect = document.getElementById("telemetryPresetSelect");
    const savePresetBtn = document.getElementById("telemetrySavePresetBtn");
    const loadPresetBtn = document.getElementById("telemetryLoadPresetBtn");
    const deletePresetBtn = document.getElementById("telemetryDeletePresetBtn");
    const pinBtn = document.getElementById("telemetryPinSnapshotBtn");
    const snapshotsList = document.getElementById("telemetrySnapshotsList");
    const refreshTvBtn = document.getElementById("telemetryRefreshTvBtn");

    if (!form || !chartCanvas || !snapshotsList) {
      return;
    }

    const PRESET_STORAGE_KEY = "hangar.telemetryPresets.v1";
    let telemetryChart = null;
    const snapshotState = [];

    const axisLabels = {
      time: ["T-0", "T+5", "T+10", "T+15", "T+20", "T+25"],
      sortie: ["S1", "S2", "S3", "S4", "S5", "S6"],
      stress: ["10%", "20%", "40%", "60%", "80%", "95%"],
    };

    const datasetPalette = {
      damage: { color: "#f87171", baseline: 50 },
      armor: { color: "#fbbf24", baseline: 70 },
      energy: { color: "#38bdf8", baseline: 40 },
      coolant: { color: "#34d399", baseline: 30 },
    };

    function loadPresets() {
      try {
        const raw = localStorage.getItem(PRESET_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn("Failed to parse telemetry presets", error);
        return [];
      }
    }

    function savePresets(presets) {
      try {
        localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
      } catch (error) {
        console.warn("Failed to persist telemetry presets", error);
      }
    }

    function refreshPresetOptions() {
      const presets = loadPresets();
      presetSelect.innerHTML =
        '<option value="">Select preset</option>' +
        presets
          .map(
            (preset) => `<option value="${preset.name}">${preset.name}</option>`
          )
          .join("");
    }

    function buildDataset(metric, datasetKey) {
      const base = datasetPalette[datasetKey];
      if (!base) return null;
      const multiplier =
        metric === "efficiency" ? 0.7 : metric === "resilience" ? 1.2 : 1;
      const points = axisLabels.time.length;
      const data = Array.from({ length: points }, (_, index) => {
        const variance = (Math.random() - 0.5) * 10;
        return Math.max(
          5,
          Math.round(base.baseline * multiplier + variance * (index + 1))
        );
      });
      return {
        label:
          datasetKey.charAt(0).toUpperCase() + datasetKey.slice(1),
        data,
        borderColor: base.color,
        backgroundColor: base.color + "33",
        tension: 0.35,
        pointRadius: 2,
        fill: false,
      };
    }

    function renderChart(config) {
      if (!window.Chart) {
        console.warn("Chart.js is not available for telemetry builder");
        return;
      }

      const labels = axisLabels[config.axis] || axisLabels.time;
      const datasets = config.datasets
        .map((datasetKey) => buildDataset(config.metric, datasetKey))
        .filter(Boolean);

      if (!datasets.length) {
        safeFeedback("Select at least one dataset", { state: "error" });
        return;
      }

      if (telemetryChart) {
        telemetryChart.destroy();
      }

      telemetryChart = new Chart(chartCanvas, {
        type: "line",
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              labels: { usePointStyle: true },
            },
          },
          interaction: { intersect: false, mode: "index" },
          scales: {
            y: {
              min: 0,
              ticks: { callback: (value) => `${value} pts` },
            },
          },
        },
      });

      telemetryChart.$meta = {
        metric: config.metric,
        axis: config.axis,
        datasets,
      };
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const metric = form.querySelector("#telemetryMetricSelect").value;
      const axis = form.querySelector("#telemetryAxisSelect").value;
      const datasets = Array.from(
        form.querySelectorAll("input[name='telemetryDataset']:checked")
      ).map((input) => input.value);
      renderChart({ metric, axis, datasets });
    });

    savePresetBtn?.addEventListener("click", () => {
      const name = window.prompt("Preset name?");
      if (!name) return;
      const metric = form.querySelector("#telemetryMetricSelect").value;
      const axis = form.querySelector("#telemetryAxisSelect").value;
      const datasets = Array.from(
        form.querySelectorAll("input[name='telemetryDataset']:checked")
      ).map((input) => input.value);
      const presets = loadPresets();
      const existingIndex = presets.findIndex((preset) => preset.name === name);
      const newPreset = { name, metric, axis, datasets };
      if (existingIndex >= 0) {
        presets[existingIndex] = newPreset;
      } else {
        presets.push(newPreset);
      }
      savePresets(presets);
      refreshPresetOptions();
      presetSelect.value = name;
      safeFeedback(`Saved preset "${name}"`, { state: "success" });
    });

    loadPresetBtn?.addEventListener("click", () => {
      const selected = presetSelect.value;
      if (!selected) return;
      const preset = loadPresets().find((item) => item.name === selected);
      if (!preset) return;
      form.querySelector("#telemetryMetricSelect").value = preset.metric;
      form.querySelector("#telemetryAxisSelect").value = preset.axis;
      form
        .querySelectorAll("input[name='telemetryDataset']")
        .forEach((input) => {
          input.checked = preset.datasets.includes(input.value);
        });
      renderChart(preset);
      safeFeedback(`Loaded preset "${preset.name}"`, { state: "info" });
    });

    deletePresetBtn?.addEventListener("click", () => {
      const selected = presetSelect.value;
      if (!selected) return;
      const filtered = loadPresets().filter(
        (preset) => preset.name !== selected
      );
      savePresets(filtered);
      refreshPresetOptions();
      safeFeedback(`Deleted preset "${selected}"`, { state: "success" });
    });

    pinBtn?.addEventListener("click", () => {
      if (!telemetryChart || !telemetryChart.$meta) {
        safeFeedback("Load the chart before pinning a snapshot", {
          state: "error",
        });
        return;
      }
      const snapshot = {
        timestamp: new Date().toLocaleTimeString(),
        metric: telemetryChart.$meta.metric,
        datasets: telemetryChart.$meta.datasets.map((dataset) => ({
          label: dataset.label,
          peak: Math.max(...dataset.data),
          trough: Math.min(...dataset.data),
          last: dataset.data[dataset.data.length - 1],
        })),
      };
      snapshotState.unshift(snapshot);
      const entry = document.createElement("li");
      const datasetSummary = snapshot.datasets
        .map(
          (dataset) =>
            `${dataset.label} max ${dataset.peak} / last ${dataset.last}`
        )
        .join(" | ");
      entry.textContent = `${snapshot.timestamp} | ${datasetSummary}`;
      snapshotsList.prepend(entry);
      while (snapshotsList.children.length > 5) {
        snapshotsList.removeChild(snapshotsList.lastElementChild);
        snapshotState.pop();
      }
    });

    refreshTvBtn?.addEventListener("click", () => {
      if (window.TradingViewLoader) {
        window.TradingViewLoader.requestRender();
        safeFeedback("TradingView widget requested reload", {
          state: "success",
        });
      } else {
        safeFeedback("TradingView widget not mounted yet", {
          state: "error",
        });
      }
    });

    refreshPresetOptions();
  }
  /* -------------------------------------------------------------------------- */
  /*                         INVENTORY EDITABLE GRID                            */
  /* -------------------------------------------------------------------------- */
  function initInventoryGrid() {
    const tableBody = document.getElementById("inventoryGridBody");
    const addRowBtn = document.getElementById("inventoryAddRowBtn");
    const importCsvBtn = document.getElementById("inventoryImportCsvBtn");
    const hiddenCsvInput = document.getElementById("inventoryCsvInput");
    const attachmentInput = document.getElementById(
      "inventoryAttachmentInput"
    );
    const autosaveToggle = document.getElementById("inventoryAutosaveToggle");
    const syncBtn = document.getElementById("inventorySyncBtn");
    const syncStatusEl = document.getElementById("inventorySyncStatus");

    if (!tableBody || !addRowBtn || !hiddenCsvInput || !attachmentInput) {
      return;
    }

    const STORAGE_KEY = "hangar.inventoryGrid.v1";
    const attachmentUrls = new Map();
    let attachmentTargetRow = null;

    const defaultRows = [
      {
        id: crypto.randomUUID(),
        kit: "MG RX-78-2 Gundam Ver.Ka",
        grade: "MG",
        status: "Queued",
        notes: "Need decals + matte top coat",
        audited: false,
        attachment: null,
      },
      {
        id: crypto.randomUUID(),
        kit: "RG Sazabi",
        grade: "RG",
        status: "In progress",
        notes: "Frame assembled, waiting on panel lining",
        audited: false,
        attachment: null,
      },
    ];

    function loadRows() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [...defaultRows];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [...defaultRows];
        return parsed;
      } catch (error) {
        console.warn("Failed to parse inventory rows", error);
        return [...defaultRows];
      }
    }

    let rows = loadRows();

    function persistRows() {
      if (autosaveToggle?.checked === false) return;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
      } catch (error) {
        console.warn("Unable to persist inventory grid", error);
      }
    }

    function renderRows() {
      tableBody.innerHTML = "";
      rows.forEach((row) => {
        const tr = document.createElement("tr");
        tr.dataset.rowId = row.id;
        tr.innerHTML = `
          <td>
            <label class="inventory-grid__checkbox">
              <input type="checkbox" data-field="audited" ${row.audited ? "checked" : ""}/>
              <span>Done</span>
            </label>
          </td>
          <td>
            <input type="text" data-field="kit" value="${row.kit}" />
          </td>
          <td>
            <select data-field="grade">
              ${["HG", "RG", "MG", "PG", "Custom"]
                .map(
                  (grade) =>
                    `<option value="${grade}" ${
                      grade === row.grade ? "selected" : ""
                    }>${grade}</option>`
                )
                .join("")}
            </select>
          </td>
          <td>
            <select data-field="status">
              ${["Queued", "In progress", "Complete", "Backlog"]
                .map(
                  (status) =>
                    `<option value="${status}" ${
                      status === row.status ? "selected" : ""
                    }>${status}</option>`
                )
                .join("")}
            </select>
          </td>
          <td>
            <textarea data-field="notes" rows="2">${row.notes || ""}</textarea>
          </td>
          <td>
            <div class="inventory-grid__attachment">
              <button type="button" data-action="attach">Attach image</button>
              <div class="inventory-grid__attachment-preview">
                ${
                  row.attachment
                    ? `<img src="${row.attachment}" alt="Attachment preview" />`
                    : "<span>No attachment</span>"
                }
              </div>
            </div>
          </td>
        `;
        tableBody.appendChild(tr);
      });
    }

    tableBody.addEventListener("input", (event) => {
      const rowEl = event.target.closest("tr");
      if (!rowEl) return;
      const rowId = rowEl.dataset.rowId;
      const field = event.target.dataset.field;
      const row = rows.find((item) => item.id === rowId);
      if (!row || !field) return;
      row[field] = event.target.value;
      persistRows();
    });

    tableBody.addEventListener("change", (event) => {
      const rowEl = event.target.closest("tr");
      if (!rowEl) return;
      const rowId = rowEl.dataset.rowId;
      const field = event.target.dataset.field;
      const row = rows.find((item) => item.id === rowId);
      if (!row) return;
      if (event.target.type === "checkbox") {
        row[field] = event.target.checked;
      } else if (field) {
        row[field] = event.target.value;
      }
      persistRows();
    });

    tableBody.addEventListener("click", (event) => {
      const button = event.target.closest("button[data-action='attach']");
      if (!button) return;
      const rowEl = button.closest("tr");
      attachmentTargetRow = rowEl?.dataset.rowId || null;
      if (!attachmentTargetRow) return;
      attachmentInput.click();
    });

    attachmentInput.addEventListener("change", () => {
      const file = attachmentInput.files?.[0];
      if (!file || !attachmentTargetRow) return;
      const targetRow = rows.find((row) => row.id === attachmentTargetRow);
      if (!targetRow) return;
      const previousUrl = targetRow.attachment;
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl);
      }
      const objectUrl = URL.createObjectURL(file);
      targetRow.attachment = objectUrl;
      attachmentUrls.set(attachmentTargetRow, objectUrl);
      renderRows();
      persistRows();
      attachmentInput.value = "";
      attachmentTargetRow = null;
    });

    addRowBtn.addEventListener("click", () => {
      rows.push({
        id: crypto.randomUUID(),
        kit: "New kit",
        grade: "HG",
        status: "Queued",
        notes: "",
        audited: false,
        attachment: null,
      });
      renderRows();
      persistRows();
    });

    importCsvBtn?.addEventListener("click", () => {
      hiddenCsvInput.click();
    });

    hiddenCsvInput.addEventListener("change", () => {
      const file = hiddenCsvInput.files?.[0];
      if (!file) return;
      file
        .text()
        .then((text) => {
          const parsed = text
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter(Boolean)
            .slice(1)
            .map((line) => line.split(","));
          parsed.forEach((cells) => {
            if (cells.length < 4) return;
            rows.push({
              id: crypto.randomUUID(),
              kit: cells[0],
              grade: cells[1] || "HG",
              status: cells[2] || "Queued",
              notes: cells[3] || "",
              audited: false,
              attachment: null,
            });
          });
          renderRows();
          persistRows();
          safeFeedback("Imported manifest CSV", { state: "success" });
          hiddenCsvInput.value = "";
        })
        .catch((error) => {
          console.error("Failed to import CSV", error);
          safeFeedback("CSV import failed", { state: "error" });
        });
    });

    syncBtn?.addEventListener("click", async () => {
      const config = window.APP_CONFIG?.inventorySync || {};
      const targets = [
        { type: "sheets", url: config.googleSheetsWebhook },
        { type: "notion", url: config.notionWebhook },
      ].filter((target) => Boolean(target.url));
      if (!targets.length) {
        syncStatusEl.textContent = "No remote endpoints configured.";
        safeFeedback("Add webhook URLs in config.js to enable sync", {
          state: "error",
        });
        return;
      }
      syncStatusEl.textContent = "Syncing...";
      const payload = {
        updatedAt: new Date().toISOString(),
        rows,
      };
      const results = await Promise.allSettled(
        targets.map((target) =>
          fetch(target.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        )
      );
      const failed = results.filter(
        (result) => result.status === "rejected"
      ).length;
      syncStatusEl.textContent =
        failed === 0
          ? "Synced successfully."
          : `Partial failure (${failed} endpoint${failed > 1 ? "s" : ""}).`;
      safeFeedback(syncStatusEl.textContent, {
        state: failed === 0 ? "success" : "error",
      });
    });

    renderRows();
  }
  /* -------------------------------------------------------------------------- */
  /*                         SCENARIO BUILDER / LAB                             */
  /* -------------------------------------------------------------------------- */
  function initScenarioLab() {
    const nameInput = document.getElementById("scenarioNameInput");
    const budgetInput = document.getElementById("scenarioBudgetInput");
    const shockInput = document.getElementById("scenarioShockInput");
    const budgetValue = document.getElementById("scenarioBudgetValue");
    const shockValue = document.getElementById("scenarioShockValue");
    const randomizeBtn = document.getElementById("scenarioRandomizeBtn");
    const saveBtn = document.getElementById("scenarioSaveBtn");
    const loadBtn = document.getElementById("scenarioLoadBtn");
    const deleteBtn = document.getElementById("scenarioDeleteBtn");
    const select = document.getElementById("scenarioLibrarySelect");
    const chartCanvas = document.getElementById("scenarioOutcomeChart");
    const logList = document.getElementById("scenarioEventLog");
    const logClearBtn = document.getElementById("scenarioLogClearBtn");

    if (
      !nameInput ||
      !budgetInput ||
      !shockInput ||
      !chartCanvas ||
      !logList
    ) {
      return;
    }

    const STORAGE_KEY = "hangar.scenarioLibrary.v1";
    let scenarioChart = null;
    const logs = [];

    function updateOutputs() {
      budgetValue.textContent = `${budgetInput.value}k`;
      shockValue.textContent = `${shockInput.value}%`;
    }

    function buildScenarioData(budget, shock) {
      const months = 12;
      const base = budget * 1000;
      const volatility = shock / 100;
      let runningValue = base;
      const data = [];
      const labels = [];
      for (let month = 1; month <= months; month++) {
        const randomDrift = (Math.random() - 0.5) * volatility * base * 0.1;
        runningValue =
          runningValue * (1 + 0.01 * (1 - volatility)) +
          randomDrift +
          budget * 150;
        data.push(Math.max(runningValue, 0));
        labels.push(`M${month}`);
      }
      const optimistic = data.map((value) => value * (1 + volatility * 0.4));
      const pessimistic = data.map((value) => value * (1 - volatility * 0.4));
      return { labels, data, optimistic, pessimistic };
    }

    function renderChart() {
      if (!window.Chart) {
        console.warn("Chart.js not available for scenario lab");
        return;
      }
      const budget = Number(budgetInput.value);
      const shock = Number(shockInput.value);
      const scenarioData = buildScenarioData(budget, shock);
      if (scenarioChart) scenarioChart.destroy();
      scenarioChart = new Chart(chartCanvas, {
        type: "line",
        data: {
          labels: scenarioData.labels,
          datasets: [
            {
              label: "Median outcome",
              data: scenarioData.data,
              borderColor: "#60a5fa",
              backgroundColor: "#60a5fa33",
              tension: 0.3,
              fill: false,
            },
            {
              label: "Optimistic",
              data: scenarioData.optimistic,
              borderColor: "#34d399",
              borderDash: [6, 4],
              tension: 0.2,
              fill: false,
            },
            {
              label: "Pessimistic",
              data: scenarioData.pessimistic,
              borderColor: "#f87171",
              borderDash: [4, 4],
              tension: 0.2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          interaction: { intersect: false, mode: "index" },
          scales: {
            y: {
              ticks: {
                callback: (value) => currencyFormatter.format(value),
              },
            },
          },
        },
      });
    }

    function log(message) {
      const timestamp = new Date().toLocaleTimeString();
      logs.unshift({ timestamp, message });
      const entry = document.createElement("li");
      entry.innerHTML = `<span>${timestamp}</span><p>${message}</p>`;
      logList.prepend(entry);
      while (logList.children.length > 6) {
        logList.removeChild(logList.lastElementChild);
        logs.pop();
      }
    }

    function loadLibrary() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        return Array.isArray(parsed) ? parsed : [];
      } catch (error) {
        console.warn("Failed to parse scenario library", error);
        return [];
      }
    }

    function saveLibrary(items) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.warn("Failed to save scenario library", error);
      }
    }

    function refreshSelect() {
      const library = loadLibrary();
      select.innerHTML =
        '<option value="">Scenario library</option>' +
        library
          .map(
            (scenario) =>
              `<option value="${scenario.name}">${scenario.name}</option>`
          )
          .join("");
    }

    randomizeBtn?.addEventListener("click", () => {
      budgetInput.value = String(50 + Math.round(Math.random() * 400));
      shockInput.value = String(Math.round(Math.random() * 100));
      updateOutputs();
      renderChart();
      log("Randomized scenario inputs");
    });

    budgetInput.addEventListener("input", () => {
      updateOutputs();
      renderChart();
    });
    shockInput.addEventListener("input", () => {
      updateOutputs();
      renderChart();
    });

    saveBtn?.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (!name) {
        safeFeedback("Add a scenario name before saving", { state: "error" });
        return;
      }
      const library = loadLibrary();
      const existingIndex = library.findIndex(
        (scenario) => scenario.name === name
      );
      const payload = {
        name,
        budget: Number(budgetInput.value),
        shock: Number(shockInput.value),
      };
      if (existingIndex >= 0) {
        library[existingIndex] = payload;
      } else {
        library.push(payload);
      }
      saveLibrary(library);
      refreshSelect();
      select.value = name;
      safeFeedback(`Saved scenario "${name}"`, { state: "success" });
      log(`Scenario "${name}" stored`);
    });

    loadBtn?.addEventListener("click", () => {
      const name = select.value;
      if (!name) return;
      const scenario = loadLibrary().find((item) => item.name === name);
      if (!scenario) return;
      budgetInput.value = scenario.budget;
      shockInput.value = scenario.shock;
      nameInput.value = scenario.name;
      updateOutputs();
      renderChart();
      log(`Loaded scenario "${name}"`);
    });

    deleteBtn?.addEventListener("click", () => {
      const name = select.value;
      if (!name) return;
      const filtered = loadLibrary().filter((item) => item.name !== name);
      saveLibrary(filtered);
      refreshSelect();
      safeFeedback(`Deleted scenario "${name}"`, { state: "success" });
      log(`Scenario "${name}" removed from library`);
    });

    logClearBtn?.addEventListener("click", () => {
      logList.innerHTML = "";
      logs.length = 0;
    });

    updateOutputs();
    renderChart();
    refreshSelect();
  }
  /* -------------------------------------------------------------------------- */
  /*                        SUPPLY LOGISTICS ENHANCER                           */
  /* -------------------------------------------------------------------------- */
  function initLogisticsEnhancer() {
    const grid = document.getElementById("logisticsHeatmapGrid");
    const thresholdInput = document.getElementById("logisticsThresholdInput");
    const refreshBtn = document.getElementById("logisticsRefreshBtn");
    const csvBtn = document.getElementById("logisticsCsvBtn");
    const csvInput = document.getElementById("logisticsCsvInput");
    const discordToggle = document.getElementById("logisticsDiscordToggle");
    const emailToggle = document.getElementById("logisticsEmailToggle");
    const testAlertBtn = document.getElementById("logisticsTestAlertBtn");
    const statusEl = document.getElementById("logisticsAlertStatus");

    if (!grid || !thresholdInput || !csvInput || !statusEl) {
      return;
    }

    const DEFAULT_LANES = [
      { lane: "Earth HQ -> Side 7", leadTime: 7, fill: 68, status: "On time" },
      { lane: "Luna II -> Colony 1", leadTime: 12, fill: 32, status: "Delayed" },
      { lane: "Granite Base -> Jaburo", leadTime: 5, fill: 85, status: "On time" },
      { lane: "Factory Block C -> Side 3", leadTime: 18, fill: 22, status: "Critical" },
      { lane: "Orbital Drydock -> Anaheim", leadTime: 9, fill: 54, status: "Nominal" },
      { lane: "Side 6 -> Forward Point", leadTime: 14, fill: 41, status: "Delayed" },
    ];

    const logisticsConfig = window.APP_CONFIG?.logistics || {};

    const state = {
      lanes: [...DEFAULT_LANES],
      discordEnabled: false,
      emailEnabled: false,
    };

    function classifyLane(lane) {
      const threshold = Number(thresholdInput.value) || 25;
      if (lane.fill <= threshold) return "critical";
      if (lane.leadTime >= 14 || /delayed/i.test(lane.status)) return "warning";
      return "good";
    }

    function renderHeatmap() {
      grid.innerHTML = "";
      state.lanes.forEach((lane) => {
        const severity = classifyLane(lane);
        const cell = document.createElement("div");
        cell.className = `logistics-heatmap__cell logistics-heatmap__cell--${severity}`;
        cell.innerHTML = `
          <div>
            <p>${lane.lane}</p>
            <span>${lane.status}</span>
          </div>
          <dl>
            <div>
              <dt>Lead</dt>
              <dd>${lane.leadTime}d</dd>
            </div>
            <div>
              <dt>Fill</dt>
              <dd>${lane.fill}%</dd>
            </div>
          </dl>
        `;
        grid.appendChild(cell);

        if (severity === "critical") {
          triggerAlerts("critical", lane);
        }
      });
    }

    function triggerAlerts(level, lane) {
      if (level !== "critical") return;
      const configured = [];
      if (state.discordEnabled && logisticsConfig.discordWebhook) {
        configured.push({
          type: "Discord",
          url: logisticsConfig.discordWebhook,
        });
      }
      if (state.emailEnabled && logisticsConfig.emailWebhook) {
        configured.push({
          type: "Email",
          url: logisticsConfig.emailWebhook,
        });
      }
      if (!configured.length) {
        statusEl.textContent =
          "Critical lane detected but no alert relays configured.";
        return;
      }
      statusEl.textContent = `Alerting ${configured
        .map((endpoint) => endpoint.type)
        .join(" + ")} for ${lane.lane}`;
      const payload = {
        severity: level,
        lane,
        triggeredAt: new Date().toISOString(),
      };
      configured.forEach((endpoint) => {
        fetch(endpoint.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((error) => {
          console.warn(`Failed to push ${endpoint.type} alert`, error);
        });
      });
    }

    function refreshRandomData() {
      state.lanes = state.lanes.map((lane) => ({
        ...lane,
        leadTime: Math.max(3, Math.round(lane.leadTime + (Math.random() - 0.5) * 4)),
        fill: Math.max(5, Math.min(100, Math.round(lane.fill + (Math.random() - 0.5) * 15))),
        status:
          lane.fill < Number(thresholdInput.value || 25)
            ? "Critical"
            : lane.leadTime > 14
            ? "Delayed"
            : "On time",
      }));
      renderHeatmap();
    }

    thresholdInput.addEventListener("input", () => {
      renderHeatmap();
    });

    refreshBtn?.addEventListener("click", () => {
      refreshRandomData();
      safeFeedback("Refreshed logistics lanes", { state: "success" });
    });

    csvBtn?.addEventListener("click", () => {
      csvInput.click();
    });

    csvInput.addEventListener("change", () => {
      const file = csvInput.files?.[0];
      if (!file) return;
      file
        .text()
        .then((text) => {
          const lines = text.split(/\r?\n/).filter(Boolean);
          const entries = lines.slice(1).map((line) => {
            const [lane, leadTime, fill, status] = line.split(",");
            return {
              lane: lane?.trim() || "Unnamed lane",
              leadTime: Number(leadTime) || 0,
              fill: Number(fill) || 0,
              status: status?.trim() || "Unknown",
            };
          });
          if (entries.length) {
            state.lanes = entries;
            renderHeatmap();
            safeFeedback("Imported logistics CSV", { state: "success" });
          }
          csvInput.value = "";
        })
        .catch((error) => {
          console.error("Logistics CSV import failed", error);
          safeFeedback("Failed to import logistics CSV", { state: "error" });
        });
    });

    discordToggle?.addEventListener("change", (event) => {
      state.discordEnabled = event.target.checked;
    });
    emailToggle?.addEventListener("change", (event) => {
      state.emailEnabled = event.target.checked;
    });

    testAlertBtn?.addEventListener("click", () => {
      triggerAlerts("critical", {
        lane: "Test Lane",
        leadTime: 12,
        fill: Number(thresholdInput.value || 25) - 5,
        status: "Test fire",
      });
    });

    renderHeatmap();
  }
})();
