import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served at the root of https://ccaf.zerotoagent.net (custom domain on GitHub Pages).
export default defineConfig({
  base: "/",
  plugins: [react()],
  // The question bank and lessons ship in the main bundle (about 230 KB gzipped in total), which is fine for this app.
  build: { chunkSizeWarningLimit: 1000 },
});
