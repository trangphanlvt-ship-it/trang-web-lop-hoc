/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          500: '#e11d48',
          600: '#be123c',
          700: '#9f1239',
          800: '#881337',
          900: '#4c0519',
        },
        ink: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
        },
        gold: {
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
        },
        bamboo: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Montserrat', 'Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif']
      },
      backgroundImage: {
        'water-ink': "radial-gradient(circle at 50% 50%, rgba(225, 29, 72, 0.05) 0%, rgba(255, 255, 255, 0) 70%)",
        'hero-gradient': "linear-gradient(135deg, #881337 0%, #be123c 40%, #9f1239 100%)",
      }
    },
  },
  plugins: [],
}
