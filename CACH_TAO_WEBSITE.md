# CÃƒÂ¡ch TÃ¡ÂºÂ¡o Website Gunpla Hangar Command Console

TÃƒÂ i liÃ¡Â»â€¡u nÃƒÂ y hÃ†Â°Ã¡Â»â€ºng dÃ¡ÂºÂ«n chi tiÃ¡ÂºÂ¿t cÃƒÂ¡ch dÃ¡Â»Â±ng lÃ¡ÂºÂ¡i toÃƒÂ n bÃ¡Â»â„¢ website **Gunpla Hangar Command Console** bÃ¡ÂºÂ±ng tiÃ¡ÂºÂ¿ng ViÃ¡Â»â€¡t. BÃ¡ÂºÂ¡n sÃ¡ÂºÂ½ biÃ¡ÂºÂ¿t tÃ¡Â»Â«ng phÃ¡ÂºÂ§n tÃ¡Â»Â­ HTML cÃ¡ÂºÂ§n viÃ¡ÂºÂ¿t, mÃƒÂ u sÃ¡ÂºÂ¯c vÃƒÂ  lÃ¡Â»â€ºp CSS Ã„â€˜i kÃƒÂ¨m, cÃ…Â©ng nhÃ†Â° cÃƒÂ¡c mÃƒÂ´-Ã„â€˜un JavaScript cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t dÃ¡Â»Â¯ liÃ¡Â»â€¡u cho giao diÃ¡Â»â€¡n. MÃ¡Â»Â¥c tiÃƒÂªu lÃƒÂ  cÃƒÂ³ thÃ¡Â»Æ’ tÃƒÂ¡i tÃ¡ÂºÂ¡o trang tÃ¡Â»Â« Ã„â€˜Ã¡ÂºÂ§u, hiÃ¡Â»Æ’u rÃƒÂµ kiÃ¡ÂºÂ¿n trÃƒÂºc vÃƒÂ  dÃ¡Â»â€¦ dÃƒÂ ng mÃ¡Â»Å¸ rÃ¡Â»â„¢ng.

---

## 1. KiÃ¡ÂºÂ¿n trÃƒÂºc tÃ¡Â»â€¢ng quÃƒÂ¡t

- **Trang Ã„â€˜Ã†Â¡n tÃ„Â©nh** (`index.html`) kÃ¡ÂºÂ¿t hÃ¡Â»Â£p:
  - Tailwind CSS CDN cho utility class nhanh.
  - CSS tuÃ¡Â»Â³ biÃ¡ÂºÂ¿n tÃ¡ÂºÂ¡i `css/styles.css` Ã„â€˜Ã¡Â»Æ’ tÃ¡ÂºÂ¡o phong cÃƒÂ¡ch HUD vÃƒÂ  hiÃ¡Â»â€¡u Ã¡Â»Â©ng neon.
  - Chart.js CDN + TradingView script Ã„â€˜Ã¡Â»Æ’ dÃ¡Â»Â±ng biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ.
  - JavaScript thuÃ¡ÂºÂ§n trong thÃ†Â° mÃ¡Â»Â¥c `js/` chia thÃƒÂ nh nhiÃ¡Â»Âu mÃƒÂ´-Ã„â€˜un Ã„â€˜Ã¡Â»â„¢c lÃ¡ÂºÂ­p.
- **BÃ¡Â»â€˜ cÃ¡Â»Â¥c chÃƒÂ­nh**: `div.app-shell` sÃ¡Â»Â­ dÃ¡Â»Â¥ng CSS Grid, chia thÃƒÂ nh 2 cÃ¡Â»â„¢t:
  1. `aside.app-sidebar` (menu Ã„â€˜iÃ¡Â»Âu hÃ†Â°Ã¡Â»â€ºng, mÃƒÂ´ tÃ¡ÂºÂ£, cÃƒÂ´ng tÃ¡ÂºÂ¯c theme).
  2. `main.app-main` chÃ¡Â»Â©a tÃ¡ÂºÂ¥t cÃ¡ÂºÂ£ cÃƒÂ¡c section dÃ¡Â»Â¯ liÃ¡Â»â€¡u.
- **Responsive**: media query Ã¡Â»Å¸ 1024px / 768px / 640px / 480px; `app-shell` chuyÃ¡Â»Æ’n sang 1 cÃ¡Â»â„¢t trÃƒÂªn tablet/moblie, cÃƒÂ¡c bÃ¡ÂºÂ£ng hÃ¡Â»â€” trÃ¡Â»Â£ cuÃ¡Â»â„¢n ngang vÃ¡Â»â€ºi `overflow-x-auto`.

---

## 2. MÃƒÂ u sÃ¡ÂºÂ¯c & kiÃ¡Â»Æ’u chÃ¡Â»Â¯

### 2.1 BiÃ¡ÂºÂ¿n mÃƒÂ u trong `css/styles.css`

| BiÃ¡ÂºÂ¿n | GiÃƒÂ¡ trÃ¡Â»â€¹ | Ghi chÃƒÂº |
| --- | --- | --- |
| `--color-primary` | `#ff6a1a` | Cam neon (Ã„â€˜iÃ¡Â»Æ’m nhÃ¡ÂºÂ¥n chÃƒÂ­nh). |
| `--color-secondary` | `#52d0d3` | Xanh cÃ¡ÂºÂ£m biÃ¡ÂºÂ¿n, dÃƒÂ¹ng cho highlight. |
| `--color-tertiary` | `#f1f4fb` | NÃ¡Â»Ân sÃƒÂ¡ng cho card. |
| `--color-background-light` | `#080b14` | NÃ¡Â»Ân tÃ¡Â»â€¢ng thÃ¡Â»Æ’ chÃ¡ÂºÂ¿ Ã„â€˜Ã¡Â»â„¢ sÃƒÂ¡ng. |
| `--color-text-light` | `#f5f7ff` | MÃƒÂ u chÃ¡Â»Â¯ chÃƒÂ­nh. |
| `--color-card-light` | `rgba(16,20,31,0.9)` | NÃ¡Â»Ân card trong chÃ¡ÂºÂ¿ Ã„â€˜Ã¡Â»â„¢ sÃƒÂ¡ng. |
| `--color-border-light` | `rgba(126,138,162,0.42)` | ViÃ¡Â»Ân card sÃƒÂ¡ng. |
| `--color-profit` | `#52e0dd` | LÃƒÂ£i. |
| `--color-loss` | `#ff6f5e` | LÃ¡Â»â€”. |
| `--color-neutral` | `#9faed6` | TrÃ¡ÂºÂ¡ng thÃƒÂ¡i trung tÃƒÂ­nh. |
| `--color-grid-line` | `rgba(82,208,220,0.12)` | LÃ†Â°Ã¡Â»â€ºi nÃ¡Â»Ân. |
| `--color-glow` | `rgba(255,106,26,0.52)` | HiÃ¡Â»â€¡u Ã¡Â»Â©ng phÃƒÂ¡t sÃƒÂ¡ng. |

Trong `.dark-mode` cÃƒÂ¡c biÃ¡ÂºÂ¿n Ã„â€˜Ã†Â°Ã¡Â»Â£c chuyÃ¡Â»Æ’n sang tÃƒÂ´ng tÃ¡Â»â€˜i: `--color-background`, `--color-card`, `--color-border`, `--color-input-bg`.

### 2.2 PhÃƒÂ´ng chÃ¡Â»Â¯
- Khai bÃƒÂ¡o trong `<head>`: Google Fonts `Inter`, `Orbitron`, `Rajdhani`.
- Heading sÃ¡Â»Â­ dÃ¡Â»Â¥ng biÃ¡ÂºÂ¿n `--font-heading` = `"Orbitron", "Rajdhani", "Inter", sans-serif`.

---

## 3. NÃ¡Â»Ân vÃƒÂ  layout tÃ¡Â»â€¢ng

### 3.1 Reset & nÃ¡Â»Ân (`css/styles.css`)
1. Ã„ÂÃ¡ÂºÂ·t `box-sizing: border-box` cho `*` Ã„â€˜Ã¡Â»Æ’ tÃƒÂ­nh toÃƒÂ¡n padding dÃ¡Â»â€¦ kiÃ¡Â»Æ’m soÃƒÂ¡t.
2. `body`:
   - `min-height: 100vh`, `margin: 0`, `overflow-x: hidden`.
   - Pseudo-element `::before` vÃƒÂ  `::after` tÃ¡ÂºÂ¡o hiÃ¡Â»â€¡u Ã¡Â»Â©ng lÃ†Â°Ã¡Â»â€ºi cÃƒÂ¹ng hÃƒÂ¬nh nÃ¡Â»Ân `img/nu_gundam.jpg`.
3. Media query Ã„â€˜iÃ¡Â»Âu chÃ¡Â»â€°nh kÃƒÂ­ch thÃ†Â°Ã¡Â»â€ºc nÃ¡Â»Ân Ã¡Â»Å¸ 1200px, 768px, 480px.

### 3.2 KhÃ¡Â»â€˜i `.app-shell`
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
- Breakpoint Ã¢â€°Â¤1024px: chuyÃ¡Â»Æ’n sang 1 cÃ¡Â»â„¢t (`grid-template-columns: 1fr`), bÃ¡Â»Â `position: sticky` cÃ¡Â»Â§a sidebar.

---

## 4. Sidebar (Ã„ÂiÃ¡Â»Âu hÃ†Â°Ã¡Â»â€ºng chÃƒÂ­nh)

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
        <!-- ... cÃƒÂ¡c anchor khÃƒÂ¡c ... -->
      </ul>
    </nav>
    <!-- cÃƒÂ³ thÃ¡Â»Æ’ thÃƒÂªm footer, trÃ¡ÂºÂ¡ng thÃƒÂ¡i -->
  </div>
</aside>
```

### 4.2 CSS chÃƒÂ­nh
- `.app-sidebar` (`css/styles.css:320`):
  - `position: sticky; top: clamp(1.5rem,5vw,3rem); display:flex; flex-direction:column; gap:1.75rem;`
  - `padding: clamp(1.75rem,2vw+1.25rem,2.25rem); border-radius: 1.5rem;`
  - NÃ¡Â»Ân `rgba(12,19,33,0.88)`, viÃ¡Â»Ân `rgba(82,208,220,0.2)`, `backdrop-filter: blur(8px)`.
- `.app-sidebar__list`: dÃ¡ÂºÂ¡ng cÃ¡Â»â„¢t; Ã¡Â»Å¸ Ã¢â€°Â¤1024px chuyÃ¡Â»Æ’n thÃƒÂ nh hÃƒÂ ng ngang cuÃ¡Â»â„¢n (`overflow-x: auto; scrollbar-width: thin`).
- `.theme-toggle`: nÃƒÂºt trÃƒÂ²n hiÃ¡Â»Æ’n thÃ¡Â»â€¹ icon mÃ¡ÂºÂ·t trÃ¡Â»Âi/mÃ¡ÂºÂ·t trÃ„Æ’ng.

### 4.3 JavaScript liÃƒÂªn quan
- `js/theme.js`
  - `loadTheme()`: Ã„â€˜Ã¡Â»Âc `localStorage`, thÃƒÂªm/bÃ¡Â»Â lÃ¡Â»â€ºp `.dark-mode` trÃƒÂªn `<html>`.
  - `toggleTheme()`: Ã„â€˜Ã¡Â»â€¢i theme, Ã„â€˜Ã¡Â»â€œng thÃ¡Â»Âi bÃ¡ÂºÂ­t/tÃ¡ÂºÂ¯t icon `sunIcon`/`moonIcon`.
- `js/utils.js`
  - `initializeMetricDropdownToggles()` thÃƒÂªm sÃ¡Â»Â± kiÃ¡Â»â€¡n cho cÃƒÂ¡c dropdown trong sidebar vÃƒÂ  phÃ¡ÂºÂ§n main, Ã„â€˜Ã¡ÂºÂ£m bÃ¡ÂºÂ£o Ã„â€˜Ã¡Â»â€œng nhÃ¡ÂºÂ¥t hÃƒÂ nh vi.

---

## 5. CÃƒÂ¡c section trong `main.app-main`

### CÃƒÂ¡ch khÃ¡Â»Å¸i tÃ¡ÂºÂ¡o chung
```html
<main class="app-main">
  <div class="container">
    <section id="overview" class="section mb-12">...</section>
    <!-- cÃƒÂ¡c section tiÃ¡ÂºÂ¿p theo -->
  </div>
</main>
```
- `.app-main > .container`: padding trÃƒÂ¡i/phÃ¡ÂºÂ£i (`clamp(...)`), width 100%.
- `.section`: margin dÃ†Â°Ã¡Â»â€ºi `clamp(3rem,5vw,4.5rem)`, `scroll-margin-top` Ã„â€˜Ã¡Â»Æ’ anchor lÃƒÂªn Ã„â€˜ÃƒÂºng vÃ¡Â»â€¹ trÃƒÂ­.
- `.section-header`: flex ngang, icon + tiÃƒÂªu Ã„â€˜Ã¡Â»Â + mÃƒÂ´ tÃ¡ÂºÂ£.

### 5.1 Section `#overview` Ã¢â‚¬â€œ Hangar Diagnostics
**ThÃƒÂ nh phÃ¡ÂºÂ§n:**
1. **Hero headline** (`.hero`):
   - Layout: `display:flex; flex-direction:column; gap:1.5rem;`
   - NÃ¡Â»Ân gradient + overlay grid (pseudoelement `::before`, `::after`).
   - NÃ¡Â»â„¢i dung: `.hero__eyebrow`, `.hero__title`, `.hero__lead`, `.hero__actions`, `.hero__badge`, `.hero__readouts`.
   - JS: `js/app.js` gÃ¡Â»Âi `updateHeroMetricTilesSummary()` trong `utils.js` Ã„â€˜Ã¡Â»Æ’ cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t sÃ¡Â»â€˜ liÃ¡Â»â€¡u nhanh.
2. **Stat Grid** (`.stat-grid`):
   - CSS: `display:grid; grid-template-columns: repeat(auto-fit, minmax(220px,1fr)); gap:1.5rem;`.
   - MÃ¡Â»â€”i card `.stat-card` cÃƒÂ³ biÃ¡ÂºÂ¿n thÃ¡Â»Æ’ mÃƒÂ u `--emerald`, `--indigo`, `--amber`.
   - JS: `analytics.js` & `utils.js` cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t ID `portfolioScore`, `currentTotalValueDisplay`, `riskLevel`.
3. **Metric Tiles** (`.metric-grid`):
   - MÃ¡Â»â€”i tile `.metric-tile` chÃ¡Â»Â©a dot mÃƒÂ u (`metric-tile__dot--psycho`, `--orange`, ...).
   - Dropdown (class `metric-dropdown-wrapper`) hiÃ¡Â»Æ’n thÃ¡Â»â€¹ danh sÃƒÂ¡ch holdings; toggled bÃ¡ÂºÂ±ng `initializeMetricDropdownToggles()`.

### 5.2 Section `#allocation` Ã¢â‚¬â€œ Unit Loadout Matrix
1. **Summary Cards** (Tailwind + custom CSS):
   - LÃ¡Â»â€ºp `grid grid-cols-1 md:grid-cols-4 gap-4`.
   - SÃ¡Â»â€˜ liÃ¡Â»â€¡u ID: `allocationAssetCount`, `usStockCount`, `intlStockCount`, `riskTierCount`.
   - JS nguÃ¡Â»â€œn: `analytics.js` vÃƒÂ  `data.js` tÃ¡Â»â€¢ng hÃ¡Â»Â£p danh sÃƒÂ¡ch.
2. **BÃ¡ÂºÂ£ng phÃƒÂ¢n bÃ¡Â»â€¢ chÃƒÂ­nh** (`.modern-table`):
   - GÃƒÂ³i trong `div.overflow-x-auto` Ã¢â€ â€™ cuÃ¡Â»â„¢n ngang trÃƒÂªn mobile.
   - Thead/Tbody thÃ¡ÂºÂ» <th>/<td> dÃƒÂ¹ng class Tailwind (`px-4`, `py-3`, `text-right`...).
   - JS: `live-prices.js` vÃƒÂ  `analytics.js` gÃƒÂ¡n dÃ¡Â»Â¯ liÃ¡Â»â€¡u theo ID `allocationTableBody`.
3. **Insight Cards** (class `.allocation-insight` trong CSS) hiÃ¡Â»Æ’n thÃ¡Â»â€¹ bullets, gradient border.

### 5.3 Section `#chart-section` Ã¢â‚¬â€œ Combat Telemetry
1. **BiÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ trung tÃƒÂ¢m** (`canvas#allocationChart`):
   - `charts.js` -> hÃƒÂ m `renderAllocationChart()` (tÃƒÂªn cÃ¡ÂºÂ§n xem cÃ¡Â»Â¥ thÃ¡Â»Æ’) sÃ¡Â»Â­ dÃ¡Â»Â¥ng Chart.js doughnut hoÃ¡ÂºÂ·c line.
2. **Top holdings sidebar**:
   - LÃ¡Â»â€ºp `.top-holdings` & `.holding-card`.
   - JS: `charts.js` hoÃ¡ÂºÂ·c `data.js` Ã„â€˜iÃ¡Â»Ân `id="topHoldingsList"`.

### 5.4 Section `#details` Ã¢â‚¬â€œ Asset Details
1. **Tabs cÃ¡Â»â€¢ phiÃ¡ÂºÂ¿u** (`js/stockDetails.js`):
   - `initializeStockTabs()` thÃƒÂªm sÃ¡Â»Â± kiÃ¡Â»â€¡n click.
   - `updateStockDetails(stockKey)` render bÃ¡ÂºÂ£ng con.
2. **BÃ¡ÂºÂ£ng chi tiÃ¡ÂºÂ¿t**:
   - SÃ¡Â»Â­ dÃ¡Â»Â¥ng `table.modern-table` hoÃ¡ÂºÂ·c Tailwind `divide-y`.
   - MÃ¡Â»â€”i dÃƒÂ²ng cÃƒÂ³ data-attribute (`data-field`) Ã„â€˜Ã¡Â»Æ’ JS cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t.

### 5.5 Section `#simulation` Ã¢â‚¬â€œ Simulation Lab
1. **Form Ã„â€˜ÃƒÂ³ng gÃƒÂ³p** (`.simulation-panel`):
   - Input `.styled-input`, slider `.contribution-toggle`.
   - JS: `rebalance.js`, `deposit-core.js` tÃƒÂ­nh toÃƒÂ¡n target.
2. **BiÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ mÃƒÂ´ phÃ¡Â»Âng** (`canvas#simulationChart`).

### 5.6 Section `#advanced-tracker` Ã¢â‚¬â€œ Advanced Rebalance & Deposit Tool
Bao gÃ¡Â»â€œm 3 khÃ¡Â»â€˜i:
1. **Rebalance Tool** (`div.rebalance-card`):
   - Form nhÃ¡ÂºÂ­p mÃ¡Â»Â¥c tiÃƒÂªu, slider, vÃƒÂ  bÃ¡ÂºÂ£ng `rebalanceTable`.
   - JS: `rebalance.js` (nhÃƒÂ³m hÃƒÂ m `initializeDepositRebalanceHelper`, `calculateDepositAllocation`, `recalculateDepositRebalance`).
2. **Deposit Allocation Tool**:
   - Input sÃ¡Â»â€˜ tiÃ¡Â»Ân (`id="depositAmountInput"`), nÃƒÂºt `Calculate`.
   - JS: `deposit-core.js`, `deposit-rebalance-core.js` cung cÃ¡ÂºÂ¥p thuÃ¡ÂºÂ­t toÃƒÂ¡n.
3. **Deposit Rebalancing Helper**:
   - Cho phÃƒÂ©p khoÃƒÂ¡ ticker, chÃ¡Â»Ân `roundingMode`.

### 5.7 Section `#analytics` Ã¢â‚¬â€œ Advanced Portfolio Insights
1. **Background pattern**: `div.analysis-hud` vÃ¡Â»â€ºi gradient, overlay.
2. **CÃƒÂ¡c module nhÃ¡Â»Â**:
   - `analysis-hud__grid--matrix`: lÃ†Â°Ã¡Â»â€ºi 4 cÃ¡Â»â„¢t (sau reduce theo breakpoint).
   - MÃ¡Â»â€”i `hud-card` hiÃ¡Â»Æ’n thÃ¡Â»â€¹ metric (Sharpe, Beta, Diversification...).
3. **Asset contribution table**:
   - SÃ¡Â»Â­ dÃ¡Â»Â¥ng `<table class="modern-table">` hiÃ¡Â»Æ’n thÃ¡Â»â€¹ Ã„â€˜ÃƒÂ³ng gÃƒÂ³p rÃ¡Â»Â§i ro.
   - JS: `analytics.js` (`refreshAssetContributionTable()`).

### 5.8 Section `#performance`
1. **BiÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ tÃ„Æ’ng trÃ†Â°Ã¡Â»Å¸ng** (`canvas#performanceChart`):
   - JS: `performance.js` (`renderPerformanceChart`).
2. **BÃ¡ÂºÂ£ng Metric** (`.performance-metrics`):
   - GÃ¡Â»â€œm `id` nhÃ†Â° `performanceCAGR`, `performanceVolatility`.

### 5.9 Section `#marketHeatmap`
1. **TradingView embed**: `div#tradingViewWidget`.
   - JS: `tradingview-loader.js` Ã„â€˜Ã¡ÂºÂ£m bÃ¡ÂºÂ£o load script chÃ¡Â»â€° 1 lÃ¡ÂºÂ§n; `tradingview.js` tÃ¡ÂºÂ¡o widget.
2. **Heatmap custom**: `heatmap.js` render lÃ†Â°Ã¡Â»â€ºi asset.

### 5.10 Section `#fearGreed`
1. **Gauge** (`canvas#fearGreedGauge`) + timeline (`canvas#fearGreedTrend`).
2. **Live cards**: container `#fearGreedLiveCards` hiÃ¡Â»Æ’n thÃ¡Â»â€¹ bÃ¡ÂºÂ£n tin.
   - JS: `fear-greed.js` (`updateFearGreedGauge`, `populateFearGreedCards`).

### 5.11 Other subsections
- **Operations columns** (`section.ops-column`): chuÃ¡Â»â€”i log nhiÃ¡Â»â€¡m vÃ¡Â»Â¥.
- **Timeline**: hiÃ¡Â»Æ’n thÃ¡Â»â€¹ lÃ¡Â»â€¹ch tÃƒÂ¡i cÃƒÂ¢n bÃ¡ÂºÂ±ng.
- CSS `.ops-column`, `.ops-card` mÃƒÂ´ tÃ¡ÂºÂ£ gradient viÃ¡Â»Ân, `::before` overlay scanline.

---

## 6. CSS chi tiÃ¡ÂºÂ¿t theo nhÃƒÂ³m

### 6.1 Card & hiÃ¡Â»â€¡u Ã¡Â»Â©ng chung
- `.card`, `.card::before`, `.card::after`: tÃ¡ÂºÂ¡o viÃ¡Â»Ân Ã„â€˜ÃƒÂ´i, ÃƒÂ¡nh sÃƒÂ¡ng cam.
- `.card--lifted`: thÃƒÂªm `box-shadow` nÃ¡Â»â€¢i.
- `.metric-dropdown`: menu phÃ¡ÂºÂ³ng, `animation: dropdownFade`.

### 6.2 LÃ†Â°Ã¡Â»â€ºi phÃƒÂ¢n tÃƒÂ­ch
- `.analysis-hud`: nÃ¡Â»Ân gradient xanh/cam, border `rgba(120,190,255,0.22)`.
- `.analysis-hud__grid--matrix`: `grid-template-columns: repeat(4, minmax(0, 1fr));` giÃ¡ÂºÂ£m dÃ¡ÂºÂ§n Ã¡Â»Å¸ 1024pxÃ¢â€ â€™3 cÃ¡Â»â„¢t, 640pxÃ¢â€ â€™2 cÃ¡Â»â„¢t, 480pxÃ¢â€ â€™1 cÃ¡Â»â„¢t.
- `.hud-card`: bo gÃƒÂ³c lÃ¡Â»â€ºn, overlay neon, icon `hud-card__icon`.

### 6.3 BÃ¡ÂºÂ£ng hiÃ¡Â»â€¡n Ã„â€˜Ã¡ÂºÂ¡i `.modern-table`
- Header nÃ¡Â»Ân `#f3f4f6` (sÃƒÂ¡ng) hoÃ¡ÂºÂ·c `#334155` (dark).
- Cell: `padding: 0.75rem; border-bottom`.
- Mobile (`@media max-width:768px`): giÃ¡ÂºÂ£m font-size, padding nhÃ¡Â»Â hÃ†Â¡n.

### 6.4 Form & input
- `.styled-input`: nÃ¡Â»Ân `var(--color-card-light)`, border gradient khi focus.
- `.styled-button`: uppercase, `transition`, hover nÃƒÂ¢ng nhÃ¡ÂºÂ¹.
- `.theme-toggle`: `border-radius:50%`, `box-shadow` neon khi hover.

### 6.5 Sidebar responsive
- `.app-sidebar__list`: flex column; trong breakpoint 1024px Ã¢â€ â€™ `flex-direction: row`.
- `.app-sidebar__link`: `display:flex; align-items:center; gap:0.85rem;`.
- `.app-sidebar__index`: font `Orbitron`, `letter-spacing:0.2em`.

### 6.6 Background animation
- `@keyframes hudScanlines`, `@keyframes hudSweep`, `@keyframes marketIndexSkeleton`: dÃƒÂ¹ng cho animation thÃ¡ÂºÂ» HUD vÃƒÂ  skeleton loading.

---

## 7. MÃƒÂ´-Ã„â€˜un JavaScript & hÃƒÂ m chÃƒÂ­nh

### 7.1 `js/app.js`
- KhÃ¡Â»Å¸i Ã„â€˜Ã¡Â»â„¢ng toÃƒÂ n bÃ¡Â»â„¢ console.
- HÃƒÂ m chÃƒÂ­nh (cÃ¡ÂºÂ§n xem file Ã„â€˜Ã¡Â»Æ’ gÃ¡Â»Âi Ã„â€˜ÃƒÂºng):
  - `initializeApp()`: gÃ¡Â»Âi `loadTheme`, `initializeMetricDropdownToggles`, load dÃ¡Â»Â¯ liÃ¡Â»â€¡u CSV, khÃ¡Â»Å¸i tÃ¡ÂºÂ¡o biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ, v.v.
  - Ã„ÂÃ„Æ’ng kÃƒÂ½ sÃ¡Â»Â± kiÃ¡Â»â€¡n `DOMContentLoaded`.

### 7.2 `js/utils.js`
- **QuÃ¡ÂºÂ£n lÃƒÂ½ mÃ¡Â»Â¥c tiÃƒÂªu phÃƒÂ¢n bÃ¡Â»â€¢**: `normalizeTargets`, `resetTargetsToDefaults`, `saveTargetsToLocalStorage`, `loadTargetsFromLocalStorage`.
- **CÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t giao diÃ¡Â»â€¡n**: `updatePortfolioMetrics`, `updateHeroMetricTilesSummary`, `renderMetricList`, `initializeMetricDropdownToggles`.
- **Rebalance helper**: `initializeRebalanceInputs`, `createRebalanceResult`, `applyLiveDataToRebalance`.
- **ThÃƒÂ´ng tin hÃ¡Â»â€¡ thÃ¡Â»â€˜ng**: `getPortfolioMetadataSummary`, `formatLastUpdatedLabels`.

### 7.3 `js/data.js`
- Ã„ÂÃ¡Â»Âc dÃ¡Â»Â¯ liÃ¡Â»â€¡u CSV/JSON (sÃ¡Â»Â­ dÃ¡Â»Â¥ng `fetch`).
- `loadPortfolioTargets()`, `loadHistoricalSeries()`, `parseCSV()`, `transformHoldingsData()`.

### 7.4 `js/live-prices.js`
- `fetchLatestPrices()`: mÃƒÂ´ phÃ¡Â»Âng giÃƒÂ¡ mÃ¡Â»â€ºi.
- `updateLivePriceTable(rows)`: gÃƒÂ¡n dÃ¡Â»Â¯ liÃ¡Â»â€¡u vÃƒÂ o bÃ¡ÂºÂ£ng allocation.
- `startLivePriceLoop()`: interval cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t UI.

### 7.5 `js/charts.js`
- `renderAllocationChart()`: doughnut/phÃƒÂ¢n bÃ¡Â»â€¢.
- `renderSectorChart()`, `renderContributionChart()`.
- `resizeChartsOnThemeToggle()`: Ã„â€˜Ã¡Â»â€¢i mÃƒÂ u dataset khi theme Ã„â€˜Ã¡Â»â€¢i.

### 7.6 `js/market-indices.js`
- `initializeMarketIndexCards()`, `updateIndexCard(symbol)`.
- `simulateIndexSeries()` tÃ¡ÂºÂ¡o dÃ¡Â»Â¯ liÃ¡Â»â€¡u giÃ¡ÂºÂ£ cho biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ nhÃ¡Â»Â.

### 7.7 `js/performance.js`
- `simulatePerformance(targets, years)` sinh chuÃ¡Â»â€”i giÃƒÂ¡ trÃ¡Â»â€¹.
- `calculateMetrics(portfolioValues, benchmarkValues, periodsPerYear)` -> CAGR, Volatility, Sharpe, Max Drawdown.
- `renderPerformanceChart(...)` vÃ¡ÂºÂ½ biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ line.
- `updatePerformanceMetricsDisplay(metrics)` Ã„â€˜iÃ¡Â»Ân sÃ¡Â»â€˜ liÃ¡Â»â€¡u vÃƒÂ o card.

### 7.8 `js/analytics.js`
- **TiÃ¡Â»â€¡n ÃƒÂ­ch xÃ¡Â»Â­ lÃƒÂ½ sÃ¡Â»â€˜ liÃ¡Â»â€¡u**: `normalizeWeights`, `calculateExpectedReturn`, `calculateVolatility`, `calculatePortfolioBeta`, `calculateAlpha`, `calculateCalmarRatio`.
- **Ã„ÂÃƒÂ¡nh giÃƒÂ¡ rÃ¡Â»Â§i ro**: `scoreVolatility`, `scoreSharpe`, `scoreBeta`, `scoreExpectedReturn`, `scoreDiversity`.
- **Stress & Ã„â€˜ÃƒÂ³ng gÃƒÂ³p**: `buildCovarianceMatrix`, `calculateRiskContributionMetrics`, `refreshAssetContributionTable`.
- **LÃ†Â°u trÃ¡ÂºÂ¡ng thÃƒÂ¡i**: `loadContributionSnapshots`, `updateContributionSnapshot`, `setContributionMode`.
- **HiÃ¡Â»Æ’n thÃ¡Â»â€¹ giao diÃ¡Â»â€¡n**: `updateContributionHeaders`, `markStressTestHighlight`.

### 7.9 `js/deposit-core.js` & `js/deposit-rebalance-core.js`
- `calculateDepositAllocationPlan(amount, targets)` (tÃƒÂªn tÃ†Â°Ã†Â¡ng tÃ¡Â»Â±) Ã¢â€ â€™ chia tiÃ¡Â»Ân theo mÃ¡Â»Â¥c tiÃƒÂªu.
- `rebalanceWithDeposit()` ÃƒÂ¡p dÃ¡Â»Â¥ng cho cÃ¡ÂºÂ£ tÃƒÂ¡i cÃƒÂ¢n bÃ¡ÂºÂ±ng hiÃ¡Â»â€¡n tÃ¡ÂºÂ¡i.
- CÃƒÂ¡c hÃƒÂ m `clampToStep`, `roundShares`, `computeDriftAfterDeposit`.

### 7.10 `js/rebalance.js`
- `initializeDepositAllocationInputs()`, `calculateDepositAllocation()`, `initializeDepositRebalanceHelper()`.
- QuÃ¡ÂºÂ£n lÃƒÂ½ trÃ¡ÂºÂ¡ng thÃƒÂ¡i lÃ†Â°u trÃ¡Â»Â¯: `loadRebalanceDepositAmount`, `saveRebalanceDepositAmount`, `loadRebalanceRoundingMode`.
- Ã„ÂiÃ¡Â»Âu khiÃ¡Â»Æ’n toggles khoÃƒÂ¡ ticker: `applyRebalanceLockVisual`, `getRebalanceLockSet`, `persistRebalanceLocks`.
- `recalculateDepositRebalance()` chÃ¡ÂºÂ¡y sau mÃ¡Â»â€”i lÃ¡ÂºÂ§n thay Ã„â€˜Ã¡Â»â€¢i input.

### 7.11 `js/fear-greed.js`
- `updateFearGreedGauge(index)`, `renderFearGreedTrend(data)`, `populateFearGreedCards(events)`.
- `loadFearGreedSeries()` lÃ¡ÂºÂ¥y dÃ¡Â»Â¯ liÃ¡Â»â€¡u CSV/JSON mÃƒÂ´ phÃ¡Â»Âng, `startFearGreedFeed()` tÃ¡ÂºÂ¡o ticker chÃ¡ÂºÂ¡y liÃƒÂªn tÃ¡Â»Â¥c.

### 7.12 `js/heatmap.js`
- `renderHeatmapGrid(data)` dÃ¡Â»Â±ng lÃ†Â°Ã¡Â»â€ºi `<div>`.
- `colorScale(value)` ÃƒÂ¡nh xÃ¡ÂºÂ¡ giÃƒÂ¡ trÃ¡Â»â€¹ sang gradient xanh/Ã„â€˜Ã¡Â»Â.
- `loadHeatmapData()` fetch dÃ¡Â»Â¯ liÃ¡Â»â€¡u.

### 7.15 `js/live-prices.js`, `js/market-indices.js`, `js/performance.js` phÃ¡Â»â€˜i hÃ¡Â»Â£p
- `subscribeToThemeChanges(callback)` (nÃ¡ÂºÂ¿u cÃƒÂ³) Ã„â€˜Ã¡ÂºÂ£m bÃ¡ÂºÂ£o biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ Ã„â€˜Ã¡Â»â€¢i mÃƒÂ u theo theme.

### 7.14 `js/stockDetails.js`
- `initializeStockTabs()`: tÃ¡ÂºÂ¡o listener cho tabs.
- `updateStockTabsLabels()` hiÃ¡Â»Æ’n thÃ¡Â»â€¹ ticker + %.
- `getStockAllocationSnapshot(stockKey)` trÃ¡ÂºÂ£ vÃ¡Â»Â thÃƒÂ´ng tin chi tiÃ¡ÂºÂ¿t.
- `updateStockDetails(stockKey)`, `refreshActiveStockDetails()` render nÃ¡Â»â„¢i dung.

### 7.15 `js/stress.js`
- `runStressTest()`: ÃƒÂ¡p dÃ¡Â»Â¥ng kÃ¡Â»â€¹ch bÃ¡ÂºÂ£n rÃ¡Â»Â§i ro.
- `applyStressScenario(scenario, severity)`: tÃƒÂ­nh giÃƒÂ¡ trÃ¡Â»â€¹ giÃ¡ÂºÂ£m/ tÃ„Æ’ng.
- `populateStressAssetTable()`, `renderStressChart()` cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t UI.
- `updateSeverityDisplay()`, `resetStressTest()` Ã„â€˜iÃ¡Â»Âu khiÃ¡Â»Æ’n form.

### 7.16 `js/theme.js`
- `loadTheme()`, `toggleTheme()` nhÃ†Â° Ã„â€˜ÃƒÂ£ mÃƒÂ´ tÃ¡ÂºÂ£ phÃ¡ÂºÂ§n sidebar.

### 7.17 `js/tradingview-loader.js` & `js/tradingview.js`
- Loader Ã„â€˜Ã¡ÂºÂ£m bÃ¡ÂºÂ£o script TradingView chÃ¡Â»â€° tÃ¡ÂºÂ£i mÃ¡Â»â„¢t lÃ¡ÂºÂ§n:
  - `ensureScriptLoaded()`, `setDesiredRender(symbol, theme)`, `requestRender()`, `hasLoaded()`.
- `tradingview.js`: `createTradingViewWidget(fullSymbol, theme)`, `createMiniTradingViewWidget`.

### 7.20 `js/app.js` (tÃ¡Â»â€¢ng hÃ¡Â»Â£p)
- GÃ¡Â»Âi tuÃ¡ÂºÂ§n tÃ¡Â»Â±:
  - `loadTheme()`
  - `initializeMetricDropdownToggles()`
  - `initializeMarketIndexCards()`
  - `startLivePriceLoop()`
  - `initializePerformance()`
  - `updateAIRecommendationsSection()`
  - `renderHeatmapGrid()`, `updateFearGreedGauge()`, ...
- Ã„ÂÃ„Æ’ng kÃƒÂ½ listener `document.addEventListener("visibilitychange", ...)` (nÃ¡ÂºÂ¿u cÃƒÂ³) Ã„â€˜Ã¡Â»Æ’ tÃ¡ÂºÂ¡m dÃ¡Â»Â«ng cÃ¡ÂºÂ­p nhÃ¡ÂºÂ­t khi tab Ã¡ÂºÂ©n.

> **LÃ†Â°u ÃƒÂ½**: mÃ¡Â»â€”i mÃƒÂ´-Ã„â€˜un Ã„â€˜Ã¡Â»Âc dÃ¡Â»Â¯ liÃ¡Â»â€¡u qua biÃ¡ÂºÂ¿n global Ã„â€˜Ã†Â°Ã¡Â»Â£c khai bÃƒÂ¡o trong `data.js` (vd: `portfolioTargets`, `livePriceRows`). Khi bÃ¡ÂºÂ¡n tÃƒÂ¡ch dÃ¡Â»Â± ÃƒÂ¡n thÃƒÂ nh module bundler, hÃƒÂ£y chuyÃ¡Â»Æ’n sang `import/export` chÃƒÂ­nh thÃ¡Â»Â©c.

---

## 8. DÃ¡Â»Â¯ liÃ¡Â»â€¡u & thÃ†Â° mÃ¡Â»Â¥c phÃ¡Â»Â¥ trÃ¡Â»Â£

- `img/`: chÃ¡Â»Â©a hÃƒÂ¬nh nÃ¡Â»Ân, biÃ¡Â»Æ’u tÃ†Â°Ã¡Â»Â£ng HUD. CÃ¡ÂºÂ§n Ã„â€˜ÃƒÂºng Ã„â€˜Ã†Â°Ã¡Â»Âng dÃ¡ÂºÂ«n mÃ¡Â»â€ºi hiÃ¡Â»Æ’n thÃ¡Â»â€¹ gradient overlay chuÃ¡ÂºÂ©n.
- `btc.csv`, `vixy.csv`, `vix.csv`, `dxy.csv`: data cho biÃ¡Â»Æ’u Ã„â€˜Ã¡Â»â€œ so sÃƒÂ¡nh chÃ¡Â»â€° sÃ¡Â»â€˜.
- `ROTH IRA.xlsx - Sheet1.csv`: danh sÃƒÂ¡ch holdings chÃƒÂ­nh.
- `graph.json`: dÃƒÂ¹ng cho mÃ¡Â»â„¢t sÃ¡Â»â€˜ widget dÃ¡Â»Â±a trÃƒÂªn mÃ¡ÂºÂ¡ng lÃ†Â°Ã¡Â»â€ºi quan hÃ¡Â»â€¡ (nghiÃƒÂªn cÃ¡Â»Â©u thÃƒÂªm trong `js/analytics.js`).
- `tests/`: 
  - `deposit-core.test.js`, `deposit-rebalance-core.test.js` kiÃ¡Â»Æ’m tra logic chia tiÃ¡Â»Ân; chÃ¡ÂºÂ¡y bÃ¡ÂºÂ±ng Vitest/Jest nÃ¡ÂºÂ¿u bÃ¡ÂºÂ¡n cÃ¡ÂºÂ¥u hÃƒÂ¬nh Node.js.

---

## 9. CÃƒÂ¡c bÃ†Â°Ã¡Â»â€ºc dÃ¡Â»Â±ng lÃ¡ÂºÂ¡i tÃ¡Â»Â« Ã„â€˜Ã¡ÂºÂ§u (tÃƒÂ³m tÃ¡ÂºÂ¯t)
1. **KhÃ¡Â»Å¸i tÃ¡ÂºÂ¡o dÃ¡Â»Â± ÃƒÂ¡n**: tÃ¡ÂºÂ¡o thÃ†Â° mÃ¡Â»Â¥c, `git init`, thÃƒÂªm cÃ¡ÂºÂ¥u trÃƒÂºc `/css`, `/js`, `/img`.
2. **TÃ¡ÂºÂ¡o `index.html`**: copy skeleton `<head>` (meta, link CSS/JS CDN) vÃƒÂ  `<body>` vÃ¡Â»â€ºi `app-shell`.
3. **ViÃ¡ÂºÂ¿t `css/styles.css`**: sao chÃƒÂ©p cÃƒÂ¡c section nhÃ†Â° mÃƒÂ´ tÃ¡ÂºÂ£ trÃƒÂªn (biÃ¡ÂºÂ¿n mÃƒÂ u, hero, stat-grid, analysis-hud,...).
4. **ThÃƒÂªm dÃ¡Â»Â¯ liÃ¡Â»â€¡u mÃ¡ÂºÂ«u**: Ã„â€˜Ã¡ÂºÂ·t CSV/JSON vÃƒÂ o gÃ¡Â»â€˜c dÃ¡Â»Â± ÃƒÂ¡n.
5. **Sao chÃƒÂ©p mÃƒÂ´-Ã„â€˜un JS**: lÃ¡ÂºÂ§n lÃ†Â°Ã¡Â»Â£t tÃ¡ÂºÂ¡o file trong `js/` vÃ¡Â»â€ºi logic Ã„â€˜ÃƒÂ£ mÃƒÂ´ tÃ¡ÂºÂ£.
6. **KiÃ¡Â»Æ’m tra cÃ¡Â»Â¥c bÃ¡Â»â„¢**: mÃ¡Â»Å¸ `index.html` trÃƒÂªn trÃƒÂ¬nh duyÃ¡Â»â€¡t; dÃƒÂ¹ng DevTools > Responsive Ã„â€˜Ã¡Â»Æ’ chÃ¡ÂºÂ¯c layout Ã„â€˜Ã¡ÂºÂ¹p trÃƒÂªn mobile.
7. **TriÃ¡Â»Æ’n khai**: push lÃƒÂªn GitHub, bÃ¡ÂºÂ­t GitHub Pages (`Settings > Pages > Branch main > /(root)`).

---

## 10. MÃ¡ÂºÂ¹o mÃ¡Â»Å¸ rÃ¡Â»â„¢ng
- BÃ¡Â»â€¢ sung API thÃ¡ÂºÂ­t (Finnhub, Alpha Vantage) Ã„â€˜Ã¡Â»Æ’ thay dÃ¡Â»Â¯ liÃ¡Â»â€¡u mÃƒÂ´ phÃ¡Â»Âng.
- TÃƒÂ¡ch code thÃƒÂ nh ES Modules vÃƒÂ  sÃ¡Â»Â­ dÃ¡Â»Â¥ng bundler (Vite/Webpack) Ã„â€˜Ã¡Â»Æ’ quÃ¡ÂºÂ£n lÃƒÂ½ dependency.
- ViÃ¡ÂºÂ¿t thÃƒÂªm test cho `analytics.js` vÃƒÂ  `analytics.js` nÃ¡ÂºÂ¿u chuyÃ¡Â»Æ’n logic vÃƒÂ o backend.
- ChuÃ¡ÂºÂ©n hoÃƒÂ¡ `localStorage` keys, thÃƒÂªm migration khi thay Ã„â€˜Ã¡Â»â€¢i cÃ¡ÂºÂ¥u trÃƒÂºc dÃ¡Â»Â¯ liÃ¡Â»â€¡u.

---

ChÃ¡Â»â€° cÃ¡ÂºÂ§n bÃƒÂ¡m sÃƒÂ¡t tÃƒÂ i liÃ¡Â»â€¡u nÃƒÂ y, bÃ¡ÂºÂ¡n cÃƒÂ³ thÃ¡Â»Æ’ dÃ¡Â»Â±ng lÃ¡ÂºÂ¡i tÃ¡Â»Â«ng section, hiÃ¡Â»Æ’u rÃƒÂµ nhÃ¡Â»Â¯ng Ã„â€˜oÃ¡ÂºÂ¡n CSS/JS nÃƒÂ o chÃ¡Â»â€¹u trÃƒÂ¡ch nhiÃ¡Â»â€¡m Ã„â€˜iÃ¡Â»Âu khiÃ¡Â»Æ’n giao diÃ¡Â»â€¡n, vÃƒÂ  tuÃ¡Â»Â³ biÃ¡ÂºÂ¿n console theo nhu cÃ¡ÂºÂ§u riÃƒÂªng. ChÃƒÂºc bÃ¡ÂºÂ¡n thÃƒÂ nh cÃƒÂ´ng vÃ¡Â»â€ºi buÃ¡Â»â€œng lÃƒÂ¡i Gunpla cÃ¡Â»Â§a mÃƒÂ¬nh!
