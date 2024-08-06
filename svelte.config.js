import adapter from '@sveltejs/adapter-auto'
import staticAdapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { cpSync, renameSync, rmSync } from 'fs'
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
      $src: './src'
    }
  }
}

if (process.env.DOCS) {
  rmSync('./buildenvironment', { recursive: true, force: true })
  cpSync('./src', './buildenvironment', { recursive: true })
  rmSync('./buildenvironment/routes', { recursive: true, force: true })
  cpSync('./src/routes/docs', './buildenvironment/docs', { recursive: true, force: true })
  renameSync('./buildenvironment/docs', './buildenvironment/routes')

  config.preprocess = [vitePreprocess()]
  config.kit.adapter = staticAdapter({ pages: 'dist-docs' })
  config.kit.files = { routes: 'buildenvironment/routes' }
  config.kit.prerender = { handleMissingId: 'ignore' }
} else {
  config.kit.adapter = adapter()
}

export default config
