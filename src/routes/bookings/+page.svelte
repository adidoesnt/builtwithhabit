<script lang="ts">
	import type { PageData } from './$types';
	import { PurchaseStatus } from '../payment-intent/types';
	import { formatDate } from '$lib/utils/date';
	import { formatTime } from '$lib/utils/time';
	import LogoHeader from '$lib/components/LogoHeader.svelte';

	const { data }: { data: PageData } = $props();
	const { bookings } = data;

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

<div class="bg-beige font-body text-dark-brown min-h-screen p-4 md:p-8">
	<div class="mx-auto max-w-6xl">
		<LogoHeader />

		<div class="mt-6 mb-8">
			<h1 class="text-dark-brown text-2xl font-bold">Your Bookings</h1>
			<p class="text-light-brown mt-2 text-sm">View and manage your package bookings</p>
		</div>

		{#if bookings.length === 0}
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
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<h3 class="mt-2 text-sm font-medium text-gray-900">No bookings found</h3>
				<p class="mt-1 text-sm text-gray-500">You haven't made any bookings yet.</p>
			</div>
		{:else}
			<div class="overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Booking ID
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Purchase ID
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Date & Time
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Package
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Location
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
							>
								Status
							</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-gray-200 bg-white">
						{#each bookings as booking}
							<tr class="hover:bg-gray-50">
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">{booking.id}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">{booking.purchase!.id}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">{formatDate(booking.start)}</div>
									<div class="text-sm text-gray-500">{formatTime(booking.start)}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm font-medium text-gray-900">{booking.package!.name}</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<div class="text-sm text-gray-900">
										{booking.purchase!.address}, {booking.purchase!.postalCode}
									</div>
								</td>
								<td class="px-6 py-4 whitespace-nowrap">
									<span
										class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {getStatusColor(
											booking.purchase!.status!
										)}"
									>
										{booking.purchase!.status}
									</span>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		{/if}
	</div>
</div>
