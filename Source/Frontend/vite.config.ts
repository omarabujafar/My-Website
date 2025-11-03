import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@Universal': path.resolve(__dirname, './Universal'),
      '@Assets': path.resolve(__dirname, './Assets'),
      '@Pages': path.resolve(__dirname, './Pages'),
    },
  },
  assetsInclude: ['**/*.lottie'],
})
