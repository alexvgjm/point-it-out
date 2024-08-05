<script lang="ts">
  import { page } from '$app/stores'
</script>

<section class="doc-section">
  {#if $page.status == 404}
    <h1 id="examples">404 - Not found (yet)</h1>
    <p>Docs are currently under construction. Will be completed in a few days.</p>
  {:else}
    <h1 id="examples">Oops! - {$page.status} - {$page.error?.message}</h1>
  {/if}
</section>
