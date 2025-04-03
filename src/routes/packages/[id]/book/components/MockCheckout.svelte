<script lang="ts">
	import type { Package } from '$lib/server/db/schema';

	const { fetchedPackage }: { fetchedPackage: Package } = $props();
</script>

<div>
	<div class="mb-6">
		<h3 class="font-body text-dark-brown mb-4 text-xl font-semibold">Order Summary</h3>

		<div class="mb-4 rounded-md bg-gray-100 p-4">
			<div class="mb-2 flex justify-between">
				<span class="font-body text-dark-brown">{fetchedPackage.name} Package</span>
				<span class="font-body text-dark-brown">$199.00</span>
			</div>
			<div class="mb-2 flex justify-between text-sm">
				<span class="font-body text-light-brown">{fetchedPackage.sessions} sessions</span>
				<span class="font-body text-light-brown">$33.17 per session</span>
			</div>
			{#if fetchedPackage.discount && parseFloat(fetchedPackage.discount) > 0}
				<div class="flex justify-between text-sm text-green-600">
					<span class="font-body">Discount</span>
					<span class="font-body">-$20.00</span>
				</div>
			{/if}
			<hr class="my-2 border-gray-300" />
			<div class="flex justify-between font-semibold">
				<span class="font-body text-dark-brown">Total</span>
				<span class="font-body text-dark-brown">$179.00</span>
			</div>
		</div>

		<div class="mb-4">
			<h4 class="font-body text-dark-brown mb-2 font-semibold">Selected Dates:</h4>
			<ul class="space-y-1">
				<li class="font-body text-light-brown text-sm">Monday, June 10, 2024</li>
				<li class="font-body text-light-brown text-sm">Wednesday, June 12, 2024</li>
				<li class="font-body text-light-brown text-sm">Monday, June 17, 2024</li>
				<li class="font-body text-light-brown text-sm">Wednesday, June 19, 2024</li>
				<li class="font-body text-light-brown text-sm">Monday, June 24, 2024</li>
				<li class="font-body text-light-brown text-sm">Wednesday, June 26, 2024</li>
			</ul>
		</div>
	</div>

	<div class="mb-6">
		<h3 class="font-body text-dark-brown mb-4 text-xl font-semibold">Payment Details</h3>

		<div class="rounded-md border border-gray-300 p-4">
			<div class="mb-4">
				<label for="card-number" class="font-body text-dark-brown mb-1 block">Card Number</label>
				<input
					type="text"
					id="card-number"
					placeholder="1234 5678 9012 3456"
					class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
				/>
			</div>

			<div class="mb-4 flex gap-4">
				<div class="flex-1">
					<label for="expiry" class="font-body text-dark-brown mb-1 block">Expiry Date</label>
					<input
						type="text"
						id="expiry"
						placeholder="MM/YY"
						class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
					/>
				</div>
				<div class="flex-1">
					<label for="cvc" class="font-body text-dark-brown mb-1 block">CVC</label>
					<input
						type="text"
						id="cvc"
						placeholder="123"
						class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
					/>
				</div>
			</div>

			<div>
				<label for="name-on-card" class="font-body text-dark-brown mb-1 block">Name on Card</label>
				<input
					type="text"
					id="name-on-card"
					placeholder="John Doe"
					class="focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none"
				/>
			</div>
		</div>
	</div>
</div>
