/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1B304F",
        secondary: "#467DCF",
        tertiary: "#6E84A4",
      },
    },
  },
  plugins: [],
};
