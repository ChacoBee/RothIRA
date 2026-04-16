# utils.js

## 1. Vai trò tổng thể
- Bộ trợ lý giao diện và localStorage cho trang rebalance/metrics: chuẩn hóa input, cập nhật bảng tóm tắt, hiển thị thông báo hành động, xuất dữ liệu.
- Cầu nối giúp các phần khác (analytics, AI) nhận dữ liệu mới: lưu snapshot vào localStorage, phát sự kiện, thao tác với DOM.

## 2. Action Feedback Panel
- IIFE `actionFeedbackManager` xây dựng toast thông báo (progress / success / error / info).
- Cấp hai hàm toàn cục:
  - `window.showActionFeedback(message, { state, autoHide })`.
  - `window.hideActionFeedback(delay)`.
- Quản lý trạng thái (aria, class, auto-hide) để đảm bảo toast hoạt động nhất quán.

## 3. Quản lý mục tiêu & giá trị hiện tại
- Hàm đọc/ghi input:
  - `normalizeTargets()`: chuẩn hóa tổng target về 100%.
  - `applyEvenSplit()`: chia đều target cho tất cả tài sản.
  - `resetTargetsToDefault()`: trả về target mặc định từ `initialStockData`.
  - `handleTargetInput()`, `handleCurrentValueInput()`, `handleCurrentPercentInput()`: validation và đồng bộ giữa value/percent.
- Lưu & tải từ localStorage:
  - `loadTargetsFromStorage()`, `saveTargetsToStorage()`.
  - `loadCurrentValuesFromStorage()`, `saveCurrentValuesToStorage()`.
  - `loadRebalanceTolerance()`, `updateRebalanceTolerance()`.
  - `migrateLegacyStorageKeys()` giúp chuyển dữ liệu cũ sang key mới.
- Ngưỡng rebalance:
  - `REBALANCE_TOLERANCE_STORAGE_KEY`, `DEFAULT_REBALANCE_TOLERANCE`.
  - `getActiveRebalanceThreshold()` trả về giá trị đang áp dụng.

## 4. Tính toán & cập nhật bảng rebalance
- `updateRebalanceMetrics()` / `updateRebalanceSummary()` / `renderRebalanceRows()`:
  - tính chênh lệch target vs current,
  - xác định “buy/sell” lượng tiền tương ứng,
  - render bảng gợi ý.
- `buildContributionSnapshot()` đóng gói dữ liệu (target, current, deviation) để chia sẻ với analytics.
- `exportRebalancePlan(format)` xuất CSV/JSON tùy nhu cầu.

## 5. Cập nhật biểu đồ và bảng tổng quan
- `updatePortfolioMetrics()`:
  - tính tổng target/current,
  - chuẩn bị dữ liệu cho biểu đồ doughnut & bar (nhờ `renderAllocationChart`, `renderDeviationChart` trong `charts.js`),
  - nạp thông tin drift lớn nhất / tổng mua bán.
- `initPortfolioTables()`: khởi tạo bảng tài sản, sector, region.
- `updatePortfolioMetadataPanel()` kết hợp metadata (số tài sản, sector, region) với thời gian cập nhật, đổ vào bảng trong Mission Metric Console.
- `renderMetricList()` helper chung để render list `<li>` theo template.

## 6. Tiện ích localStorage & parse dữ liệu
- `safeGetNumber(key, fallback)`, `safeParseJson(text)`, `persistJson(key, value)`, `loadJson(key, fallback)`: đảm bảo đọc/ghi ổn định kể cả khi storage bị đầy hoặc dữ liệu hỏng.
- `sanitizeInputValue()`, `coerceNumber()` hỗ trợ parse giá trị từ input mà không gây NaN.
- `formatCurrency()`, `formatPercent()` tái sử dụng định dạng tiền/ phần trăm (đồng bộ với data.js).

## 7. Ràng buộc sự kiện & UI helper
- `bindRebalanceInputs()`: gắn listener cho toàn bộ input target/current (bao gồm focus/blur/keydown).
- `bindRebalanceButtons()`: gán hành vi cho nút Reset/Even Split/Save/Load/Export.
- `setupCopyButtons()` & `setupDownloadButtons()` xử lý các nút copy/ tải CSV-JSON trong bảng Mission Metric Console.
- `setupMetricDropdowns()`: logic mở/đóng dropdown “xem chi tiết” với thao tác click ngoài vùng/ phím Esc.
- `setupExpanders()`, `setupTabs()`: tiện ích chung cho phần tử toggle/tab trong trang.
- `setupPortfolioActions()` (nếu có) để gắn hành động “thêm tài sản”, “xoá tài sản” khi giao diện mở rộng.

## 8. Chu trình khởi tạo
- `document.addEventListener('DOMContentLoaded', ...)` gọi:
  - `loadTargetsFromStorage()`, `loadCurrentValuesFromStorage()`, `loadRebalanceTolerance()` → phục hồi trạng thái trước.
  - `bindRebalanceInputs()`, `bindRebalanceButtons()`, `setupCopyButtons()`, `setupDownloadButtons()`, `setupMetricDropdowns()`, `setupExpanders()`, `setupTabs()`.
  - `updatePortfolioMetrics()` và `updatePortfolioMetadataPanel()` để đồng bộ dashboard ngay khi vào trang.
  - `window.showActionFeedback` hiển thị thông điệp ngắn khi người dùng thực hiện thao tác lưu/copy/đặt lại.

## 9. Gợi ý mở rộng
- Có thể thêm định dạng hoặc cách xuất dữ liệu mới bằng cách mở rộng `exportRebalancePlan()`.
- Nếu cần tích hợp API bên ngoài để đề xuất rebalance tự động, hãy sử dụng `buildContributionSnapshot()` làm input cho pipeline mới.
- Các hàm UI được tách riêng => dễ tái sử dụng: muốn thêm dropdown khác? gọi lại `setupMetricDropdowns()` sau khi render DOM mới.
