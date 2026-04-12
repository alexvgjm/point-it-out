<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData

    const x1 = 75,
    	y1 = 75
    const x2 = 225,
    	y2 = 225
    const p = 2

    const minX = Math.floor(Math.min(x1, x2) - p)
    const minY = Math.floor(Math.min(y1, y2) - p)
    const w = Math.ceil(Math.max(x1, x2) + p) - minX
    const h = Math.ceil(Math.max(y1, y2) + p) - minY
</script>

<div
    class="test-box test-box--{data.w}x{data.h}"
    style="width: {data.w}px; height: {data.h}px; position: relative; background: #1a1a1a;"
>
    <div class="anchor" id="origin-box" style="top: 50px; left: 50px;"></div>
    <div class="anchor" id="target-box" style="top: 200px; left: 200px;"></div>

    <svg
        style="position: absolute; left: {minX}px; top: {minY}px; overflow: visible; pointer-events: none;"
        width={w}
        height={h}
        viewBox="0 0 {w} {h}"
    >
        <line
            x1={x1 - minX}
            y1={y1 - minY}
            x2={x2 - minX}
            y2={y2 - minY}
            stroke="#ffa500"
            stroke-width="2"
            stroke-linecap="butt"
            shape-rendering="geometricPrecision"
            fill="none"
        />
    </svg>
</div>

<style>
    .test-box {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .anchor {
        position: absolute;
        width: 50px;
        height: 50px;
        background: #444;
        box-sizing: border-box;
    }
</style>
