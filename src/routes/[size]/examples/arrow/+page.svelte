<script lang="ts">
  import Example from '$src/components/Example.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const size = { ...data }
</script>

<h1 class="examples__title">Arrow</h1>
<h2 class="examples__subtitle">create('arrow', {`{...}`})</h2>
<p>NOTE: using distance: 20 in most examples for legibility.</p>
<section class="examples">
  <section class="examples__section">
    <h1>Distance</h1>
    <div class="examples__list">
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 20 }} inBoxText="20" />
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 50 }} inBoxText="50" />
      <Example {size} pointerName="arrow" pointerOptions={{ distance: 80 }} inBoxText="80" />
    </div>
  </section>
  <!--
  <section class="examples__section">
    <h1>Default</h1>
    <Example {size} pointerName="arrow" pointerOptions={{}} />
  </section>
  <section class="examples__section">
    <h1>fromAngle</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ fromAngle: 'left bottom', distance: 20 }}
        inBoxText="'left bottom'"
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
    <h1>Size</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ distance: 20, scale: 'xs' }}
        inBoxText="xs"
      />
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ distance: 20, scale: 1 }}
        inBoxText="1"
      />
      <Example
        {size}
        pointerName="arrow"
        pointerOptions={{ distance: 20, scale: 'lg' }}
        inBoxText="lg"
      />
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
  </section>-->
</section>
