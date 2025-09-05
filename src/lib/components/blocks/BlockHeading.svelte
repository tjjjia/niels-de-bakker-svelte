<script>
	/* Heading
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/heading
	
	*/

	export let block = {
		content: {
			level: "h2",
			text: ""
		},
		id: "",
		isHidden: true,
		type: "heading"
	};

	const { level, text } = block.content;

	console.log( block);

</script>

{#if !block.isHidden}
	<section class="block">
		<svelte:element
			this={level}
			class:text--sans-large={level === "h2"}
			class:text--mono-medium={level === "h3"}
			class:text--uppercase={level === "h3"}
		>
			{text}
		</svelte:element>
	</section>
{/if}
