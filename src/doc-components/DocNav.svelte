<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { useStore } from '../stores/general.svelte'
  import { afterNavigate, replaceState } from '$app/navigation'

  let menuOpen = $state(false)
  let navElm: HTMLElement

  if (browser) {
    afterNavigate(() => {
      useStore().headerId = $page.url.hash.replace('#', '')
      if (useStore().headerId != '') {
        replaceState($page.url.pathname + '#' + useStore().headerId, $page.state)
      }
      menuOpen = false
    })

    onMount(() => {
      window.addEventListener('pointerdown', closeMenu)
      return () => {
        window.removeEventListener('pointerdown', closeMenu)
      }
    })

    function closeMenu(event: PointerEvent) {
      const target = event.target as HTMLElement
      if (!navElm.contains(target)) {
        menuOpen = false
      }
    }
  }

  const content = {
    General: {
      'Getting started': '/docs#getting-started'
    },
    'create(...)': {
      'Creating pointers': '/docs/create#creating-pointers',
      Rect: '/docs/create#rect',
      'Rect examples': '/docs/create#examples',
      'Pointer references': '/docs/create#pointer-references'
    },
    'update()': {
      'Update all pointers': '/docs/update',
      'Update a pointer': '/docs/update#single-pointer'
    },
    'clear()': {
      'Destroy all pointers': '/docs/clear',
      'Destroy a pointer': '/docs/clear#single-pointer'
    },
    'config(options)': {
      'Configuring global options': '/docs/config'
    }
  }
</script>

<nav class="main-nav" bind:this={navElm} class:main-nav--open={menuOpen}>
  <button
    class="open-nav"
    onclick={() => {
      menuOpen = !menuOpen
    }}
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <div class="main-nav__wrapper">
    <header>
      <h1>Point it out docs</h1>
      <div class="version">v.{PKG.version}</div>
    </header>

    {#each Object.entries(content) as [section, subsectObj]}
      <nav class="main-nav__section">
        <h2><a href={Object.values(subsectObj)[0]}>{section}</a></h2>
        {#each Object.entries(subsectObj) as [subsectTitle, url]}
          <a
            class="main-nav__link"
            href={url}
            class:current={$page.url.pathname + '#' + useStore().headerId == url}>{subsectTitle}</a
          >
        {/each}
      </nav>
    {/each}
  </div>
</nav>

<style>
  .open-nav {
    position: absolute;
    right: -3rem;
    top: 1rem;
    width: 2rem;
    height: 2rem;
    border: 0.2rem solid var(--color-second);
    border-radius: 0.2rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0.25rem 0.25rem;
    transition: 0.2s right;
  }

  .open-nav span {
    display: block;
    width: 100%;
    height: 0.15rem;
    background: var(--color-second);
  }

  .main-nav {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    height: 100vh;
    padding: 1rem 0;
    overflow-x: visible;
    width: 100%;

    /** only mobile */
    position: fixed;
    z-index: 99999;
    background-color: var(--color-bg);
    box-shadow: 0.2rem 0 0.2rem #0004;

    transform: translateX(-100%);
    transition: 0.2s transform;
  }

  .main-nav--open {
    transform: translateX(0%);
    box-shadow: 5rem 0 2rem 1rem #000a;
  }

  .main-nav--open .open-nav {
    right: 0.5rem;
  }

  .main-nav--open .open-nav span:nth-child(1),
  .main-nav--open .open-nav span:nth-child(3) {
    opacity: 0;
  }

  .main-nav--open .open-nav span:nth-child(2) {
    background: none;
  }
  .main-nav--open .open-nav span:nth-child(2)::after {
    content: ' ';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(-50%, -50%);
    width: 95%;
    height: 0;
    border: 0.6rem solid transparent;
    border-right: 1rem solid var(--color-second);
    border-left-width: 0rem;
    border-top-width: 0.6rem;
    border-bottom-width: 0.6rem;
  }

  .main-nav__wrapper {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding-right: 1.5rem;
    padding-left: 1.5rem;
  }

  header {
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
  }

  a.main-nav__link {
    position: relative;
    margin-top: 0.5rem;
    color: white;
    display: flex;
    align-items: center;
    border: 0.05rem solid transparent;
  }

  .main-nav__section {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border-top: 0.1rem solid var(--color-third-dark);
    padding-top: 1rem;
  }

  .main-nav__link::before {
    content: ' ';
    display: none;
    border-radius: 0.1em;
    width: 0.5em;
    height: 0.5em;
    background: var(--color-second);
    margin-right: 0.5rem;
  }

  h2 {
    margin: 0;
  }

  .current {
    color: var(--color-second-lightest);
  }

  .main-nav__link:hover::after,
  .current::after {
    position: absolute;
    content: ' ';
    left: -5%;
    width: 110%;
    height: 100%;
    border: 0.05rem dashed var(--color-third-darker);
    background: var(--color-third-darker);
    border-radius: 0.25rem 0.25rem;
    padding: 0.2rem;

    z-index: -1;
  }

  .current::before {
    background: var(--color-second-lighter);
  }

  .main-nav__link:not(.current):hover::after {
    background: none;
    border-color: var(--color-third-dark);
  }

  @media (min-width: 1024px) {
    .open-nav {
      display: none;
    }
    .main-nav {
      position: relative;
      box-shadow: none;
      transform: none;
    }
  }
</style>
