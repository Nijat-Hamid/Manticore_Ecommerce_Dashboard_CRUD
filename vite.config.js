import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import react from "@vitejs/plugin-react-swc";
import eslintPlugin from "@nabla/vite-plugin-eslint";


export default defineConfig({
  plugins: [react(),mkcert(),eslintPlugin()],
  server: {
    open:true,
    host:true,
    https:true,
    watch: {
      usePolling: true,
    },
  },
  base: "./",
});
