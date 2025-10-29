# ai-recommendations.js

## 1. Tổng quan
- Là “não” của AI Co-Pilot Console (Section 8): thu thập trạng thái danh mục, tính Portfolio Health Score (PHS) và tạo bộ khuyến nghị hành động/chiến lược/quản trị rủi ro.
- Tiếp nhận các giả định được đưa lên `window` (beta, volatility, chi phí, guardrail) và cho phép fallback khi dữ liệu realtime chưa sẵn sàng.
- Điều khiển giao diện: nút “Generate AI Analysis”, thẻ tóm tắt, bảng hành động, khối lời khuyên, phần simulation tương lai.

## 2. Cấu hình & nguồn dữ liệu
- Các hằng số `PHS_*` định nghĩa trọng số, mục tiêu rủi ro, trần chi phí, hàm chuyển Sharpe → điểm, ngưỡng guardrail.
- `aiAssetBetas`, `DEFAULT_EXPECTED_RETURNS`, `DEFAULT_VOLATILITIES`, `aiExpenseRatios` ưu tiên dùng dữ liệu thực từ `analytics.js`/`data.js`; khi thiếu thì fallback sang giá trị mẫu.
- `aiPortfolioDefaults` lấy từ `window.portfolioDefaults` (bao gồm multi-factor, guardrail cap, phí nền tảng, default expense ratio…).
- `ROTH_TAX_SCORE = 100`: mặc định điểm tax efficiency tối đa do môi trường Roth IRA.

## 3. Chuỗi xử lý dữ liệu đầu vào
- `collectPortfolioSnapshot()` đọc target/current từ DOM (inputs rebalance) → trả về {targets, currentValues, currentPercents}.
- `getAssetList()`, `normalizePercents()`, `computeCurrentPercents()`, `computeDeviationMap()` chuẩn hóa và tính độ lệch giữa target & current.
- `safeNumber()`, `clamp()`, `sumObjectValues()` hỗ trợ phòng lỗi giá trị trống/viết sai.

## 4. Tính toán lõi
- `calculatePortfolioMetrics()`:
  - chuẩn hóa trọng số target;
  - tính expected return (trung bình trọng số của `returnsMap`);
  - ước tính variance/volatility bằng giả định mỗi tài sản độc lập (sử dụng bình phương volatility, đây là mô hình đơn giản hơn analytics);
  - tính Sharpe, beta, chỉ số đa dạng hóa (Herfindahl), thống kê độ lệch tối đa / trung bình.
- `AIRecommendationEngine.analyzePortfolio()`:
  1. Gọi `calculatePortfolioMetrics()`;
  2. Tạo danh sách hành động (`buildImmediateActions()`);
  3. Kết hợp với các hàm “build*” để gộp portfolioHealth, strategicAdvice, riskManagement, marketInsights, futurePredictions, personalizedTips;
  4. Trả về gói kết quả dùng chung cho UI.

## 5. Các thành phần Portfolio Health Score
- `computeAllocationFitScore()` đánh giá độ lệch tổng/từng mục.
- `computeDiversificationScore()` xem xét HHI, top holdings, số lượng tài sản.
- `computeCostScore()` cộng expense ratio + phí advisory/platform/fixed → so với `PHS_COST_CAP`.
- `computeRiskBudgetScore()` so sánh volatility thực tế với `PHS_RISK_TARGET_VOL` và `PHS_RISK_TOLERANCE`.
- `computePerformanceScore()` chuyển Sharpe sang thang điểm thông qua hàm tanh (`PHS_PERFORMANCE_A`, `PHS_PERFORMANCE_B`).
- `computeLiquidityScore()` phạt nếu tỷ trọng cổ phiếu đơn lẻ hoặc sleeve thematic quá lớn.
- `computeTaxScore()` trả về 100 (môi trường Roth).
- `buildPortfolioHealth()` gom tất cả điểm trên, nhân trọng số `PHS_WEIGHTS`, giới hạn bởi `PHS_GUARDRAIL_CAP`, đồng thời xây dựng `watchlist`, `priorityLevel`, `description`.

## 6. Khối hành động và lời khuyên
- `buildImmediateActions()` sinh danh sách “Buy/Sell” dựa trên độ lệch so với target (ngưỡng mặc định 1.5% → `threshold`).
- `buildStrategicAdvice()` đưa ra kế hoạch hành động dài hơn dựa trên các chỉ số (volatility, beta, allocation lệch…).
- `buildRiskManagement()` tạo checklist quản trị rủi ro (drawdown, concentration, scenario monitoring).
- `buildMarketInsights()` tổng hợp nhận định thị trường dựa trên beta, exposure thematic, tỷ trọng quốc tế, cash drag, tail risk.
- `buildFuturePredictions()` đưa ra 3 kịch bản (Cơ sở/Thuận lợi/Bất lợi) với xác suất và khuyến nghị tương ứng.
- `buildPersonalizedTips()` thêm lời nhắc cá nhân hóa (ví dụ kiểm tra quỹ khẩn cấp, đóng góp Roth đúng hạn).

## 7. Phần hiển thị UI
- `mapScoreVisuals()` chuyển điểm → màu sắc, badge, shadow cho card chính.
- `updatePortfolioHealth()`, `updateImmediateActions()`, `updateStrategicAdvice()`, `updateRiskManagement()`, `updateMarketInsights()`, `updateFuturePredictions()`, `updatePersonalizedTips()` render từng khối HTML.
- `updateAllocationAIReview()` hiển thị tóm tắt nhanh (focus action, guardrail).
- `updateAIRecommendationsSection({ userInitiated })` là orchestrator: gọi engine, cập nhật UI, hiển thị feedback toast (dùng `window.showActionFeedback` từ `utils.js`).

## 8. Sự kiện & vòng đời
- `document.addEventListener('DOMContentLoaded', ...)`:
  1. Gắn handler cho nút “Generate AI Analysis”.
  2. Render nhanh Allocation Review.
  3. Sau 800ms gọi `updateAIRecommendationsSection()` để chạy phân tích đầy đủ (giúp page load mượt).
- `window.addEventListener('portfolio-assumptions-reset', ...)`: xóa cache kết quả AI và chạy lại phân tích sau khi người dùng reset giả định.

## 9. Gợi ý mở rộng
- Điều chỉnh trọng số PHS hoặc logic guardrail bằng cách cập nhật các hằng `PHS_*`.
- Muốn tính volatility/correlation thực trong AI (như analytics) có thể truyền thêm dữ liệu từ `data.js` và thay công thức variance trong `calculatePortfolioMetrics()`.
- Toàn bộ UI update tách rời, do đó có thể cài thêm card mới bằng cách bổ sung hàm `update*` và cập nhật trong `updateAIRecommendationsSection()`.
