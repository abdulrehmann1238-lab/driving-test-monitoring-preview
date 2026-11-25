/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F6F7F5',
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#EFF2EF',
          tertiary: '#E5EAE5',
        },
        brand: {
          green: '#557A65',
          forest: '#304F40',
          sage: '#A7BBA9',
          amber: '#D9A85C',
          red: '#C87570',
        },
        ink: {
          primary: '#202923',
          secondary: '#77817A',
          muted: '#9DA8A0',
        },
        border: {
          DEFAULT: '#E5EAE5',
          subtle: '#EEF2EE',
          strong: '#D0D8D1',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Manrope', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'card': '14px',
        'btn': '9px',
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(32, 41, 35, 0.04), 0 1px 2px 0 rgba(32, 41, 35, 0.02)',
        'card': '0 4px 16px -2px rgba(32, 41, 35, 0.05), 0 2px 6px -1px rgba(32, 41, 35, 0.03)',
        'elevated': '0 12px 32px -4px rgba(32, 41, 35, 0.08), 0 4px 12px -2px rgba(32, 41, 35, 0.04)',
        'modal': '0 20px 48px -6px rgba(32, 41, 35, 0.14), 0 8px 20px -3px rgba(32, 41, 35, 0.06)',
      }
    },
  },
  plugins: [],
}
