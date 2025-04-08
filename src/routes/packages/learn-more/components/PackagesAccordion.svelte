<script lang="ts">
	import config from '$lib/config';
	import { slide } from 'svelte/transition';

	const {
		packages: { learnMore }
	} = config;
	let openIndex = $state(-1);

	function toggleAccordion(index: number) {
		openIndex = openIndex === index ? -1 : index;
	}
</script>

<div class="flex flex-col gap-2 md:hidden">
	{#each learnMore.packages as packageItem, i}
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<button
				class="w-full cursor-pointer border-none bg-gray-50 p-4 text-left"
				onclick={() => toggleAccordion(i)}
				aria-expanded={openIndex === i}
			>
				<div class="flex items-center justify-between">
					<div class="flex flex-col gap-1">
						<h3 class="font-body text-dark-brown font-semibold">{packageItem.name}</h3>
						<p class="font-body text-dark-brown text-sm">{packageItem.sessions} Sessions</p>
					</div>
					<svg
						class="text-dark-brown h-5 w-5 transform transition-transform duration-200 {openIndex ===
						i
							? 'rotate-180'
							: ''}"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</button>
			{#if openIndex === i}
				<div class="border-t" transition:slide>
					<div class="font-body text-dark-brown p-4">
						{packageItem.description}
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
