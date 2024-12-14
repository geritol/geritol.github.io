<script lang="ts">
	import Bio from './Bio.svelte';
	import type { Snippet } from 'svelte';
	import Header from './Header.svelte';
	let props: { title: string; date: string; children: Snippet<[]> | undefined } = $props();
</script>

<Header />

<article class="blog-post" itemScope itemType="http://schema.org/Article">
	<header>
		<h1 itemProp="headline">{props.title}</h1>
		<p>{props.date}</p>
	</header>
	<section itemProp="articleBody">
		{@render props.children?.()}
	</section>
</article>

<hr />
<footer>
	<Bio />
</footer>
