<script lang="ts">
  import Example from '$src/components/Example.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const size = { ...data }
</script>

<h1 class="examples__title">Rect</h1>
<h2 class="examples__subtitle">create('rect', {`{...}`})</h2>
<section class="examples">
  <section class="examples__section">
    <h1>Default</h1>
    <Example {size} pointerName="rect" pointerOptions={{}} />
  </section>
  <section class="examples__section">
    <h1>Round</h1>
    <div class="examples__list">
      <Example {size} pointerName="rect" pointerOptions={{ round: 20 }} inBoxText="round: 20" />
      <Example
        {size}
        pointerName="rect"
        pointerOptions={{ round: '50%' }}
        inBoxText="round: '50%'"
      />
    </div>
  </section>
  <section class="examples__section">
    <h1>Padding</h1>
    <div class="examples__list">
      <Example {size} pointerName="rect" pointerOptions={{ padding: 10 }} inBoxText="padding: 10" />
      <Example
        {size}
        pointerName="rect"
        pointerOptions={{ padding: -15 }}
        inBoxText="padding: -15"
      />
    </div>
  </section>
  <section class="examples__section">
    <h1>Animate</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="rect"
        inBoxText="animate: 'pulse'"
        pointerOptions={{ animate: 'pulse' }}
      />
    </div>
  </section>
</section>
