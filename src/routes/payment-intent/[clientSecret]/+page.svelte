<script lang="ts">
	import type { PageServerData } from './$types';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import config from '$lib/config';
	import { PurchaseStatus } from '../types';
	const { data }: { data: PageServerData } = $props();
	const { clientSecret } = data;

	let isSuccess = $state(false);
	let isFailed = $state(false);

	$effect(() => {
		const interval = setInterval(() => {
			fetch(`/payment-intent/${clientSecret}/status`)
				.then((res) => res.json())
				.then((data) => {
					const { status } = data;
					if (status === PurchaseStatus.CONFIRMED) {
						clearInterval(interval);
						isSuccess = true;
					} else if (status === PurchaseStatus.FAILED) {
						clearInterval(interval);
						isFailed = true;
					}
				});
		}, 5000);

		return () => clearInterval(interval);
	});
</script>

<div class="bg-beige font-body flex h-screen w-screen items-center justify-center px-4 py-8">
	<div class="flex flex-col items-center justify-center">
		<div class="flex w-fit flex-col gap-4 rounded-lg border border-gray-100 bg-white p-8 shadow-lg">
			{#if isSuccess}
				<div class="flex justify-center p-8">
					<svg
						class="h-16 w-16 text-green-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<div class="flex flex-col">
					<h1 class="text-dark-brown text-center text-3xl font-bold">Payment Successful!</h1>
					<p class="text-center text-lg text-gray-700">
						<span class="font-bold">Payment ID:</span>
						{clientSecret}
					</p>
				</div>

				<p class="mb-8 text-center text-lg text-gray-700">
					Your payment has been processed successfully. You may now leave this page.
				</p>
			{:else if isFailed}
				<div class="flex justify-center p-8">
					<svg class="h-16 w-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</div>

				<div class="flex flex-col">
					<h1 class="text-dark-brown text-center text-3xl font-bold">Payment Failed</h1>
					<p class="text-center text-lg text-gray-700">
						<span class="font-bold">Payment ID:</span>
						{clientSecret}
					</p>
				</div>

				<p class="mb-8 text-center text-lg text-gray-700">
					We were unable to process your payment. Please try again or contact our support team for
					assistance.
				</p>
			{:else}
				<div class="flex justify-center p-8">
					<LoadingSpinner size="64px" color="#8B4513" />
				</div>

				<div class="flex flex-col">
					<h1 class="text-dark-brown text-center text-3xl font-bold">Processing Your Payment</h1>
					<p class="text-center text-lg text-gray-700">
						<span class="font-bold">Payment ID:</span>
						{clientSecret}
					</p>
				</div>

				<p class="mb-8 text-center text-lg text-gray-700">
					Please wait while we process your payment. This may take a few moments. Do not close this
					window or refresh the page.
				</p>
			{/if}

			<div class="border-t border-gray-200 pt-6">
				<p class="text-center text-sm text-gray-500">
					If you encounter any issues, please contact our support team at <span
						class="text-dark-brown font-medium">{config.site.support.email}</span
					>
				</p>
			</div>
		</div>
	</div>
</div>
