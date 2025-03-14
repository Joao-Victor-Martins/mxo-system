/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          custom: ["Poppins", "sans-serif"], // Nome da fonte
        },
      },
    },
    plugins: [],
  };
  