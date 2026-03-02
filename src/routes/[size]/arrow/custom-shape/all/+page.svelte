<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  const goldenPath = 'M 0 50 Q 35 45 120 0 Q 95 14 70 34 Q 120 59 170 34 Q 145 50 170 66 Q 120 41 70 66 Q 95 86 120 100 Q 35 55 0 50 Z'
  const vbW = 220 
  const vbH = 100 
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
    transform-origin: 0px 50px; 
    transform: translateY(-50%) rotate(45deg);
  }
  path { fill: orange; stroke: none; }
</style>