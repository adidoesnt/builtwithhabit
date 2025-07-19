<script lang="ts">
	import { Logo } from '$lib/icons';
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Hero Section -->
	<section
		class="flex h-[calc(100dvh-9rem)] w-full flex-col bg-[url(/landing-page-hero.png)] bg-cover bg-center"
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
	<section class="bg-beige grid place-items-center p-8 min-h-[50dvh]">
		<p class="font-body text-dark-brown text-center text-2xl">
			at <span class="font-bold">builtwithhabit,</span><br />our
			<span class="font-bold">personal training programs</span> and
			<span class="font-bold">sustainable high-performance activewear</span><br />
			meet your body where it’s at and supports where it’s going.
		</p>
	</section>
</div>
