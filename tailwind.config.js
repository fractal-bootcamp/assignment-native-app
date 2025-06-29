/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['PlayfairDisplay-Regular'],
        'playfair': ['PlayfairDisplay-Regular'],
        'playfair-bold': ['PlayfairDisplay-Bold'],
        'playfair-italic': ['PlayfairDisplay-Italic'],
        'playfair-bold-italic': ['PlayfairDisplay-BoldItalic'],
        'playfair-semi-bold': ['PlayfairDisplay-SemiBold'],
      },
    },
  },
  plugins: [],
}

