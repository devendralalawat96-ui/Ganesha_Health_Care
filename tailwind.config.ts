import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F4FAF7",
        ink: "#12241E",
        inksoft: "#42574F",
        sage: "#7D918A",
        line: "#D6E4DD",
        brand: {
          DEFAULT: "#0A8055",
          soft: "#DFF5EB",
          dark: "#065F40",
          bright: "#10B981",
        },
        alert: "#C2453C",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        deva: ["var(--font-deva)", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: { content: "1160px" },
    },
  },
  plugins: [],
};

export default config;
