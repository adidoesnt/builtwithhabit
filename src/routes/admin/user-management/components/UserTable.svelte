<script lang="ts">
	import type { User } from '$lib/stores/auth';
	import { user as currentUser } from '$lib/stores/auth';
	import EditModal from './EditModal.svelte';
	import DeleteModal from './DeleteModal.svelte';

	let { users: initialUsers }: { users: User[] } = $props();

	let users = $state([...initialUsers]);
	let currentPage = $state(0);
	let pageSize = $state(10);
	let totalPages = $derived(Math.ceil(users.length / pageSize));
	let userToEdit = $state<User | null>(null);
	let userToDelete = $state<User | null>(null);
	let searchTerm = $state('');

	let paginatedUsers = $derived(
		users
			.filter((user) => {
				if (searchTerm.trim().length === 0) return true;
				return (
					user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
					user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
					(user.middleName
						? `${user.firstName} ${user.middleName} ${user.lastName}`
						: `${user.firstName} ${user.lastName}`
					)
						.toLowerCase()
						.includes(searchTerm.toLowerCase())
				);
			})
			.slice(currentPage * pageSize, (currentPage + 1) * pageSize)
	);

	function formatDate(date: Date) {
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function openEditModal(user: User) {
		userToEdit = user;
	}

	function closeEditModal() {
		userToEdit = null;
	}

	function openDeleteModal(user: User) {
		userToDelete = user;
	}

	function closeDeleteModal() {
		userToDelete = null;
	}

	function handleSearch(event: Event) {
		searchTerm = (event.target as HTMLInputElement).value;
	}
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
		<div class="flex items-center gap-2 flex-grow justify-end">
			<input
				type="text"
				placeholder="Search"
				class="rounded-md border-gray-300 p-2 font-body text-dark-brown w-1/2"
				oninput={handleSearch}
			/>
		</div>
	</div>
	{#if paginatedUsers.length === 0}
		<div class="p-8 text-center">
			<p class="font-body text-light-brown">No users found.</p>
		</div>
	{:else}
		<div class="overflow-x-auto">
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
					{#each paginatedUsers as user, i}
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
			{#if totalPages > 1}
				<div class="flex items-center justify-center gap-2 p-4">
					<button
						class="rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200"
						onclick={() => currentPage > 0 && (currentPage = currentPage - 1)}
						disabled={currentPage === 0}
						aria-label="Previous page"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>

					{#each Array(totalPages) as _, i}
						{#if totalPages <= 5 || i === 0 || i === totalPages - 1 || (i >= currentPage - 1 && i <= currentPage + 1)}
							<button
								class="rounded-md px-4 py-2 hover:bg-gray-300 {currentPage === i
									? 'bg-dark-brown text-white'
									: 'bg-gray-200'}"
								onclick={() => (currentPage = i)}
							>
								{i + 1}
							</button>
						{:else if i === 1 && currentPage > 2}
							<span class="px-2">...</span>
						{:else if i === totalPages - 2 && currentPage < totalPages - 3}
							<span class="px-2">...</span>
						{/if}
					{/each}

					<button
						class="rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200"
						onclick={() => currentPage < totalPages - 1 && (currentPage = currentPage + 1)}
						disabled={currentPage === totalPages - 1}
						aria-label="Next page"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>
