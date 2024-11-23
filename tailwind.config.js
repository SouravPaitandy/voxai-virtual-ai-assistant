/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'roboto-mono': ['"Roboto Mono"', 'monospace'],
         // Option 1
         inter: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
         // Option 2
         jakarta: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
         // Option 3
         outfit: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
}
