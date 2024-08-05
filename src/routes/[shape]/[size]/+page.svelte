<script lang="ts">
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div
  class="test-box test-box--{data.w}x{data.h}"
  style="width: {data.w}px; height: {data.h}px"
></div>
