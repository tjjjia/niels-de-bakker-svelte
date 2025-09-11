<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects;

	let previewProject = $state();
	let previewImageElement = $state();
	import gsap from "gsap";
	import { blur } from "svelte/transition";

	function preview(project) {
		previewImageElement.src = project.cover.src;
		previewImageElement.srcset = project.cover.srcset;
		previewImageElement.alt = project.cover.alt;
	}
	function scrollUpdate(){
		console.log( window.scrollY );
		
	}


</script>

<svelte:window {onscroll} />

<figure class="preview">
	<img bind:this={previewImageElement} alt="" />
</figure>

<main class="page--projects">
	<ul class="projects--list">
		{#each projects as project}
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
			<li class="article" onmouseenter={() => preview(project)} onclick={() => activate(project)}>
				<a href={project.id} title={project.title}>{project.title}</a>
				<img class="background-image" src={project.cover.thumbnail} alt={project.cover.alt} />
			</li>
		{/each}
	</ul>
</main>

<style>
	.preview {
		filter: blur(10px);
		transform: scale(1.1);
	}
</style>
