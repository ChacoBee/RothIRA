import { createServer } from 'http';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distRoot = path.resolve(__dirname, '..', 'dist');
const HOST = '127.0.0.1';
const BASE_PATH = '/RothIRA';

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html';
    case '.css':
      return 'text/css';
    case '.js':
      return 'application/javascript';
    case '.json':
      return 'application/json';
    case '.csv':
      return 'text/csv';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.svg':
      return 'image/svg+xml';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

function corsHeaders(contentType) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': '*',
    'Content-Type': contentType,
  };
}

function respondJson(request, payload, status = 200) {
  return request.respond({
    status,
    headers: corsHeaders('application/json'),
    body: JSON.stringify(payload),
  });
}

function respondText(request, body, contentType = 'text/plain', status = 200) {
  return request.respond({
    status,
    headers: corsHeaders(contentType),
    body,
  });
}

function buildQuotePayload() {
  return [
    '^GSPC',
    '^DJI',
    '^IXIC',
    '^RUT',
    '^FTSE',
    '^GDAXI',
    '^N225',
    '^HSI',
    '^BSESN',
  ].map((symbol, index) => ({
    symbol,
    name: symbol,
    price: 100 + index * 10,
    change: 1.5 + index * 0.1,
    changesPercentage: 0.8 + index * 0.1,
    dayLow: 95 + index * 10,
    dayHigh: 105 + index * 10,
    yearLow: 80 + index * 10,
    yearHigh: 120 + index * 10,
    volume: 1000000 + index * 5000,
    marketCap: 1000000000 + index * 1000000,
    previousClose: 98 + index * 10,
    open: 99 + index * 10,
  }));
}

function buildYahooChartResponse() {
  const timestamps = [1714521600, 1715126400, 1715731200, 1716336000, 1716940800, 1717545600];
  const closes = [100, 102, 101, 104, 106, 108];
  return {
    chart: {
      result: [
        {
          timestamp: timestamps,
          indicators: {
            adjclose: [{ adjclose: closes }],
            quote: [{ close: closes }],
          },
        },
      ],
      error: null,
    },
  };
}

function buildYahooQuoteResponse() {
  return {
    quoteResponse: {
      result: buildQuotePayload().map((quote) => ({
        symbol: quote.symbol,
        shortName: quote.name,
        regularMarketPrice: quote.price,
        regularMarketChange: quote.change,
        regularMarketChangePercent: quote.changesPercentage,
        regularMarketDayLow: quote.dayLow,
        regularMarketDayHigh: quote.dayHigh,
        fiftyTwoWeekLow: quote.yearLow,
        fiftyTwoWeekHigh: quote.yearHigh,
        regularMarketVolume: quote.volume,
        marketCap: quote.marketCap,
      })),
    },
  };
}

function buildEconomicCalendar() {
  return [
    {
      date: '2026-04-20',
      time: '12:30',
      country: 'US',
      event: 'CPI',
      impact: 'High',
      estimate: '3.1%',
      previous: '3.0%',
      actual: null,
    },
    {
      date: '2026-04-22',
      time: '14:00',
      country: 'EU',
      event: 'ECB Rate Decision',
      impact: 'High',
      estimate: '4.00%',
      previous: '4.00%',
      actual: null,
    },
  ];
}

function buildSheetCsv() {
  return [
    'Stock,Total Invested,Held %,Shares Held,Stock Current Price,Gain/Loss,Gain/Loss %,Current Value,Current %,Total Income From Yield,Total Return',
    'VOO,1000,45,2,500,100,10,1100,45,10,110',
    'VXUS,450,20,5,90,15,3.4,465,20,4,19',
    'AVDV,220,10,4,55,5,2.2,225,10,3,8',
    'AVUV,330,15,6,56,12,3.6,342,15,2,14',
    'JNJ,110,5,1,112,2,1.8,112,5,6,8',
    'GOOGL,120,5,1,124,4,3.3,124,5,0,4',
  ].join('\n');
}

function buildFinnhubNews() {
  return Array.from({ length: 8 }).map((_, index) => ({
    id: index + 1,
    headline: `Global headline ${index + 1}`,
    summary: `Summary for global headline ${index + 1}.`,
    source: 'Mock Wire',
    url: `https://example.com/news/${index + 1}`,
    image: '',
    category: 'general',
    datetime: 1717545600 + index * 60,
  }));
}

function buildFearGreedPayload() {
  const history = Array.from({ length: 8 }).map((_, index) => ({
    x: Date.UTC(2026, 3, 8 + index),
    y: 42 + index,
    rating: index > 4 ? 'greed' : 'neutral',
  }));
  return {
    fear_and_greed_historical: {
      data: history,
    },
    fear_and_greed: {
      score: 55,
      rating: 'neutral',
      previous_close: 52,
      timestamp: '2026-04-16T14:00:00Z',
    },
  };
}

function buildAlternativeSentimentPayload() {
  return {
    data: [
      {
        value: '48',
        value_classification: 'Neutral',
      },
    ],
  };
}

function buildStooqCsv() {
  return [
    'Date,Open,High,Low,Close,Volume',
    '2026-04-11,100,103,99,102,1000',
    '2026-04-12,102,104,100,103,1200',
    '2026-04-13,103,105,101,104,1100',
    '2026-04-14,104,106,102,105,1150',
    '2026-04-15,105,107,103,106,1180',
  ].join('\n');
}

function tradingViewStubScript() {
  return `
    window.TradingView = {
      widget: function widget(config) {
        const container = document.getElementById(config.container_id);
        if (container) {
          container.innerHTML = '';
          const iframe = document.createElement('iframe');
          iframe.src = 'about:blank';
          iframe.title = 'TradingView Widget';
          iframe.style.width = '100%';
          iframe.style.height = (config.height || 420) + 'px';
          iframe.dataset.symbol = config.symbol || '';
          container.appendChild(iframe);
        }
        return {
          remove() {
            if (container) {
              container.innerHTML = '';
            }
          }
        };
      }
    };
  `;
}

function heatmapStubScript({ delayMs = 0 } = {}) {
  return `
    (function () {
      var script = document.currentScript;
      if (!script || !script.parentNode) return;
      function injectIframe() {
        var iframe = document.createElement('iframe');
        iframe.src = 'about:blank';
        iframe.title = 'Heatmap Widget';
        iframe.style.width = '100%';
        iframe.style.height = '520px';
        script.parentNode.insertBefore(iframe, script);
      }
      ${delayMs > 0 ? `setTimeout(injectIframe, ${delayMs});` : 'injectIframe();'}
    })();
  `;
}

function resolveDistFile(requestPath) {
  const withoutQuery = requestPath.split('?')[0];
  if (withoutQuery === '/' || withoutQuery === BASE_PATH || withoutQuery === `${BASE_PATH}/`) {
    return path.join(distRoot, 'index.html');
  }

  if (!withoutQuery.startsWith(`${BASE_PATH}/`)) {
    return null;
  }

  const relativePath = withoutQuery.slice(BASE_PATH.length + 1);
  const normalized = path.normalize(relativePath);
  const filePath = path.join(distRoot, normalized);
  if (!filePath.startsWith(distRoot)) {
    return null;
  }
  return filePath;
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const server = createServer(async (req, res) => {
      try {
        const targetPath = resolveDistFile(req.url || '/');
        if (!targetPath) {
          res.writeHead(404);
          res.end('Not found');
          return;
        }

        const data = await fs.readFile(targetPath);
        res.writeHead(200, { 'Content-Type': getContentType(targetPath) });
        res.end(data);
      } catch (error) {
        res.writeHead(500);
        res.end('Internal server error');
      }
    });

    server.on('error', reject);
    server.listen(0, HOST, () => {
      const address = server.address();
      if (!address || typeof address !== 'object') {
        reject(new Error('Unable to determine server port'));
        return;
      }
      resolve({ server, port: address.port });
    });
  });
}

async function runSmokeTest() {
  const { server, port } = await startStaticServer();
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const consoleWarnings = [];
  let ignoreExpectedHeatmapConsoleError = false;
  let heatmapScriptMode = 'stable';

  page.on('console', (message) => {
    const entry = {
      type: message.type(),
      text: message.text(),
      location: message.location(),
    };
    if (
      ignoreExpectedHeatmapConsoleError &&
      message.type() === 'error' &&
      (entry.text.includes('embed-widget-stock-heatmap.js') || entry.text.includes('Failed to load resource'))
    ) {
      return;
    }
    if (message.type() === 'error') {
      consoleErrors.push(entry);
    } else if (message.type() === 'warning') {
      consoleWarnings.push(entry);
    }
  });

  page.on('pageerror', (error) => {
    consoleErrors.push({
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
    });
  });

  await page.setRequestInterception(true);
  page.on('request', async (request) => {
    const url = request.url();

    if (url.includes('finnhub.io/api/v1/news')) {
      await respondJson(request, buildFinnhubNews());
      return;
    }

    if (url.includes('financialmodelingprep.com/api/v3/economic_calendar')) {
      await respondJson(request, buildEconomicCalendar());
      return;
    }

    if (url.includes('financialmodelingprep.com/api/v3/quote/') || url.includes('financialmodelingprep.com/api/v3/quotes/index')) {
      await respondJson(request, buildQuotePayload());
      return;
    }

    if (url.includes('query1.finance.yahoo.com/v7/finance/quote')) {
      await respondJson(request, buildYahooQuoteResponse());
      return;
    }

    if (url.includes('query1.finance.yahoo.com/v8/finance/chart/')) {
      await respondJson(request, buildYahooChartResponse());
      return;
    }

    if (url.includes('production.dataviz.cnn.io/index/fearandgreed/graphdata')) {
      await respondJson(request, buildFearGreedPayload());
      return;
    }

    if (url.includes('api.alternative.me/fng')) {
      await respondJson(request, buildAlternativeSentimentPayload());
      return;
    }

    if (url.includes('stooq.com/q/d/l/')) {
      await respondText(request, buildStooqCsv(), 'text/csv');
      return;
    }

    if (url.includes('docs.google.com/spreadsheets')) {
      await respondText(request, buildSheetCsv(), 'text/csv');
      return;
    }

    if (url.startsWith('https://api.allorigins.win/raw?url=')) {
      const wrappedUrl = decodeURIComponent(new URL(url).searchParams.get('url') || '');
      if (wrappedUrl.includes('api.alternative.me/fng')) {
        await respondJson(request, buildAlternativeSentimentPayload());
        return;
      }
      if (wrappedUrl.includes('stooq.com/q/d/l/')) {
        await respondText(request, buildStooqCsv(), 'text/csv');
        return;
      }
      if (wrappedUrl.includes('production.dataviz.cnn.io/index/fearandgreed/graphdata')) {
        await respondJson(request, buildFearGreedPayload());
        return;
      }
      if (wrappedUrl.includes('query1.finance.yahoo.com/v7/finance/quote')) {
        await respondJson(request, buildYahooQuoteResponse());
        return;
      }
    }

    if (url.startsWith('https://cors.isomorphic-git.org/https://query1.finance.yahoo.com/v7/finance/quote')) {
      await respondJson(request, buildYahooQuoteResponse());
      return;
    }

    if (url.startsWith('https://corsproxy.io/?')) {
      await respondJson(request, buildYahooQuoteResponse());
      return;
    }

    if (url === 'https://s3.tradingview.com/tv.js') {
      await respondText(request, tradingViewStubScript(), 'application/javascript');
      return;
    }

    if (url === 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js') {
      if (heatmapScriptMode === 'slow') {
        heatmapScriptMode = 'stable';
        await respondText(request, heatmapStubScript({ delayMs: 16000 }), 'application/javascript');
        return;
      }

      if (heatmapScriptMode === 'fail') {
        heatmapScriptMode = 'stable';
        await request.abort('failed');
        return;
      }

      await respondText(request, heatmapStubScript(), 'application/javascript');
      return;
    }

    if (url.startsWith('https://fonts.googleapis.com/')) {
      await respondText(request, '', 'text/css');
      return;
    }

    if (url.startsWith('https://fonts.gstatic.com/')) {
      await respondText(request, '', 'font/woff2');
      return;
    }

    if (url.startsWith('http://') || url.startsWith('https://example.com/')) {
      await request.continue();
      return;
    }

    if (url.startsWith('https://')) {
      await respondText(request, '', 'text/plain');
      return;
    }

    await request.continue();
  });

  const targetUrl = `http://${HOST}:${port}${BASE_PATH}/index.html?finnhubKey=test-finnhub-key`;
  try {
    await page.evaluateOnNewDocument(() => {
      localStorage.setItem('theme', 'dark');
    });
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    await page.waitForSelector('#overview');
    await page.waitForSelector('#worldStockNewsMount [data-news-card]');
    await page.waitForFunction(
      () => document.querySelectorAll('#worldStockNewsMount [data-news-card]').length === 4
    );
    await page.waitForSelector('#capitalDeploymentOptimizerMount h3');
    await page.waitForSelector('#historicalStressReplayMount h3');
    await page.waitForFunction(
      () =>
        Boolean(document.querySelector('#monteCarloRetirementLabMount h3')) &&
        /target nest egg/i.test(
          document.querySelector('#monteCarloRetirementLabMount')?.textContent || ''
        )
    );

    const initialThemeState = await page.evaluate(() => ({
      darkMode: document.documentElement.classList.contains('dark-mode'),
      dark: document.documentElement.classList.contains('dark'),
    }));
    assertValue(initialThemeState.darkMode && initialThemeState.dark, 'Dark theme bootstrap did not synchronize html classes.');

    const removedSection6Labels = await page.evaluate(() => ({
      alphaVantageAccess: document.body.textContent.includes('Alpha Vantage access'),
      rebalanceProtocol: document.body.textContent.includes('Rebalance Protocol'),
      annualRebalanceClock: document.body.textContent.includes('Annual Rebalance Clock'),
    }));
    if (
      removedSection6Labels.alphaVantageAccess ||
      removedSection6Labels.rebalanceProtocol ||
      removedSection6Labels.annualRebalanceClock
    ) {
      throw new Error('Section 6 removed cards are still rendered.');
    }

    await page.click('a.app-sidebar__link[href="#advanced-tracker"]');
    await page.waitForFunction(() => window.location.hash === '#advanced-tracker');

    await page.click('#themeToggleBtn');
    await page.waitForFunction(
      () =>
        !document.documentElement.classList.contains('dark-mode') &&
        !document.documentElement.classList.contains('dark')
    );
    await page.click('#themeToggleBtn');
    await page.waitForFunction(
      () =>
        document.documentElement.classList.contains('dark-mode') &&
        document.documentElement.classList.contains('dark')
    );

    const newsHeadline = await page.$eval('#worldStockNewsMount h4 a', (el) => el.textContent.trim());
    assertValue(newsHeadline === 'Global headline 8', 'Latest Finnhub headline should be rendered first.');

    const pageIndicator = await page.$eval('[data-news-page-indicator]', (el) => el.textContent.trim());
    assertValue(pageIndicator === 'Page 1 of 2', 'News pagination indicator did not render expected page count.');

    await page.click('[data-news-pagination-next]');
    await page.waitForFunction(
      () => document.querySelector('[data-news-page-indicator]')?.textContent?.trim() === 'Page 2 of 2'
    );
    const pageTwoHeadline = await page.$eval('#worldStockNewsMount h4 a', (el) => el.textContent.trim());
    assertValue(pageTwoHeadline === 'Global headline 4', 'News pagination did not advance to the second page.');

    const liveRows = await page.$$eval('#livePriceRows tr', (rows) => rows.length);
    assertValue(liveRows >= 6, 'Live price snapshot rows did not render.');

    const sectionTitle = await page.$eval('#advanced-tracker .section-title', (el) => el.textContent.trim());
    assertValue(sectionTitle === '6. Supply Logistics Deck', 'Section 6 title changed unexpectedly.');

    await page.click('.tab-btn[data-stock="VOO"]');
    await page.waitForFunction(
      () => document.querySelector('#stockDetailContent h3')?.textContent?.trim() === 'VOO Analysis'
    );

    const darkSurfaceChecks = await page.evaluate(() => {
      const getStyle = (element) => {
        if (!element) return null;
        const computed = getComputedStyle(element);
        return {
          backgroundColor: computed.backgroundColor,
          backgroundImage: computed.backgroundImage,
          color: computed.color,
          borderColor: computed.borderColor,
          height: element.getBoundingClientRect().height,
          width: element.getBoundingClientRect().width,
        };
      };

      const stockDetailPros = document.querySelector('#stockDetailContent .grid.grid-cols-1.gap-4 > div:first-child');
      const simulationPanel = document.querySelector('#simulation .simulation-panel');
      const liveSnapshotHead = document.querySelector('#advanced-tracker .live-price-table thead');

      return {
        stockDetailPros: getStyle(stockDetailPros),
        simulationPanel: getStyle(simulationPanel),
        liveSnapshotHead: getStyle(liveSnapshotHead),
      };
    });

    assertValue(
      darkSurfaceChecks.stockDetailPros?.backgroundColor === 'rgba(31, 41, 55, 0.7)',
      'Section 4 stock detail cards are not rendering with the expected dark surface.'
    );
    assertValue(
      darkSurfaceChecks.simulationPanel?.backgroundImage?.includes('rgba(18, 24, 42, 0.7)'),
      'Section 5 simulation panel lost its dark gradient surface.'
    );
    assertValue(
      darkSurfaceChecks.liveSnapshotHead?.backgroundColor === 'rgba(55, 65, 81, 0.8)',
      'Section 6 live snapshot table header is not using the expected dark styling.'
    );

    const postAiRemovalState = await page.evaluate(() => ({
      hasAiSection: Boolean(document.getElementById('ai-recommendations')),
      hasAiNavLink: Boolean(document.querySelector('a.app-sidebar__link[href="#ai-recommendations"]')),
      performanceTitle: document.querySelector('#performance .section-title')?.textContent?.trim() || '',
      heatmapTitle: document.querySelector('#marketHeatmap .section-title')?.textContent?.trim() || '',
      indicesTitle: document.querySelector('#marketIndices .section-title')?.textContent?.trim() || '',
      fearGreedTitle: document.querySelector('#fearGreed .section-title')?.textContent?.trim() || '',
      optimizerTitle:
        document.querySelector('#capitalDeploymentOptimizer .section-title')?.textContent?.trim() || '',
      historicalReplayTitle:
        document.querySelector('#historicalStressReplay .section-title')?.textContent?.trim() || '',
      monteCarloTitle:
        document.querySelector('#monteCarloRetirementLab .section-title')?.textContent?.trim() || '',
      sidebarIndices: Array.from(document.querySelectorAll('.app-sidebar__link .app-sidebar__index')).map((element) =>
        element.textContent?.trim() || ''
      ),
    }));
    assertValue(!postAiRemovalState.hasAiSection, 'Section 8 should be fully removed from the DOM.');
    assertValue(!postAiRemovalState.hasAiNavLink, 'AI sidebar navigation link should be removed.');
    assertValue(
      postAiRemovalState.performanceTitle === '8. Sortie Debrief Analytics',
      'Sortie Debrief section title was not renumbered to 8.'
    );
    assertValue(
      postAiRemovalState.heatmapTitle === '9. Sector Heatmap Array',
      'Sector Heatmap section title was not renumbered to 9.'
    );
    assertValue(
      postAiRemovalState.indicesTitle === '10. Federation Indices Feed',
      'Federation Indices section title was not renumbered to 10.'
    );
    assertValue(
      postAiRemovalState.fearGreedTitle === '11. Psycho-Frame Sentiment Monitor',
      'Psycho-Frame section title was not renumbered to 11.'
    );
    assertValue(
      postAiRemovalState.optimizerTitle === '12. Capital Deployment Optimizer',
      'Capital Deployment Optimizer section title did not render with the expected numbering.'
    );
    assertValue(
      postAiRemovalState.historicalReplayTitle === '13. Historical Stress Replay Chamber',
      'Historical Stress Replay Chamber section title did not render with the expected numbering.'
    );
    assertValue(
      postAiRemovalState.monteCarloTitle === '14. Monte Carlo Retirement Lab',
      'Monte Carlo Retirement Lab section title did not render with the expected numbering.'
    );
    assertValue(
      postAiRemovalState.sidebarIndices.join(',') === '01,02,03,04,05,06,07,08,09,10,11,12,13,14',
      'Sidebar indices should be continuous through the new advanced decision sections.'
    );

    const advancedDecisionState = await page.evaluate(() => ({
      optimizerHeading:
        document.querySelector('#capitalDeploymentOptimizerMount h3')?.textContent?.trim() || '',
      optimizerText: document.querySelector('#capitalDeploymentOptimizerMount')?.textContent || '',
      replayHeading:
        document.querySelector('#historicalStressReplayMount h3')?.textContent?.trim() || '',
      replayText: document.querySelector('#historicalStressReplayMount')?.textContent || '',
      monteHeading:
        document.querySelector('#monteCarloRetirementLabMount h3')?.textContent?.trim() || '',
      monteText: document.querySelector('#monteCarloRetirementLabMount')?.textContent || '',
      optimizerStorage: localStorage.getItem('hangar.contributionOptimizer'),
      replayStorage: localStorage.getItem('hangar.crisisReplay'),
      monteStorage: localStorage.getItem('hangar.retirementLab'),
    }));
    assertValue(
      advancedDecisionState.optimizerHeading === 'Capital Deployment Optimizer',
      'Capital Deployment Optimizer React island did not mount.'
    );
    assertValue(
      /pure drift correction/i.test(advancedDecisionState.optimizerText),
      'Contribution optimizer should show the Alpha Vantage fallback notice in smoke mode.'
    );
    assertValue(
      advancedDecisionState.replayHeading === 'Historical Stress Replay Chamber',
      'Historical Stress Replay React island did not mount.'
    );
    assertValue(
      /needs Alpha Vantage history/i.test(advancedDecisionState.replayText),
      'Historical replay should show the missing-history fallback notice in smoke mode.'
    );
    assertValue(
      advancedDecisionState.monteHeading === 'Monte Carlo Retirement Lab',
      'Monte Carlo Retirement Lab React island did not mount.'
    );
    assertValue(
      /target nest egg/i.test(advancedDecisionState.monteText),
      'Monte Carlo Retirement Lab did not finish rendering its simulation output.'
    );
    assertValue(
      Boolean(advancedDecisionState.optimizerStorage),
      'Contribution optimizer state was not persisted to localStorage.'
    );
    assertValue(
      Boolean(advancedDecisionState.replayStorage),
      'Historical replay state was not persisted to localStorage.'
    );
    assertValue(
      Boolean(advancedDecisionState.monteStorage),
      'Retirement lab state was not persisted to localStorage.'
    );

    await page.click('a.app-sidebar__link[href="#monteCarloRetirementLab"]');
    await page.waitForFunction(() => window.location.hash === '#monteCarloRetirementLab');

    const hiddenUtilityParity = await page.evaluate(() => {
      const readDisplay = (id) => {
        const element = document.getElementById(id);
        return element ? getComputedStyle(element).display : null;
      };

      return {
        metricAssetList: readDisplay('metricAssetList'),
        allocationAssetList: readDisplay('allocationAssetList'),
        heatmapLoading: readDisplay('heatmapLoading'),
        heatmapError: readDisplay('heatmapError'),
      };
    });
    assertValue(hiddenUtilityParity.metricAssetList === 'none', 'Hidden dropdown panels should not render before interaction.');
    assertValue(hiddenUtilityParity.allocationAssetList === 'none', 'Hidden allocation dropdown panels should not render before interaction.');
    assertValue(hiddenUtilityParity.heatmapLoading === 'none', 'Heatmap loading overlay should be hidden after the initial successful render.');
    assertValue(hiddenUtilityParity.heatmapError === 'none', 'Heatmap error overlay should be hidden after the initial successful render.');

    await page.click('[data-metric-toggle="metricAssetList"]');
    await page.click('[data-metric-toggle="metricSectorList"]');
    await page.click('[data-metric-toggle="allocationAssetList"]');
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll('.metric-dropdown')).filter(
          (panel) => getComputedStyle(panel).display !== 'none'
        ).length === 3
    );

    const dropdownState = await page.evaluate(() => {
      const openPanels = Array.from(document.querySelectorAll('.metric-dropdown')).filter(
        (panel) => getComputedStyle(panel).display !== 'none'
      );
      return {
        openCount: openPanels.length,
        viewportWidth: window.innerWidth,
        bounds: openPanels.map((panel) => {
          const rect = panel.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
          };
        }),
      };
    });

    assertValue(dropdownState.openCount === 3, 'Metric dropdowns should allow multiple panels to stay open together.');
    assertValue(
      dropdownState.bounds.every(
        (panel) => panel.left >= 0 && panel.right <= dropdownState.viewportWidth - 8
      ),
      'Metric dropdown alignment overflowed the viewport.'
    );
    await page.mouse.click(20, 20);
    await page.waitForFunction(
      () =>
        Array.from(document.querySelectorAll('.metric-dropdown')).every(
          (panel) => getComputedStyle(panel).display === 'none'
        )
    );

    await page.waitForFunction(() => Boolean(document.querySelector('#heatmapWidgetContainer iframe')));
    const heatmapInitialState = await page.evaluate(() => ({
      errorDisplay: getComputedStyle(document.getElementById('heatmapError')).display,
      loadingDisplay: getComputedStyle(document.getElementById('heatmapLoading')).display,
    }));
    assertValue(heatmapInitialState.errorDisplay === 'none', 'Heatmap should load cleanly on first render.');
    assertValue(heatmapInitialState.loadingDisplay === 'none', 'Heatmap loading state did not clear after a successful render.');

    heatmapScriptMode = 'slow';
    await page.click('#heatmapReloadBtn');
    await page.waitForFunction(
      () =>
        getComputedStyle(document.getElementById('heatmapError')).display !== 'none' &&
        getComputedStyle(document.getElementById('heatmapLoading')).display === 'none' &&
        /responding slowly/i.test(document.getElementById('heatmapError')?.textContent || ''),
      { timeout: 20000 }
    );
    await page.waitForFunction(
      () =>
        Boolean(document.querySelector('#heatmapWidgetContainer iframe')) &&
        getComputedStyle(document.getElementById('heatmapError')).display === 'none' &&
        getComputedStyle(document.getElementById('heatmapLoading')).display === 'none',
      { timeout: 25000 }
    );

    ignoreExpectedHeatmapConsoleError = true;
    heatmapScriptMode = 'fail';
    await page.click('#heatmapReloadBtn');
    await page.waitForFunction(
      () =>
        getComputedStyle(document.getElementById('heatmapError')).display !== 'none' &&
        /Unable to load the heatmap/i.test(document.getElementById('heatmapError')?.textContent || '') &&
        getComputedStyle(document.getElementById('heatmapLoading')).display === 'none',
      { timeout: 10000 }
    );
    ignoreExpectedHeatmapConsoleError = false;
  } finally {
    await browser.close();
    server.close();
  }

  if (consoleWarnings.length) {
    console.log('Warnings detected:');
    consoleWarnings.forEach((warning, index) => {
      const location = warning.location?.url
        ? `${warning.location.url}:${warning.location.lineNumber || 0}`
        : '<unknown>';
      console.log(`  [${index + 1}] ${warning.text} @ ${location}`);
    });
  }

  if (consoleErrors.length) {
    console.error('Errors detected:');
    consoleErrors.forEach((error, index) => {
      const location = error.location?.url
        ? `${error.location.url}:${error.location.lineNumber || 0}`
        : '<unknown>';
      console.error(`  [${index + 1}] ${error.text} @ ${location}`);
      if (error.stack) {
        console.error(error.stack);
      }
    });
    process.exitCode = 1;
  } else {
    console.log('Smoke test passed with no console errors.');
  }
}

function assertValue(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

runSmokeTest().catch((error) => {
  console.error('Smoke test failed:', error);
  process.exitCode = 1;
});

