<script lang="ts">
	import type { PageData } from './$types';
	import { PurchaseStatus } from '../payment-intent/types';
	import { formatDate } from '$lib/utils/date';
	import { formatTime } from '$lib/utils/time';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { capitalise } from '$lib/utils/text';
	import config from '$lib/config';

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
			<p class="text-light-brown mt-2 text-sm">View and manage your package bookings.</p>
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
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="flex items-between justify-center border-b p-4 flex-col">
					<h2 class="font-body text-dark-brown text-xl font-semibold">Bookings</h2>
					<p class="text-light-brown mt-2 text-sm">
						To adjust your booking, please contact us at
						<a href="mailto:{config.site.support.email}" class="text-dark-brown font-medium"
							>{config.site.support.email}</a
						>.
					</p>
				</div>
				<div class="overflow-x-auto">
					<table class="w-full border-collapse">
						<thead class="bg-gray-50">
							<tr>
								<th class="font-body text-dark-brown border-b p-4 text-left">Booking ID</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Purchase ID</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Date & Time</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Location</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Status</th>
							</tr>
						</thead>
						<tbody>
							{#each bookings as booking, i}
								<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<td class="font-body text-dark-brown border-b p-4">{booking.id}</td>
									<td class="font-body text-dark-brown border-b p-4">{booking.purchase!.id}</td>
									<td class="font-body text-dark-brown border-b p-4">
										<div>{formatDate(booking.start)}</div>
										<div class="text-sm text-gray-500">{formatTime(booking.start)}</div>
									</td>
									<td class="font-body text-dark-brown border-b p-4">{booking.package!.name}</td>
									<td class="font-body text-dark-brown border-b p-4">
										{booking.purchase!.address}, {booking.purchase!.postalCode}
									</td>
									<td class="font-body text-dark-brown border-b p-4">
										<span
											class="inline-flex rounded-full px-2 text-xs leading-5 font-semibold {getStatusColor(
												booking.purchase!.status!
											)}"
										>
											{capitalise(booking.purchase!.status!)}
										</span>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		{/if}
	</div>
</div>
