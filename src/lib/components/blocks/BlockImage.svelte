<script>
	/* Heading
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/image
	
	*/

	export let block = {
		content: {
			alt: "",
			caption: "",
			crop: false,
			link: "",
			ratio: "auto",
			src: null,
			srcset: null
		},
		id: "",
		isHidden: true,
		type: "image"
	};

	const { alt, caption, crop, height, link, ratio, src, srcset, width } = block.content;


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
	<section class="block">
		<figure data-ratio={ratio} data-crop={crop}>
			{#if link}
				<div class="link-external">
					<a href={link} target="_blank">
						<img {src} {alt} {srcset} />
					</a>
				</div>
			{:else}
				<div class="auto-cols pswp-gallery">
					<div class="pswp-gallery--item">
						<a href={src} data-pswp-width={width} data-pswp-height={height} target="_blank">
							<img
								{alt}
								data-caption={caption}
								data-sizes="auto"
								{src}
								{srcset}
								data-srcset={srcset}
								{width}
								{height} />
						</a>
					</div>
				</div>
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
