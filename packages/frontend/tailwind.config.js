/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors:{
      primary: '#065F46',
      secondary: '#9BC1F9',
      error:'#DC2626',
      green:"rgba(34, 197, 94, .38)"
    },
    extend: {},
  },
  plugins: [],
}
