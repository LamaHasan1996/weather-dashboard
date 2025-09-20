/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
      colors: { brand: { 500: "#06b6d4", 600: "#0ea5b7" } },
    },
  },
  plugins: [],
};

