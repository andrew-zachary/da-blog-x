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
      black: 'var(--black)',
      white: 'var(--white)',
      transparent: 'var(--transparent)',
      extend: {
      },
    }
  },
  plugins: [],
}

