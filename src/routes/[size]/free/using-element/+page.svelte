<script lang="ts">
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
</script>

<div class="pointer-element">Use me as pointer!</div>
<div
  class="test-box test-box--{data.w}x{data.h} test-box--expected"
  style="width: {data.w}px; height: {data.h}px"
></div>

<style>
  .pointer-element {
    width: 200px;
    border-left: 0.2rem solid orange;
    padding-left: 0.2rem;
  }
</style>
