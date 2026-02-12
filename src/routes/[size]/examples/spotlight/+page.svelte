<script lang="ts">
  import Example from '$src/components/Example.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  const size = { ...data }
</script>

<h1 class="examples__title">Spotlight</h1>
<h2 class="examples__subtitle">create('spotlight', {`{...}`})</h2>
<section class="examples">
  <section class="examples__section">
    <h1>Default</h1>
    <Example
      {size}
      pointerName="spotlight"
      pointerOptions={{}}
      container={true}
      inBoxText="Text inside target"
      outsideTextAbove="Text outside target element"
      outsideTextBelow="More text outside"
    />
  </section>
  <section class="examples__section">
    <h1>Overlay Color</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="spotlight"
        pointerOptions={{ overlayColor: 'rgba(0, 0, 0, 0.9)' }}
        inBoxText="overlayColor: 'rgba(0, 0, 0, 0.9)'"
        outsideTextAbove="Text outside target element"
        outsideTextBelow="More text outside"
        container={true}
      />
      <Example
        {size}
        pointerName="spotlight"
        pointerOptions={{ overlayColor: 'rgba(0, 0, 255, 0.3)' }}
        inBoxText="overlayColor: 'rgba(0, 0, 255, 0.3)'"
        outsideTextAbove="Text outside target element"
        outsideTextBelow="More text outside"
        container={true}
      />
    </div>
  </section>
  <section class="examples__section">
    <h1>Padding</h1>
    <div class="examples__list">
      <Example
        {size}
        pointerName="spotlight"
        pointerOptions={{ padding: 20 }}
        inBoxText="padding: 20"
        outsideTextAbove="Text outside target element"
        outsideTextBelow="More text outside"
        container={true}
      />
      <Example
        {size}
        pointerName="spotlight"
        pointerOptions={{ padding: 0 }}
        inBoxText="padding: 0"
        outsideTextAbove="Text outside target element"
        outsideTextBelow="More text outside"
        container={true}
      />
    </div>
  </section>
</section>
