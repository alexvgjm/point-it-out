<script lang="ts">
  import type { PageData } from './$types'

  import swordPointer from '$assets/left_sword_200x100.svg'

  let { data }: { data: PageData } = $props()
  let p1: HTMLElement = $state()!
</script>

<img src={swordPointer} bind:this={p1} class="pointer-img" alt="Sword pointer" />

<div
  class="test-box test-box--{data.w}x{data.h}"
  style="width: {data.w}px; height: {data.h}px"
></div>

<style>
  .test-box {
    z-index: -1;
  }
</style>
