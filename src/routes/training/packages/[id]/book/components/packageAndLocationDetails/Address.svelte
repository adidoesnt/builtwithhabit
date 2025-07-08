<script lang="ts">
	import { address, validationInProgress, isValid } from '../formState';
</script>

<div class="flex-1">
	<label for="address" class="font-body text-dark-brown mb-1 block">Address</label>
	<div class="relative">
		<input
			type="textarea"
			id="address"
			class="font-body w-full rounded-md border border-gray-300 bg-white p-2 focus:ring-2 focus:outline-none
                    {$validationInProgress
				? 'cursor-not-allowed bg-gray-100 text-gray-400'
				: 'cursor-text'}
                    {!$isValid && !$validationInProgress ? 'border-red-500' : ''}
                    {$isValid && $address ? 'border-green-500' : ''}"
			disabled={$validationInProgress}
			bind:value={$address}
		/>
		{#if $validationInProgress}
			<div class="absolute top-1/2 right-3 -translate-y-1/2">
				<div
					class="border-t-dark-brown h-5 w-5 animate-spin rounded-full border-2 border-gray-300"
				></div>
			</div>
		{/if}
	</div>
</div>
