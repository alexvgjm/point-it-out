<script lang="ts">
  import type { PageData } from './$types'

  import swordPointer from '$assets/left_sword_200x100.svg'

  let { data }: { data: PageData } = $props()
  let p1: HTMLElement = $state()!

  // DIST: 80
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <img src={swordPointer} bind:this={p1} class="pointer-img" alt="Sword pointer" />
</div>

<style>
  .pointer-img {
    width: 200px;
    position: absolute;
    top: calc(50%);
    left: calc(50%);
    transform-origin: center right;
    transform: translate(-100%, -50%) rotate(-135deg);
    translate: 56.6px 56.6px;
  }
</style>
