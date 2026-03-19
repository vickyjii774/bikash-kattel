/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Cabinet Grotesk"', 'sans-serif'],
      },
      colors: {
        bg: '#080A0F',
        surface: '#0F1118',
        card: '#141720',
        border: 'rgba(255,255,255,0.07)',
        accent: '#00F5A0',
        accent2: '#0066FF',
        muted: '#6B7280',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s step-end infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(30px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
};
