<script lang="ts">
	import { Cart } from '$lib/icons';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { portal } from 'svelte-portal';
	import { onMount } from 'svelte';
	import LogoHeader from './LogoHeader.svelte';
	import Search from './Search.svelte';
	import ProfileDropdown from './ProfileDropdown.svelte';

	let search = $state('');
	function handleSearch(e: Event) {
		e.preventDefault();
		console.log('Search:', search);
	}

	const { routes } = $props();
	let isHamburgerMenuOpen = $state(false);

	function toggleHamburgerMenu() {
		isHamburgerMenuOpen = !isHamburgerMenuOpen;

		// Prevent scrolling when hamburger menu is open
		if (isHamburgerMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	// Clean up scroll behavior when component is destroyed
	onMount(() => {
		return () => {
			document.body.style.overflow = '';
		};
	});

	// Convert routes object to array format and filter for trainers
	let links = $derived(
		Object.values(routes || {}).map((route: any) => ({
			label: route.label,
			href: route.href
		}))
	);

	const noHeaderPages = [
		'/training/login',
		'/training/signup',
		'/training/signup/verify-email',
		'/reset-password',
		'/forgot-password'
	];

	const currentPath = $derived(page.url.pathname);
</script>

{#snippet HamburgerMenuIcon()}
	{#if !isHamburgerMenuOpen}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-menu-icon lucide-menu"
			><path d="M4 12h16" /><path d="M4 18h16" /><path d="M4 6h16" /></svg
		>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
		>
	{/if}
{/snippet}

<!-- Promotional banner -->
<div
	class="bg-light-brown text-dark-brown z-50 flex h-16 items-center justify-center p-2 shadow-md md:h-12"
>
	<!-- Mobile layout: two rows -->
	<div class="flex flex-col items-center justify-center gap-1 md:hidden">
		<p class="font-body text-center text-sm">free shipping on eligible orders</p>
		<p class="font-body text-center text-sm">
			<a href="/signup" class="underline transition-opacity duration-300 hover:opacity-50"
				>join our community</a
			>
			and enjoy 15% off your first order
		</p>
	</div>

	<!-- Desktop layout: single row with divider -->
	<div class="hidden items-center justify-center gap-4 md:flex">
		<div class="flex justify-end">
			<p class="font-body text-center text-sm">free shipping on eligible orders</p>
		</div>
		<div class="flex justify-center">
			<span class="text-dark-brown/50">|</span>
		</div>
		<div class="flex justify-start">
			<p class="font-body text-center text-sm">
				<a href="/signup" class="underline transition-opacity duration-300 hover:opacity-50"
					>join our community</a
				>
				and enjoy 15% off your first order
			</p>
		</div>
	</div>
</div>

<header
	class="bg-beige text-dark-brown sticky top-0 z-50 flex h-16 w-full flex-col justify-center p-4 shadow-md md:h-36"
>
	<!-- Top: Search, logo, cart, profile -->
	<div class="grid grid-cols-2 items-center md:grid-cols-3">
		<!-- Search - hidden on mobile -->
		<Search />

		<!-- Logo - left aligned on mobile, centered on desktop -->
		<div id="logo-container" class="flex w-full justify-start md:justify-center">
			<p class="font-headings text-dark-brown text-2xl font-bold tracking-widest md:text-4xl">
				built<span class="font-normal">with</span>habit
			</p>
		</div>

		<!-- Cart and Profile - right aligned on mobile, right aligned on desktop -->
		<div id="cart-and-profile-container" class="flex w-full items-center justify-end gap-2">
			<!-- Cart - hidden on mobile, visible on desktop -->
			<!-- Todo add cart functionality when shop is added -->
			<button
				class="hover:bg-light-brown/10 hidden h-8 w-8 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300 md:flex md:h-10 md:w-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
				aria-label="Cart"
				disabled={true}
			>
				<Cart width={28} height={28} color="#262626" />
			</button>

			<!-- Hamburger Menu - visible on mobile only -->
			<button
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl md:hidden"
				aria-label="Menu"
				onclick={toggleHamburgerMenu}
			>
				<HamburgerMenuIcon />
			</button>

			<!-- Profile - hidden on mobile, visible on desktop -->
			<ProfileDropdown />
		</div>
	</div>

	<!-- Bottom: Navbar - hidden on mobile -->
	<nav class="border-light-brown hidden justify-center gap-8 border-b pt-2 pb-1 md:flex">
		{#each links as link}
			<a
				href={link.href}
				class={`font-body text-dark-brown cursor-pointer py-2 text-lg transition-colors ${currentPath === link.href ? 'underline hover:opacity-100' : ''} lowercase transition-opacity duration-300 hover:opacity-80`}
			>
				{link.label}
			</a>
		{/each}
	</nav>

	<!-- Hamburger Menu Container -->
	<div
		id="hamburger-menu-container"
		use:portal={'body'}
		class="bg-beige fixed top-0 right-0 z-50 flex h-[100dvh] w-full items-center justify-center"
		class:hidden={!isHamburgerMenuOpen}
	>
		<div class="absolute top-0 right-0 left-0 flex items-center justify-between p-4">
			<LogoHeader />
			<button
				class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl"
				aria-label="Close"
				onclick={toggleHamburgerMenu}
			>
				<HamburgerMenuIcon />
			</button>
		</div>
		<div class="flex flex-col gap-4">
			{#each links as link}
				<button
					onclick={() => {
						goto(link.href);
						toggleHamburgerMenu();
					}}
					class="font-body text-dark-brown cursor-pointer py-2 text-center text-lg lowercase transition-colors"
				>
					{link.label}
				</button>
			{/each}
		</div>
	</div>
</header>
