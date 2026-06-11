import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@components': path.resolve(process.cwd(), 'src/components'),
      '@utils': path.resolve(process.cwd(), 'src/utils'),
      '@pages': path.resolve(process.cwd(), 'src/pages'),
    },
  },
})