<script lang="ts">
	import {
		postalCode,
		validationInProgress,
		isValid,
		message,
		address,
		setIsValid,
		setAddress,
		setMessage,
		setValidationInProgress
	} from '../formState';

	const validatePostalCode = async () => {
		// MOCK:
		// setIsValid(true);
		// setAddress('123 Main St, Singapore');
		// setMessage('Address found');
		// setValidationInProgress(false);
		// return;

		if ($postalCode.length !== 6) {
			setIsValid(false);
			setMessage('Postal code must be 6 characters (e.g., 123456)');
			setValidationInProgress(false);
			return;
		}

		try {
			setIsValid(true);
			setValidationInProgress(true);
			setMessage('Validating postal code...');

			const response = await fetch(`/location/${$postalCode}/address`);

			if (response.ok) {
				const data = await response.json();
				const { address, isValid } = data;

				if (data.isValid && data.address) {
					setAddress(
						address.label ||
							`${address.street || ''}, ${address.municipality || ''}, ${address.region || ''}`
					);

					setIsValid(isValid);
					setMessage('Address found');
				} else {
					setMessage(data.message || 'Could not find address for this postal code');
				}
			} else {
				setIsValid(false);
				setMessage('Postal code is invalid or too far away');
			}
		} catch (error) {
			console.error('Error validating postal code:', error);
			setIsValid(false);
			setMessage('Error connecting to validation service');
		} finally {
			setValidationInProgress(false);
		}
	};
</script>

<div class="md:w-1/3">
	<label for="postalCode" class="font-body text-dark-brown mb-1 block">Postal Code</label>
	<div class="relative">
		<input
			type="text"
			id="postalCode"
			class="font-body w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:outline-none
                {$validationInProgress
				? 'cursor-not-allowed bg-gray-100 text-gray-400'
				: 'cursor-text'}
                {!$isValid && !$validationInProgress ? 'border-red-500' : ''}
                {$isValid && $address ? 'border-green-500' : ''}"
			bind:value={$postalCode}
			disabled={$validationInProgress}
			oninput={validatePostalCode}
			placeholder="123456"
		/>
		{#if $validationInProgress}
			<div class="absolute top-1/2 right-3 -translate-y-1/2">
				<div
					class="border-t-dark-brown h-5 w-5 animate-spin rounded-full border-2 border-gray-300"
				></div>
			</div>
		{/if}
	</div>
	{#if $message}
		<p class="mt-1 text-sm {$isValid ? 'text-green-600' : 'text-red-500'}">
			{$message}
		</p>
	{/if}
</div>
