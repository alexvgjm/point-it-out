<script lang="ts">
  import Code from '$comps/Code.svelte'
  import type { PropEntry } from '$comps/PropertiesTable.svelte'
  import PropertiesTable from '$comps/PropertiesTable.svelte'

  const systemOptionsProps: PropEntry[] = [
    {
      property: 'updateOnResize',
      default: 'true',
      types: ['boolean'],
      description:
        'If true, the update function will be called on every ' +
        'window resize, updating all pointers.'
    }
  ]
</script>

<section class="doc-section">
  <h1 id="configuring-global-options">Configuring global options</h1>

  <p>
    The config function receives a SystemOptions object and will update only the global options
    presents in it. In the current version there is only one option.
  </p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
    import {'{ config }'} from 'pointitout' 

config({`{
    updateOnResize: true 
}`})
    </Code>

  <PropertiesTable title="SystemOptions" pioOptionsList={systemOptionsProps} />
</section>
