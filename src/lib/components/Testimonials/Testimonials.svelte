<script lang="ts">
	import { onMount } from 'svelte';
	import { testimonials } from '$lib/mocks/testimonials';
	import TestimonialCard from './TestimonialCard.svelte';

	const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
	const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

	const firstRowLoop = [
		...firstRow.map((t) => ({ ...t, id: `original-${t.id}` })),
		...firstRow.map((t) => ({ ...t, id: `duplicate-${t.id}` }))
	];

	const secondRowLoop = [
		...secondRow.map((t) => ({ ...t, id: `original-${t.id}` })),
		...secondRow.map((t) => ({ ...t, id: `duplicate-${t.id}` }))
	];

	let isVisible = false;

	onMount(() => {
		isVisible = true;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.1 }
		);

		const section = document.getElementById('testimonials-section');
		if (section) observer.observe(section);

		return () => {
			if (section) observer.unobserve(section);
		};
	});
</script>

<section id="testimonials-section" class="bg-beige py-16">
	<div class="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
		<div class="mb-8 text-center">
			<h2 class="font-headings text-dark-brown text-3xl font-bold md:text-5xl">
				What Our Clients Say
			</h2>
			<p class="font-body text-light-brown mx-auto mt-4 max-w-3xl">
				Real stories from women who have transformed their relationship with fitness through our
				personalised approach.
			</p>
		</div>

		<div id="testimonials-mobile" class="flex flex-col gap-4 md:hidden">
			{#each testimonials as testimonial}
				<div class="flex h-auto w-full">
					<TestimonialCard {testimonial} />
				</div>
			{/each}
		</div>

		<div id="testimonials-desktop" class="hidden md:flex md:flex-1 md:flex-col md:justify-center">
			<div class="relative mb-8">
				<div
					class="from-beige absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent"
				></div>
				<div
					class="from-beige absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent"
				></div>

				<div class="overflow-hidden">
					<div
						class={`flex w-fit items-stretch ${isVisible ? 'animate-scroll-left hover:animate-pause' : ''}`}
					>
						{#each firstRowLoop as testimonial (testimonial.id)}
							<div class="mx-4 flex min-h-[300px] flex-none">
								<TestimonialCard
									testimonial={{
										...testimonial,
										id: Number(testimonial.id.replace('original-', '').replace('duplicate-', ''))
									}}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="relative">
				<div
					class="from-beige absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent"
				></div>
				<div
					class="from-beige absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent"
				></div>

				<div class="overflow-hidden">
					<div
						class={`flex w-fit items-stretch ${isVisible ? 'animate-scroll-right hover:animate-pause' : ''}`}
					>
						{#each secondRowLoop as testimonial (testimonial.id)}
							<div class="mx-4 flex min-h-[300px] flex-none">
								<TestimonialCard
									testimonial={{
										...testimonial,
										id: Number(testimonial.id.replace('original-', '').replace('duplicate-', ''))
									}}
								/>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style global>
	@keyframes scroll-left {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-50%));
		}
	}

	@keyframes scroll-right {
		0% {
			transform: translateX(calc(-50%));
		}
		100% {
			transform: translateX(0);
		}
	}

	.animate-scroll-left {
		animation: scroll-left 60s linear infinite;
	}

	.animate-scroll-right {
		animation: scroll-right 60s linear infinite;
	}

	.animate-pause {
		animation-play-state: paused;
	}
</style>
