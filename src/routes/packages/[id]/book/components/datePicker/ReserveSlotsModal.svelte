<script lang="ts">
	const { isOpen, onProceed, onCancel } = $props();
</script>

{#if isOpen}
	<div class="fixed m-0 flex h-screen w-screen items-center justify-center backdrop-blur-xl">
		<div class="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-xl gap-4 max-w-[50dvw]">
			<h1 class="font-body text-dark-brown text-2xl font-bold">Disclaimer</h1>
			<hr class="border-dark-brown w-full" />
			<p class="font-body text-dark-brown">
				Please note that by clicking next, you are reserving the selected slot(s). In case of
				payment failure, the slot(s) will be released.
			</p>
			<div class="flex gap-4 font-body">
				<button
					type="button"
					onclick={onCancel}
					class="text-dark-brown rounded-md px-4 py-2 hover:bg-gray-200 bg-gray-100 transition-colors cursor-pointer duration-300">Cancel</button
				>
				<button
					type="button"
					onclick={onProceed}
					class="bg-dark-brown rounded-md px-4 py-2 text-white hover:bg-dark-brown/90 transition-colors cursor-pointer duration-300">Proceed to Payment</button
				>
			</div>
		</div>
	</div>
{/if}
