<script lang="ts">
	import Bio from './Bio.svelte';
	let props = $props();
</script>

<article class="blog-post" itemScope itemType="http://schema.org/Article">
	<header>
		<h1 itemProp="headline">{props.title}</h1>
		<p>{props.date}</p>
	</header>
	<section itemProp="articleBody">
		{@render props.children?.()}
	</section>
	<hr />
	<footer>
		<Bio />
	</footer>
</article>
