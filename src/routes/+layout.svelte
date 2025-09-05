<script>
	import favicon from "$lib/assets/favicon.svg";

	import { page } from "$app/stores";
	import { afterNavigate } from "$app/navigation";

	import { preview, setPreview, pushPreview, clearPreview } from "$lib/preview.svelte.js";
	import { crossfade } from "svelte/transition";

	// crossfade needs to be initialized with options
	const [send, receive] = crossfade({
		duration: 400,
		easing: (t) => t
	});

	let path = $state($page.url.pathname);
	afterNavigate(() => {
		path = $page.url.pathname;
	});

	import "$lib/styles/main.scss";
	import Navigation from "$lib/components/Navigation.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation {path} />

{#if preview.stack}
	<div class="preview">
		{#each preview.stack as src (src)}
			<img {src} alt="" class="background-image" />
		{/each}
	</div>
{/if}

{@render children?.()}

<style>
	.preview {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;

		z-index: -20;
		opacity: 0.5;
	}
	.preview img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		position: absolute;

		animation: fadeInMask 1s linear forwards;
	}

	@keyframes fadein {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
	@keyframes fadeInMask {
		from {
			opacity: 0;
			/* z-index: -10; */
			filter: blur(20px);
			transform: translateX(0rem) scale(1.1);
		}
		to {
			opacity: 1;
			/* z-index: -1; */
			filter: blur(20px);
			transform: translateX(0rem) scale(1.1);
		}
	}
</style>
