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
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.svg"],
      manifest: {
        name: "Markdown Editor",
        short_name: "MDE",
        description: "A simple Online Markdown editor",
        theme_color: "#000",
        background_color: "#000",
        screenshots: [{ src: "/screenshots/desktop.png", sizes: "2560x1440", type: "image/png" }],
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
    }),
  ],
});
