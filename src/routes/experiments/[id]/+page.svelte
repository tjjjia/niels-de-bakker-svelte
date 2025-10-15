<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";
	import { onMount } from "svelte";

	import { durations } from "$lib/animation.js";
	import { setPreview } from "$lib/preview.svelte.js";
	import CloseButton from "$lib/components/CloseButton.svelte";
	import KirbyLayout from "$lib/components/KirbyLayout.svelte";


	let headerElement = $state();
	let scrollIntoViewTimeout = durations.normal;
	// let scrollIntoViewTimeout = durations.longest;

	onMount(() => {
		setTimeout(() => {
			headerElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});

		}, scrollIntoViewTimeout);
	});
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="experiment--content column">
	<header class="experiment--header" bind:this={headerElement}>
		<div class="container desktop-only">
			<h1>{data.title}</h1>
		</div>
		<CloseButton href="/experiments" title="Back to Experiments" text="Close Experiment" />
	</header>

	<div class="mobile-only">
		<h1>{data.title}</h1>
	</div>

	<KirbyLayout layouts={data.content} />

	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>

<style>
	main {
		margin-top: 2rem;
	}
	h1 {
		font-weight: 300;
	}
	:global(body) {
		/* from experiments/[id] */
		--bg: var(--experiments-bg);
		--fg: var(--experiments-fg);
	}
</style>
