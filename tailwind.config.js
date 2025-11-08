/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
        colors: {
            "primary": "#FF7F50",
            "background-light": "#FFFFFF",
            "background-dark": "#1A1A1A",
            "charcoal": "#333333",
            "light-gray": "#F5F5F5"
        },
        fontFamily: {
            "display": ["Lexend", "sans-serif"]
        },
        borderRadius: {
            "DEFAULT": "0.5rem",
            "lg": "0.75rem",
            "xl": "1rem",
            "full": "9999px"
        },
    },
  },
  plugins: [],
}
