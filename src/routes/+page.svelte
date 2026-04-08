<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  /* eslint-disable svelte/no-navigation-without-resolve */
  import { resolve as _resolve } from '$app/paths'
  const resolve = (path: string) => _resolve(path as any)
  import { sizeNameToNumber } from '$lib/values'
</script>

<h2>Test pages</h2>
<ul class="test-pages-links">
  <li><a href={resolve('/300x300' as string)}><span class="size">300x300</span></a></li>
  <li><a href={resolve('/400x250' as string)}><span class="size">400x250</span></a></li>
  <li>
    <a href={resolve('/300x300/free' as string)}><span class="size">300x300 with image</span></a>
  </li>
  <li>
    <a href={resolve('/400x250/free' as string)}><span class="size">400x250 with image</span></a>
  </li>
  <li>
    <a href={resolve('/300x300/spotlight-base' as string)}><span class="size">300x300 spotlight</span></a>
  </li>
  <li>
    <a href={resolve('/400x250/spotlight-base' as string)}><span class="size">400x250 spotlight</span></a>
  </li>
</ul>

<section class="expected-index">
  <h2>Expected</h2>
  <div class="category">
    <h3>create('rect', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/rect/default' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/default' as string)}><span class="size">400x250</span></a>
        defaults
      </li>

      <li>
        <a href={resolve('/300x300/rect/padding-option' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/padding-option' as string)}><span class="size">400x250</span></a>
        padding option
      </li>

      <li>
        <a href={resolve('/300x300/rect/scroll/container-option' as string)}
          ><span class="size">300x300</span></a
        >
        <a href={resolve('/400x250/rect/scroll/container-option' as string)}
          ><span class="size">400x250</span></a
        >
        scroll/container option
      </li>

      <li>
        <a href={resolve('/300x300/rect/stroke-width-color-options' as string)}
          ><span class="size">300x300</span></a
        >
        <a href={resolve('/400x250/rect/stroke-width-color-options' as string)}
          ><span class="size">400x250</span></a
        >
        strokeWidth & color options
      </li>

      <li>
        <a href={resolve('/300x300/rect/round-option/pixels' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/rect/round-option/pixels' as string)}><span class="size">400x250</span></a>
        round option (pixels)
      </li>
      <li>
        <a href={resolve('/300x300/rect/round-option/percent' as string)}><span class="size">300x300</span></a
        >
        <a href={resolve('/400x250/rect/round-option/percent' as string)}><span class="size">400x250</span></a
        >
        round option (percent)
      </li>
      <li>
        <a href={resolve('/300x300/rect/round-option/x-and-y' as string)}><span class="size">300x300</span></a
        >
        <a href={resolve('/400x250/rect/round-option/x-and-y' as string)}><span class="size">400x250</span></a
        >
        round option (different axis)
      </li>
    </ul>
  </div>

  <div class="category category--arrow">
    <h3>create('arrow', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/arrow/default' as string)}><span class="size">300x300</span></a>
        defaults
      </li>
      <li>
        <a href={resolve('/300x300/free/from-option/90' as string)}><span class="size">90º</span></a>
        <a href={resolve('/300x300/free/from-option/120' as string)}><span class="size">120º</span></a>
        <a href={resolve('/300x300/free/from-option/180' as string)}><span class="size">180º</span></a>
        <a href={resolve('/300x300/free/from-option/328' as string)}><span class="size">328º</span></a>
        <a href={resolve('/300x300/free/from-option/top-left' as string)}
          ><span class="size">top-left</span></a
        >
        fromAngle
      </li>

      <li>
        <a href={resolve('/300x300/arrow/stroke-fill-strokewidth-options/only-strokewidth' as string)}>
          <span class="size">300x300</span>
        </a>
        strokeWidth only
      </li>

      <li>
        <a href={resolve('/300x300/arrow/stroke-fill-strokewidth-options' as string)}>
          <span class="size">300x300</span>
        </a>
        strokeWidth, strokeColor & fillColor options
      </li>

      <li>
        {#each Object.keys(sizeNameToNumber) as sizeName (sizeName)}
          <a href={resolve(`/300x300/arrow/size-option/${sizeName}` as string)}>
            <span class="size">{sizeName}</span>
          </a>
        {/each}
        <a href={resolve('/300x300/arrow/size-option/1.33' as string)}>
          <span class="size">1.33</span>
        </a>
        size option
      </li>

      <li>
        <ul>
          shape option:
          <li>
            <a href={resolve('/300x300/arrow/custom-shape/curvatures' as string)}>
              <span class="size">baseCurvature | tailCurvature | headCurvature</span>
            </a>
          </li>

          <li>
            <a href={resolve('/300x300/arrow/custom-shape/length' as string)}>
              <span class="size">tailLength & headLength</span>
            </a>
          </li>
          <li>
            <a href={resolve('/300x300/arrow/custom-shape/tip-taper' as string)}>
              <span class="size">tipTaper</span>
            </a>
          </li>
          <li>
            <a href={resolve('/300x300/arrow/custom-shape/width' as string)}>
              <span class="size">tailWidth & headWidth</span>
            </a>
          </li>

          <li>
            <a href={resolve('/300x300/arrow/custom-shape/all' as string)}>
              <span class="size">All options</span>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('free', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/free/default' as string)}><span class="size">300x300</span></a>
        defaults
      </li>

      <li>
        <a href={resolve('/300x300/free/distance-option' as string)}>
          <span class="size">300x300</span>
        </a>
        distance option
      </li>

      <li>
        <a href={resolve('/300x300/free/transform-origin-option' as string)}>
          <span class="size">300x300</span>
        </a>
        <a href={resolve('/400x250/free/transform-origin-option' as string)}>
          <span class="size">400x250</span>
        </a>
        transformOrigin option
      </li>
    </ul>
  </div>

  <div class="category">
    <h3>create('spotlight', {'{...}'})</h3>
    <ul>
      <li>
        <a href={resolve('/300x300/spotlight/default' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight/default' as string)}><span class="size">400x250</span></a>
        defaults
      </li>

      <li>
        <a href={resolve('/300x300/spotlight/overlay-color-option' as string)}
          ><span class="size">300x300</span></a
        >
        <a href={resolve('/400x250/spotlight/overlay-color-option' as string)}
          ><span class="size">400x250</span></a
        >
        overlayColor option
      </li>

      <li>
        <a href={resolve('/300x300/spotlight/padding-option' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight/padding-option' as string)}><span class="size">400x250</span></a>
        padding option
      </li>

      <li>
        <a href={resolve('/300x300/spotlight-pulse' as string)}><span class="size">300x300</span></a>
        <a href={resolve('/400x250/spotlight-pulse' as string)}><span class="size">400x250</span></a>
        pulse animation
      </li>
    </ul>
  </div>
</section>

<style>
  ul ul {
    margin-top: 1rem;
  }
  ul ul li {
    padding-left: 1rem;
  }

  .category--arrow {
    grid-row: 1 / 3;
    grid-column: 2;
  }

  .expected-index {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0;
    flex-wrap: wrap;
    border: 1px solid #444a;
    border-radius: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    width: 100%;
    max-width: 800px;
    position: relative;
  }

  ul {
    list-style: none;
  }

  ul li {
    margin-top: 0.2rem;
    display: flex;
  }

  h2 {
    margin: 0;
  }
  .expected-index h2 {
    margin: 0;
    position: absolute;
    left: -1em;
    top: -1em;
    border: 1px solid #444a;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    background: var(--color-bg);
  }

  .expected-index h3 {
    margin-top: 0;
    text-align: center;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-font-highlight);
  }

  .size {
    font-size: 0.8rem;
    background: #10354f;
    display: inline-block;
    padding: 0.1rem 0.3rem;
    border-radius: 0.3rem;
    margin-right: 0.2rem;
  }

  .category {
    margin: 1rem;
  }

  .test-pages-links {
    display: flex;
    max-width: 720px;
    width: 100%;
    justify-content: center;
    margin-top: 0.25rem;
    margin-bottom: 2rem;
  }

  .test-pages-links li {
    margin: 0.25rem;
  }

  a {
    color: whitesmoke;
  }

  :global(body) {
    min-height: 110vh;
  }
</style>
