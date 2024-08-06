<script lang="ts">
  import Code from '$comps/Code.svelte'

  import * as env from '$env/static/public'

  /**
   * FIXME: static adapter requires $env/static and not $env/dynamic. Need to
   * investigate how to add vars programmatically without .env file
   */
  const { PUBLIC_DOCS_ROOT } = env as ForcedEnv
</script>

<h1 id="getting-started">Getting started</h1>

<p>
  Point it out is a tiny library to mark/point out DOM elements using another absolutely positioned
  elements or procedurally generated SVGs.
</p>
<p>
  The most common use case is to easily create tutorial pointers to point out interface elements
  that you want to describe or that the user should interact with.
</p>

<section class="doc-section">
  <h2>Installation</h2>

  <p>Install pointitout from npm:</p>

  <Code showLanguage={false} showSelectAllButton language="Bash">npm install pointitout</Code>

  <p>
    <small
      >or inject the single minified .js file as a &lt;script&gt; from:
      <a href="https://unpkg.com/pointitout@latest/pointitout.js"
        >https://unpkg.com/pointitout@latest/pointitout.js</a
      >
    </small>
  </p>
</section>

<section class="doc-section">
  <h2>Basic usage</h2>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

create('rect', {"{ target: '#target-element-id' }"})
	</Code>

  <p>See more options for the <a href={PUBLIC_DOCS_ROOT + '/create'}>create function</a>.</p>
</section>
