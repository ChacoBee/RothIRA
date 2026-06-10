const FALLBACK_BODY_CLASS = 'transition-colors duration-300';
const SECTION_6_NEWS_SLOT = `
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
          <div id="worldStockNewsMount" class="xl:col-span-2"></div>
        </div>
`;
const SECTION_6_ID_MARKER = '<section id="advanced-tracker"';
const SECTION_6_TOP_GRID_MARKER = '<div class="grid grid-cols-1 gap-6 mb-6">';
const SECTION_6_REST_MARKER = `<div
          class="mb-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"`;
const ACTION_CENTER_MOUNT = `
      <section id="action-center" class="section mb-12" aria-labelledby="actionCenterTitle">
        <div id="portfolioActionCenterMount"></div>
      </section>
`;
const HERO_CLOSE_MARKER = '</header>';
const FINANCE_COPY_REPLACEMENTS = [
  ['Gunpla Hangar Command Console', 'Roth IRA Portfolio Command Center'],
  ['Gunpla Hangar', 'Roth IRA'],
  ['Command Hub', 'Portfolio Hub'],
  [
    'Jump between diagnostics, loadouts, and decision tools without leaving the cockpit.',
    'Move between portfolio status, allocation, rebalancing, retirement planning, and market context from one dashboard.',
  ],
  [
    'Route between diagnostics, loadouts, and supply lines without leaving the cockpit.',
    'Move between portfolio status, allocation, rebalancing, retirement planning, and market context from one dashboard.',
  ],
  ['Hangar Overview', 'Portfolio Overview'],
  ['Unit Loadout', 'Allocation'],
  ['Combat Telemetry', 'Market Chart'],
  ['Inventory Manifest', 'Holdings'],
  ['Battle Simulation', 'Retirement Projection'],
  ['Supply Logistics', 'Rebalance'],
  ['Analysis Deck', 'Analytics'],
  ['Sortie Debrief', 'Performance'],
  ['Federation Indices', 'Market Indices'],
  ['Psycho-Frame Index', 'Market Sentiment'],
  ['Side 7 Hangar  -  RX Ops', 'Roth IRA  -  Portfolio Ops'],
  ['Tan Tran  -  Hangar Chief', 'Tan Tran  -  Portfolio Owner'],
  [
    'Monitor frame integrity, supply flows, and sortie readiness for every Gunpla kit in your collection  -  all from a single operations deck.',
    'Track allocation, contribution progress, rebalancing needs, and retirement readiness for a long-term Roth IRA portfolio.',
  ],
  ['Deploy analytics deck', 'Open analytics'],
  ['Open supply logistics', 'Open rebalancing'],
  ['Frame integrity', 'Portfolio score'],
  ['Sortie readiness', 'Rebalance window'],
  ['Supply reserves', 'Contribution progress'],
  ['1. Hangar Diagnostics', '1. Portfolio Overview'],
  [
    'Run quick vitals on your Gunpla fleet  -  frame stability, pilot readiness, and resource flow  -  before launching into deeper analysis.',
    'Review portfolio value, allocation quality, income, risk, and data freshness before moving into detailed planning.',
  ],
  ['Live signal updates after telemetry loads', 'Live data updates after market sync'],
  ['2. Unit Loadout Matrix', '2. Target Allocation'],
  [
    'Compare planned loadouts versus actual deployments to see which Gunpla squads need reinforcement or part redistribution.',
    'Compare target weights against current holdings to identify drift, concentration, and rebalancing opportunities.',
  ],
  ['AI Allocation Insight', 'Allocation Insight'],
  ['AI allocation diagnostics keep your target mix on course.', 'Allocation diagnostics keep your target mix on course.'],
  [
    'AI is preparing the latest allocation review. Launch the analysis to refresh this panel.',
    'The dashboard is preparing the latest allocation review. Refresh analytics to update this panel.',
  ],
  ['Run the AI analysis to surface the next recommended action.', 'Run the allocation review to surface the next recommended action.'],
  ['AI Score', 'Allocation Score'],
  ['3. Combat Telemetry', '3. Market Chart'],
  [
    'Visualize sortie performance, damage logs, and rival benchmarks with live telemetry overlays.',
    'Review price charts, trend context, and benchmark signals for the assets in the portfolio.',
  ],
  ['4. Inventory Manifest', '4. Holdings Detail'],
  ['5. Battle Simulation Lab', '5. Retirement Projection Lab'],
  [
    'Simulate build queues, sortie frequencies, and resource shocks to see how each Gunpla responds under fire.',
    'Simulate compounding, contributions, inflation, and market shocks to understand long-term retirement outcomes.',
  ],
  ['6. Supply Logistics Deck', '6. Rebalance & Contribution Tools'],
  [
    'Stage shipments, allocate spare parts, and manage upgrade budgets across your Gunpla hangar.',
    'Plan deposits, rebalance toward target weights, and keep live holdings aligned with your Roth IRA policy.',
  ],
  [
    'Use this helper to distribute fresh supply shipments across squads while staying aligned with mission loadouts. Enter the crate value, confirm target ratios, then run the calculator to see how much to allocate to each unit.',
    'Use this helper to distribute a new contribution across holdings while staying aligned with target allocation. Enter the contribution amount, confirm target weights, then run the calculator.',
  ],
  ['Hangar Activity Log', 'Portfolio Activity Log'],
  ['7. Analysis Deck', '7. Portfolio Analytics'],
  [
    "Interrogate sortie logs, threat exposure, and diversification metrics as you tune each squad's mission profile.",
    'Review expected return, volatility, beta, drawdown risk, diversification, and factor exposure for the current allocation.',
  ],
  ['Neo Zeon Telemetry Feed', 'Portfolio Analytics Feed'],
  ['Mission Metric Console', 'Portfolio Metric Console'],
  ['Mission Mode', 'Analysis Mode'],
  ['Telemetry Feed', 'Data Feed'],
  ['Mission Timeline', 'Decision Timeline'],
  ['8. Sortie Debrief Analytics', '8. Performance Review'],
  [
    'Review sortie archives, projection bands, and rolling battle performance against your federation benchmarks.',
    'Review historical performance, projection bands, volatility, and benchmark-relative results.',
  ],
  ['9. Sector Heatmap Array', '9. Sector Heatmap'],
  [
    'Sweep battlefront sectors and global markets to spot hotspots before they impact your Gunpla supply lines.',
    'Scan sector and market performance to identify concentration risk, momentum, and broad risk-on/risk-off conditions.',
  ],
  ['10. Federation Indices Feed', '10. Market Indices'],
  [
    'Ping Earth Federation markets for live signals and stage alerts directly into your cockpit.',
    'Track major global indices, macro events, and broad-market risk signals alongside the portfolio.',
  ],
  ['Market theatre filter', 'Market region filter'],
  ['Mission readiness snapshot', 'Market readiness snapshot'],
  ['Tactical Metrics', 'Market Metrics'],
  ['Tactical Watchlist', 'Market Watchlist'],
  ['Sector Intel Briefing', 'Sector Insight Briefing'],
  ['Tactical notes adapt to the selected universe and window.', 'Market notes adapt to the selected universe and window.'],
  ['Track priority tickers alongside the heatmap. Stored locally.', 'Track priority tickers alongside the heatmap. Stored locally in this browser.'],
  ['No tickers tracked yet. Add symbols to build a rapid response list.', 'No tickers tracked yet. Add symbols to build a focused market watchlist.'],
  ['11. Psycho-Frame Sentiment Monitor', '11. Market Sentiment Monitor'],
  [
    'Gauge collective pilot morale with a Psycho-Frame index, historical checkpoints, and context for redeploying your Gunpla assets.',
    'Gauge market sentiment with fear-and-greed context, historical checkpoints, and allocation risk notes.',
  ],
  ['Psycho-Frame Telemetry', 'Sentiment Data'],
  ['Psycho-Frame Gauge', 'Fear & Greed Gauge'],
  ['Sentiment Nexus Console', 'Market Sentiment Console'],
  ['Live feed unstable â€“ pulling from cache', 'Live feed unavailable - using cache'],
  [
    'Composite morale index blending momentum, breadth, volatility, and safety flows.',
    'Composite sentiment index blending momentum, breadth, volatility, and safety flows.',
  ],
  ['Deploy alongside battle plans to sense risk-on or risk-off pivots.', 'Use alongside allocation plans to identify risk-on or risk-off pivots.'],
  ['Source Sync', 'Source Blend'],
  ['Composite Sentiment Mesh', 'Composite Sentiment Sources'],
  ['Temporal Anchors', 'Historical Checkpoints'],
  ['7-Day Psycho-Frame Projection', '7-Day Sentiment Projection'],
  ['Psycho-Frame Tripwires', 'Sentiment Alerts'],
  ['Trend vector', 'Trend direction'],
  ['Custom Alert Programming', 'Custom Alert Rules'],
  ['Activate alerting protocol', 'Enable alert rules'],
  ['Arm audio ping', 'Enable audio alert'],
  ['Flash HUD colour on trigger', 'Flash theme on trigger'],
  ['13. Historical Stress Replay Chamber', '13. Historical Stress Replay'],
  ['6. Rebalance Deck', '6. Rebalance & Contribution Tools'],
  ['8. Performance Analytics', '8. Performance Review'],
  ['10. Market Indices Feed', '10. Market Indices'],
  [
    "&copy; 2025. Side 7 Dockyard interface built for Tan Tran's Gunpla collection command ops.",
    "&copy; 2026. Roth IRA portfolio dashboard built for long-term planning and allocation discipline.",
  ],
];

function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, '\n');
}

function extractBodyAttributes(html) {
  const match = html.match(/<body([^>]*)>/i);
  return match ? match[1] : '';
}

function extractBodyInnerHtml(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? normalizeLineEndings(match[1]) : '';
}

function stripBodyScripts(bodyHtml) {
  return bodyHtml.replace(/\s*<script\b[^>]*><\/script>/gi, '');
}

function replaceSection6TopGrid(bodyHtml) {
  const sectionStart = bodyHtml.indexOf(SECTION_6_ID_MARKER);
  if (sectionStart === -1) {
    return bodyHtml;
  }

  const gridStart = bodyHtml.indexOf(SECTION_6_TOP_GRID_MARKER, sectionStart);
  const gridEnd = bodyHtml.indexOf(SECTION_6_REST_MARKER, gridStart);

  if (gridStart === -1 || gridEnd === -1) {
    return bodyHtml;
  }

  return `${bodyHtml.slice(0, gridStart)}${SECTION_6_NEWS_SLOT}${bodyHtml.slice(gridEnd)}`;
}

function replaceAllLiterals(bodyHtml, replacements) {
  return replacements.reduce(
    (html, [from, to]) => html.split(from).join(to),
    bodyHtml
  );
}

function injectActionCenter(bodyHtml) {
  const heroEnd = bodyHtml.indexOf(HERO_CLOSE_MARKER);
  if (heroEnd === -1 || bodyHtml.includes('portfolioActionCenterMount')) {
    return bodyHtml;
  }

  const insertAt = heroEnd + HERO_CLOSE_MARKER.length;
  return `${bodyHtml.slice(0, insertAt)}${ACTION_CENTER_MOUNT}${bodyHtml.slice(insertAt)}`;
}

function applyFinanceFirstCopy(bodyHtml) {
  return replaceAllLiterals(bodyHtml, FINANCE_COPY_REPLACEMENTS)
    .replace(/\s*data-fmp-key="[^"]*"/gi, ' data-fmp-key="demo"')
    .replace(/\s*data-finnhub-key="[^"]*"/gi, '');
}

export function buildLegacyMarkup(legacyDocumentHtml) {
  const bodyAttributes = extractBodyAttributes(legacyDocumentHtml);
  const bodyClassMatch = bodyAttributes.match(/class="([^"]+)"/i);
  const bodyMarkup = extractBodyInnerHtml(legacyDocumentHtml);

  return {
    legacyBodyClass: bodyClassMatch?.[1] || FALLBACK_BODY_CLASS,
    legacyAppMarkup: injectActionCenter(
      applyFinanceFirstCopy(replaceSection6TopGrid(stripBodyScripts(bodyMarkup)))
    ).trim(),
  };
}
