import { defineConfig } from "@fullstacksjs/eslint-config";
import reactCompiler from "eslint-plugin-react-compiler";

export default defineConfig({
  esm: true,
  strict: true,
  ignores: ["src/components/ui/**", ".agents/**", ".claude/**", "dist/**"],
  tailwind: { entryPoint: "./src/index.css" },
  plugins: { "react-compiler": reactCompiler },
});
