<script lang="ts">
	let socials = [
		{ name: 'github', url: `https://github.com/geritol` },
		{ name: 'linkedin', url: `https://www.linkedin.com/in/gergo-tolnai/` },
		{ name: 'codewars', url: `https://www.codewars.com/users/geritol` },
		{ name: 'ossu', url: `https://geritol.github.io/ossu/` }
	];
</script>

{#snippet social(siteName: string, siteUrl: string)}
	<a href={siteUrl} target="_blank" rel="noopener noreferrer">
		{siteName}
	</a>
{/snippet}

<div class="flex place-content-between">
	<p>Written by Gergo Tolnai</p>
	<div class="ml-4 flex gap-2">
		{#each socials as s}
			{@render social(s.name, s.url)}
		{/each}
	</div>
</div>
