<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<section>
  <div
    class="test-box test-box--{data.w}x{data.h}"
    style="width: {data.w}px; height: {data.h}px"
  ></div>
</section>

<style>
  .test-box {
    position: static;
    margin-left: 30px;
  }

  section {
    margin-right: 12px;
  }

  :global(body.visual-test) {
    display: block;
  }
</style>
