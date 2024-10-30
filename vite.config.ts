import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
  target: "18", // '17' | '18' | '19'
};

export default defineConfig({
  plugins: [
    checker({ terminal: false, typescript: true, eslint: { lintCommand: "eslint ./", useFlatConfig: true } }),
    tsconfigPaths(),
    react({ babel: { plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]] } }),
    VitePWA({ registerType: "autoUpdate" }),
  ],
});
