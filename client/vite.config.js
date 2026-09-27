import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  build: {
    // No sourcemaps in the production bundle — smaller output, and it
    // stops the original source from being trivially downloadable.
    sourcemap: false,
    // Split vendor code into its own chunk so it's cached separately from
    // app code that changes more often (better repeat-visit load times).
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios'],
        },
      },
    },
    // Silence the default warning at a slightly higher, still-sane limit.
    chunkSizeWarningLimit: 600,
  },
});
