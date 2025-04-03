<script lang="ts">
	import { selectedSlots } from '../formState';

	const { formatTimeTo12Hour, toggleSlot, formatDay, numSessions } = $props();
</script>

<div class="mt-4 w-full border-t border-gray-200 pt-4">
	<div class="mb-2 flex flex-col py-2">
		<h3 class="font-body text-dark-brown text-lg font-semibold">Selected Sessions:</h3>
		<p
			class="font-body text-left text-sm {$selectedSlots.length >= numSessions
				? 'text-green-600'
				: 'text-red-600'}"
		>
			Selected {$selectedSlots.length}
			{$selectedSlots.length === 1 ? 'session' : 'sessions'} out of {numSessions}.
		</p>
	</div>
	{#if $selectedSlots.length === 0}
		<p class="font-body text-gray-500">No sessions selected</p>
	{:else}
		<div class="flex flex-wrap gap-2">
			{#each $selectedSlots as slot}
				<div
					class="flex items-center gap-2 rounded-full border border-green-300 bg-green-100 px-3 py-1"
				>
					<span class="font-body text-dark-brown"
						>{formatDay(slot.day)} {formatTimeTo12Hour(slot)}</span
					>
					<button
						onclick={() => toggleSlot(slot)}
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
