import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      primary: colors.blue,
      gray: colors.gray,
      error: colors.red[500],
      base: colors.white,
      transparent: colors.transparent,
    },
  },
  plugins: [],
};

export default tailwindConfig;
