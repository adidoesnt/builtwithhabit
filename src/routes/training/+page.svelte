<script lang="ts">
	import { Logo } from '$lib/icons';
	import config from '$lib/config';
	import { Mission } from '$lib/components';
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
					class="aspect-[7/8] h-full w-full rounded-sm object-cover"
				/>
			</div>
		</div>
	</section>

	<!-- ApproachSection -->
	<section
		id="approach-section"
		class="bg-beige flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-8 p-16"
	>
		<h1 class="font-headings text-dark-brown text-center text-5xl font-bold tracking-wide">
			our approach
		</h1>
		<div id="approach-grid" class="grid grid-cols-2 gap-16 text-left">
			<div id="approach-grid-left" class="flex flex-col justify-center gap-8">
				<p class="font-body text-dark-brown text-2xl text-center">
					our training sessions are structured around <span class="font-bold">three pillars</span>:
				</p>
				<ul class="list-inside list-none flex flex-col gap-2">
					<li class="grid grid-cols-2 gap-2 rounded-md bg-white p-2 px-4 shadow-md items-center">
						<p class="font-body text-dark-brown text-xl font-bold text-center">flexibility & mobility</p>
						<p class="font-body text-dark-brown text-xl">
							improving joint health and range of motion
						</p>
					</li>
					<li class="grid grid-cols-2 gap-2 rounded-md bg-white p-2 px-4 shadow-md items-center">
						<p class="font-body text-dark-brown text-xl font-bold text-center">muscular conditioning</p>
						<p class="font-body text-dark-brown text-xl">
							building functional strength and endurance
						</p>
					</li>
					<li class="grid grid-cols-2 gap-2 rounded-md bg-white p-2 px-4 shadow-md items-center">
						<p class="font-body text-dark-brown text-xl font-bold text-center">cardiovascular capacity</p>
						<p class="font-body text-dark-brown text-xl">enhancing stamina and aerobic health</p>
					</li>
				</ul>
				<!-- TODO: pre-fill contact form -->
				<a
					href="/contact"
					class="flex self-center font-body bg-dark-brown text-beige text-xl text-center w-fit px-4 py-2 rounded-md hover:bg-dark-brown/80 hover:scale-105 transition-all duration-300"
				>
					book a free consultation call
				</a>
			</div>
			<div id="approach-grid-right" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-2xl">
					before we add intensity, we lay the groundwork: teaching form, correcting posture, and
					making you feel confident in how you move. we take a very hands-on approach - offering
					real-time demonstrations, verbal cues, and consistent encouragement throughout our
					session.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					training isn’t just about what you do in the gym. that’s why we integrate nutritional
					guidance (focused on whole foods, high-protein, non-restrictive eating), sleep hygiene
					tips, and recovery practices.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					whether your goal is hypertrophy, fat loss, or overall wellness, we work together to
					create a routine that aligns with your lifestyle - not against it.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					our aim is to equip you with the knowledge and tools to feel empowered in your own skin -
					at every age and stage.
				</p>
			</div>
		</div>
	</section>
</div>
