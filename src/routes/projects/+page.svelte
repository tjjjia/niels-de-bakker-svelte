<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	const projects = data.projects.projects;
	console.log(projects);
</script>

<h1>Projects</h1>
<ol>
	{#each projects as project}
		<li>
			{project.title}
		</li>
	{/each}
</ol>
