<script lang="ts">
  import '../../style.css'
  import './docs.css'
  import DocNav from '../../doc-components/DocNav.svelte'
  import 'highlight.js/styles/atom-one-dark.min.css'
  import { browser } from '$app/environment'
  import { afterNavigate } from '$app/navigation'
  import { update } from '$lib/main'
  import { onDestroy, onMount } from 'svelte'
  import { useStore } from '../../stores/general.svelte'
  import throttle from 'just-throttle'

  let mainElm: HTMLElement
  let headings: HTMLHeadingElement[]
  $: headings = []

  if (browser) {
    afterNavigate(() => {
      update()
      headings = Array.from(document.querySelectorAll('h1[id], h2[id]'))
      onScroll()
    })

    function distanceTo(a: HTMLElement, to: number) {
      return Math.abs(a.getBoundingClientRect().top - to)
    }

    const onScroll = throttle(
      () => {
        if (headings.length == 0) {
          return
        }

        const mainRect = mainElm.getBoundingClientRect()
        const halfWindow = mainRect.height / 4 + mainRect.top

        const elmAndDist: [HTMLHeadingElement, number][] = headings.map((h) => [
          h,
          distanceTo(h, halfWindow)
        ])

        elmAndDist.sort((a, b) => a[1] - b[1])

        const nearest = elmAndDist[0]
        useStore().headerId = nearest[0].id
      },
      200,
      { leading: false, trailing: true }
    )

    onMount(() => {
      mainElm.addEventListener('scroll', onScroll)
    })

    onDestroy(() => {
      mainElm.removeEventListener('scroll', onScroll)
    })
  }
</script>

<div class="docs-wrapper">
  <DocNav />
  <main bind:this={mainElm}>
    <slot></slot>
  </main>
</div>

<style>
  .docs-wrapper {
    max-width: 1280px;
    display: flex;
    width: 100%;
    height: 100svh;
  }

  main {
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    background: var(--color-bg-2);
    padding: 3rem 0.5rem 2rem 0.5rem;
  }

  @media (min-width: 640px) {
    main {
      padding: 3rem 2rem 2rem 2rem;
    }
  }
</style>
