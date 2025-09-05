<script>
	/* Video
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/video

	*/
	import BlockHeading from "$lib/components/blocks/BlockHeading.svelte";
	import BlockImage from "$lib/components/blocks/BlockImage.svelte";
	import BlockText from "$lib/components/blocks/BlockText.svelte";
	import BlockCode from "$lib/components/blocks/BlockCode.svelte";
	import BlockVideo from "$lib/components/blocks/BlockVideo.svelte";

	let {layouts} = $props();

	function fraction2span(fractionStr) {
		const fractions = {
			"1/1": 12,
			"3/4": 9,
			"2/3": 8,
			"1/2": 6,
			"1/3": 4,
			"1/4": 3,
		}

		return fractions[fractionStr] ?? 2;
	}


	let allFootnotes = $state([]);

	function handleFootnotes(footnotes) {
		allFootnotes = [...allFootnotes, ...footnotes];
		console.log(footnotes)
	}
</script>


{#each layouts as layout}
	<section class="grid" id={layout.id}>
		{#each layout.columns as column}
			<div
				class="column"
				id={column.id}
				style="--span:{fraction2span(column.width)}"
			>
			<pre class="debug">{column.width}</pre>
				{#each column.blocks as block}
					{#if block.type === "heading"}
						<pre class="debug">heading: implemented</pre>
						<BlockHeading {block} />
					{:else if block.type === "text"}
						<pre class="debug">text: implemented, footnotes not ready.</pre>
						<BlockText {block} />
					{:else if block.type === "code"}
						<pre class="debug">code: implemented, syntax highlighting not ready</pre>
						<BlockCode {block} />
					{:else if block.type === "video"}
						<pre class="debug">video: not ready</pre>
						<BlockVideo {block} />
					{:else if block.type === "image"}
						<pre class="debug">image:</pre>
						<BlockImage {block} />
					{:else}
						<pre class="debug">(unsupported block.type: {block.type})</pre>
					{/if}
				{/each}
			</div>
		{/each}
	</section>
{/each}
