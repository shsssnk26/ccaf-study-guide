import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://<user>.github.io/ccaf-study-guide/, so every asset and route lives under this base path.
export default defineConfig({
  base: "/ccaf-study-guide/",
  plugins: [react()],
  // The question bank and lessons ship in the main bundle (about 230 KB gzipped in total), which is fine for this app.
  build: { chunkSizeWarningLimit: 1000 },
});
