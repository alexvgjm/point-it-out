<script>
  export let gap = 0
  export let even = false
</script>

<div class="columns-container" style="--gap: {gap}px" class:even>
  <div class="columns-container__left">
    <slot name="left"></slot>
  </div>
  <div class="columns-container__right">
    <slot name="right"></slot>
  </div>
</div>

<style>
  .columns-container {
    --gap: 0px;
    display: flex;
    min-height: 5rem;
    flex-direction: column;
    background: var(--color-bg);
  }

  .columns-container.even,
  :global(.columns-container.even .hljs) {
    background: var(--color-bg-2);
  }

  .columns-container__left {
    border-right: var(--gap) solid transparent;

    display: flex;
    flex-direction: column;
  }
  .columns-container__right {
    border-left: var(--gap) solid transparent;

    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
  }

  @media (min-width: 640px) {
    .columns-container {
      flex-direction: row;
    }
    .columns-container__left {
      width: 50%;
    }
    .columns-container__right {
      width: 50%;
    }
  }
</style>
