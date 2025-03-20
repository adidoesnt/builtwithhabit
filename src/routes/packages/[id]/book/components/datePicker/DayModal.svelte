<script lang="ts">
	import { selectedSlots, type Slot } from '../formState';
	const {
		isOpen,
		onClose,
		numSessions,
		selectedDay,
		formatTimeTo12Hour,
		toggleSlot,
		formatDay
	}: {
		isOpen: boolean;
		onClose: () => void;
		numSessions: number;
		selectedDay: Date;
		formatTimeTo12Hour: (slot: { hour: number; minutes: number }) => string;
		toggleSlot: (slot: Slot) => void;
		formatDay: (day: Date) => string;
	} = $props();

	const allTimeSlots: Array<Slot> = [];
	for (let hour = 0; hour < 24; hour++) {
		allTimeSlots.push({ day: selectedDay, hour, minutes: 0 });
		allTimeSlots.push({ day: selectedDay, hour, minutes: 30 });
	}

	// TODO: Remove mock booked slots
	const bookedSlots = [
		{
			day: selectedDay,
			start: { hour: 9, minutes: 0 },
			end: { hour: 10, minutes: 0 }
		},
		{
			day: selectedDay,
			start: { hour: 12, minutes: 30 },
			end: { hour: 13, minutes: 30 }
		},
		{
			day: selectedDay,
			start: { hour: 15, minutes: 0 },
			end: { hour: 16, minutes: 0 }
		},
		{
			day: selectedDay,
			start: { hour: 18, minutes: 30 },
			end: { hour: 19, minutes: 30 }
		}
	];

	const timeToMinutes = (time: { hour: number; minutes: number }) => {
		return time.hour * 60 + time.minutes;
	};

	const isSameDay = (date1: Date, date2: Date) => {
		return (
			date1.getFullYear() === date2.getFullYear() &&
			date1.getMonth() === date2.getMonth() &&
			date1.getDate() === date2.getDate()
		);
	};

	const isSlotSelected = (slot: Slot) => {
		return $selectedSlots.some(
			(s) => isSameDay(s.day, slot.day) && s.hour === slot.hour && s.minutes === slot.minutes
		);
	};

	const overlapWithBooked = (slot: Slot) => {
		const slotStart = timeToMinutes(slot);
		const slotEnd = slotStart + 60;

		return bookedSlots.some((bookedSlot) => {
			const bookedStart = timeToMinutes(bookedSlot.start);
			const bookedEnd = bookedStart + 60;

			return isSameDay(slot.day, bookedSlot.day) && slotStart < bookedEnd && slotEnd > bookedStart;
		});
	};

	const isSlotBooked = (slot: Slot) => {
		const slotStart = timeToMinutes(slot);
		const slotEnd = slotStart + 60;

		return bookedSlots.some((bookedSlot) => {
			const bookedStart = timeToMinutes(bookedSlot.start);
			const bookedEnd = bookedStart + 60;

			return (
				isSameDay(slot.day, bookedSlot.day) && slotStart === bookedStart && slotEnd === bookedEnd
			);
		});
	};

	const overlapWithSelected = (slot: Slot) => {
		const slotStart = timeToMinutes(slot);
		const slotEnd = slotStart + 60;

		return $selectedSlots.some((selectedSlot) => {
			if (
				isSameDay(selectedSlot.day, slot.day) &&
				selectedSlot.hour === slot.hour &&
				selectedSlot.minutes === slot.minutes
			) {
				return false;
			}

			const selectedStart = timeToMinutes(selectedSlot);
			const selectedEnd = selectedStart + 60;

			return (
				isSameDay(selectedSlot.day, slot.day) && slotStart < selectedEnd && slotEnd > selectedStart
			);
		});
	};

	const getIsDisabled = (slot: Slot) => {
		// Slot is disabled if:
		// 1. It's already booked or overlaps with a booked slot
		// 2. The user has selected max sessions and this slot is not already selected
		// 3. The slot overlaps with an already selected slot (and is not itself selected)
		const isSelected = isSlotSelected(slot);

		return (
			isSlotBooked(slot) ||
			overlapWithBooked(slot) ||
			($selectedSlots.length >= numSessions && !isSelected) ||
			(!isSelected && overlapWithSelected(slot))
		);
	};
</script>

{#if isOpen}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center shadow-2xl backdrop-blur-2xl"
	>
		<div
			class="flex h-screen w-screen flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 md:h-fit md:max-h-[90vh] md:w-fit"
		>
			<div class="flex w-full justify-end">
				<button
					onclick={onClose}
					class="font-body text-dark-brown rounded-md px-3 py-1 text-sm hover:bg-gray-100"
				>
					Close
				</button>
			</div>

			<div class="flex flex-col gap-2">
				<h1 class="font-body text-dark-brown text-center text-2xl font-bold">
					{formatDay(selectedDay)}
				</h1>
				<p class="font-body text-dark-brown text-md text-center">
					Select up to {numSessions}
					{numSessions === 1 ? 'session' : 'sessions'}. Each session is 1 hour long.
				</p>
			</div>

			<div class="grid w-full grid-cols-2 gap-2 overflow-y-auto p-2 md:grid-cols-4">
				{#each allTimeSlots as slot}
					{#if slot.hour >= 7 && slot.hour < 21}
						<!-- Only show time slots between 7 AM and 9 PM -->
						<button
							type="button"
							onclick={toggleSlot.bind(null, slot)}
							disabled={getIsDisabled(slot) && !isSlotSelected(slot)}
							class={`flex w-full items-center gap-2 rounded-md p-2 transition-colors
								${
									isSlotBooked(slot) || overlapWithBooked(slot)
										? 'cursor-not-allowed bg-red-100 opacity-50'
										: isSlotSelected(slot)
											? 'border-2 border-green-500 bg-green-200'
											: 'bg-gray-200 hover:bg-gray-300'
								}
								${getIsDisabled(slot) && !isSlotSelected(slot) ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
						>
							<div class="flex-1">
								<span class="font-body text-dark-brown font-medium">
									{formatTimeTo12Hour(slot) +
										' - ' +
										formatTimeTo12Hour({
											hour: slot.hour + 1,
											minutes: slot.minutes
										})}
								</span>
								{#if isSlotBooked(slot)}
									<span class="font-body block text-xs text-red-600">Booked</span>
								{:else if overlapWithBooked(slot)}
									<span class="font-body block text-xs text-gray-600">Unavailable</span>
								{/if}
							</div>
						</button>
					{/if}
				{/each}
			</div>

			<div class="mt-4 w-full border-t border-gray-200 pt-4">
				<h3 class="font-body text-dark-brown mb-2 text-lg font-semibold">Selected Sessions:</h3>
				{#if $selectedSlots.length === 0}
					<p class="font-body text-light-brown italic">No sessions selected yet.</p>
				{:else}
					<div class="flex flex-wrap gap-2">
						{#each $selectedSlots.filter((slot) => isSameDay(slot.day, selectedDay)) as slot}
							<div
								class="flex items-center gap-2 rounded-full border border-green-300 bg-green-100 px-3 py-1"
							>
								<span class="font-body text-dark-brown">
									{formatTimeTo12Hour(slot) +
										' - ' +
										formatTimeTo12Hour({
											hour: slot.hour + 1,
											minutes: slot.minutes
										})}
								</span>
								<button
									onclick={toggleSlot.bind(null, slot)}
									class="text-red-500 hover:text-red-700"
									aria-label="Remove session"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<line x1="18" y1="6" x2="6" y2="18"></line>
										<line x1="6" y1="6" x2="18" y2="18"></line>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
