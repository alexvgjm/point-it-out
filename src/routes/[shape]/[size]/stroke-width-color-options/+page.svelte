<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div
	class="test-box test-box--{data.w}x{data.h} test-box--expected"
	style="width: {data.w}px; height: {data.h}px"
></div>

<style>
	.test-box.test-box--expected {
		border: 8px solid limegreen;
	}
</style>
