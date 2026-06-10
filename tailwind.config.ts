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
      },
      maxWidth: {
        page: '72rem',
      },
      keyframes: {
        descer: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(220%)' },
        },
      },
      animation: {
        descer: 'descer 1.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
