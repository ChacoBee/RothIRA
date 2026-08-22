// Static analysis written by Claude on request (see README "Market data and secret handling"
// for why this stays static instead of calling a live LLM API from the browser: GitHub Pages
// is a public static deployment, so no API key can be embedded safely). Update this object by
// asking Claude in a chat session to "phan tich danh muc" / "analyze the portfolio" again.
window.AI_PORTFOLIO_ANALYSIS = {
  overview: {
    generatedAt: "2026-08-22T00:15:00Z",
    grade: "B+",
    status: "Healthy, early-stage",
    priority: "Low",
    summary:
      "Total portfolio value is about $1,800 across 6 well-chosen holdings, with every position profitable (+13% overall). The account is still in its early accumulation phase, so consistent contributions matter more than fine-tuning right now.",
    focus:
      "Keep contributing regularly -- at this account size, deposit consistency will move the needle far more than rebalancing precision.",
    insights: [
      "Total value ~$1,800, up roughly +13% since purchase across all 6 holdings.",
      "No single holding dominates unhealthily -- VOO leads at ~46% but that's by design as the core sleeve.",
      "Account is still small; growth from here depends mostly on contribution pace, not market timing.",
    ],
  },
  allocation: {
    generatedAt: "2026-08-22T00:15:00Z",
    grade: "A-",
    status: "On track",
    priority: "Low",
    summary:
      "Portfolio is closely tracking target allocation across all six holdings, with every position under a 1-percentage-point drift from target. Total unrealized gain is roughly +13% since purchase, and every holding is currently profitable.",
    focus:
      "No rebalancing needed today. VXUS, AVUV, and GOOGL are each modestly underweight (under 0.3pp) -- point the next contribution toward those three first.",
    insights: [
      "All 6 holdings sit within 0.6 percentage points of target -- no rebalancing action needed right now.",
      "Every position is currently profitable; AVDV and AVUV are the strongest gainers since purchase.",
      "Combined single-stock exposure (JNJ + GOOGL) is under 10% of the portfolio -- factor-tilted ETFs still drive most of the risk and return.",
    ],
  },
  analytics: {
    generatedAt: "2026-08-22T00:15:00Z",
    grade: "B+",
    status: "Well-diversified",
    priority: "Low",
    summary:
      "Estimated portfolio beta is close to 1.0 (~0.98), so overall volatility tracks near the broad market despite the deliberate small-cap value tilt from AVUV and AVDV. The two individual stocks (JNJ, GOOGL) add roughly 10% combined idiosyncratic risk a pure-ETF portfolio wouldn't carry.",
    focus:
      "No changes needed for risk exposure right now -- to reduce single-stock risk further over time, future contributions could lean more toward the ETF sleeves (VOO/VXUS/AVUV/AVDV) instead of JNJ/GOOGL.",
    insights: [
      "Estimated portfolio beta ~0.98 -- overall volatility tracks close to the broad market despite the factor tilts.",
      "AVUV and AVDV add a deliberate small-cap value tilt, a well-documented long-term risk premium, not speculation.",
      "JNJ (defensive, beta ~0.6) and GOOGL (growth, beta ~1.1) roughly offset each other's risk profile within the single-stock sleeve.",
    ],
  },
  performance: {
    generatedAt: "2026-08-22T00:15:00Z",
    grade: "A-",
    status: "Outperforming cost basis",
    priority: "Low",
    summary:
      "Every position is profitable since purchase, with an overall unrealized gain of roughly +13% (about $200+). Small-cap value (AVUV, AVDV) and the defensive JNJ stake are leading, while GOOGL is the relative laggard at a still-solid +6-7%, likely reflecting a higher average entry price.",
    focus:
      "No action needed -- returns are broad-based rather than concentrated in one lucky pick, which is the healthier pattern to keep for a buy-and-hold Roth IRA.",
    insights: [
      "All 6 holdings are profitable since purchase, with broad-based gains rather than one outlier carrying the portfolio.",
      "AVDV and AVUV are outperforming the core VOO sleeve, consistent with the small-cap value premium showing up as expected.",
      "GOOGL is the relative laggard, likely because it has a higher average cost basis ($323.83) than the other positions -- still a healthy gain, not a concern.",
    ],
  },
};

var AI_ANALYSIS_SECTIONS = [
  { key: "overview", prefix: "overview-ai" },
  { key: "allocation", prefix: "allocation-ai" },
  { key: "analytics", prefix: "analytics-ai" },
  { key: "performance", prefix: "performance-ai" },
];

function formatAiAnalysisDate(isoString) {
  var date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

var AI_PRIORITY_CLASSES = {
  Low: ["bg-emerald-100", "text-emerald-700", "dark:bg-emerald-900/40", "dark:text-emerald-300"],
  Medium: ["bg-amber-100", "text-amber-700", "dark:bg-amber-900/40", "dark:text-amber-300"],
  High: ["bg-rose-100", "text-rose-700", "dark:bg-rose-900/40", "dark:text-rose-300"],
};
var AI_DEFAULT_PRIORITY_CLASSES = ["bg-gray-200", "text-gray-700", "dark:bg-gray-700", "dark:text-gray-200"];
var AI_ALL_PRIORITY_CLASSES = Object.keys(AI_PRIORITY_CLASSES).reduce(function (acc, key) {
  return acc.concat(AI_PRIORITY_CLASSES[key]);
}, AI_DEFAULT_PRIORITY_CLASSES.slice());
var AI_INSIGHT_DOT_COLORS = ["bg-rose-500", "bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-amber-500"];

function renderAiInsightsList(container, insights) {
  container.innerHTML = "";
  insights.forEach(function (text, index) {
    var row = document.createElement("div");
    row.className = "flex items-start gap-2";

    var dot = document.createElement("div");
    dot.className =
      "w-2 h-2 rounded-full mt-1.5 flex-shrink-0 " +
      AI_INSIGHT_DOT_COLORS[index % AI_INSIGHT_DOT_COLORS.length];

    var textEl = document.createElement("p");
    textEl.textContent = text;

    row.appendChild(dot);
    row.appendChild(textEl);
    container.appendChild(row);
  });
}

function renderAiSectionCard(prefix, data) {
  if (!data) return;

  var summaryEl = document.getElementById(prefix + "-summary");
  if (summaryEl) summaryEl.textContent = data.summary || "";

  var focusEl = document.getElementById(prefix + "-focus");
  if (focusEl) focusEl.textContent = data.focus || "";

  var scoreEl = document.getElementById(prefix + "-score");
  if (scoreEl) scoreEl.textContent = data.grade || "--";

  var statusEl = document.getElementById(prefix + "-status");
  if (statusEl) statusEl.textContent = data.status || "--";

  var updatedEl = document.getElementById(prefix + "-updated");
  if (updatedEl) updatedEl.textContent = formatAiAnalysisDate(data.generatedAt);

  var priorityEl = document.getElementById(prefix + "-priority");
  if (priorityEl) {
    priorityEl.textContent = data.priority || "Pending";
    priorityEl.classList.remove.apply(priorityEl.classList, AI_ALL_PRIORITY_CLASSES);
    var nextClasses = AI_PRIORITY_CLASSES[data.priority] || AI_DEFAULT_PRIORITY_CLASSES;
    priorityEl.classList.add.apply(priorityEl.classList, nextClasses);
  }

  var insightsEl = document.getElementById(prefix + "-insights-list");
  if (insightsEl && Array.isArray(data.insights) && data.insights.length) {
    renderAiInsightsList(insightsEl, data.insights);
  }
}

function renderAiPortfolioAnalysis() {
  var data = window.AI_PORTFOLIO_ANALYSIS;
  if (!data) return;
  AI_ANALYSIS_SECTIONS.forEach(function (section) {
    renderAiSectionCard(section.prefix, data[section.key]);
  });
}

document.addEventListener("DOMContentLoaded", renderAiPortfolioAnalysis);
