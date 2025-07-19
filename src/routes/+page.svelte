<script lang="ts">
	import { Logo } from '$lib/icons';
	import config from '$lib/config';
	import { Mission } from '$lib/components';
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Hero Section -->
	<section
		id="hero-section"
		class="flex h-[calc(100dvh-12rem)] w-full flex-col bg-[url(/landing-page-hero.png)] bg-cover bg-center"
	>
		<div class="absolute inset-0 bg-white/70"></div>
		<div class="z-30 flex h-full w-full flex-col">
			<div
				class="font-headings text-light-brown flex h-full w-full flex-col items-center justify-center"
			>
				<div class="flex items-center justify-center">
					<Logo className="w-32 h-32 mr-8 drop-shadow-lg" color="#262626" />
					<div class="space-y-2 text-left">
						<h1 class="text-dark-brown text-6xl font-normal tracking-wide drop-shadow-lg">
							sweat smarter,
						</h1>
						<h1 class="text-dark-brown text-7xl font-bold tracking-wide drop-shadow-lg">
							live longer.
						</h1>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Slogan section -->
	<section id="slogan-section" class="bg-beige grid min-h-[50dvh] place-items-center p-8">
		<p class="font-body text-dark-brown text-center text-2xl">
			at <span class="font-bold">builtwithhabit,</span><br />our
			<span class="font-bold">personal training programs</span> and
			<span class="font-bold">sustainable high-performance activewear</span><br />
			meet your body where it’s at and supports where it’s going.
		</p>
	</section>

	<!-- Mission section -->
	<Mission />

	<!-- Pillars section -->
	<section
		id="pillars-section"
		class="text-dark-brown bg-beige flex min-h-[calc(100dvh-9rem)] flex-col place-items-center gap-8 p-16"
	>
		<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">our pillars</h1>
		<div class="grid grid-cols-3 gap-8">
			{#each config.pillars as pillar}
				<a href={pillar.href}>
					<div class="flex flex-col gap-4 rounded-sm bg-white p-4 shadow-md transition-all duration-300 hover:scale-105">
						<h2 class="font-headings text-dark-brown text-4xl font-bold tracking-wide">
							{pillar.title}
						</h2>
						<div class="flex aspect-video items-center justify-center overflow-hidden rounded-sm">
							<img src={pillar.img.src} alt={pillar.img.alt} class="h-full w-full object-cover" />
						</div>
						<h3 class="font-body text-dark-brown text-2xl font-bold tracking-wide">
							{pillar.subtitle}
						</h3>
						<hr class="border-dark-brown" />
						<p class="font-body text-dark-brown text-md">{pillar.description}</p>
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
		<div class="relative z-10 flex flex-col items-center justify-center gap-8 p-8">
			<div class="text-center">
				<p class="font-headings text-dark-brown text-2xl font-bold tracking-wide italic">
					join our waitlist
				</p>
			</div>
			<div class="text-center">
				<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">
					launching soon
				</h1>
			</div>
			<div class="max-w-4xl text-center">
				<p class="font-body text-dark-brown text-xl font-medium tracking-wide">
					high-performance, seamless activewear made from natural, skin-safe fibers
				</p>
				<p class="font-body text-dark-brown text-xl font-medium tracking-wide">
					read our <a href="/blog" class="font-bold underline">blog</a> to learn more about our approach
					to sustainability
				</p>
			</div>
		</div>
	</section>
</div>
