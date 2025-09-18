<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
	import CloseButton from "$lib/components/CloseButton.svelte";

	import { onMount } from "svelte";
	import { setPreview } from "$lib/preview.svelte.js";

	/*
	background blurring behavior
	*/
	let mainElement = $state();
	let headerElement = $state();
	let blurBackground = $state(false);
	let scrollThreshold = 0.6; // how much should remain to trigger a blur
	let scrollIntoViewTimeout = 1500; // (ms) how long we wait until an auto-scroll is triggered

	function scrollUpdate() {
		const rect = mainElement.getBoundingClientRect();
		const remaining = rect.y / window.innerHeight;

		if (remaining < scrollThreshold) {
			blurBackground = true;
		} else {
			blurBackground = false;
		}
	}

	onMount(() => {
		scrollUpdate(); // check for background blur
		setPreview(data); // ensure the background is loaded in .preview
		setTimeout(() => {
			// scroll the header into view
			headerElement.scrollIntoView({
				behavior: "smooth", // smooth | instant | auto
				block: "start" // start | end | center | nearest
			});
		}, scrollIntoViewTimeout);
	});

</script>

<svelte:window onscroll={scrollUpdate} />

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="project--content" bind:this={mainElement}>
	<figure class="project--cover" class:blurred={blurBackground}>
		<img src={data.cover.src} srcset={data.cover.srcset} alt={data.cover.alt} />
		<figcaption>{data.title}</figcaption>
	</figure>

	<header class="project--header" bind:this={headerElement}>
		<h1>{data.title}</h1>
		<div class="project--meta-information">
			{@html data.metainformation}
		</div>
		<CloseButton href="/projects" title="Back to Projects" text="Close Project"/>
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

	.project--cover > * {
		transition: filter 800ms;
	}
	.project--cover.blurred img {
		filter: blur(20px);
	}
	.project--cover.blurred figcaption {
		filter: blur(20px);
	}
</style>
