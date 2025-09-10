<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<main class="project--content">
	<header class="project--header">
		<h1>{data.title}</h1>
		<div class="project--meta-information">
			{@html data.metainformation}
		</div>
		<CloseButton href="/projects" title="Back to Projects" />
	</header>

<main class="project--content">
	<KirbyLayout layouts={data.content} />
	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>

<style>
	main {
		margin-top: 60vh;
		background-color: var(--bg);
	}
	.project--header {
		position: sticky;
		top: 0;
	}
</style>
