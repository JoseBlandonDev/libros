/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#0B0F1A",
        ink: "#0F172A",
        gold: "#D6B15C",
        electric: "#2B6BFF"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(214,177,92,0.25), 0 0 24px rgba(43,107,255,0.25)"
      }
    }
  },
  plugins: []
};
