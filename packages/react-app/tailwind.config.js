const colors = require('tailwindcss/colors')

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      orange: colors.orange,
      green: {
        050: '#6dc5a040',
        'dark-green': '#337062',
        'teal': '#2CAE92'
      },
      brown: {
        'dark-brown': '#262626',
      },
      gray: {
        050: '#FFFFFF'
      },
    },
    fontFamily: {
      'spacemono': ['Space Mono'],
      'librefranklin': ['Libre Franklin']
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
     }
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
