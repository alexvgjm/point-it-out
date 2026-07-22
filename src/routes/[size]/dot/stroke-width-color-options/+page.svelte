<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg expected-dot" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
    <circle cx="18" cy="18" r="10" />
  </svg>
</div>

<style>
  .expected-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke: darkgreen;
    fill: limegreen;
    stroke-width: 8px;
  }
</style>