<script>
	/** @type {{ data: import('./$types').PageData }} */
	let { data } = $props();

	import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";
	import BlockHeading from "$lib/components/blocks/BlockHeading.svelte";
	import BlockImage from "$lib/components/blocks/BlockImage.svelte";
	import BlockText from "$lib/components/blocks/BlockText.svelte";
</script>

<h1>{data.title}</h1>
<main class="experiment--content">
	{#each data.content as layout}
		<section class="grid" id={layout.id}>
			{#each layout.columns as column}
				<div class="column" style="--span:{()=>{ return null; }}">
					{#each column.blocks as block}
						{#if block.type === "heading"}
							<pre>heading: implemented</pre>
							<BlockHeading {block} />
						{:else if block.type === "text"}
							<pre>text: implemented, footnotes not ready.</pre>
							<BlockText {block} />
						{:else if block.type === "video"}
							<pre>video: not yet implemented</pre>
						{:else if block.type === "image"}
							<pre>image:</pre>
							<BlockImage {block} />
						{:else}
							<pre>(unsupported block.type: {block.type})</pre>
						{/if}
					{/each}
				</div>
			{/each}
		</section>
	{/each}
</main>