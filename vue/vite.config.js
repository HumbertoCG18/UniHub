// unihub-novo/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcssVite from '@tailwindcss/vite' // Importe o plugin

export default defineConfig({
  plugins: [
    react(),
    tailwindcssVite(), // Adicione o plugin aqui
  ],
})