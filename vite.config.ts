import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [vituum(), nunjucks({
        root: './src'
    })],
	test: {
        setupFiles: ['./specs/unit/setup.ts'],
		include: ['./specs/unit/*.{test,spec}.{js,ts}'],
        environment: 'happy-dom'
	}
})