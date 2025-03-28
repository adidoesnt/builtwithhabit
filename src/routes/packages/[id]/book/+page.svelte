<script lang="ts">
	import type { PageServerData } from './$types';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import Disclaimer from './components/packageAndLocationDetails/Disclaimer.svelte';
	import { address, disclaimerChecked, isValid, resetFormState } from './components/formState';
	import PackageDetails from './components/packageAndLocationDetails/PackageDetails.svelte';
	import LocationDetails from './components/packageAndLocationDetails/LocationDetails.svelte';
	import ProgressBar from './components/ProgressBar.svelte';
	import MockDatePicker from './components/MockDatePicker.svelte';
	import MockCheckout from './components/MockCheckout.svelte';
	import { DatePicker } from './components/datePicker';
	const { data }: { data: PageServerData } = $props();
	const { package: fetchedPackage, locations: availableLocations } = data;

	let page = $state(0);
	let postalCodeValidationInProgress = $state(false);

	const nextPage = () => {
		if (page < 2) {
			page++;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const prevPage = () => {
		if (page > 0) {
			page--;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const onsubmit = (event: Event) => {
		event.preventDefault();
		alert('Booking completed!');
		resetFormState();
	};

	const firstPageNextDisabled = $derived(
		page === 0 && ($address.length === 0 || !$isValid || !$disclaimerChecked)
	);
</script>

<div class="bg-beige min-h-screen p-4 md:p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-8 text-center md:text-start">
			<div class="flex flex-col md:flex-row md:items-center md:justify-between">
				<div>
					<h1 class="font-body text-dark-brown text-3xl font-bold">Book Your Package</h1>
					<p class="font-body text-light-brown mt-2">
						Complete the form below to book the {fetchedPackage.name} package.
					</p>
				</div>
				<a
					href="/packages"
					class="font-body text-dark-brown mt-4 flex items-center gap-2 self-center hover:underline md:mt-0 md:self-start"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
							clip-rule="evenodd"
						/>
					</svg>
					Back to Packages
				</a>
			</div>
		</div>

		<div class="rounded-lg bg-white p-6 shadow-md md:p-8">
			<ProgressBar {page} />
			<form class="flex flex-col" {onsubmit}>
				{#if page === 0}
					<div class="space-y-4">
						<PackageDetails package={fetchedPackage} />
						<LocationDetails {availableLocations} />
						<Disclaimer />
					</div>
				{/if}

				{#if page === 1}
					<DatePicker {fetchedPackage} />
				{/if}

				{#if page === 2}
					<!-- TODO: add Stripe checkout -->
					<MockCheckout {fetchedPackage} />
				{/if}

				<div class="mt-6 flex justify-between">
					{#if page > 0}
						<button
							type="button"
							class="font-body text-dark-brown rounded-md bg-gray-200 px-6 py-2 transition-colors hover:bg-gray-300 disabled:bg-gray-100 disabled:text-gray-400"
							onclick={prevPage}
						>
							Back
						</button>
					{:else}
						<div></div>
					{/if}

					{#if page < 2}
						<button
							type="button"
							class="font-body bg-dark-brown hover:bg-opacity-90 cursor-pointer rounded-md px-6 py-2 text-white transition-colors disabled:bg-gray-100 disabled:text-gray-400"
							onclick={nextPage}
							disabled={postalCodeValidationInProgress || firstPageNextDisabled}
						>
							Next
						</button>
					{:else}
						<button
							type="submit"
							class="font-body bg-dark-brown hover:bg-opacity-90 cursor-pointer rounded-md px-6 py-2 text-white transition-colors disabled:bg-gray-100 disabled:text-gray-400"
							disabled={postalCodeValidationInProgress}
						>
							Complete Booking
						</button>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>
