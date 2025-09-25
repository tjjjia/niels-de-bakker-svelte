<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	// const experiments = data.experiments.experiments;
	let experiments = data.experiments;
	let experiments_by_tag = data.experiments_by_tag;
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="page--experiments">
	<ul class="experiments--list">
		{#each experiments_by_tag as tag}
			<section id={tag.title}>
				<h2>{tag.title}</h2>
				{#each tag.experiments as experiment}
					<li class="article"><a href={experiment.id}>{experiment.title}</a></li>
				{:else}
					<p>No experiments found.</p>
				{/each}
			</section>
		{:else}
			<p>No experiments found.</p>
		{/each}
	</ul>
</main>

<style>
	.experiments--list {
		section {
			margin-bottom: 0.75rem;
		}
		h2 {
			color: color-mix(in srgb, 0% var(--bg), 30% var(--fg));
			font-weight: 200;
		}
	}
	li.article {
		font-weight: 300;
	}
</style>
