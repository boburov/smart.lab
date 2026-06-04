import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// SmartLab is a single-page React app; the chemistry data lives in src/data
// and is imported directly (no backend).
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
