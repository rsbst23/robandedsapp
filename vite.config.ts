import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
  tanstackRouter({ // <-- This is the router compiler
 target: 'react',
 autoCodeSplitting: true,
 }),
  
    react()
  ],
test: {
 globals: true,
 environment: 'jsdom',
 setupFiles: './src/setupTests.ts',
 },  
})
