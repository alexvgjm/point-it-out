import { sveltekit } from '@sveltejs/kit/vite'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		setupFiles: ['./tests/unit/setup.ts'],
		include: ['./tests/unit/*.{test,spec}.{js,ts}'],
		environment: 'happy-dom'
	},
	define: {
		PKG: pkg
	}
})
