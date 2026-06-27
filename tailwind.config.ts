import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1f2933",
        paper: "#f7f2ea",
        mist: "#e7edf0",
        moss: "#526459",
        wine: "#8f4b45",
        brass: "#c69b5b"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(31, 41, 51, 0.11)"
      }
    }
  },
  plugins: []
};

export default config;
