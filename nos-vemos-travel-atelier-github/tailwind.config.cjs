/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#fffff0',
        sand: '#c2b280',
        warmGray: '#a9a9a9',
        charcoal: '#36454f',
        mutedGold: '#b8860b',
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      blur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}