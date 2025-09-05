<script>
	/* Heading
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/image
	
	*/

	export let block = {
		content: {
			alt: "",
			caption: "",
			crop: "",
			link: "",
			ratio: "",
			src: null,
			srcset: null
		},
		id: "",
		isHidden: true,
		type: "image"
	};

	const { alt, caption, crop, link, ratio, src, srcset } = block.content;
</script>

{#if !block.isHidden}
	<section class="block">
		<figure>
			{#if link}
				<a href={link} target="_blank">
					<img {src} {alt} {srcset} />
				</a>
			{:else}
				<img {src} {alt} {srcset} />
			{/if}

			{#if caption}
				<figcaption>{caption}</figcaption>
			{/if}
		</figure>
	</section>
{/if}

<style>
	figure {
		display: flex;
		justify-content: center;
	}
</style>
