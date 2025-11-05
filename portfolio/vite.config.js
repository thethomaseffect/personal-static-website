import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/personal-static-website/portfolio/',
  build: {
    outDir: '../dist/portfolio',
    emptyOutDir: true,
  },
});

