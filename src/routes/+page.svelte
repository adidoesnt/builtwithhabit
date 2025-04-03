<script lang="ts">
	// TODO: test RBAC for all pages and routes
	// TODO: Overall aesthetic tightening

	import { goto } from '$app/navigation';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';
	import InstagramIcon from '$lib/icons/Instagram.svelte';
	import MobileIcon from '$lib/icons/Mobile.svelte';
	import EmailIcon from '$lib/icons/Email.svelte';
	import Packages from '$lib/components/Packages.svelte';
	import type { PageServerData } from './$types';
	// import Testimonials from '$lib/components/Testimonials/Testimonials.svelte';

	const { splitDescription, mission, contact } = config.site;
	const { data }: { data: PageServerData } = $props();
	const { packages } = data;

	const onclick = () => goto('/login');
	const scrollToPricing = () => {
		document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToAbout = () => {
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToMission = () => {
		document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<section
	class="relative flex h-[100dvh] min-h-fit w-full flex-col items-center justify-center bg-[url(/hut-with-mountains-3.jpg)] bg-cover bg-center backdrop-blur-sm"
>
	<div class="absolute inset-0 backdrop-blur-sm"></div>
	<button
		{onclick}
		id="container"
		class="bg-beige relative z-20 m-4 flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:animate-[pulse_3s_ease-in-out_infinite]"
	>
		<LogoHeader linkToHome={false} />
		<p class="font-body text-dark-brown text-lg">
			<span class="text-light-brown">{splitDescription[0]}</span>
			<span class="text-dark-brown">{splitDescription[1]}</span>
		</p>
	</button>
	<button
		class="font-body bg-dark-brown text-beige relative z-10 mt-4 rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
		onclick={scrollToAbout}
	>
		Learn More
	</button>
</section>

<section id="about" class="w-full md:h-[100dvh] min-h-fit">
	<div id="contact" class="h-full w-full md:grid md:grid-cols-2 md:grid-rows-1">
		<div
			class="bg-light-green h-[100dvh] min-h-fit md:h-fit flex w-full flex-col items-center justify-center gap-6 p-8 md:gap-10"
		>
			<img
				src={contact.image}
				alt={contact.name}
				class="h-60 w-60 rounded-sm shadow-xl md:h-72 md:w-72"
			/>
			<div class="flex flex-col text-center">
				<h2 class="font-headings text-dark-brown text-4xl font-semibold">{contact.name}</h2>
				<p class="font-body text-dark-brown">{contact.tagline}</p>
			</div>
			<div class="bg-beige flex flex-col gap-6 rounded-sm p-4 px-12 shadow-2xl">
				<h1 class="font-headings text-dark-brown flex self-center text-xl font-semibold">
					Contact
				</h1>
				<div class="flex flex-col gap-2">
					<div class="flex items-center gap-2">
						<MobileIcon width="24" height="24" href={`tel:${contact.phone}`} />
						<p class="font-body text-dark-brown">{contact.phone}</p>
					</div>
					<div class="flex items-center gap-2">
						<EmailIcon width="24" height="24" href={`mailto:${contact.email}`} />
						<p class="font-body text-dark-brown">{contact.email}</p>
					</div>
					<div class="flex items-center gap-2">
						<InstagramIcon width="24" height="24" href={contact.instagram.link} />
						<p class="font-body text-dark-brown">{contact.instagram.handle}</p>
					</div>
				</div>
				<button
					class="font-body bg-dark-brown text-beige hidden w-fit self-center rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80 md:flex"
					onclick={scrollToPricing}>{contact.callToAction}</button
				>
				<button
					class="font-body bg-dark-brown text-beige flex w-fit self-center rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80 md:hidden"
					onclick={scrollToMission}>{contact.viewMission}</button
				>
			</div>
		</div>
		<div
			id="mission"
			class="bg-beige flex h-[100dvh] min-h-fit w-full flex-col justify-center gap-6 p-8 md:h-auto md:gap-8 md:p-24"
		>
			<div class="flex flex-col">
				{#each mission.title as title}
					<h2 class="font-headings text-dark-brown text-3xl font-semibold md:text-5xl">{title}</h2>
				{/each}
			</div>
			{#each mission.content as content}
				<p class="font-body text-dark-brown text-md md:text-xl">{content}</p>
			{/each}
			<button
				class="font-body bg-dark-brown text-beige mt-8 flex w-fit self-center rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80 md:hidden"
				onclick={scrollToPricing}>{contact.callToAction}</button
			>
		</div>
	</div>
</section>

<!-- TODO: Add back after getting testimonial content -->
<!-- <Packages {packages} showTestimonialsButton /> -->
<Packages {packages} altColors />

<!-- <Testimonials /> -->
