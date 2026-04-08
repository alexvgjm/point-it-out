<script lang="ts">
  import type { PageData } from './$types'
  import { onMount, onDestroy } from 'svelte'

  export let data: PageData

  onMount(async () => {
  	const pio = await import('$lib/main')
  	pio.create('spotlight', {
  		target: '#target',
  		animate: 'pulse',
  		padding: 10
  	})
  })

  onDestroy(() => {
  	import('$lib/main').then((pio) => pio.clear())
  })
</script>

<div class="page-wrapper">
  <div class="page-content">
    <p class="outside-text">Text outside target element</p>

    <div class="test-box-wrapper">
      <div class="test-box-back" style="width: {data.w + 40}px; height: {data.h + 40}px"></div>
      <div
        class="test-box test-box--{data.w}x{data.h}"
        id="target"
        style="width: {data.w}px; height: {data.h}px"
      >
        <p>Text inside target</p>
      </div>
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

  .test-box-wrapper {
    display: grid;
    place-items: center;
    position: relative;
    margin: 40px auto;
  }

  .test-box-back {
    grid-area: 1 / 1;
    background: #333;
  }

  .test-box {
    grid-area: 1 / 1;
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
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
