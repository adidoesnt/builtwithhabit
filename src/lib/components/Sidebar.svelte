<script lang="ts">
	import { onDestroy } from 'svelte';
	import config from '$lib/config';
	import { page } from '$app/state';

	const { navBar, logo } = config.site;
	const currentPath = page.url.pathname;

	let isOpen = $state(false);
	let sidebarElement: HTMLElement | null = $state(null);

	const toggleSidebar = () => {
		isOpen = !isOpen;
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarElement &&
			!sidebarElement.contains(event.target as Node) &&
			!(event.target as HTMLElement).closest('.sidebar-tab')
		) {
			isOpen = false;
		}
	};

	$effect(() => {
		window?.addEventListener('click', handleClickOutside);
	});

	onDestroy(() => {
		window?.removeEventListener('click', handleClickOutside);
	});
</script>

<div class="relative">
	<div
		bind:this={sidebarElement}
		class={`sidebar fixed top-0 left-0 h-full w-64 bg-light-green shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
	>
		<button
			class="sidebar-tab absolute top-1/2 right-0 z-10 translate-x-full -translate-y-1/2 transform cursor-pointer rounded-r-md bg-light-green p-2 shadow-md opacity-10 hover:opacity-100 transition-opacity duration-300"
			onclick={toggleSidebar}
		>
			<span class="text-dark-brown">☰</span>
		</button>

		<div class="p-4 flex flex-col items-center justify-center gap-4 text-center">
			<div class="flex self-center m-8">
                <img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
            </div>
			<h2 class="mb-4 font-headings text-4xl font-bold">{navBar.title}</h2>
			<nav class="flex flex-col font-body">
				{#each navBar.links as link}
					<a
						href={link.href}
						class={`hover:text-dark-brown py-2 transition-colors ${currentPath === link.href ? 'underline hover:opacity-100' : ''} hover:opacity-80 transition-opacity duration-300`}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
