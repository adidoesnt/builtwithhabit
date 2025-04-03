<script lang="ts">
	import { Role, user } from '$lib/stores/auth';
	import config from '$lib/config';
	import DashboardIcon from '$lib/components/DashboardIcon.svelte';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { PageServerData } from './$types';
	import { formatDate } from '$lib/utils/date';
	import { formatTime } from '$lib/utils/time';
	import { slide } from 'svelte/transition';

	const { dashboard } = config;
	const { data }: { data: PageServerData } = $props();
	const { bookings = [], purchases = [] } = data;
	let isTrainer = $derived($user?.roles?.includes(Role.TRAINER));

	type BookingWithPurchase = {
		id: number;
		start: Date;
		end: Date;
		purchase: {
			id: number;
			address: string;
			postalCode: string;
		} | null;
		user: {
			id: string;
			firstName: string;
			lastName: string;
		} | null;
	};

	type PurchaseWithPackage = {
		purchases: {
			id: number;
			userId: string;
			packageId: number;
			status: 'confirmed' | 'unconfirmed' | 'failed';
			createdAt: Date;
			updatedAt: Date;
		};
		packages: {
			id: number;
			name: string;
			sessions: number;
			price: string;
			expiryInDays: number;
			description: string;
			discount: string | null;
		} | null;
	};

	const typedBookings = bookings as BookingWithPurchase[];
	const typedPurchases = purchases as PurchaseWithPackage[];
	let isTableExpanded = $state(true);
	let isPurchasesTableExpanded = $state(true);

	let icons = $derived(
		$user?.roles?.includes(Role.TRAINER)
			? [dashboard.icons[1], dashboard.icons[3]]
			: dashboard.icons
	);
</script>

<div class="bg-beige min-h-[100dvh] p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 text-center md:text-start">
			<h1 class="font-body text-dark-brown text-3xl font-bold">
				{dashboard.greeting}, {$user?.firstName || 'there'}!
			</h1>
			<p class="font-body text-light-brown mt-2">What would you like to do today?</p>
		</div>

		<div class={`grid grid-cols-2 gap-6 gap-y-10 md:grid-cols-${icons.length} md:gap-y-6`}>
			{#each icons as icon}
				<DashboardIcon
					name={icon.name}
					icon={icon.icon}
					description={icon.description}
					href={icon.href}
					color={icon.color}
				/>
			{/each}
		</div>

		<!-- Upcoming bookings section -->
		<div class="mt-12 rounded-lg bg-white shadow-md">
			<div class="flex items-center justify-between p-4 {isTableExpanded ? 'border-b' : ''}">
				<h2 class="font-body text-dark-brown text-xl font-semibold">Upcoming Bookings</h2>
				<button
					class="font-body text-dark-brown flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
					onclick={() => (isTableExpanded = !isTableExpanded)}
					aria-label={isTableExpanded ? 'Hide bookings' : 'Show bookings'}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5 transition-transform duration-200"
						style={isTableExpanded ? 'transform: rotate(180deg)' : ''}
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</button>
			</div>
			{#if typedBookings.length === 0}
				<div class="p-8 text-center">
					<p class="font-body text-light-brown">No upcoming bookings.</p>
				</div>
			{:else if isTableExpanded}
				<div class="overflow-x-auto" transition:slide>
					<table class="w-full border-collapse">
						<thead class="bg-gray-50">
							<tr>
								<th class="font-body text-dark-brown border-b p-4 text-left">Booking ID</th>
								{#if isTrainer}
									<th class="font-body text-dark-brown border-b p-4 text-left">Client</th>
								{/if}
								<th class="font-body text-dark-brown border-b p-4 text-left">Time</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Location</th>
							</tr>
						</thead>
						<tbody>
							{#each typedBookings as booking, i}
								<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<td class="font-body text-dark-brown border-b p-4">{booking.id}</td>
									{#if isTrainer}
										<td class="font-body text-dark-brown border-b p-4">
											{booking.user?.firstName}
											{booking.user?.lastName}
										</td>
									{/if}
									<td class="font-body text-dark-brown border-b p-4">
										<div>{formatDate(booking.start)}</div>
										<div class="text-sm text-gray-500">{formatTime(booking.start)}</div>
									</td>
									<td class="font-body text-dark-brown border-b p-4">
										{booking.purchase?.address}, {booking.purchase?.postalCode}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{:else}
				<div class="px-4 pb-4 text-left">
					<p class="font-body text-light-brown">Expand the table to see your upcoming bookings.</p>
				</div>
			{/if}
		</div>

		<!-- Recent purchases section -->
		{#if $user?.roles?.includes(Role.USER)}
			<div class="mt-12 rounded-lg bg-white shadow-md">
				<div
					class="flex items-center justify-between p-4 {isPurchasesTableExpanded ? 'border-b' : ''}"
				>
					<h2 class="font-body text-dark-brown text-xl font-semibold">Recent Purchases</h2>
					<button
						class="font-body text-dark-brown flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200"
						onclick={() => (isPurchasesTableExpanded = !isPurchasesTableExpanded)}
						aria-label={isPurchasesTableExpanded ? 'Hide purchases' : 'Show purchases'}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 transition-transform duration-200"
							style={isPurchasesTableExpanded ? 'transform: rotate(180deg)' : ''}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/>
						</svg>
					</button>
				</div>
				{#if typedPurchases.length === 0}
					<div class="p-8 text-center">
						<p class="font-body text-light-brown">No recent purchases.</p>
					</div>
				{:else if isPurchasesTableExpanded}
					<div class="overflow-x-auto" transition:slide>
						<table class="w-full border-collapse">
							<thead class="bg-gray-50">
								<tr>
									<th class="font-body text-dark-brown border-b p-4 text-left">Purchase ID</th>
									<th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
									<th class="font-body text-dark-brown border-b p-4 text-left">Date</th>
								</tr>
							</thead>
							<tbody>
								{#each typedPurchases as purchase, i}
									{#if purchase.packages}
										<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td class="font-body text-dark-brown border-b p-4">{purchase.purchases.id}</td
											>
											<td class="font-body text-dark-brown border-b p-4"
												>{purchase.packages.name}</td
											>
											<td class="font-body text-dark-brown border-b p-4">
												<div>{formatDate(purchase.purchases.createdAt)}</div>
												<div class="text-sm text-gray-500">
													{formatTime(purchase.purchases.createdAt)}
												</div>
											</td>
										</tr>
									{/if}
								{/each}
							</tbody>
						</table>
					</div>
				{:else}
					<div class="px-4 pb-4 text-left">
						<p class="font-body text-light-brown">Expand the table to see your recent purchases.</p>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
