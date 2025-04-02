<script lang="ts">
	import type { PageServerData } from './$types';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import config from '$lib/config';
	import { goto } from '$app/navigation';

	const { data }: { data: PageServerData } = $props();
	const { clientSecret } = data;

	$effect(() => {
		setInterval(() => {
			fetch(`/payment-intent/${clientSecret}/status`)
				.then((res) => res.json())
				.then((data) => {
					const { confirmed } = data;
					if (confirmed) {
						// TODO: Add a success page
						goto(`/dashboard`);
					}
				});
		}, 5000);
	});
</script>

<div class="bg-beige font-body flex h-screen w-screen items-center justify-center px-4 py-8">
	<div class="flex flex-col items-center justify-center">
		<div class="w-fit rounded-lg border border-gray-100 bg-white p-8 shadow-lg flex flex-col gap-4">
			<div class="flex justify-center p-8">
				<LoadingSpinner size="64px" color="#8B4513" />
			</div>

			<div class="flex flex-col">
				<h1 class="font-bold text-dark-brown text-center text-3xl">
					Processing Your Payment
				</h1>
				<p class="text-center text-lg text-gray-700">
					<span class="font-bold">Payment ID:</span>
					{clientSecret}
				</p>
			</div>

			<p class="mb-8 text-center text-lg text-gray-700">
				Please wait while we process your payment. This may take a few moments. Do not close this
				window or refresh the page.
			</p>

			<div class="border-t border-gray-200 pt-6">
				<p class="text-center text-sm text-gray-500">
					If you encounter any issues, please contact our support team at <span
						class="text-dark-brown font-medium">{config.site.contact.email}</span
					>
				</p>
			</div>
		</div>
	</div>
</div>
