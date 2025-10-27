# Gunpla Hangar Command Console

Trang web này là một bảng điều khiển tương tác mô phỏng trung tâm điều hành cho danh mục đầu tư Roth IRA. Giao diện được thiết kế theo phong cách buồng lái mecha, tập trung vào trực quan hóa dữ liệu, cập nhật trạng thái thị trường và gợi ý hành động dựa trên nhiều nguồn thông tin.

## Nội dung chính
- **Tổng quan danh mục**: Hero section và các thẻ thống kê tóm tắt tài sản, mức đóng góp, hiệu suất và cảnh báo nhanh.
- **Phân bổ & tái cân bằng**: Bảng phân bổ chi tiết, công cụ đề xuất đóng góp và mô phỏng tái cân bằng dựa trên dữ liệu CSV.
- **Phân tích chuyên sâu**: Các khối biểu đồ Chart.js, bản đồ nhiệt thị trường, cảm biến Fear & Greed, phân tích chuỗi thời gian.
- **Khối AI & vận hành**: `js/ai-recommendations.js` tạo các khuyến nghị dạng thẻ; `js/live-prices.js` và `js/market-indices.js` mô phỏng dữ liệu thị trường tự động cập nhật.
- **Chế độ sáng/tối**: `js/theme.js` phối hợp với biến CSS để chuyển đổi giao diện mượt mà.

## Công nghệ sử dụng
- **HTML5 tĩnh** kết hợp Tailwind CSS CDN và font Google.
- **CSS tùy chỉnh** tại `css/styles.css` để xây dựng layout dạng lưới, hiệu ứng nền, ánh sáng.
- **JavaScript thuần** (không framework) chia thành nhiều mô-đun trong thư mục `js/` để xử lý dữ liệu, dựng biểu đồ Chart.js, tải TradingView widget, và logic AI mô phỏng.
- **Dữ liệu demo**: Các tệp CSV (`btc.csv`, `vixy.csv`, `ROTH IRA.xlsx - Sheet1.csv`, v.v.) và JSON (`graph.json`) làm nguồn cho các widget và biểu đồ.
- **Triển khai**: GitHub Pages phục vụ site tĩnh tại [https://chacobee.github.io/RothIRA/](https://chacobee.github.io/RothIRA/).

## Cấu trúc thư mục
```
.
├── index.html              # Trang chính với toàn bộ layout
├── css/
│   └── styles.css          # Toàn bộ styling tùy biến
├── js/                     # Các mô-đun chức năng (biểu đồ, AI, dữ liệu, mô phỏng...)
├── img/                    # Hình nền và asset đồ họa
├── tests/                  # Kiểm thử cho logic đóng góp & tái cân bằng
├── *.csv / *.json          # Dữ liệu giả lập
└── ADDME.md                # Tài liệu giới thiệu (file hiện tại)
```

## Điểm nhấn trải nghiệm
- Giao diện phong cách sci-fi với hiệu ứng neon, ánh sáng và texture dạng HUD.
- Các phần tử tương tác (dropdown, toggle, bảng cuộn) được tối ưu cho cả desktop và mobile.
- Hệ thống cập nhật giả lập tự động, mô tả cách một investor console hiện đại có thể vận hành.

## Liên hệ & đóng góp
- Mọi góp ý hoặc ý tưởng mới có thể mở issue/pull request trên repository GitHub: `https://github.com/ChacoBee/RothIRA`.
- Để triển khai lại, xem hướng dẫn chi tiết tại `HUONGDAN_A_DEN_Z.md`.

Chúc bạn tận hưởng chuyến bay trong buồng lái Gunpla!
