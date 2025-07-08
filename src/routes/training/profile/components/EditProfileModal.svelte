<script lang="ts">
	import type { User } from '$lib/stores/auth';
	import { z } from 'zod';

	const {
		user,
		isOpen,
		closeModal
	}: {
		user: User;
		isOpen: boolean;
		closeModal: () => void;
	} = $props();

	let message: {
		message: string;
		type: 'success' | 'error';
	} | null = $state(null);

	const formSchema = z.object({
		firstName: z.string().min(1, { message: 'First name is required' }),
		lastName: z.string().min(1, { message: 'Last name is required' })
	});

	let editedUser = $state({
		firstName: user.firstName,
		lastName: user.lastName
	});

	let isSubmitting = $state(false);
	const form = $derived(formSchema.safeParse(editedUser));

	let numErrors = $derived(form.error?.issues?.length ?? 0);
	let isDisabled = $derived(numErrors > 0 || isSubmitting);

	async function onsubmit(event: Event) {
		event.preventDefault();

		if (isSubmitting) return;
		isSubmitting = true;

		try {
			const response = await fetch(`/training/users/${user.id}`, {
				method: 'PUT',
				body: JSON.stringify(editedUser)
			});

			if (!response.ok) {
				throw new Error('Failed to update profile');
			}

			message = {
				message: 'Profile updated successfully',
				type: 'success'
			};

			setTimeout(() => {
				closeModal();
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error(error);

			message = {
				message: 'Failed to update profile',
				type: 'error'
			};
		} finally {
			isSubmitting = false;
		}
	}
</script>

{#if isOpen}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
	>
		<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="font-body text-dark-brown text-xl font-bold">Edit Profile</h2>
				<button
					onclick={closeModal}
					class="hover:text-dark-brown text-gray-500 transition-colors"
					aria-label="Close modal"
					disabled={isSubmitting}
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

			<form {onsubmit} class="space-y-4">
				<div>
					<label for="firstName" class="font-body text-dark-brown mb-1 block text-sm font-medium">
						First Name
					</label>
					<input
						type="text"
						id="firstName"
						bind:value={editedUser.firstName}
						class="font-body focus:border-dark-brown focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
						required
						disabled={isSubmitting}
					/>
				</div>

				<div>
					<label for="lastName" class="font-body text-dark-brown mb-1 block text-sm font-medium">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						bind:value={editedUser.lastName}
						class="font-body focus:border-dark-brown focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
						required
						disabled={isSubmitting}
					/>
				</div>

				{#if message}
					<div
						class={`font-body rounded-md p-3 text-sm ${
							message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-500'
						}`}
					>
						{message.message}
					</div>
				{/if}

				{#if form.error?.issues?.length}
					<div class="flex flex-col">
						{#each form.error.issues as issue}
							<p class="font-body mt-1 text-xs text-red-500">{issue.message}</p>
						{/each}
					</div>
				{/if}

				<div class="mt-6 flex justify-end gap-3">
					<button
						type="button"
						onclick={closeModal}
						class="font-body text-dark-brown cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={isSubmitting}
					>
						Cancel
					</button>
					<button
						type="submit"
						class="font-body bg-dark-brown hover:bg-opacity-90 flex min-w-[120px] cursor-pointer items-center justify-center rounded-md px-4 py-2 text-white disabled:bg-gray-400"
						disabled={isDisabled}
					>
						{#if isSubmitting}
							<svg
								class="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
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
							Saving...
						{:else}
							Save Changes
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
