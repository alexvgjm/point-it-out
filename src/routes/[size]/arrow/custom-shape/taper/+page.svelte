<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  // Test Config 
  const tw = 32, tl = 64, hw = 96, hl = 64, tp = 12, bc = 0, tc = 0, hc = 0

  const sw = 0
  const r = sw / 2
  const y = hw / 2
  
  const x = r
  const v = y + r 
  const n = hl + r
  const m = (hw - tw) / 2 + r
  const k = m + tw
  const h = hl + tp + r
  const e = hl + tl + r

  const f = (c: number, x1: number, y1: number, x2: number, y2: number) => 
  	c === 0 ? `L ${x2} ${y2}` : `Q ${x1} ${y1} ${x2} ${y2}`

  const d = [
  	`M ${x} ${v}`,
  	f(hc, x + hl / 2, v - hw / 4 + hc, h, r),
  	f(hc, h - tp / 2, m - hc, n, m),
  	f(tc, n + tl / 2, m + tc, e, m),
  	f(bc, e - bc, v, e, k),
  	f(tc, n + tl / 2, k - tc, n, k),
  	f(hc, h - tp / 2, k + hc, h, hw + r),
  	f(hc, x + hl / 2, v + hw / 4 - hc, x, v),
  	'Z'
  ].join(' ')

  const totalLen = hl + tl + tp + Math.abs(bc) + sw
  const totalW = hw + sw 
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg 
    class="expected-svg" 
    xmlns="http://www.w3.org/2000/svg" 
    width={totalLen} 
    height={totalW}
    style="overflow: visible;" 
  >
    <g><path {d} /></g>
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
  path { fill: orange; stroke: none; }
</style>