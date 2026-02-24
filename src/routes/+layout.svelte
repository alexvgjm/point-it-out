<script lang="ts">
  import '$src/test-styles.css'
  import '$src/style.css'

  import * as pio from '$lib/main'
  import { browser } from '$app/environment'
  import { onDestroy, onMount } from 'svelte'
  import { page } from '$app/state'

  if (browser) {
    ;(window as unknown as { pio: typeof pio }).pio = pio

    onMount(() => {
      if (page.url.href.includes('/examples/')) {
        return
      }
      document.body.classList.add('visual-test')
    })

    onDestroy(() => {
      if (page.url.href.includes('/examples/')) {
        return
      }
      document.body.classList.remove('visual-test')
    })
  }
</script>

<slot></slot>
