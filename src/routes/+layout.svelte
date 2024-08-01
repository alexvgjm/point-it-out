<script lang="ts">
	import '../style.css';
	import '../test-styles.css';

	import * as pio from '../lib/main';
	import { browser } from '$app/environment';

	if (browser) {
		(window as unknown as {pio: typeof pio}).pio = pio;
	}
</script>

<slot></slot>
