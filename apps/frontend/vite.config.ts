import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    strictPort: true,
  },
  resolve: {
    alias: {
      // Configure l'alias @/ pour pointer vers le chemin absolu du dossier src/
      '@': resolve(__dirname, 'src'), 
    },
  },
})
