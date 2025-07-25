// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";
// import { fileURLToPath } from "url";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": fileURLToPath(new URL('./src', import.meta.url))
//     }
//   },
//   server: {
//     port: 5173,
//     strictPort: true,
//     host: true,
//     cors: true
//   },
//   optimizeDeps: {
//     include: ['react-dropzone']
//   }
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { componentTagger } from "lovable-tagger";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,     // true = listen on all interfaces (0.0.0.0)
    cors: true,
  },
  optimizeDeps: {
    include: ["react-dropzone"],
  },
}));

