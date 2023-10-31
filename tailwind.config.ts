import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      "as-banner": "#8C0F61",
      "as-banner-yellow": "#F29F05",
      "as-white": "#F2F2F2",
      "as-solmon": "#D90479",
      "as-hilight": "#BF78A6",
      "error":"ff0000"
    },
  },
  plugins: []

};
export default config;
