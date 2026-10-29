/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // archive/ holds the 2025 version, whose auto-generated test only checks that an array is defined.
  test: { include: ['src/**/*.test.ts'] },
})
