<script lang="ts">
	import type { User } from '$lib/stores/auth';

	const {
		user,
		closeModal
	}: {
		user: User;
		closeModal: () => void;
	} = $props();

	let isDeleting = $state(false);
	let error = $state<string | null>(null);

	async function onsubmit(event: Event) {
		event.preventDefault();

		try {
			isDeleting = true;
			const response = await fetch(`/users/${user.id}`, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to update user');
			}

			closeModal();
			window?.location.reload();
		} catch (error) {
			console.error(error);
			error = 'Failed to delete user';
		} finally {
			isDeleting = false;
		}
	}
</script>

<div
	class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm"
>
	<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="font-body text-dark-brown text-xl font-bold">Delete User</h2>
			<button
				onclick={closeModal}
				class="hover:text-dark-brown text-gray-500 transition-colors"
				aria-label="Close modal"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>

		<div class="mb-6">
			<div class="mb-4 flex items-center gap-3">
				<div class="rounded-full bg-red-100 p-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-red-600"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
				</div>
				<p class="font-body text-dark-brown font-medium">
					Are you sure you want to delete this user?
				</p>
			</div>

			<p class="font-body text-sm text-gray-600">
				You are about to delete the user <span class="font-semibold"
					>{user.firstName} {user.lastName}</span
				>
				({user.email}). This action cannot be undone.
			</p>

			{#if error}
				<div class="mt-4 rounded-md border border-red-200 bg-red-50 p-3">
					<p class="font-body text-sm text-red-600">{error}</p>
				</div>
			{/if}
		</div>

		<div class="flex justify-end gap-3">
			<button
				type="button"
				onclick={closeModal}
				class="font-body text-dark-brown cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50"
				disabled={isDeleting}
			>
				Cancel
			</button>
			<button
				type="button"
				onclick={onsubmit}
				class="font-body flex min-w-[80px] cursor-pointer items-center justify-center rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:bg-red-300"
				disabled={isDeleting}
			>
				{#if isDeleting}
					<svg
						class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"
						></circle>
						<path
							class="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					Deleting...
				{:else}
					Yes, Delete
				{/if}
			</button>
		</div>
	</div>
</div>
