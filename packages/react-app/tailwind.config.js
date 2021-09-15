const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      orange: colors.orange,
      green: {
        '050': '#6dc5a040',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
