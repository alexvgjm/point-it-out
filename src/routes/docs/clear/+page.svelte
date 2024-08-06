<script lang="ts">
  import Code from '../../../doc-components/Code.svelte'
</script>

<section class="doc-section">
  <h1 id="clear-all-pointers">Clear all pointers</h1>

  <p>
    This section is under construction. For now, it's enough to know that the "clear" function
    deletes ALL currently created pointers.
  </p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
    import {'{ clear }'} from 'pointitout' 

clear() // Destroy all pointers. That's all.
    </Code>
</section>

<section class="doc-section">
  <h1 id="destroy-specific-pointer">Destroy a specific pointer</h1>

  <p>WORK IN PROGRESS. This doesn't work yet, will be added in 1.5.</p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

const pointer = create('rect', {"{ target: '#target-element-id' }"})

pointer.destroy() // Destroy the pointer
    </Code>
</section>
