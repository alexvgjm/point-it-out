<script lang="ts">
    import type { PageData } from './$types'
    export let data: PageData
</script>

<div
    class="test-box test-box--{data.w}x{data.h}"
    style="width: {data.w}px; height: {data.h}px; position: relative; background: #1a1a1a;"
>
    <div id="origin-box" class="anchor" style="top: 50px; left: 50px;"></div>
    <div id="target-box" class="anchor" style="top: 200px; left: 200px;"></div>
</div>

<style>
    .test-box {
        position: relative;
        margin: 0;
        padding: 0;
    }

    .anchor {
        position: absolute;
        width: 50px;
        height: 50px;
        background: #444;
    }
</style>
