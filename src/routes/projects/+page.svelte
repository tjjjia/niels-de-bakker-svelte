<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects;

	import { preview, setPreview, pushPreview, clearPreview } from "$lib/preview.svelte.js";

	let hoverTimeout;

	function delayedPreview(src) {
		hoverTimeout = setTimeout(() => {
			console.log("timeout passed!")
			pushPreview(src);
		}, 80);
	}

	function cancelPreview() {
		console.log("too fast!")
		clearTimeout(hoverTimeout);
	}
</script>

<main class="page--projects">
	<ul class="projects--list">
		{#each projects as project}
			<li
				class="article"
				onmouseenter={() => delayedPreview(project.cover.src)}
				onmouseleave={cancelPreview}
			>
				<a href={project.id} title={project.title}>{project.title}</a>
				<img class="background-image" src={project.cover.thumbnail} alt={project.cover.alt} />
			</li>
		{/each}
	</ul>
</main>
