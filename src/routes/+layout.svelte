<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setUser, user } from '$lib/stores/auth';
	import { page } from '$app/state';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { navigating } from '$app/state';
	let { children, data }: { children: any; data: LayoutData } = $props();

	$effect(() => {
		if (data.user) {
			setUser(data.user);
		}
	});

	const isAuthenticated = $derived($user);
	const isLandingPage = $derived(['/', '/training'].includes(page.url.pathname));
	const isBlogPage = $derived(page.url.pathname.includes('/blog'));

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
</script>

<div class="bg-dark-brown font-old-standard min-h-[100dvh] w-[100dvw] grid grid-rows-[auto_1fr]">
	<Header routes={data.sidebarRoutes} />

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
	{:else}
		<main class="flex flex-col w-full">
			{@render children()}

			{#if showFooter}
				<Footer routes={data.sidebarRoutes} />
			{/if}
		</main>
	{/if}
</div>
