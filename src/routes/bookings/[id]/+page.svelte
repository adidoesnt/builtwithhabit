<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { formatTime } from '$lib/utils/time';
	import type { PageData } from './$types';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import TrainerNotesModal from './components/TrainerNotesModal.svelte';

	let { data }: { data: PageData } = $props();
	const { booking, isTrainerForBooking, isClientForBooking, isAdmin, bookingNotesFileText } = data;
	const hasNotes = $derived(!!bookingNotesFileText && bookingNotesFileText !== '');
	const canViewBookingNotes = $derived(isTrainerForBooking || isClientForBooking || isAdmin);

	let isTrainerNotesModalOpen = $state(false);
	const setIsTrainerNotesModalOpen = (isOpen: boolean) => {
		isTrainerNotesModalOpen = isOpen;
	};

	const formatDate = (date: Date) => {
		return date.toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};

	const getFileNameForBookingNotes = (fileType: string = 'txt') => {
		if (!booking) {
			throw new Error('Booking not found');
		}

		return `booking-${booking.id}-notes.${fileType}`;
	};

	const getPresignedUrlForBookingNotes = async () => {
		try {
			if (!booking) {
				throw new Error('Booking not found');
			}

			const fileName = getFileNameForBookingNotes();
			const response = await fetch(
				`/bookings/${booking.id}/presigned-url?fileName=${fileName}&clientId=${booking.client?.id}`
			);

			if (!response.ok) {
				throw new Error('Failed to get presigned url');
			}

			const data = await response.json();
			const { presignedUrl } = data;
			return presignedUrl;
		} catch (error) {
			console.error('Error getting presigned url for booking notes', error);
			return null;
		}
	};
</script>

<TrainerNotesModal
	isOpen={isTrainerNotesModalOpen}
	setIsOpen={setIsTrainerNotesModalOpen}
	getPresignedUrl={getPresignedUrlForBookingNotes}
	{bookingNotesFileText}
	{isTrainerForBooking}
/>

<div class="bg-beige min-h-[100dvh] p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 text-center md:text-start">
			<h1 class="font-body text-dark-brown text-2xl font-bold md:text-3xl">
				{#if booking}
					{#if isTrainerForBooking}
						Booking #{booking.id} with {booking.trainer?.firstName} {booking.trainer?.lastName}
					{:else}
						Booking #{booking.id} with {booking.client?.firstName} {booking.client?.lastName}
					{/if}
				{:else}
					Booking Details
				{/if}
			</h1>
			<p class="font-body text-light-brown mt-2">
				{#if booking}
					{formatDate(booking.start)}
				{:else}
					View and manage your booking information
				{/if}
			</p>
		</div>

		{#if booking}
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="bg-light-green flex flex-col items-center gap-6 p-8 md:flex-row">
					<div
						class="font-body text-dark-brown flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold shadow-md"
					>
						{booking.id}
					</div>
					<div class="text-center md:text-left">
						<h2 class="font-body text-olive text-xl font-semibold">
							{#if isTrainerForBooking}
								Booking #{booking.id} with {booking.trainer?.firstName} {booking.trainer?.lastName}
							{:else}
								Booking #{booking.id} with {booking.client?.firstName} {booking.client?.lastName}
							{/if}
						</h2>
						<p class="font-body text-olive">
							{formatDate(booking.start)}
						</p>
					</div>
				</div>

				<div class="p-6">
					<div class="space-y-6">
						<div>
							<h3 class="font-body text-dark-brown text-xl font-semibold">Participants</h3>
							<div class="mt-4 space-y-4">
								<div>
									<p class="font-body text-light-brown text-sm">Client</p>
									<p class="font-body text-dark-brown">
										{booking.client?.firstName}
										{booking.client?.lastName}
									</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">Trainer</p>
									<p class="font-body text-dark-brown">
										{booking.trainer?.firstName}
										{booking.trainer?.lastName}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-body text-dark-brown text-xl font-semibold">Location</h3>
							<div class="mt-4 space-y-4">
								<div>
									<p class="font-body text-light-brown text-sm">Address</p>
									<p class="font-body text-dark-brown">{booking.purchase?.address}</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">Postal Code</p>
									<p class="font-body text-dark-brown">{booking.purchase?.postalCode}</p>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-body text-dark-brown text-xl font-semibold">Schedule</h3>
							<div class="mt-4 space-y-4">
								<div>
									<p class="font-body text-light-brown text-sm">Date</p>
									<p class="font-body text-dark-brown">
										{formatDate(booking.start)}
									</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">Start Time</p>
									<p class="font-body text-dark-brown">
										{formatTime(booking.start)}
									</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">End Time</p>
									<p class="font-body text-dark-brown">
										{formatTime(booking.end)}
									</p>
								</div>
							</div>
						</div>

						<div>
							<h3 class="font-body text-dark-brown text-xl font-semibold">Package Information</h3>
							<div class="mt-4 space-y-4">
								<div>
									<p class="font-body text-light-brown text-sm">Package Name</p>
									<p class="font-body text-dark-brown">{booking.package?.name}</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">Description</p>
									<p class="font-body text-dark-brown">{booking.package?.description}</p>
								</div>
								<div>
									<p class="font-body text-light-brown text-sm">Price</p>
									<p class="font-body text-dark-brown">SG${booking.package?.price}</p>
								</div>
							</div>
						</div>
					</div>

					<div class="mt-8 flex flex-wrap gap-4 border-t border-gray-200 pt-8">
						{#if isTrainerForBooking}
							<button
								class="text-dark-brown font-body bg-light-green cursor-pointer rounded-sm px-6 py-2 transition-all duration-300 hover:opacity-80"
								onclick={setIsTrainerNotesModalOpen.bind(null, true)}
							>
								{#if !hasNotes}
									Add Booking Notes
								{:else}
									Open Booking Notes
								{/if}
							</button>
						{:else if canViewBookingNotes && hasNotes}
							<button
								class="text-dark-brown font-body bg-light-green cursor-pointer rounded-sm px-6 py-2 transition-all duration-300 hover:opacity-80"
								onclick={setIsTrainerNotesModalOpen.bind(null, true)}
							>
								View Booking Notes
							</button>
						{/if}
					</div>
				</div>
			</div>
		{:else}
			<div class="rounded-lg bg-white p-6 text-center shadow-md">
				<LoadingSpinner size="48px" color="var(--color-dark-brown)" />
			</div>
		{/if}
	</div>
</div>
