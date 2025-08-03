<script lang="ts">
	import { Packages, PackagesAccordion, PackagesTable } from '$lib/components';
	import type { PageServerData } from './$types';

	const { data }: { data: PageServerData } = $props();
	const { packages, testimonials } = data;
</script>

<div class="flex h-fit w-full max-w-[100dvw] flex-col">
	<!-- Training Philosophy Section -->
	<section
		id="training-philosophy-section"
		class="flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-4 bg-white p-6 md:gap-8 md:p-16"
	>
		<h1
			class="font-headings text-dark-brown text-center text-3xl font-bold tracking-wide md:text-5xl"
		>
			our training philosophy
		</h1>

		<!-- Mobile layout: vertical with image between title and content -->
		<div class="flex w-full flex-col items-center gap-4 md:hidden">
			<div class="flex w-full max-w-md items-center justify-center overflow-hidden rounded-sm">
				<img
					src="/training-image-2.png"
					alt="Founder in the gym"
					class="aspect-[7/8] h-full w-full rounded-sm object-cover"
				/>
			</div>
			<div class="flex max-w-4xl flex-col justify-center gap-4 text-left">
				<p class="font-body text-dark-brown text-lg">
					we truly believe strength training is one of the most powerful tools for women of all ages
					to build confidence, longevity, and resilience.
				</p>
				<p class="font-body text-dark-brown text-lg">
					our approach blends science-backed training, whole-food nutrition, and mindful living.
					with a background in life sciences, i'm personally passionate about cutting through
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
		</div>

		<!-- Desktop layout: original side-by-side grid -->
		<div id="training-grid" class="hidden grid-cols-[2fr_1fr] gap-8 text-left md:grid">
			<div id="training-grid-left" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-2xl">
					we truly believe strength training is one of the most powerful tools for women of all ages
					to build confidence, longevity, and resilience.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					our approach blends science-backed training, whole-food nutrition, and mindful living.
					with a background in life sciences, i'm personally passionate about cutting through
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

	<!-- Approach Section -->
	<section
		id="approach-section"
		class="bg-beige flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-4 p-6 md:gap-8 md:p-16"
	>
		<h1
			class="font-headings text-dark-brown text-center text-3xl font-bold tracking-wide md:text-5xl"
		>
			our approach
		</h1>

		<!-- Mobile layout: two-row grid -->
		<div class="flex w-full flex-col gap-10 md:hidden">
			<!-- Row 1: Three pillars -->
			<div class="flex flex-col justify-center gap-6">
				<p class="font-body text-dark-brown text-center text-lg">
					our training sessions are structured around <span class="font-bold">three pillars</span>:
				</p>
				<ul class="flex list-inside list-none flex-col gap-3">
					<li class="flex flex-col gap-2 rounded-md bg-white p-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-lg font-bold">
							flexibility & mobility
						</p>
						<p class="font-body text-dark-brown text-base">
							improving joint health and range of motion
						</p>
					</li>
					<li class="flex flex-col gap-2 rounded-md bg-white p-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-lg font-bold">
							muscular conditioning
						</p>
						<p class="font-body text-dark-brown text-base">
							building functional strength and endurance
						</p>
					</li>
					<li class="flex flex-col gap-2 rounded-md bg-white p-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-lg font-bold">
							cardiovascular capacity
						</p>
						<p class="font-body text-dark-brown text-base">enhancing stamina and aerobic health</p>
					</li>
				</ul>
			</div>

			<!-- Row 2: Text content -->
			<div class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-lg">
					before we add intensity, we lay the groundwork: teaching form, correcting posture, and
					making you feel confident in how you move. we take a very hands-on approach - offering
					real-time demonstrations, verbal cues, and consistent encouragement throughout our
					session.
				</p>
				<p class="font-body text-dark-brown text-lg">
					training isn't just about what you do in the gym. that's why we integrate nutritional
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
				<p class="font-body text-dark-brown text-lg">
					<a
						href="/contact?prefillType=training"
						class="underline transition-opacity duration-300 hover:opacity-50"
					>
						book a free consultation call
					</a>
				</p>
			</div>
		</div>

		<!-- Desktop layout: original side-by-side grid -->
		<div id="approach-grid" class="hidden grid-cols-2 gap-16 text-left md:grid">
			<div id="approach-grid-left" class="flex flex-col justify-center gap-8">
				<p class="font-body text-dark-brown text-center text-2xl">
					our training sessions are structured around <span class="font-bold">three pillars</span>:
				</p>
				<ul class="flex list-inside list-none flex-col gap-2">
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							flexibility & mobility
						</p>
						<p class="font-body text-dark-brown text-xl">
							improving joint health and range of motion
						</p>
					</li>
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							muscular conditioning
						</p>
						<p class="font-body text-dark-brown text-xl">
							building functional strength and endurance
						</p>
					</li>
					<li class="grid grid-cols-2 items-center gap-2 rounded-md bg-white p-2 px-4 shadow-md">
						<p class="font-body text-dark-brown text-center text-xl font-bold">
							cardiovascular capacity
						</p>
						<p class="font-body text-dark-brown text-xl">enhancing stamina and aerobic health</p>
					</li>
				</ul>
				<a
					href="/contact?prefillType=training"
					class="font-body bg-dark-brown text-beige hover:bg-dark-brown/80 flex w-fit self-center rounded-md px-4 py-2 text-center text-xl transition-all duration-300 hover:scale-105"
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
					training isn't just about what you do in the gym. that's why we integrate nutritional
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

	<!-- Packages Section -->
	<section
		id="packages-section"
		class="bg-beige-50 flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-4 p-6 md:gap-8 md:p-16"
	>
		<h1
			class="font-headings text-dark-brown text-center text-3xl font-bold tracking-wide md:text-5xl"
		>
			our packages
		</h1>

		<!-- Mobile layout: flex column with graphic on top -->
		<div class="flex w-full flex-col gap-10 md:hidden">
			<!-- Text content first -->
			<div class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-lg">
					whether you're new to strength training or looking to level up your current routine, we
					offer a range of personal training options that are individualised, holistic, and grounded
					in science.
				</p>
				<p class="font-body text-dark-brown block text-lg md:hidden">
					the dropdowns below outline the <span class="font-bold">key details of each package</span
					>.
				</p>
			</div>

			<!-- Table below -->
			<div class="flex flex-col justify-center">
				<PackagesAccordion {packages} />
			</div>
		</div>

		<!-- Desktop layout: original side-by-side grid -->
		<div id="packages-grid" class="hidden grid-cols-2 gap-8 md:grid">
			<div id="packages-grid-left" class="flex flex-col justify-center gap-4">
				<p class="font-body text-dark-brown text-2xl">
					whether you're new to strength training or looking to level up your current routine, we
					offer a range of personal training options that are individualised, holistic, and grounded
					in science.
				</p>
				<p class="font-body text-dark-brown text-2xl">
					the table outlines the <span class="font-bold">key details of each package</span>.
				</p>
			</div>
			<PackagesTable {packages} />
		</div>
	</section>

	<!-- Testimonials Section -->
	<section
		id="testimonials-section"
		class="bg-beige flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-8 p-4 md:p-16"
	>
		<div class="mb-8 text-center">
			<h2 class="font-headings text-dark-brown mb-4 text-3xl font-bold md:text-5xl">
				what our clients say
			</h2>
			<p class="font-body text-light-brown mx-auto max-w-3xl text-lg md:text-2xl">
				real stories from women who have transformed their relationship with fitness through our
				personalised approach.
			</p>
		</div>

		<!-- Mobile Testimonials -->
		<div class="flex w-full flex-col gap-4 md:hidden">
			{#each testimonials as testimonial}
				<div class="flex h-auto w-full">
					<div class="flex h-full w-full flex-col gap-4 rounded-sm bg-white p-6 shadow-md">
						<div class="flex items-center">
							<div
								class="bg-light-green mr-4 flex h-12 w-12 items-center justify-center rounded-full"
							>
								<div
									class="text-dark-brown bg-beige font-body flex aspect-square h-full w-full items-center justify-center rounded-full font-bold shadow-md"
								>
									{(testimonial.name as string)
										.split(' ')
										.map((name: string) => name[0])
										.join('')}
								</div>
							</div>
							<div class="overflow-hidden">
								<h3 class="font-body text-dark-brown truncate font-semibold">{testimonial.name}</h3>
								<p class="font-body text-light-brown truncate text-sm">{testimonial.role}</p>
							</div>
						</div>

						<div class="mt-2 flex">
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

						<p class="prose prose-lg prose-dark-brown font-body text-dark-brown max-w-none">
							{@html testimonial.content}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Desktop Testimonials -->
		<div class="hidden md:flex md:flex-1 md:flex-col md:justify-center">
			<div class="relative mb-8">
				<div
					class="from-beige absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent"
				></div>
				<div
					class="from-beige absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent"
				></div>

				<div class="overflow-hidden">
					<div class="flex w-full items-stretch justify-center overflow-x-auto">
						{#each testimonials as testimonial}
							<div class="mx-4 flex min-h-[300px] flex-none">
								<div
									class="flex h-full max-w-[50dvw] flex-col gap-4 rounded-sm bg-white p-6 shadow-md"
								>
									<div class="flex items-center">
										<div
											class="bg-light-green mr-4 flex h-12 w-12 items-center justify-center rounded-full"
										>
											<div
												class="text-dark-brown bg-beige font-body flex aspect-square h-full w-full items-center justify-center rounded-full font-bold shadow-md"
											>
												{(testimonial.name as string)
													.split(' ')
													.map((name: string) => name[0])
													.join('')}
											</div>
										</div>
										<div class="overflow-hidden">
											<h3
												class="font-body text-dark-brown text-md truncate font-semibold md:text-xl"
											>
												{testimonial.name}
											</h3>
											<p class="font-body text-light-brown text-md truncate md:text-xl">
												{testimonial.role}
											</p>
										</div>
									</div>

									<div class="mt-2 flex">
										{#each Array(5) as _, i}
											<svg
												xmlns="http://www.w3.org/2000/svg"
												class="h-5 w-5 {i < testimonial.rating
													? 'text-yellow-400'
													: 'text-gray-300'}"
												viewBox="0 0 20 20"
												fill="currentColor"
											>
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
												/>
											</svg>
										{/each}
									</div>

									<p class="font-body text-dark-brown text-md mb-4 md:text-xl">
										{@html testimonial.content}
									</p>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Bookings Section -->
	<section
		id="bookings-section"
		class="bg-beige-50 flex min-h-[calc(100dvh-12rem)] w-full flex-col justify-center gap-4 p-6 md:gap-8 md:p-16"
	>
		<h1
			class="font-headings text-dark-brown text-center text-3xl font-bold tracking-wide md:text-5xl"
		>
			our bookings
		</h1>
		<Packages {packages} />
		<div class="flex flex-col items-center justify-center gap-4">
			<p class="font-body text-dark-brown text-lg">have questions?</p>
			<a
				href="/contact?prefillType=training"
				class="font-body bg-dark-brown text-beige hover:bg-dark-brown/80 flex w-fit self-center rounded-md px-4 py-2 text-center text-lg transition-all duration-300 hover:scale-105"
			>
				book a free consultation call
			</a>
		</div>
	</section>
</div>
