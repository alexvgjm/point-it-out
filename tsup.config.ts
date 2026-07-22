import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/lib/index.ts'],
	format: ['esm'],
	dts: true,
	tsconfig: './tsconfig.build.json',
	clean: true,
	outDir: 'dist-npm',
	minify: true,
	treeshake: true
})