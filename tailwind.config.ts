import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      outline: {
        none: 'none',
      },
      letterSpacing: {
        1: '-0.75px',
        2: '-0.5px',
      },
      fontFamily: {
        primary: ['var(--font-inter)'],
        secondary: ['var(--font-barlow)'],
      },
      colors: {
        primary: {
          // Customize it on globals.css :root
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
          950: 'rgb(var(--tw-color-primary-950) / <alpha-value>)',
        },
        dark: '#222222',
        gray: {
          1: '#D9D9D9',
          10: '#E5E7EB',
          50: '#F9FAFB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          800: '#1F2937',
          900: '#111827',
        },
        linear: {
          1: '#8B5DF5',
          2: '#5DE4BB',
          3: 'rgba(139, 93, 245, 0.3)',
          4: 'rgba(93, 228, 187, 0.3)',
        },
        black: {
          1: '#0D131F',
        },
        error: {
          1: '#F55D5D',
        },
        green: {
          1: '#2C992E',
          500: '#91E0C8',
          400: '#A7E6D3',
        },
        red: {
          1: '#DC2626',
          300: '#EF4444',
        },
        violet: {
          1: '#8B5CF6',
        },
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
