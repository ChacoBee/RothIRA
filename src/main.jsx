import React from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import Chart from 'chart.js/auto';
import App from './App.jsx';
import './tailwind.css';
import '../css/styles.css';

window.React = React;
window.Chart = Chart;

const container = document.getElementById('root');
const root = createRoot(container);

flushSync(() => {
  root.render(<App />);
});
