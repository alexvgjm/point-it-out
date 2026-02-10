<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="page-wrapper">
  <div class="overlay"></div>

  <div class="page-content">
    <p class="outside-text">This text should be darkened by the overlay</p>

    <div
      class="test-box test-box--{data.w}x{data.h} test-box--expected"
      style="width: {data.w}px; height: {data.h}px"
    >
      <p>Visible text inside spotlight</p>
    </div>

    <p class="outside-text">More text that should be darkened</p>
  </div>
</div>

<style>
  .page-wrapper {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    pointer-events: none;
    z-index: 1;
  }

  .page-content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .test-box.test-box--expected {
    background: transparent;
    border: 2px dashed orange;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 60px auto;
    position: relative;
    z-index: 3;
  }

  .test-box p {
    color: white;
    margin: 0;
    font-size: 18px;
  }

  .outside-text {
    color: rgba(255, 255, 255, 0.3);
    font-size: 16px;
    margin: 20px 0;
  }
</style>
