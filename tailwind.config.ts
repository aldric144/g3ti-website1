import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'cyber-teal': '#12F6C8',
        'cyber-teal-dark': '#0ED9B0',
        'neural-dark': '#050505',
        'neural-darker': '#030303',
        'intel-gray': '#1a1a1a',
        'intel-border': '#2a2a2a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'typing': 'typing 3s steps(40) infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #12F6C8, 0 0 10px #12F6C8' },
          '100%': { boxShadow: '0 0 20px #12F6C8, 0 0 30px #12F6C8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        typing: {
          '0%': { width: '0' },
          '50%': { width: '100%' },
          '100%': { width: '0' },
        },
      },
      backgroundImage: {
        'neural-grid': 'linear-gradient(rgba(18, 246, 200, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(18, 246, 200, 0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
export default config
