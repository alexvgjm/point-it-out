<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import Code from '../../../doc-components/Code.svelte'
  import ColumnsContainer from '../../../doc-components/ColumnsContainer.svelte'
  import PropertiesTable, { type PropEntry } from '../../../doc-components/PropertiesTable.svelte'
  import { clear, create } from '$lib/main'
  import { browser } from '$app/environment'

  const params: PropEntry[] = [
    {
      property: 'pointerType',
      types: ['PointerType'],
      description: `A string that actually (version 0.1.4) can only 
        be <strong>'rect'</strong>, but <strong>'arrow'</strong> and <strong>'image'</strong> will be included soon.`
    },
    {
      property: 'options',
      types: ['<strong>CreateOptions</strong>'],
      description: `An object whose properties depend on  
        pointerType. Only the common ones for all pointers are described below.`,
      props: [
        {
          property: 'target',
          types: ['HTMLElement', 'string'],
          description: `The element to point out. Can be a direct reference 
                (HTMLElement) or any kind of CSS selector (string).`
        },
        {
          property: 'container',
          default: 'document.body',
          types: ['HTMLElement', 'string'],
          description:
            `Container where append the pointer. A reference ` +
            `or CSS selector string. NOTE: The ` +
            `container <strong>should have the position property ` +
            `set to a value different to the default static.</strong>`
        },
        {
          property: 'className',
          default: 'undefined',
          types: ['string', 'string[]'],
          description: `Class/classes to add to the new pointer element.`
        }
      ]
    }
  ]

  const rectOptions: PropEntry[] = [
    {
      property: 'strokeWidth',
      default: '4',
      types: ['number'],
      description: 'Stroke width in pixels.'
    },
    {
      property: 'strokeColor',
      default: "'orange'",
      types: ['string'],
      description:
        "Stroke color. A SVG/CSS valid color string i.e <strong>'#aa23c8'</strong> or <strong>'rgba(211, 17, 32, 0.5)'</strong>."
    },
    {
      property: 'round',
      default: '0',
      types: ['number', 'string', '<strong>object</strong>'],
      description:
        "Round borders as number (pixel), a string with any valid SVG value (i.e '20%') or an object with rx and ry properties explained below.",
      props: [
        {
          property: 'rx',
          default: '0',
          types: ['number', 'string'],
          description: 'Round applied to horizontal axis.'
        },
        {
          property: 'ry',
          default: '0',
          types: ['number', 'string'],
          description: 'Round applied to vertical axis.'
        }
      ]
    },
    {
      property: 'padding',
      default: '0',
      types: ['number'],
      description:
        "How separated (in pixels) from the target content is the rect. Can be negative. By default (0 padding) the rect surrounds perfectly the target's bounding rect."
    }
  ]

  if (browser) {
    onMount(() => {
      create('rect', {
        target: '#box-1',
        container: 'main',
        padding: 8
      })

      create('rect', {
        target: '#box-2',
        container: 'main',
        strokeWidth: 8,
        strokeColor: '#68c'
      })

      create('rect', {
        target: '#box-3',
        container: 'main',
        strokeColor: '#f8c',
        round: '30%',
        padding: 12
      })
    })

    onDestroy(clear)
  }
</script>

<h1 id="creating-pointers">Creating pointers</h1>

<section class="doc-section">
  <p>
    In Point it out, we call "pointer" to created and absolutely positioned elements via the
    create() function.
  </p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

create('rect', {"{ target: '#target-css-selector' }"})
    </Code>

  <section class="doc-section">
    <h2>Common params and options for all pointers</h2>

    <PropertiesTable
      title="create ( pointerType, <span id='options-in-title'>options</span> )"
      pioOptionsList={params}
    />
  </section>
</section>

<section class="doc-section">
  <h1 id="rect">Rect</h1>

  <p>
    The first and most basic pointer. In addition to the options described above, this pointer has
    the following specific options:
  </p>

  <PropertiesTable
    title="create ( <strong>'rect'</strong>, options )"
    pioOptionsList={rectOptions}
  />
</section>

<section class="doc-section">
  <h1 id="pointer-references">Pointer references</h1>

  <p>
    The create function returns a reference to a Pointer instance, an object with some useful
    methods to manipulate it. Also contains a reference to the target element and the created raw
    HTMLElement.
  </p>

  <!-- prettier-ignore -->
  <Code showLanguage={false} showSelectAllButton language="TypeScript">
import {'{ create }'} from 'pointitout' 

const pointer = create('rect', {"{ target: '#target-element-id' }"})

// You can access to the target element and the raw 
// created HTMLElement from this object if you need
console.log(pointer.target) 
console.log(pointer.htmlElement) // or some methods. More of this later. 

pointer.destroy() // Destroy the HTMLElement and listeners
    </Code>
</section>

<section class="doc-section">
  <h1 id="examples">Examples</h1>

  <p style="margin-bottom: 2rem;">
    Note: using the "container" option to create the SVG inside the &lt;main&gt; element
  </p>

  <ColumnsContainer>
    <!-- prettier-ignore -->
    <Code slot="left" 
            language="TypeScript" 
            showLanguage={false} noTop>
create('rect', {`{
    target: '#box-1', 
    container: 'main',
    padding: 8
}`})
        </Code>

    <div slot="right" class="result-panel">
      <div class="test-box" id="box-1">Box 1</div>
    </div>
  </ColumnsContainer>

  <ColumnsContainer even>
    <!-- prettier-ignore -->
    <Code slot="left"  noTop
            language="TypeScript" 
            showLanguage={false}>
create('rect', {`{
    target: '#box-2', 
    container: 'main',
    strokeWidth: 8,
    strokeColor: '#68c'
}`})
        </Code>

    <div slot="right" class="result-panel">
      <div class="test-box" id="box-2">Box 2</div>
    </div>
  </ColumnsContainer>

  <ColumnsContainer>
    <!-- prettier-ignore -->
    <Code slot="left"  noTop
            language="TypeScript" 
            showLanguage={false}>
create('rect', {`{
    target: '#box-3', 
    container: 'main',
    strokeColor: '#f8c',
    round: '30%',
    padding: 12
}`})
        </Code>

    <div slot="right" class="result-panel">
      <div class="test-box" id="box-3">Box 3</div>
    </div>
  </ColumnsContainer>
</section>
