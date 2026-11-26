/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/sos-travel-app/',
  plugins: [react()],
  test: {
    // jsdom gives the tests a pretend browser, so localStorage works
    environment: 'jsdom',
  },
})
