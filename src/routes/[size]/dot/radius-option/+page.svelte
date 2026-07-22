<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg expected-dot" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
    <circle cx="30" cy="30" r="26" />
  </svg>
</div>

<style>
  .expected-dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke: darkorange;
    fill: orange;
    stroke-width: 4px;
  }
</style>