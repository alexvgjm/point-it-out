import type { LayoutLoad } from './$types'
import { browser } from '$app/environment'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import javascript from 'highlight.js/lib/languages/javascript'
import { useStore } from '$stores/general.svelte'

export const load = (async () => {
  if (browser) {
    hljs.registerLanguage('typescript', typescript)
    hljs.registerLanguage('html', xml)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('bash', bash)
  }

  useStore(hljs)

  return { hljs }
}) satisfies LayoutLoad
