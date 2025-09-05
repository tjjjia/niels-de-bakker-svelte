<script>
	let { path } = $props();
</script>

<nav id="menu--pages" class="menu">
	<ul id="menu--pages-list">
		<li class="menu--item" id="projects">
			<a href="/projects" aria-current={path === '/projects' ? 'page' : undefined}>projects</a>
		</li>
		<li class="menu--item" id="about">
			<a href="/about" aria-current={path === '/about' ? 'page' : undefined}
				><span class="dot"></span></a
			>
		</li>
		<li class="menu--item" id="experiments">
			<a href="/experiments" aria-current={path === '/experiments' ? 'page' : undefined}
				>experiments</a
			>
		</li>
	</ul>
</nav>

<style>
	.navigation {
		display: flex;
		flex-direction: row;
		width: 100%;
		justify-content: space-between;
	}
</style>
