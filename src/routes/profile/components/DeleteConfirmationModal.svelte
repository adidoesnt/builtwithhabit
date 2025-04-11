<script lang="ts">
	const { show, onClose, profilePictureDeleteUrl } = $props();

	let isDeleting = $state(false);
	let message: {
		message: string;
		type: 'success' | 'error';
	} | null = $state(null);

	async function handleDelete() {
		isDeleting = true;
		try {
			const response = await fetch(profilePictureDeleteUrl, {
				method: 'DELETE'
			});

			if (!response.ok) {
				throw new Error('Failed to delete profile picture');
			}

			message = {
				message: 'Profile picture deleted successfully',
				type: 'success'
			};

			setTimeout(() => {
				onClose();
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error('Error deleting profile picture:', error);
			message = {
				message: 'Failed to delete profile picture',
				type: 'error'
			};
		} finally {
			isDeleting = false;
		}
	}
</script>

{#if show}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
	>
		<div class="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg">
			<div class="p-4">
				<h3 class="font-body text-dark-brown text-lg font-semibold">Delete Profile Picture</h3>
				{#if message}
					<div
						class="mt-4 rounded-md p-4"
						class:bg-green-50={message.type === 'success'}
						class:bg-red-50={message.type === 'error'}
					>
						<p
							class="font-body text-sm font-medium"
							class:text-green-800={message.type === 'success'}
							class:text-red-800={message.type === 'error'}
						>
							{message.message}
						</p>
					</div>
				{:else}
					<p class="font-body text-light-brown mt-2">
						Are you sure you want to delete your profile picture? This action cannot be undone.
					</p>
				{/if}
			</div>
			<div class="flex justify-end gap-2 border-t border-gray-200 bg-gray-50 p-4">
				<button
					class="font-body text-dark-brown rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
					onclick={onClose}
					disabled={isDeleting}
				>
					Cancel
				</button>
				<button
					class="font-body rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
					onclick={handleDelete}
					disabled={isDeleting}
				>
					{#if isDeleting}
						<svg
							class="mr-2 inline-block h-4 w-4 animate-spin text-white"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
						Deleting...
					{:else}
						Delete
					{/if}
				</button>
			</div>
		</div>
	</div>
{/if}
