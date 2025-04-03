<script lang="ts">
	import { user } from '$lib/stores/auth';
	import { fade, slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { RecurringAvailability } from '$lib/server/db/schema';
	import EditButton from './buttons/EditButton.svelte';
	import SaveButton from './buttons/SaveButton.svelte';
	import CancelButton from './buttons/CancelButton.svelte';
	import DropdownButton from './buttons/DropdownButton.svelte';

	const { availability }: { availability: RecurringAvailability[] } = $props();

	const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	let formData = $state(
		daysOfWeek.map((_day, index) => ({
			day: index,
			availabilities: availability
				.filter((a) => a.dayOfWeek === index)
				.map((a) => ({
					start: a.start,
					end: a.end
				}))
		}))
	);

	let isEditing = $state(false);
	let isSaving = $state(false);
	let saveSuccess = $state(false);
	let saveError = $state<string | null>(null);

	let currentDay = $state<number | null>(null);
	let setCurrentDay = $state((day: number | null) => {
		currentDay = day;
	});

	let currentStart = $state<string | null>(null);
	let currentEnd = $state<string | null>(null);
	let timeError = $state<string | null>(null);

	function getTimeDifferenceInMinutes(start: string, end: string): number {
		if (!start || !end) return 0;

		const [startHours, startMinutes] = start.split(':').map(Number);
		const [endHours, endMinutes] = end.split(':').map(Number);

		const startTotalMinutes = startHours * 60 + startMinutes;
		const endTotalMinutes = endHours * 60 + endMinutes;

		return endTotalMinutes - startTotalMinutes;
	}

	$effect(() => {
		if (
			currentStart &&
			(!currentEnd || getTimeDifferenceInMinutes(currentStart, currentEnd) < 60)
		) {
			const [hours, minutes] = currentStart.split(':').map(Number);
			const newHours = hours + 1;

			if (newHours < 24) {
				currentEnd = `${newHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
			} else {
				currentEnd = '23:59';
			}
		}
	});

	$effect(() => {
		if (isEditing && currentDay === null) {
			setCurrentDay(0);
		}
	});

	function isTimeOverlapping(start: string, end: string, dayIndex: number): boolean {
		if (!start || !end || dayIndex === null) return false;

		return formData[dayIndex].availabilities.some((slot) => {
			return start < slot.end && end > slot.start;
		});
	}

	function validateTimes() {
		if (!currentStart || !currentEnd) {
			timeError = null;
			return false;
		}

		if (currentStart >= currentEnd) {
			timeError = 'Start time must be before end time';
			return false;
		}

		const durationMinutes = getTimeDifferenceInMinutes(currentStart, currentEnd);
		if (durationMinutes < 60) {
			timeError = 'Time slot must be at least 1 hour';
			return false;
		}

		if (currentDay !== null && isTimeOverlapping(currentStart, currentEnd, currentDay)) {
			timeError = 'This time slot overlaps with an existing slot';
			return false;
		}

		timeError = null;
		return true;
	}

	$effect(() => {
		if (currentStart || currentEnd) {
			validateTimes();
		}
	});

	function addTimeSlot() {
		if (currentDay !== null && currentStart && currentEnd && validateTimes()) {
			formData[currentDay].availabilities.push({
				start: currentStart,
				end: currentEnd
			});

			formData[currentDay].availabilities.sort((a, b) => a.start.localeCompare(b.start));

			currentStart = null;
			currentEnd = null;
			timeError = null;
		}
	}

	function removeTimeSlot(dayIndex: number, slotIndex: number) {
		formData[dayIndex].availabilities.splice(slotIndex, 1);
	}

	function toggleEditing() {
		isEditing = !isEditing;
	}

	async function saveAvailabilities() {
		try {
			isSaving = true;
			saveError = null;

			const response = await fetch(`/trainers/${$user?.id}/availability`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (!response.ok) {
				throw new Error('Failed to save availability');
			}

			saveSuccess = true;
			isEditing = false;

			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} catch (error) {
			saveError = error instanceof Error ? error.message : 'An unknown error occurred';
		} finally {
			isSaving = false;
		}
	}

	function formatTime(timeStr: string): string {
		if (!timeStr) return '';
		const [hours, minutes] = timeStr.split(':').map(Number);
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
		return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-md">
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div class="flex-grow">
			<h2 class="font-body text-dark-brown text-2xl font-bold">Weekly Availability</h2>
			<p class="font-body text-light-brown">
				Set your weekly availability to let clients know when you're available for sessions.
			</p>
		</div>
		<div class="flex justify-end gap-2">
			{#if isEditing}
				<CancelButton onclick={toggleEditing} isDisabled={isSaving} />
				<SaveButton save={saveAvailabilities} {isSaving} />
			{:else}
				<EditButton onclick={toggleEditing} isDisabled={isSaving} />
			{/if}
		</div>
	</div>

	{#if saveSuccess}
		<div
			transition:fade={{ duration: 300 }}
			class="relative mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<span class="block sm:inline">Your availability has been saved successfully!</span>
		</div>
	{/if}

	{#if saveError}
		<div
			transition:fade={{ duration: 300 }}
			class="relative mt-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700"
			role="alert"
		>
			<span class="block sm:inline">Error: {saveError}</span>
		</div>
	{/if}

	<div class="mt-8 grid grid-cols-1 gap-4">
		{#each daysOfWeek as day, index}
			<div class="flex flex-col">
				<div
					class={`flex items-center justify-between rounded-md bg-gray-100 p-4 ${
						currentDay === index ? 'rounded-b-none' : ''
					}`}
				>
					<div class="flex items-center">
						<h3 class="font-body text-dark-brown text-lg font-bold">{day}</h3>
						{#if formData[index].availabilities.length > 0}
							<span class="text-light-brown ml-2 text-sm">
								({formData[index].availabilities.length}
								{formData[index].availabilities.length === 1 ? 'slot' : 'slots'})
							</span>
						{/if}
					</div>
					<DropdownButton
						ariaLabel={currentDay === index ? 'Hide availability' : 'Show availability'}
						isOpen={currentDay === index}
						onclick={() => setCurrentDay(currentDay === index ? null : index)}
						isDisabled={isSaving}
					/>
				</div>
				{#if currentDay === index}
					<div
						transition:slide={{ duration: 300, easing: quintOut }}
						class="flex w-full flex-col gap-4 rounded-b-md bg-gray-100 p-4"
					>
						<hr class="border-gray-300" />
						{#if isEditing}
							<div
								transition:slide={{ duration: 200, easing: quintOut }}
								class="flex flex-wrap items-center gap-4 rounded-sm bg-white p-4"
							>
								<div class="flex flex-col gap-1">
									<label
										for={`start-${index}`}
										class="font-body text-dark-brown text-sm font-medium">Start Time</label
									>
									<div class="relative">
										<input
											id={`start-${index}`}
											type="time"
											step="900"
											class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-36 appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
											bind:value={currentStart}
											disabled={isSaving}
										/>
									</div>
								</div>
								<div class="flex flex-col gap-1">
									<label for={`end-${index}`} class="font-body text-dark-brown text-sm font-medium"
										>End Time</label
									>
									<div class="relative">
										<input
											id={`end-${index}`}
											type="time"
											step="900"
											class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-36 appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
											bind:value={currentEnd}
											disabled={isSaving}
										/>
									</div>
								</div>
								<div class="flex flex-col justify-end md:h-full">
									<button
										disabled={!currentStart || !currentEnd || timeError !== null || isSaving}
										onclick={addTimeSlot}
										class="font-body bg-light-green text-dark-brown flex h-10 items-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-green-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="h-4 w-4"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M12 6v6m0 0v6m0-6h6m-6 0H6"
											/>
										</svg>
										Add Time
									</button>
								</div>
							</div>
						{/if}

						{#if timeError}
							<div
								transition:fade={{ duration: 200 }}
								class="mt-1 text-sm font-medium text-red-500"
							>
								{timeError}
							</div>
						{/if}

						{#if formData[index].availabilities.length > 0}
							<div class="flex flex-col gap-2">
								<h3 class="font-body text-dark-brown font-medium">Current Availability:</h3>
								<div class="flex flex-wrap gap-2">
									{#each formData[index].availabilities as availability, slotIndex}
										<div
											class="bg-light-green flex items-center gap-1 rounded-full px-3 py-1"
											transition:fade={{ duration: 200 }}
										>
											<span class="font-body text-dark-brown text-sm">
												{formatTime(availability.start)} - {formatTime(availability.end)}
											</span>
											{#if isEditing}
												<button
													transition:fade={{ duration: 150 }}
													onclick={() => removeTimeSlot(index, slotIndex)}
													aria-label="Delete availability"
													class="text-dark-brown hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
													disabled={isSaving}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-4 w-4"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fill-rule="evenodd"
															d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
															clip-rule="evenodd"
														/>
													</svg>
												</button>
											{/if}
										</div>
									{/each}
								</div>
							</div>
						{:else}
							<span class="font-body text-light-brown text-sm italic">
								No availability set for this day
							</span>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
