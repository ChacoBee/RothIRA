# data.js

## Overview
- Static defaults and market-data hydration layer for the dashboard.
- Owns baseline holdings metadata, factor assumptions, expense ratios, correlations, and volatility defaults.
- Loads and refreshes market data, then exposes it to the rest of the app through shared globals.

## Responsibilities
- Define baseline portfolio assumptions.
- Fetch and cache market data such as price series, volatility inputs, and correlation inputs.
- Sync derived defaults back onto `window` so the analytics and dashboard modules can consume updated values.
- Provide formatting and symbol-mapping helpers used by the rest of the app.

## Notes
- If the market-data provider changes, update this file first and keep downstream modules data-source agnostic.
- `analytics.js` is the main consumer of the dynamic values published here.