import type { LayoutLoad } from './$types';

export const load = (async ({params}) => {
    const [w, h] = params.size.split('x').map(d => +d)
    return {w, h};
}) satisfies LayoutLoad;