<script lang="ts">
  import '$src/test-styles.css'
  import '$src/style.css'

  import * as pio from '$lib/main'
  import { browser } from '$app/environment'
  import { onDestroy, onMount } from 'svelte'

  if (browser) {
    ;(window as unknown as { pio: typeof pio }).pio = pio

    onMount(() => {
      document.body.classList.add('visual-test')
    })

    onDestroy(() => {
      document.body.classList.remove('visual-test')
    })
  }
</script>

<slot></slot>
