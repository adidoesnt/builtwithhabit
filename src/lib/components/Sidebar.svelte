<script lang="ts">
	import config from '$lib/config';
	import { page } from '$app/state';
	import { clearUser, Role, user } from '$lib/stores/auth';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { goto } from '$app/navigation';

	const isAuthenticated = $derived(!!$user);

	const {
		bgColor = 'light-green',
		textColor = 'dark-brown',
		isLandingPage = false,
		isBlogPage = false,
		isMobile = false
	} = $props();
	const { navBar, logo } = config.site;
	const currentPath = $derived(page.url.pathname);

	let isOpen = $state(false);
	let isLoggingOut = $state(false);

	const toggleSidebar = () => {
		isOpen = !isOpen;
	};

	async function handleLogout() {
		isLoggingOut = true;
		try {
			await fetch('/logout', {
				method: 'POST'
			});
			clearUser();
			goto('/login');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			isLoggingOut = false;
			toggleSidebar();
		}
	}

	let isTrainer = $derived($user?.roles?.includes(Role.TRAINER));

	let links = $derived(
		(() => {
			if (isLandingPage) {
				if (isMobile) {
					return isAuthenticated
						? navBar.links
						: navBar.landingPageLinks.mobile;
				} else {
					return isAuthenticated
						? navBar.links
						: navBar.landingPageLinks.desktop;
				}
			}

			if (isBlogPage) {
				return isAuthenticated
					? navBar.links
					: navBar.blogLinks;
			}

			if (isTrainer) {
				return navBar.links.filter((link) => link.href !== '/packages');
			}

			return navBar.links;
		})()
	);

	const trainerLinks = $derived([
		{
			label: 'Availability',
			href: `/trainers/${$user?.id}/availability`
		},
		{
			label: 'Clients',
			href: `/trainers/${$user?.id}/clients`
		}
	]);

	const noSidebarPages = [
		'/login',
		'/signup',
		'/signup/verify-email',
		'/reset-password',
		'/forgot-password'
	];
	const shouldShowSidebar = $derived(!noSidebarPages.includes(currentPath));
</script>

{#if shouldShowSidebar}
	<div class="relative text-${textColor} z-50">
		{#if isOpen}
			<div
				class="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
			></div>
		{/if}

		<div
			class={`sidebar fixed top-0 left-0 h-full w-64 bg-${bgColor} shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
		>
			<button
				class={`sidebar-tab absolute top-4 right-0 z-10 translate-x-full transform cursor-pointer rounded-r-md bg-${bgColor} p-2 opacity-30 shadow-md transition-opacity duration-300 hover:opacity-100`}
				onclick={toggleSidebar}
			>
				<span class={`text-${textColor}`}>☰</span>
			</button>

			<div
				class="flex h-full flex-col items-center justify-between gap-4 overflow-y-auto p-4 text-center"
			>
				<div>
					<div class="m-8 flex self-center">
						<img src={logo} alt="logo" class="h-auto w-12 mix-blend-multiply md:w-16" />
					</div>
					<h2 class="font-headings mb-4 text-4xl font-bold">{navBar.title}</h2>
					<nav class="font-body flex flex-col">
						{#each links as link}
							<a
								href={link.href}
								class={`py-2 transition-colors ${currentPath === link.href ? 'underline hover:opacity-100' : ''} transition-opacity duration-300 hover:opacity-80`}
								onclick={toggleSidebar}
							>
								{link.label}
							</a>
						{/each}
						{#if $user?.roles?.includes(Role.TRAINER)}
							{#each trainerLinks as link}
								<a
									href={link.href}
									onclick={toggleSidebar}
									class="py-2 transition-colors hover:opacity-80"
								>
									{link.label}
								</a>
							{/each}
						{/if}
						{#if $user?.roles?.includes(Role.ADMIN)}
							<hr class="my-4" />
							<h3 class="text-lg font-bold">Admin</h3>
							{#each navBar.adminLinks as link}
								<a
									href={link.href}
									onclick={toggleSidebar}
									class="py-2 transition-colors hover:opacity-80"
								>
									{link.label}
								</a>
							{/each}
						{/if}
					</nav>
				</div>

				{#if isAuthenticated}
					<div class="mt-auto w-full">
						<button
							class="font-body flex w-full cursor-pointer items-center justify-center rounded-sm bg-[#E57373] px-6 py-2 text-white transition-all duration-300 hover:bg-[#EF5350] disabled:cursor-not-allowed disabled:opacity-70"
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
				{/if}
			</div>
		</div>
	</div>
{/if}
