<script lang="ts">
	import { Logo } from '$lib/icons';
	import config from '$lib/config';
	import { Mission } from '$lib/components';
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Training Philosophy Section -->
	<section
		id="training-philosophy-section"
		class="flex min-h-[calc(100dvh-12rem)] w-full flex-col bg-white p-16 gap-8 justify-center"
	>
		<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide text-center">
			our training philosophy
		</h1>
		<div id="training-grid" class="grid grid-cols-[2fr_1fr] gap-8 text-left">
			<div id="training-grid-left" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-2xl">
					we truly believe strength training is one of the most powerful tools for women of all ages
					to build confidence, longevity, and resilience.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					our approach blends science-backed training, whole-food nutrition, and mindful living.
					with a background in life sciences, i’m personally passionate about cutting through
					misinformation and using evidence-based practices to create personalised, sustainable
					fitness plans. at builtwithhabit, we believe that food should be both nourishing and
					enjoyable, and we love helping clients discover high-protein, nutrient-dense meals that
					fuel their goals without restriction.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					most importantly, we work closely with each client to understand what feels right for
					their body. this enables us to create tailored programs that empower you to feel strong,
					healthy, and capable - at any stage of life.
				</p>
			</div>
			<div id="training-image" class="flex items-center justify-center overflow-hidden rounded-sm">
				<img
					src="/training-image-2.png"
					alt="Founder in the gym"
					class="h-full w-full rounded-sm aspect-[7/8] object-cover"
				/>
			</div>
		</div>
	</section>
</div>
