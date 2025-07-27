<script lang="ts">
	import { Logo } from '$lib/icons';
	import config from '$lib/config';
	import { Mission } from '$lib/components';
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Hero Section -->
	<section
		id="hero-section"
		class="flex h-[calc(100dvh-8rem)] md:h-[calc(100dvh-13rem)] w-full flex-col bg-[url(/landing-page-hero.png)] bg-cover bg-center"
	>
		<div class="absolute inset-0 bg-white/70"></div>
		<div class="z-30 flex h-full w-full flex-col">
			<div
				class="font-headings text-light-brown flex h-full w-full flex-col items-center justify-center px-4"
			>
				<div class="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
					<Logo className="w-20 h-20 md:w-32 md:h-32 md:mr-8 drop-shadow-lg" color="#262626" />
					<div class="space-y-2 text-center md:text-left">
						<h1
							class="text-dark-brown text-3xl font-normal tracking-wide drop-shadow-lg md:text-6xl"
						>
							sweat smarter,
						</h1>
						<h1 class="text-dark-brown text-4xl font-bold tracking-wide drop-shadow-lg md:text-7xl">
							live longer.
						</h1>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Slogan section -->
	<section id="slogan-section" class="bg-beige grid min-h-[50dvh] place-items-center p-4 md:p-8">
		<p class="font-body text-dark-brown text-center text-lg md:text-2xl">
			at <span class="font-bold">builtwithhabit,</span><br />our
			<span class="font-bold">personal training programs</span> and
			<span class="font-bold">sustainable high-performance activewear</span><br />
			meet your body where it's at and supports where it's going.
		</p>
	</section>

	<!-- Mission section -->
	<Mission />

	<!-- Pillars section -->
	<section
		id="pillars-section"
		class="text-dark-brown bg-beige flex min-h-[calc(100dvh-9rem)] flex-col place-items-center gap-4 p-4 md:gap-8 md:p-16"
	>
		<h1
			class="font-headings text-dark-brown text-center text-3xl font-bold tracking-wide md:text-5xl"
		>
			our pillars
		</h1>
		<div class="grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 md:gap-8">
			{#each config.pillars as pillar}
				<a href={pillar.href}>
					<div
						class="flex flex-col gap-4 rounded-sm bg-white p-4 shadow-md transition-all duration-300 hover:scale-105"
					>
						<h2 class="font-headings text-dark-brown text-2xl font-bold tracking-wide md:text-4xl">
							{pillar.title}
						</h2>
						<div class="flex aspect-video items-center justify-center overflow-hidden rounded-sm">
							<img src={pillar.img.src} alt={pillar.img.alt} class="h-full w-full object-cover" />
						</div>
						<h3 class="font-body text-dark-brown text-lg font-bold tracking-wide md:text-2xl">
							{pillar.subtitle}
						</h3>
						<hr class="border-dark-brown" />
						<p class="font-body text-dark-brown md:text-md text-sm">{pillar.description}</p>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Waitlist section -->
	<section
		id="waitlist-section"
		class="relative flex min-h-[calc(100dvh-9rem)] w-full flex-col items-center justify-center bg-[url(/activewear-athlete.jpg)] bg-cover bg-center"
	>
		<div class="absolute inset-0 bg-white/70"></div>
		<div class="relative z-10 flex flex-col items-center justify-center gap-4 p-4 md:gap-8 md:p-8">
			<div class="text-center">
				<!-- TODO: pre-fill contact form -->
				<a
					href="/contact"
					class="font-headings text-dark-brown text-xl font-bold tracking-wide italic md:text-2xl"
				>
					join our waitlist
				</a>
			</div>
			<div class="text-center">
				<h1 class="font-headings text-dark-brown text-3xl font-bold tracking-wide md:text-5xl">
					launching soon
				</h1>
			</div>
			<div class="max-w-4xl text-center">
				<p class="font-body text-dark-brown text-base font-medium tracking-wide md:text-xl">
					high-performance, seamless activewear made from natural, skin-safe fibers
				</p>
				<p class="font-body text-dark-brown text-base font-medium tracking-wide md:text-xl">
					read our <a href="/blog" class="font-bold underline">blog</a> to learn more about our approach
					to sustainability
				</p>
			</div>
		</div>
	</section>
</div>
