import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'spline-vue': path.resolve(__dirname, 'node_modules/spline-vue/lib/v3/spline-vue.js')
    }
  },
  optimizeDeps: {
    include: ["three", 'spline-vue'],
    
  }
})
