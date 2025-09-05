<script>
	/* Text
	based on Kirby implementation
	https://getkirby.com/docs/reference/panel/blocks/code

	*/

	export let block = {
		content: {
			code: "",
			language: "text"
		},
		id: "",
		isHidden: true,
		type: "code"
	};

	const { code, language } = block.content;
</script>

{#if !block.isHidden}
	<pre>
		<code class="language-{language}">
			{code}
		</code>
	</pre>
{/if}
