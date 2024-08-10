<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  const w = 96
  const len = 128
  const showShadow = false
  const shadow = 4
</script>

<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
>
  <svg class="expected-svg" xmlns="http://www.w3.org/2000/svg" width={len} height={w}>
    <defs>
      <filter id="shadow" height="150%" width="150%" y="-25%" x="-25%">
        <feDropShadow dx="0" dy="0" stdDeviation={shadow} />
      </filter>
    </defs>

    <g>
      <path
        d="
      M 0, {w / 2}
      L {len / 2}, {w}
      l 0,-{w / 3}
      l {len / 2}, 0
      l 0,-{w / 3}
      l -{len / 2},0
      l 0,-{w / 3}
      Z"
        style={showShadow ? 'filter:url(#shadow)' : ''}
      />
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
    /* animation: 3s orbit infinite linear; */
  }

  @keyframes orbit {
    0% {
      transform: translate(100%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(100%, -50%) rotate(360deg);
    }
  }

  path {
    fill: orange;
    stroke: none;
  }
</style>
