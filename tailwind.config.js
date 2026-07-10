/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins Light"', 'sans-serif'],
        lejour: ['"Le Jour Serif"', 'serif'],
        seasons: ['"The_Seasons_Regular"', 'serif'],
        atteron: ['Atteron', 'sans-serif'],
        cardo: ['Cardo', 'serif'],
        'cardo-italic': ['"Cardo Italic"', 'serif'],
        'cmu-roman': ['"CMU Roman"', 'serif'],
        'cmu-italic': ['"CMU Italic"', 'serif'],
        nove: ['Nove', 'sans-serif'],
        redhat: ['"Red_Hat_Display"', 'sans-serif'],
        tan: ['"Tan Mon Cheri"', 'serif'],
        hatton: ['"PP Hatton"', 'serif'],
        garbata: ['Garbata', 'sans-serif'],
        aileron: ['Aileron', 'sans-serif'],
        migra: ['Migra', 'serif'],
      },
    },
  },
  plugins: [],
}