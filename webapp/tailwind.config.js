/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink-purple': '#6b21a8',
        'ink-blue': '#1e40af',
      }
    },
  },
  plugins: [],
}
