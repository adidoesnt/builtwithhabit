<script lang="ts">
	import { Role, type User } from '$lib/stores/auth';
	import { z } from 'zod';

	const {
		user,
		closeModal
	}: {
		user: User;
		closeModal: () => void;
	} = $props();

	const formSchema = z.object({
		firstName: z.string().min(1, { message: 'First name is required' }),
		lastName: z.string().min(1, { message: 'Last name is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		roles: z.array(z.nativeEnum(Role)).min(1, { message: 'Please select at least one role' })
	});

	let editedUser = $state({
		id: user.id,
		firstName: user.firstName,
		middleName: user.middleName || '',
		lastName: user.lastName,
		email: user.email,
		roles: [...user.roles],
		createdAt: user.createdAt
	});

	let isSubmitting = $state(false);
	const form = $derived(formSchema.safeParse(editedUser));

	const availableRoles = Object.values(Role);

	function toggleRole(role: Role) {
		if (editedUser.roles.includes(role)) {
			editedUser.roles = editedUser.roles.filter((r) => r !== role);
		} else {
			editedUser.roles = [...editedUser.roles, role];
		}
	}

	let numErrors = $derived(form.error?.issues?.length ?? 0);
	let isDisabled = $derived(numErrors > 0 || isSubmitting);

	async function onsubmit(event: Event) {
		event.preventDefault();

		if (isSubmitting) return;
		isSubmitting = true;

		try {
			const response = await fetch(`/users/${user.id}`, {
				method: 'PUT',
				body: JSON.stringify(editedUser)
			});

			if (!response.ok) {
				throw new Error('Failed to update user');
			}

			closeModal();
			window?.location.reload();
		} catch (error) {
			console.error(error);

			form.error?.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Failed to update user',
				path: ['root']
			});
		} finally {
			isSubmitting = false;
		}
	}
</script>

<div
	class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black backdrop-blur-sm"
>
	<div class="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
		<div class="mb-4 flex items-center justify-between">
			<h2 class="font-body text-dark-brown text-xl font-bold">Edit User</h2>
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
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
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
					<label for="middleName" class="font-body text-dark-brown mb-1 block text-sm font-medium">
						Middle Name <span class="text-gray-500">(optional)</span>
					</label>
					<input
						type="text"
						id="middleName"
						bind:value={editedUser.middleName}
						class="font-body focus:border-dark-brown focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
						disabled={isSubmitting}
					/>
				</div>
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

			<div>
				<label for="email" class="font-body text-dark-brown mb-1 block text-sm font-medium">
					Email Address
				</label>
				<input
					type="email"
					id="email"
					bind:value={editedUser.email}
					class="font-body focus:border-dark-brown focus:ring-dark-brown w-full rounded-md border border-gray-300 p-2 focus:ring-1 focus:outline-none"
					required
					disabled={isSubmitting}
				/>
			</div>

			<div>
				<label class="font-body text-dark-brown mb-1 block text-sm font-medium" for="roles"
					>User Roles</label
				>
				<input type="hidden" id="roles" />
				<div class="flex flex-wrap gap-2">
					{#each availableRoles as role}
						<button
							type="button"
							onclick={() => toggleRole(role)}
							class={`rounded-full px-3 py-1 text-sm transition-colors ${
								editedUser.roles.includes(role)
									? 'bg-light-green text-dark-brown'
									: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
							}`}
							disabled={isSubmitting}
						>
							{role.charAt(0).toUpperCase() + role.slice(1)}
							{#if editedUser.roles.includes(role)}
								<span class="ml-1">✓</span>
							{/if}
						</button>
					{/each}
				</div>
			</div>

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
