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
		// compute threshold once DOM is stable
		setTimeout(() => {
			headerElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});

			// threshold = top offset of headerElement + 0rem
			// const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
			// headerScrollThreshold = getDocumentOffset(headerElement) + 0 * rem;
		}, scrollIntoViewTimeout);

		// window.addEventListener("scroll", scrollUpdate);

		return () => {
			// window.removeEventListener("scroll", scrollUpdate);
		};
	});
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="experiment--content column">
	<header class="experiment--header" bind:this={headerElement}>
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
	main {
		margin-top: 2rem;
	}
	.experiment--header h1 {
		font-weight: 300;
	}
	:global(body) {
		/* from experiments/[id] */
		--bg: var(--experiments-bg);
		--fg: var(--experiments-fg);
	}
</style>
