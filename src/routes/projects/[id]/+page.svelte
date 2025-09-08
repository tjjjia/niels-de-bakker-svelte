<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<header class="project--header">
  <h1>{data.title}</h1>
  <div class="project--meta-information">
    {@html data.metainformation}
  </div>
</header>

<main class="project--content">
	<KirbyLayout layouts={data.content} />
	{#if data.footnotes}
		{@html data.footnotes}
	{/if}
</main>