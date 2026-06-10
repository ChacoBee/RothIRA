import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import App from './App.jsx';
import { buildLegacyMarkup } from './utils/legacyMarkup.js';
import './tailwind.css';
import '../css/styles.css';

window.React = React;

const LEGACY_SCRIPT_SOURCES = [
  'js/data.js',
  'js/utils.js',
  'js/charts.js',
  'js/deposit-core.js',
  'js/deposit-rebalance-core.js',
  'js/rebalance.js',
  'js/simulation.js',
  'js/tradingview.js',
  'js/tradingview-loader.js',
  'js/stockDetails.js',
  'js/theme.js',
  'js/analytics.js',
  'js/heatmap.js',
  'js/fear-greed.js',
  'js/market-indices.js',
  'js/performance.js',
  'js/live-prices.js',
  'js/live-portfolio-chart.js',
  'js/logistics-ops.js',
  'js/app.js',
];

function ensureRuntimeConfig() {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }

  if (window.APP_CONFIG?.marketData) {
    return Promise.resolve();
  }

  const existingScript = document.querySelector('script[data-runtime-config="true"]');
  if (existingScript?.dataset.loaded === 'true') {
    return Promise.resolve();
  }

  if (existingScript) {
    return new Promise((resolve, reject) => {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('CONFIG_LOAD_FAILED')), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${import.meta.env.BASE_URL}config.js`;
    script.async = false;
    script.dataset.runtimeConfig = 'true';
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        resolve();
      },
      { once: true }
    );
    script.addEventListener('error', () => reject(new Error('CONFIG_LOAD_FAILED')), { once: true });
    document.head.appendChild(script);
  });
}

async function loadLegacyDocumentHtml() {
  const response = await fetch(`${import.meta.env.BASE_URL}legacy-index.static.html`, {
    cache: 'no-cache',
  });

  if (!response.ok) {
    throw new Error(`LEGACY_MARKUP_LOAD_FAILED_${response.status}`);
  }

  return response.text();
}

async function ensureChartRuntime() {
  if (window.Chart) {
    return;
  }

  const module = await import('chart.js/auto');
  window.Chart = module.default;
}

function loadClassicScript(source) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `${import.meta.env.BASE_URL}${source}`;
    script.async = false;
    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error(`LEGACY_SCRIPT_LOAD_FAILED:${source}`)), {
      once: true,
    });
    document.body.appendChild(script);
  });
}

async function loadLegacyRuntimeScripts() {
  for (const source of LEGACY_SCRIPT_SOURCES) {
    await loadClassicScript(source);
  }

  document.dispatchEvent(new Event('DOMContentLoaded'));
  window.dispatchEvent(new Event('DOMContentLoaded'));
}

async function bootstrap() {
  await ensureRuntimeConfig();
  const legacyDocumentHtml = await loadLegacyDocumentHtml();
  const legacyMarkup = buildLegacyMarkup(legacyDocumentHtml);

  const container = document.getElementById('root');
  const root = createRoot(container);

  flushSync(() => {
    root.render(<App {...legacyMarkup} />);
  });

  await ensureChartRuntime();
  await loadLegacyRuntimeScripts();
}

bootstrap().catch((error) => {
  console.error('App bootstrap failed:', error);
});
