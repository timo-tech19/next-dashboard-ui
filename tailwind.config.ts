import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#C3EBFA",
        "primary-light": "#EDF9FD",
        secondary: "#CFCEFF",
        "secondary-light": "#F1F0FF",
        tertiary: "#FAE27C",
        "tertiary-light": "#FEFCE8",
        light: "#F7F8FA",
      },
    },
  },
  plugins: [],
};
export default config;
