import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        // Définition du Bleu Azur personnalisé
        azure: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Base Sky
          600: '#0099FF', // Vrai Bleu Azur vibrant pour les boutons/titres
          700: '#0077CC', // Survol
          800: '#075985',
          900: '#0c4a6e',
        },
        // Ajout des couleurs manquantes
        orange: colors.orange,
        purple: colors.purple,
      }
    },
  },
  plugins: [],
}
