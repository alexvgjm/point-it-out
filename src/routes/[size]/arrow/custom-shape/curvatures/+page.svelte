<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  const goldenPath = 'M 0 48 Q 32 39 64 0 Q 64 17 64 32 Q 96 52 128 32 Q 108 48 128 64 Q 96 44 64 64 Q 64 79 64 96 Q 32 57 0 48 Z'
  const vbW = 128 
  const vbH = 96 
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
    transform-origin: 0px 48px; 
    transform: translateY(-50%) rotate(45deg);
  }
  path { fill: orange; stroke: none; }
</style>