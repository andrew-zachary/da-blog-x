/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.{js,ts,jsx,tsx,edge}",
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'var(--primary)'
      },
      secondary: {
        DEFAULT: 'var(--secondary)'
      },
      tertiary: {
        DEFAULT: 'var(--tertiary)'
      },
      black: 'var(--black)',
      white: 'var(--white)',
      transparent: 'var(--transparent)',
      extend: {
      },
    },
    screens: {
      xs: '320px',
      sm: '475px',
      md: '768px',
      lg: '992px',
      xlg: '1200px',
      '2xl': '1440px'
    }
  },
  plugins: [],
}

