import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // Plugin duy nhất chúng ta cần ở đây là 'react'
  plugins: [react()],
});
