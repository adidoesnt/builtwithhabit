<script lang="ts">
	import type { Location } from '$lib/server/db/schema';
	import Address from './Address.svelte';
	import PostalCode from './PostalCode.svelte';

	const { availableLocations }: { availableLocations: Location[] } = $props();
</script>

<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
	<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Location Details</h3>
	<p class="font-body text-light-brown mb-3 text-sm">
		Please note that we only provide services in areas near our available locations:
		<span class="font-body text-dark-brown">
			{availableLocations
				.map((loc, index) =>
					index === availableLocations.length - 1 && index !== 0
						? `and ${loc.address}`
						: loc.address
				)
				.join(', ')}.
		</span>
	</p>
	<div class="flex flex-col gap-4 md:flex-row">
		<Address />
		<PostalCode />
	</div>
	<p class="font-body mt-2 text-xs text-gray-500 italic">
		Enter your postal code and we'll automatically populate your address.
	</p>
</div>
