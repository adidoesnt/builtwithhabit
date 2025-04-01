<script lang="ts">
	import { selectedSlots } from '../formState';

	const { isOpen, onProceed, onCancel } = $props();

	const convertSlotsToDates = (slots: Array<{ day: Date; hour: number; minutes: number }>) => {
		return slots.map((slot) => {
			const date = new Date(slot.day);
			date.setHours(slot.hour, slot.minutes, 0, 0);
			return date;
		});
	};

	const reserveSelectedSlots = async () => {
		try {
			const slotDates = convertSlotsToDates($selectedSlots);
			console.log('Reserving slots:', slotDates);
			// TODO: Implement reservation logic, call API to reserve slots
			onProceed();
		} catch (error) {
			console.error('Error reserving slots:', error);
			// TODO: Handle error, show error message to user
		}
	};
</script>

{#if isOpen}
	<div class="fixed m-0 flex h-screen w-screen items-center justify-center backdrop-blur-xl z-50">
		<div
			class="flex max-w-[50dvw] flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-xl"
		>
			<h1 class="font-body text-dark-brown text-2xl font-bold">Disclaimer</h1>
			<hr class="border-dark-brown w-full" />
			<p class="font-body text-dark-brown">
				Please note that by clicking next, you are reserving the selected slot(s). In case of
				payment failure, the slot(s) will be released.
			</p>
			<div class="font-body flex gap-4">
				<button
					type="button"
					onclick={onCancel}
					class="text-dark-brown cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-colors duration-300 hover:bg-gray-200"
					>Cancel</button
				>
				<button
					type="button"
					onclick={reserveSelectedSlots}
					class="bg-dark-brown hover:bg-dark-brown/90 cursor-pointer rounded-md px-4 py-2 text-white transition-colors duration-300"
					>Proceed to Payment</button
				>
			</div>
		</div>
	</div>
{/if}
