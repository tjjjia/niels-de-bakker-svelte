<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="about--content column">
	<header class="about--header">
		<!-- <h1>{data.title}</h1> -->
	</header>

	<KirbyLayout layouts={data.content} />

	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>
