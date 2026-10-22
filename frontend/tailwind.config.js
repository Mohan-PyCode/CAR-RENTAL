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
          50: '#eef4ff',
          100: '#d6e5ff',
          200: '#b3ccff',
          300: '#88adff',
          400: '#5c8bff',
          500: '#3b6ff5',
          600: '#2b58d6',
          700: '#2245a3',
          800: '#1c3575',
          900: '#152448',
        },
        accent: {
          50: '#fff7ed',
          500: '#ff7a18',
          600: '#ea580c',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
