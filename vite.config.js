/* global process */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command }) => {
  const base = command === 'serve'
    ? '/'
    : (process.env.VITE_BASE_PATH || '/GEO/')

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
    ],
  }
})
