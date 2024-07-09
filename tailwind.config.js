/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Deep-Violet": "hsl(278, 68%, 11%)",
        errors: "hsl(0, 100%, 66%)",
      },
    },
  },
  plugins: [],
};
