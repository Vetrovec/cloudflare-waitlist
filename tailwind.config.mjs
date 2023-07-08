import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: colors.blue,
      gray: colors.gray,
      base: colors.white,
    },
  },
  plugins: [],
};

export default tailwindConfig;
