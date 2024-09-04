/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      abc: ["Oswald", "sans-serif"],
      cool : ["DM Serif Display", "serif" ]
    },
    backgroundImage: {
        'gradient-opacity-80': 'linear-gradient(to right, rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0.5))'
    }

  },
  variants: {},
  plugins: [],
};
