<script lang="ts">
	import config from '$lib/config';
	import { page } from '$app/state';
	import { Role, user } from '$lib/stores/auth';

	const { bgColor = 'light-green', textColor = 'dark-brown' } = $props();
	const { navBar, logo } = config.site;
	const currentPath = $derived(page.url.pathname);

	let isOpen = $state(false);

	const toggleSidebar = () => {
		isOpen = !isOpen;
	};

	const trainerLinks = $derived([
		{
			label: 'Availability',
			href: `/trainers/${$user?.id}/availability`
		}
	]);
</script>

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
			class="flex h-full flex-col items-center justify-center gap-4 overflow-y-auto p-4 text-center"
		>
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
	</div>
</div>
