<script lang="ts">
	import type { Booking, Package } from '$lib/server/db/schema';
	import { selectedSlots, setSelectedSlots, type Slot } from '../formState';
	import DayModal from './DayModal.svelte';
	import SelectedSessions from './SelectedSessions.svelte';
	import type { TrainerAvailability, TrainerOverride } from './types';

	const {
		fetchedPackage,
		existingBookings,
		trainerAvailability,
		trainerOverrides,
		slotReservationError
	}: {
		fetchedPackage: Package;
		existingBookings: Booking[];
		trainerAvailability: TrainerAvailability[];
		trainerOverrides: TrainerOverride[];
		slotReservationError: string | null;
	} = $props();
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

		// TODO: revert to new bookings must be at least 3 days from now
		// We will temporarily remove this to allow for last minute bookings

		const today = new Date();
		today.setHours(0, 0, 0, 0);
		return selectedDate >= today;
	};

	const getDayName = (date: Date) => {
		return date.toLocaleDateString('en-US', { weekday: 'short' });
	};

	const getMonthName = (date: Date) => {
		return date.toLocaleDateString('en-US', { month: 'short' });
	};

	const getFirstDayOfMonth = (year: number, month: number) => {
		// getDay() returns 0-6 (Sunday-Saturday), we want 0-6 (Monday-Sunday)
		const day = new Date(year, month - 1, 1).getDay();
		return day === 0 ? 6 : day - 1;
	};

	const getEmptyCells = (year: number, month: number) => {
		const firstDay = getFirstDayOfMonth(year, month);
		const prevMonth = month === 1 ? 12 : month - 1;
		const prevYear = month === 1 ? year - 1 : year;
		const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate();

		return Array.from({ length: firstDay }, (_, i) => {
			const day = prevMonthDays - firstDay + i + 1;
			return {
				day,
				date: new Date(prevYear, prevMonth - 1, day)
			};
		});
	};

	const getNextMonthCells = (year: number, month: number, currentDays: number) => {
		const totalCells = Math.ceil((currentDays + getFirstDayOfMonth(year, month)) / 7) * 7;
		const remainingCells = totalCells - currentDays - getFirstDayOfMonth(year, month);

		const nextMonth = month === 12 ? 1 : month + 1;
		const nextYear = month === 12 ? year + 1 : year;

		return Array.from({ length: remainingCells }, (_, i) => ({
			day: i + 1,
			date: new Date(nextYear, nextMonth - 1, i + 1)
		}));
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
			{trainerAvailability}
			{trainerOverrides}
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
		<div
			class="font-body grid w-full grid-cols-7 gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
		>
			<div class="text-dark-brown text-center text-sm font-semibold">Mon</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Tue</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Wed</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Thu</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Fri</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Sat</div>
			<div class="text-dark-brown text-center text-sm font-semibold">Sun</div>
			{#each getEmptyCells(parseInt(currentYear!), parseInt(currentMonth!)) as { day, date }}
				<button
					type="button"
					class="flex aspect-square cursor-not-allowed flex-col items-center justify-center rounded-md bg-gray-50 px-2 py-1 text-gray-400 transition-colors md:items-start md:justify-start"
					disabled
				>
					<span class="text-sm">{day} {getMonthName(date)}</span>
					<span class="text-xs">{getDayName(date)}</span>
				</button>
			{/each}
			{#each Array.from({ length: days }, (_, i) => i + 1) as day}
				<button
					type="button"
					class="text-dark-brown flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md bg-gray-50 px-2 py-1 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50 md:items-start md:justify-start"
					disabled={!isValidDay(day)}
					onclick={() =>
						(currentDay = new Date(parseInt(currentYear!), parseInt(currentMonth!) - 1, day))}
				>
					<span class="text-sm"
						>{day}
						{getMonthName(new Date(parseInt(currentYear!), parseInt(currentMonth!) - 1, day))}</span
					>
					<span class="text-xs"
						>{getDayName(new Date(parseInt(currentYear!), parseInt(currentMonth!) - 1, day))}</span
					>
				</button>
			{/each}
			{#each getNextMonthCells(parseInt(currentYear!), parseInt(currentMonth!), days) as { day, date }}
				<button
					type="button"
					class="flex aspect-square cursor-not-allowed flex-col items-center justify-center rounded-md bg-gray-50 px-2 py-1 text-gray-400 transition-colors md:items-start md:justify-start"
					disabled
				>
					<span class="text-sm">{day} {getMonthName(date)}</span>
					<span class="text-xs">{getDayName(date)}</span>
				</button>
			{/each}
		</div>
	{/if}

	{#if month && !isValidMonth(month)}
		<p class="font-body text-red-500">
			The month selected should not be in the past or more than 3 months from now.
		</p>
	{/if}

	{#if slotReservationError}
		<p class="font-body text-red-500">{slotReservationError}</p>
	{/if}

	<SelectedSessions {formatTimeTo12Hour} {toggleSlot} {formatDay} {numSessions} />
</div>
