<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects;

	let previewProject = $state();
	let previewImageElement = $state();

	import { setPreview } from "$lib/preview.svelte";
</script>

<main class="page--projects">
	<ul class="projects--list">
		{#each projects as project}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<li class="article" onmouseenter={() => setPreview(project)}>
				<a href={project.id} title={project.title}>{project.title}</a>
				<img class="background-image" src={project.cover.src} alt={project.cover.alt} />
			</li>
		{/each}
	</ul>
</main>

<style lang="scss">

</style>