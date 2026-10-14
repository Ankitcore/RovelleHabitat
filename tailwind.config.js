/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        rovelle: {
          slate: '#657DA0',
          'slate-hover': '#546A8B',
          'slate-dark': '#485C7B',
          charcoal: '#202A36',
          'charcoal-light': '#2C3A4B',
          ivory: '#F6F4EF',
          'ivory-dark': '#EDE9E0',
          muted: '#68717C',
          border: '#E2E5E9',
          'tint-blue': '#EEF2F8',
          'tint-blue-hover': '#E3E9F3',
        },
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        site: '1440px',
      },
    },
  },
  plugins: [],
}
