# analytics.js

## 1. Tổng quan
- Đóng vai trò “trung tâm phân tích”: đọc input từ giao diện (target, giá trị hiện tại), giả định mặc định (ước tính lợi nhuận, độ biến động, hệ số beta, ma trận tương quan) và dữ liệu realtime do `data.js` cấp để tính toàn bộ KPI cho dashboard.
- Cập nhật mọi khu vực hiển thị: HUD ở Section 6, Mission Metric Console ở Section 7, dữ liệu cung cấp cho AI Co-Pilot ở Section 8, đồng thời lưu lại snapshot để các mô-đun khác tái sử dụng.

## 2. Nguồn dữ liệu chính
- Sao chép các đối tượng toàn cục: `assetKeys`, `expectedReturns`, `volatilities`, `portfolioAssetBetas`, `portfolioExpenseRatios`, `correlations`, `multiFactorDefaults`, `portfolioDefaults`.
- Thiết lập hằng số nội bộ: `DEFAULT_RISK_FREE_RATE`, `DEFAULT_BENCHMARK_RETURN`, `DEFAULT_BENCHMARK_VOLATILITY`, `DEFAULT_EQUITY_RISK_PREMIUM`, cùng các giá trị phụ trợ khác.
- Lưu trạng thái trung gian trong các biến `lastVolatilitySnapshot`, `lastMultiFactorSnapshot`, `lastTrackingSnapshot`, `lastTailRiskSnapshot`, `contributionSnapshots`… để phục vụ export hoặc refresh UI.

## 3. Hệ thống hàm tính toán

### 3.1 Xử lý input & trọng số
- `getCurrentTargets()`, `normalizeWeights()`, `getActualWeightsFromInputs()` đọc và chuẩn hóa mục tiêu phân bổ.
- `getPortfolioMetadataSummary()`, `formatLastUpdatedLabels()` thu thập thông tin mô tả (số lượng tài sản, sector, region, timestamp).
- `computeDefaultFactorExposureTargets()` chuyển bộ target mặc định sang mục tiêu phơi nhiễm nhân tố (MKT / SMB / HML / MOM).

### 3.2 Lợi nhuận & rủi ro danh mục
- `calculateExpectedReturn()` dựa trên CAPM hoặc giá trị override.
- `calculateVolatility()` + `buildCovarianceMatrix()` dựng ma trận hiệp phương sai và độ lệch chuẩn danh mục.
- `calculateRiskContributionMetrics()` tính marginal risk và tỷ trọng đóng góp rủi ro theo từng tài sản.
- `calculateSharpeRatio()`, `calculateSortinoRatio()`, `approximateDownsideDeviation()` đánh giá hiệu quả điều chỉnh rủi ro.
- `calculateTailRiskMetrics()` mô phỏng phân phối để lấy CVaR/ VaR.
- `simulateDrawdownMetrics()` ước lượng max drawdown và thời gian phục hồi.
- `calculateUpDownCaptureRatios()` tính chỉ số up-capture & down-capture.
- `calculateTrackingErrorMetrics()` cho ra tracking error, information ratio, active return.
- `calculatePortfolioBeta()`, `calculateAlpha()`, `calculateWeightedExpenseRatio()` hỗ trợ đánh giá beta, alpha, chi phí.

### 3.3 Đa dạng hóa & đa nhân tố
- `calculateDiversityScore()` tính Herfindahl, số vị thế hiệu dụng, kiểm tra guardrail top holdings.
- `computeMultiFactorMetrics()` phối hợp `multiFactorLoadings` & `factorCovariances` để tính phơi nhiễm nhân tố, variance giải thích, residual variance, R².
- `computeMultiFactorAlignmentDeviation()` so sánh phơi nhiễm thực tế với mục tiêu → tạo guardrail “Multi-factor Betas”.

### 3.4 Bảng đóng góp & export
- `computeReturnContribution()`, `computeRiskContribution()`, `computeSharpeContribution()` xây dựng data-set cho bảng contribution theo từng chế độ.
- `buildContributionSnapshot()`, `generateExportPayload()` đóng gói dữ liệu phục vụ download CSV/JSON hoặc lưu “snapshot”.

## 4. Hàm cập nhật giao diện
- **HUD Section 6**: `updateSummaryInsights()`, `updateOperationalHealthGrid()`, `updateTailRiskCard()`, `updateMultiFactorCard()`, `updateTrackingCard()`.
- **Mission Metric Console Section 7**:
  - `updateMetricBreakdown()` cập nhật bảng chi tiết từng cột.
  - `populateAssetContributionTable()` render bảng đóng góp (Return/Risk/Sharpe).
  - `renderNarrativeSections()` tạo đoạn mô tả bằng văn bản.
  - `buildMetricGuardrails()` + `mapGuardrailStatus()` đánh giá và gán trạng thái guardrail.
- **Scoring & Narrative tổng quát**:
  - `calculatePortfolioScore()`, `updatePortfolioScoreAndRisk()` sinh điểm tổng và gán Risk Level.
  - `buildScoreNote()`, `mapScoreStatusTag()`, `updateAnalyticsNarrative()` cung cấp cấu phần mô tả, quick notes, guardrail commentary.
- Helpers trình bày: `formatPercent`, `formatCurrency`, `formatRecoveryLabel`, `formatCaptureRatio`, `mapToneToBadge`, v.v.

## 5. Vòng đời & sự kiện
- `initializeAnalytics()` là trung tâm điều phối: đọc input, chạy toàn bộ phép tính, cập nhật UI, lưu snapshot cho phần export.
- `bindContributionControls()`, `updateContributionToggleState()` xử lý nút chuyển chế độ đóng góp.
- `document.addEventListener('DOMContentLoaded', ...)`:
  1. Khởi tạo expected returns từ localStorage.
  2. Bind các nút reset/export/refresh.
  3. Gọi `initializeAnalytics()` (qua `requestIdleCallback` khi có thể).
- `window.addEventListener('portfolio-assumptions-reset', ...)` tải lại giả định, khởi chạy pipeline phân tích khi người dùng reset baseline.
- Nút “Refresh Analytics” gọi lại `initializeAnalytics()` để cập nhật khi dữ liệu mới (volatility, correlation) đã sẵn sàng.

## 6. Dữ liệu xuất & chia sẻ
- `window.latestPortfolioScoreDetails` chứa điểm số & guardrail cho AI Co-Pilot hoặc các báo cáo khác.
- Snapshots contribution được lưu trong localStorage (`assetContributionMode`, `assetContributionSnapshot`).
- Nhiều formatter (formatPercent, formatCurrency) được các file khác import/ sử dụng lại.

## 7. Hướng dẫn mở rộng
- Khi bổ sung chỉ số mới: hãy tính toán trong `initializeAnalytics()`, lưu vào `metrics`, rồi viết hàm cập nhật UI tương ứng.
- Mọi chỉnh sửa giả định (volatility, correlation, multi-factor…) nên thực hiện ở `data.js` để analytics tự động nhận thông tin mới.
- Guardrail mới có thể được thêm vào `buildMetricGuardrails()` và present trong narrative hoặc phần cảnh báo tùy ý.
