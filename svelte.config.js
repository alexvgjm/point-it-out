import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import dotenv from 'dotenv'
dotenv.config()

/** @type {import('@sveltejs/kit').Config} */
let config = {
	preprocess: vitePreprocess(),
	kit: {
		alias: {
			// Aliases needed to avoid absolute paths. We can move some routes to
			// another temp folder in build time and imports still works.
			$routes: './src/routes',
			$comps: './src/doc-components',
			$lib: './src/lib',
			$stores: './src/stores',
			$src: './src',
			$assets: './src/assets'
		}
	}
}

config.kit.adapter = adapter()

export default config
