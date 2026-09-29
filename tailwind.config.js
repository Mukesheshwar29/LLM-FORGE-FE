/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: '#07111F',
        obsidian: '#0B1628',
        surface: {
          dark: '#0D1B2A',
          card: '#112239',
          glass: 'rgba(15, 29, 49, 0.75)',
          border: 'rgba(82, 217, 245, 0.15)',
        },
        cyan: {
          electric: '#52D9F5',
          ice: '#A8EAF5',
          glow: 'rgba(82, 217, 245, 0.3)',
        },
        lavender: {
          muted: '#A7A5FF',
          glow: 'rgba(167, 165, 255, 0.25)',
        },
        evidence: {
          green: '#54D6A0',
          greenBg: 'rgba(84, 214, 160, 0.12)',
          amber: '#F5BE69',
          amberBg: 'rgba(245, 190, 105, 0.12)',
          cyanBg: 'rgba(82, 217, 245, 0.12)',
        },
        text: {
          primary: '#F4F7FB',
          secondary: '#94A6BC',
          muted: '#5F758E',
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(82, 217, 245, 0.3)',
        'glow-lavender': '0 0 25px -5px rgba(167, 165, 255, 0.25)',
        'glow-green': '0 0 25px -5px rgba(84, 214, 160, 0.3)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
