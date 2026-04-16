import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import Chart from 'chart.js/auto';
import App from './App.jsx';
import './tailwind.css';
import '../css/styles.css';

window.React = React;
window.Chart = Chart;

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

async function bootstrap() {
  await ensureRuntimeConfig();

  const container = document.getElementById('root');
  const root = createRoot(container);

  flushSync(() => {
    root.render(<App />);
  });
}

bootstrap().catch((error) => {
  console.error('App bootstrap failed:', error);
});
