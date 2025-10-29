<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();

	// const experiments = data.experiments.experiments;
	let experiments = data.experiments;
	let experiments_by_tag = data.experiments_by_tag;
	let experiments_by_category = data.experiments_by_category;
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>

<main class="page--experiments">
	<ul class="experiments--list auto-cols wide">
		{#each experiments_by_category as category}
			<section id={category.title}>
				<h2>{category.title}</h2>
				{#each category.experiments as experiment}
					<li class="article">
						<a href={"/"+experiment.id}>{experiment.title}</a>
						<!-- <sup class="article__tags">{experiment.tags}</sup> -->
					</li>
				{:else}
					<p>No experiments yet</p>
				{/each}
			</section>
		{:else}
			<p>No experiments yet.</p>
		{/each}
	</ul>
</main>

<style>
	.experiments--list {
		h2 {
			color: color-mix(in srgb, 0% var(--bg), 40% var(--fg));
			font-weight: 200;
		}
	}
	li.article {
		font-weight: 300;
		.article__tags {
			font-size: 1.25rem;
			color: color-mix(in srgb, 0% var(--bg), 40% var(--fg));
			font-weight: 100;
		}
	}

	@media only screen and (max-width: 450px) {
	}
	@media only screen and (min-width: 450px) {
		section {
			margin-top: 0.75rem;
		}
	}
</style>
