<script lang="ts">
  export let data: { w: number, h: number } 

  const tailWidth = 4
  const tailLength = 150
  const headWidth = 30
  const headLength = 60

  const sw = 0
  const centerY = headWidth / 2
  const totalLength = tailLength + headLength
  const totalWidth = headWidth

  const d = `M ${sw} ${centerY + sw} ` + `l ${headLength} ${-headWidth / 2} ` + `l 0 ${(headWidth - tailWidth) / 2} ` + `l ${tailLength} 0 ` + `l 0 ${tailWidth} ` + `l ${-tailLength} 0 ` + `l 0 ${(headWidth - tailWidth) / 2} ` + 'Z'
</script>

<div class="test-box test-box--{data.w}x{data.h} test-box--expected" style="width: {data.w}px; height: {data.h}px">
  <svg class="expected-svg" width={totalLength} height={totalWidth}>
    <g><path {d} /></g>
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
  path { fill: orange; stroke: none; }
</style>