<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Package } from '$lib/server/db/schema';
	import config from '$lib/config';
	import ReschedulingInfo from './ReschedulingInfo.svelte';

	const { pricing } = config.site;

	const {
		packages,
		description,
		showTestimonialsButton = false,
		altColors = false,
		showReschedulingInfo = false,
		showLearnMoreLink = false
	}: {
		packages: Package[];
		description?: string;
		showTestimonialsButton?: boolean;
		altColors?: boolean;
		showReschedulingInfo?: boolean;
		showLearnMoreLink?: boolean;
	} = $props();

	let activeIndex = $state(0);
	let packagesContainer: HTMLElement;
	let touchStartX = 0;
	let touchEndX = 0;

	const handleScroll = (index: number, event?: Event) => {
		if (event) event.preventDefault();
		activeIndex = index;

		if (packagesContainer) {
			const cardWidth = packagesContainer.querySelector(`#plan-${index}`)?.clientWidth || 0;
			const cardGap = 16;
			packagesContainer.scrollTo({
				left: index * (cardWidth + cardGap),
				behavior: 'smooth'
			});
		}
	};

	const preventScroll = (event: WheelEvent | TouchEvent) => {
		// Only prevent horizontal scrolling
		if (event instanceof WheelEvent) {
			if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
				event.preventDefault();
			}
		} else if (event instanceof TouchEvent) {
			// Handled by touch handlers
		}
	};

	const handleTouchStart = (event: TouchEvent) => {
		touchStartX = event.touches[0].clientX;
	};

	const handleTouchEnd = (event: TouchEvent) => {
		touchEndX = event.changedTouches[0].clientX;
		handleSwipe();
	};

	const handleSwipe = () => {
		const swipeThreshold = 50;
		const swipeDistance = touchEndX - touchStartX;

		if (Math.abs(swipeDistance) < swipeThreshold) return;

		if (swipeDistance > 0) {
			if (activeIndex > 0) {
				handleScroll(activeIndex - 1);
			}
		} else {
			if (activeIndex < packages.length - 1) {
				handleScroll(activeIndex + 1);
			}
		}
	};

	function handleDotClick(index: number, event: MouseEvent) {
		event.preventDefault();
		handleScroll(index, event);
	}

	onMount(() => {
		if (packagesContainer) {
			packagesContainer.addEventListener('wheel', preventScroll, { passive: false });
			packagesContainer.addEventListener('touchmove', preventScroll, { passive: false });
			packagesContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
			packagesContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
		}

		return () => {
			if (packagesContainer) {
				packagesContainer.removeEventListener('wheel', preventScroll);
				packagesContainer.removeEventListener('touchmove', preventScroll);
				packagesContainer.removeEventListener('touchstart', handleTouchStart);
				packagesContainer.removeEventListener('touchend', handleTouchEnd);
			}
		};
	});

	const scrollToTestimonials = () => {
		document.getElementById('testimonials-section')?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<div>
	{#if description}
		<div class="flex flex-col items-center justify-center gap-2 md:gap-0">
			{#each description.split('.') as sentence, index}
				<p class="font-body text-dark-brown text-md text-left md:text-center md:text-xl">
					{sentence}{#if index < description.split('.').length - 1}
						.
					{/if}
				</p>
			{/each}
		</div>
	{/if}

	<div
		bind:this={packagesContainer}
		class="flex w-full gap-4 overflow-hidden md:grid md:grid-cols-3 md:overflow-visible md:px-4"
	>
		{#each packages as plan, index}
			<div
				id={`plan-${index}`}
				class={`${altColors ? 'bg-beige' : 'bg-white'} relative flex w-full flex-shrink-0 flex-col items-center gap-8 rounded-lg p-6 pt-8 shadow-xl transition-transform duration-300 ${
					index === activeIndex ? 'opacity-100' : 'opacity-70'
				} md:opacity-100 md:hover:scale-105`}
			>
				<h3 class="font-body text-dark-brown text-2xl font-semibold uppercase md:text-3xl">
					{plan.name}
				</h3>
				<div class="flex flex-col items-center justify-center">
					<p class="font-body text-dark-brown text-xl">
						{plan.sessions}
						{plan.sessions === 1 ? 'session' : 'sessions'}
					</p>
					<p class="font-body text-center text-gray-600">{plan.description}</p>
				</div>
				<div class="flex flex-col items-center justify-center text-center">
					<p class="font-body text-dark-brown text-xl">
						{pricing.currency}{plan.price}
						<span class="text-gray-500">in total</span>
					</p>
					<p class="font-body text-light-brown text-md mb-4">
						{pricing.currency}{(parseFloat(plan.price) / plan.sessions).toFixed(2)} per session
					</p>
				</div>
				<button
					class="bg-dark-brown text-beige font-body mt-auto rounded-sm p-2 transition-all duration-300 hover:scale-110"
					onclick={() => goto(`/training/packages/${plan.id}/book`)}
				>
					{pricing.plans.buttonText}
				</button>
			</div>
		{/each}
	</div>

	<div class="flex justify-center md:hidden mt-8">
		{#each packages as _, index}
			<button
				aria-label={`Plan ${index + 1}`}
				class="mx-1 h-3 w-3 rounded-full transition-all duration-300"
				class:bg-dark-brown={activeIndex === index}
				class:bg-gray-300={activeIndex !== index}
				onclick={(e) => handleDotClick(index, e)}
			></button>
		{/each}
	</div>

	{#if showLearnMoreLink}
		<div class="mt-4">
			<a
				href="/training/packages/learn-more"
				class="font-body bg-dark-brown text-beige inline-block rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
				>Learn More</a
			>
		</div>
	{/if}

	{#if showReschedulingInfo}
		<div class="mt-4">
			<ReschedulingInfo className="text-sm my-2 md:my-0 font-body text-center text-light-brown" />
		</div>
	{/if}

	{#if showTestimonialsButton}
		<div class="flex flex-col items-center justify-center">
			<button
				class="font-body bg-dark-brown text-beige flex w-fit self-center rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
				onclick={scrollToTestimonials}>{pricing.viewTestimonials}</button
			>
		</div>
	{/if}
</div>
