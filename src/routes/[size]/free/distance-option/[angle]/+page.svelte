<script lang="ts">
  import { page } from '$app/stores'
  import type { PageData } from './$types'
  import swordPointer from '$assets/left_sword_200x100.svg'
  import { degsToRads } from '$lib/pointers'

  let { data }: { data: PageData } = $props()

  const degs = $page.params.angle!
  let p1: HTMLElement = $state()!

  const dx = Math.cos(degsToRads(+degs)) * 80
  const dy = Math.sin(degsToRads(+degs)) * 80
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <img
    src={swordPointer}
    bind:this={p1}
    class="pointer-img"
    alt="Sword pointer"
    style="--angle: {degs}deg; --dx: {dx}px; --dy: {dy}px;"
  />
</div>

<style>
  .pointer-img {
    width: 200px;
    position: absolute;
    top: calc(50%);
    left: calc(50%);
    transform-origin: center left;
    transform: translateY(-50%) rotate(var(--angle));
    translate: var(--dx) var(--dy);
  }
</style>
