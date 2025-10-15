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
	:global {
		pre,
		code {
			font-family: var(--font-mono);
		}

		code {
			font-size: 1rem;
			max-width: calc(100vw - 2 * var(--body-padding));
		}

		pre {
			margin-block: auto;
		}
	}
</style>
