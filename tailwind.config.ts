import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111111",
        "background-soft": "#151515",
        surface: "#1f1f1f",
        "surface-hover": "#262626",
        border: "#343434",
        "border-strong": "#4f46e5",
        text: "#f5f5f5",
        "text-muted": "#a3a3a3",
        "text-soft": "#d4d4d4",
        accent: "#6366f1",
        "accent-2": "#8b5cf6",
        success: "#22c55e",
        warning: "#eab308",
        danger: "#ef4444",
      },
      boxShadow: {
        glow: "0 20px 60px rgba(99, 102, 241, 0.18)",
      },
      fontFamily: {
        sans: ["Vazirmatn", "Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
