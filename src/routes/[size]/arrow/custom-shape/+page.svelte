<script lang="ts">
  import type { PageData } from './$types'
  export let data: PageData

  const tailWidth = 4
  const tailLength = 150
  const headWidth = 30
  const headLength = 60

  const strokeWidth = 0
  const svgW = tailLength + headLength + strokeWidth
  const svgH = Math.max(tailWidth, headWidth) + strokeWidth

  const sw = strokeWidth / 2
  const centerY = headWidth / 2

  const d =
    `M ${sw} ${centerY + sw} ` +
    `l ${headLength} ${-headWidth / 2} ` +
    `l 0 ${(headWidth - tailWidth) / 2} ` +
    `l ${tailLength} 0 ` +
    `l 0 ${tailWidth} ` +
    `l ${-tailLength} 0 ` +
    `l 0 ${(headWidth - tailWidth) / 2} ` +
    `Z`
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg" width={svgW} height={svgH}>
    <g>
      <path {d} />
    </g>
  </svg>
</div>

<style>
  .expected-svg {
    position: absolute;
    transform-origin: left center;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) rotate(45deg);
  }

  path {
    fill: orange;
    stroke: none;
  }
</style>
