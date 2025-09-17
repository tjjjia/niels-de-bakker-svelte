<script>
	import favicon from "$lib/assets/favicon.svg";

	import { page } from "$app/stores";
	import { beforeNavigate, goto } from "$app/navigation";

	import Navigation from "$lib/components/Navigation.svelte";
	let path = $state();

	let { children } = $props();

	import { preview, setPreview } from "$lib/preview.svelte.js";

	import "$lib/styles/main.scss";

	let transitioningOut = $state(false);
	let navigationTimeout; // delay in (ms)

	$effect(() => {
		path = $page.url.pathname;
		document.body.dataset.path = path;
		// document.body.dataset.transitioning = transitioningOut ? "true" : "false";
	});

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
			console.log("🛑 Pause page routing", navigation.to.url.pathname);
			transitioningOut = true;
			document.body.dataset.transitioning = transitioningOut;
			navigation.cancel();

			setTimeout(async () => {
				await goto(navigation.to.url.pathname);
				console.log(`🟢 Navigating to ${navigation.to.url.pathname}`);

				transitioningOut = false;
				document.body.dataset.transitioning = transitioningOut;
			}, navigationTimeout);
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<figure class="preview">
	<img
		src={preview.project.cover ? preview.project.cover.src : null}
		srcset={preview.project.cover ? preview.project.cover.srcset : null}
		alt={preview.project.cover ? preview.project.cover.alt : null}
	/>
	<figcaption>{preview.project.title ?? null}</figcaption>
</figure>

<Navigation {path} />

{@render children?.()}

<style lang="scss">
	.preview {
		/* defaults for preview */
		filter: blur(40px);
		pointer-events: none;

		figcaption {
			opacity: 0;
		}

		img {
			// background-color: black;
		}
	}
	:global([data-transitioning="false"]) {
		.preview {
			animation: fadeOutBlockout 1500ms cubic-bezier(0.85, 0.09, 0.15, 0.91) forwards;
		}
	}
	:global([data-transitioning="true"]) {
		.preview {
			animation: fadeInBlockout 500ms cubic-bezier(0.85, 0.09, 0.15, 0.91) forwards;
		}
	}
</style>
