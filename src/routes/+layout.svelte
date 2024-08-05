<script lang="ts">
	import '../style.css'
	import '../test-styles.css'

	import * as pio from '../lib/main'
	import { browser } from '$app/environment'

	if (browser) {
		;(window as unknown as { pio: typeof pio }).pio = pio
	}
</script>

<slot></slot>

<style>
	:global(main h1:first-child) {
		padding-bottom: 0.25em;
		margin-bottom: 0.25em;
		border-bottom: 0.15rem solid var(--color-third);
	}

	:global(.doc-section:not(:first-of-type)) {
		margin-top: 4rem;
	}
	:global(.doc-section:last-of-type) {
		margin-bottom: 6rem;
	}
	:global(.doc-section h2) {
		padding: 0.4em 0;
		border-bottom: 0.25rem solid #0002;
	}
</style>
