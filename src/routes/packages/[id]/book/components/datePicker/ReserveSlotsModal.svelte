<script lang="ts">
	import { selectedSlots, address, postalCode, setPurchaseId } from '../formState';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	const { isOpen, onProceed, onCancel, packageId, onError } = $props();

	const convertSlotsToDates = (slots: Array<{ day: Date; hour: number; minutes: number }>) => {
		return slots.map((slot) => {
			const date = new Date(slot.day);
			date.setHours(slot.hour, slot.minutes, 0, 0);
			return date;
		});
	};

	let isLoading = $state(false);

	const reserveSelectedSlots = async () => {
		try {
			isLoading = true;
			const slotDates = convertSlotsToDates($selectedSlots);

			const response = await fetch('/purchases', {
				method: 'POST',
				body: JSON.stringify({
					packageId,
					address: $address,
					postalCode: $postalCode,
					slots: slotDates
				})
			});

			if (!response.ok) {
				throw new Error('Failed to reserve slots');
			}

			const data = await response.json();
			setPurchaseId(data.purchaseId);

			onProceed();
		} catch (error) {
			console.error('Error reserving slots:', error);
			onError();
		} finally {
			isLoading = false;
		}
	};
</script>

{#if isOpen}
	<div class="fixed z-50 m-0 flex h-[100dvh] w-screen items-center justify-center backdrop-blur-xl">
		<div
			class="flex h-[100dvh] w-[100dvw] flex-col items-center justify-center gap-4 rounded-lg bg-white p-4 shadow-xl md:h-fit md:w-fit"
		>
			<h1 class="font-body text-dark-brown text-2xl font-bold">Disclaimer</h1>
			<hr class="border-dark-brown w-full" />
			<p class="font-body text-dark-brown md:text-left text-center">
				Please note that by clicking next, you are reserving the selected slot(s). In case of
				failure to make payment within 15 minutes, the slot(s) will be released.
			</p>
			<div class="font-body flex gap-4">
				<button
					type="button"
					onclick={onCancel}
					class="text-dark-brown cursor-pointer rounded-md bg-gray-100 px-4 py-2 transition-colors duration-300 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isLoading}>Cancel</button
				>
				<button
					type="button"
					onclick={reserveSelectedSlots}
					class="bg-dark-brown hover:bg-dark-brown/90 flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-white transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50"
					disabled={isLoading}
					>{#if isLoading}
						<LoadingSpinner size="20px" color="#FFFFFF" />
						<span class="ml-2">Processing...</span>
					{:else}
						Proceed to Payment
					{/if}</button
				>
			</div>
		</div>
	</div>
{/if}
