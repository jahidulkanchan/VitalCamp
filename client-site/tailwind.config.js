/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <- this is required!
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'], // adjust based on your project
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: '#218ACC',
        secondary: '#45C9BD',
      },
    },
  },
  plugins: [],
};
