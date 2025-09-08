<script>
	/* Gallery
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/gallery

	*/

	export let block = {
		content: [],
		id: "",
		isHidden: false,
		type: "gallery"
	};

	const images = block.content;
</script>

{#if !block.isHidden}
	<figure>
		<ul>
			{#each images as image}
				<li><img src={image.src} alt={image.alt} srcset={image.srcset} /></li>
			{/each}
		</ul>
	</figure>
{/if}
