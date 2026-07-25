/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B2B26',
        teal: {
          900: '#0B2B26',
          700: '#123832',
          600: '#155147',
          500: '#1F6F5C',
          400: '#2E8B74',
        },
        mint: {
          400: '#6FCF97',
          300: '#9EE6B8',
        },
        gold: '#E8B75C',
        cream: '#F4F7F3',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        blob: '2rem 2rem 2rem 0',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '50%': { transform: 'translate(12px, -10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(232,183,92,0.45)' },
          '50%': { boxShadow: '0 0 0 10px rgba(232,183,92,0)' },
        },
        dash: {
          to: { strokeDashoffset: 0 },
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        drift: 'drift 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.2s ease-out infinite',
      },
    },
  },
  plugins: [],
}
