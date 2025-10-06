<script>
	/* Text
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/code

	*/

	export let block = {
		content: {
			code: "",
			language: "text"
		},
		id: "",
		isHidden: true,
		type: "code"
	};

	const { code, language } = block.content;

	// highlighter
	import { HighlightAuto } from "svelte-highlight";
	import theme from "svelte-highlight/styles/github-dark";
</script>

<svelte:head>
	{@html theme}
</svelte:head>

{#if !block.isHidden}
	<HighlightAuto {code} />
{/if}

<style>
	:global(code) {
		font-family: var(--font-mono);
		font-size: 1.1rem;
	}
</style>
