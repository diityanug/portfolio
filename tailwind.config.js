/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lejour: ['"Le Jour Serif"', 'serif'],
        telegraf: ['Telegraf', 'sans-serif'],
        poppins: ['"Poppins ExtraLight"', 'sans-serif'],
        seasons: ['"The Seasons Italic"', 'serif'],
        google: ['"Google Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}