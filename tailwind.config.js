/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          pink: '#FFAAA6',
          'pink-light': '#FFE5EC',
          'pink-dark': '#FF6584',
          blue: '#88D49E',
          'sky-light': '#E0F2FE',
          'sky': '#7DD3FC',
          'sky-dark': '#0284C7',
          lavender: '#D8B4FE',
          'lavender-light': '#F3E8FF',
          'lavender-dark': '#9333EA',
          mint: '#A7F3D0',
          'mint-light': '#ECFDF5',
          'mint-dark': '#059669',
          yellow: '#FDE047',
          'yellow-light': '#FEF9C3',
          'yellow-dark': '#D97706',
          peach: '#FDBA74',
          'peach-light': '#FFEDD5',
          'peach-dark': '#EA580C',
        }
      },
      fontFamily: {
        bubble: ['"Fredoka"', '"Quicksand"', '"Nunito"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(2deg)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(-2deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-slow': 'float-slow 5s ease-in-out infinite',
        wiggle: 'wiggle 1.5s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      boxShadow: {
        'candy': '0 8px 0px 0px rgba(0, 0, 0, 0.12), 0 14px 25px -4px rgba(0, 0, 0, 0.1)',
        'candy-sm': '0 4px 0px 0px rgba(0, 0, 0, 0.1), 0 6px 12px -2px rgba(0, 0, 0, 0.08)',
        'candy-pink': '0 6px 0px 0px #FF8FAB, 0 10px 20px -3px rgba(255, 143, 171, 0.4)',
        'candy-blue': '0 6px 0px 0px #38BDF8, 0 10px 20px -3px rgba(56, 189, 248, 0.4)',
        'candy-yellow': '0 6px 0px 0px #F59E0B, 0 10px 20px -3px rgba(245, 158, 11, 0.4)',
        'candy-green': '0 6px 0px 0px #10B981, 0 10px 20px -3px rgba(16, 185, 129, 0.4)',
        'candy-purple': '0 6px 0px 0px #A855F7, 0 10px 20px -3px rgba(168, 85, 247, 0.4)',
      }
    },
  },
  plugins: [],
}
