<script lang="ts">
	import type { PageData } from './$types';
	import { PurchaseStatus } from '../payment-intent/types';
	import { formatDate } from '$lib/utils/date';
	import { formatTime } from '$lib/utils/time';
	import { capitalise } from '$lib/utils/text';

	const { data }: { data: PageData } = $props();
	const { purchases } = data;

	const getStatusColor = (status: PurchaseStatus) => {
		switch (status) {
			case PurchaseStatus.CONFIRMED:
				return 'bg-green-100 text-green-800';
			case PurchaseStatus.FAILED:
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-yellow-100 text-yellow-800';
		}
	};
</script>

<div class="bg-beige font-body text-dark-brown min-h-[100dvh] p-4 md:p-8 w-full">
	<div class="mx-auto max-w-6xl">
		<div class="mt-6 mb-8">
			<h1 class="text-dark-brown text-2xl font-bold">Your Purchases</h1>
			<p class="text-light-brown mt-2 text-sm">View and manage your package purchases.</p>
		</div>

		{#if purchases.length === 0}
			<div class="mt-8 rounded-lg border border-gray-200 bg-white p-8 text-center shadow">
				<svg
					class="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
					/>
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">No purchases found</h3>
				<p class="mt-1 text-sm text-gray-500">You haven't made any purchases yet.</p>
			</div>
		{:else}
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="flex items-center justify-between border-b p-4">
					<h2 class="font-body text-dark-brown text-xl font-semibold">Purchases</h2>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full border-collapse">
						<thead class="bg-gray-50">
							<tr>
								<th class="font-body text-dark-brown border-b p-4 text-left">Purchase ID</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Sessions</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Price</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Status</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Purchase Date</th>
							</tr>
						</thead>
						<tbody>
							{#each purchases as purchase, i}
								{#if purchase.package}
									<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
										<td class="font-body text-dark-brown border-b p-4">{purchase.id}</td>
										<td class="font-body text-dark-brown border-b p-4">{purchase.package.name}</td>
										<td class="font-body text-dark-brown border-b p-4"
											>{purchase.package.sessions}</td
										>
										<td class="font-body text-dark-brown border-b p-4"
											>${Number(purchase.package.price).toFixed(2)}</td
										>
										<td class="font-body text-dark-brown border-b p-4">
											<span
												class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {getStatusColor(
													purchase.status
												)}"
											>
												{capitalise(purchase.status)}
											</span>
										</td>
										<td class="font-body text-dark-brown border-b p-4">
											<div>{formatDate(purchase.createdAt)}</div>
											<div class="text-sm text-gray-500">{formatTime(purchase.createdAt)}</div>
										</td>
									</tr>
								{/if}
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>
