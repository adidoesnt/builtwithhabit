<script lang="ts">
	import Packages from '$lib/components/Packages/Packages.svelte';
	import config from '$lib/config';
	import type { PageServerData } from './$types';

	const { description } = config.packages;
	const { data }: { data: PageServerData } = $props();

	const { packages } = data;
</script>

<div class="flex bg-beige min-h-[calc(100dvh-8rem)] md:min-h-[calc(100dvh-12rem)] w-full flex-col items-center justify-center md:p-4">
	<Packages {description} {packages} showReschedulingInfo />
</div>
