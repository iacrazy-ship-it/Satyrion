/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saturo: {
          primary: '#8B0000', // Rosso granata/bordeaux
          secondary: '#003366', // Blu scuro
          accent: '#E6B800', // Oro/Ambra
          light: '#F5F5F5', // Bianco sporco per sfondi
          dark: '#333333', // Quasi nero per testi
        },
      },
      fontFamily: {
        serif: ['Trajan Pro', 'Garamond', 'Times New Roman', 'serif'],
        sans: ['Futura', 'Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
