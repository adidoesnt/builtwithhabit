<script lang="ts">
	import { user as currentUser } from '$lib/stores/auth';
	import EditModal from './EditModal.svelte';
	import DeleteModal from './DeleteModal.svelte';
	import type { UserWithRoles as UserWithRolesWithoutVerification } from '$lib/server/db/user';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	type UserWithRoles = UserWithRolesWithoutVerification & {
		isVerified: boolean;
	};

	let { users: initialUsers, total }: { users: UserWithRoles[]; total: number } = $props();

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

	let users = $state([...initialUsers]);
	let currentPage = $state(0);
	let pageSize = $state(5);
	let totalPages = $derived(Math.ceil(total / pageSize));
	let userToEdit = $state<UserWithRoles | null>(null);
	let userToDelete = $state<UserWithRoles | null>(null);
	let searchTerm = $state('');
	let debouncedSearchTerm = $derived.by(debounce(() => searchTerm, 300));
	let isLoading = $state(false);

	const itemsPerPageOptions = [5, 10, 25, 50];

	function formatDate(date: string | Date) {
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		return dateObj.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function openEditModal(user: UserWithRoles) {
		userToEdit = user;
	}

	function closeEditModal() {
		userToEdit = null;
	}

	function openDeleteModal(user: UserWithRoles) {
		userToDelete = user;
	}

	function closeDeleteModal() {
		userToDelete = null;
	}

	$effect(() => {
		isLoading = true;

		fetch(`/users?page=${currentPage}&pageSize=${pageSize}&search=${debouncedSearchTerm ?? ''}`)
			.then((res) => res.json())
			.then((data) => {
				users = data.users;
				total = data.total;
			})
			.finally(() => {
				isLoading = false;
			});
	});
</script>

{#if userToEdit}
	<EditModal user={userToEdit} closeModal={closeEditModal} />
{/if}

{#if userToDelete}
	<DeleteModal user={userToDelete} closeModal={closeDeleteModal} />
{/if}

<div class="overflow-hidden rounded-lg bg-white shadow-md">
	<div class="flex items-center justify-between border-b p-4">
		<h2 class="font-body text-dark-brown text-xl font-semibold">User Management</h2>
		<div class="flex flex-grow items-center justify-end gap-2">
			<input
				type="text"
				placeholder="Search"
				class="font-body text-dark-brown w-1/2 rounded-md border-gray-300 p-2"
				bind:value={searchTerm}
				oninput={(event: Event) => {
					searchTerm = (event.target as HTMLInputElement).value;
				}}
			/>
		</div>
	</div>
	{#if users.length === 0 && !isLoading}
		<div class="p-8 text-center">
			<p class="font-body text-light-brown">No users found.</p>
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
									<th class="font-body text-dark-brown border-b p-4 text-left">Roles</th>
									<th class="font-body text-dark-brown border-b p-4 text-left">Joined</th>
									<th class="font-body text-dark-brown border-b p-4 text-center">Actions</th>
									<th class="font-body text-dark-brown border-b p-4 text-center">Verified</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td colspan={7} class="border-b p-8 text-center">
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
								<th class="font-body text-dark-brown border-b p-4 text-left">Roles</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Joined</th>
								<th class="font-body text-dark-brown border-b p-4 text-center">Actions</th>
								<th class="font-body text-dark-brown border-b p-4 text-center">Verified</th>
							</tr>
						</thead>
						<tbody>
							{#each users as user, i}
								<tr class={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
									<td class="font-body text-dark-brown border-b p-4">{user.id}</td>
									<td class="font-body text-dark-brown border-b p-4">
										<div class="flex items-center gap-3">
											<div>
												{user.firstName}
												{user.lastName}
											</div>
										</div>
									</td>
									<td class="font-body text-dark-brown border-b p-4">{user.email}</td>
									<td class="font-body text-dark-brown border-b p-4">
										<div class="flex flex-wrap gap-1">
											{#each user.roles as role}
												<span class="bg-light-green rounded-full px-2 py-0.5 text-xs">
													{role.charAt(0).toUpperCase() + role.slice(1)}
												</span>
											{/each}
										</div>
									</td>
									<td class="font-body text-dark-brown border-b p-4">
										{formatDate(user?.createdAt)}
									</td>
									<td class="font-body text-dark-brown border-b p-4">
										<div class="flex justify-center gap-2">
											{#if user.id !== $currentUser?.id && user.isVerified}
												<button
													class="text-blue-600 hover:text-blue-800"
													title="Edit user"
													aria-label="Edit user"
													onclick={() => openEditModal(user)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
														/>
													</svg>
												</button>
											{/if}
											{#if user.id !== $currentUser?.id}
												<button
													class="text-red-600 hover:text-red-800"
													title="Delete user"
													aria-label="Delete user"
													onclick={() => openDeleteModal(user)}
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														class="h-5 w-5"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															stroke-width="2"
															d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
														/>
													</svg>
												</button>
											{/if}
										</div>
									</td>
									<td class="font-body text-dark-brown border-b p-4">
										{user.isVerified ? 'Yes' : 'No'}
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				{/if}
			</div>
			<div class="mt-4 flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md">
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
						disabled={currentPage === 0}
						onclick={() => (currentPage = Math.max(0, currentPage - 1))}
					>
						Previous
					</button>

					<div class="flex items-center gap-1">
						{#each Array(totalPages) as _, i}
							{#if totalPages <= 5 || i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)}
								<button
									class="rounded-md px-3 py-1 text-sm {currentPage === i
										? 'bg-dark-brown text-white'
										: 'hover:bg-gray-50'}"
									onclick={() => (currentPage = i)}
								>
									{i + 1}
								</button>
							{:else if i === 1 && currentPage > 2}
								<span class="px-2 text-gray-500">...</span>
							{:else if i === totalPages - 2 && currentPage < totalPages - 3}
								<span class="px-2 text-gray-500">...</span>
							{/if}
						{/each}
					</div>

					<button
						class="w-20 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={currentPage === totalPages - 1}
						onclick={() => (currentPage = Math.min(totalPages - 1, currentPage + 1))}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	{/if}
</div>
