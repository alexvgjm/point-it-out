<script lang="ts">
  import { page } from '$app/stores'
  import { originToAngle } from '$lib/values'
  import type { PageData } from './$types'

  export let data: PageData

  const namedAngle = originToAngle[$page.params.angle as keyof typeof originToAngle]
  const angle = namedAngle ?? +$page.params.angle

  const w = 96
  const len = 128
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg
    class="expected-svg"
    xmlns="http://www.w3.org/2000/svg"
    width={len}
    height={w}
    style="--angle: {angle}deg"
  >
    <g>
      <path
        d="
      M 0, {w / 2}
      L {len / 2}, {w}
      l 0,-{w / 3}
      l {len / 2}, 0
      l 0,-{w / 3}
      l -{len / 2},0
      l 0,-{w / 3}
      Z"
      />
    </g>
  </svg>
</div>

<style>
  .expected-svg {
    --angle: 45deg;
    position: absolute;
    transform-origin: center left;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) rotate(var(--angle));
  }

  path {
    fill: orange;
    stroke: none;
  }
</style>
