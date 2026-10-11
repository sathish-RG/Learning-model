import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The dining room (http://localhost:5173) passes every /api request to the kitchen
// (the API on port 5000). To the browser it's all one website, so the login cookie just works.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
