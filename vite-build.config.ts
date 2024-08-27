import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'

export default defineConfig({
  test: {
    setupFiles: ['./tests/unit/setup.ts'],
    include: ['./tests/unit/*.{test,spec}.{js,ts}'],
    environment: 'happy-dom'
  },
  plugins: [dts({ rollupTypes: true })],
  build: {
    minify: 'esbuild',
    lib: {
      entry: resolve(__dirname, 'src/lib/index.ts'),
      formats: ['es']
    },
    copyPublicDir: false,
    rollupOptions: {
      input: 'src/lib/index.ts'
    },
    outDir: 'dist-npm'
  }
})
