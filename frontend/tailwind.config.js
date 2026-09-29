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
        // Pure Black & White Monochromatic Base
        black: '#000000',
        white: '#FFFFFF',
        zinc: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
          950: '#09090B',
        },
        // Strategic Scientific Color Accents
        evidence: {
          green: '#10B981',
          greenLight: '#ECFDF5',
          greenBorder: '#A7F3D0',
          cyan: '#0EA5E9',
          cyanLight: '#F0F9FF',
          cyanBorder: '#BAE6FD',
          amber: '#F59E0B',
          amberLight: '#FFFBEB',
          amberBorder: '#FDE68A',
        },
        coral: {
          DEFAULT: '#FF5A36',
          hover: '#E84925',
          light: '#FFF1EE',
          border: '#FFD4CC',
        },
        cyan: {
          electric: '#38C7D8',
          deep: '#0284C7',
          ice: '#E0F2FE',
        },
        text: {
          primary: '#09090B',
          secondary: '#52525B',
          muted: '#71717A',
          darkPrimary: '#FFFFFF',
          darkSecondary: '#A1A1AA',
        }
      },
      fontFamily: {
        heading: ['"Lexend Deca"', '"Plus Jakarta Sans"', 'sans-serif'],
        brand: ['"Lexend Deca"', 'sans-serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 12px 30px -4px rgba(0, 0, 0, 0.12)',
        'glow-cyan': '0 0 25px -4px rgba(14, 165, 233, 0.35)',
        'glow-green': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-coral': '0 0 25px -4px rgba(255, 90, 54, 0.35)',
      },
      fontFamily: {
        heading: ['"Lexend Deca"', '"Plus Jakarta Sans"', 'sans-serif'],
        brand: ['"Lexend Deca"', 'sans-serif'],
        sans: ['Inter', '"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -4px rgba(56, 199, 216, 0.35)',
        'glow-coral': '0 0 25px -4px rgba(255, 90, 54, 0.35)',
        'glow-green': '0 0 25px -4px rgba(16, 185, 129, 0.35)',
        'glow-lavender': '0 0 25px -4px rgba(158, 156, 246, 0.25)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-hover': '0 20px 40px -15px rgba(0, 0, 0, 0.5), 0 0 20px 0 rgba(56, 199, 216, 0.15)',
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
