# Gunpla Hangar Command Console

> Mình xây dựng dashboard này để quản lý tài khoản Roth IRA theo cách **chuyên nghiệp** hơn nhưng vẫn giữ chất **thú vị** như đang điều khiển một buồng lái mecha.

## Từng phần mang lại gì?
- **Hangar Overview**: Hero section và các thẻ thống kê cập nhật portfolio health, giá trị hiện tại, mức rủi ro và các chỉ báo nhanh.
- **Unit Loadout Matrix**: Bảng phân bổ danh mục (đọc từ CSV) cùng thẻ tóm tắt giúp theo dõi số lượng tài sản, phân vùng US/Intl, mức drift.
- **Combat Telemetry**: Dàn biểu đồ Chart.js để quan sát phân bổ, đóng góp, top holdings và diễn biến thị trường.
- **Asset Details & Simulation Lab**: Tab chi tiết từng mã, mô phỏng đóng góp định kỳ, stress test, công cụ tính toán tái cân bằng/deposit.
- **AI Command Briefing**: Bộ khuyến nghị “AI” (logic tự viết) gồm hành động tức thì, chiến lược, quản trị rủi ro, dự phóng tương lai.
- **Market Heatmap & Fear & Greed**: Widget TradingView, heatmap tuỳ chỉnh, gauge tâm lý thị trường và bảng tin sự kiện.

## Công nghệ & dữ liệu
- **HTML5 tĩnh** kết hợp Tailwind CDN, Google Fonts (`Inter`, `Orbitron`, `Rajdhani`).
- **CSS tuỳ chỉnh** (`css/styles.css`) dựng phong cách HUD, hiệu ứng neon, grid layout responsive.
- **JavaScript thuần** trong `/js` (Chart.js, mô phỏng giá, analytics, AI recommendations, theme toggle).
- **Dữ liệu demo**: CSV (`ROTH IRA.xlsx - Sheet1.csv`, `btc.csv`, `vixy.csv`, `vix.csv`, `dxy.csv`) và `graph.json` làm nguồn cho biểu đồ và bảng.
- **Triển khai**: GitHub Pages tại [https://chacobee.github.io/RothIRA/](https://chacobee.github.io/RothIRA/).

## Cấu trúc thư mục chính
```
.
├── index.html              # Layout chính và khai báo script
├── css/
│   └── styles.css          # Toàn bộ phong cách HUD
├── js/                     # Các mô-đun logic (dữ liệu, biểu đồ, AI, tái cân bằng...)
├── img/                    # Hình nền và asset giao diện
├── tests/                  # Kiểm thử cho deposit & rebalance
├── *.csv / graph.json      # Dữ liệu giả lập
└── README.md               # Tài liệu này
```

## Hướng dẫn khởi chạy & deploy
1. **Local**: clone repo, mở `index.html` bằng trình duyệt (không cần backend).
2. **Chỉnh sửa**: Cập nhật dữ liệu CSV hoặc JS → refresh để xem hiệu ứng ngay.
3. **Triển khai**:
   ```bash
   git add .
   git commit -m "Update dashboard"
   git push origin main
   ```
   GitHub Pages tự build và cập nhật site.

## Hướng phát triển
- Kết nối API giá thực (Finnhub/Polygon) thay dữ liệu mô phỏng.
- Viết thêm test cho khối analytics & AI.
- Tách thành ES Modules và dùng bundler (Vite) để quản lý dependency, minify.

> Nếu bạn muốn dựng lại toàn bộ console, xem tài liệu chi tiết trong `CACH_TAO_WEBSITE.md`.

Chúc bạn điều khiển “Gunpla” tài chính thật ngầu!***
