# Gunpla Hangar Command Console

React/Vite version of the Roth IRA dashboard, preserving the current local repo's content, section ids, styling, and legacy tool behavior while moving rendering into a React single-page app.

## Stack
- React 19 + Vite 5
- Tailwind via PostCSS build pipeline
- Existing custom CSS in `css/styles.css`
- Legacy dashboard behavior kept through the existing `js/` runtime loaded after React mount

## Local commands
- `npm run dev`: start the Vite dev server
- `npm run build`: create the production build in `dist/`
- `npm run preview`: preview the Vite build locally
- `npm test`: run unit tests, build, and deterministic browser smoke coverage

## Finnhub news configuration
Section 6 includes `World Stock News` powered by Finnhub general market news.

Runtime key sources, in precedence order:
1. `VITE_FINNHUB_KEY` from `.env.local`
2. `?finnhubKey=YOUR_KEY` in the URL
3. `localStorage['hangar.finnhubKey']`
4. `window.APP_CONFIG.marketData.finnhubKey` in `config.js`

Recommended local setup:
1. Create `.env.local`
2. Add `VITE_FINNHUB_KEY=YOUR_KEY`
3. Restart `npm run dev`
4. Open the app normally; no query param is required

`config.js` keeps `finnhubKey` empty by default. Do not commit a real key into source.

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
- Section 6 removals and Finnhub news render
- visible renumbering after Section 8 removal
- live sheet snapshot rendering
- non-AI sections still function after the cleanup

Manual real-feed check:
1. Add your key to `.env.local`
2. Run `npm run dev`
3. Open `/RothIRA/`
4. Confirm `World Stock News` renders live headlines instead of mock `Global headline X`
5. Confirm the browser network tab shows `https://finnhub.io/api/v1/news?category=general&token=...` with `200`