/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      ...colors,
      primary: {
        100: "#292830",
        200: "#1d1c24",
        300: "#313138",
        400: "#8a8b99",
        500: "#1d1c24",
        600: "#262626",
        700: "#303030",
        800: "#a4a5b3",
        900: "#212029",
        1000: "#11263c",
        1100: "#3a393f",
        1200: "#141318",
      },
      "custom-gray": {
        100: "#e9e9e9",
        200: "#b1b1b1w",
      },
    },
  },
  plugins: [],
};
