<script lang="ts">
	import { selectedSlots } from '../formState';

	const { formatTimeTo12Hour, toggleSlot, formatDay, numSessions } = $props();
	const numSelectedSlots = $derived($selectedSlots.length)

	let invalidNumSelected = $derived(numSelectedSlots < numSessions);
	let invalidNumFontColor = $derived(invalidNumSelected ? 'text-red-500' : 'text-green-600')
</script>

<div class="mt-4 w-full border-t border-gray-200 pt-4">
	<div class="flex flex-col py-2 mb-2">
		<h3 class="font-body text-dark-brown text-lg font-semibold">Selected Sessions:</h3>
		<p class={`font-body ${invalidNumFontColor}`}>{numSelectedSlots} sessions out of {numSessions} selected</p>
	</div>
	{#if $selectedSlots.length === 0}
		<p class="text-gray-500 font-body">No sessions selected</p>
	{:else}
		<div class="flex flex-wrap gap-2">
			{#each $selectedSlots as slot}
				<div
					class="flex items-center gap-2 rounded-full border border-green-300 bg-green-100 px-3 py-1"
				>
					<span class="font-body text-dark-brown">{formatDay(slot.day)} {formatTimeTo12Hour(slot)}</span>
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
