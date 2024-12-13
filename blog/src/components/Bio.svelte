<script lang="ts">
	let socials = [
		{ name: 'github', url: `https://github.com/geritol` },
		{ name: 'linkedin', url: `https://www.linkedin.com/in/gergo-tolnai/` },
		{ name: 'codewars', url: `https://www.codewars.com/users/geritol` },
		{ name: 'ossu', url: `https://geritol.github.io/ossu/` }
	];
</script>

{#snippet social(siteName: string, siteUrl: string)}
	<a href={siteUrl} target="_blank" rel="noopener noreferrer" class="social">
		{siteName}
	</a>
{/snippet}

<div class="flex">
	<p>
		Written by <strong>Gergo Tolnai</strong> who lives and works in Budapest
	</p>
	{#each socials as s}
		{@render social(s.name, s.url)}
	{/each}
</div>

<style>
	.social {
		display: inline-block;
		padding: 0 5px 0 5px;
		margin-bottom: 3px;
		margin-right: 5px;
		color: #0366d6;
		box-shadow: none;
	}

	a.social {
		background-color: rgba(251, 251, 123, 0.58);
		transition-duration: 0.5s;
	}

	a.social:hover {
		text-decoration: underline;
		background-color: rgba(251, 251, 123, 0.88);
	}
</style>
