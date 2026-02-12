<script lang="ts" generics="T extends PointerName">
  import { browser } from '$app/environment'
  import { create, type PointerName, type PointerOptions, type PointItOutPointer } from '$lib'
  import { onDestroy, onMount } from 'svelte'

  interface ExampleProps<T extends PointerName> {
    title?: string
    inBoxText?: string
    outsideTextAbove?: string
    outsideTextBelow?: string
    container?: boolean
    size?: { w: number; h: number }
    pointerName: T
    pointerOptions: Omit<PointerOptions[T], 'target'>
  }

  const {
    title = '',
    container,
    pointerName,
    pointerOptions,
    inBoxText = '',
    outsideTextAbove = '',
    outsideTextBelow = '',
    size = { w: 128, h: 128 }
  }: ExampleProps<T> = $props()

  let target: HTMLElement | undefined = $state()
  let containerElm: HTMLElement | undefined = $state()
  let p: PointItOutPointer

  onMount(() => {
    if (browser) {
      p = create(pointerName, {
        ...pointerOptions,
        target: target,
        container: container ? containerElm : undefined
      } as PointerOptions[T])
    }
  })

  onDestroy(() => p?.destroy())
</script>

<article>
  <h1>{title}</h1>

  {#snippet TestBox()}
    {#if outsideTextAbove}
      <p class="outside-text">{outsideTextAbove}</p>
    {/if}

    <div bind:this={target} class="test-box" style="width: {size.w}px; height: {size.h}px">
      {#if inBoxText}
        <p>{inBoxText}</p>
      {/if}
    </div>

    {#if outsideTextBelow}
      <p class="outside-text">{outsideTextBelow}</p>
    {/if}
  {/snippet}

  {#if container}
    <div class="test-container" bind:this={containerElm}>
      {@render TestBox()}
    </div>
  {:else}
    {@render TestBox()}
  {/if}
</article>

<style>
  h1 {
    text-align: center;
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
  }

  h1:empty {
    margin-bottom: 0;
  }

  article {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--color-bg-2);
    padding: 0.5rem 1rem;
    margin: 0.5rem;
  }
  .test-box {
    position: relative;
    margin: 0 1rem;
    font-size: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .test-container {
    position: relative;
    overflow: hidden;
    padding: 2rem;
    min-width: 200px;
    min-height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .outside-text {
    color: white;
    font-size: 0.9rem;
    margin: 0.5rem 0;
    text-align: center;
  }

  .test-box p {
    color: white;
    margin: 0;
    font-size: 0.9rem;
  }
</style>
