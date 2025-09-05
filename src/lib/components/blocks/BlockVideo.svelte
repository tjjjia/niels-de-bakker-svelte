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
	let attrs = {};

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
	}

	console.log(url, attrs);
</script>

{#if !block.isHidden && url}
	<section class="block">
		<figure>
			{url}
			muted: {block.content.muted}
			autoplay: {block.content.autoplay}
			controls: {block.content.controls}
			<figcaption>{block.content.caption}</figcaption>
		</figure>
	</section>
{/if}
