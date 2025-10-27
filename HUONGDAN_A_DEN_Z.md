# Hướng dẫn A đến Z: Tự dựng Gunpla Hangar Command Console

Tài liệu này giải thích toàn bộ quy trình tạo lại website Gunpla Hangar Command Console từ con số 0, bao gồm cấu trúc thư mục, nguồn dữ liệu, các mô-đun JavaScript và cách triển khai lên GitHub Pages.

---

## 1. Chuẩn bị môi trường
- **Hệ điều hành**: Windows, macOS hoặc Linux.
- **Phần mềm cần cài**:
  - [Git](https://git-scm.com/downloads) để quản lý phiên bản.
  - Trình soạn thảo (khuyến nghị VS Code).
  - Trình duyệt hiện đại (Chrome, Edge, Firefox) để xem kết quả.
- (Tùy chọn) Node.js nếu bạn muốn chạy các file kiểm thử trong `tests/`.

## 2. Khởi tạo dự án
1. Tạo thư mục rỗng, ví dụ `RothIRA`.
2. Mở terminal tại thư mục đó và chạy:
   ```bash
   git init
   ```
3. Tạo cấu trúc thư mục cơ bản:
   ```
   RothIRA/
   ├── css/
   ├── js/
   ├── img/
   ├── tests/
   └── index.html
   ```

## 3. Xây dựng `index.html`
File HTML chính chứa toàn bộ layout giao diện.

1. Tạo phần `<head>` với:
   - Thẻ meta `viewport` cho responsive.
   - Liên kết đến Tailwind CSS CDN, Chart.js CDN và Google Fonts (`Inter`, `Orbitron`, `Rajdhani`).
   - Liên kết tới stylesheet nội bộ `css/styles.css`.
2. Trong `<body>`, đặt khối `div.app-shell` chia làm hai vùng:
   - `aside.app-sidebar` hiển thị tiêu đề, điều hướng và nút chuyển theme.
   - `main.app-main` chứa các `<section>` cho từng mô-đun: tổng quan, phân bổ, biểu đồ, AI recommendation, Heatmap, Fear & Greed, v.v.
3. Gắn các thuộc tính `id` vào từng section để điều hướng hoạt động.
4. Tải các script cuối trang theo thứ tự cần thiết:
   ```html
   <script src="js/utils.js" defer></script>
   <script src="js/data.js" defer></script>
   <!-- ... lần lượt các mô-đun khác ... -->
   <script src="js/app.js" defer></script>
   ```
   `app.js` đóng vai trò entry point, khởi tạo theme, biểu đồ, đồng bộ dữ liệu.

## 4. Tạo stylesheet `css/styles.css`
Tệp này định hình toàn bộ phong cách HUD:
- Khai báo biến màu sắc/typography ở `:root` và chế độ `dark-mode`.
- Thiết kế nền động với hiệu ứng lưới, gradient, overlay ảnh (`img/nu_gundam.jpg`).
- Xây layout dạng CSS Grid cho `.app-shell`, các lưới con (`.stat-grid`, `.metric-grid`, `.analysis-hud__grid`, ...).
- Tạo phong cách cho thẻ, bảng, nút, dropdown, hiệu ứng hover sáng neon.
- Viết media query cho các breakpoint 1024px, 768px, 640px, 480px để tối ưu trên tablet/điện thoại.

Mỗi phần tử lớn (hero, bảng tái cân bằng, biểu đồ) đều có block CSS riêng kèm comment. Bạn có thể tái sử dụng cấu trúc này rồi chỉnh sửa nội dung/biểu tượng tùy ý.

## 5. Chuẩn bị dữ liệu giả lập
Đặt các tệp dữ liệu tại gốc dự án:
- `ROTH IRA.xlsx - Sheet1.csv`: danh sách mã cổ phiếu, số lượng, giá mua.
- `btc.csv`, `vixy.csv`, `vix.csv`, `dxy.csv`: dữ liệu lịch sử dùng cho biểu đồ.
- `graph.json`: cấu hình mạng lưới trong một số widget (nếu có).

Các script trong `js/` đọc các file này (thông qua `fetch`) để hiển thị bảng và biểu đồ. Nếu bạn đổi tên hoặc định dạng, nhớ cập nhật đường dẫn trong `js/data.js`.

## 6. Viết các mô-đun JavaScript
Mỗi tệp trong `js/` phụ trách một mảng chức năng:
- `utils.js`: hàm tiện ích, định dạng số, tính toán phần trăm.
- `theme.js`: lưu trạng thái light/dark vào `localStorage` và gắn listener nút chuyển mode.
- `data.js`: tải và chuẩn hóa dữ liệu từ CSV/JSON.
- `charts.js`, `market-indices.js`, `performance.js`, `fear-greed.js`, `heatmap.js`: dựng biểu đồ Chart.js, heatmap, gauge và cập nhật theo thời gian.
- `live-prices.js`: mô phỏng dòng giá realtime cho bảng chính.
- `ai-recommendations.js`, `analytics.js`: sinh nội dung đề xuất và báo cáo nâng cao.
- `deposit-core.js`, `deposit-rebalance-core.js`, `rebalance.js`: xử lý logic đóng góp định kỳ và tái cân bằng danh mục.
- `tradingview-loader.js`, `tradingview.js`: nhúng widget TradingView nếu muốn kết nối API ngoài.
- `app.js`: gọi các hàm khởi tạo ở trên, lắng nghe sự kiện UI.

Script nào phụ thuộc script khác cần được import sau trong `index.html` (ví dụ `app.js` phải nằm cuối).

## 7. Thêm hình ảnh và asset
- Đặt tài nguyên nền và biểu tượng trong `img/`. Ví dụ `img/nu_gundam.jpg` được dùng làm nền chính.
- Đảm bảo các đường dẫn trong CSS/HTML trỏ đúng thư mục này.

## 8. Kiểm thử
- Mở `index.html` trực tiếp bằng trình duyệt để kiểm tra bố cục và tương tác.
- Nếu có Node.js, cài `vitest` hoặc `jest` (tùy sở thích) để chạy các test trong `tests/`:
  ```bash
  npm init -y
  npm install --save-dev vitest
  npx vitest
  ```
  Hai file `deposit-core.test.js` và `deposit-rebalance-core.test.js` xác minh các thuật toán đóng góp/tái cân bằng.

## 9. Triển khai lên GitHub Pages
1. Tạo repository mới trên GitHub, ví dụ `ChacoBee/RothIRA`.
2. Kết nối và đẩy mã nguồn:
   ```bash
   git add .
   git commit -m "Initial publish"
   git branch -M main
   git remote add origin https://github.com/ChacoBee/RothIRA.git
   git push -u origin main
   ```
3. Trên GitHub → *Settings* → *Pages* → *Source*: chọn branch `main`, folder `/ (root)` → *Save*.
4. Sau khoảng 1–2 phút, site sẽ lên tại `https://<username>.github.io/RothIRA/`.

## 10. Bảo trì & mở rộng
- Khi thay đổi nội dung: chỉnh code → `git add` → `git commit` → `git push` (Pages sẽ tự build lại).
- Có thể tách dữ liệu thực tế ra API, chuyển mô-đun JS sang fetch API thật.
- Nâng cấp trải nghiệm mobile bằng cách thêm layout card cho bảng dài, hoặc lazy-load các widget nặng.

---

Với các bước trên, bạn có thể tự dựng lại website và tùy biến theo nhu cầu cá nhân. Nếu cần tham khảo nhanh về tính năng, hãy xem `ADDME.md`.
