<script lang="ts">
	import type { Package } from '$lib/server/db/schema';

	const { package: fetchedPackage }: { package: Package } = $props();
</script>

<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
	<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Package Details</h3>
	<div class="space-y-3">
		<div>
			<label for="packageName" class="font-body mb-1 block text-gray-500">Package Name</label>
			<input
				type="text"
				id="packageName"
				class="focus:ring-dark-brown font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
				value={fetchedPackage.name}
				disabled
			/>
		</div>

		<div>
			<label for="packageDescription" class="font-body mb-1 block text-gray-500"
				>Number of Sessions</label
			>
			<input
				type="text"
				id="packageDescription"
				class="font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
				value={fetchedPackage.sessions}
				disabled
			/>
		</div>
	</div>
</div>
