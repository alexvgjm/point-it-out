<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg expected-dot-1" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="14" cy="14" r="10" />
  </svg>
  
  <svg class="expected-svg expected-dot-2" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="14" cy="14" r="10" />
  </svg>
  
  <svg class="expected-svg expected-dot-3" xmlns="http://www.w3.org/2000/svg" width="28" height="28">
    <circle cx="14" cy="14" r="10" />
  </svg>
</div>

<style>
  .expected-dot-1 {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -50%);
    stroke: darkorange;
    fill: orange;
    stroke-width: 4px;
  }
  .expected-dot-2 {
    position: absolute;
    top: 25%;
    left: 25%;
    transform: translate(-50%, -50%);
    stroke: darkorange;
    fill: orange;
    stroke-width: 4px;
  }
  .expected-dot-3 {
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translate(-50%, -50%);
    stroke: darkorange;
    fill: orange;
    stroke-width: 4px;
  }
</style>