<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData

    const x1 = 75
    const y1 = 75
    const x2 = 225
    const y2 = 225
    const p = 2

    const minX = Math.min(x1, x2) - p
    const minY = Math.min(y1, y2) - p
    const maxX = Math.max(x1, x2) + p
    const maxY = Math.max(y1, y2) + p

    const w = maxX - minX
    const h = maxY - minY
</script>

<div
    class="test-box"
    style="width: {data.w}px; height: {data.h}px; position: relative; background: #1a1a1a;"
>
    <div class="anchor" id="origin-box"></div>
    <div class="anchor" id="target-box"></div>

    <svg
        style="position: absolute; left: {minX}px; top: {minY}px; overflow: visible;"
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
            stroke-dasharray="5 5"
            stroke-linecap="butt"
            shape-rendering="geometricPrecision"
            fill="none"
        />
    </svg>
</div>

<style>
    .anchor {
        position: absolute;
        width: 50px;
        height: 50px;
        background: #444;
    }
    #origin-box {
        top: 50px;
        left: 50px;
    }
    #target-box {
        top: 200px;
        left: 200px;
    }
</style>
