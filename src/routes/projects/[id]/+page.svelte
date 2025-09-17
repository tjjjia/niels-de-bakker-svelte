<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
	import CloseButton from "$lib/components/CloseButton.svelte";
	import { onMount } from "svelte";
	import { setPreview } from "$lib/preview.svelte.js";

	/*
	blur background on scroll
	*/
	let mainElement = $state();
	let blurBackground = $state(false);
	function scrollUpdate() {
		const rect = mainElement.getBoundingClientRect();
		const remaining = rect.y / window.innerHeight;
		if (remaining < 0.6) {
			blurBackground = true;
		} else {
			blurBackground = false;
		}
	}
	onMount(() => {
		scrollUpdate();
		setPreview(data);

		setTimeout(() => {
			document.body.scrollTo({
				top: 300,
				behavior: "smooth"
			});
		}, 1000);
	});
</script>

<svelte:window onscroll={scrollUpdate} />

<main class="project--content" bind:this={mainElement}>
	<figure class="project--cover" class:blurred={blurBackground}>
		<img src={data.cover.src} srcset={data.cover.srcset} alt={data.cover.alt} />
		<figcaption>{data.title}</figcaption>
	</figure>

	<header class="project--header">
		<h1>{data.title}</h1>
		<div class="project--meta-information">
			{@html data.metainformation}
		</div>
		<CloseButton href="/projects" title="Back to Projects" />
	</header>

	<KirbyLayout layouts={data.content} />
	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>

<style>
	main {
		margin-top: 100vh;
		background-color: var(--bg);
	}
	.project--header {
		position: sticky;
		top: 0;
	}

	.project--cover > * {
		transition: all 800ms;
	}
	.project--cover.blurred img {
		filter: blur(20px);
	}
	.project--cover.blurred figcaption {
		filter: blur(20px);
	}
</style>
