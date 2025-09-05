<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";
	
	import KirbyLayout from "$lib/components/KirbyLayout.svelte";
</script>

<h1>{data.title}</h1>
<main class="experiment--content">
	<KirbyLayout layouts={data.content} />
</main>