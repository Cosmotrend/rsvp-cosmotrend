import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: parseInt(process.env.PORT) || 5173,
    strictPort: false,
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        wheel: resolve(__dirname, 'wheel/index.html'),
      }
    }
  }
})
