<script lang="ts">
  export let title: string | undefined
</script>

<div class="info-box">
  {#if title}
    <div class="info-box__title">{title}</div>
  {/if}
  <slot></slot>
</div>

<style>
  .info-box {
    --color-call--info: var(--color-third-lighty);

    font-size: 1.125rem;

    color: var(--color-call--info);

    padding: 1rem;
    border-radius: 0.25rem;
    margin-top: 1.5rem;
    margin-bottom: 2.5rem;
    position: relative;
    padding-left: 2rem;
    /*box-shadow: inset 0 0 0 0.25rem var(--color-call--info);*/
    border: 0.25rem solid var(--color-call--info);

    text-align: center;
    text-wrap: balance;
  }

  .info-box::before {
    content: 'i';
    width: 2rem;
    height: 2rem;
    position: absolute;
    background: var(--color-bg-2);
    border: 0.2rem solid var(--color-bg-2);
    box-shadow: inset 0 0 0 0.25rem var(--color-call--info);
    left: -1rem;
    top: -1rem;
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    color: var(--color-call--info);
  }

  .info-box :global(p:first-child) {
    margin-top: 0;
  }

  .info-box :global(ul) {
    text-align: left;
    text-wrap: initial;
    text-wrap: pretty;
    margin-top: 1rem;
  }
  .info-box :global(ul li) {
    border-left: 0.5ch solid var(--color-call--info);
    padding-left: 1.25ch;
    color: var(--color-blog-font-primary);
  }
  .info-box :global(ul li::before) {
    display: none;
  }
</style>
