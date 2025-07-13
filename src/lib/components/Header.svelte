<script lang="ts">
	import { Cart, Profile, Search } from '$lib/icons';
	import { page } from '$app/state';

	let search = $state('');
	function handleSearch(e: Event) {
		e.preventDefault();
		console.log('Search:', search);
	}

	const { routes } = $props();

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

<header class="bg-beige text-dark-brown sticky top-0 z-50 flex w-full flex-col p-4 shadow-md h-36">
	<!-- Top: Search, logo, cart, profile -->
	<div class="grid grid-cols-3 items-center">
		<div id="search-container" class="flex w-full items-center justify-start gap-2">
			<input
				type="text"
				placeholder="Search"
				class="border-light-brown/25 focus:ring-light-brown/50 font-body placeholder:text-light-brown/75 text-light-brown/75 w-1/2 rounded-sm border-[1px] bg-white focus:ring-1"
			/>
			<button
				class="hover:bg-light-brown/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300"
				aria-label="search"
			>
				<Search width={24} height={24} color="#a99b9a" />
			</button>
		</div>
		<div id="logo-container" class="flex w-full justify-center">
			<p class="font-headings text-light-brown text-4xl font-bold tracking-widest">
				built<span class="font-normal">with</span>habit
			</p>
		</div>
		<div id="cart-and-profile-container" class="flex w-full items-center justify-end gap-2">
			<button
				class="hover:bg-light-brown/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300"
				aria-label="Cart"
			>
				<Cart width={28} height={28} color="#a99b9a" />
			</button>
			<button
				class="hover:bg-light-brown/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300"
				aria-label="Profile"
			>
				<Profile width={28} height={28} color="#a99b9a" />
			</button>
		</div>
	</div>

	<!-- Bottom: Navbar -->
	<nav class="border-light-brown flex justify-center gap-8 border-b pt-2 pb-1">
		{#each links as link}
			<a
				href={link.href}
				class={`font-body text-light-brown cursor-pointer py-2 text-lg transition-colors ${currentPath === link.href ? 'underline hover:opacity-100' : ''} lowercase transition-opacity duration-300 hover:opacity-80`}
			>
				{link.label}
			</a>
		{/each}
	</nav>
</header>
