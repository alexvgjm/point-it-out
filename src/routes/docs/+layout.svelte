<script lang="ts">
	import '../../style.css'
	import DocNav from '../../doc-components/DocNav.svelte'
	import 'highlight.js/styles/atom-one-dark.min.css'
	import { browser } from '$app/environment'
	import type { LayoutData } from './$types'
	import { afterNavigate } from '$app/navigation'
	import { update } from '$lib/main'

	export let data: LayoutData

	afterNavigate(() => {
		if (browser) {
			data.hljs.highlightAll()
			update()
		}
	})
</script>

<div class="docs-wrapper">
	<DocNav />
	<main>
		<slot></slot>
	</main>
</div>

<style>
	.docs-wrapper {
		max-width: 1280px;
		display: flex;
		width: 100%;
		height: 100svh;
	}

	main {
		position: relative;
		flex-grow: 1;
		overflow-y: auto;
		background: var(--color-bg-2);
		padding: 3rem 0.5rem 2rem 0.5rem;
	}

	@media (min-width: 640px) {
		main {
			padding: 3rem 2rem 2rem 2rem;
		}
	}
</style>
