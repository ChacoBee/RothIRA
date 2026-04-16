import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/RothIRA/',
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: 'config.js', dest: '.' },
        { src: 'js/**/*', dest: 'js' },
        { src: 'img/**/*', dest: 'img' },
        { src: 'docs/**/*', dest: 'docs' },
        { src: 'btc.csv', dest: '.' },
        { src: 'dxy.csv', dest: '.' },
        { src: 'vix.csv', dest: '.' },
        { src: 'vixy.csv', dest: '.' },
        { src: 'graph.json', dest: '.' },
        { src: 'ROTH IRA.xlsx - Sheet1.csv', dest: '.' },
        { src: 'favicon.ico', dest: '.' }
      ]
    })
  ],
  server: {
    host: '127.0.0.1'
  }
});
