<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="wrapper">
  <div
    class="test-box test-box--{data.w}x{data.h} test-box--expected"
    style="width: {data.w}px; height: {data.h}px"
  ></div>
</div>

<style>
  .wrapper {
    position: relative;
    width: 80svw;
    height: 50svh;
    overflow-y: scroll;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .test-box {
    position: absolute;
    bottom: 0;
    transform: translateY(50%);
  }

  .test-box.test-box--expected {
    border: 4px solid orange;
  }
</style>
