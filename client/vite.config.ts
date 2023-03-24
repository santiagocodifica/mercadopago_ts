import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    },
    port: 5173
  }
})
