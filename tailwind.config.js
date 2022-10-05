/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,jsx,tsx}"
  ],
  theme: {
    extend: {},
    fontFamily: {
     "mplus": ["'M PLUS Rounded 1c'", 'Verdana', 'sans-serif']
    }
  },
  plugins: [],
}
