/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f3ff',
        'neon-green': '#0aff00',
        'deep-navy': '#0a0e17',
        'lab-gray': '#1a1f2e',
        'glass-panel': 'rgba(26, 31, 46, 0.8)',
      },
      fontFamily: {
        'sci-fi': ['"Orbitron"', 'sans-serif'],
        'mono': ['"Share Tech Mono"', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f3ff, 0 0 20px #00f3ff',
        'neon-green': '0 0 10px #0aff00, 0 0 20px #0aff00',
      }
    },
  },
  plugins: [],
}
