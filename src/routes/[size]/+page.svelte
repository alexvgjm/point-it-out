<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="page-wrapper">
  <div class="page-content">
    <p class="outside-text">Text outside target element</p>

    <div class="test-box test-box--{data.w}x{data.h}" style="width: {data.w}px; height: {data.h}px">
      <p>Text inside target</p>
    </div>

    <p class="outside-text">More text outside</p>
  </div>
</div>

<style>
  .page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .page-content {
    text-align: center;
  }

  .test-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
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
