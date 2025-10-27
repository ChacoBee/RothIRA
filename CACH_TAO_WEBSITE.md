# Cách Tạo Website Gunpla Hangar Command Console

Tài liệu này hướng dẫn chi tiết cách dựng lại toàn bộ website **Gunpla Hangar Command Console** bằng tiếng Việt. Bạn sẽ biết từng phần tử HTML cần viết, màu sắc và lớp CSS đi kèm, cũng như các mô-đun JavaScript cập nhật dữ liệu cho giao diện. Mục tiêu là có thể tái tạo trang từ đầu, hiểu rõ kiến trúc và dễ dàng mở rộng.

---

## 1. Kiến trúc tổng quát

- **Trang đơn tĩnh** (`index.html`) kết hợp:
  - Tailwind CSS CDN cho utility class nhanh.
  - CSS tuỳ biến tại `css/styles.css` để tạo phong cách HUD và hiệu ứng neon.
  - Chart.js CDN + TradingView script để dựng biểu đồ.
  - JavaScript thuần trong thư mục `js/` chia thành nhiều mô-đun độc lập.
- **Bố cục chính**: `div.app-shell` sử dụng CSS Grid, chia thành 2 cột:
  1. `aside.app-sidebar` (menu điều hướng, mô tả, công tắc theme).
  2. `main.app-main` chứa tất cả các section dữ liệu.
- **Responsive**: media query ở 1024px / 768px / 640px / 480px; `app-shell` chuyển sang 1 cột trên tablet/moblie, các bảng hỗ trợ cuộn ngang với `overflow-x-auto`.

---

## 2. Màu sắc & kiểu chữ

### 2.1 Biến màu trong `css/styles.css`

| Biến | Giá trị | Ghi chú |
| --- | --- | --- |
| `--color-primary` | `#ff6a1a` | Cam neon (điểm nhấn chính). |
| `--color-secondary` | `#52d0d3` | Xanh cảm biến, dùng cho highlight. |
| `--color-tertiary` | `#f1f4fb` | Nền sáng cho card. |
| `--color-background-light` | `#080b14` | Nền tổng thể chế độ sáng. |
| `--color-text-light` | `#f5f7ff` | Màu chữ chính. |
| `--color-card-light` | `rgba(16,20,31,0.9)` | Nền card trong chế độ sáng. |
| `--color-border-light` | `rgba(126,138,162,0.42)` | Viền card sáng. |
| `--color-profit` | `#52e0dd` | Lãi. |
| `--color-loss` | `#ff6f5e` | Lỗ. |
| `--color-neutral` | `#9faed6` | Trạng thái trung tính. |
| `--color-grid-line` | `rgba(82,208,220,0.12)` | Lưới nền. |
| `--color-glow` | `rgba(255,106,26,0.52)` | Hiệu ứng phát sáng. |

Trong `.dark-mode` các biến được chuyển sang tông tối: `--color-background`, `--color-card`, `--color-border`, `--color-input-bg`.

### 2.2 Phông chữ
- Khai báo trong `<head>`: Google Fonts `Inter`, `Orbitron`, `Rajdhani`.
- Heading sử dụng biến `--font-heading` = `"Orbitron", "Rajdhani", "Inter", sans-serif`.

---

## 3. Nền và layout tổng

### 3.1 Reset & nền (`css/styles.css`)
1. Đặt `box-sizing: border-box` cho `*` để tính toán padding dễ kiểm soát.
2. `body`:
   - `min-height: 100vh`, `margin: 0`, `overflow-x: hidden`.
   - Pseudo-element `::before` và `::after` tạo hiệu ứng lưới cùng hình nền `img/nu_gundam.jpg`.
3. Media query điều chỉnh kích thước nền ở 1200px, 768px, 480px.

### 3.2 Khối `.app-shell`
```html
<div class="app-shell">
  <aside class="app-sidebar">...</aside>
  <main class="app-main">...</main>
</div>
```
- CSS:
  - `display: grid; grid-template-columns: minmax(0,280px) minmax(0,1fr);`
  - `gap: clamp(1.5rem,4vw,3rem); padding: clamp(1.5rem,4vw,3rem);`
  - `width: min(96vw,1800px); margin: 0 auto;`
- Breakpoint ≤1024px: chuyển sang 1 cột (`grid-template-columns: 1fr`), bỏ `position: sticky` của sidebar.

---

## 4. Sidebar (Điều hướng chính)

### 4.1 HTML
```html
<aside class="app-sidebar card card--lifted">
  <div class="app-sidebar__inner">
    <div class="app-sidebar__top">
      <div>
        <p class="app-sidebar__eyebrow">Gunpla Hangar</p>
        <p class="app-sidebar__title">Command Hub</p>
      </div>
      <button id="themeToggleBtn" class="theme-toggle" aria-label="Toggle dark theme">
        <svg id="sunIcon" class="theme-toggle__icon theme-toggle__icon--sun hidden">...</svg>
        <svg id="moonIcon" class="theme-toggle__icon theme-toggle__icon--moon">...</svg>
      </button>
    </div>
    <p class="app-sidebar__intro">...</p>
    <nav class="app-sidebar__nav">
      <ul class="app-sidebar__list">
        <li><a class="app-sidebar__link" href="#overview"><span class="app-sidebar__index">01</span><span>Hangar Overview</span></a></li>
        <!-- ... các anchor khác ... -->
      </ul>
    </nav>
    <!-- có thể thêm footer, trạng thái -->
  </div>
</aside>
```

### 4.2 CSS chính
- `.app-sidebar` (`css/styles.css:320`):
  - `position: sticky; top: clamp(1.5rem,5vw,3rem); display:flex; flex-direction:column; gap:1.75rem;`
  - `padding: clamp(1.75rem,2vw+1.25rem,2.25rem); border-radius: 1.5rem;`
  - Nền `rgba(12,19,33,0.88)`, viền `rgba(82,208,220,0.2)`, `backdrop-filter: blur(8px)`.
- `.app-sidebar__list`: dạng cột; ở ≤1024px chuyển thành hàng ngang cuộn (`overflow-x: auto; scrollbar-width: thin`).
- `.theme-toggle`: nút tròn hiển thị icon mặt trời/mặt trăng.

### 4.3 JavaScript liên quan
- `js/theme.js`
  - `loadTheme()`: đọc `localStorage`, thêm/bỏ lớp `.dark-mode` trên `<html>`.
  - `toggleTheme()`: đổi theme, đồng thời bật/tắt icon `sunIcon`/`moonIcon`.
- `js/utils.js`
  - `initializeMetricDropdownToggles()` thêm sự kiện cho các dropdown trong sidebar và phần main, đảm bảo đồng nhất hành vi.

---

## 5. Các section trong `main.app-main`

### Cách khởi tạo chung
```html
<main class="app-main">
  <div class="container">
    <section id="overview" class="section mb-12">...</section>
    <!-- các section tiếp theo -->
  </div>
</main>
```
- `.app-main > .container`: padding trái/phải (`clamp(...)`), width 100%.
- `.section`: margin dưới `clamp(3rem,5vw,4.5rem)`, `scroll-margin-top` để anchor lên đúng vị trí.
- `.section-header`: flex ngang, icon + tiêu đề + mô tả.

### 5.1 Section `#overview` – Hangar Diagnostics
**Thành phần:**
1. **Hero headline** (`.hero`):
   - Layout: `display:flex; flex-direction:column; gap:1.5rem;`
   - Nền gradient + overlay grid (pseudoelement `::before`, `::after`).
   - Nội dung: `.hero__eyebrow`, `.hero__title`, `.hero__lead`, `.hero__actions`, `.hero__badge`, `.hero__readouts`.
   - JS: `js/app.js` gọi `updateHeroMetricTilesSummary()` trong `utils.js` để cập nhật số liệu nhanh.
2. **Stat Grid** (`.stat-grid`):
   - CSS: `display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:1.5rem;`.
   - Mỗi card `.stat-card` có biến thể màu `--emerald`, `--indigo`, `--amber`.
   - JS: `analytics.js` & `utils.js` cập nhật ID `portfolioScore`, `currentTotalValueDisplay`, `riskLevel`.
3. **Metric Tiles** (`.metric-grid`):
   - Mỗi tile `.metric-tile` chứa dot màu (`metric-tile__dot--psycho`, `--orange`, ...).
   - Dropdown (class `metric-dropdown-wrapper`) hiển thị danh sách holdings; toggled bằng `initializeMetricDropdownToggles()`.

### 5.2 Section `#allocation` – Unit Loadout Matrix
1. **Summary Cards** (Tailwind + custom CSS):
   - Lớp `grid grid-cols-1 md:grid-cols-4 gap-4`.
   - Số liệu ID: `allocationAssetCount`, `usStockCount`, `intlStockCount`, `riskTierCount`.
   - JS nguồn: `analytics.js` và `data.js` tổng hợp danh sách.
2. **Bảng phân bổ chính** (`.modern-table`):
   - Gói trong `div.overflow-x-auto` → cuộn ngang trên mobile.
   - Thead/Tbody thẻ <th>/<td> dùng class Tailwind (`px-4`, `py-3`, `text-right`...).
   - JS: `live-prices.js` và `analytics.js` gán dữ liệu theo ID `allocationTableBody`.
3. **Insight Cards** (class `.allocation-insight` trong CSS) hiển thị bullets, gradient border.

### 5.3 Section `#chart-section` – Combat Telemetry
1. **Biểu đồ trung tâm** (`canvas#allocationChart`):
   - `charts.js` -> hàm `renderAllocationChart()` (tên cần xem cụ thể) sử dụng Chart.js doughnut hoặc line.
2. **Top holdings sidebar**:
   - Lớp `.top-holdings` & `.holding-card`.
   - JS: `charts.js` hoặc `data.js` điền `id="topHoldingsList"`.

### 5.4 Section `#details` – Asset Details
1. **Tabs cổ phiếu** (`js/stockDetails.js`):
   - `initializeStockTabs()` thêm sự kiện click.
   - `updateStockDetails(stockKey)` render bảng con.
2. **Bảng chi tiết**:
   - Sử dụng `table.modern-table` hoặc Tailwind `divide-y`.
   - Mỗi dòng có data-attribute (`data-field`) để JS cập nhật.

### 5.5 Section `#simulation` – Simulation Lab
1. **Form đóng góp** (`.simulation-panel`):
   - Input `.styled-input`, slider `.contribution-toggle`.
   - JS: `rebalance.js`, `deposit-core.js` tính toán target.
2. **Biểu đồ mô phỏng** (`canvas#simulationChart`).

### 5.6 Section `#advanced-tracker` – Advanced Rebalance & Deposit Tool
Bao gồm 3 khối:
1. **Rebalance Tool** (`div.rebalance-card`):
   - Form nhập mục tiêu, slider, và bảng `rebalanceTable`.
   - JS: `rebalance.js` (nhóm hàm `initializeDepositRebalanceHelper`, `calculateDepositAllocation`, `recalculateDepositRebalance`).
2. **Deposit Allocation Tool**:
   - Input số tiền (`id="depositAmountInput"`), nút `Calculate`.
   - JS: `deposit-core.js`, `deposit-rebalance-core.js` cung cấp thuật toán.
3. **Deposit Rebalancing Helper**:
   - Cho phép khoá ticker, chọn `roundingMode`.

### 5.7 Section `#analytics` – Advanced Portfolio Insights
1. **Background pattern**: `div.analysis-hud` với gradient, overlay.
2. **Các module nhỏ**:
   - `analysis-hud__grid--matrix`: lưới 4 cột (sau reduce theo breakpoint).
   - Mỗi `hud-card` hiển thị metric (Sharpe, Beta, Diversification...).
3. **Asset contribution table**:
   - Sử dụng `<table class="modern-table">` hiển thị đóng góp rủi ro.
   - JS: `analytics.js` (`refreshAssetContributionTable()`).

### 5.8 Section `#ai-recommendations` – AI Command Briefing
1. **Portfolio Health Score** (`#portfolioHealthScore`):
   - Card `analysis-hud`.
   - JS: `ai-recommendations.js` cập nhật gauge, badges.
2. **Immediate Actions / Strategic Advice / Risk Management / Market Insights / Future Predictions / Personalized Tips**:
   - Mỗi mục có container `id` riêng (`immediateActions`, `strategicAdviceList`, ...).
   - Các hàm `updateImmediateActions`, `updateStrategicAdvice`, ... điền nội dung.

### 5.9 Section `#performance`
1. **Biểu đồ tăng trưởng** (`canvas#performanceChart`):
   - JS: `performance.js` (`renderPerformanceChart`).
2. **Bảng Metric** (`.performance-metrics`):
   - Gồm `id` như `performanceCAGR`, `performanceVolatility`.

### 5.10 Section `#marketHeatmap`
1. **TradingView embed**: `div#tradingViewWidget`.
   - JS: `tradingview-loader.js` đảm bảo load script chỉ 1 lần; `tradingview.js` tạo widget.
2. **Heatmap custom**: `heatmap.js` render lưới asset.

### 5.11 Section `#fearGreed`
1. **Gauge** (`canvas#fearGreedGauge`) + timeline (`canvas#fearGreedTrend`).
2. **Live cards**: container `#fearGreedLiveCards` hiển thị bản tin.
   - JS: `fear-greed.js` (`updateFearGreedGauge`, `populateFearGreedCards`).

### 5.12 Other subsections
- **Operations columns** (`section.ops-column`): chuỗi log nhiệm vụ.
- **Timeline**: hiển thị lịch tái cân bằng.
- CSS `.ops-column`, `.ops-card` mô tả gradient viền, `::before` overlay scanline.

---

## 6. CSS chi tiết theo nhóm

### 6.1 Card & hiệu ứng chung
- `.card`, `.card::before`, `.card::after`: tạo viền đôi, ánh sáng cam.
- `.card--lifted`: thêm `box-shadow` nổi.
- `.metric-dropdown`: menu phẳng, `animation: dropdownFade`.

### 6.2 Lưới phân tích
- `.analysis-hud`: nền gradient xanh/cam, border `rgba(120,190,255,0.22)`.
- `.analysis-hud__grid--matrix`: `grid-template-columns: repeat(4, minmax(0, 1fr));` giảm dần ở 1024px→3 cột, 640px→2 cột, 480px→1 cột.
- `.hud-card`: bo góc lớn, overlay neon, icon `hud-card__icon`.

### 6.3 Bảng hiện đại `.modern-table`
- Header nền `#f3f4f6` (sáng) hoặc `#334155` (dark).
- Cell: `padding: 0.75rem; border-bottom`.
- Mobile (`@media max-width:768px`): giảm font-size, padding nhỏ hơn.

### 6.4 Form & input
- `.styled-input`: nền `var(--color-card-light)`, border gradient khi focus.
- `.styled-button`: uppercase, `transition`, hover nâng nhẹ.
- `.theme-toggle`: `border-radius:50%`, `box-shadow` neon khi hover.

### 6.5 Sidebar responsive
- `.app-sidebar__list`: flex column; trong breakpoint 1024px → `flex-direction: row`.
- `.app-sidebar__link`: `display:flex; align-items:center; gap:0.85rem;`.
- `.app-sidebar__index`: font `Orbitron`, `letter-spacing:0.2em`.

### 6.6 Background animation
- `@keyframes hudScanlines`, `@keyframes hudSweep`, `@keyframes marketIndexSkeleton`: dùng cho animation thẻ HUD và skeleton loading.

---

## 7. Mô-đun JavaScript & hàm chính

### 7.1 `js/app.js`
- Khởi động toàn bộ console.
- Hàm chính (cần xem file để gọi đúng):
  - `initializeApp()`: gọi `loadTheme`, `initializeMetricDropdownToggles`, load dữ liệu CSV, khởi tạo biểu đồ, v.v.
  - Đăng ký sự kiện `DOMContentLoaded`.

### 7.2 `js/utils.js`
- **Quản lý mục tiêu phân bổ**: `normalizeTargets`, `resetTargetsToDefaults`, `saveTargetsToLocalStorage`, `loadTargetsFromLocalStorage`.
- **Cập nhật giao diện**: `updatePortfolioMetrics`, `updateHeroMetricTilesSummary`, `renderMetricList`, `initializeMetricDropdownToggles`.
- **Rebalance helper**: `initializeRebalanceInputs`, `createRebalanceResult`, `applyLiveDataToRebalance`.
- **Thông tin hệ thống**: `getPortfolioMetadataSummary`, `formatLastUpdatedLabels`.

### 7.3 `js/data.js`
- Đọc dữ liệu CSV/JSON (sử dụng `fetch`).
- `loadPortfolioTargets()`, `loadHistoricalSeries()`, `parseCSV()`, `transformHoldingsData()`.

### 7.4 `js/live-prices.js`
- `fetchLatestPrices()`: mô phỏng giá mới.
- `updateLivePriceTable(rows)`: gán dữ liệu vào bảng allocation.
- `startLivePriceLoop()`: interval cập nhật UI.

### 7.5 `js/charts.js`
- `renderAllocationChart()`: doughnut/phân bổ.
- `renderSectorChart()`, `renderContributionChart()`.
- `resizeChartsOnThemeToggle()`: đổi màu dataset khi theme đổi.

### 7.6 `js/market-indices.js`
- `initializeMarketIndexCards()`, `updateIndexCard(symbol)`.
- `simulateIndexSeries()` tạo dữ liệu giả cho biểu đồ nhỏ.

### 7.7 `js/performance.js`
- `simulatePerformance(targets, years)` sinh chuỗi giá trị.
- `calculateMetrics(portfolioValues, benchmarkValues, periodsPerYear)` -> CAGR, Volatility, Sharpe, Max Drawdown.
- `renderPerformanceChart(...)` vẽ biểu đồ line.
- `updatePerformanceMetricsDisplay(metrics)` điền số liệu vào card.

### 7.8 `js/analytics.js`
- **Tiện ích xử lý số liệu**: `normalizeWeights`, `calculateExpectedReturn`, `calculateVolatility`, `calculatePortfolioBeta`, `calculateAlpha`, `calculateCalmarRatio`.
- **Đánh giá rủi ro**: `scoreVolatility`, `scoreSharpe`, `scoreBeta`, `scoreExpectedReturn`, `scoreDiversity`.
- **Stress & đóng góp**: `buildCovarianceMatrix`, `calculateRiskContributionMetrics`, `refreshAssetContributionTable`.
- **Lưu trạng thái**: `loadContributionSnapshots`, `updateContributionSnapshot`, `setContributionMode`.
- **Hiển thị giao diện**: `updateContributionHeaders`, `markStressTestHighlight`.

### 7.9 `js/deposit-core.js` & `js/deposit-rebalance-core.js`
- `calculateDepositAllocationPlan(amount, targets)` (tên tương tự) → chia tiền theo mục tiêu.
- `rebalanceWithDeposit()` áp dụng cho cả tái cân bằng hiện tại.
- Các hàm `clampToStep`, `roundShares`, `computeDriftAfterDeposit`.

### 7.10 `js/rebalance.js`
- `initializeDepositAllocationInputs()`, `calculateDepositAllocation()`, `initializeDepositRebalanceHelper()`.
- Quản lý trạng thái lưu trữ: `loadRebalanceDepositAmount`, `saveRebalanceDepositAmount`, `loadRebalanceRoundingMode`.
- Điều khiển toggles khoá ticker: `applyRebalanceLockVisual`, `getRebalanceLockSet`, `persistRebalanceLocks`.
- `recalculateDepositRebalance()` chạy sau mỗi lần thay đổi input.

### 7.11 `js/ai-recommendations.js`
- **Hàm tiện ích**: `safeNumber`, `clamp`, `sumObjectValues`, `normalizePercents`, `computeDeviationMap`, `weightedAverage`, `herfindahlIndex`.
- **Tính toán chỉ số**: `calculatePortfolioMetrics`, `estimateLiquidityScore`, `scoreRiskReturn`, `scoreDiversification`, `scoreDrawdownResilience`, `scoreGoalAlignment`.
- **Tạo nội dung**:
  - `buildImmediateActions`, `buildPortfolioHealth`, `buildStrategicAdvice`, `buildRiskManagement`, `buildMarketInsights`, `buildFuturePredictions`, `buildPersonalizedTips`.
- **Cập nhật UI**:
  - `mapPriorityBadgeClasses`, `mapStatusColor`, `mapProgressGradient`, `mapScoreVisuals`.
  - `updatePortfolioHealth`, `updatePhsBreakdown`, `updateImmediateActions`, `updateStrategicAdvice`, `updateRiskManagement`, `updateMarketInsights`, `updateFuturePredictions`, `updatePersonalizedTips`.
- **Điểm vào chính**: `updateAIRecommendationsSection()` gom tất cả.

### 7.12 `js/ai-recommendations.js` kết hợp dữ liệu
- `collectPortfolioSnapshot()` đọc dữ liệu hiện tại (giá trị, mục tiêu) từ các mô-đun khác thông qua biến global.

### 7.13 `js/fear-greed.js`
- `updateFearGreedGauge(index)`, `renderFearGreedTrend(data)`, `populateFearGreedCards(events)`.
- `loadFearGreedSeries()` lấy dữ liệu CSV/JSON mô phỏng, `startFearGreedFeed()` tạo ticker chạy liên tục.

### 7.14 `js/heatmap.js`
- `renderHeatmapGrid(data)` dựng lưới `<div>`.
- `colorScale(value)` ánh xạ giá trị sang gradient xanh/đỏ.
- `loadHeatmapData()` fetch dữ liệu.

### 7.15 `js/live-prices.js`, `js/market-indices.js`, `js/performance.js` phối hợp
- `subscribeToThemeChanges(callback)` (nếu có) đảm bảo biểu đồ đổi màu theo theme.

### 7.16 `js/stockDetails.js`
- `initializeStockTabs()`: tạo listener cho tabs.
- `updateStockTabsLabels()` hiển thị ticker + %.
- `getStockAllocationSnapshot(stockKey)` trả về thông tin chi tiết.
- `updateStockDetails(stockKey)`, `refreshActiveStockDetails()` render nội dung.

### 7.17 `js/stress.js`
- `runStressTest()`: áp dụng kịch bản rủi ro.
- `applyStressScenario(scenario, severity)`: tính giá trị giảm/ tăng.
- `populateStressAssetTable()`, `renderStressChart()` cập nhật UI.
- `updateSeverityDisplay()`, `resetStressTest()` điều khiển form.

### 7.18 `js/theme.js`
- `loadTheme()`, `toggleTheme()` như đã mô tả phần sidebar.

### 7.19 `js/tradingview-loader.js` & `js/tradingview.js`
- Loader đảm bảo script TradingView chỉ tải một lần:
  - `ensureScriptLoaded()`, `setDesiredRender(symbol, theme)`, `requestRender()`, `hasLoaded()`.
- `tradingview.js`: `createTradingViewWidget(fullSymbol, theme)`, `createMiniTradingViewWidget`.

### 7.20 `js/app.js` (tổng hợp)
- Gọi tuần tự:
  - `loadTheme()`
  - `initializeMetricDropdownToggles()`
  - `initializeMarketIndexCards()`
  - `startLivePriceLoop()`
  - `initializePerformance()`
  - `updateAIRecommendationsSection()`
  - `renderHeatmapGrid()`, `updateFearGreedGauge()`, ...
- Đăng ký listener `document.addEventListener("visibilitychange", ...)` (nếu có) để tạm dừng cập nhật khi tab ẩn.

> **Lưu ý**: mỗi mô-đun đọc dữ liệu qua biến global được khai báo trong `data.js` (vd: `portfolioTargets`, `livePriceRows`). Khi bạn tách dự án thành module bundler, hãy chuyển sang `import/export` chính thức.

---

## 8. Dữ liệu & thư mục phụ trợ

- `img/`: chứa hình nền, biểu tượng HUD. Cần đúng đường dẫn mới hiển thị gradient overlay chuẩn.
- `btc.csv`, `vixy.csv`, `vix.csv`, `dxy.csv`: data cho biểu đồ so sánh chỉ số.
- `ROTH IRA.xlsx - Sheet1.csv`: danh sách holdings chính.
- `graph.json`: dùng cho một số widget dựa trên mạng lưới quan hệ (nghiên cứu thêm trong `js/analytics.js`).
- `tests/`: 
  - `deposit-core.test.js`, `deposit-rebalance-core.test.js` kiểm tra logic chia tiền; chạy bằng Vitest/Jest nếu bạn cấu hình Node.js.

---

## 9. Các bước dựng lại từ đầu (tóm tắt)
1. **Khởi tạo dự án**: tạo thư mục, `git init`, thêm cấu trúc `/css`, `/js`, `/img`.
2. **Tạo `index.html`**: copy skeleton `<head>` (meta, link CSS/JS CDN) và `<body>` với `app-shell`.
3. **Viết `css/styles.css`**: sao chép các section như mô tả trên (biến màu, hero, stat-grid, analysis-hud,...).
4. **Thêm dữ liệu mẫu**: đặt CSV/JSON vào gốc dự án.
5. **Sao chép mô-đun JS**: lần lượt tạo file trong `js/` với logic đã mô tả.
6. **Kiểm tra cục bộ**: mở `index.html` trên trình duyệt; dùng DevTools > Responsive để chắc layout đẹp trên mobile.
7. **Triển khai**: push lên GitHub, bật GitHub Pages (`Settings > Pages > Branch main > /(root)`).

---

## 10. Mẹo mở rộng
- Bổ sung API thật (Finnhub, Alpha Vantage) để thay dữ liệu mô phỏng.
- Tách code thành ES Modules và sử dụng bundler (Vite/Webpack) để quản lý dependency.
- Viết thêm test cho `ai-recommendations.js` và `analytics.js` nếu chuyển logic vào backend.
- Chuẩn hoá `localStorage` keys, thêm migration khi thay đổi cấu trúc dữ liệu.

---

Chỉ cần bám sát tài liệu này, bạn có thể dựng lại từng section, hiểu rõ những đoạn CSS/JS nào chịu trách nhiệm điều khiển giao diện, và tuỳ biến console theo nhu cầu riêng. Chúc bạn thành công với buồng lái Gunpla của mình!
