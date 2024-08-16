<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData

  /**
   * THIS IS THE TEST SCENARIO WHERE TO EXECUTE THE create('arrow', {...})
   * WITH THE RESPONSIVE OPTION. DO NOT ALTER IT.
   */
</script>

<div class="limited-container">
  <div
    class="test-box test-box--{data.w}x{data.h} test-box--expected"
    style="width: {data.w}px; height: {data.h}px; min-width: {data.w}px; min-height: {data.h}px"
  ></div>
</div>

<style>
  .test-box {
    position: relative;
    overflow-x: visible;
    z-index: -1;
  }

  .limited-container {
    width: 250px;
    border-left: 1px solid var(--color-third);
    border-right: 1px solid var(--color-third);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: absolute;
    top: 0;
    overflow-x: visible;
  }
</style>
