/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: "Poppins, sans-serif",
    },
    screens: {
      xs1: "375px",
      xs: "480px",
      sm2: "540px",
      sm1: "576px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xl3: "1536px",
    },

    extend: {
      fontSize: {
        huge: ["80rem", { lineHeight: "1" }],
      },
      colors: {
        "color-main-100": "#FFE3BF",
        "color-main-200": "#FFC193",
        "color-main-300": "#FFA367",
        "color-main-400": "#FF964C",
        "color-main-500": "#F58426",
        "color-main-600": "#E06D00",
        "color-main-700": "#B85400",
        "color-main-800": "#8F3B00",
        "color-main-900": "#662300",
        "black-filter": "rgba(18, 19, 25, 0.4)",
      },

      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};
