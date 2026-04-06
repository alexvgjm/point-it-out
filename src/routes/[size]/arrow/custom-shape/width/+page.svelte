<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  const goldenPath = 'M 0 20 L 64 0 L 64 12.5 L 128 12.5 L 128 27.5 L 64 27.5 L 64 40 L 0 20 Z'
  const vbW = 128 
  const vbH = 40 
</script>

<div class="test-box test-box--{data.w}x{data.h} test-box--expected" style="width: {data.w}px; height: {data.h}px">
  <svg class="expected-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vbW} {vbH}" style="width: {vbW}px; height: {vbH}px;">
    <path d={goldenPath} />
  </svg>
</div>

<style>
  .expected-svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform-origin: 0px 20px; 
    transform: translateY(-50%) rotate(45deg);
  }
  path { fill: orange; stroke: none; }
</style>