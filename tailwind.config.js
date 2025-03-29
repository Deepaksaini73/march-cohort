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
      keyframes: {
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'slide-in-right': 'slide-in-right 0.7s ease-out',
        'slide-in-left': 'slide-in-left 0.7s ease-out',
        'fade-in': 'fade-in 0.7s ease-out',
      },
    },
  },
  plugins: [],
}
