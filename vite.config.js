import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// vite.config.js
export default {
  server: {
    proxy: {
      // Proxy all requests with path starting with '/api' to the specified target
      '/api': {
        target: 'https://hhbackend.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
