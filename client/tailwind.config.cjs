/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary1: "#101010",
        primary2: "#828282",
        primary3: "#CACACA",
        secondary1: "#E94444",
        secondary2: "#FFEF64",
        secondary3: "#3DE12F",
        secondary4: "#923DFF",
        secondary5: "#3D5CFF"
      },
      fontFamily: {
        serif: ["EB Garamond", "sans-serif"]
      }
    },
  },
  plugins: [],
}
