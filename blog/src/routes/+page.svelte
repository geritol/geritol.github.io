<script>
	let { data } = $props();
</script>

<svelte:head>
	<title>Geri's Notes</title>
</svelte:head>

<h1>Blog</h1>

<ul>
	{#each data.posts as post}
		<li>
			<h2>
				<a href={post.path}>
					{post.meta.title}
				</a>
			</h2>
			Published {post.meta.date}
			{#if post.meta.description}
				<p>{post.meta.description}</p>
			{/if}
		</li>
	{/each}
</ul>
