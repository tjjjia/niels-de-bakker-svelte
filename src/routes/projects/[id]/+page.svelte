<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";
	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
	import CloseButton from "$lib/components/CloseButton.svelte";

	import { onMount } from "svelte";
	import { setPreview } from "$lib/preview.svelte.js";
	import { durations } from "$lib/animation.js";

	/*
	background blurring behavior
	*/
	let mainElement = $state();
	let headerElement = $state();
	let blurBackground = $state(false);
	let scrollThreshold = 0.6;
	let scrollIntoViewTimeout = durations.longest;

	// control for hiding header .container
	let hideHeaderContainer = $state(false);

	// store the exact scroll threshold for hiding
	let headerScrollThreshold = 0;

	function getDocumentOffset(el) {
		const rect = el.getBoundingClientRect();
		return rect.top + window.scrollY;
	}

	function scrollUpdate() {
		const rect = mainElement.getBoundingClientRect();
		const remaining = rect.y / window.innerHeight;

		// existing blur logic
		blurBackground = remaining < scrollThreshold;

		// hide header container when scrolled beyond threshold
		hideHeaderContainer = window.scrollY > headerScrollThreshold;
	}

	onMount(() => {
		setPreview(data);

		// compute threshold once DOM is stable
		setTimeout(() => {
			headerElement.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});

			// threshold = top offset of headerElement + 0rem
			const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
			headerScrollThreshold = getDocumentOffset(headerElement) + 0 * rem;

			scrollUpdate();
		}, scrollIntoViewTimeout);

		window.addEventListener("scroll", scrollUpdate);

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
		<figcaption>{data.title}</figcaption>
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
		transition: filter var(--duration-normal) var(--easing-in);
	}
	.project--cover.blurred img {
		filter: blur(20px);
	}
	.project--cover.blurred figcaption {
		filter: blur(20px);
	}
	.project--cover figcaption {
		font-weight: 6rem;
		font-weight: 500;
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
				max-height var(--duration-normal) var(--easing-inout),
				opacity var(--duration-normal) ease;
		}

		.project--header.hide-container .container {
			max-height: 0;
			opacity: 0;
		}
	}
</style>
