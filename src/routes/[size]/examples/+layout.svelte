<script lang="ts">
  import '$src/examples-styles.css'
  import type { Snippet } from 'svelte'
  import type { LayoutData } from './$types'

  let { children }: { data: LayoutData; children: Snippet } = $props()
</script>

{@render children()}
