<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setUser, user } from '$lib/stores/auth';
	import { page } from '$app/state';
	import Sidebar from '$lib/components/Sidebar.svelte';
	let { children, data }: { children: any; data: LayoutData } = $props();

	$effect(() => {
		if (data.user) {
			setUser(data.user);
		}
	});

	const isAuthenticated = $derived($user);
	const isLandingPage = $derived(page.url.pathname === '/');

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
		switch (page.url.pathname) {
			case '/packages':
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

{#if isAuthenticated && !isLandingPage}
	<Sidebar bgColor={getSidebarBgColor()} textColor={getSidebarTextColor()} />
{/if}

<div class="bg-dark-brown font-old-standard flex min-h-screen w-full flex-col">
	{@render children()}
</div>
