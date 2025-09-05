<script>
	/* Gallery
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/gallery

	*/

	export let block = {
		content: {
			caption: "",
			crop: false,
			ratio: "auto"
		},
		id: "",
		isHidden: false,
		type: "gallery"
	};

	const { caption, crop, ratio, images, logos } = block.content;
</script>

{#if !block.isHidden}
	<figure data-ratio={ratio} data-crop={crop}>
		<ul>
			{#each images as image}
				<li><img src={image} alt="" /></li>
			{/each}
		</ul>
		{#if caption}
			<figcaption>{caption}</figcaption>
		{/if}
	</figure>
{/if}
