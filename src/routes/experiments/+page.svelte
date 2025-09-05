<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();


	// const experiments = data.experiments.experiments;
	let experiments = data.experiments;
	let experiments_by_tag = data.experiments_by_tag;
</script>

<main class="page--experiments">
	<ul class="experiments--list">
		{#each experiments_by_tag as tag}
			<h2>{tag.title}</h2>
			{#each tag.experiments as experiment}
				<li class="article"><a href={experiment.id}>{experiment.title}</a></li>
			{:else}
				<p>No experiments found.</p>
			{/each}
		{:else}
			<p>No experiments found.</p>
		{/each}
	</ul>
</main>