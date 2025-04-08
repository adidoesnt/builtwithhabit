<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';
	import { goto } from '$app/navigation';
	import Back from '$lib/icons/Back.svelte';

	const { aboutMe, site } = config;

	const handleBackToHome = () => {
		goto('/');
	};
</script>

<div class="bg-beige grid h-full min-h-[100dvh] w-full place-items-center">
	<div class="container mx-auto flex flex-col justify-start gap-4 overflow-x-auto p-4">
		<LogoHeader linkToHome />

		<div class="flex flex-col gap-4 p-4">
			<h1 class="font-headings text-dark-brown text-4xl font-bold">{aboutMe.titles.aboutMe}</h1>

			<div class="lg:flow-root">
				<div
					class="mb-4 flex w-full rounded-md bg-white object-contain p-4 md:w-3/4 lg:float-left lg:mr-8 lg:mb-2 lg:w-1/2"
				>
					<img src={aboutMe.image} alt={site.contact.name} />
				</div>

				{#each aboutMe.content.about as content}
					<p class="font-body text-dark-brown text-md mb-2 md:text-lg">{content}</p>
				{/each}
			</div>

			<h1 class="font-headings text-dark-brown text-4xl font-bold mt-8">
				{aboutMe.titles.expectations}
			</h1>

			<div class="flex flex-col space-y-6">
				<div class="font-body space-y-4">
					<p class="font-body text-dark-brown text-md md:text-lg">
						{aboutMe.content.expectations.introduction}
					</p>
					<ul class="list-disc space-y-2 pl-5 text-md md:text-lg">
						{#each aboutMe.content.expectations.pillars as pillar}
							<li>
								<strong>{pillar.title}</strong> – {pillar.description}
							</li>
						{/each}
					</ul>
					<p class="font-body text-dark-brown text-md md:text-lg">
						{aboutMe.content.expectations.approach}
					</p>
					<p class="font-body text-dark-brown text-md md:text-lg">
						{aboutMe.content.expectations.holisticSupport}
					</p>
					<p class="font-body text-dark-brown text-md md:text-lg">
						{aboutMe.content.expectations.mission}
					</p>
				</div>
			</div>

			<button
				onclick={handleBackToHome}
				class="font-body text-dark-brown flex items-center gap-2 text-lg font-bold hover:underline mt-4 self-start"
			>
				<Back />
				Back to Home
			</button>
		</div>
	</div>
</div>
