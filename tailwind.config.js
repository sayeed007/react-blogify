/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        lwsGreen: "#00D991",
        deepDark: "#27292F",
        mediumDark: "#27292F",
        lighterDark: "#27292F",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@tailwindcss/typography")],
}

