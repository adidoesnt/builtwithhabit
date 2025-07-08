<script lang="ts">
	const { page }: { page: number } = $props();
</script>

<div class="mb-8">
	<div class="mb-2 flex justify-between">
		<span class="font-body text-light-brown text-sm">Questions</span>
		<span class="font-body text-light-brown text-sm">Select Dates</span>
		<span class="font-body text-light-brown text-sm">Payment</span>
	</div>
	<div class="h-2 w-full overflow-hidden rounded-full bg-gray-200">
		<div
			class="bg-dark-brown h-full transition-all duration-300"
			style="width: {(page + 1) * 33.33}%"
		></div>
	</div>
</div>
