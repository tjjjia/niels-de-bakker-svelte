<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects;

	let previewProject = $state();
	let previewImageElement = $state();

	import { setPreview } from "$lib/preview.svelte";

	/*
	One transition at a time
	*/
	let effectInProgress = false; // boolean, stops routine if true
	let throttlingInterval = 250; // interval in ms
	let pendingElement = null; // last element hovered
	let currentlyOut = true; // is the mouse still hovering over an element?

	function handleMouseEnter(element) {
		currentlyOut = false;
		if (effectInProgress) {
			pendingElement = element;
			return; // block new animations
		}

		effectInProgress = true;
		const activeElement = element;
		element.classList.add("fade-in");

		setTimeout(() => {
			effectInProgress = false;

			if (currentlyOut) return; // don't reactivate last element if we are out
			if (pendingElement && pendingElement !== activeElement) {
				const next = pendingElement;
				pendingElement = null;
				handleMouseEnter(next);
			}
		}, throttlingInterval);
	}
	function handleMouseLeave(element) {
		currentlyOut = true;
		element.classList.remove("fade-in");
		element.classList.add("fade-out");
		element.addEventListener(
			"animationend",
			() => {
				element.classList.remove("fade-out");
			},
			{ once: true }
		);
	}
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="page--projects">
	<ul class="projects--list">
		{#each projects as project, index}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<li
				class="article"
				onmouseleave={(e) => handleMouseLeave(e.currentTarget)}
				onmouseenter={(e) => {
					handleMouseEnter(e.currentTarget);
					setPreview(project);
				}}
			>
				<a href={project.id} title={project.title}>{project.title}</a>
				<img class="background-image" src={project.cover.thumbnail} alt={project.cover.alt} />
			</li>
		{/each}
	</ul>
</main>

<style>
	.projects--list li.article {
		font-family: var(--font-mono);
		font-weight: 100;
		font-size: 2.35rem;
	}

	:global(.fade-in) {
		/* text-indent: 1rem; */
	}

	:global(.fade-in) .background-image {
		animation: fadeIn var(--duration-long) cubic-bezier(0.85, 0.09, 0.15, 0.91) forwards;
	}
	:global(.fade-out) .background-image {
		animation: fadeOut var(--duration-long) var(--easing-inout) forwards;
	}
</style>
