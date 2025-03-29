/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700', // Yellow gold color for primary elements
        secondary: '#007bff', // Blue for secondary elements
        accent: '#00A651', // Green accent color
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('/images/ocean-wave.jpg')",
      },
    },
  },
  plugins: [],
}
