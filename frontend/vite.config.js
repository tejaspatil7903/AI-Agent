import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
    proxy: {
      "/cdn": {
        target: process.env.CDN_BASE_URL || "https://unpkg.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cdn/, ""),
      },
    },
  },
  build: {
    rollupOptions: {
      external: ["@webcontainer/api", "@highlightjs/cdn-assets"],
    },
  },
});
