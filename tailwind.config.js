const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: [
    './_pages/**/*.html',
    './_site/**/*.html'
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Barlow Condensed', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
