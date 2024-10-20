/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primaryBg: "bg-slate-500",
        // SecondaryBg: "bg-slate-700",
        primaryText: "#65758B",
        SecondaryText: "#324055",
      },
    },
  },
  plugins: [],
};
