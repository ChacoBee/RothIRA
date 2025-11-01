# data.js

## 1. Vai trò tổng quát
- Là “kho giả định” của ứng dụng: chứa target allocation mẫu, hệ số beta, hệ số đa nhân tố, ma trận tương quan, expense ratios, ngưỡng guardrail…
- Đảm nhiệm việc kết nối tới Alpha Vantage để tải giá hiện tại, chuỗi lịch sử; từ đó tính volatility và correlation động, rồi đẩy lại vào `window` cho `analytics.js` và `ai-recommendations.js`.
- Cung cấp các hàm tiện ích reset / hydrate giả định, định dạng số liệu và ánh xạ mã chứng khoán => mã TradingView.

## 2. Khối dữ liệu tĩnh
- `initialStockData`: target %, sector, region, asset class cho từng ticker.
- `assetBetas`, `multiFactorLoadings`, `factorCovariances`, `assetResidualVols`: dữ liệu mô hình rủi ro (CAPM + Fama-French + Momentum).
- `expenseRatios`, `correlations`, `STATIC_DEFAULT_VOLATILITIES`: chi phí & ma trận tương quan mặc định (làm fallback khi chưa tải realtime).
- Các hằng: `RISK_FREE_RATE`, `BENCHMARK_EXPECTED_RETURN`, `REBALANCE_THRESHOLD`, tên factor, cấu hình cache TTL, lookback, giới hạn rate Alpha Vantage…
- Từ các hằng trên tạo `expectedReturns`, `BASE_*` (freeze) và đưa lên `window.portfolioDefaults`, `window.multiFactorDefaults`.

## 3. Tiện ích chung
- `sleep(ms)`: delay dùng khi phải tôn trọng rate limit.
- `safeParseJSON()`, `getCachedItem()`, `setCachedItem()`: đọc/ghi localStorage kèm timestamp TTL và xử lý lỗi.
- `applyDefaultsToMap()`, `syncPortfolioDefaults()`, `window.hydratePortfolioDefaults()`, `window.resetPortfolioAssumptionsToDefaults()` đồng bộ và reset lại các map (expected returns, volatility…) theo giá trị default.
- Định dạng hiển thị: `formatCurrency()`, `formatPercent()`.

## 4. Tương tác Alpha Vantage
- `fetchAlphaVantageJson(url, attempt)`: gọi API có delay tối thiểu `ALPHA_VANTAGE_RATE_LIMIT_MS`, retry tối đa `ALPHA_VANTAGE_MAX_RETRIES`, xử lý thông điệp “Thank you for using Alpha Vantage!”.
- `fetchDailyAdjustedSeries(symbol, options)`: tải chuỗi “TIME_SERIES_DAILY_ADJUSTED`, cache ở RAM (`memorySeriesCache`) và localStorage, hỗ trợ disable/force refresh.
- `getReturnSeriesForSymbol(symbol, options)`: chuyển chuỗi giá thành log-return (và cache).
- `fetchStockData(symbol)`: ưu tiên lấy từ chuỗi lịch sử (giá mới nhất). Nếu không có sẽ fallback `GLOBAL_QUOTE`.
- `updateStockDataWithRealPrices()`: lặp `assetKeys`, cập nhật `initialStockData[ticker].currentValue/currentPercent` dựa trên target (placeholder).
- `initializeData()`: hiển thị spinner, gọi cập nhật giá + `loadVolatilitiesFromAlphaVantage()` + `loadCorrelationsFromAlphaVantage()`, sau đó nếu `window.initializeAnalytics` tồn tại thì chạy lại analytics.

## 5. Hàm xử lý chuỗi & thống kê
- `toLogReturns(series, lookbackDays)`: tạo log-return với chiều dài lookback + 1.
- `alignReturnSeries(returnsA, returnsB)`: khớp 2 chuỗi theo ngày chung để tính toán.
- `pearsonCorrelation(valuesA, valuesB)`: hệ số Pearson, trả `null` nếu thiếu dữ liệu.
- `sampleStandardDeviation(values)`: độ lệch chuẩn mẫu (dùng để annualize volatility).

## 6. Xây dựng dữ liệu động
- `buildCorrelationMatrixFromAlphaVantage(symbols, options)`: tạo object `{A_B: corr}` bằng cách lấy return của từng cặp, có thể đọc cache hoặc cưỡng bức làm mới.
- `loadCorrelationsFromAlphaVantage(options)`: kiểm tra cache `localStorage`, nếu có thì merge với default; nếu không thì xây mới rồi cập nhật `window.correlations` và timestamp (`window.correlationsLastUpdated`).
- `buildVolatilityMapFromAlphaVantage(symbols, options)`: đối với mỗi ticker, tính σ_daily, annualize bằng `sqrt(TRADING_DAYS_PER_YEAR)`.
- `loadVolatilitiesFromAlphaVantage(options)`: tương tự correlation nhưng lưu vào `window.volatilities`, `window.volatilitiesLastUpdated`, đồng thời cache trong localStorage (`VOLATILITY_CACHE_KEY`).

## 7. Tiện ích hiển thị & hỗ trợ TradingView
- `getTradingViewSymbol(ticker)`: chuyển mã (ví dụ VOO → AMEX:VOO, SPMO → AMEX:SPMO, VXUS → NASDAQ:VXUS…).
- `formatCurrency()`, `formatPercent()` dùng chung cho nhiều file (định dạng USD hoặc % với 2 chữ số thập phân).

## 8. Luồng khởi động (initializeData)
1. Hiện loader (nếu có phần tử `dataLoadingIndicator`).
2. `updateStockDataWithRealPrices()` – cập nhật currentValue/currentPercent theo target (placeholder).
3. Chạy song song `loadVolatilitiesFromAlphaVantage()` và `loadCorrelationsFromAlphaVantage()` (qua `Promise.allSettled`).
4. Nếu có `window.initializeAnalytics`, gọi lại để mọi card/console nhận dữ liệu mới.
5. Lưu `window.portfolioDataRefreshedAt` và ẩn loader.

## 9. Ghi chú mở rộng
- Nếu cần thay đổi hạ tầng data (ví dụ chuyển sang API khác), chỉ cần sửa các hàm lấy dữ liệu trong file này, `analytics.js` và `ai-recommendations.js` sẽ tự dùng kết quả mới.
- Khi thêm ticker hoặc nhân tố mới, cập nhật các object gốc (`initialStockData`, `assetBetas`, `multiFactorLoadings`, `factorCovariances`, `expenseRatios`, `STATIC_DEFAULT_VOLATILITIES`, `correlations`) để giữ tính nhất quán.
- PORTFOLIO_ANALYTICS_BASELINE: baseline analytics overrides (Jan 2020 - Sep 2025) sourced from Portfolio Visualizer share 54R2TPH2RMIYFrqqISF1ws so section 7 cards mirror that backtest.
