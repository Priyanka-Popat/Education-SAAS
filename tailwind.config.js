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

      screens: {
        '4xs': '300px',
        '3xs': '375px',
        '2xs': '425px',
        'xs': '480px',     
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        'hd': '1440px',
        '2xl': '1536px',
        'hdplus': '1700px',
        '3xl': '1920px',    
        '4xl': '2560px', 


        'tall': { 'raw': '(min-height: 800px)' },
      
      },

      fontFamily: {
        urbanistRegular: ['"geist-regular"', "sans-serif"],
        urbanistSemiBold: ['"geist-semibold"', "sans-serif"],
        urbanistMedium: ['"geist-medium"', "sans-serif"],

      }
    },
  },
  plugins: [],
}