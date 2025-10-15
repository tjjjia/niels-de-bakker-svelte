<script>
	import { page } from "$app/state";

	let path = $state(page.url.pathname);
	$effect(() => {
		path = page.url.pathname;
		const themeValue = getValue(path);
		document.body.dataset.theme = getValue(path);
	});

	function getValue(path) {
		return path.split("/").filter(Boolean)[0]; // gets part between first 2 slashes "/"
	}

	const handleMouseEnter = function () {
		// set to temp
		const tempValue = getValue(this.pathname);
		document.body.dataset.temporary = tempValue;
	};
	const handleMouseLeave = function () {
		// set back to default
		document.body.removeAttribute("data-temporary");
	};
</script>

<nav id="menu--pages" class="menu">
	<ul id="menu--pages-list">
		<li class="menu--item" id="projects">
			<a
				href="/projects"
				aria-current={path === "/projects" ? "page" : false}
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				projects</a
			>
		</li>
		<li class="menu--item" id="about">
			<a
				href="/about"
				aria-current={path === "/about" ? "page" : false}
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				<span class="dot">about</span>
			</a>
		</li>
		<li class="menu--item" id="experiments">
			<a
				href="/experiments"
				aria-current={path === "/experiments" ? "page" : false}
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				experiments
			</a>
		</li>
	</ul>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		top: 0;
		width: 100vw;
		font-size: clamp(1.6rem, 2.3vw, 4rem);

		ul {
			display: flex;
			justify-content: space-between;
			transition: transform var(--duration-normal) ease;
			transform: rotateX(0deg);
		}
		a {
			display: flex;
			transform: rotateX(180deg);
			transition: transform var(--duration-normal) ease;
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
			background-color: transparent;
			border-radius: 50%;
			display: flex;
			height: clamp(1.3rem, 2vw, 4rem);
			width: clamp(1.3rem, 2vw, 4rem);
			border: clamp(0.15rem, 0.3vw, 0.5rem) solid var(--fg);
			font-size: 0; // hide accessibility text
		}
	}
	#experiments {
		font-weight: 300;
	}

	/* Transitions */
	nav {
		opacity: 1;
		transition: opacity var(--duration-long);
	}
	:global([data-scrolldirection="down"]) {
		nav {
			opacity: 0;
			pointer-events: none;
		}
	}

	@media only screen and (max-width: 450px) {
	}
	@media only screen and (min-width: 450px) {
	}
</style>
