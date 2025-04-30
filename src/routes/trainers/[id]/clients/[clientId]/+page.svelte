<script lang="ts">
	import type { PageData } from './$types';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { goto } from '$app/navigation';

	const { data }: { data: PageData } = $props();
	const { client, trainer, clientProfilePictureUrl } = data;

	function formatName(firstName: string, lastName: string) {
		return `${firstName} ${lastName}`;
	}

	function handleViewFiles() {
		goto(`/trainers/${trainer.id}/clients/${client.id}/files`);
	}
</script>

<div class="bg-beige min-h-[100dvh] p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 text-center md:text-start">
			<h1 class="font-body text-dark-brown text-2xl font-bold md:text-3xl">Client Profile</h1>
			<p class="font-body text-light-brown mt-2">View client details</p>
		</div>

		<!-- TODO: Add client profile picture -->
		<div class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="bg-light-green flex flex-col items-center gap-6 p-8 md:flex-row">
				{#if clientProfilePictureUrl}
					<!-- svelte-ignore a11y_img_redundant_alt -->
					<img
						src={clientProfilePictureUrl}
						alt="Profile Picture"
						class="h-24 w-24 rounded-full bg-white shadow-md"
					/>
				{:else}
					<div
						class="font-body text-dark-brown flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold shadow-md"
					>
						{client.firstName[0]}{client.lastName[0]}
					</div>
				{/if}
				<div class="text-center md:text-left">
					<h2 class="font-body text-olive text-xl font-semibold">
						{formatName(client.firstName, client.lastName)}
					</h2>
					<p class="font-body text-olive">{client.email}</p>
				</div>
			</div>

			<div class="p-6">
				<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
					<div class="space-y-4">
						<h3 class="font-body text-dark-brown text-xl font-semibold">Personal Information</h3>

						<div>
							<p class="font-body text-light-brown text-sm">First Name</p>
							<p class="font-body text-dark-brown">{client.firstName}</p>
						</div>

						<div>
							<p class="font-body text-light-brown text-sm">Last Name</p>
							<p class="font-body text-dark-brown">{client.lastName}</p>
						</div>
					</div>

					<div class="space-y-4">
						<h3 class="font-body text-dark-brown text-xl font-semibold">Contact Information</h3>

						<div>
							<p class="font-body text-light-brown text-sm">Email</p>
							<p class="font-body text-dark-brown">{client.email}</p>
						</div>
					</div>
				</div>

				<div class="mt-8 flex w-full justify-center border-t border-gray-200 pt-8 md:justify-start">
					<button
						class="text-dark-brown font-body bg-light-green cursor-pointer rounded-sm px-6 py-2 transition-all duration-300 hover:opacity-80"
						onclick={handleViewFiles}
					>
						View Client Files
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
