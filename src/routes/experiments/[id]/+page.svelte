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


<main class="experiment--content">
	<header class="experiment--header">
		<h1>{data.title}</h1>
		<CloseButton href="/experiments" title="Back to Experiments" text="Close Experiment"/>
	</header>

	<KirbyLayout layouts={data.content} />

	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>

<style>
	:global(body) {
		--bg: var(--experiments-bg);
		--fg: var(--experiments-fg);
	}
</style>
