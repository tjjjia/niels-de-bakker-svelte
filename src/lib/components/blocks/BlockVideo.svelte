<script>
	/* Video
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/video

	*/

	export let block = {
		content: {
			location: "",
			video: "",
			url: "",
			autoplay: false,
			controls: false,
			loop: false,
			muted: false,
			playsinline: false,
			poster: "",
			preload: "auto",
			caption: ""
		},
		type: "video",
		isHidden: false
	};

	let url = block.content.url;
	let src;
	const isVimeo = url.toLowerCase().includes("vimeo");
	const isYoutube = url.toLowerCase().includes("youtu");

	let attrs = {};
	let query;

	if (block.content.location === "kirby" && block.content.video) {
		url = block.content.video; // URL is already resolved in JSON output
		attrs = {
			autoplay: block.content.autoplay,
			controls: block.content.controls,
			loop: block.content.loop,
			muted: block.content.muted || block.content.autoplay,
			playsinline: block.content.autoplay,
			poster: block.content.poster || undefined,
			preload: block.content.preload
		};
	} else if (block.content.location === "web") {
		if (isVimeo === true) {
			const match = url.match(/vimeo\.com\/(\d+)/);
			block.content.video = match ? match[1] : null;

			query = new URLSearchParams({
				autoplay: (block.content.autoplay === true || block.content.autoplay === "true") ? "1" : "0",
				controls: (block.content.controls === true || block.content.controls === "true") ? "1" : "0",
				loop: (block.content.loop === true || block.content.loop === "true") ? "1" : "0",
				muted: (block.content.muted === true || block.content.muted === "true") ? "1" : "0",
				playsinline: (block.content.playsinline === true || block.content.playsinline === "true") ? "1" : "0",
			});

			src = `https://player.vimeo.com/video/${block.content.video}?${query.toString()}`;
		} else if (isYoutube === true) {
			block.content.video = url.match(
				/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
			);
		}
	}
</script>

{#if !block.isHidden && url}
	<section class="block">
		{src}
		{block.content.autoplay}
		<figure>
			{#if isVimeo}
				<iframe
					{src}
					frameborder="0"
					allow="autoplay; fullscreen; picture-in-picture"
					allowfullscreen
					title={block.content.caption || "Vimeo video"}
				></iframe>
			{:else if isYoutube}
				unsupported video provider
			{/if}
			<figcaption>{block.content.caption}</figcaption>
		</figure>
	</section>
{/if}
