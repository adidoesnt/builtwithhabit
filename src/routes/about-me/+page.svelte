<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';
	import { goto } from '$app/navigation';
	import Back from '$lib/icons/Back.svelte';

	const handleBackToHome = () => {
		goto('/');
	};
</script>

<div class="bg-beige grid h-full min-h-[100dvh] w-full place-items-center">
	<div class="container mx-auto flex flex-col justify-start gap-4 overflow-x-auto p-4">
		<LogoHeader linkToHome />

		<div class="flex flex-col gap-4 p-4">
			<h1 class="font-headings text-dark-brown text-4xl font-bold">Placeholder About Me Page</h1>
			<p class="font-body text-dark-brown text-md md:text-lg">Placeholder about me page content</p>

			<button
				onclick={handleBackToHome}
				class="font-body text-dark-brown mt-4 flex items-center gap-2 self-center hover:underline md:mt-0 md:self-start"
			>
				<Back />
				Back to Home
			</button>
		</div>
	</div>
</div>
