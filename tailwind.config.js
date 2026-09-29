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
          navy: "#0B192C",
          blue: "#1D4ED8",
          purple: "#0B192C", /* Aliased to Navy Blue for backward compatibility */
          orange: "#DD6E2D",
          cream: "#EDDEC2",
          black: "#17151A",
          dark: "#242126",
          muted: "#77727A",
          light: "#F5F3F1",
          border: "#E5DFD8",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '10px',
      }
    },
  },
  plugins: [],
}
