module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'violet-gradient': {
          'start': '#8B5CF6',
          'end': '#6D28D9',
        },
      },
      backgroundImage: {
        'violet-gradient': 'linear-gradient(to right, var(--tw-gradient-stops))',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'violet-start': '#8B5CF6',
        'violet-end': '#6D28D9',
      }),
    },
  },
  plugins: [],
}