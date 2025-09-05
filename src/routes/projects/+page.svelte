<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects;
	console.log(data);
</script>

<main class="page--projects">
	<ul class="projects--list">
		{#each projects as project}
			<li class="article">
				<a href={project.id} title={project.title}>{project.title}</a>
				<img class="background-image" src={project.cover.thumbnail} alt={project.cover.alt} />
			</li>
		{/each}
	</ul>
</main>
