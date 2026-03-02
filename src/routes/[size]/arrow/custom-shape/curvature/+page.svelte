<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  const tw = 32,
  	tl = 64,
  	hw = 96,
  	hl = 64,
  	tp = 0,
  	bc = 20,
  	tc = 20,
  	hc = 15

  const sw = 0
  const r = sw / 2
  const maxW = 96

  const v = maxW / 2 + r
  const x = r
  const n = hl + r
  const h = hl + tp + r
  const e = hl + tl + r

  const m = v - tw / 2
  const k = v + tw / 2
  const yTop = v - hw / 2
  const yBottom = v + hw / 2

  const f = (c: number, x1: number, y1: number, x2: number, y2: number) =>
  	c === 0 ? `L ${x2} ${y2}` : `Q ${x1} ${y1} ${x2} ${y2}`

  /**
   * FIX DE CURVATURA:
   * Para recuperar la agresividad, el punto de control Y debe calcularse
   * respecto al cuarto del ancho de la cabeza (v - hw / 4).
   */
  const d = [
  	`M ${x} ${v}`,
  	// Curva superior: usamos v - hw / 4
  	f(hc, x + hl / 2, v - hw / 4 + hc, h, yTop),
  	f(hc, h - tp / 2, m - hc, n, m),
  	f(tc, n + tl / 2, m + tc, e, m),
  	f(bc, e - bc, v, e, k),
  	f(tc, n + tl / 2, k - tc, n, k),
  	f(hc, h - tp / 2, k + hc, h, yBottom),
  	// Curva inferior: usamos v + hw / 4
  	f(hc, x + hl / 2, v + hw / 4 - hc, x, v),
  	'Z',
  ].join(' ')

  const totalLen = 128
  const totalW = 96
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
  >
    <g>
      <path {d} />
    </g>
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
