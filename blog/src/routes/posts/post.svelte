<script lang="ts">
	import BlogPost from '../../components/BlogPost.svelte';
	let props = $props();
</script>

<svelte:head>
	<title>Geri's Notes - {props.title}</title>
</svelte:head>

<BlogPost {...props} />
