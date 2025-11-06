import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // PERFORMANCE: Enable Fast Refresh with optimizations
      fastRefresh: true,
      // PERFORMANCE: Optimize JSX runtime
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@Universal': path.resolve(__dirname, './Universal'),
      '@Assets': path.resolve(__dirname, './Assets'),
      '@Pages': path.resolve(__dirname, './Pages'),
      '@/lib': path.resolve(__dirname, './lib'),
    },
  },
  assetsInclude: ['**/*.lottie'],
  build: {
    // Optimize bundle size
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
        drop_debugger: true,
        passes: 2, // PERFORMANCE: Multiple passes for better compression
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
    },
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion', 'gsap', '@gsap/react'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei', 'maath'],
          'webgl-vendor': ['ogl'],
          'lottie-vendor': ['@lottiefiles/dotlottie-react'],
        },
        // PERFORMANCE: Optimize file naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // PERFORMANCE: Enable CSS code splitting
    cssCodeSplit: true,
    // PERFORMANCE: Generate source maps for production debugging (optional, disable for smaller builds)
    sourcemap: false,
    // PERFORMANCE: Target modern browsers for smaller output
    target: 'es2020',
    // PERFORMANCE: Optimize asset inlining threshold
    assetsInlineLimit: 4096, // 4kb threshold for base64 inlining
  },
  // Optimize dev server
  server: {
    hmr: {
      overlay: false, // Disable error overlay for better performance
    },
  },
  // PERFORMANCE: Optimize dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'gsap',
      '@gsap/react',
    ],
    exclude: ['@lottiefiles/dotlottie-react'], // Large dependency, handle separately
  },
})
