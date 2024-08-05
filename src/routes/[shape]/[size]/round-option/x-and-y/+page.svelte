<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg" width={data.w + 8} height={data.h + 8}>
    <rect x="2" y="2" width={data.w + 4} height={data.h + 4} rx="128" ry="64"></rect>
  </svg>
</div>

<style>
  .expected-svg {
    z-index: 9999;
    position: absolute;
    stroke: orange;
    fill: none;
    pointer-events: none;
    stroke-width: 4px;
    left: -4px;
    top: -4px;
  }
  .test-box.test-box--expected {
    position: relative;
  }
</style>
