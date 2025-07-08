<script lang="ts">
	import { goto } from '$app/navigation';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';
	import Back from '$lib/icons/Back.svelte';
	import type { PageServerData } from './$types';
	import PackagesAccordion from './components/PackagesAccordion.svelte';
	import PackagesTable from './components/PackagesTable.svelte';

	const {
		packages: { learnMore }
	} = config;

	const { data }: { data: PageServerData } = $props();
	const { packages } = data;

	const handleBackToTraining = () => {
		goto('/training');
	};
</script>

<div class="bg-beige grid h-full min-h-[100dvh] w-full place-items-center">
	<div class="container mx-auto flex flex-col justify-start gap-4 overflow-x-auto p-4">
		<LogoHeader linkToHome />

		<div class="flex flex-col gap-4 p-4">
			<h1 class="font-headings text-dark-brown text-4xl font-bold">Packages</h1>
			<p class="font-body text-dark-brown text-md md:text-lg">
				{learnMore.introduction}
			</p>
			<p class="font-body text-dark-brown text-md hidden md:block md:text-lg">
				{learnMore.tableDescription}
			</p>
			<p class="font-body text-dark-brown text-md block md:hidden md:text-lg">
				{learnMore.accordionDescription}
			</p>
			<PackagesTable {packages} />
			<PackagesAccordion {packages} />

			<button
				onclick={handleBackToTraining}
				class="font-body text-dark-brown flex items-center gap-2 text-lg font-bold hover:underline mt-4 self-start"
			>
				<Back />
				Back to Training Page
			</button>
		</div>
	</div>
</div>
