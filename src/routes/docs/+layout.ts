import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import bash from 'highlight.js/lib/languages/bash';

export const load = (async () => {
    if (browser) {
        hljs.registerLanguage('typescript', typescript)
        hljs.registerLanguage('html', xml)
        hljs.registerLanguage('css', css)
        hljs.registerLanguage('bash', bash)
    }

    return { hljs };
}) satisfies LayoutLoad;