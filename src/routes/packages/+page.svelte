<script lang="ts">
	import Packages from '$lib/components/Packages/Packages.svelte';
	import config from '$lib/config';
	import type { PageServerData } from './$types';

	const { description } = config.packages;
	const { data }: { data: PageServerData } = $props();

	const { packages } = data;
</script>

<Packages {description} {packages} showReschedulingInfo />
