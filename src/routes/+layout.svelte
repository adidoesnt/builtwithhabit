<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setUser, user } from '$lib/stores/auth';
	import { page } from '$app/state';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { navigating } from '$app/state';
	let { children, data }: { children: any; data: LayoutData } = $props();

	$effect(() => {
		if (data.user) {
			setUser(data.user);
		}
	});

	const isAuthenticated = $derived($user);
	const isLandingPage = $derived(page.url.pathname === '/');

	const showFooter = $derived(isLandingPage || !isAuthenticated);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const getSidebarBgColor = $derived(() => {
		if (page.url.pathname.includes('/packages/')) return 'beige';

		switch (page.url.pathname) {
			case '/bookings':
				return 'beige';
			default:
				return 'light-green';
		}
	});

	const getSidebarTextColor = $derived(() => {
		switch (page.url.pathname) {
			default:
				return 'dark-brown';
		}
	});
</script>

{#if navigating.complete}
	<div
		class="bg-opacity-30 bg-background fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
	>
		<div class="rounded-lg bg-white p-6 shadow-xl">
			<div class="flex flex-col items-center">
				<div
					class="border-light-green border-t-dark-brown h-12 w-12 animate-spin rounded-full border-4"
				></div>
				<p class="font-body text-dark-brown mt-4 text-lg">Loading...</p>
			</div>
		</div>
	</div>
{/if}

{#if isAuthenticated && !isLandingPage}
	<Sidebar bgColor={getSidebarBgColor()} textColor={getSidebarTextColor()} />
{/if}

<div class="bg-dark-brown font-old-standard flex min-h-screen w-full flex-col">
	<main class="flex-grow">
		{@render children()}
	</main>

	{#if showFooter}
		<Footer />
	{/if}
</div>
