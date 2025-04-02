<script lang="ts">
	import type { Booking, Package } from '$lib/server/db/schema';
	import { selectedSlots, setSelectedSlots, type Slot } from '../formState';
	import DayModal from './DayModal.svelte';
	import SelectedSessions from './SelectedSessions.svelte';

	const { fetchedPackage, existingBookings }: { fetchedPackage: Package, existingBookings: Booking[] } = $props();
	const { sessions: numSessions } = fetchedPackage;

	let month = $state<string | null>(null);
	let currentMonth = $derived(month && month.split('-')[1]);
	let currentYear = $derived(month && month.split('-')[0]);

	let days = $derived(
		currentMonth && currentYear
			? new Date(parseInt(currentYear), parseInt(currentMonth), 0).getDate()
			: null
	);

	let currentDay = $state<Date | null>(null);
	let isDayModalOpen = $derived(currentDay !== null);
	const closeDayModal = () => (currentDay = null);

	const toggleSlot = (slot: Slot) => {
		const index = $selectedSlots.findIndex(
			(s) => s.day === slot.day && s.hour === slot.hour && s.minutes === slot.minutes
		);

		if (index !== -1) {
			setSelectedSlots($selectedSlots.filter((_, i) => i !== index));
		} else {
			setSelectedSlots([...$selectedSlots, slot]);
		}
	};

	const formatTimeTo12Hour = (slot: { hour: number; minutes: number }) => {
		const { hour, minutes } = slot;
		const amPm = hour >= 12 ? 'PM' : 'AM';
		const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
		return `${formattedHour}:${minutes === 0 ? '00' : '30'} ${amPm}`;
	};

	const formatDay = (day: Date) => {
		const options: Intl.DateTimeFormatOptions = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return day.toLocaleDateString('en-US', options);
	};

	const isValidMonth = (month: string) => {
		if (!month) return false;

		const selectedYear = parseInt(month.split('-')[0]);
		const selectedMonth = parseInt(month.split('-')[1]) - 1;
		const selectedDate = new Date(selectedYear, selectedMonth, 1);

		const today = new Date();
		const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);

		const threeMonthsFromNow = new Date(today);
		threeMonthsFromNow.setMonth(today.getMonth() + 3);
		const futureMonthLimit = new Date(
			threeMonthsFromNow.getFullYear(),
			threeMonthsFromNow.getMonth(),
			1
		);

		return selectedDate >= currentMonthStart && selectedDate <= futureMonthLimit;
	};

	const isValidDay = (day: number) => {
		const selectedDate = new Date(parseInt(currentYear!), parseInt(currentMonth!) - 1, day);

		// new bookings must be at least 3 days from now
		const threeDaysFromNow = new Date();
		threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
		return selectedDate >= threeDaysFromNow;
	};
</script>

<div id="date-picker" class="flex flex-col gap-4">
	{#if currentDay}
		<DayModal
			isOpen={isDayModalOpen}
			onClose={closeDayModal}
			{numSessions}
			selectedDay={currentDay}
			{toggleSlot}
			{formatTimeTo12Hour}
			{formatDay}
			{existingBookings}
		/>
	{/if}

	<div class="flex flex-col items-center md:items-start">
		<div id="month-input-container" class="flex items-center gap-4">
			<label for="month" class="font-body text-dark-brown text-lg font-bold">Month</label>
			<input
				class="border-dark-brown text-dark-brown font-body rounded-md border p-2"
				type="month"
				bind:value={month}
			/>
		</div>
	</div>

	{#if days && month && isValidMonth(month)}
		<div class="grid w-full grid-cols-7 gap-1">
			{#each Array.from({ length: days }, (_, i) => i + 1) as day}
				<button
					type="button"
					class="text-dark-brown flex aspect-square items-center justify-center rounded-md bg-gray-200 px-2 py-1 disabled:opacity-50 md:items-start md:justify-start"
					disabled={!isValidDay(day)}
					onclick={() =>
						(currentDay = new Date(parseInt(currentYear!), parseInt(currentMonth!) - 1, day))}
				>
					{day}
				</button>
			{/each}
		</div>
	{/if}

	{#if month && !isValidMonth(month)}
		<p class="font-body text-red-500">
			The month selected should not be in the past or more than 3 months from now.
		</p>
	{/if}

	<SelectedSessions {formatTimeTo12Hour} {toggleSlot} {formatDay} {numSessions} />
</div>
