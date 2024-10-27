import type { Config } from "tailwindcss";

import typography from "@tailwindcss/typography";

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [typography],
  future: { hoverOnlyWhenSupported: true },
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       sans: ["var(--font-vazirmatn)", "sans-serif"],
  //     },
  //   },
  // },
} satisfies Config;
