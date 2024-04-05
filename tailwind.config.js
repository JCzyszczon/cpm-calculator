/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        backgroundColorD: "#1d1d1f",
        backgroundColorL: "#fafaf6",
        textColorD: "#fafaf6",
        textColorL: "#1d1d1f",
        modalColorD: "#1e1e1f",
        modalColorL: "#e9e9e5",
        borderColorD: "#3e3e3f",
        borderColorL: "#b5bbc4",
        themeColorY: "#ffd074",
        themeColorT: "#17f1d1",
        themeColorP: "#A374FF",
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
