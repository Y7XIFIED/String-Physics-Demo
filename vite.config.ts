import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'esnext', // enable top-level await support
  },
});
