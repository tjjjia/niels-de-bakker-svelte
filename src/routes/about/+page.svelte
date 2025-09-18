<script>
	/** @type {import('./$types').PageProps} */
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.author} | {data.title}</title>
</svelte:head>


<main class="page--about">
	<h1>about</h1>
	
	<div class="grid">
		<div class="column" style="--span:6" id="biography">
			{@html data.biography}
		</div>
		<div class="column" style="--span:6" id="contact">
			<ul class="socials">
				<li>{data.email}</li>

				{#each data.social as social}
					<li>
						<a href={social.url} title={social.platform} target="_blank">{social.platform}</a>
					</li>
				{/each}
			</ul>
			<div class="address">
				{@html data.address}
			</div>
		</div>
		<div class="gallery">(gallery)</div>
	</div>
</main>
