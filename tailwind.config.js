/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#45B7D1',
        accent: '#4ECDC4',
        'jazz-gold': '#FFD700',
        'jazz-red': '#FF6B6B',
        'jazz-green': '#96CEB4',
        'jazz-blue': '#45B7D1',
        'jazz-teal': '#4ECDC4',
        'warm-gray': '#f5f5f5',
      },
      fontFamily: {
        serif: ['Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#1a1a1a',
            h1: {
              color: '#1a1a1a',
              fontWeight: '700',
            },
            h2: {
              color: '#1a1a1a',
              fontWeight: '600',
            },
            h3: {
              color: '#1a1a1a',
              fontWeight: '600',
            },
            'blockquote p:first-of-type::before': false,
            'blockquote p:last-of-type::after': false,
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};