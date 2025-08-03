<script lang="ts">
	import { Profile } from '$lib/icons';
	import { goto } from '$app/navigation';
	import { clearUser, user } from '$lib/stores/auth';

	let isLoggedIn = $derived(!!$user);
	let isDropdownOpen = $state(false);

	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	function handleLogout() {
		fetch('/logout', {
			method: 'POST'
		}).then(() => {
			isDropdownOpen = false;
			clearUser();
			goto('/');
		});
	}

	function handleLogin() {
		goto('/login');
		isDropdownOpen = false;
	}

	function handleSignup() {
		goto('/signup');
		isDropdownOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('#profile-dropdown')) {
			isDropdownOpen = false;
		}
	}

	$effect(() => {
		if (isDropdownOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div id="profile-dropdown" class="relative">
	<button
		class="hover:bg-light-brown/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300 md:h-10 md:w-10"
		aria-label="Profile"
		onclick={toggleDropdown}
	>
		<Profile width={28} height={28} color="#262626" />
	</button>

	{#if isDropdownOpen}
		<div
			class="absolute top-8 right-0 z-50 w-fit min-w-64 rounded-lg border border-gray-200 bg-white shadow-lg md:top-12"
		>
			{#if isLoggedIn}
				<!-- Logged in user -->
				<div class="p-4">
					<div class="border-b border-gray-200 pb-3">
						<p class="font-body text-dark-brown font-semibold">
							{$user?.firstName}
							{$user?.lastName}
						</p>
						<p class="font-body text-sm text-gray-600">{$user?.email}</p>
					</div>
					<div class="pt-3">
						<button
							class="font-body w-full cursor-pointer rounded-sm bg-red-500 px-4 py-2 text-white transition-all duration-300 hover:bg-red-600"
							onclick={handleLogout}
						>
							Logout
						</button>
					</div>
				</div>
			{:else}
				<!-- Not logged in -->
				<div class="p-4">
					<div class="space-y-2">
						<button
							class="font-body bg-dark-brown hover:bg-dark-brown/90 w-full cursor-pointer rounded-sm px-4 py-2 text-white transition-all duration-300"
							onclick={handleLogin}
						>
							Login
						</button>
						<button
							class="font-body border-dark-brown text-dark-brown hover:bg-dark-brown w-full cursor-pointer rounded-sm border px-4 py-2 transition-all duration-300 hover:text-white"
							onclick={handleSignup}
						>
							Sign Up
						</button>
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>
