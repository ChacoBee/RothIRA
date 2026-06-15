# Roth IRA Portfolio Command Center

React/Vite Roth IRA dashboard for allocation monitoring, contribution planning, rebalancing, retirement simulation, and market context. The current app preserves legacy section ids and tool behavior while progressively moving rendering into React islands.

## Stack
- React 19 + Vite 5
- Tailwind via PostCSS build pipeline
- Existing custom CSS in `css/styles.css`
- Legacy dashboard behavior kept through the existing `js/` runtime loaded after React mount
- Legacy HTML is shipped as `legacy-index.static.html` and fetched at boot so the main Vite entry stays smaller
- `config.js` is loaded by the React bootstrap before legacy scripts instead of being eagerly included in `index.html`
- Chart.js is dynamically loaded before legacy chart scripts, keeping it out of the main entry bundle
- React islands use isolated error boundaries and chunk-load fallbacks so one failed panel does not blank the dashboard
- Sector Heatmap and Market Indices defer third-party widget/network work until their sections are opened or near the viewport
- Performance Review defers historical chart work until opened and uses modelled projection when direct market fetches are disabled
- Market Sentiment defers chart/fetch work until opened and uses local fallback data when direct market fetches are disabled

## Local commands
- `npm run dev`: start the Vite dev server
- `npm run build`: create the production build in `dist/`
- `npm run preview`: preview the Vite build locally
- `npm test`: run unit tests, build, and deterministic browser smoke coverage

## Market data and secret handling
The Action Center includes priority alerts, target allocation policy snapshots, and a local Alpha Vantage key manager for historical data used by optimizer/replay tools. Section 6 includes `World Stock News` with public YouTube finance live streams and Finnhub general market headlines.

Runtime key sources, in precedence order:
1. `VITE_FINNHUB_KEY` from `.env.local` during local Vite development only
2. `?finnhubKey=YOUR_KEY` in the URL
3. `localStorage['hangar.finnhubKey']`
4. `window.APP_CONFIG.marketData.finnhubKey` in `config.js` for local/private overrides only

Recommended Finnhub setup:
1. Run the app and open `World Stock News`
2. Paste a personal Finnhub key into the local key form
3. Use `Save & sync`; the key is stored only in this browser as `localStorage['hangar.finnhubKey']`

For local developer sessions, `.env.local` is also supported:
1. Create `.env.local`
2. Add `VITE_FINNHUB_KEY=YOUR_KEY`
3. Restart `npm run dev`
4. Open the app normally; no query param is required

`config.js` keeps `finnhubKey` and `alphaVantageKey` empty by default. Do not commit real API keys into source. GitHub Pages is a static client deployment, so any key included in built assets is public. Production live data should use user-provided keys or a future serverless proxy.

Production builds intentionally do not embed `VITE_FINNHUB_KEY`, even if `.env.local` exists on the build machine.

`allowInsecureMarketFetch` defaults to `false`. Modules should render a missing-key, stale-data, or fallback-data state instead of relying on committed credentials.

Recommended Alpha Vantage setup:
1. Open the Action Center
2. Paste a personal Alpha Vantage key into `Data Sources`
3. Use `Save key`; the key is stored only in this browser as `localStorage['hangar.alphaVantageKey']`

## Deployment
The Vite build is configured for GitHub Pages with base path `/RothIRA/`.

Recommended flow:
1. `npm ci`
2. `npm run build`
3. Push to `main`
4. GitHub Actions publishes `dist/` to Pages

## Tests
- `tests/deposit-core.test.js`
- `tests/deposit-rebalance-core.test.js`
- `tests/finnhub-news.test.mjs`
- `tests/run-console-check.mjs`

The smoke test serves the built app under `/RothIRA/`, mocks unstable third-party feeds, and verifies:
- app boot without runtime console errors
- sidebar hash navigation
- theme toggle
- Section 6 removals, removed live news theater, and Finnhub news render
- Action Center Alpha Vantage key save/forget flow
- Action Center priority alerts for data freshness, drift, contribution state, and history-source fallback
- Action Center target allocation policy snapshot persistence
- deferred Market Indices and Sector Heatmap activation
- deferred Performance Review activation without direct Yahoo chart calls in static mode
- deferred Market Sentiment activation without CNN/Alternative/Stooq calls in static mode
- finance-first Heatmap copy without legacy tactical labels or encoding artifacts
- local Finnhub key save/sync/forget flow
- visible renumbering after Section 8 removal
- live sheet snapshot rendering
- legacy runtime scripts are loaded after React injects the legacy markup
- deferred island chunk failures render a localized fallback instead of taking down the page
- non-AI sections still function after the cleanup

Manual real-feed check:
1. Add your key through the `World Stock News` local key form or `.env.local`
2. Run `npm run dev`
3. Open `/RothIRA/`
4. Confirm `World Stock News` renders live headlines instead of the missing-key state
5. Confirm the browser network tab shows `https://finnhub.io/api/v1/news?category=general&token=...` with `200`
