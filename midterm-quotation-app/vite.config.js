import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/midterm-quotation-app/', // Ensure this matches your GitHub Pages path
  plugins: [react()],
});
