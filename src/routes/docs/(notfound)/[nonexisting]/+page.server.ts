import { error } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load = (async () => {
  error(404, { message: 'Not found' })
}) satisfies PageServerLoad
