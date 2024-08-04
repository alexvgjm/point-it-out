<script lang="ts" context="module">
	export type PropEntry = {
		property: string;
		types: string[];
		description: string;
		default?: string;
		props?: PropEntry[];
	};

	type PropertyListProps = {
		pioOptionsList: PropEntry[];
		title?: string;
		subtable?: boolean;
		even?: boolean;
		headers?: boolean;
	};
</script>

<script lang="ts">
	let { pioOptionsList, title, subtable, even, headers = true }: PropertyListProps = $props();
</script>

{#snippet table()}
	{#if title}<h1 class="title">{@html title}</h1>{/if}

	{#if headers}
		<div class="props-table__header props-table__header--name">Name</div>
		<div class="props-table__header props-table__header--types">Type/s</div>
		<div class="props-table__header props-table__header--desc">Description</div>
	{/if}

	{#each pioOptionsList as p}
		<div class="prop-name" class:subtable-name={subtable}>
			{p.property}
			<span class="default">
				{#if p.default}
					{'Default: ' + p.default}
				{:else}
					Required
				{/if}
			</span>
		</div>
		<div class="prop-types">
			{#each p.types as pType, i}
				<span class="prop-type">{@html pType}</span>
			{/each}
		</div>

		<div class="prop-desc"><span>{@html p.description}</span></div>

		{#if p.props}
			<svelte:self pioOptionsList={p.props} subtable headers={false} />
		{/if}
	{/each}
{/snippet}

{#if subtable}
	{@render table()}
{:else}
	<section class="props-table" class:subtable class:even>
		{@render table()}
	</section>
{/if}

<style>
	.props-table {
		--color-even: #0001;
		--color-odd: #0003;
		margin-top: 1rem;
		display: grid;
		text-shadow: 0.05em 0.05em black;
		grid-template-columns: 12rem 1.5fr;
	}

	.subtable {
		position: relative;
		margin-top: 0;
		margin-left: 1rem;
		border-left: 0.25rem solid var(--color-third-dark);
		grid-template-columns: 10.75rem 1.5fr;
	}

	.subtable::before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		height: 0rem;
		background: transparent;
		width: 100%;
	}

	.title {
		background: var(--color-odd);
		margin: 0;
		border: none;
		grid-column: 1 / -1;
		font-size: 1.25rem;
		/*border: 0.1rem solid var(--color-third-darky);*/
		border-bottom: none;
		border-radius: 0.25rem 0.25rem 0 0;
		padding: 1rem 1rem;
		color: var(--color-third-lighty);
		border-bottom: 0.01rem solid var(--color-third);
	}

	.props-table__header {
		font-weight: bold;
		color: var(--color-third-lighty);
		padding: 0.5rem;
		display: none;
	}

	.props-table__header--name {
		border-radius: 0.25rem 0 0 0;
	}
	.props-table__header--desc {
		border-radius: 0 0.25rem 0 0;
		grid-column: 1 / -1;
	}
	.prop-name,
	.prop-types {
		font-family: monospace;
	}
	.prop-name,
	.prop-types,
	.prop-desc {
		background: var(--color-even);
		display: flex;
		align-items: center;
		padding: 0.5rem 1rem;
		flex-wrap: wrap;
	}

	.prop-name {
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		font-weight: bold;
		color: var(--color-third);
	}

	:global(:not(.subtable) .prop-name.subtable-name) {
		margin-left: 1rem;
		border-left: 0.25rem solid var(--color-second);
	}

	:global(:not(.subtable) .subtable-name + .prop-types + .prop-desc) {
		margin-left: 1rem;
		border-left: 0.25rem solid var(--color-second);
	}

	.default {
		color: var(--color-primary-lighter);
		font-size: small;
	}

	.prop-desc {
		margin-bottom: 0rem;
		justify-content: flex-start;
		font-size: 0.9rem;
		grid-column: 1 / -1;
		padding-top: 0;
		padding-bottom: 1rem;
	}

	.prop-desc:not(:last-child) {
		border-bottom: none;
	}

	.prop-types {
		color: var(--color-third-lighter);
		align-content: center;
	}

	.prop-type:not(:last-child) {
		text-align: center;
		margin-top: 0.1rem;
		padding-right: 0.5ch;
		margin-right: 0.5ch;
		border-right: 0.1rem solid var(--color-primary-lightest);
	}

	:global(.even .title ~ div:nth-child(6n + 5)),
	:global(.even .title ~ div:nth-child(6n + 6)),
	:global(.even .title ~ div:nth-child(6n + 7)),
	.title ~ div:nth-child(6n + 2),
	.title ~ div:nth-child(6n + 3),
	.title ~ div:nth-child(6n + 4),
	:global(.even div:nth-child(6n + 4)),
	:global(.even div:nth-child(6n + 5)),
	:global(.even div:nth-child(6n + 6)) {
		background-color: var(--color-even);
	}

	:global(.even .title ~ div:nth-child(6n + 2)),
	:global(.even .title ~ div:nth-child(6n + 3)),
	:global(.even .title ~ div:nth-child(6n + 4)),
	.title ~ div:nth-child(6n + 5),
	.title ~ div:nth-child(6n + 6),
	.title ~ div:nth-child(6n + 7),
	div:nth-child(6n + 1),
	div:nth-child(6n + 2),
	div:nth-child(6n + 3) {
		background: var(--color-odd);
	}

	@media (min-width: 1024px) {
		.props-table {
			grid-template-columns: 12rem 1.5fr 3fr;
		}
		.subtable {
			grid-template-columns: 10.75rem 1.5fr 3fr;
		}
		.props-table__header {
			display: flex;
			padding-left: 1rem;
		}

		.props-table__header--desc,
		.prop-desc {
			grid-column: auto;
			justify-content: flex-start;
		}

		.prop-types {
		}

		:global(:not(.subtable) .subtable-name + .prop-types + .prop-desc) {
			margin-left: 0;
			border-left: none;
		}

		.prop-desc {
			padding: 0.5rem 0.5rem 0.5rem 1rem;
		}
	}
</style>
