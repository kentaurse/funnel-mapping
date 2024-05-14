import dotenv from 'dotenv';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss';

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js')
  ],
  define: {
    'env': process.env
  },
  resolve: {
    alias: {
      src: "/src",
    },
  },
})
