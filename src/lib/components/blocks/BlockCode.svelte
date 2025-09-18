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
  import {HighlightAuto} from "svelte-highlight";
  // import Highlight from "svelte-highlight";
  // import typescript from "svelte-highlight/languages/typescript";
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
		font-family: "fragment mono", var(--font-mono);
	}
</style>