<script lang="ts">
	import { loadStripe } from '@stripe/stripe-js';
	import type { Package } from '$lib/server/db/schema';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import Summary from './Summary.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	const { package: fetchedPackage }: { package: Package } = $props();
	const price = parseFloat(fetchedPackage.price);
	const discount = parseFloat(fetchedPackage.discount ?? '0.00');
	const amount = Math.round((price - discount) * 100);

	let isLoading = $state(false);
	let stripe: any = $state(null);
	let elements: any = $state(null);
	let paymentElement: any = $state(null);
	let paymentElementContainer: HTMLElement | null = $state(null);

	const fetchClientSecret = async () => {
		const result = await fetch('/payment-intent', {
			method: 'POST',
			body: JSON.stringify({ amount }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!result.ok) {
			throw new Error('Failed to fetch client secret');
		}

		const data = await result.json();
		const clientSecret = data.clientSecret;
		console.log('Client secret', clientSecret);
		return clientSecret;
	};

	const initializeStripe = async () => {
		isLoading = true;
		try {
			const stripeInstance = await loadStripe(PUBLIC_STRIPE_KEY);
			stripe = stripeInstance;
			const clientSecret = await fetchClientSecret();

			if (stripe && clientSecret) {
				elements = stripe.elements({
					clientSecret,
					appearance: {
						theme: 'stripe'
					}
				});
				paymentElement = elements.create('payment');
			}
		} catch (error) {
			console.error('Error initializing Stripe:', error);
		} finally {
			isLoading = false;
		}
	};

	$effect(() => {
		initializeStripe();
	});

	$effect(() => {
		if (paymentElement && paymentElementContainer) {
			paymentElement.mount(paymentElementContainer);
		}
	});

	const onsubmit = async (event: Event) => {
		event.preventDefault();
        
		if (!stripe || !elements || !paymentElement) return;

		isLoading = true;
		try {
			console.log('Confirming payment...');
			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					return_url: window.location.origin + '/payment/success'
				}
			});

			if (error) throw error;
		} catch (e) {
			console.error('Payment error:', e);
		} finally {
			isLoading = false;
		}
	};
</script>

<div class="flex flex-col gap-4">
	<Summary package={fetchedPackage} />

	<form {onsubmit}>
		{#if !isLoading}
			<div bind:this={paymentElementContainer}></div>
			<button
				type="submit"
				class="bg-dark-brown hover:bg-brown mt-4 w-full rounded px-4 py-2 text-white transition-colors"
				disabled={isLoading}
			>
				{#if isLoading}
					<LoadingSpinner size="20px" color="#FFFFFF" />
				{:else}
					Pay S${(amount / 100).toFixed(2)}
				{/if}
			</button>
		{:else}
			<div class="flex items-center justify-center gap-2">
				<LoadingSpinner size="24px" color="#8B4513" />
				<span class="font-body text-dark-brown">Loading payment options...</span>
			</div>
		{/if}
	</form>
</div>
