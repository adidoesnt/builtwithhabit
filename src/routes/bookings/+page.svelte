<script lang="ts">
	import type { PageData } from './$types';
	import { PurchaseStatus } from '../payment-intent/types';
	import { formatDate } from '$lib/utils/date';
	import { formatTime } from '$lib/utils/time';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { capitalise } from '$lib/utils/text';
	import config from '$lib/config';
	import { Role, user } from '$lib/stores/auth';

	const { data }: { data: PageData } = $props();
	const { bookings } = data;

	let page = $state(0);
	let itemsPerPage = $state(5);

	let isTrainer = $derived($user?.roles?.includes(Role.TRAINER));

	const totalPages = $derived(Math.ceil(bookings.length / itemsPerPage));

	const getPageNumbers = () => {
		const pages = [];
		const maxVisiblePages = 5;
		const halfMaxPages = Math.floor(maxVisiblePages / 2);

		let startPage = Math.max(0, page - halfMaxPages);
		let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(0, endPage - maxVisiblePages + 1);
		}

		if (startPage > 0) {
			pages.push(0);
			if (startPage > 1) pages.push('ellipsis');
		}

		for (let i = startPage; i <= endPage; i++) {
			pages.push(i);
		}

		if (endPage < totalPages - 1) {
			if (endPage < totalPages - 2) pages.push('ellipsis');
			pages.push(totalPages - 1);
		}

		return pages;
	};

	const itemsPerPageOptions = [5, 10, 25, 50];

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

	type BookingWithUser = {
		id: number;
		user: {
			firstName: string;
			lastName: string;
		};
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
				<div class="items-between flex flex-col justify-center border-b p-4">
					<h2 class="font-body text-dark-brown text-xl font-semibold">Bookings</h2>
					{#if !isTrainer}
						<p class="text-light-brown mt-2 text-sm">
							To adjust your booking, please contact us at
							<a href="mailto:{config.site.support.email}" class="text-dark-brown font-medium"
								>{config.site.support.email}</a
							>.
						</p>
					{/if}
				</div>
				<div class="overflow-x-auto">
					<table class="w-full border-collapse">
						<thead class="bg-gray-50">
							<tr>
								<th class="font-body text-dark-brown border-b p-4 text-left">Booking ID</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Purchase ID</th>
								{#if isTrainer}
									<th class="font-body text-dark-brown border-b p-4 text-left">Client</th>
								{/if}
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
									{#if isTrainer}
										<td class="font-body text-dark-brown border-b p-4">
											{(booking as unknown as BookingWithUser).user?.firstName}
											{(booking as unknown as BookingWithUser).user?.lastName}
										</td>
									{/if}
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

			<div class="mt-4 flex items-center justify-between rounded-lg bg-white p-4 shadow-md">
				<div class="flex items-center gap-2">
					<label for="itemsPerPage" class="text-sm text-gray-700">Items per page:</label>
					<select
						id="itemsPerPage"
						bind:value={itemsPerPage}
						class="focus:border-dark-brown focus:ring-dark-brown appearance-none rounded-md border border-gray-300 bg-white px-3 py-1 pr-8 text-sm focus:ring-1 focus:outline-none"
					>
						{#each itemsPerPageOptions as option}
							<option value={option}>{option}</option>
						{/each}
					</select>
				</div>

				<div class="flex items-center gap-2">
					<button
						class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={page === 0}
						onclick={() => (page = Math.max(0, page - 1))}
					>
						Previous
					</button>

					<div class="flex items-center gap-1">
						{#each getPageNumbers() as pageNum}
							{#if pageNum === 'ellipsis'}
								<span class="px-2 text-gray-500">...</span>
							{:else}
								<button
									class="rounded-md px-3 py-1 text-sm {pageNum === page
										? 'bg-dark-brown text-white'
										: 'hover:bg-gray-50'}"
									onclick={() => (page = pageNum as number)}
								>
									{(pageNum as number) + 1}
								</button>
							{/if}
						{/each}
					</div>

					<button
						class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={page === totalPages - 1}
						onclick={() => (page = Math.min(totalPages - 1, page + 1))}
					>
						Next
					</button>
				</div>
			</div>
		{/if}
	</div>
</div>
