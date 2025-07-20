<script lang="ts">
	import { PackagesTable } from '$lib/components';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	const { packages } = data;
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Training Philosophy Section -->
	<section
		id="training-philosophy-section"
		class="flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-8 bg-white p-16"
	>
		<h1 class="font-headings text-dark-brown text-center text-5xl font-bold tracking-wide">
			our training philosophy
		</h1>
		<div id="training-grid" class="grid grid-cols-[2fr_1fr] gap-8 text-left">
			<div id="training-grid-left" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-lg">
					we truly believe strength training is one of the most powerful tools for women of all ages
					to build confidence, longevity, and resilience.
				</p>
				<p class="font-body text-dark-brown text-lg">
					our approach blends science-backed training, whole-food nutrition, and mindful living.
					with a background in life sciences, i’m personally passionate about cutting through
					misinformation and using evidence-based practices to create personalised, sustainable
					fitness plans. at builtwithhabit, we believe that food should be both nourishing and
					enjoyable, and we love helping clients discover high-protein, nutrient-dense meals that
					fuel their goals without restriction.
				</p>
				<p class="font-body text-dark-brown text-lg">
					most importantly, we work closely with each client to understand what feels right for
					their body. this enables us to create tailored programs that empower you to feel strong,
					healthy, and capable - at any stage of life.
				</p>
			</div>
			<div id="training-image" class="flex items-center justify-center overflow-hidden rounded-sm">
				<img
					src="/training-image-2.png"
					alt="Founder in the gym"
					class="aspect-[7/8] h-full w-full rounded-sm object-cover"
				/>
			</div>
		</div>
	</section>

	<!-- Approach Section -->
	<section
		id="approach-section"
		class="bg-beige flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-8 p-16"
	>
		<h1 class="font-headings text-dark-brown text-center text-5xl font-bold tracking-wide">
			our approach
		</h1>
		<div id="approach-grid" class="grid grid-cols-2 gap-16 text-left">
			<div id="approach-grid-left" class="flex flex-col justify-center gap-8">
				<p class="font-body text-dark-brown text-center text-lg">
					our training sessions are structured around <span class="font-bold">three pillars</span>:
				</p>
				<ul class="flex list-inside list-none flex-col gap-2">
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							flexibility & mobility
						</p>
						<p class="font-body text-dark-brown text-lg">
							improving joint health and range of motion
						</p>
					</li>
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							muscular conditioning
						</p>
						<p class="font-body text-dark-brown text-lg">
							building functional strength and endurance
						</p>
					</li>
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							cardiovascular capacity
						</p>
						<p class="font-body text-dark-brown text-lg">enhancing stamina and aerobic health</p>
					</li>
				</ul>
				<!-- TODO: pre-fill contact form -->
				<a
					href="/contact"
					class="font-body bg-dark-brown text-beige hover:bg-dark-brown/80 flex w-fit self-center rounded-md px-4 py-2 text-center text-xl transition-all duration-300 hover:scale-105"
				>
					book a free consultation call
				</a>
			</div>
			<div id="approach-grid-right" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-lg">
					before we add intensity, we lay the groundwork: teaching form, correcting posture, and
					making you feel confident in how you move. we take a very hands-on approach - offering
					real-time demonstrations, verbal cues, and consistent encouragement throughout our
					session.
				</p>
				<p class="font-body text-dark-brown text-lg">
					training isn’t just about what you do in the gym. that’s why we integrate nutritional
					guidance (focused on whole foods, high-protein, non-restrictive eating), sleep hygiene
					tips, and recovery practices.
				</p>
				<p class="font-body text-dark-brown text-lg">
					whether your goal is hypertrophy, fat loss, or overall wellness, we work together to
					create a routine that aligns with your lifestyle - not against it.
				</p>
				<p class="font-body text-dark-brown text-lg">
					our aim is to equip you with the knowledge and tools to feel empowered in your own skin -
					at every age and stage.
				</p>
			</div>
		</div>
	</section>

	<!-- Packages Section -->
	<section
		id="packages-section"
		class="flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-8 bg-white p-16"
	>
		<h1 class="font-headings text-dark-brown text-center text-5xl font-bold tracking-wide">
			our packages
		</h1>
		<div id="packages-grid" class="grid grid-cols-2 gap-8">
			<div id="packages-grid-left" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-lg">
					whether you’re new to strength training or looking to level up your current routine, we
					offer a range of personal training options that are individualised, holistic, and grounded
					in science.
				</p>
				<p class="font-body text-dark-brown text-lg">
					the table outlines the <span class="font-bold">key details of each package</span>.
				</p>
			</div>
			<PackagesTable {packages} />
		</div>
	</section>
</div>
