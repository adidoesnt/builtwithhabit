<script lang="ts">
	import config from '$lib/config';

	const { linkToHome = false, altColors = false } = $props();

	const { site } = config;
	const { splitName, caption, logo } = site;

	const textColor = altColors ? 'text-olive' : 'text-dark-brown';
	const secondaryTextColor = altColors ? 'text-light-olive' : 'text-light-brown';
</script>

<div class="flex w-full items-center justify-center gap-4 md:w-fit md:gap-8">
	{#if linkToHome}
		<a href="/">
			<img src={logo} alt="logo" class="h-auto w-16 mix-blend-multiply md:w-20" />
		</a>
	{:else}
		<img src={logo} alt="logo" class="h-auto w-16 mix-blend-multiply md:w-20" />
	{/if}
	<div class="flex flex-col items-start">
		<h1 class="font-headings text-2xl font-bold md:text-4xl">
			<span class={textColor}>{splitName[0]}</span><span class={secondaryTextColor}
				>{splitName[1]}</span
			><span class={textColor}>{splitName[2]}</span>
		</h1>
		<p class={`font-body flex self-start text-xs md:text-sm ${textColor} italic`}>
			<span>{caption.parts[0]} <span class="font-bold">{caption.parts[1]}</span></span>
		</p>
	</div>
</div>
