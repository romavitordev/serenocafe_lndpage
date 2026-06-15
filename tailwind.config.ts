import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        creme: '#F3ECE0',
        espresso: '#20150E',
        noite: '#140C07',
        avela: '#9C7C5C',
        terracota: '#BE5E36',
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        page: '72rem',
        wide: '80rem',
      },
      transitionTimingFunction: {
        saida: 'cubic-bezier(.16,1,.3,1)',
        cortina: 'cubic-bezier(.76,0,.24,1)',
      },
      keyframes: {
        descer: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(220%)' },
        },
        onda: {
          '0%, 100%': { transform: 'scaleY(0.35)' },
          '50%': { transform: 'scaleY(1)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        kenburns: {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.1)' },
        },
      },
      animation: {
        descer: 'descer 1.8s ease-in-out infinite',
        onda: 'onda 0.9s ease-in-out infinite',
        marquee: 'marquee 60s linear infinite',
        kenburns: 'kenburns 16s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

export default config
