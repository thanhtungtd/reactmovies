// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        "body": ["Merriweather Sans", "sans-serif"],
      },
      colors: {
        primary: "#ff0060",
        secondary: "#a000ff",
      }
    },
  },
  plugins: [],
}
