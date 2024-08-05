<script lang="ts">
  type Language = 'HTML' | 'TypeScript' | 'JavaScript' | 'CSS' | 'Bash'
  export let language: Language
  export let showLineWrapButton = false
  export let showLanguage = true
  export let showCopyButton = false
  export let showSelectAllButton = false
  export let noTop = false

  const colors: { [lang in Language]: string } = {
    CSS: '#2965f1',
    HTML: '#e34c26',
    TypeScript: '#3178c6',
    JavaScript: '#f1dd35',
    Bash: '#4eaa25'
  }

  let lineWrap = false
  let codeElm: HTMLElement

  let copyText = '📃 Copy'
  let timeOutID: NodeJS.Timeout | number = -1
  function copyContent() {
    navigator.clipboard.writeText(codeElm.textContent!)
    copyText = 'Copied to clipboard!'
    clearTimeout(timeOutID)
    timeOutID = setTimeout(() => (copyText = '📃 Copy'), 2000)
  }

  function selectAll() {
    if (window.getSelection === undefined) {
      return
    }

    const sel = getSelection()
    if (!sel) {
      return
    }

    sel.selectAllChildren(codeElm)
  }
</script>

<div
  class="code-wrapper"
  style="--lang-color: {showLanguage ? colors[language] : 'transparent'}"
  class:code-wrapper__line-wrap={lineWrap}
  class:code-wrapper--show-lang={showLanguage}
  class:code-wrapper--no-top={noTop}
>
  {#if showLanguage}
    <div class="code-wrapper__lang">{language}</div>
  {/if}

  <div class="code-wrapper__buttons">
    {#if showLineWrapButton}
      <button
        class="code-wrapper__button"
        on:click={() => {
          lineWrap = !lineWrap
        }}
      >
        Text wrap: {lineWrap ? 'on' : 'off'}
      </button>
    {/if}

    {#if showCopyButton}
      <button class="code-wrapper__button" on:click={copyContent}>
        {copyText}
      </button>
    {/if}

    {#if showSelectAllButton}
      <button class="code-wrapper__button" on:click={selectAll}> Select all </button>
    {/if}
  </div>

  <pre><code bind:this={codeElm} class={`language-${language.toLowerCase()}`}><slot></slot></code
    ></pre>
</div>

<style>
  .code-wrapper {
    --lang-color: #2965f1;

    position: relative;
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
  }
  .code-wrapper--show-lang {
    margin-top: 2.5rem;
  }

  .code-wrapper__buttons {
    position: absolute;
    right: 0;
    top: -1rem;
  }

  .code-wrapper--no-buttons {
    margin-top: 1rem;
  }

  .code-wrapper--no-top {
    margin-top: 0;
  }

  .code-wrapper__button {
    min-height: 2rem;
    min-width: 5.5rem;
  }
  .code-wrapper__line-wrap pre {
    text-wrap: wrap;
  }

  .code-wrapper__line-wrap pre {
    padding: 1em;
  }

  .code-wrapper pre {
    border-top: 0.05rem solid var(--lang-color);
    height: 100%;
  }

  .code-wrapper code {
    height: 100%;
  }

  .code-wrapper__lang {
    color: var(--lang-color);
    display: inline-block;
    border: 0.05rem solid var(--lang-color);
    border-bottom: none;
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem 0.25rem 0 0;
    background: var(--color-bg);
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
  }
</style>
