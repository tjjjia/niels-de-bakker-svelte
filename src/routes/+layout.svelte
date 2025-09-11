<script>
	import favicon from "$lib/assets/favicon.svg";

	import { page } from "$app/stores";
	import { afterNavigate } from "$app/navigation";

	let path = $state($page.url.pathname);
	afterNavigate(() => {
		path = $page.url.pathname;
	});

	import "$lib/styles/main.scss";
	import Navigation from "$lib/components/Navigation.svelte";

	

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navigation {path} />


{@render children?.()}

<style>
</style>
