<h2>Test pages</h2>
<ul class="test-pages-links">
  <li><a href="/box/300x300"><span class="size">300x300</span></a></li>
  <li><a href="/box/400x250"><span class="size">400x250</span></a></li>
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
        <a href="/300x300/arrow/from-option/120"><span class="size">300x300</span></a>
        <a href="/300x300/arrow/from-option/90"><span class="size">90º</span></a>
        <a href="/300x300/arrow/from-option/180"><span class="size">180º</span></a>
        <a href="/300x300/arrow/from-option/328"><span class="size">328º</span></a>
        fromAngle
      </li>
    </ul>
  </div>
</section>
