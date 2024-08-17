import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5040', // Use IPv4 address explicitly
        changeOrigin: true, // Recommended to avoid host header issues
      },
    },
  },
});