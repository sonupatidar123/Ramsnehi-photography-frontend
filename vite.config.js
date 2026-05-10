import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  build: {
    // Chunk optimization
    rollupOptions: {
      output: {
        // Manual chunk configuration for better code splitting
        manualChunks: (id) => {
          // Vendor libraries
          if (id.includes('node_modules')) {
            // React ecosystem
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            // Animation & UI
            if (id.includes('framer-motion')) {
              return 'animations';
            }
            // State management & data fetching
            if (id.includes('@tanstack/react-query')) {
              return 'data-fetching';
            }
            // UI Icons
            if (id.includes('lucide-react')) {
              return 'icons';
            }
            // Everything else
            return 'vendor';
          }

          // Component-based chunking
          if (id.includes('/components/')) {
            // Heavy admin components get their own chunk
            if (id.includes('AdminDashboard') || id.includes('AdminLogin')) {
              return 'admin';
            }
            // Review components
            if (id.includes('ReviewFunnel')) {
              return 'review';
            }
            // Shared components stay in main or separate chunk
            if (id.includes('Navbar') || id.includes('Footer') || id.includes('Socialsidebar')) {
              return 'layout';
            }
            // Content components
            if (id.includes('Hero') || id.includes('GallerySection') || id.includes('VideoSection')) {
              return 'content';
            }
          }

          // Pages
          if (id.includes('/pages/')) {
            return 'pages';
          }
        },
      },
    },
    
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    
    // CSS code splitting
    cssCodeSplit: true,

    // Source maps
    sourcemap: false,

    // Target modern browsers only (reduces polyfills)
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],

    // Optimized module preload
    reportCompressedSize: true,
  },

  // Development optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@tanstack/react-query',
      'lucide-react',
      'axios',
    ],
    exclude: ['@vite/plugin-react'],
  },
})
