<script>
	// previously "&#x2715"
	let { href, text = "&#x2715", title } = $props(); // instead of `export let`
</script>

<a {href} {title} class="button--close">{@html text}</a>

<style>
	.button--close {
		font-size: 1.5rem;
		text-decoration: none;
		color: var(--fg);
		margin-left: auto; /* pushes button to the right */
		flex: 0 0 auto; /* width is just the text */
	}
</style>
