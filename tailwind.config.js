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
          canvas: "#FAF9F7",
          lavender: "#EAE8FE",
          purple: "#7C3AED",
          peach: "#FEF1E1",
          periwinkle: "#DDEBFF",
          navy: "#18181B",
          black: "#111111",
          dark: "#18181B",
          muted: "#6B7280",
          border: "#EAE6DF",
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      borderRadius: {
        'card': '20px',
        'shell': '28px',
      }
    },
  },
  plugins: [],
}
