import vituum from 'vituum'
import nunjucks from '@vituum/vite-plugin-nunjucks'
import { defineConfig } from "vitest/config";
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: { 
        lib: { 
            entry: resolve(__dirname, 'src/main.ts'), 
            formats: ['es'],
        },
        copyPublicDir: false,
        rollupOptions: {
            input: 'src/main.ts',
        }
    },
    plugins: [vituum(), nunjucks({
        root: './src'
    }), dts({rollupTypes: true})],
	test: {
        setupFiles: ['./specs/unit/setup.ts'],
		include: ['./specs/unit/*.{test,spec}.{js,ts}'],
        environment: 'happy-dom'
	}
})