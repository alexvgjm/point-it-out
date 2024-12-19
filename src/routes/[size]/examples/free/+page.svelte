<script lang="ts">
  import Example from '$src/components/Example.svelte'
  import type { PageData } from './$types'
  import swordPointer from '$assets/broadsword_by_lorc.svg'

  let { data }: { data: PageData } = $props()

  const size = { ...data }

  let p1: HTMLElement = $state()!
</script>

<img src={swordPointer} bind:this={p1} class="pointer-img" alt="Sword pointer" />

<h1 class="examples__title">Free pointer</h1>
<h2 class="examples__subtitle">create('free', {`{...}`})</h2>
<p>NOTE: using distance: 20 in most examples for legibility.</p>
<section class="examples">
  <section class="examples__section">
    <h1>pointerElement (required)</h1>
    <Example
      {size}
      pointerName="free"
      pointerOptions={{
        pointerElement: p1,
        distance: 0, // TODO: fix distance
        transformOrigin: 'left top'
      }}
    />
  </section>
  <!-- <section class="examples__section">
    <h1>fromAngle</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ fromAngle: 'bottom left', distance: 20 }}
        inBoxText="'bottom left'"
      />
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ fromAngle: 25, distance: 20 }}
        inBoxText="25"
      />
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ fromAngle: 220, distance: 20 }}
        inBoxText="220"
      />
    </div>
  </section>
  <section class="examples__section">
    <h1>Distance</h1>
    <div class="examples__list">
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 20 }} inBoxText="20" />
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 50 }} inBoxText="50" />
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 80 }} inBoxText="80" />
    </div>
  </section>
  
  <section class="examples__section">
    <h1>Animate</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="arrow"
        inBoxText="'pulse'"
        pointerOptions={{ animate: 'pulse', distance: 20 }}
      />
    </div>
  </section> -->
</section>

<style>
  .pointer-img {
    width: 128px;
    height: 128px;
  }
</style>
