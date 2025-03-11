<!-- TODO: add date selection -->
<!-- TODO: add payment -->
<script lang="ts">
	import type { PageServerData } from './$types';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { z } from 'zod';
	import config from '$lib/config';

	const { data }: { data: PageServerData } = $props();
	const { package: fetchedPackage, locations: availableLocations } = data;
	const { disclaimer } = config.packages;

	let page = $state(0);
	let disclaimerOpen = $state(false);
	let postalCodeValidationInProgress = $state(false);
	let postalCodeStatus = $state({
		isValid: true,
		message: ''
	});

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

	const toggleDisclaimer = () => {
		disclaimerOpen = !disclaimerOpen;
	};

	// TODO: validate form schema on submission
	const formSchema = z.object({
		address: z.string().min(1),
		postalCode: z.string().min(1),
		disclaimer: z.boolean().refine((val) => val, {
			message: disclaimer.warning
		})
	});

	const formValues = $state({
		address: '',
		postalCode: '',
		disclaimer: false
	});

	const firstPageNextDisabled = $derived(
		page === 0 &&
			(formValues.address?.length === 0 || !postalCodeStatus.isValid || !formValues.disclaimer)
	);

	const validatePostalCode = async () => {
		postalCodeValidationInProgress = true;
		postalCodeStatus = { isValid: true, message: 'Validating postal code...' };

		// TODO: remove mocking - saving API calls since we already tested this and it works
		formValues.address = '123 Main St, Anytown, USA';
		postalCodeStatus = { isValid: true, message: 'Address found' };
		postalCodeValidationInProgress = false;
		return;

		// if (formValues.postalCode.length !== 6) {
		// 	postalCodeStatus = {
		// 		isValid: false,
		// 		message: 'Postal code must be 6 characters (e.g., 123456)'
		// 	};
		// 	postalCodeValidationInProgress = false;
		// 	return;
		// }

		// try {
		// 	const response = await fetch(`/location/${formValues.postalCode}/address`);

		// 	if (response.ok) {
		// 		const data = await response.json();
		// 		const { address, isValid } = data;

		// 		if (data.isValid && data.address) {
		// 			formValues.address =
		// 				address.label ||
		// 				`${address.street || ''}, ${address.municipality || ''}, ${address.region || ''}`;

		// 			postalCodeStatus = {
		// 				isValid,
		// 				message: 'Address found'
		// 			};
		// 		} else {
		// 			postalCodeStatus = {
		// 				isValid,
		// 				message: data.message || 'Could not find address for this postal code'
		// 			};
		// 		}
		// 	} else {
		// 		postalCodeStatus = {
		// 			isValid: false,
		// 			message: 'Postal code is invalid or too far away'
		// 		};
		// 	}
		// } catch (error) {
		// 	console.error('Error validating postal code:', error);
		// 	postalCodeStatus = {
		// 		isValid: false,
		// 		message: 'Error connecting to validation service'
		// 	};
		// } finally {
		// 	postalCodeValidationInProgress = false;
		// }
	};
</script>

<div class="bg-beige min-h-screen p-4 md:p-8">
	{#if disclaimerOpen}
		<div
			class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center shadow-2xl backdrop-blur-xl"
		>
			<div class="mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
				<div class="mb-4 flex items-center justify-between">
					<h2 class="font-body text-dark-brown text-xl font-bold">Disclaimer</h2>
					<button
						onclick={toggleDisclaimer}
						class="hover:text-dark-brown text-gray-500 transition-colors"
						aria-label="Close disclaimer"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<div
					class="font-body text-dark-brown mb-6 max-h-[60dvh] overflow-y-auto whitespace-pre-line"
				>
					{disclaimer.content.join('\n\n')}
				</div>
			</div>
		</div>
	{/if}

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
			<div class="mb-8">
				<div class="mb-2 flex justify-between">
					<span class="font-body text-light-brown text-sm">Questions</span>
					<span class="font-body text-light-brown text-sm">Select Dates</span>
					<span class="font-body text-light-brown text-sm">Payment</span>
				</div>
				<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
					<div
						class="bg-dark-brown h-full transition-all duration-300"
						style="width: {(page + 1) * 33.33}%"
					></div>
				</div>
			</div>

			<form class="flex flex-col" {onsubmit}>
				{#if page === 0}
					<div class="space-y-4">
						<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
							<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Package Details</h3>
							<div class="space-y-3">
								<div>
									<label for="packageName" class="font-body mb-1 block text-gray-500"
										>Package Name</label
									>
									<input
										type="text"
										id="packageName"
										class="focus:ring-dark-brown font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
										value={fetchedPackage.name}
										disabled
									/>
								</div>

								<div>
									<label for="packageDescription" class="font-body mb-1 block text-gray-500"
										>Number of Sessions</label
									>
									<input
										type="text"
										id="packageDescription"
										class="font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
										value={fetchedPackage.sessions}
										disabled
									/>
								</div>
							</div>
						</div>

						<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
							<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Location Details</h3>
							<p class="font-body text-light-brown mb-3 text-sm">
								Please note that we only provide services in areas near our available locations:
								{availableLocations.map((loc, index) => 
									index === availableLocations.length - 1 && index !== 0
										? `and ${loc.address}`
										: loc.address
								).join(', ')}.
							</p>
							<div class="flex flex-col gap-4 md:flex-row">
								<div class="flex-1">
									<label for="address" class="font-body text-dark-brown mb-1 block">Address</label>
									<div class="relative">
										<input
											type="textarea"
											id="address"
											class="font-body w-full rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:outline-none
												{postalCodeValidationInProgress ? 'cursor-not-allowed bg-gray-100' : 'cursor-text'}
												{!postalCodeStatus.isValid && !postalCodeValidationInProgress ? 'border-red-500' : ''}
												{postalCodeStatus.isValid && formValues.address ? 'border-green-500' : ''}"
											disabled={postalCodeValidationInProgress}
											bind:value={formValues.address}
										/>
										{#if postalCodeValidationInProgress}
											<div class="absolute top-1/2 right-3 -translate-y-1/2">
												<div
													class="border-t-dark-brown h-5 w-5 animate-spin rounded-full border-2 border-gray-300"
												></div>
											</div>
										{/if}
									</div>
								</div>

								<div class="md:w-1/3">
									<label for="postalCode" class="font-body text-dark-brown mb-1 block"
										>Postal Code</label
									>
									<div class="relative">
										<input
											type="text"
											id="postalCode"
											class="font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none
												{postalCodeValidationInProgress ? 'cursor-not-allowed bg-gray-100' : 'cursor-text'}
												{!postalCodeStatus.isValid && !postalCodeValidationInProgress ? 'border-red-500' : ''}
												{postalCodeStatus.isValid && formValues.address ? 'border-green-500' : ''}"
											bind:value={formValues.postalCode}
											disabled={postalCodeValidationInProgress}
											oninput={validatePostalCode}
											placeholder="123456"
										/>
										{#if postalCodeValidationInProgress}
											<div class="absolute top-1/2 right-3 -translate-y-1/2">
												<div
													class="border-t-dark-brown h-5 w-5 animate-spin rounded-full border-2 border-gray-300"
												></div>
											</div>
										{/if}
									</div>
									{#if postalCodeStatus.message}
										<p
											class="mt-1 text-sm {postalCodeStatus.isValid
												? 'text-green-600'
												: 'text-red-500'}"
										>
											{postalCodeStatus.message}
										</p>
									{/if}
								</div>
							</div>
							<p class="font-body mt-2 text-xs text-gray-500 italic">
								Enter your postal code and we'll automatically populate your address.
							</p>
						</div>

						<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
							<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Disclaimer</h3>
							<div class="flex items-center gap-2">
								<input
									type="checkbox"
									id="disclaimer"
									class="focus:ring-dark-brown h-5 w-5 rounded border border-gray-300 focus:ring-2 focus:outline-none"
									bind:checked={formValues.disclaimer}
								/>
								<div>
									<p class="font-body text-sm text-gray-500">
										{disclaimer.message}
										<button
											type="button"
											onclick={toggleDisclaimer}
											class="text-dark-brown font-semibold hover:underline"
										>
											{disclaimer.buttonText}
										</button>
									</p>
									{#if !formValues.disclaimer}
										<p class="font-body mt-1 text-xs text-red-500">
											{disclaimer.warning}
										</p>
									{/if}
								</div>
							</div>
						</div>
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
