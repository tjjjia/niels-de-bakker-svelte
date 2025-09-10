<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";
	
	import CloseButton from "$lib/components/CloseButton.svelte";
	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<header class="experiment--header">
	<h1>{data.title}</h1>
	<CloseButton href="/experiments" title="Back to Experiments" />
</header>

<main class="experiment--content">
	<KirbyLayout layouts={data.content} />
</main>

