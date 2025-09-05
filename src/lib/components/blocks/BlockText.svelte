<script>
	/* Text
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/text

	*/

	export let block = {
		content: {
			text: ""
		},
		id: "",
		isHidden: true,
		type: "heading"
	};

	const { text } = block.content;
</script>

{#if !block.isHidden}
	<div class="block">{@html text}</div>
{/if}
