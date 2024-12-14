<script lang="ts">
	import type { Snippet } from 'svelte';
	import BlogPost from '../../components/BlogPost.svelte';
	let props: { title: string; date: string; children: Snippet<[]> | undefined } = $props();
</script>

<svelte:head>
	<title>Geri's Notes - {props.title}</title>
</svelte:head>

<BlogPost {...props} />
