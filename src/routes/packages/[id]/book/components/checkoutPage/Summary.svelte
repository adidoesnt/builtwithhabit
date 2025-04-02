<script lang="ts">
	import { selectedSlots } from '../formState';

	const { package: fetchedPackage } = $props();

	const formatDate = (slot: { day: Date; hour: number; minutes: number }) => {
		const date = new Date(slot.day);
		return date.toLocaleDateString('en-GB', {
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric'
		});
	};

	const formatTime = (slot: { hour: number; minutes: number }) => {
		const startHours = slot.hour.toString().padStart(2, '0');
		const startMinutes = slot.minutes.toString().padStart(2, '0');
		const endHour = (slot.hour + 1).toString().padStart(2, '0');
		const endMinutes = slot.minutes.toString().padStart(2, '0');
		return `${startHours}:${startMinutes} - ${endHour}:${endMinutes}`;
	};

	const parsedPrice = $derived(parseFloat(fetchedPackage.price));
	const discount = $derived(parseFloat(fetchedPackage.discount) || 0);
	const discountedPrice = $derived(parsedPrice - discount);
</script>

<div class="rounded-lg bg-white p-6 shadow-md">
	<h2 class="font-body text-dark-brown mb-4 text-xl font-semibold">Order Summary</h2>

	<div class="space-y-4">
		<div class="border-b border-gray-200 pb-4">
			<h3 class="font-body text-dark-brown mb-2 font-bold">Package</h3>
			<div class="space-y-1">
				<p class="font-body text-dark-brown">{fetchedPackage.name} Package</p>
				{#if discount > 0}
					<p class="font-body text-green-600">S${discount.toFixed(2)} discount applied</p>
				{/if}
			</div>
		</div>

		<div class="border-b border-gray-200 pb-4">
			<h3 class="font-body text-dark-brown mb-2 font-bold">Selected Sessions</h3>
			<div class="space-y-2">
				{#each $selectedSlots as slot, index}
					<div class="flex items-center justify-between">
						<div class="flex items-center gap-3">
							<span class="font-body text-dark-brown font-medium">#{index + 1}</span>
							<div>
								<p class="font-body text-dark-brown">{formatDate(slot)}</p>
								<p class="font-body text-light-brown">{formatTime(slot)}</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<div class="flex flex-col gap-2 pt-2">
			<div class="flex items-center justify-between">
				<span class="font-body text-dark-brown font-medium">Package Price</span>
				<span class="font-body text-dark-brown">S${parsedPrice.toFixed(2)}</span>
			</div>
			{#if discount > 0}
				<div class="flex items-center justify-between">
					<span class="font-body font-medium text-green-600">Discount</span>
					<span class="font-body text-green-600">-S${discount.toFixed(2)}</span>
				</div>
			{/if}
			<div class="flex items-center justify-between border-t border-gray-200 pt-2">
				<span class="font-body text-dark-brown font-medium">Total</span>
				<span class="font-body text-dark-brown font-semibold">S${discountedPrice.toFixed(2)}</span>
			</div>
		</div>
	</div>
</div>
