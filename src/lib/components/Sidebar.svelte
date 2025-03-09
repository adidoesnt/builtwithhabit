<script lang="ts">
	import { onDestroy } from 'svelte';
	import config from '$lib/config';
	import { page } from '$app/state';

	const { bgColor = 'light-green', textColor = 'dark-brown' } = $props();
	const { navBar, logo } = config.site;
	const currentPath = $derived(page.url.pathname);

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

<div class="relative text-${textColor}">
	<div
		bind:this={sidebarElement}
		class={`sidebar fixed top-0 left-0 h-full w-64 bg-${bgColor} shadow-lg transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
	>
		<button
			class={`sidebar-tab absolute top-1/2 right-0 z-10 translate-x-full -translate-y-1/2 transform cursor-pointer rounded-r-md bg-${bgColor} p-2 opacity-10 shadow-md transition-opacity duration-300 hover:opacity-100`}
			onclick={toggleSidebar}
		>
			<span class={`text-${textColor}`}>☰</span>
		</button>

		<div class="flex flex-col items-center justify-center gap-4 p-4 text-center">
			<div class="m-8 flex self-center">
				<img src={logo} alt="logo" class="h-auto w-24 mix-blend-multiply md:w-40" />
			</div>
			<h2 class="font-headings mb-4 text-4xl font-bold">{navBar.title}</h2>
			<nav class="font-body flex flex-col">
				{#each navBar.links as link}
					<a
						href={link.href}
						class={`py-2 transition-colors ${currentPath === link.href ? 'underline hover:opacity-100' : ''} transition-opacity duration-300 hover:opacity-80`}
						onclick={toggleSidebar}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</div>
