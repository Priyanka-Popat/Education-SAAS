export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#131313",
        secondary: "#713CE9",
        grey: "#b2b2b2",
        purple: "#713CE9",
        green: '#348D31',
        red: '#C22B2D',
        unmarked: '#B2B2B2',
        yellow: '#C07600'
      },

      fontFamily: {
        urbanistRegular: ['"urbanist-regular"', "sans-serif"],
        urbanistSemiBold: ['"urbanist-semibold"', "sans-serif"],
        urbanistMedium: ['"urbanist-medium"', "sans-serif"],

      }
    },
  },
  plugins: [],
}