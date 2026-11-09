import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // react-snap prerenders from `build/` by default
    outDir: 'build',
  },
});
