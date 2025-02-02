import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class', // Enable dark mode using a CSS class
  content: ['./index.html', './src/**/*.{html,jsx,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        indigo: colors.blue,
      },
    },
  },
  plugins: [forms, typography],
};
