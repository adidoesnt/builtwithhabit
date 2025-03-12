<script lang="ts">
	import type { Package } from "$lib/server/db/schema";

    const { fetchedPackage }: { fetchedPackage: Package } = $props();
</script>

<div>
    <div class="mb-4 text-center">
        <p class="font-body text-dark-brown mb-2">
            Select {fetchedPackage.sessions} dates for your sessions
        </p>
        <p class="font-body text-light-brown text-sm">
            0 of {fetchedPackage.sessions} dates selected
        </p>
    </div>

    <div class="mb-6 rounded-md border border-gray-300 p-6">
        <div class="text-center">
            <h3 class="font-body text-dark-brown mb-4 text-lg font-semibold">
                Calendar Placeholder
            </h3>
            <p class="font-body text-light-brown mb-4">
                This is where the calendar for selecting session dates would appear.
            </p>
            <p class="font-body text-light-brown text-sm">
                Users would be able to select {fetchedPackage.sessions} dates for their training sessions.
            </p>
        </div>
    </div>

    <div class="rounded-md bg-gray-100 p-4">
        <h4 class="font-body text-dark-brown mb-2 font-semibold">Selected Dates:</h4>
        <p class="font-body text-light-brown text-sm italic">No dates selected yet</p>
    </div>
</div>