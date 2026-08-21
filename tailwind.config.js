/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './legacy-index.static.html',
    './src/**/*.{js,jsx}',
    './js/**/*.js',
    './partials/**/*.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
