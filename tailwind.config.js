/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          primary: "#0FCFEC",

          secondary: "#19D3AE",

          accent: "#3A4256",

          "neutral": "#5D5656",

          "base-100": "#E9E7E7",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
