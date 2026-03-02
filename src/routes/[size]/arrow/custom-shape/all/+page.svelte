<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  // Test Config
  const tw = 32,
  	tl = 100,
  	hw = 100,
  	hl = 70,
  	tp = 50,
  	bc = 25,
  	tc = 25,
  	hc = 20

  const sw = 0
  const r = sw / 2

  // --- CAMBIO CLAVE: Usar el máximo para el centro ---
  const maxW = Math.max(tw, hw)
  const v = maxW / 2 + r

  const x = r
  const n = hl + r
  const h = hl + tp + r
  const e = hl + tl + r

  // Ajustamos m y k para que sean relativos al nuevo centro v
  const m = v - tw / 2
  const k = v + tw / 2

  // Puntos de destino de la cabeza (arriba y abajo)
  const yTop = v - hw / 2
  const yBottom = v + hw / 2

  const f = (c: number, x1: number, y1: number, x2: number, y2: number) =>
  	c === 0 ? `L ${x2} ${y2}` : `Q ${x1} ${y1} ${x2} ${y2}`

  const d = [
  	`M ${x} ${v}`,
  	f(hc, x + hl / 2, v - hw / 4 + hc, h, yTop), // yTop en lugar de r
  	f(hc, h - tp / 2, m - hc, n, m),
  	f(tc, n + tl / 2, m + tc, e, m),
  	f(bc, e - bc, v, e, k),
  	f(tc, n + tl / 2, k - tc, n, k),
  	f(hc, h - tp / 2, k + hc, h, yBottom), // yBottom en lugar de hw + r
  	f(hc, x + hl / 2, v + hw / 4 - hc, x, v),
  	'Z',
  ].join(' ')

  const totalLen = hl + tl + tp + Math.abs(bc) + sw
  const totalW = maxW + sw // Usamos maxW aquí también
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
  path {
    fill: orange;
    stroke: none;
  }
</style>
