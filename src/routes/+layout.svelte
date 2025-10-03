<script>
	import favicon from "$lib/assets/favicon.ico";

	import { page } from "$app/stores";
	import { beforeNavigate, goto } from "$app/navigation";

	let { data, children } = $props();

	import "$lib/styles/main.scss";
	import Navigation from "$lib/components/Navigation.svelte";

	import { registerAnimationVars } from "$lib/animation";

	// Run once on client
	if (typeof window !== "undefined") {
		registerAnimationVars();
	}

	/*
	handle scroll direction
	via https://bobbyhadz.com/blog/detect-the-scroll-direction-using-javascript
	*/
	let scrollDirection = $state("");
	let lastScrollTop;

	function handleScroll() {
		const scrollTopPosition = window.pageYOffset || document.documentElement.scrollTop;
		if (scrollTopPosition > lastScrollTop) {
			scrollDirection = "down";
		} else if (scrollTopPosition < lastScrollTop) {
			scrollDirection = "up";
		}
		lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
	}

	/*
	route dependent delays/animation
	*/
	import { preview, setPreview } from "$lib/preview.svelte.js";
	import { onMount } from "svelte";
	let transitioningOut = $state(false);
	let navigationTimeout; // delay in (ms)

	beforeNavigate(async (navigation) => {
		if (navigation.from === null || navigation.to === null) return; //skip initial

		if (
			navigation.to.route.id === "/projects/[id]" ||
			navigation.from.route.id === "/projects/[id]"
		) {
			navigationTimeout = 1000;
		} else {
			setPreview({}); // clear image
			navigationTimeout = 0;
		}

		if (!transitioningOut) {
			// console.log("🛑 Pause page routing", navigation.to.url.pathname);
			transitioningOut = true;
			navigation.cancel();

			setTimeout(async () => {
				// navigation.retry();
				await goto(navigation.to.url.pathname); // resumes the canceled navigation
				// console.log(`🟢 Navigating to ${navigation.to.url.pathname}`);

				transitioningOut = false;
			}, navigationTimeout);
		}
	});

	$effect(() => {
		document.body.dataset.transitioning = transitioningOut; // used for blurred preview transition
		document.body.dataset.scrolldirection = scrollDirection; // used for blurred preview transition
	});

	onMount(() => {
		lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<figure class="preview">
	{#if preview.project.cover}
		<img
			src={preview.project.cover.src ?? null}
			srcset={preview.project.cover.srcset ?? null}
			alt={preview.project.cover.alt ?? null}
		/>
	{/if}
	{#if preview.project.title}
		<figcaption>{preview.project.title ?? null}</figcaption>
	{/if}
</figure>

<Navigation />

{@render children?.()}

<svelte:window onscroll={handleScroll} />

<style lang="scss">
	.preview {
		/* defaults for preview */
		filter: blur(40px);
		pointer-events: none;

		figcaption {
			opacity: 0;
		}
		img {
			// opacity: 0;
		}
	}
	:global([data-transitioning="false"]) {
		.preview {
			opacity: unset;
			animation: fadeOutBlockout var(--duration-longest) cubic-bezier(0.85, 0.09, 0.15, 0.91)
				forwards;
		}
	}
	:global([data-transitioning="true"]) {
		.preview {
			opacity: unset;
			animation: fadeInBlockout var(--duration-slow) cubic-bezier(0.85, 0.09, 0.15, 0.91) forwards;
		}
	}
</style>
