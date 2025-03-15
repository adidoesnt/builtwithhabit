<script lang="ts">
	import { user, Role } from '$lib/stores/auth';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	const { availability } = data;

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

	let currentDay = $state<number | null>(null);
	let setCurrentDay = $state((day: number | null) => {
		currentDay = day;
	});

	let currentStart = $state<string | null>(null);
	let currentEnd = $state<string | null>(null);
	let timeError = $state<string | null>(null);

	function validateTimes() {
		if (!currentStart || !currentEnd) {
			timeError = null;
			return false;
		}

		if (currentStart >= currentEnd) {
			timeError = 'Start time must be before end time';
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

			currentStart = null;
			currentEnd = null;
			timeError = null;
		}
	}

	function removeTimeSlot(dayIndex: number, slotIndex: number) {
		formData[dayIndex].availabilities.splice(slotIndex, 1);
	}

	async function saveAvailabilities() {
		isEditing = false;

		await fetch(`/trainers/${$user?.id}/availability`, {
			method: 'PUT',
			body: JSON.stringify(formData)
		});

		window.location.reload();
	}
</script>

{#if $user?.roles.includes(Role.TRAINER)}
	<div class="bg-beige font-body min-h-screen p-4 md:p-8">
		<div class="mx-auto max-w-4xl">
			<div class="mb-8">
				<h1 class="font-heading text-dark-brown text-3xl font-bold">Manage Your Availability</h1>
				<p class="font-body text-light-brown mt-2">
					Set your weekly availability to let clients know when you're available for sessions.
				</p>
			</div>

			<div class="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
				<div class="flex items-center justify-between">
					<h2 class="font-heading text-dark-brown text-2xl font-bold">Weekly Availability</h2>
					{#if isEditing}
						<div class="flex items-center gap-2">
							<button
								onclick={() => (isEditing = false)}
								class="font-body hover:bg-opacity-90 text-dark-brown flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 transition-colors"
							>
								Cancel
							</button>
							<button
								onclick={saveAvailabilities}
								class="font-body bg-dark-brown hover:bg-opacity-90 flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
							>
								Save
							</button>
						</div>
					{:else}
						<button
							onclick={() => (isEditing = true)}
							class="font-body bg-dark-brown hover:bg-opacity-90 flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
						>
							Edit
						</button>
					{/if}
				</div>
				<div class="grid grid-cols-1 gap-4">
					{#each daysOfWeek as day, index}
						<div class="flex flex-col">
							<div
								class={`flex items-center justify-between rounded-md bg-gray-100 p-4 ${
									currentDay === index ? 'rounded-b-none' : ''
								}`}
							>
								<h3 class="font-heading text-dark-brown text-lg font-bold">{day}</h3>
								{#if currentDay !== index}
									<button
										onclick={setCurrentDay.bind(null, index)}
										class="font-body bg-dark-brown hover:bg-opacity-90 flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
									>
										Show
									</button>
								{:else}
									<button
										onclick={setCurrentDay.bind(null, null)}
										class="font-body bg-dark-brown hover:bg-opacity-90 flex items-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
									>
										Hide
									</button>
								{/if}
							</div>
							{#if currentDay === index}
								<div class="flex w-full flex-col gap-4 rounded-b-md bg-gray-100 p-4">
									<hr class="border-gray-300" />
									{#if isEditing}
										<div class="flex flex-wrap items-center gap-4 rounded-sm bg-white p-4">
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
														class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-36 appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none"
														bind:value={currentStart}
													/>
												</div>
											</div>
											<div class="flex flex-col gap-1">
												<label
													for={`end-${index}`}
													class="font-body text-dark-brown text-sm font-medium">End Time</label
												>
												<div class="relative">
													<input
														id={`end-${index}`}
														type="time"
														step="900"
														class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-10 w-36 appearance-none rounded-md border border-gray-300 bg-white py-2 text-sm shadow-sm transition-colors focus:ring-1 focus:outline-none"
														bind:value={currentEnd}
													/>
												</div>
											</div>
											<div class="flex h-full flex-col justify-end">
												<button
													disabled={!currentStart || !currentEnd || timeError !== null}
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
										<div class="mt-1 text-sm font-medium text-red-500">{timeError}</div>
									{/if}

									{#if formData[index].availabilities.length > 0}
										<div class="flex flex-col gap-2">
											<h3 class="font-body text-dark-brown font-medium">Current Availability:</h3>
											<div class="flex flex-wrap gap-2">
												{#each formData[index].availabilities as availability, slotIndex}
													<div
														class="bg-light-green flex items-center gap-1 rounded-full px-3 py-1"
													>
														<span class="font-body text-dark-brown text-sm">
															{availability.start} - {availability.end}
														</span>
														<button
															onclick={() => removeTimeSlot(index, slotIndex)}
															aria-label="Delete availability"
															class="text-dark-brown hover:text-red-600"
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
		</div>
	</div>
{/if}
