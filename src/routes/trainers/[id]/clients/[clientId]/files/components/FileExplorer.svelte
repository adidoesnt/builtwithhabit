<script lang="ts">
	import { goto } from '$app/navigation';

	const { files, trainerId, clientId } = $props();

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
</script>

<div class="overflow-hidden rounded-lg bg-white shadow-md">
	<div class="overflow-x-auto">
		<table class="w-full">
			<thead>
				<tr class="border-b border-gray-200 bg-gray-50">
					<th class="font-body text-dark-brown px-6 py-4 text-left text-sm font-semibold">Name</th>
					<th class="font-body text-dark-brown px-6 py-4 text-left text-sm font-semibold">Type</th>
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
									class="text-dark-brown font-body cursor-pointer hover:underline hover:opacity-80 transition-all duration-300"
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
								<span>No actions available</span>
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
