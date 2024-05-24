import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://ecommerce-backend-m74h.onrender.com",
      "/uploads/": "https://ecommerce-backend-m74h.onrender.com",
    },
  },
});
