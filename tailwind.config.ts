import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        site: {
          accent: "#E8505B",
          heading: "#1a1a2e",
          body: "#555555",
          heroTop: "#fce4ec",
          heroMid: "#f48fb1",
          heroBottom: "#ffffff",
          sectionAlt: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
};

export default config;
