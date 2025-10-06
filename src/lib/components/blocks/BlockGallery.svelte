<script>
	/* Gallery
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/gallery

	*/
	export let block = {
		content: [],
		id: "",
		isHidden: false,
		type: "gallery",
		caption: ""
	};

	const caption = block.caption;
	const images = block.content;
	const crop = images[0].crop ?? false;
	const ratio = images[0].ratio ?? "auto";

	/* Photoswipe code
	https://photoswipe.com/getting-started/

	*/
	import { onMount } from "svelte";
	import PhotoSwipeLightbox from "photoswipe/lightbox";
	import "photoswipe/style.css";

	onMount(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: ".pswp-gallery",
			children: ".pswp-gallery--item",
			pswpModule: () => import("photoswipe")
		});
		lightbox.on("uiRegister", function () {
			lightbox.pswp.ui.registerElement({
				name: "custom-caption annotation medium",
				order: 9,
				isButton: false,
				appendTo: "root",
				html: "Caption text",
				onInit: (el, pswp) => {
					lightbox.pswp.on("change", () => {
						const currSlideElement = lightbox.pswp.currSlide.data.element;
						let captionHTML = "";
						if (currSlideElement) {
							const hiddenCaption = currSlideElement.querySelector(".hidden-caption-content");
							if (hiddenCaption) {
								// get caption from element with class hidden-caption-content
								captionHTML = hiddenCaption.innerHTML;
							} else {
								// get caption from alt attribute
								captionHTML = currSlideElement.querySelector("img").getAttribute("data-caption");
							}
						}
						el.innerHTML = captionHTML || "";
					});
				}
			});
		});

		lightbox.init();
	});
</script>

{#if !block.isHidden}
	<figure class="image-gallery" data-ratio={ratio} data-crop={crop}>
		<div class="auto-cols slim pswp-gallery test">
			{#each images as image}
				<div class="pswp-gallery--item">
					<a
						href={image.src}
						data-pswp-width={image.width}
						data-pswp-height={image.height}
						target="_blank"
					>
						<img
							alt={image.alt}
							data-caption={image.caption}
							data-sizes="auto"
							src={image.src}
							srcset={image.srcset}
							data-srcset={image.srcset}
							width={image.width}
							height={image.height}
						/>
					</a>
				</div>
			{/each}
		</div>

		{#if caption}
			<figcaption>{caption}</figcaption>
		{/if}
	</figure>
{/if}
