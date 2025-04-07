<script lang="ts">
	import config from '$lib/config';

	const { linkToHome = false } = $props();

	const { site } = config;
	const { splitName, caption, logo } = site;
</script>

<div class="flex w-full items-center justify-between md:w-fit md:justify-center md:gap-4">
	{#if linkToHome}
		<a href="/">
			<img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
		</a>
	{:else}
		<img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
	{/if}
	<div class="border-light-brown h-full border-l-2"></div>
	<div class="flex flex-col gap-2">
		<h1 class="font-headings text-2xl font-bold md:text-4xl">
			<span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
				>{splitName[1]}</span
			><span class="text-dark-brown">{splitName[2]}.</span>
		</h1>
		<p class="font-body text-light-brown flex self-start text-sm">{caption}</p>
	</div>
</div>
