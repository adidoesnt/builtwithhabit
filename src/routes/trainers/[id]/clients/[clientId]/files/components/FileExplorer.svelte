<script lang="ts">
	import { UserDir } from '../types';
	import FolderIcon from './FolderIcon.svelte';
	import PDFIcon from './PDFIcon.svelte';
	import ImageIcon from './ImageIcon.svelte';
	import DocumentIcon from './DocumentIcon.svelte';
	import FileIcon from './FileIcon.svelte';
	import FileUploadModal from './FileUploadModal.svelte';

	const { files, trainerId, clientId, currentDir = 'root', goToPreviousDir = null } = $props();
	let isUploadModalOpen = $state(false);
	let toggleUploadModal = () => (isUploadModalOpen = !isUploadModalOpen);
	let deletingFiles: Array<number> = $state([]);

	function isDirectory(url: string) {
		return url.endsWith('/');
	}

	async function handleDelete(
		file: { name: string; url: string; deleteUrl: string | null },
		index: number
	) {
		try {
			if (file.deleteUrl) {
				deletingFiles.push(index);
				await fetch(file.deleteUrl, {
					method: 'DELETE'
				});
				window.location.reload();
			} else {
				throw new Error('No delete URL found for file');
			}
		} catch (error) {
			console.error('Error deleting file:', error);
		} finally {
			deletingFiles = deletingFiles.filter((i) => i !== index);
		}
	}

	const getPresignedUrl = async (fileName: string) => {
		switch (currentDir) {
			case UserDir.MEDIA:
				return await fetch(
					`/trainers/${trainerId}/clients/${clientId}/files/media/presigned-url?fileName=${fileName}`
				)
					.then((res) => res.json())
					.then((data) => data.presignedUrl);
			case UserDir.TRAINER_NOTES:
				return await fetch(
					`/trainers/${trainerId}/clients/${clientId}/files/trainer-notes/presigned-url?fileName=${fileName}`
				)
					.then((res) => res.json())
					.then((data) => data.presignedUrl);
			default:
				return null;
		}
	};
	const disableUpload = $derived(!Object.values(UserDir).includes(currentDir as UserDir));
</script>

<FileUploadModal isOpen={isUploadModalOpen} onClose={toggleUploadModal} {getPresignedUrl} />

<div class="overflow-hidden rounded-lg bg-white shadow-md">
	<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
		<div class="flex items-center gap-4">
			{#if goToPreviousDir}
				<button
					class="text-dark-brown cursor-pointer hover:text-blue-800"
					title="Go back"
					aria-label="Go back"
					onclick={goToPreviousDir}
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
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
				</button>
			{/if}
			<span class="font-body text-dark-brown"
				>Current Directory: <span class="font-bold">{currentDir || 'Root'}</span></span
			>
		</div>
		<button
			class="text-dark-brown cursor-pointer hover:text-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
			title="Upload files"
			aria-label="Upload files"
			onclick={toggleUploadModal}
			disabled={disableUpload}
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
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/>
			</svg>
		</button>
	</div>

	<div class="overflow-x-auto">
		{#if files.length === 0}
			<div class="flex flex-col items-center justify-center p-8">
				<p class="font-body text-light-brown text-center">No files available</p>
			</div>
		{:else}
			<table class="w-full">
				<thead>
					<tr class="border-b border-gray-200 bg-gray-50">
						<th class="font-body text-dark-brown px-6 py-4 text-left text-sm font-semibold">Name</th
						>
						<th class="font-body text-dark-brown px-6 py-4 text-left text-sm font-semibold">Type</th
						>
						<th class="font-body text-dark-brown px-6 py-4 text-left text-sm font-semibold"
							>Actions</th
						>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-200">
					{#each files as file, index}
						<tr class="hover:bg-gray-50">
							<td class="font-body text-dark-brown px-6 py-4 whitespace-nowrap">
								<div class="flex items-center gap-2">
									{#if isDirectory(file.url)}
										<FolderIcon className="h-5 w-5 text-dark-brown" />
									{:else if file.name.endsWith('.pdf')}
										<PDFIcon className="h-5 w-5 text-dark-brown" />
									{:else if ['jpg', 'jpeg', 'png', 'gif'].includes(file.name
											.split('.')
											.pop()
											?.toLowerCase() || '')}
										<ImageIcon className="h-5 w-5 text-dark-brown" />
									{:else if ['doc', 'docx'].includes(file.name
											.split('.')
											.pop()
											?.toLowerCase() || '')}
										<DocumentIcon className="h-5 w-5 text-dark-brown" />
									{:else}
										<FileIcon className="h-5 w-5 text-dark-brown" />
									{/if}
									{#if isDirectory(file.url)}
										<span class="text-dark-brown">{file.name}</span>
									{:else}
										<a
											class="text-dark-brown cursor-pointer hover:text-blue-800"
											href={file.url}
											target="_blank"
											rel="noopener noreferrer"
										>
											{file.name}
										</a>
									{/if}
								</div>
							</td>
							<td class="font-body text-light-brown px-6 py-4 whitespace-nowrap">
								{isDirectory(file.url) ? 'Folder' : 'File'}
							</td>
							<td class="font-body text-dark-brown px-6 py-4 whitespace-nowrap">
								<div class="flex gap-2">
									{#if !isDirectory(file.url)}
										<button
											class="cursor-pointer text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
											title="Delete file"
											aria-label="Delete file"
											disabled={deletingFiles.includes(index)}
											onclick={() => handleDelete(file, index)}
										>
											{#if deletingFiles.includes(index)}
												<svg
													class="h-5 w-5 animate-spin text-red-600"
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
											{:else}
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
											{/if}
										</button>
									{:else}
										<span class="text-light-brown">No actions available</span>
									{/if}
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</div>
</div>
