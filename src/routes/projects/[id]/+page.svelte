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

	// NEW: control for hiding header .container
	let hideHeaderContainer = $state(false);

	function scrollUpdate() {
		const rect = mainElement.getBoundingClientRect();
		const remaining = rect.y / window.innerHeight;

		// existing blur logic
		blurBackground = remaining < scrollThreshold;

		// NEW: hide header container when scroll > 50px
		const headerOffset = window.innerHeight + 6 * 16; // 4rem ≈ 64px (assuming root font-size = 16px)
		hideHeaderContainer = window.scrollY > headerOffset;
	}

	onMount(() => {
		scrollUpdate(); // initial check
		setPreview(data);

		window.addEventListener("scroll", scrollUpdate);

		setTimeout(() => {
			// scroll the header into view
			headerElement.scrollIntoView({
				behavior: "smooth", // smooth | instant | auto
				block: "start" // start | end | center | nearest
			});
		}, scrollIntoViewTimeout);

		return () => {
			window.removeEventListener("scroll", scrollUpdate);
		};
	});
</script>

<svelte:window onscroll={scrollUpdate} />

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="project--content" bind:this={mainElement}>
	<figure class="project--cover" class:blurred={blurBackground}>
		<img src={data.cover.src} srcset={data.cover.srcset} alt={data.cover.alt} />
		<!-- <figcaption>{data.title}</figcaption> -->
	</figure>

	<header
		class="project--header"
		class:hide-container={hideHeaderContainer}
		bind:this={headerElement}
	>
		<div class="container">
			<h1>{data.title}</h1>
			<div class="project--meta-information">
				{@html data.metainformation}
			</div>
		</div>
		<CloseButton href="/projects" title="Back to Projects" text="Close Project" />
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
		font-family: var(--font-mono);
		font-weight: 100;
	}
	.project--meta-information {
		font-weight: 300;
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
	:global(body) {
		/* from projects/[id] */
		--bg: var(--projects-bg);
		--fg: var(--projects-fg);
	}

	@media only screen and (max-width: 600px) {
		.project--header .container {
			max-height: 500px; /* adjust to your content */
			opacity: 1;
			overflow: hidden;
			transition:
				max-height 0.2s ease,
				opacity 0.2s ease;
		}

		.project--header.hide-container .container {
			max-height: 0;
			opacity: 0;
		}
	}
</style>
