<script lang="ts">
	import config from '$lib/config';

	const { site } = config;
	const { splitName, caption, logo } = site;
</script>

<div
	class="mb-8 flex w-full flex-col items-start justify-center md:mb-0 md:w-fit md:flex-row md:items-center md:gap-4"
>
	<img src={logo} alt="logo" class="flex h-auto w-36 self-center mix-blend-multiply md:w-40" />
	<div class="border-light-brown hidden h-full border-l-2 md:block"></div>
	<div class="flex flex-col gap-2">
		<h1 class="font-headings text-2xl font-bold md:text-4xl">
			<span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
				>{splitName[1]}</span
			><span class="text-dark-brown">{splitName[2]}.</span>
		</h1>
		<p class="font-body text-light-brown flex self-start text-sm">{caption}</p>
	</div>
</div>
