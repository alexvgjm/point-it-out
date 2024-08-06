import adapter from '@sveltejs/adapter-auto'
import staticAdapter from '@sveltejs/adapter-static'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { cpSync, rmSync } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

/** @type {import('@sveltejs/kit').Config} */
let config

if (process.env.DOCS) {
  rmSync('./buildenvironment', { recursive: true, force: true })
  cpSync('./src', './buildenvironment', { recursive: true })
  rmSync('./buildenvironment/routes/(tests)', { recursive: true, force: true })
  rmSync('./buildenvironment/routes/[shape]', { recursive: true, force: true })

  config = {
    preprocess: [vitePreprocess()],
    kit: {
      adapter: staticAdapter({
        pages: 'dist-docs'
      }),
      files: {
        routes: 'buildenvironment/routes'
      }
    },
    extensions: ['.svelte']
  }
} else {
  config = {
    preprocess: vitePreprocess(),
    kit: { adapter: adapter() }
  }
}

export default config
