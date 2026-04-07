<script lang="ts">
  import type { PageData } from './$types'
  import { onMount } from 'svelte'

  export let data: PageData

  // Expose pio library globally for console testing
  declare global {
    interface Window {
      pio?: typeof import('$lib/main')
    }
  }

  onMount(async () => {
    const pio = await import('$lib/main')
    window.pio = pio
  })
</script>

<div class="page-wrapper">
  <div class="page-content">
    <p class="outside-text">Text outside target element</p>

    <div class="test-box test-box--{data.w}x{data.h}" style="width: {data.w}px; height: {data.h}px">
      <p>Text inside target</p>
    </div>

    <p class="outside-text">More text outside</p>
  </div>
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .page-content {
    text-align: center;
  }

  .test-box {
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
  }

  .test-box p {
    color: white;
    margin: 0;
    font-size: 18px;
  }

  .outside-text {
    color: white;
    font-size: 16px;
    margin: 20px 0;
  }
</style>
