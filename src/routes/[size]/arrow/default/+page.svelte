<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  const w = 96
  const len = 128
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg" xmlns="http://www.w3.org/2000/svg" width={len} height={w}>
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
    position: absolute;
    transform-origin: center left;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  path {
    fill: orange;
    stroke: none;
  }
</style>
