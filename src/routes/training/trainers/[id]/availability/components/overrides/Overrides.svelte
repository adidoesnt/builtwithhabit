<script lang="ts">
	import { fade } from 'svelte/transition';
	import EditButton from '../buttons/EditButton.svelte';
	import CancelButton from '../buttons/CancelButton.svelte';
	import SaveButton from '../buttons/SaveButton.svelte';
	import DropdownButton from '../buttons/DropdownButton.svelte';
	import type { AvailabilityOverride } from '$lib/server/db/schema';
	import OverrideTable from './OverrideTable.svelte';
	import { user as trainer } from '$lib/stores/auth';
	const { overrides }: { overrides: AvailabilityOverride[] } = $props();

	let isEditing = $state(false);
	function setEditing(value: boolean) {
		isEditing = value;
	}

	let isSaving = $state(false);
	let saveError = $state<string | null>(null);
	let saveSuccess = $state(false);

	async function saveOverrides() {
		try {
			isSaving = true;
			saveError = null;

			const response = await fetch(`/training/trainers/${$trainer!.id}/overrides`, {
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

			setTimeout(() => {
				isSaving = false;
			}, 1000);
		} catch (error) {
			saveError = error instanceof Error ? error.message : 'An unknown error occurred';
		} finally {
			isSaving = false;
		}
	}

	let showDropdown = $state(false);
	function setDropdown(value: boolean) {
		showDropdown = value;
	}

	let formData = $state<AvailabilityOverride[]>(overrides);

	let currentStartDate = $state<string>('');
	let currentEndDate = $state<string>('');
	let currentStartTime = $state<string>('');
	let currentEndTime = $state<string>('');

	let currentError = $state<string | null>(null);

	function validateDateTimes() {
		if (!currentStartDate) {
			currentError = 'Start date is required';
			return false;
		}

		if (!currentEndDate) {
			currentError = 'End date is required';
			return false;
		}

		if (!currentStartTime) {
			currentError = 'Start time is required';
			return false;
		}

		if (!currentEndTime) {
			currentError = 'End time is required';
			return false;
		}

		const startDateTime = new Date(`${currentStartDate}T${currentStartTime}`);
		const endDateTime = new Date(`${currentEndDate}T${currentEndTime}`);

		if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
			currentError = 'Invalid date or time format';
			return false;
		}

		if (startDateTime >= endDateTime) {
			currentError = 'Start date/time must be before end date/time';
			return false;
		}

		const timeDifferenceMs = endDateTime.getTime() - startDateTime.getTime();
		const timeDifferenceMinutes = timeDifferenceMs / (1000 * 60);

		if (timeDifferenceMinutes < 30) {
			currentError = 'Start and end times must be at least 30 minutes apart';
			return false;
		}

		currentError = null;
		return true;
	}

	let addDisabled = $derived(
		!currentStartDate || !currentEndDate || !currentStartTime || !currentEndTime || !!currentError
	);

	function addOverride() {
		if (!validateDateTimes()) return;

		const startDateTime = new Date(`${currentStartDate}T${currentStartTime}`);
		const endDateTime = new Date(`${currentEndDate}T${currentEndTime}`);

		formData.push({
			start: startDateTime,
			end: endDateTime,
			trainerId: $trainer!.id
		});

		formData.sort((a, b) => a.start.getTime() - b.start.getTime());

		currentStartDate = '';
		currentEndDate = '';
		currentStartTime = '';
		currentEndTime = '';
		currentError = null;
	}

	function deleteOverride(index: number) {
		formData.splice(index, 1);
	}
</script>

<div class="rounded-lg bg-white p-6 shadow-md">
	<div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
		<div class="flex-grow">
			<h2 class="font-body text-dark-brown text-2xl font-bold">Overrides</h2>
			<p class="font-body text-light-brown">
				Indicate specific time ranges when you are unavailable.
			</p>
		</div>
		<div class="flex justify-end gap-2">
			{#if isEditing}
				<CancelButton onclick={setEditing.bind(null, false)} isDisabled={isSaving} />
				<SaveButton save={saveOverrides} {isSaving} />
			{:else}
				<EditButton
					onclick={() => {
						setEditing(true);
						setDropdown(true);
					}}
					isDisabled={isSaving}
				/>
			{/if}
			<DropdownButton
				ariaLabel="Toggle dropdown"
				isOpen={showDropdown}
				onclick={() => {
					setDropdown(!showDropdown);
					if (!showDropdown) {
						setEditing(false);
					}
				}}
				isDisabled={isSaving}
				className="w-10 h-10"
			/>
		</div>
	</div>

	{#if saveSuccess}
		<div
			transition:fade={{ duration: 300 }}
			class="relative mt-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700"
			role="alert"
		>
			<span class="block sm:inline">Your availability overrides have been saved successfully!</span>
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

	{#if showDropdown}
		<div transition:fade={{ duration: 200 }} class="mt-8">
			<div class="mb-4 flex items-center justify-between">
				<h3 class="font-body text-dark-brown text-lg font-semibold">Unavailable Time Slots</h3>
			</div>
			{#if isEditing}
				<div class="mb-4 w-full rounded-md bg-gray-100 p-4 shadow-sm">
					<div class="mb-2 flex flex-wrap items-end gap-4">
						<div class="flex min-w-[150px] flex-1 flex-col gap-1">
							<label for="start-date" class="font-body text-dark-brown text-sm font-medium"
								>Start Date</label
							>
							<div class="relative">
								<input
									id="start-date"
									type="date"
									class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									bind:value={currentStartDate}
									onchange={validateDateTimes}
								/>
							</div>
						</div>
						<div class="flex min-w-[150px] flex-1 flex-col gap-1">
							<label for="start-time" class="font-body text-dark-brown text-sm font-medium"
								>Start Time</label
							>
							<div class="relative">
								<input
									id="start-time"
									type="time"
									step="900"
									class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									bind:value={currentStartTime}
									onchange={validateDateTimes}
								/>
							</div>
						</div>
						<div class="flex min-w-[150px] flex-1 flex-col gap-1">
							<label for="end-date" class="font-body text-dark-brown text-sm font-medium"
								>End Date</label
							>
							<div class="relative">
								<input
									id="end-date"
									type="date"
									class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									bind:value={currentEndDate}
									onchange={validateDateTimes}
								/>
							</div>
						</div>
						<div class="flex min-w-[150px] flex-1 flex-col gap-1">
							<label for="end-time" class="font-body text-dark-brown text-sm font-medium"
								>End Time</label
							>
							<div class="relative">
								<input
									id="end-time"
									type="time"
									step="900"
									class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-full appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
									bind:value={currentEndTime}
									onchange={validateDateTimes}
								/>
							</div>
						</div>
						<div class="flex h-10 min-w-[150px] flex-1 items-end">
							<button
								class="font-body bg-light-green text-dark-brown flex h-10 w-full items-center justify-center gap-1 rounded-md px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-green-200 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
								disabled={addDisabled}
								onclick={addOverride}
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
								Add Override
							</button>
						</div>
					</div>
					{#if currentError}
						<div class="mt-2 w-fit rounded-md border border-red-200 bg-red-50 p-2">
							<p class="font-body flex items-center text-sm text-red-600">
								<svg
									class="mr-1 h-4 w-4"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clip-rule="evenodd"
									></path>
								</svg>
								{currentError}
							</p>
						</div>
					{/if}
				</div>
			{/if}

			<OverrideTable overrides={formData} onDelete={deleteOverride} {isEditing} />
		</div>
	{/if}
</div>
