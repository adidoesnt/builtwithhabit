<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';
	import type { PageServerData } from './$types';
	import PackagesAccordion from './components/PackagesAccordion.svelte';
	import PackagesTable from './components/PackagesTable.svelte';

	const {
		packages: { learnMore }
	} = config;

	const { data }: { data: PageServerData } = $props();
	const { packages } = data;
</script>

<div class="bg-light-green grid h-full min-h-[100dvh] w-full place-items-center">
	<div class="container mx-auto flex h-full flex-col justify-start gap-4 overflow-x-auto p-4">
		<LogoHeader linkToHome altColors />

		<div class="flex flex-col gap-4 p-4">
			<h1 class="font-headings text-olive text-4xl font-bold">Packages</h1>
			<p class="font-body text-olive text-md md:text-lg">
				{learnMore.introduction}
			</p>
			<p class="font-body text-olive text-md md:text-lg hidden md:block">
				{learnMore.tableDescription}
			</p>
			<p class="font-body text-olive text-md md:text-lg block md:hidden">
				{learnMore.accordionDescription}
			</p>
			<PackagesTable {packages} />
			<PackagesAccordion {packages} />
		</div>
	</div>
</div>
