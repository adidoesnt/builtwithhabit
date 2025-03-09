<script lang="ts">
	import { onMount } from 'svelte';
	import config from '$lib/config';

	const { pricing } = config.site;
	const { description = null } = $props();

	let activeIndex = $state(0);
	let packagesContainer: HTMLElement;
	let touchStartX = 0;
	let touchEndX = 0;

	const handleScroll = (index: number) => {
		activeIndex = index;
		document.getElementById(`plan-${index}`)?.scrollIntoView({ behavior: 'smooth' });
	};

	const preventScroll = (event: WheelEvent | TouchEvent) => {
		event.preventDefault();
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
			if (activeIndex < config.site.pricing.plans.length - 1) {
				handleScroll(activeIndex + 1);
			}
		}
	};

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
</script>

<section id="pricing" class="bg-light-brown flex h-screen flex-col items-center justify-center p-8">
	<h2 class="font-headings text-dark-brown mb-8 text-center text-3xl font-bold md:text-5xl">
		{pricing.title}
	</h2>
	{#if description}
		<div class="flex flex-col items-center justify-center gap-4 md:gap-0">
			{#each description.split('.') as sentence}
				<p class="font-body text-dark-brown text-center text-lg md:text-xl">
					{sentence}.
				</p>
			{/each}
		</div>
	{/if}

	<div
		bind:this={packagesContainer}
		class="flex w-full gap-4 overflow-hidden pb-4 md:grid md:grid-cols-3 md:overflow-visible"
	>
		{#each config.site.pricing.plans as plan, index}
			<div
				id={`plan-${index}`}
				class="bg-beige flex w-full flex-shrink-0 flex-col items-center rounded-lg p-6 shadow-lg transition-transform duration-300 md:hover:scale-105"
				class:opacity-70={index !== activeIndex}
				class:opacity-100={index === activeIndex}
				class:md:opacity-100={true}
			>
				<h3 class="font-headings text-dark-brown mb-4 text-2xl font-semibold">{plan.name}</h3>
				<p class="font-body text-dark-brown mb-4 text-xl">{plan.sessions} sessions</p>
				<p class="font-body text-dark-brown mb-4 text-xl">
					<span class="text-gray-500 line-through">${plan.discountPrice}</span>
					<span class="text-dark-brown">${plan.price}</span>
				</p>
				<p class="font-body mb-4 text-gray-600">{plan.description}</p>
				<button
					class="bg-dark-brown text-beige font-body rounded-sm p-2 transition-all duration-300 hover:scale-110"
				>
					{plan.buttonText}
				</button>
			</div>
		{/each}
	</div>

	<div class="mt-4 flex justify-center md:hidden">
		{#each config.site.pricing.plans as _, index}
			<button
				aria-label={`Plan ${index + 1}`}
				class="mx-1 h-3 w-3 rounded-full transition-all duration-300"
				class:bg-dark-brown={activeIndex === index}
				class:bg-gray-300={activeIndex !== index}
				onclick={() => handleScroll(index)}
			></button>
		{/each}
	</div>
</section>
