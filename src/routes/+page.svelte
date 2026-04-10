<script>
  import { resolve } from '$app/paths'
  import { sizeNameToNumber } from '$lib/values'
</script>

<h2>Test pages</h2>
<ul class="test-pages-links">
  <li><a href={resolve('/300x300')}><span class="size">300x300</span></a></li>
  <li><a href={resolve('/400x250')}><span class="size">400x250</span></a></li>
  <li>
    <a href={resolve('/300x300/free')}><span class="size">300x300 with image</span></a>
  </li>
  <li>
    <a href={resolve('/400x250/free')}><span class="size">400x250 with image</span></a>
  </li>
  <li>
    <a href={resolve('/300x300/spotlight-base')}><span class="size">300x300 spotlight</span></a>
  </li>
  <li>
    <a href={resolve('/400x250/spotlight-base')}><span class="size">400x250 spotlight</span></a>
  </li>
</ul>

<section class="expected-index">
  <h2>Expected</h2>
  
  <div class="category">
    <h3>create('rect', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/rect/default')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/default')}><span class="size">400x250</span></a>
        defaults
      </li>
      <li>
        <a href={resolve('/300x300/rect/padding-option')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/padding-option')}><span class="size">400x250</span></a>
        padding option
      </li>
      <li>
        <a href={resolve('/300x300/rect/scroll/container-option')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/scroll/container-option')}><span class="size">400x250</span></a>
        scroll/container option
      </li>
      <li>
        <a href={resolve('/300x300/rect/stroke-width-color-options')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/stroke-width-color-options')}><span class="size">400x250</span></a>
        strokeWidth & color options
      </li>
      <li>
        <a href={resolve('/300x300/rect/round-option/pixels')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/round-option/pixels')}><span class="size">400x250</span></a>
        round option (pixels)
      </li>
    </ul>
  </div>

  <div class="category category--arrow">
    <h3>create('arrow', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/arrow/default')}><span class="size">300x300</span></a>
        defaults
      </li>
      <li>
        {#each [90, 120, 180, 328] as angle (angle)}
          <a href={resolve(`/300x300/free/from-option/${angle}`)}><span class="size">{angle}º</span></a>
        {/each}
        fromAngle
      </li>
      <li>
        {#each Object.keys(sizeNameToNumber) as sizeName (sizeName)}
          <a href={resolve(`/300x300/arrow/size-option/${sizeName}`)}><span class="size">{sizeName}</span></a>
        {/each}
        size option
      </li>
      <li>
        <ul>shape option:
          <li><a href={resolve('/300x300/arrow/custom-shape/all')}><span class="size">All options</span></a></li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('free', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/free/default')}><span class="size">300x300</span></a>
        defaults
      </li>
      <li>
        <a href={resolve('/300x300/free/distance-option')}><span class="size">300x300</span></a>
        distance option
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('spotlight', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/spotlight/default')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight/default')}><span class="size">400x250</span></a>
        defaults
      </li>
      <li>
        <a href={resolve('/300x300/spotlight/overlay-color-option')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight/overlay-color-option')}><span class="size">400x250</span></a>
        overlayColor
      </li>
      <li>
        <a href={resolve('/300x300/spotlight/padding-option')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight/padding-option')}><span class="size">400x250</span></a>
        padding
      </li>
      <li>
        <a href={resolve('/300x300/spotlight-pulse')}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight-pulse')}><span class="size">400x250</span></a>
        pulse animation
      </li>
    </ul>
  </div>
</section>

<style>
  .expected-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border: 1px solid #444a;
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    max-width: 800px;
    position: relative;
  }

  .expected-index h2 {
    position: absolute;
    left: -1em;
    top: -1em;
    border: 1px solid #444a;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background: #121212; /* Ajustar segun tu variable --color-bg */
  }

  .category { margin: 1rem; }
  .category--arrow { grid-row: 1 / 3; grid-column: 2; }

  ul { list-style: none; padding: 0; }
  ul li { margin-top: 0.4rem; display: flex; align-items: center; flex-wrap: wrap; }
  
  .size {
    font-size: 0.75rem;
    background: #10354f;
    padding: 0.1rem 0.4rem;
    border-radius: 0.3rem;
    margin-right: 0.3rem;
    white-space: nowrap;
  }

  .test-pages-links { display: flex; justify-content: center; margin-bottom: 2rem; }
  .test-pages-links li { margin: 0.5rem; }
  
  a { color: whitesmoke; text-decoration: none; }
  a:hover { text-decoration: underline; }

  :global(body) { min-height: 110vh; }
</style>