// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }



// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // includes JS + JSX
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // Blue
        secondary: "#9333ea", // Purple
        accent: "#f97316",    // Orange
      },
    },
  },
  plugins: [],
};

