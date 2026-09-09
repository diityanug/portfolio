/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        redhat: ['"Red Hat Display"', 'sans-serif'],
        overlock: ['Overlock', 'sans-serif'],
        autour: ['"Autour One"', 'cursive'],
        karla: ['Karla', 'sans-serif'],
      },
    },
  },
  plugins: [],
}