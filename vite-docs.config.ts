import { sveltekit } from '@sveltejs/kit/vite'
import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vitest/config'

const file = fileURLToPath(new URL('package.json', import.meta.url))
const json = readFileSync(file, 'utf8')
const pkg = JSON.parse(json)
/**
 * FIXME: static adapter requires $env/static and not $env/dynamic. Need to
 * investigate how to add version programmatically without .env file.
 */
process.env.PUBLIC_VERSION = pkg.version
writeFileSync('./.env', 'PUBLIC_VERSION=' + pkg.version)

export default defineConfig({
  plugins: [sveltekit()]
})
