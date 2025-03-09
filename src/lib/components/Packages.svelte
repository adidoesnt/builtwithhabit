<script lang="ts">
	import config from '$lib/config';

	const { pricing } = config.site;
	const { description = null } = $props();

	let activeIndex = $state(0);

	const handleScroll = (index: number) => {
		activeIndex = index;
		document.getElementById(`plan-${index}`)?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<section id="pricing" class="bg-light-brown flex h-screen flex-col items-center justify-center p-8">
	<h2 class="font-headings text-dark-brown mb-8 text-center text-3xl font-bold md:text-5xl">
		{pricing.title}
	</h2>
	{#if description}
		<div class="flex flex-col md:gap-0 gap-4 items-center justify-center">
			{#each description.split('.') as sentence}
				<p class="font-body text-dark-brown text-center text-lg md:text-xl">
					{sentence}.
				</p>
			{/each}
		</div>
	{/if}
	<div id="plan-container" class="flex w-full gap-4 overflow-x-auto md:justify-center">
		{#each config.site.pricing.plans as plan, index}
			<div
				id={`plan-${index}`}
				class="bg-beige flex min-w-full flex-col items-center gap-6 rounded-lg p-6 px-16 shadow-2xl transition-transform duration-300 md:min-w-fit"
			>
				<div class="flex flex-col items-center">
					<h3 class="font-headings text-dark-brown mb-4 text-2xl font-semibold md:text-4xl">
						{plan.name}
					</h3>
					<p class="font-body text-dark-brown mb-4 text-lg md:text-2xl">{plan.sessions}</p>
					<p class="font-body text-dark-brown mb-4 text-lg md:text-2xl">
						<span class="text-gray-500 line-through">${plan.discountPrice}</span>
						<span class="text-dark-brown">${plan.price}</span>
					</p>
					<p class="font-body mb-4 text-center text-sm text-gray-600 md:text-base">
						{plan.description}
					</p>
				</div>
				<button
					class="bg-dark-brown font-body text-beige rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
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
