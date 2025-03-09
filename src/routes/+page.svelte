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

	let activeIndex = $state(0);

	const handleScroll = (index: number) => {
		activeIndex = index;
		document.getElementById(`plan-${index}`)?.scrollIntoView({ behavior: 'smooth' });
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
		<AuthFormHeader linkToHome={false} />
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

<section id="about" class="w-full md:h-screen">
	<div class="h-full w-full md:grid md:grid-cols-2 md:grid-rows-1">
		<div
			class="bg-light-green flex w-full flex-col items-center justify-center gap-6 p-8 md:gap-10"
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
					class="font-body bg-dark-brown text-beige flex w-fit self-center rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
					onclick={scrollToPricing}>{contact.callToAction}</button
				>
			</div>
		</div>
		<div class="bg-beige flex w-full flex-col justify-center gap-6 p-8 md:gap-8 md:p-18">
			<div class="flex flex-col">
				{#each mission.title as title}
					<h2 class="font-headings text-dark-brown text-3xl font-semibold md:text-5xl">{title}</h2>
				{/each}
			</div>
			{#each mission.content as content}
				<p class="font-body text-dark-brown text-md md:text-xl">{content}</p>
			{/each}
		</div>
	</div>
</section>

<section id="pricing" class="bg-light-brown flex h-screen flex-col items-center justify-center p-8">
	<h2 class="font-headings text-dark-brown mb-8 text-center text-3xl font-bold md:text-5xl">
		{config.site.pricing.title}
	</h2>
	<div id="plan-container" class="flex w-full gap-4 overflow-x-auto md:justify-center">
		{#each config.site.pricing.plans as plan, index}
			<div
				id={`plan-${index}`}
				class="bg-beige flex min-w-full flex-col items-center gap-6 rounded-lg p-6 px-16 shadow-2xl transition-transform duration-300 md:min-w-fit"
			>
				<div class="flex flex-col items-center">
					<h3 class="font-headings text-dark-brown mb-4 text-2xl font-semibold md:text-4xl">
						{plan.name}
					</h3>
					<p class="font-body text-dark-brown mb-4 text-lg md:text-2xl">{plan.sessions}</p>
					<p class="font-body text-dark-brown mb-4 text-lg md:text-2xl">
						<span class="text-gray-500 line-through">${plan.discountPrice}</span>
						<span class="text-dark-brown">${plan.price}</span>
					</p>
					<p class="font-body mb-4 text-center text-sm text-gray-600 md:text-base">
						{plan.description}
					</p>
				</div>
				<button
					class="bg-dark-brown font-body text-beige rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80"
				>
					{plan.buttonText}
				</button>
			</div>
		{/each}
	</div>
	<div class="mt-4 flex justify-center md:hidden">
		{#each config.site.pricing.plans as _, index}
			<button
				aria-label={`Plan ${index + 1}`}
				class="mx-1 h-3 w-3 rounded-full transition-all duration-300"
				class:bg-dark-brown={activeIndex === index}
				class:bg-gray-300={activeIndex !== index}
				onclick={() => handleScroll(index)}
			></button>
		{/each}
	</div>
</section>
