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
      animation: {
        'float': 'float 10s infinite',
        'shake': 'shake 0.5s',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite'
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' }
        }
      }
    },
  },
  plugins: [
    import('@tailwindcss/typography'),
  ],
}
