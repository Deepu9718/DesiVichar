// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // default is '.', so optional
  build: {
    outDir: 'dist',
  },
  publicDir: 'public', // ensure it looks here for index.html
})
