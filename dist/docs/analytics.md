# analytics.js

## Overview
- Central analytics pipeline for the dashboard.
- Reads current targets, live values, assumptions, and market-derived metrics.
- Updates the non-AI dashboard surfaces, especially Section 6 and Section 7.
- Stores snapshots that other non-AI modules can reuse.

## Inputs
- Global holdings metadata and assumptions from `data.js`.
- Current portfolio weights and values from the DOM and live-sheet state.
- Volatility, correlation, beta, expense, and benchmark defaults.

## Main responsibilities
- Normalize targets and actual weights.
- Calculate expected return, volatility, beta, alpha, Sharpe, Sortino, drawdown, tail-risk, and tracking metrics.
- Build diversification and contribution views.
- Refresh Section 6 summary cards and Section 7 analysis views.
- Publish reusable score and guardrail snapshots on `window` for reporting and other read-only consumers.

## Notes
- `window.latestPortfolioScoreDetails` remains available for reporting/debug surfaces.
- If the data source layer changes, keep `analytics.js` focused on calculation and UI hydration rather than fetch logic.