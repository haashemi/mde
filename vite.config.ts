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
      includeAssets: ["favicon.ico", "favicon.svg", "apple-touch-icon-180x180.png"],
      // Fonts are bundled but large, so they're cached the first time they're used instead of precached.
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.endsWith(".woff2"),
            handler: "CacheFirst",
            options: { cacheName: "fonts" },
          },
        ],
      },
      manifest: {
        id: "/",
        name: "MDE: Markdown Editor",
        short_name: "MDE",
        description: "A fast, minimal markdown editor with a live preview. Works fully offline.",
        lang: "en",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        categories: ["productivity", "utilities"],
        theme_color: "#0b0b0b",
        background_color: "#0b0b0b",
        icons: [
          { src: "pwa-64x64.png", sizes: "64x64", type: "image/png" },
          { src: "pwa-192x192.png", sizes: "192x192", type: "image/png" },
          { src: "pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "maskable-icon-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
        screenshots: [
          {
            src: "/screenshots/wide-light.png",
            sizes: "2560x1440",
            type: "image/png",
            form_factor: "wide",
            label: "Editor and live preview side by side",
          },
          {
            src: "/screenshots/wide-dark.png",
            sizes: "2560x1440",
            type: "image/png",
            form_factor: "wide",
            label: "Editor and live preview in dark mode",
          },
          {
            src: "/screenshots/narrow-light.png",
            sizes: "780x1688",
            type: "image/png",
            form_factor: "narrow",
            label: "Editor stacked above the preview on mobile",
          },
          {
            src: "/screenshots/narrow-dark.png",
            sizes: "780x1688",
            type: "image/png",
            form_factor: "narrow",
            label: "Mobile layout in dark mode",
          },
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
