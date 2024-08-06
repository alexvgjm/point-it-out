<script lang="ts">
  import Code from '$comps/Code.svelte'
</script>

<section class="doc-section">
  <h1 id="clear-all-pointers">Clear all pointers</h1>

  <p>
    To clear all pointers simply call the clear function. This function is an easy way to call the
    destroy() method on every created pointer.
  </p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
    import {'{ clear }'} from 'pointitout' 

clear() // Destroy all pointers. That's all.
    </Code>
</section>

<section class="doc-section">
  <h1 id="destroy-specific-pointer">Destroy a specific pointer</h1>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

const pointer = create('rect', {"{ target: '#target-element-id' }"})

pointer.destroy() // Destroy the pointer
    </Code>

  <section class="doc-section">
    <h2 id="destroy-specific-pointer">Pointer onDestroy hook</h2>

    <p>You can register functions to be called when pointer is destroyed.</p>

    <!-- prettier-ignore -->
    <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

const pointer = create('rect', {"{ target: '#target-element-id' }"})

pointer.onDestroy( p =&gt; {`{
    console.log('A pointer was destroyed. 🪦 R.I.P')
    console.log('Pointer object: ', p)
}`})

pointer.destroy() // Destroy the pointer
// The function containing the console.logs will be called.
    </Code>
  </section>
</section>
