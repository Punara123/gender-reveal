/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FFF5F6',
          100: '#FADADD',
          200: '#F5B7B1',
        },
        babyBlue: {
          50: '#F0F8FF',
          100: '#D1E9F6',
          200: '#A9CCE3',
        },
        cream: {
          50: '#FFFEFC',
          100: '#FFF9F3',
          200: '#FDF2E9',
        },
        charcoal: '#2D2D2D',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        script: ['"Dancing Script"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('/paper_texture.png')",
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 10px 40px -10px rgba(0, 0, 0, 0.08)',
      }
    },
  },
  plugins: [],
}
