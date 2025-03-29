/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        primary: {
          DEFAULT: '#3B82F6',
          '50': '#EBF2FF',
          '100': '#D7E6FF',
          '200': '#B0CFFF',
          '300': '#88B8FF',
          '400': '#61A1FF',
          '500': '#3B82F6',
          '600': '#0A5AD4',
          '700': '#0747A6',
          '800': '#053278',
          '900': '#021D4A',
        },
      },
    },
  },
  plugins: [],
} 