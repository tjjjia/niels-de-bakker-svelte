<script>
	let { path } = $props();
</script>

<nav id="menu--pages" class="menu">
	<ul id="menu--pages-list">
		<li class="menu--item" id="projects">
			<a href="/projects" aria-current={path === "/projects" ? "page" : undefined}>projects</a>
		</li>
		<li class="menu--item" id="about">
			<a href="/about" aria-current={path === "/about" ? "page" : undefined}
				><span class="dot">about</span></a
			>
		</li>
		<li class="menu--item" id="experiments">
			<a href="/experiments" aria-current={path === "/experiments" ? "page" : undefined}
				>experiments</a
			>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		width: 100%;

		font-size: 2rem;

		ul {
			display: flex;
			justify-content: space-between;
			transition: transform 0.3s ease;
			transform: rotateX(0deg);
		}
		a {
			display: flex;
			transform: rotateX(180deg);
			transition: transform 0.3s ease;
			color: inherit;
			text-decoration: none;
		}
	}

	nav a[aria-current="page"] {
		transform: rotateX(0deg);
	}
	.menu--item {
		text-transform: capitalize;
		line-height: 1;
	}
	#projects {
		font-family: var(--font-mono);
		font-weight: 300;
	}
	#about {
		align-self: center;
		display: flex;
		.dot {
			height: 1.5rem;
			width: 1.5rem;
			background-color: transparent;
			border: 0.2rem solid var(--fg);
			border-radius: 50%;
			display: flex;
			font-size: 0; // hide accessibility text
		}
	}
	#experiments {
		font-weight: 300;
	}

	/* Transitions */
	nav {
		opacity: 1;
		transition: opacity 800ms;
	}
	:global([data-scrolldirection="down"]) {
		nav {
			opacity: 0;
		}
	}
</style>
