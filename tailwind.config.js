/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'class',  // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Custom dark mode colors
        dark: {
          50: '#1a1a1a',
          100: '#2c2c2c',
          200: '#3c3c3c',
          300: '#4c4c4c',
          400: '#5c5c5c',
          500: '#6c6c6c',
          600: '#7c7c7c',
          700: '#8c8c8c',
          800: '#9c9c9c',
          900: '#acacac'
        },
        primary: {
          light: '#3b82f6',   // Blue for light mode
          dark: '#60a5fa'     // Lighter blue for dark mode
        },
        secondary: {
          light: '#1F2937',
          dark: '#1F2937'
        }
      },
      backgroundColor: {
        light: {
          primary: '#ffffff',
          secondary: '#f3f4f6'
        },
        dark: {
          primary: '#121212',
          secondary: '#1e1e1e'
        }
      },
      textColor: {
        light: {
          primary: '#000000',
          secondary: '#4a5568'
        },
        dark: {
          primary: '#ffffff',
          secondary: '#a0aec0'
        }
      }
    },
  },
  plugins: [],
}
