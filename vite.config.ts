import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "favicon.svg"],
      manifest: {
        name: "Markdown Editor",
        short_name: "MDE",
        description: "A simple Online Markdown editor",
        theme_color: "#000",
        background_color: "#000",
        screenshots: [{ src: "/screenshots/desktop.png", sizes: "2560x1440", type: "image/png", form_factor: "wide" }],
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
  css: { transformer: "lightningcss" },
  resolve: { tsconfigPaths: true },

  server: { host: true, port: 3000, strictPort: true },
  build: { cssMinify: "lightningcss", emptyOutDir: true },
  preview: { host: true, port: 3000, strictPort: true },
});
