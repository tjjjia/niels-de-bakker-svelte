<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import CloseButton from "$lib/components/CloseButton.svelte";
	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="experiment--content column">
	<header class="experiment--header">
		<div class="container">
			<h1>{data.title}</h1>
		</div>
		<CloseButton href="/experiments" title="Back to Experiments" text="Close Experiment" />
	</header>

	<KirbyLayout layouts={data.content} />

	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>

<style>
	.experiment--header h1 {
		font-weight: 300;
	}
	:global(body) {
		/* from experiments/[id] */
		--bg: var(--experiments-bg);
		--fg: var(--experiments-fg);
	}
</style>
