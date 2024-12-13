<script lang="ts">
	import '../app.css';
	import 'github-markdown-css/github-markdown-dark.css';
	let { children } = $props();
</script>

<div class="markdown-body">{@render children()}</div>

<style>
	:global(body) {
		background-color: #0d1117;
	}
	.markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
</style>
