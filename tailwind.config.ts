/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";
import Typography from "./theme/__Theme.Typography";
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: Typography,
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
