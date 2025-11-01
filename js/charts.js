// --- Custom plugins ---------------------------------------------------------
const donutDepthPlugin = {
  id: "donutDepth",
  afterDraw(chart, _args, pluginOptions) {
    if (chart.config.type !== "doughnut") {
      return;
    }

    const meta = chart.getDatasetMeta(0);
    if (!meta || !meta.data || meta.data.length === 0) {
      return;
    }

    const arc = meta.data[0];
    const { x, y, outerRadius, innerRadius } = arc;
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return;
    }

    const ctx = chart.ctx;
    const opts = pluginOptions || {};
    const shadowColor =
      opts.shadowColor || "rgba(15, 23, 42, 0.28)";
    const shadowBlur = opts.shadowBlur ?? 28;
    const shadowOffsetY = opts.shadowOffsetY ?? 16;
    const shadowSpread = opts.shadowSpread ?? 6;
    const highlightStrength = opts.highlightStrength ?? 0.35;
    const innerDarken = opts.innerDarken ?? 0.18;

    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    ctx.beginPath();
    ctx.arc(x, y, outerRadius + shadowSpread, 0, Math.PI * 2);
    ctx.arc(
      x,
      y,
      Math.max(innerRadius - shadowSpread * 0.6, 0),
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetY = shadowOffsetY;
    ctx.fillStyle = shadowColor;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    const highlight = ctx.createLinearGradient(
      x,
      y - outerRadius,
      x,
      y + outerRadius * 0.6
    );
    highlight.addColorStop(0, `rgba(255, 255, 255, ${highlightStrength})`);
    highlight.addColorStop(0.55, "rgba(255, 255, 255, 0.05)");
    highlight.addColorStop(1, "rgba(255, 255, 255, 0)");
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, -Math.PI, 0);
    ctx.arc(x, y, innerRadius, 0, -Math.PI, true);
    ctx.closePath();
    ctx.fillStyle = highlight;
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    const innerShade = ctx.createRadialGradient(
      x,
      y,
      Math.max(innerRadius * 0.55, 0),
      x,
      y,
      outerRadius * 1.05
    );
    innerShade.addColorStop(0, "rgba(255, 255, 255, 0.18)");
    innerShade.addColorStop(0.55, "rgba(255, 255, 255, 0.02)");
    innerShade.addColorStop(1, `rgba(15, 23, 42, ${innerDarken})`);
    ctx.beginPath();
    ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
    ctx.arc(x, y, innerRadius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = innerShade;
    ctx.fill();
    ctx.restore();

    const outerRim = ctx.createLinearGradient(
      x,
      y - outerRadius,
      x,
      y + outerRadius
    );
    outerRim.addColorStop(0, "rgba(255, 255, 255, 0.65)");
    outerRim.addColorStop(0.4, "rgba(148, 163, 184, 0.18)");
    outerRim.addColorStop(1, "rgba(15, 23, 42, 0.35)");

    ctx.save();
    ctx.lineWidth = opts.outerRimWidth ?? 5;
    ctx.strokeStyle = outerRim;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, outerRadius - (opts.outerRimInset ?? 1.5), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    const innerRim = ctx.createLinearGradient(
      x,
      y - innerRadius,
      x,
      y + innerRadius
    );
    innerRim.addColorStop(0, "rgba(255, 255, 255, 0.55)");
    innerRim.addColorStop(0.5, "rgba(15, 23, 42, 0.18)");
    innerRim.addColorStop(1, "rgba(15, 23, 42, 0.35)");

    ctx.save();
    ctx.lineWidth = opts.innerRimWidth ?? 4;
    ctx.strokeStyle = innerRim;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(x, y, innerRadius + (opts.innerRimInset ?? 1.25), 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  },
};

Chart.register(donutDepthPlugin);

// --- CHART & SIMULATION FUNCTIONS ---
function updateAllocationChart(labels, data, title, totalPercent) {
  const ctxAlloc = document
    .getElementById("allocationChart")
    .getContext("2d");

  const currentPercents = {};
  assetKeys.forEach(key => {
    const inputEl = document.querySelector(
      `input[data-stock="${key}"][data-field="currentPercent"]`
    );
    const rawValue = parseFloat(inputEl ? inputEl.value : initialStockData[key].currentPercent);
    currentPercents[key] = Number.isFinite(rawValue) ? rawValue / 100 : 0;
  });

  const activeHoldings = [];

  Object.keys(currentPercents).forEach(key => {
    const percentage = currentPercents[key] * 100;
    if (percentage <= 0.0001) {
      return;
    }
    const meta = initialStockData[key] || {};
    const exposure = (meta.exposureCategory || 'us').toLowerCase();
    activeHoldings.push({ ticker: key, percent: percentage, exposure });
  });

  activeHoldings.sort((a, b) => b.percent - a.percent);

  const totalHoldings = activeHoldings.length;
  const usHoldings = activeHoldings.filter(h => h.exposure === 'us');
  const internationalHoldings = activeHoldings.filter(
    h => h.exposure === 'international'
  );
  const alternativeHoldings = activeHoldings.filter(
    h => h.exposure === 'alternative'
  );

  const fallbackCount = Object.keys(currentPercents).length;
  const assetCountEl = document.getElementById('allocationAssetCount');
  const usCountEl = document.getElementById('usStockCount');
  const intlCountEl = document.getElementById('intlStockCount');
  const altCountEl = document.getElementById('altAssetCount');

  if (assetCountEl) {
    assetCountEl.textContent = (totalHoldings || fallbackCount).toString();
  }
  if (usCountEl) {
    usCountEl.textContent = usHoldings.length.toString();
  }
  if (intlCountEl) {
    intlCountEl.textContent = internationalHoldings.length.toString();
  }
  if (altCountEl) {
    altCountEl.textContent = alternativeHoldings.length.toString();
  }

  const exposureLabel = (exposure) => {
    switch (exposure) {
      case 'international':
        return 'International';
      case 'alternative':
        return 'Alternative';
      default:
        return 'US';
    }
  };

  renderMetricList(
    document.getElementById('allocationAssetList'),
    activeHoldings.map((entry) => ({
      primary: entry.ticker,
      secondary: exposureLabel(entry.exposure),
      meta: `${entry.percent.toFixed(1)}%`,
    })),
    'No active holdings.'
  );
  renderMetricList(
    document.getElementById('allocationUSList'),
    usHoldings.map((entry) => ({
      primary: entry.ticker,
      meta: `${entry.percent.toFixed(1)}%`,
    })),
    'No US stocks in allocation.'
  );
  renderMetricList(
    document.getElementById('allocationIntlList'),
    internationalHoldings.map((entry) => ({
      primary: entry.ticker,
      meta: `${entry.percent.toFixed(1)}%`,
    })),
    'No international stocks in allocation.'
  );
  renderMetricList(
    document.getElementById('allocationAltList'),
    alternativeHoldings.map((entry) => ({
      primary: entry.ticker,
      meta: `${entry.percent.toFixed(1)}%`,
    })),
    'No alternative allocation yet.'
  );

  // Populate top holdings list
  const topHoldingsList = document.getElementById('topHoldingsList');
  if (topHoldingsList) {
    const sortedHoldings = Object.entries(currentPercents)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    topHoldingsList.innerHTML = sortedHoldings.map(([ticker, percentage]) => `
      <div class="flex items-center justify-between py-2">
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 bg-green-500 rounded-full"></div>
          <span class="font-medium text-gray-900 dark:text-white">${ticker}</span>
        </div>
        <span class="text-sm font-bold text-gray-600 dark:text-gray-400">${(percentage * 100).toFixed(1)}%</span>
      </div>
    `).join('');
  }

  if (Math.abs(totalPercent - 100) > 0.1) {
    if (chartInstance) chartInstance.destroy();
    chartInstance = null;
    ctxAlloc.clearRect(
      0,
      0,
      ctxAlloc.canvas.width,
      ctxAlloc.canvas.height
    );
    ctxAlloc.font = "18px Inter";
    ctxAlloc.fillStyle = isDarkMode ? "#e5e7eb" : "#1f2937";
    ctxAlloc.textAlign = "center";
    ctxAlloc.fillText(
      "? Total Allocation % is not 100%",
      ctxAlloc.canvas.width / 2,
      ctxAlloc.canvas.height / 2
    );
    return;
  }

  const newPortfolioData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: [
          "#0f766e", // deep teal (VOO)
          "#b91c1c", // crimson (VXUS)
          "#b45309", // burnt orange (AVUV)
          "#0ea5e9", // vivid sky (AVDV)
          "#1d4ed8", // royal blue (SPMO)
          "#7c2d12", // dark copper (AMZN)
        ],
        hoverBackgroundColor: [
          "#14b8a6",
          "#dc2626",
          "#d97706",
          "#38bdf8",
          "#2563eb",
          "#9a3412",
        ],
        borderColor: isDarkMode
          ? "rgba(191, 219, 254, 0.5)"
          : "rgba(15, 23, 42, 0.18)",
        borderWidth: 3,
        borderAlign: "center",
        hoverOffset: 10,
        spacing: 2.5,
        hoverBorderColor: isDarkMode
          ? "rgba(224, 242, 254, 0.7)"
          : "rgba(15, 23, 42, 0.2)",
        hoverBorderWidth: 3,
      },
    ],
  };

  const donutDepthOptions = {
    shadowBlur: isDarkMode ? 38 : 28,
    shadowOffsetY: isDarkMode ? 22 : 18,
    shadowColor: isDarkMode
      ? "rgba(7, 89, 133, 0.45)"
      : "rgba(15, 23, 42, 0.26)",
    shadowSpread: 9,
    highlightStrength: isDarkMode ? 0.6 : 0.68,
    innerDarken: isDarkMode ? 0.18 : 0.14,
    outerRimWidth: isDarkMode ? 5 : 4.5,
    outerRimInset: 1.5,
    innerRimWidth: isDarkMode ? 4 : 3.5,
    innerRimInset: 1,
  };

  if (chartInstance) {
    chartInstance.data = newPortfolioData;
    chartInstance.options.plugins.legend.labels.color = isDarkMode
      ? "#e5e7eb"
      : "#1f2937";
    chartInstance.options.plugins.legend.labels.font.size = 12;
    chartInstance.options.plugins.legend.labels.padding = 16;
    chartInstance.options.plugins.legend.labels.boxWidth = 14;
    chartInstance.options.plugins.legend.labels.boxHeight = 12;
    chartInstance.options.plugins.title.text = title;
    chartInstance.options.plugins.title.color = isDarkMode
      ? "#e5e7eb"
      : "#1f2937";
    chartInstance.options.plugins.donutDepth = donutDepthOptions;
    chartInstance.options.radius = "92%";
    chartInstance.options.cutout = "56%";
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctxAlloc, {
      type: "doughnut",
      data: newPortfolioData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: title,
            color: isDarkMode ? "#e5e7eb" : "#1f2937",
            font: { size: 18, family: "Inter", weight: "600" },
          },
          legend: {
            position: "bottom",
            labels: {
              font: { size: 12, family: "Inter" },
              padding: 16,
              boxWidth: 14,
              boxHeight: 12,
              usePointStyle: false,
              color: isDarkMode ? "#e5e7eb" : "#1f2937",
            },
          },
          tooltip: {
            callbacks: { label: (context) => context.label },
            backgroundColor: isDarkMode
              ? "#0a0a0a"
              : "rgba(0, 0, 0, 0.8)",
            titleFont: { size: 16, weight: "bold" },
          },
          donutDepth: donutDepthOptions,
        },
        radius: "92%",
        cutout: "56%",
      },
    });
  }
}

function runSimulation() {
  const initialInput = document.getElementById("initial");
  const currentTotalDisplay = document.getElementById("currentTotalValueDisplay");

  const parsedInitialFromInput = initialInput
    ? parseFloat((initialInput.value || "").toString().replace(/[$,]/g, ""))
    : NaN;
  const fallbackInitial = currentTotalDisplay
    ? parseFloat((currentTotalDisplay.textContent || "").replace(/[$,]/g, ""))
    : NaN;

  const initial = Number.isFinite(parsedInitialFromInput) && parsedInitialFromInput > 0
    ? parsedInitialFromInput
    : Number.isFinite(fallbackInitial) && fallbackInitial > 0
    ? fallbackInitial
    : 0;

  const monthly = parseFloat(document.getElementById("monthly")?.value) || 0;
  const annualRatePct = parseFloat(document.getElementById("rate")?.value) || 0;
  let years = parseInt(document.getElementById("years")?.value, 10);
  if (!Number.isFinite(years) || years < 1) years = 36;
  years = Math.min(Math.max(years, 1), 100);

  const totalMonths = years * 12;
  const monthlyRate =
    annualRatePct > -100
      ? Math.pow(1 + annualRatePct / 100, 1 / 12) - 1
      : 0;

  const labels = ["Year 0"];
  const totalValueData = [initial];
  const contributionsData = [initial];
  const yearlyGrowthData = [0];

  let currentValue = initial;
  let totalContributions = initial;
  let breakEvenMilestone = null;
  let millionMilestone = null;

  for (let month = 1; month <= totalMonths; month++) {
    currentValue = currentValue * (1 + monthlyRate) + monthly;
    totalContributions += monthly;

    if (month % 12 === 0) {
      const priorYearValue =
        totalValueData[totalValueData.length - 1] ?? currentValue;
      labels.push(`Year ${month / 12}`);
      totalValueData.push(currentValue);
      contributionsData.push(totalContributions);

      const growthOnly = Math.max(currentValue - totalContributions, 0);
      yearlyGrowthData.push(currentValue - priorYearValue);

      const dataIndex = totalValueData.length - 1;

      if (
        !breakEvenMilestone &&
        currentValue >= totalContributions * 2 &&
        dataIndex > 0
      ) {
        breakEvenMilestone = {
          index: dataIndex,
          label: "Growth takes the lead",
          value: currentValue,
        };
      }

      if (!millionMilestone && currentValue >= 1_000_000) {
        millionMilestone = {
          index: dataIndex,
          label: "$1M milestone",
          value: currentValue,
        };
      }
    }
  }

  const finalIndex = totalValueData.length - 1;
  const milestoneMarkers = [
    breakEvenMilestone,
    millionMilestone,
    {
      index: finalIndex,
      label: `${years}-year horizon`,
      value: totalValueData[finalIndex],
    },
  ].filter(Boolean);

  if (growthChartInstance) {
    growthChartInstance.destroy();
  }

  const ctxGrowth = document.getElementById("growthChart").getContext("2d");

  const hoverLinePlugin = {
    id: "growthHoverLine",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const tooltip = chart.tooltip;
      const activeElements =
        (tooltip &&
          typeof tooltip.getActiveElements === "function" &&
          tooltip.getActiveElements()) ||
        tooltip?._active ||
        [];

      if (!activeElements.length) return;

      const { ctx, chartArea } = chart;
      const [{ element }] = activeElements;
      if (!element) return;

      ctx.save();
      ctx.setLineDash(pluginOptions?.dash || [4, 6]);
      ctx.lineWidth = pluginOptions?.lineWidth || 1;
      ctx.strokeStyle =
        pluginOptions?.color ||
        (isDarkMode
          ? "rgba(96, 165, 250, 0.35)"
          : "rgba(14, 165, 233, 0.45)");
      ctx.beginPath();
      ctx.moveTo(element.x, chartArea.top);
      ctx.lineTo(element.x, chartArea.bottom);
      ctx.stroke();
      ctx.restore();
    },
  };

  const milestonePlugin = {
    id: "growthMilestones",
    afterDatasetsDraw(chart, args, pluginOptions) {
      const markerConfig = pluginOptions?.milestones || [];
      if (!markerConfig.length) return;

      const datasetIndex = pluginOptions?.datasetIndex ?? 2;
      const meta = chart.getDatasetMeta(datasetIndex);
      if (!meta) return;

      const { ctx } = chart;
      ctx.save();

      markerConfig.forEach((marker) => {
        const element = meta.data[marker.index];
        if (!element) return;

        const { x, y } = element.tooltipPosition();
        ctx.beginPath();
        ctx.fillStyle =
          marker.pointColor ||
          (isDarkMode ? "rgba(82, 208, 220, 0.4)" : "rgba(255, 106, 26, 0.35)");
        ctx.shadowColor =
          marker.glowColor ||
          (isDarkMode ? "rgba(255, 106, 26, 0.42)" : "rgba(82, 208, 220, 0.28)");
        ctx.shadowBlur = 14;
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.font = "11px Inter";
        ctx.textAlign = "center";
        ctx.fillStyle = isDarkMode ? "#f9fafb" : "#0f172a";
        ctx.fillText(marker.label, x, y - 18);
        ctx.fillStyle =
          marker.valueColor || (isDarkMode ? "#52d0d3" : "#ff6a1a");
        ctx.fillText(currencyFormatter.format(marker.value), x, y - 6);
      });

      ctx.restore();
    },
  };

  growthChartInstance = new Chart(ctxGrowth, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Yearly Growth",
          data: yearlyGrowthData,
          backgroundColor: isDarkMode
            ? "rgba(14, 165, 233, 0.28)"
            : "rgba(2, 132, 199, 0.22)",
          borderRadius: 6,
          order: 0,
          barPercentage: 0.65,
          categoryPercentage: 0.9,
          yAxisID: "y",
        },
        {
          id: "totalContributions",
          label: "Cumulative Contributions",
          data: contributionsData,
          borderColor: isDarkMode ? "#60a5fa" : "#2563eb",
          borderDash: [6, 6],
          borderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 7,
          pointBackgroundColor: isDarkMode ? "#1d4ed8" : "#1d4ed8",
          pointBorderColor: "transparent",
          fill: false,
          tension: 0.25,
          order: 1,
        },
        {
          id: "projectedValue",
          label: "Estimated Portfolio Value",
          data: totalValueData,
          borderColor: isDarkMode ? "#34d399" : "#059669",
          borderWidth: 3,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointBackgroundColor: isDarkMode ? "#10b981" : "#10b981",
          pointBorderColor: isDarkMode ? "#0b7449" : "#0b7449",
          pointHoverBorderWidth: 2,
          pointHitRadius: 12,
          tension: 0.4,
          fill: { target: "totalContributions" },
          backgroundColor: (context) => {
            const { ctx, chartArea } = context.chart;
            if (!chartArea) {
              return isDarkMode
                ? "rgba(82, 208, 220, 0.22)"
                : "rgba(255, 106, 26, 0.16)";
            }
            const gradient = ctx.createLinearGradient(
              0,
              chartArea.bottom,
              0,
              chartArea.top
            );
            gradient.addColorStop(
              0,
              isDarkMode
                ? "rgba(8, 15, 26, 0.08)"
                : "rgba(248, 250, 255, 0.06)"
            );
            gradient.addColorStop(
              0.55,
              isDarkMode
                ? "rgba(82, 208, 220, 0.22)"
                : "rgba(255, 106, 26, 0.2)"
            );
            gradient.addColorStop(
              1,
              isDarkMode
                ? "rgba(255, 106, 26, 0.32)"
                : "rgba(82, 208, 220, 0.3)"
            );
            return gradient;
          },
          order: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: "index", intersect: false },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => currencyFormatter.format(value),
            color: isDarkMode ? "#e5e7eb" : "#1f2937",
            maxTicksLimit: 8,
          },
          grid: {
            color: isDarkMode
              ? "rgba(255, 255, 255, 0.08)"
              : "rgba(15, 23, 42, 0.08)",
          },
        },
        x: {
          ticks: {
            color: isDarkMode ? "#e5e7eb" : "#1f2937",
            maxRotation: 0,
            autoSkipPadding: 24,
          },
          grid: {
            color: isDarkMode
              ? "rgba(255, 255, 255, 0.04)"
              : "rgba(15, 23, 42, 0.04)",
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: isDarkMode ? "#e5e7eb" : "#1f2937",
            font: { size: 12, family: "Inter" },
            padding: 16,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: isDarkMode
            ? "#0a0f1f"
            : "rgba(15, 23, 42, 0.92)",
          borderColor: isDarkMode
            ? "rgba(82, 208, 220, 0.35)"
            : "rgba(255, 106, 26, 0.25)",
          borderWidth: 1,
          titleFont: { size: 14, weight: "600" },
          bodyFont: { size: 12 },
          padding: 12,
          callbacks: {
            label: (context) => {
              const dataIndex = context.dataIndex;

              if (context.dataset.id === "totalContributions") {
                return `${context.dataset.label}: ${currencyFormatter.format(
                  contributionsData[dataIndex]
                )}`;
              }

              if (context.dataset.id === "projectedValue") {
                return `${context.dataset.label}: ${currencyFormatter.format(
                  totalValueData[dataIndex]
                )}`;
              }

              if (context.dataset.type === "bar") {
                return `${context.dataset.label}: ${currencyFormatter.format(
                  context.parsed.y
                )}`;
              }

              return `${context.dataset.label}: ${currencyFormatter.format(
                context.parsed.y
              )}`;
            },
            afterBody: (tooltipItems) => {
              if (!tooltipItems.length) return [];

              const index = tooltipItems[0].dataIndex;
              const total = totalValueData[index] ?? 0;
              const contributed = contributionsData[index] ?? 0;
              const growthOnly = Math.max(total - contributed, 0);
              const ratio =
                contributed > 0 ? (growthOnly / contributed) * 100 : 0;
              const yoyGain = yearlyGrowthData[index] ?? 0;

              return [
                `Growth gains: ${currencyFormatter.format(growthOnly)}`,
                `Year-over-year change: ${currencyFormatter.format(yoyGain)}`,
                `Growth vs. contributions: ${ratio.toFixed(1)}%`,
              ];
            },
          },
        },
        growthHoverLine: {
          color: isDarkMode
            ? "rgba(103, 232, 249, 0.4)"
            : "rgba(14, 165, 233, 0.45)",
          dash: [4, 6],
          lineWidth: 1,
        },
        growthMilestones: {
          datasetIndex: 2,
          milestones: milestoneMarkers,
        },
      },
    },
    plugins: [hoverLinePlugin, milestonePlugin],
  });

  // Enhanced result display with animation
  const resultEl = document.getElementById("simResult");
  const finalValue = totalValueData[finalIndex];
  const formattedValue = currencyFormatter.format(finalValue);
  const totalContributionAmount = currencyFormatter.format(totalContributions);
  const growthGain = finalValue - totalContributions;
  const formattedGain = currencyFormatter.format(growthGain);

  const growthMultiple =
    totalContributions > 0 ? (finalValue / totalContributions).toFixed(2) : "--";

  const milestoneSummaryParts = [`Growth Multiple: ${growthMultiple}x`];

  if (breakEvenMilestone) {
    milestoneSummaryParts.push(
      `Compounding overtakes contributions near ${labels[breakEvenMilestone.index]}`
    );
  }

  if (millionMilestone) {
    milestoneSummaryParts.push(
      `${labels[millionMilestone.index]} crosses $1M`
    );
  }

  const milestoneSummaryHtml = milestoneSummaryParts.length
    ? `
      <div class="text-xs text-gray-500 dark:text-gray-500 tracking-wide uppercase">
        ${milestoneSummaryParts.join(" | ")}
      </div>
    `
    : "";

  resultEl.innerHTML = `
    <div class="text-center space-y-2">
      <div class="text-3xl font-bold text-green-600 dark:text-green-400">
        ${formattedValue}
      </div>
      <div class="text-base text-gray-600 dark:text-gray-400 leading-snug">
        After ${years} years with ${annualRatePct.toFixed(1)}% expected return
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-500 tracking-wide uppercase">
        Initial: ${currencyFormatter.format(initial)} |
        Monthly: ${currencyFormatter.format(monthly)}
      </div>
      <div class="text-xs text-gray-500 dark:text-gray-500 tracking-wide uppercase">
        Total Contributions: ${totalContributionAmount} |
        Total Growth: ${formattedGain}
      </div>
      ${milestoneSummaryHtml}
    </div>
  `;

  // Add animation classes
  resultEl.classList.remove("opacity-0", "translate-y-4", "translate-y-1");
  resultEl.classList.add(
    "opacity-100",
    "translate-y-0",
    "transition-all",
    "duration-700"
  );
}
