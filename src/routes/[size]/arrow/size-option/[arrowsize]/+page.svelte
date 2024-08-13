<script lang="ts">
  import type { PageData } from './$types'
  import { page } from '$app/stores'

  export let data: PageData

  const namedSizes = {
    xs: 0.5,
    sm: 0.7,
    md: 1,
    lg: 1.25,
    xl: 2,
    xxl: 3
  }
  const w = 96
  const len = 128

  const namedSize = namedSizes[$page.params.arrowsize as keyof typeof namedSizes]
  const size = namedSize ?? +$page.params.arrowsize
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px;"
>
  <svg
    class="expected-svg"
    xmlns="http://www.w3.org/2000/svg"
    width={len}
    height={w}
    style="--size: {size};"
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
    --size: 1;
    position: absolute;
    transform-origin: center left;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) rotate(45deg) scale(var(--size));
  }

  path {
    fill: orange;
    stroke: none;
  }
</style>
