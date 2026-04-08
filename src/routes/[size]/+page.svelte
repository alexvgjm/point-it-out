<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="page-wrapper">
  <div class="test-box test-box--{data.w}x{data.h}" id="target" style="width: {data.w}px; height: {data.h}px">
  </div>
</div>

<style>
  .page-wrapper {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
  }

  .test-box {
    background: #333;
    margin: 0;
  }
</style>
