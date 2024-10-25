import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [typography],
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-vazirmatn)", "sans-serif"],
      },
    },
  },
} as Config;
