<script lang="ts">
	import config from '$lib/config';

	const { site } = config;
	const { splitName, caption, logo } = site;
</script>

<div class="flex w-full md:w-fit md:gap-4 md:justify-center justify-between items-center">
	<img src={logo} alt="logo" class="w-24 md:w-40 h-auto mix-blend-multiply" />
	<div class="border-l-2 border-light-brown h-full"></div>
	<div class="flex flex-col gap-2">
		<h1 class="font-headings text-2xl md:text-4xl font-bold">
			<span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
				>{splitName[1]}</span
			><span class="text-dark-brown">{splitName[2]}.</span>
		</h1>
		<p class="font-body flex self-start text-sm text-light-brown">{caption}</p>
	</div>
</div>
