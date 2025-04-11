<script lang="ts">
	import { user } from '$lib/stores/auth';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const {
		profilePictureViewUrl,
		profilePictureDeleteUrl,
		profilePictureUploadUrl,
		hasProfilePicture
	} = data;

	let isLoggingOut = $state(false);

	async function handleLogout() {
		isLoggingOut = true;
		try {
			await fetch('/logout', {
				method: 'POST'
			});
			goto('/login');
		} catch (error) {
			console.error('Logout failed:', error);
			isLoggingOut = false;
		}
	}

	function formatName(firstName: string, lastName: string) {
		return `${firstName} ${lastName}`;
	}
</script>

<div class="bg-beige min-h-[100dvh] p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 text-center md:text-start">
			<h1 class="font-body text-dark-brown text-3xl font-bold md:text-4xl">Profile</h1>
			<p class="font-body text-light-brown mt-2">Manage your account details</p>
		</div>

		{#if $user}
			<div class="overflow-hidden rounded-lg bg-white shadow-md">
				<div class="bg-light-green flex flex-col items-center gap-6 p-8 md:flex-row">
					<div
						class="font-body text-dark-brown flex h-24 w-24 items-center justify-center rounded-full bg-white text-3xl font-bold shadow-md"
					>
						{$user.firstName[0]}{$user.lastName[0]}
					</div>
					<div class="text-center md:text-left">
						{#if hasProfilePicture}
							<!-- svelte-ignore a11y_img_redundant_alt -->
							<img
								src={profilePictureViewUrl}
								alt="Profile Picture"
								class="h-24 w-24 rounded-full"
							/>
						{:else}
							<h2 class="font-body text-olive text-2xl font-semibold">
								{formatName($user.firstName, $user.lastName)}
							</h2>
						{/if}
						<p class="font-body text-olive">{$user.email}</p>
					</div>
				</div>

				<div class="p-6">
					<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div class="space-y-4">
							<h3 class="font-body text-dark-brown text-xl font-semibold">Personal Information</h3>

							<div>
								<p class="font-body text-light-brown text-sm">First Name</p>
								<p class="font-body text-dark-brown">{$user.firstName}</p>
							</div>

							<div>
								<p class="font-body text-light-brown text-sm">Last Name</p>
								<p class="font-body text-dark-brown">{$user.lastName}</p>
							</div>
						</div>

						<div class="space-y-4">
							<h3 class="font-body text-dark-brown text-xl font-semibold">Account Information</h3>

							<div>
								<p class="font-body text-light-brown text-sm">Email</p>
								<p class="font-body text-dark-brown">{$user.email}</p>
							</div>

							<div>
								<p class="font-body text-light-brown text-sm">Member Since</p>
								<p class="font-body text-dark-brown">
									{new Date($user.createdAt).toLocaleDateString('en-US', {
										year: 'numeric',
										month: 'long',
										day: 'numeric'
									})}
								</p>
							</div>

							<div>
								<p class="font-body text-light-brown text-sm">Roles</p>
								<div class="mt-1 flex flex-wrap gap-2">
									{#each $user.roles as userRole}
										<span
											class="font-body text-dark-brown bg-light-green rounded-md px-2 py-1 text-sm"
										>
											{userRole.charAt(0).toUpperCase() + userRole.slice(1).toLowerCase()}
										</span>
									{/each}
								</div>
							</div>
						</div>
					</div>

					<div class="mt-8 flex flex-col gap-4 md:flex-row">
						<!-- TODO: Add edit profile popup -->

						<!-- <button
							class="text-dark-brown font-body cursor-pointer rounded-sm bg-[#A0D2EB] px-6 py-2 transition-all duration-300 hover:opacity-80"
						>
							Edit Profile
						</button> -->

						<button
							class="font-body flex cursor-pointer items-center justify-center rounded-sm bg-[#E57373] px-6 py-2 text-white transition-all duration-300 hover:bg-[#EF5350] disabled:cursor-not-allowed disabled:opacity-70"
							onclick={handleLogout}
							disabled={isLoggingOut}
						>
							{#if isLoggingOut}
								<LoadingSpinner size="20px" color="#FFFFFF" />
								<span class="ml-2">Logging out...</span>
							{:else}
								Logout
							{/if}
						</button>
					</div>
				</div>
			</div>
		{:else}
			<div class="rounded-lg bg-white p-6 text-center shadow-md">
				<p class="font-body text-dark-brown">Loading profile information...</p>
			</div>
		{/if}
	</div>
</div>
