<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg" width={data.w + 16} height={data.h + 16}>
    <rect x="4" y="4" width={data.w + 8} height={data.h + 8}></rect>
  </svg>
</div>

<style>
  .expected-svg {
    z-index: 9999;
    position: absolute;
    stroke: limegreen;
    stroke-width: 8px;
    fill: none;
    pointer-events: none;
    left: -8px;
    top: -8px;
  }
  .test-box.test-box--expected {
    position: relative;
  }
</style>
