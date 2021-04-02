module.exports = {
    prefix: '',
    purge: {
      content: [
        './src/**/*.{html,ts}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [require('@tailwindcss/aspect-ratio')],
};
