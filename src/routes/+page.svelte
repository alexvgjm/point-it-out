<script>
  import { sizeNameToNumber } from '$lib/values'
</script>

<h2>Test pages</h2>
<ul class="test-pages-links">
  <li><a href="/300x300"><span class="size">300x300</span></a></li>
  <li><a href="/400x250"><span class="size">400x250</span></a></li>
  <li><a href="/300x300/free"><span class="size">300x300 with image</span></a></li>
  <li><a href="/400x250/free"><span class="size">400x250 with image</span></a></li>
</ul>

<section class="expected-index">
  <h2>Expected</h2>
  <div class="category">
    <h3>create('rect', {'{...}'})</h3>
    <ul>
      <li>
        <a href="/300x300/rect/default"><span class="size">300x300</span></a>
        <a href="/400x250/rect/default"><span class="size">400x250</span></a>
        defaults
      </li>

      <li>
        <a href="/300x300/rect/padding-option"><span class="size">300x300</span></a>
        <a href="/400x250/rect/padding-option"><span class="size">400x250</span></a>
        padding option
      </li>

      <li>
        <a href="/300x300/rect/scroll/container-option"><span class="size">300x300</span></a>
        <a href="/400x250/rect/scroll/container-option"><span class="size">400x250</span></a>
        scroll/container option
      </li>

      <li>
        <a href="/300x300/rect/stroke-width-color-options"><span class="size">300x300</span></a>
        <a href="/400x250/rect/stroke-width-color-options"><span class="size">400x250</span></a>
        strokeWidth & color options
      </li>

      <li>
        <a href="/300x300/rect/round-option/pixels"><span class="size">300x300</span></a>
        <a href="/400x250/rect/round-option/pixels"><span class="size">400x250</span></a>
        round option (pixels)
      </li>
      <li>
        <a href="/300x300/rect/round-option/percent"><span class="size">300x300</span></a>
        <a href="/400x250/rect/round-option/percent"><span class="size">400x250</span></a>
        round option (percent)
      </li>
      <li>
        <a href="/300x300/rect/round-option/x-and-y"><span class="size">300x300</span></a>
        <a href="/400x250/rect/round-option/x-and-y"><span class="size">400x250</span></a>
        round option (different axis)
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('arrow', {'{...}'})</h3>
    <ul>
      <li>
        <a href="/300x300/arrow/default"><span class="size">300x300</span></a>
        defaults
      </li>
      <li>
        <a href="/300x300/arrow/from-option/90"><span class="size">90º</span></a>
        <a href="/300x300/arrow/from-option/120"><span class="size">120º</span></a>
        <a href="/300x300/arrow/from-option/180"><span class="size">180º</span></a>
        <a href="/300x300/arrow/from-option/328"><span class="size">328º</span></a>
        <a href="/300x300/arrow/from-option/top-left"><span class="size">top-left</span></a>
        fromAngle
      </li>

      <li>
        <a href="/300x300/arrow/stroke-fill-strokewidth-options/only-strokewidth">
          <span class="size">300x300</span>
        </a>
        strokeWidth only
      </li>

      <li>
        <a href="/300x300/arrow/stroke-fill-strokewidth-options">
          <span class="size">300x300</span>
        </a>
        strokeWidth, strokeColor & fillColor options
      </li>

      <li>
        {#each Object.keys(sizeNameToNumber) as sizeName}
          <a href="/300x300/arrow/size-option/{sizeName}">
            <span class="size">{sizeName}</span>
          </a>
        {/each}
        <a href="/300x300/arrow/size-option/1.33">
          <span class="size">1.33</span>
        </a>
        size option
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('free', {'{...}'})</h3>
    <ul>
      <li>
        <a href="/300x300/free/default"><span class="size">300x300</span></a>
        defaults
      </li>

      <li>
        <a href="/300x300/free/distance-option">
          <span class="size">300x300</span>
        </a>
        distance option
      </li>

      <li>
        <a href="/300x300/free/transform-origin-option">
          <span class="size">300x300</span>
        </a>
        <a href="/400x250/free/transform-origin-option">
          <span class="size">400x250</span>
        </a>
        transformOrigin option
      </li>
    </ul>
  </div>
</section>
