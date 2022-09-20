/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#065F46',
        secondary: '#f47458',
        alt_secondary: '#9bc1f9',
        yellow: "#fae0b2",
        error:'#DC2626',
        alt_green: "#cdf2da",
        green:"rgba(34, 197, 94, .38)",
        light_green: "#e6ffef",
        xlight_green: "#eefbf3",
        off_white: "#fcfaf2",
        light_yellow: "#fbebd7",
        dark_yellow: "#f7cc7f"
      },
      fontFamily: {
        sans: ["Urbanist", ...defaultTheme.fontFamily.serif],
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
}
