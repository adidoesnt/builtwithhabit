<script lang="ts">
	import {
		loadStripe,
		type Stripe,
		type StripeElements,
		type StripePaymentElement
	} from '@stripe/stripe-js';
	import type { Package } from '$lib/server/db/schema';
	import { PUBLIC_STRIPE_KEY } from '$env/static/public';
	import Summary from './Summary.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';
	import { purchaseId } from '../formState';

	const { package: fetchedPackage }: { package: Package } = $props();
	const price = parseFloat(fetchedPackage.price);
	const discount = parseFloat(fetchedPackage.discount ?? '0.00');
	const amount = Math.round((price - discount) * 100);

	let isLoading = $state(false);
	let stripe: Stripe | null = $state(null);
	let elements: StripeElements | null = $state(null);
	let paymentElement: StripePaymentElement | null = $state(null);
	let paymentElementContainer: HTMLElement | null = $state(null);
	let isMounted = $state(false);
	let isSubmitting = $state(false);
	let redirectUrl = $state('');

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
		return clientSecret;
	};

	const updatePurchase = async (clientSecret: string) => {
		const result = await fetch(`/purchases/${$purchaseId}`, {
			method: 'PUT',
			body: JSON.stringify({ paymentIntentClientSecret: clientSecret }),
			headers: {
				'Content-Type': 'application/json'
			}
		});

		if (!result.ok) {
			throw new Error('Failed to update purchase');
        }

		const data = await result.json();
		return data;
	};

	const initializeStripe = async () => {
		isLoading = true;
		try {
			const stripeInstance = await loadStripe(PUBLIC_STRIPE_KEY);
			stripe = stripeInstance;
			const clientSecret = await fetchClientSecret();

			await updatePurchase(clientSecret);

			const id = clientSecret.split('_')[1];
			redirectUrl = `/payment-intent/${id}`;

			if (stripe && clientSecret) {
				elements = stripe.elements({
					clientSecret,
					appearance: {
						theme: 'stripe'
					}
				});
				paymentElement = elements.create('payment');

				if (paymentElementContainer) {
					mountPaymentElement();
				}
			}
		} catch (error) {
			console.error('Error initializing Stripe:', error);
		} finally {
			isLoading = false;
		}
	};

	const mountPaymentElement = () => {
		if (paymentElement && paymentElementContainer && !isMounted) {
			try {
				paymentElement.mount(paymentElementContainer);
				isMounted = true;
				console.log('Payment element mounted successfully');
			} catch (error) {
				console.error('Error mounting payment element:', error);
			}
		}
	};

	$effect(() => {
		initializeStripe();
	});

	$effect(() => {
		if (paymentElementContainer) {
			mountPaymentElement();
		}
	});

	const onsubmit = async (event: Event) => {
		event.preventDefault();
		isSubmitting = true;

		if (!stripe || !elements || !paymentElement) {
			console.error('Missing required Stripe components:', {
				stripe: !!stripe,
				elements: !!elements,
				paymentElement: !!paymentElement
			});
			isSubmitting = false;
			return;
		}

		try {
			console.log('Confirming payment...');
			const { error } = await stripe.confirmPayment({
				elements,
				redirect: 'if_required',
				confirmParams: {
					return_url: window.location.origin + redirectUrl
				}
			});

			if (error) throw error;
			goto('/dashboard');
		} catch (e) {
			console.error('Payment error:', e);
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="flex flex-col gap-4">
	<Summary package={fetchedPackage} />

	<form {onsubmit}>
		<div class="relative">
			{#if isLoading}
				<div class="bg-opacity-80 absolute inset-0 z-10 flex items-center justify-center bg-white">
					<div class="flex items-center justify-center gap-2">
						<LoadingSpinner size="24px" color="#8B4513" />
						<span class="font-body text-dark-brown">Loading payment options...</span>
					</div>
				</div>
			{/if}

			<div bind:this={paymentElementContainer} class="min-h-[200px]"></div>
		</div>

		<button
			type="submit"
			class="bg-dark-brown hover:bg-brown font-body mt-4 flex w-full items-center justify-center gap-2 rounded px-4 py-2 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
			disabled={isLoading || isSubmitting}
		>
			{#if isSubmitting}
				<LoadingSpinner size="20px" color="#FFFFFF" />
			{:else}
				Pay S${(amount / 100).toFixed(2)}
			{/if}
		</button>
	</form>
</div>
