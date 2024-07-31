import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
        setupFiles: ['./tests/unit/setup.ts'],
		include: ['./tests/unit/*.{test,spec}.{js,ts}'],
        environment: 'happy-dom'
	}
});
