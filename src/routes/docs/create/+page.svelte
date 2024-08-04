<script lang="ts">
	import { create, clear } from '$lib/main';
	import { onMount } from 'svelte';
	import Code from '../../../doc-components/Code.svelte';
	import PropertiesTable, { type PropEntry } from '../../../doc-components/PropertiesTable.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

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
					property: 'className',
					default: 'undefined',
					types: ['string', 'string[]'],
					description: `Class/classes to add to the new pointer element.`
				}
			]
		}
	];

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
	];

	onMount(() => {
		create('rect', {
			target: '#options-in-title',
			strokeColor: 'hsl(345, 60%, 59%)',
			strokeWidth: 12,
			round: '20%'
		});
	});
</script>

<h1>Creating pointers</h1>

<section class="doc-section">
	<p>
		In Point it out, we call "pointer" to created and absolutely positioned elements via the
		create() function.
	</p>

	<Code showLanguage={false} showSelectAllButton language="TypeScript">
		import {'{ create }'} from 'pointitout' create('rect', {"{ target: '#target-css-selector' }"})
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
	<h1>Pointer references</h1>

	<p>
		The create function returns a reference to a Pointer instance, an object with some useful
		methods to manipulate it. Also contains a reference to the target element and the created raw
		HTMLElement.
	</p>

	<Code showLanguage={false} showSelectAllButton language="TypeScript">
		import {'{ create }'} from 'pointitout' const pointer = create('rect', {"{ target: '#target-element-id' }"})
		// You can access to the target element and the raw // created HTMLElement from this object if
		you need console.log(pointer.target) console.log(pointer.htmlElement) // or some methods. More
		of this later. pointer.destroy() // Destroy the HTMLElement and listeners
	</Code>
</section>
