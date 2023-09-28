/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.html', './public/**/*.css', './views/**/*.{html,js,ejs}'],
  theme: {
    extend: {
      colors: {
        // Ensure "sky" color is defined
        'sky-500': '#0ea5e9',
      },
    },
  },
  plugins: [],
}
