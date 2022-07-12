/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ]  
}