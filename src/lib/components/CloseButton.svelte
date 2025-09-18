<script>
	 // previously "&#x2715"
	let { href, text = "&#x2715", title } = $props(); // instead of `export let`
</script>

<a {href} {title} class="button--close">{@html text}</a>

<style>
	.button--close {
		/* positioning */
		position: absolute;
		top: 0;
		right: 0;

		/* appearance */
		font-size: 1.5rem;
		text-decoration: none;
		color: var(--fg);
	}
</style>
