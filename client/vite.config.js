import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Enable gzip compression with optimized settings
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
    // Enable brotli compression (better compression ratio for large files)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false
    })
  ],
  base: '/', 
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    },
    // Enable compression in dev server
    middlewareMode: false,
    compress: true
  },
  build: {
    // Enable compression optimizations
    minify: 'esbuild', // Use esbuild instead of terser for faster builds
    rollupOptions: {
      output: {
        manualChunks: {
          // Split large dependencies into separate chunks for better caching
          vendor: ['react', 'react-dom'],
          'mui-material': ['@mui/material'],
          'mui-icons': ['@mui/icons-material'],
          router: ['react-router-dom'],
          utils: ['@emailjs/browser', 'query-string']
        },
        // Optimize chunk file names for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
      // Disable strict tree shaking to prevent build issues
      treeshake: false
    },
    chunkSizeWarningLimit: 500, // Stricter chunk size limit
    // Disable source maps for production
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Increase memory for builds
    commonjsOptions: {
      include: [/node_modules/]
    }
  },
  // Add optimizations for dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', '@mui/material', '@mui/icons-material']
  }
});
