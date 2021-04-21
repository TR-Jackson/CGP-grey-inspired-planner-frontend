module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        "-10": "-10",
      },
      spacing: {
        screen: "-100vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
