<script lang="ts">
	import type { AvailabilityOverride } from '$lib/server/db/schema';

	const {
		overrides,
		onDelete,
		isEditing
	}: { overrides: AvailabilityOverride[]; onDelete: (index: number) => void; isEditing: boolean } =
		$props();

	function formatDate(date: Date) {
		if (!date) return '';
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatTime(time: Date) {
		if (!time) return '';
		const hours = time.getHours();
		const minutes = time.getMinutes();
		const period = hours >= 12 ? 'PM' : 'AM';
		const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
		return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
	}
</script>

<div class="w-full overflow-hidden">
	{#if overrides.length === 0}
		<div class="w-full rounded-lg bg-gray-100 p-8 text-center shadow-sm">
			<p class="font-body text-light-brown">No overrides found.</p>
		</div>
	{:else}
		<div class="w-full overflow-x-auto rounded-lg bg-white shadow-sm">
			<table class="w-full border-collapse">
				<thead class="bg-gray-50">
					<tr>
						<th class="font-body text-dark-brown border-b p-4 text-left">Start Date</th>
						<th class="font-body text-dark-brown border-b p-4 text-left">End Date</th>
						<th class="font-body text-dark-brown border-b p-4 text-left">Start Time</th>
						<th class="font-body text-dark-brown border-b p-4 text-left">End Time</th>
						{#if isEditing}
							<th class="font-body text-dark-brown border-b p-4 text-center">Actions</th>
						{/if}
					</tr>
				</thead>
				<tbody>
					{#each overrides as override, i}
						<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
							<td class="font-body text-dark-brown border-b p-4">{formatDate(override.start)}</td>
							<td class="font-body text-dark-brown border-b p-4">{formatDate(override.end)}</td>
							<td class="font-body text-dark-brown border-b p-4">{formatTime(override.start)}</td>
							<td class="font-body text-dark-brown border-b p-4">{formatTime(override.end)}</td>
							{#if isEditing}
								<td class="font-body text-dark-brown border-b p-4">
									<div class="flex justify-center gap-2">
										<button
											class="text-red-600 hover:text-red-800"
											title="Delete override"
											aria-label="Delete override"
											onclick={() => onDelete(i)}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
												/>
											</svg>
										</button>
									</div>
								</td>
							{/if}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
