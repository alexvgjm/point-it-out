<script lang="ts">
  import '$src/style.css'
  import '$src/test-styles.css'

  import * as pio from '$lib/main'
  import { browser } from '$app/environment'
  import { page } from '$app/stores'

  if (browser) {
    ;(window as unknown as { pio: typeof pio }).pio = pio
  }
</script>

{#if $page.error}
  <h2>Errrorrrorrororr</h2>
{/if}
<slot></slot>
