<script lang="ts">
	import { goto } from '$app/navigation';
	import { UserDir } from '../types';

	const { files, trainerId, clientId, currentDir = 'root', goToPreviousDir = null } = $props();

	function isDirectory(url: string) {
		return url.endsWith('/');
	}

	function getFileIcon(name: string, isDir: boolean) {
		if (isDir) return '📁';

		const extension = name.split('.').pop()?.toLowerCase();
		switch (extension) {
			case 'pdf':
				return '📄';
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
				return '🖼️';
			case 'doc':
			case 'docx':
				return '📝';
			default:
				return '📄';
		}
	}

	function handleFileClick(file: { name: string; url: string }) {
		if (isDirectory(file.url)) {
			console.log('Open directory:', file.name);
			goto(`/trainers/${trainerId}/clients/${clientId}/files/${file.name}`);
		} else {
			console.log('Download file:', file.name);
			goto(file.url);
		}
	}

	function handleUpload() {
		console.log('Opening file upload dialog');
		// TODO: Implement file upload
	}

	function handleDelete(file: { name: string; url: string }) {
		console.log('Deleting file:', file.name);
		// TODO: Implement file deletion
	}

	const disableUpload = $derived(!Object.values(UserDir).includes(currentDir as UserDir));
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-md">
	<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
		<div class="flex items-center gap-4">
			{#if goToPreviousDir}
				<button
					class="text-dark-brown font-body cursor-pointer rounded-sm bg-[#A0D2EB] px-3 py-1 text-sm transition-all duration-300 hover:opacity-80"
					onclick={goToPreviousDir}
				>
					Back
				</button>
			{/if}
			<span class="font-body text-dark-brown">Current Directory: {currentDir || 'Root'}</span>
		</div>
		<button
			class="text-dark-brown font-body cursor-pointer rounded-sm bg-[#A0D2EB] px-3 py-1 text-sm transition-all duration-300 hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
			onclick={handleUpload}
			disabled={disableUpload}
		>
			Upload Files
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
					{#each files as file}
						<tr class="hover:bg-gray-50">
							<td class="font-body text-dark-brown px-6 py-4 whitespace-nowrap">
								<div class="flex items-center gap-2">
									<span class="text-lg">{getFileIcon(file.name, isDirectory(file.url))}</span>
									<button
										class="text-dark-brown font-body cursor-pointer transition-all duration-300 hover:underline hover:opacity-80"
										onclick={() => handleFileClick(file)}
									>
										{file.name}
									</button>
								</div>
							</td>
							<td class="font-body text-light-brown px-6 py-4 whitespace-nowrap">
								{isDirectory(file.url) ? 'Folder' : 'File'}
							</td>
							<td class="font-body text-dark-brown px-6 py-4 whitespace-nowrap">
								<div class="flex gap-2">
									{#if !isDirectory(file.url)}
										<button
											class="text-dark-brown font-body cursor-pointer rounded-sm bg-red-100 px-3 py-1 text-sm transition-all duration-300 hover:opacity-80"
											onclick={() => handleDelete(file)}
										>
											Delete
										</button>
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
