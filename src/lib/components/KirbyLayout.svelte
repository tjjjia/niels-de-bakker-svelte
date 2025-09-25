<script>
	/* Video
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/video

	*/
	import BlockHeading from "$lib/components/blocks/BlockHeading.svelte";
	import BlockImage from "$lib/components/blocks/BlockImage.svelte";
	import BlockGallery from "$lib/components/blocks/BlockGallery.svelte";
	import BlockText from "$lib/components/blocks/BlockText.svelte";
	import BlockCode from "$lib/components/blocks/BlockCode.svelte";
	import BlockVideo from "$lib/components/blocks/BlockVideo.svelte";

	let { layouts } = $props();

	function fraction2span(fractionStr) {
		const fractions = {
			"1/1": 12,
			"3/4": 9,
			"2/3": 8,
			"1/2": 6,
			"1/3": 4,
			"1/4": 3
		};

		return fractions[fractionStr] ?? 2;
	}

	let allFootnotes = $state([]);

	function handleFootnotes(footnotes) {
		allFootnotes = [...allFootnotes, ...footnotes];
		console.log(footnotes);
	}
</script>

{#each layouts as layout}
	<section class="{layout.class} grid" id={layout.id}>
		{#each layout.columns as column}
			<div class="column" id={column.id} style="--span:{fraction2span(column.width)}">
				{#each column.blocks as block}
					{#if block.type === "heading"}
						<BlockHeading {block} />
					{:else if block.type === "text"}
						<BlockText {block} />
					{:else if block.type === "code"}
						<BlockCode {block} />
					{:else if block.type === "video"}
						<BlockVideo {block} />
					{:else if block.type === "image"}
						<BlockImage {block} />
					{:else if block.type === "gallery"}
						<BlockGallery {block} />
					{:else}
						<pre class="debug">(unsupported block.type: {block.type})</pre>
					{/if}
				{/each}
			</div>
		{/each}
	</section>
{/each}

<style>
	section {
		margin-top: 1rem;
	}
</style>
