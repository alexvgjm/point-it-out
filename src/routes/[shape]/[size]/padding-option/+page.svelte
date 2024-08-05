<script lang="ts">
	import type { PageData } from './$types'

	export let data: PageData
</script>

<div
	class="test-box test-box--{data.w}x{data.h} test-box--expected"
	style="width: {data.w}px; height: {data.h}px"
>
	<div id="mock"></div>
</div>

<style>
	#mock {
		border: 4px solid orange;
		box-sizing: content-box;
		position: absolute;
		padding: 16px;
		left: -20px;
		top: -20px;
		width: 100%;
		height: 100%;
	}
</style>
