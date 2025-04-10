<script lang="ts">
	import type { PageData } from './$types';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import LogoHeader from '$lib/components/LogoHeader.svelte';

	const { data }: { data: PageData } = $props();
	const { trainerId } = data;

	let page = $state(0);
	let pageSize = $state(10);
	let searchTerm = $state('');
	let isLoading = $state(false);
	let clients = $state(data.clients);
	let totalCount = $state(data.totalCount);
	let totalPages = $derived(Math.ceil(totalCount / pageSize));

	const itemsPerPageOptions = [5, 10, 25, 50];

	function debounce(getter: () => string, delay: number) {
		let value = $state();
		let timer: NodeJS.Timeout;
		$effect(() => {
			const newValue = getter();
			clearTimeout(timer);
			timer = setTimeout(() => (value = newValue), delay);
			return () => clearTimeout(timer);
		});
		return () => value;
	}

	let debouncedSearchTerm = $derived.by(debounce(() => searchTerm, 300));

	$effect(() => {
		isLoading = true;
		fetch(
			`/trainers/${trainerId}/clients?page=${page}&pageSize=${pageSize}&search=${debouncedSearchTerm ?? ''}`
		)
			.then((res) => res.json())
			.then((data) => {
				clients = data.clients;
				totalCount = data.totalCount;
			})
			.finally(() => {
				isLoading = false;
			});
	});

	$inspect({
		clients
	});
</script>

<div id="clients-page" class="bg-beige font-body min-h-[100dvh] p-8">
	<div id="clients-container" class="mx-auto max-w-4xl">
		<LogoHeader />

		<div id="clients-header" class="mt-8 mb-6">
			<h1 class="font-body text-dark-brown text-2xl font-bold md:text-3xl">Clients</h1>
			<p class="font-body text-light-brown mt-1">View and manage your clients</p>
		</div>

		<div id="clients-table" class="overflow-hidden rounded-lg bg-white shadow-md">
			<div class="flex items-center justify-between border-b p-4">
				<h2 class="font-body text-dark-brown text-xl font-semibold">Clients</h2>
				<div class="flex flex-grow items-center justify-end gap-2">
					<input
						type="text"
						placeholder="Search clients"
						class="font-body text-dark-brown w-1/2 rounded-md border-gray-300 p-2"
						bind:value={searchTerm}
						oninput={(event: Event) => {
							searchTerm = (event.target as HTMLInputElement).value;
						}}
					/>
				</div>
			</div>

			{#if clients.length === 0 && !isLoading}
				<div class="p-8 text-center">
					<p class="font-body text-light-brown">No clients found.</p>
				</div>
			{:else}
				<div class="flex flex-col">
					<div class="overflow-x-auto">
						{#if isLoading}
							<div class="hidden md:block">
								<table class="w-full border-collapse">
									<thead class="bg-gray-50">
										<tr>
											<th class="font-body text-dark-brown border-b p-4 text-left">ID</th>
											<th class="font-body text-dark-brown border-b p-4 text-left">Name</th>
											<th class="font-body text-dark-brown border-b p-4 text-left">Email</th>
											<th class="font-body text-dark-brown border-b p-4 text-left">Actions</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td colspan={4} class="border-b p-8 text-center">
												<LoadingSpinner size="48px" color="var(--color-dark-brown)" />
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="flex h-32 items-center justify-center md:hidden">
								<LoadingSpinner size="48px" color="var(--color-dark-brown)" />
							</div>
						{:else}
							<table class="w-full border-collapse">
								<thead class="bg-gray-50">
									<tr>
										<th class="font-body text-dark-brown border-b p-4 text-left">ID</th>
										<th class="font-body text-dark-brown border-b p-4 text-left">Name</th>
										<th class="font-body text-dark-brown border-b p-4 text-left">Email</th>
										<th class="font-body text-dark-brown border-b p-4 text-left">Actions</th>
									</tr>
								</thead>
								<tbody>
									{#each clients as client, i}
										<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
											<td class="font-body text-dark-brown border-b p-4">{client.id}</td>
											<td class="font-body text-dark-brown border-b p-4">
												{client.firstName}
												{client.lastName}
											</td>
											<td class="font-body text-dark-brown border-b p-4">{client.email}</td>
											<td class="font-body text-dark-brown border-b p-4">
												<button
													class="rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50"
												>
													View Profile
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						{/if}
					</div>

					<div
						class="mt-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md"
					>
						<div class="hidden items-center gap-2 md:flex">
							<label for="itemsPerPage" class="text-sm text-gray-700">Items per page:</label>
							<select
								id="itemsPerPage"
								bind:value={pageSize}
								class="focus:border-dark-brown focus:ring-dark-brown appearance-none rounded-md border border-gray-300 bg-white px-3 py-1 pr-8 text-sm focus:ring-1 focus:outline-none"
							>
								{#each itemsPerPageOptions as option}
									<option value={option}>{option}</option>
								{/each}
							</select>
						</div>

						<div class="flex w-full items-center justify-center gap-2 md:w-auto md:justify-end">
							<button
								class="w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={page === 0}
								onclick={() => (page = Math.max(0, page - 1))}
							>
								Previous
							</button>

							<div class="flex items-center gap-1">
								{#each Array(totalPages) as _, i}
									{#if totalPages <= 5 || i === 0 || i === totalPages - 1 || (i >= page - 1 && i <= page + 1)}
										<button
											class="rounded-md px-3 py-1 text-sm {page === i
												? 'bg-dark-brown text-white'
												: 'hover:bg-gray-50'}"
											onclick={() => (page = i)}
										>
											{i + 1}
										</button>
									{:else if i === 1 && page > 2}
										<span class="px-2 text-gray-500">...</span>
									{:else if i === totalPages - 2 && page < totalPages - 3}
										<span class="px-2 text-gray-500">...</span>
									{/if}
								{/each}
							</div>

							<button
								class="w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={page === totalPages - 1}
								onclick={() => (page = Math.min(totalPages - 1, page + 1))}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
