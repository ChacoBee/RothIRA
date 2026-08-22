// Static analysis written by Claude on request (see README "Market data and secret handling"
// for why this stays static instead of calling a live LLM API from the browser: GitHub Pages
// is a public static deployment, so no API key can be embedded safely). Update this object by
// asking Claude in a chat session to "phan tich danh muc" / "analyze the portfolio" again.
window.AI_PORTFOLIO_ANALYSIS = {
  generatedAt: "2026-08-21T17:00:00Z",
  summary:
    "Portfolio is closely tracking target allocation across all six holdings, with every position under a 1-percentage-point drift from target. Total unrealized gain is +13.1% since purchase, and every holding is currently profitable.",
  focus:
    "No rebalancing needed today. VXUS, AVUV, and GOOGL are each modestly underweight (under 0.3pp) -- point the next contribution toward those three first.",
  grade: "A-",
  status: "On track",
  priority: "Low",
  insights: [
    "All 6 holdings sit within 0.6 percentage points of target -- no rebalancing action needed right now.",
    "Every position is currently profitable; AVDV (+18.6%) and JNJ (+17.6%) are the strongest gainers since purchase.",
    "Combined single-stock exposure (JNJ + GOOGL) is under 10% of the portfolio -- factor-tilted ETFs still drive most of the risk and return.",
  ],
};

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
var AI_ALL_PRIORITY_CLASSES = Object.keys(AI_PRIORITY_CLASSES)
  .reduce(function (acc, key) {
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

    var text_el = document.createElement("p");
    text_el.textContent = text;

    row.appendChild(dot);
    row.appendChild(text_el);
    container.appendChild(row);
  });
}

function renderAiPortfolioAnalysis() {
  var data = window.AI_PORTFOLIO_ANALYSIS;
  if (!data) return;

  var summaryEl = document.getElementById("allocation-ai-summary");
  if (summaryEl) summaryEl.textContent = data.summary || "";

  var focusEl = document.getElementById("allocation-ai-focus");
  if (focusEl) focusEl.textContent = data.focus || "";

  var scoreEl = document.getElementById("allocation-ai-score");
  if (scoreEl) scoreEl.textContent = data.grade || "--";

  var statusEl = document.getElementById("allocation-ai-status");
  if (statusEl) statusEl.textContent = data.status || "--";

  var updatedEl = document.getElementById("allocation-ai-updated");
  if (updatedEl) updatedEl.textContent = formatAiAnalysisDate(data.generatedAt);

  var priorityEl = document.getElementById("allocation-ai-priority");
  if (priorityEl) {
    priorityEl.textContent = data.priority || "Pending";
    priorityEl.classList.remove.apply(priorityEl.classList, AI_ALL_PRIORITY_CLASSES);
    var nextClasses = AI_PRIORITY_CLASSES[data.priority] || AI_DEFAULT_PRIORITY_CLASSES;
    priorityEl.classList.add.apply(priorityEl.classList, nextClasses);
  }

  var insightsEl = document.getElementById("allocation-insights-list");
  if (insightsEl && Array.isArray(data.insights) && data.insights.length) {
    renderAiInsightsList(insightsEl, data.insights);
  }
}

document.addEventListener("DOMContentLoaded", renderAiPortfolioAnalysis);
