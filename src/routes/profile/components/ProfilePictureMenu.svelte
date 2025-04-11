<script lang="ts">
	const {
		hasProfilePicture,
		profilePictureViewUrl,
		profilePictureDeleteUrl,
		profilePictureUploadUrl,
		show
	} = $props();

	let isDeleteConfirmationModalOpen = $state(false);
	const setIsDeleteConfirmationModalOpen = (isOpen: boolean) => {
		isDeleteConfirmationModalOpen = isOpen;
	};

	let isUploadModalOpen = $state(false);
	const setIsUploadModalOpen = (isOpen: boolean) => {
		isUploadModalOpen = isOpen;
	};
</script>

{#if show}
	<div
		class="text-dark-brown/70 absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center gap-4 rounded-sm bg-gray-100 p-2 hover:opacity-100 md:opacity-50"
	>
		{#if hasProfilePicture}
			<a
				href={profilePictureViewUrl}
				target="_blank"
				class="hover:text-dark-brown flex items-center gap-1 transition-colors"
				title="View Profile Picture"
				aria-label="View Profile Picture"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
					<circle cx="12" cy="12" r="3" />
				</svg>
			</a>
			<button
				onclick={setIsDeleteConfirmationModalOpen.bind(null, true)}
				class="hover:text-dark-brown flex cursor-pointer items-center gap-1 transition-colors"
				title="Delete Profile Picture"
				aria-label="Delete Profile Picture"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M3 6h18" />
					<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
					<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
					<line x1="10" y1="11" x2="10" y2="17" />
					<line x1="14" y1="11" x2="14" y2="17" />
				</svg>
			</button>
		{/if}
		<button
			onclick={setIsUploadModalOpen.bind(null, true)}
			class="hover:text-dark-brown flex cursor-pointer items-center gap-1 transition-colors"
			title="Upload New Profile Picture"
			aria-label="Upload New Profile Picture"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
		</button>
	</div>
{/if}
