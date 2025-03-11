<script lang="ts">
	import type { Testimonial } from '$lib/mocks/testimonials';

	export let testimonial: Testimonial;
</script>

<div
	class="flex h-full w-96 flex-col rounded-sm bg-white p-6 shadow-md gap-4"
>
	<div class="flex items-center">
		<div class="bg-light-green mr-4 flex h-12 w-12 items-center justify-center rounded-full">
			<div
				class="text-dark-brown bg-beige font-body flex aspect-square h-full w-full items-center justify-center rounded-full font-bold shadow-md"
			>
				{testimonial.name
					.split(' ')
					.map((name) => name[0])
					.join('')}
			</div>
		</div>
		<div class="overflow-hidden">
			<h3 class="font-body text-dark-brown truncate font-semibold">{testimonial.name}</h3>
			<p class="font-body text-light-brown truncate text-sm">{testimonial.role}</p>
		</div>
	</div>

	<div class="flex mt-2">
		{#each Array(5) as _, i}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-5 w-5 {i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		{/each}
	</div>

	<p class="font-body text-dark-brown mb-4 italic">
		"{testimonial.quote}"
	</p>
</div>
