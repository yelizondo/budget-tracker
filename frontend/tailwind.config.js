/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
          'gc-primary': '#293241',
          'gc-secondary': '#98C1D9',
          'gc-secondary-hover': '#D9ECF7',
          'gc-neutral-one': '#585B56',
          'gc-accent': '#ef4444',
          'gc-success': '#22c55e',
          'gc-warning': '#eab308',
          'gc-white': '#F7F7F7',
          'gc-black': '#293241',
          'gc-grey': '#4B5563'
      }
    }
  },
  darkMode: "class",
  plugins: [require("tw-elements-react/dist/plugin.cjs")]
  }