<script lang="ts">
	import { Logo } from '$lib/icons';
</script>

<div class="flex h-fit w-full flex-col">
	<!-- Hero Section -->
	<section
		class="flex h-[calc(100dvh-9rem)] w-full flex-col bg-[url(/landing-page-hero.png)] bg-cover bg-center"
	>
		<div class="absolute inset-0 bg-white/70"></div>
		<div class="flex h-full w-full flex-col z-30">
			<div class="flex h-full w-full justify-center items-center flex-col font-headings text-light-brown italic">
				<Logo className="w-32 h-32" color="light-brown" />
				<h1 class="text-6xl font-normal -translate-x-10">sweat smarter,</h1>
				<h1 class="text-7xl font-bold translate-x-10">live longer.</h1>
			</div>
		</div>
	</section>
</div>
