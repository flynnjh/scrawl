/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        plex: ["IBM Plex Sans", "sans-serif"],
        plexCondensed: ["IBM Plex Sans Condensed", "sans-serif"],
      },
    },
    plugins: [],
  },
};
