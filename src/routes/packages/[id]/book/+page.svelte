<!-- TODO: add date selection -->
<!-- TODO: add payment -->
<script lang="ts">
	import type { PageServerData } from './$types';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import Disclaimer from './components/packageAndLocationDetails/Disclaimer.svelte';
	import { address, disclaimerChecked, isValid } from './components/packageAndLocationDetails/formState';
	import PackageDetails from './components/packageAndLocationDetails/PackageDetails.svelte';
	import LocationDetails from './components/packageAndLocationDetails/LocationDetails.svelte';
	import ProgressBar from './components/ProgressBar.svelte';
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
	};

	const firstPageNextDisabled = $derived(
		page === 0 &&
			($address.length === 0 || !$isValid || !$disclaimerChecked)
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
					<div>
						<div class="mb-4 text-center">
							<p class="font-body text-dark-brown mb-2">
								Select {fetchedPackage.sessions} dates for your sessions
							</p>
							<p class="font-body text-light-brown text-sm">
								0 of {fetchedPackage.sessions} dates selected
							</p>
						</div>

						<div class="mb-6 rounded-md border border-gray-300 p-6">
							<div class="text-center">
								<h3 class="font-body text-dark-brown mb-4 text-lg font-semibold">
									Calendar Placeholder
								</h3>
								<p class="font-body text-light-brown mb-4">
									This is where the calendar for selecting session dates would appear.
								</p>
								<p class="font-body text-light-brown text-sm">
									Users would be able to select {fetchedPackage.sessions} dates for their training sessions.
								</p>
							</div>
						</div>

						<div class="rounded-md bg-gray-100 p-4">
							<h4 class="font-body text-dark-brown mb-2 font-semibold">Selected Dates:</h4>
							<p class="font-body text-light-brown text-sm italic">No dates selected yet</p>
						</div>
					</div>
				{/if}

				{#if page === 2}
					<div>
						<div class="mb-6">
							<h3 class="font-body text-dark-brown mb-4 text-xl font-semibold">Order Summary</h3>

							<div class="mb-4 rounded-md bg-gray-100 p-4">
								<div class="mb-2 flex justify-between">
									<span class="font-body text-dark-brown">{fetchedPackage.name} Package</span>
									<span class="font-body text-dark-brown">$199.00</span>
								</div>
								<div class="mb-2 flex justify-between text-sm">
									<span class="font-body text-light-brown">{fetchedPackage.sessions} sessions</span>
									<span class="font-body text-light-brown">$33.17 per session</span>
								</div>
								{#if fetchedPackage.discount && parseFloat(fetchedPackage.discount) > 0}
									<div class="flex justify-between text-sm text-green-600">
										<span class="font-body">Discount</span>
										<span class="font-body">-$20.00</span>
									</div>
								{/if}
								<hr class="my-2 border-gray-300" />
								<div class="flex justify-between font-semibold">
									<span class="font-body text-dark-brown">Total</span>
									<span class="font-body text-dark-brown">$179.00</span>
								</div>
							</div>

							<div class="mb-4">
								<h4 class="font-body text-dark-brown mb-2 font-semibold">Selected Dates:</h4>
								<ul class="space-y-1">
									<li class="font-body text-light-brown text-sm">Monday, June 10, 2024</li>
									<li class="font-body text-light-brown text-sm">Wednesday, June 12, 2024</li>
									<li class="font-body text-light-brown text-sm">Monday, June 17, 2024</li>
									<li class="font-body text-light-brown text-sm">Wednesday, June 19, 2024</li>
									<li class="font-body text-light-brown text-sm">Monday, June 24, 2024</li>
									<li class="font-body text-light-brown text-sm">Wednesday, June 26, 2024</li>
								</ul>
							</div>
						</div>

						<div class="mb-6">
							<h3 class="font-body text-dark-brown mb-4 text-xl font-semibold">Payment Details</h3>

							<div class="rounded-md border border-gray-300 p-4">
								<div class="mb-4">
									<label for="card-number" class="font-body text-dark-brown mb-1 block"
										>Card Number</label
									>
									<input
										type="text"
										id="card-number"
										placeholder="1234 5678 9012 3456"
										class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
									/>
								</div>

								<div class="mb-4 flex gap-4">
									<div class="flex-1">
										<label for="expiry" class="font-body text-dark-brown mb-1 block"
											>Expiry Date</label
										>
										<input
											type="text"
											id="expiry"
											placeholder="MM/YY"
											class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
										/>
									</div>
									<div class="flex-1">
										<label for="cvc" class="font-body text-dark-brown mb-1 block">CVC</label>
										<input
											type="text"
											id="cvc"
											placeholder="123"
											class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
										/>
									</div>
								</div>

								<div>
									<label for="name-on-card" class="font-body text-dark-brown mb-1 block"
										>Name on Card</label
									>
									<input
										type="text"
										id="name-on-card"
										placeholder="John Doe"
										class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
									/>
								</div>
							</div>
						</div>
					</div>
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
							class="font-body bg-dark-brown hover:bg-opacity-90 rounded-md px-6 py-2 text-white transition-colors disabled:bg-gray-100 disabled:text-gray-400"
							onclick={nextPage}
							disabled={postalCodeValidationInProgress || firstPageNextDisabled}
						>
							Next
						</button>
					{:else}
						<button
							type="submit"
							class="font-body bg-dark-brown hover:bg-opacity-90 rounded-md px-6 py-2 text-white transition-colors disabled:bg-gray-100 disabled:text-gray-400"
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
