import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { checker } from "vite-plugin-checker";
import { VitePWA } from "vite-plugin-pwa";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    checker({
      terminal: false,
      typescript: true,
      eslint: { lintCommand: "eslint ./", useFlatConfig: true },
    }),
    tsconfigPaths(),
    react(),
    VitePWA({ registerType: "autoUpdate" }),
  ],
});
