import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        beige: "#E79782",
        black: "#333333",
        ivory: "#EDE1D4",
        accentBeige: "#D8C3A5",
        gray: "#4A5E65",
        calendar_red: "#FF453A",
        calendar_pink: "#FF69B4",
        calendar_blue: "#1E90FF",
        calendar_green: "#32CD32",
        calendar_yellow: "#FFDF00",
        calendar_purple: "#8A2BE2",
      },
      fontFamily: {
        sans: ["var(--font-zen-maru-gothic)", "sans-serif"],
        rounded: ["var(--font-kosugi-maru)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
