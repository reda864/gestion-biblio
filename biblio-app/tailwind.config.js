/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        beige: '#f5f5dc',
        'beige-light': '#fdfaf5',
        brown: {
          300: '#b48a78',
          600: '#8b5e3c',
          700: '#7b4a28',
          800: '#5a3214',
        },
      },
    },
  },
};

// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        beige: '#fdf6e3',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.6s ease-out both',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: 0, transform: 'translateY(-30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'fade-slide': 'fadeSlide 0.8s ease-out both',
        'fade-delay-1': 'fadeSlide 1s ease-out both 0.2s',
        'fade-delay-2': 'fadeSlide 1s ease-out both 0.4s',
        'fade-delay-3': 'fadeSlide 1s ease-out both 0.6s',
      },
      keyframes: {
        fadeSlide: {
          '0%': { opacity: 0, transform: 'translateY(-20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

