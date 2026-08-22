// Live Claude portfolio analysis. Calls the Anthropic Messages API directly
// from the browser using a key the user pastes into the Action Center's
// Data Sources panel (localStorage only -- see README "Market data and
// secret handling" for why GitHub Pages can never hold a shared key here).
// This file is a classic <script> (not a Vite module), so it uses fetch()
// against the REST API rather than the @anthropic-ai/sdk npm package.

var AI_ANALYSIS_KEY_STORAGE_KEY = "hangar.claudeApiKey";
var AI_ANALYSIS_CACHE_KEY = "hangar.claudeAnalysisResult";
var AI_ANALYSIS_CACHE_TTL_MS = 1000 * 60 * 60 * 12;
var AI_ANALYSIS_MODEL = "claude-opus-5";
var AI_ANALYSIS_API_URL = "https://api.anthropic.com/v1/messages";
var AI_ANALYSIS_KEY_EVENT = "claude-api-key-changed";

var AI_ANALYSIS_SECTIONS = [
  { key: "overview", prefix: "overview-ai" },
  { key: "allocation", prefix: "allocation-ai" },
  { key: "analytics", prefix: "analytics-ai" },
  { key: "performance", prefix: "performance-ai" },
];

function getClaudeApiKey() {
  if (typeof localStorage === "undefined") return "";
  try {
    return String(localStorage.getItem(AI_ANALYSIS_KEY_STORAGE_KEY) || "").trim();
  } catch (error) {
    console.warn("Unable to read Claude API key from storage", error);
    return "";
  }
}

function setClaudeApiKey(value) {
  if (typeof localStorage === "undefined") return;
  var sanitized = String(value || "").trim();
  try {
    if (sanitized) {
      localStorage.setItem(AI_ANALYSIS_KEY_STORAGE_KEY, sanitized);
    } else {
      localStorage.removeItem(AI_ANALYSIS_KEY_STORAGE_KEY);
    }
  } catch (error) {
    console.warn("Unable to persist Claude API key", error);
  }
  if (typeof window !== "undefined" && typeof window.dispatchEvent === "function") {
    window.dispatchEvent(
      new CustomEvent(AI_ANALYSIS_KEY_EVENT, { detail: { configured: Boolean(sanitized) } })
    );
  }
}

function isClaudeApiConfigured() {
  return Boolean(getClaudeApiKey());
}

function buildAnalysisAssetSummary(snapshot) {
  var assets = Array.isArray(snapshot && snapshot.assets) ? snapshot.assets : [];
  return assets.map(function (asset) {
    var meta = asset.metadata || {};
    return {
      ticker: asset.key,
      targetPercent: asset.targetPercent,
      currentPercent: asset.currentPercent,
      currentValue: asset.currentValue,
      price: asset.price,
      shares: asset.shares,
      expectedReturn: asset.expectedReturn,
      volatility: asset.volatility,
      beta: asset.beta,
      sector: meta.sector,
      region: meta.region,
      assetClass: meta.assetClass,
    };
  });
}

function buildAnalysisPrompt(snapshot) {
  var totalValue =
    snapshot && snapshot.totals && Number.isFinite(snapshot.totals.currentValue)
      ? snapshot.totals.currentValue
      : null;

  var payload = {
    totalCurrentValue: totalValue,
    holdings: buildAnalysisAssetSummary(snapshot),
    riskFreeRate: snapshot && snapshot.defaults && snapshot.defaults.portfolioDefaults
      ? snapshot.defaults.portfolioDefaults.riskFreeRate
      : undefined,
  };

  var system =
    "You are a long-term Roth IRA portfolio advisor reviewing a real self-directed retirement " +
    "account (buy-and-hold, decades-long horizon, not day trading). You will receive the current " +
    "holdings as JSON. Respond with ONLY a single valid JSON object, no markdown code fences, no " +
    "prose before or after. The JSON object must have exactly these four top-level keys: " +
    "\"overview\", \"allocation\", \"analytics\", \"performance\". Each key's value must be an " +
    "object with exactly these fields: \"grade\" (a short letter grade like \"A-\", \"B+\"), " +
    "\"status\" (2-3 words, e.g. \"On track\"), \"priority\" (exactly one of \"Low\", \"Medium\", " +
    "\"High\"), \"summary\" (1-2 sentences), \"focus\" (one concrete next action, 1 sentence), and " +
    "\"insights\" (an array of exactly 3 short bullet strings). \"overview\" should grade overall " +
    "portfolio health, \"allocation\" should grade drift from target weights, \"analytics\" should " +
    "grade risk/diversification/factor exposure, and \"performance\" should grade returns since " +
    "purchase relative to what a diversified long-term holder should expect. Be concise, specific, " +
    "and reference actual numbers from the data. Do not recommend day-trading or market timing.";

  var user = "Current portfolio snapshot (JSON):\n" + JSON.stringify(payload, null, 2);

  return { system: system, user: user };
}

async function callClaudeApi(apiKey, systemPrompt, userPrompt) {
  var response = await fetch(AI_ANALYSIS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: AI_ANALYSIS_MODEL,
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: "user", content: userPrompt }],
    }),
  });

  if (!response.ok) {
    var errorBody = null;
    try {
      errorBody = await response.json();
    } catch (parseError) {
      errorBody = null;
    }
    var errorMessage =
      (errorBody && errorBody.error && errorBody.error.message) ||
      "Claude API request failed (" + response.status + ")";
    throw new Error(errorMessage);
  }

  var data = await response.json();
  var textBlock = Array.isArray(data.content)
    ? data.content.find(function (block) {
        return block.type === "text";
      })
    : null;

  if (!textBlock || typeof textBlock.text !== "string") {
    throw new Error("Claude response did not include a text block.");
  }

  return textBlock.text;
}

function parseAnalysisResponse(rawText) {
  var cleaned = String(rawText || "").trim();
  // Defensive: strip a markdown fence if the model adds one despite instructions.
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();

  var parsed;
  try {
    parsed = JSON.parse(cleaned);
  } catch (parseError) {
    throw new Error("Could not parse Claude's response as JSON.");
  }

  var hasAllSections = AI_ANALYSIS_SECTIONS.every(function (section) {
    return parsed && typeof parsed[section.key] === "object" && parsed[section.key];
  });
  if (!hasAllSections) {
    throw new Error("Claude's response was missing one or more expected sections.");
  }

  return parsed;
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

function formatAiAnalysisDate(isoString) {
  var date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) +
    " " +
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

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

function renderAiSectionCard(prefix, sectionData, generatedAt) {
  var summaryEl = document.getElementById(prefix + "-summary");
  if (summaryEl) summaryEl.textContent = sectionData.summary || "";

  var focusEl = document.getElementById(prefix + "-focus");
  if (focusEl) focusEl.textContent = sectionData.focus || "";

  var scoreEl = document.getElementById(prefix + "-score");
  if (scoreEl) scoreEl.textContent = sectionData.grade || "--";

  var statusEl = document.getElementById(prefix + "-status");
  if (statusEl) statusEl.textContent = sectionData.status || "--";

  var updatedEl = document.getElementById(prefix + "-updated");
  if (updatedEl) updatedEl.textContent = formatAiAnalysisDate(generatedAt);

  var priorityEl = document.getElementById(prefix + "-priority");
  if (priorityEl) {
    priorityEl.textContent = sectionData.priority || "Pending";
    priorityEl.classList.remove.apply(priorityEl.classList, AI_ALL_PRIORITY_CLASSES);
    var nextClasses = AI_PRIORITY_CLASSES[sectionData.priority] || AI_DEFAULT_PRIORITY_CLASSES;
    priorityEl.classList.add.apply(priorityEl.classList, nextClasses);
  }

  var insightsEl = document.getElementById(prefix + "-insights-list");
  if (insightsEl && Array.isArray(sectionData.insights) && sectionData.insights.length) {
    renderAiInsightsList(insightsEl, sectionData.insights);
  }
}

function renderAiAnalysisResult(result) {
  if (!result || !result.analysis) return;
  AI_ANALYSIS_SECTIONS.forEach(function (section) {
    var sectionData = result.analysis[section.key];
    if (sectionData) {
      renderAiSectionCard(section.prefix, sectionData, result.generatedAt);
    }
  });
}

function setAiSectionsLoading(isLoading) {
  AI_ANALYSIS_SECTIONS.forEach(function (section) {
    var statusEl = document.getElementById(section.prefix + "-status");
    if (statusEl) statusEl.textContent = isLoading ? "Analyzing..." : statusEl.textContent;
  });
}

function setAiSectionsError(message) {
  AI_ANALYSIS_SECTIONS.forEach(function (section) {
    var summaryEl = document.getElementById(section.prefix + "-summary");
    if (summaryEl) summaryEl.textContent = message;
    var statusEl = document.getElementById(section.prefix + "-status");
    if (statusEl) statusEl.textContent = "Error";
  });
}

function loadCachedAiAnalysis() {
  if (typeof localStorage === "undefined") return null;
  try {
    var raw = localStorage.getItem(AI_ANALYSIS_CACHE_KEY);
    if (!raw) return null;
    var parsed = JSON.parse(raw);
    if (!parsed || !parsed.generatedAt || !parsed.analysis) return null;
    var age = Date.now() - new Date(parsed.generatedAt).getTime();
    if (!(age >= 0) || age > AI_ANALYSIS_CACHE_TTL_MS) return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function cacheAiAnalysis(result) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(AI_ANALYSIS_CACHE_KEY, JSON.stringify(result));
  } catch (error) {
    console.warn("Unable to cache Claude analysis result", error);
  }
}

async function runClaudeAnalysis() {
  var apiKey = getClaudeApiKey();
  if (!apiKey) {
    var noKeyError = new Error("Add a Claude API key in the Action Center Data Sources panel first.");
    setAiSectionsError(noKeyError.message);
    throw noKeyError;
  }

  var bridge = typeof window !== "undefined" ? window.HangarDataBridge : null;
  var snapshot =
    bridge && typeof bridge.getCurrentPortfolioSnapshot === "function"
      ? bridge.getCurrentPortfolioSnapshot()
      : null;
  if (!snapshot || !Array.isArray(snapshot.assets) || !snapshot.assets.length) {
    var noDataError = new Error("Portfolio data is not ready yet -- try again in a moment.");
    setAiSectionsError(noDataError.message);
    throw noDataError;
  }

  setAiSectionsLoading(true);

  try {
    var prompt = buildAnalysisPrompt(snapshot);
    var rawText = await callClaudeApi(apiKey, prompt.system, prompt.user);
    var analysis = parseAnalysisResponse(rawText);
    var result = { generatedAt: new Date().toISOString(), analysis: analysis };
    renderAiAnalysisResult(result);
    cacheAiAnalysis(result);
    return result;
  } catch (error) {
    setAiSectionsError(error.message || "Claude analysis failed. Try again.");
    throw error;
  }
}

function initAiAnalysisFromCache() {
  var cached = loadCachedAiAnalysis();
  if (cached) {
    renderAiAnalysisResult(cached);
  }
}

if (typeof window !== "undefined") {
  window.ClaudeAnalysis = {
    getKey: getClaudeApiKey,
    setKey: setClaudeApiKey,
    isConfigured: isClaudeApiConfigured,
    run: runClaudeAnalysis,
  };
  window.runClaudeAnalysis = runClaudeAnalysis;
}

document.addEventListener("DOMContentLoaded", initAiAnalysisFromCache);
