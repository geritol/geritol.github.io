<script lang="ts">
	import Bio from './Bio.svelte';
	import type { Snippet } from 'svelte';
	let props: { title: string; date: string; children: Snippet<[]> | undefined } = $props();
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
