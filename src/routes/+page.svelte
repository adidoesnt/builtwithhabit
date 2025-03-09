<script lang="ts">
	import { goto } from '$app/navigation';
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
	import config from '$lib/config';
	import InstagramIcon from '$lib/icons/Instagram.svelte';
	import MobileIcon from '$lib/icons/Mobile.svelte';
	import EmailIcon from '$lib/icons/Email.svelte';

	const { splitDescription, mission, contact } = config.site;

	const onclick = () => goto('/login');
	const scrollToPricing = () => {
		document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
	};

	const scrollToAbout = () => {
		document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
	};
</script>

<section
	class="relative flex h-screen w-full flex-col items-center justify-center bg-[url(/hut-with-mountains-3.jpg)] bg-cover bg-center backdrop-blur-sm"
>
	<div class="absolute inset-0 backdrop-blur-sm"></div>
	<button
		{onclick}
		id="container"
		class="bg-beige relative z-20 m-4 flex cursor-pointer flex-col items-center justify-center gap-4 rounded-sm p-8 shadow-2xl transition-all duration-300 hover:scale-110 hover:animate-[pulse_3s_ease-in-out_infinite]"
	>
		<AuthFormHeader />
		<p class="font-body text-dark-brown text-lg">
			<span class="text-light-brown">{splitDescription[0]}</span>
			<span class="text-dark-brown">{splitDescription[1]}</span>
			<span class="text-light-brown">{splitDescription[2]}</span>
		</p>
	</button>
	<button
		class="relative z-10 font-body bg-dark-brown text-beige mt-4 rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
		onclick={scrollToAbout}
	>
		Learn More
	</button>
</section>

<section id="about" class="md:h-screen w-full">
	<div class="md:grid h-full w-full md:grid-rows-1 md:grid-cols-2">
		<div class="bg-light-green flex w-full flex-col items-center justify-center gap-6 md:gap-10 p-8">
			<img
				src={contact.image}
				alt={contact.name}
				class="h-60 w-60 rounded-sm mix-blend-multiply md:h-72 md:w-72"
			/>
			<div class="flex flex-col text-center">
				<h2 class="font-headings text-dark-brown text-4xl font-semibold">{contact.name}</h2>
				<p class="font-body text-dark-brown">{contact.tagline}</p>
			</div>
			<div class="bg-beige flex flex-col gap-6 rounded-sm p-4 px-12">
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
					class="font-body bg-dark-brown text-beige flex w-fit self-center rounded-sm p-2 transition-all duration-300 hover:scale-110 hover:opacity-80"
					onclick={scrollToPricing}>{contact.callToAction}</button
				>
			</div>
		</div>
		<div class="bg-beige flex w-full flex-col justify-center gap-6 p-8 md:gap-8 md:p-18">
			<div class="flex flex-col">
				{#each mission.title as title}
					<h2 class="font-headings text-dark-brown text-3xl md:text-5xl font-semibold">{title}</h2>
				{/each}
			</div>
			{#each mission.content as content}
				<p class="font-body text-dark-brown text-md md:text-xl">{content}</p>
			{/each}
		</div>
	</div>
</section>

<section
	id="pricing"
	class="bg-light-brown flex h-screen w-full flex-col items-center justify-center p-8"
>
	<h2 class="font-headings text-dark-brown mb-8 text-center text-3xl font-bold">
		{config.site.pricing.title}
	</h2>
	<div class="flex overflow-x-auto pb-4 gap-4 md:grid md:grid-cols-3">
		{#each config.site.pricing.plans as plan}
			<div
				class="bg-beige flex-shrink-0 w-80 flex flex-col items-center rounded-lg p-6 shadow-lg transition-transform duration-300 hover:scale-105 md:w-auto"
			>
				<h3 class="font-headings text-light-brown mb-4 text-2xl font-semibold">{plan.name}</h3>
				<p class="font-body text-dark-brown mb-4 text-xl">{plan.sessions}</p>
				<p class="font-body text-dark-brown mb-4 text-xl">
					<span class="text-gray-500 line-through">${plan.discountPrice}</span>
					<span class="text-dark-brown">${plan.price}</span>
				</p>
				<p class="font-body mb-4 text-gray-600">{plan.description}</p>
				<button
					class="bg-dark-brown text-beige rounded-sm p-2 transition-all duration-300 hover:scale-110"
				>
					{plan.buttonText}
				</button>
			</div>
		{/each}
	</div>
</section>
