<script lang="ts">
	import type { Package } from '$lib/server/db/schema';

	const { packages }: { packages: Package[] } = $props();
</script>

<div class="hidden h-fit overflow-hidden rounded-lg bg-white shadow-lg md:block">
	<table class="w-full border-collapse">
		<thead class="bg-gray-50">
			<tr>
				<th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
				<th class="font-body text-dark-brown border-b p-4 text-left">Sessions</th>
				<th class="font-body text-dark-brown border-b p-4 text-left">Price</th>
				<th class="font-body text-dark-brown border-b p-4 text-left">Description</th>
			</tr>
		</thead>
		<tbody>
			{#each packages as packageItem, i}
				<tr class={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
					<td class="font-body text-dark-brown overflow-y-auto border-b p-4">{packageItem.name}</td>
					<td class="font-body text-dark-brown overflow-y-auto border-b p-4"
						>{packageItem.sessions}</td
					>
					<td class="font-body text-dark-brown overflow-y-auto border-b p-4 whitespace-nowrap"
						>{packageItem.price}</td
					>
					<td class="font-body text-dark-brown overflow-y-auto border-b p-4 text-wrap"
						>{packageItem.longDescription}</td
					>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
