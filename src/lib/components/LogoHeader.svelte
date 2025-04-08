<script lang="ts">
	import config from '$lib/config';

	const { linkToHome = false, altColors = false } = $props();

	const { site } = config;
	const { splitName, caption, logo } = site;

	const textColor = altColors ? 'text-olive' : 'text-dark-brown';
	const secondaryTextColor = altColors ? 'text-light-olive' : 'text-light-brown';
</script>

<div class="flex w-full items-center justify-between md:w-fit md:justify-center md:gap-8">
	{#if linkToHome}
		<a href="/">
			<img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
		</a>
	{:else}
		<img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
	{/if}
	<div class="flex flex-col gap-2">
		<h1 class="font-headings text-2xl font-bold md:text-4xl">
			<span class={textColor}>{splitName[0]}</span><span class={secondaryTextColor}>{splitName[1]}</span
			><span class={textColor}>{splitName[2]}.</span>
		</h1>
		<p class={`font-body flex self-start text-sm ${textColor}`}>{caption}</p>
	</div>
</div>
