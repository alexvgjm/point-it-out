<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="overlay"></div>

<div class="page-wrapper">
  <div class="page-content">
    <p class="outside-text">Text outside target element</p>

    <div class="test-box-wrapper">
      <div class="test-box-back" style="width: {data.w + 40}px; height: {data.h + 40}px"></div>
      <div class="fake-hole" style="width: {data.w + 20}px; height: {data.h + 20}px"></div>
      <div class="test-box test-box--{data.w}x{data.h}" style="width: {data.w}px; height: {data.h}px">
        <p>Text inside target</p>
      </div>
    </div>

    <p class="outside-text">More text outside</p>
  </div>
</div>

<style>
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

  .page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .page-content {
    text-align: center;
  }

  .test-box-wrapper {
    display: grid;
    place-items: center;
    position: relative;
    margin: 40px auto;
  }

  .test-box-back {
    grid-area: 1 / 1;
    background: #333;
  }

  .fake-hole {
    grid-area: 1 / 1;
    background: #333;
    position: relative;
    z-index: 2;
  }

  .test-box {
    grid-area: 1 / 1;
    position: relative;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0;
  }

  .test-box p {
    color: white;
    margin: 0;
    font-size: 18px;
  }

  .outside-text {
    color: white;
    font-size: 16px;
    margin: 20px 0;
  }
</style>
