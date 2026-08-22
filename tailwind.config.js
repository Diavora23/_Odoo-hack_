/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // MakeMyTrip Signature Blue Palette
        mmtBlue: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a6f8',
          500: '#008cff', // Core MMT Sky Blue
          600: '#006ed6',
          700: '#0057ab',
          800: '#06488a',
          900: '#0a2240', // MMT Header Deep Navy
          950: '#051329', // MMT Midnight Dark Navy
        },
        // MakeMyTrip Signature Red / Coral Palette
        mmtRed: {
          50: '#fef2f2',
          100: '#ffe1e2',
          200: '#ffc8cb',
          300: '#ffa2a7',
          400: '#f87171',
          500: '#e41d24', // Core MMT Red
          600: '#d11218',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        // Mapped helpers for seamless backward compatibility
        navy: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a6f8',
          500: '#008cff',
          600: '#006ed6',
          700: '#0057ab',
          800: '#0a2240',
          900: '#051329',
          950: '#030b17',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffb400', // MMT Star Rating Amber
          600: '#e41d24', // Primary highlights
          700: '#d11218',
          800: '#b91c1c',
          900: '#7f1d1d',
        },
        saffron: {
          50: '#fef2f2',
          100: '#ffe1e2',
          200: '#ffc8cb',
          300: '#ffa2a7',
          400: '#f87171',
          500: '#e41d24', // Mapped to MMT Red
          600: '#d11218',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        indiaTeal: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#38a6f8',
          500: '#008cff', // Mapped to MMT Blue
          600: '#006ed6',
          700: '#0057ab',
          800: '#06488a',
          900: '#0a2240',
        },
        sand: {
          50: '#f4f7fa', // MMT Cool Light Gray background
          100: '#eaf0f6',
          200: '#dde6f0',
          300: '#cbd7e6',
        }
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'mmt-card': '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
        'mmt-hover': '0 12px 30px 0 rgba(0, 140, 255, 0.18)',
        'glow-red': '0 0 25px -5px rgba(228, 29, 36, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(0, 140, 255, 0.4)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
