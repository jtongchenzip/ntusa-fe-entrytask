// const colors = require('tailwindcss/colors');

module.exports = {
  mode: 'jit',
  content: ['index.html', './src/**/*.{js,jsx,ts,tsx,html}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    // fontFamily: {
    //   gensen: ['GenSenRounded TW'],
    // },
    // fontSize: {
    //   xs: ['0.75rem', { lineHeight: '1.5' }],
    //   sm: ['0.875rem', { lineHeight: '1.5715' }],
    //   base: ['1rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
    //   lg: ['1.125rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
    //   xl: ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
    //   '2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
    //   '3xl': ['1.88rem', { lineHeight: '1.33', letterSpacing: '-0.01em' }],
    //   '4xl': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
    //   '5xl': ['3rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
    //   '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
    // },
    // colors: {
    //   black: colors.black,
    //   white: colors.white,
    //   gray: colors.gray,
    //   emerald: colors.emerald,
    //   indigo: colors.indigo,
    //   yellow: colors.yellow,
    //   white: '#ffffff',
    //   'sloth-blue': '#02aefb',
    //   'sloth-yellow': '#ffca18',
    //   'sloth-red': '#ff7676',
    // },
  },
  plugins: [],
};
