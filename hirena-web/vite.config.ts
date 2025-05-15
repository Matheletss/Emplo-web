import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    cors: true
  },
  optimizeDeps: {
    include: ['react-dropzone']
  }
});
