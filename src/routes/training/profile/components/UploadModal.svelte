<script lang="ts">
	const { show, onClose, profilePictureDeleteUrl } = $props();

	let selectedFile: File | null = $state(null);
	let isDragging = $state(false);
	let isLoading = $state(false);
	let uploadMessage: { message: string; type: 'success' | 'error' } | null = $state(null);

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		if (e.dataTransfer?.files) {
			selectedFile = e.dataTransfer.files[0];
		}
	}

	function handleFileSelect(e: Event) {
		const input = e.target as HTMLInputElement;
		if (input.files) {
			selectedFile = input.files[0];
		}
	}

	// TODO: Add thumbnail generation lambda on upload
	// Then, check if thumbnail is available when fetching profile picture
	// If not, use the original image
	async function handleUpload() {
		isLoading = true;

		try {
			if (!selectedFile) {
				throw new Error('No file selected');
			}

			const fileName = selectedFile.name;
			const presignedUrl = await fetch(`/training/profile/presigned-url?fileName=${fileName}`);
			const presignedUrlData = await presignedUrl.json();
			const { presignedUrl: uploadUrl } = presignedUrlData;

			if (profilePictureDeleteUrl) {
				const deleteResponse = await fetch(profilePictureDeleteUrl, {
					method: 'DELETE'
				});

				if (!deleteResponse.ok) {
					throw new Error('Failed to delete old profile picture');
				}
			}

			const response = await fetch(uploadUrl, {
				method: 'PUT',
				body: selectedFile,
				headers: {
					'Content-Type': selectedFile.type
				}
			});

			if (!response.ok) {
				throw new Error('Failed to upload profile picture');
			}

			uploadMessage = {
				message: 'Profile picture uploaded successfully',
				type: 'success'
			};

			setTimeout(() => {
				onClose();
				window.location.reload();
			}, 2000);
		} catch (error) {
			console.error('Error uploading file:', error);
			uploadMessage = {
				message: 'Failed to upload profile picture',
				type: 'error'
			};
		} finally {
			isLoading = false;
		}
	}
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
		<div
			class="h-full w-full overflow-hidden bg-white shadow-lg md:h-auto md:max-w-md md:rounded-lg"
		>
			<div class="flex items-center justify-between border-b border-gray-200 bg-gray-50 p-4">
				<h2 class="font-body text-dark-brown text-lg font-semibold">Upload Profile Picture</h2>
				<button
					class="text-dark-brown cursor-pointer hover:text-blue-800"
					title="Close modal"
					aria-label="Close modal"
					onclick={onClose}
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
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>
			<form class="flex h-[calc(100%-60px)] flex-col">
				<div class="flex-grow p-4">
					{#if uploadMessage}
						<div
							class="mb-4 rounded-md p-4"
							class:bg-green-50={uploadMessage.type === 'success'}
							class:bg-red-50={uploadMessage.type === 'error'}
						>
							<p
								class="font-body text-sm font-medium"
								class:text-green-800={uploadMessage.type === 'success'}
								class:text-red-800={uploadMessage.type === 'error'}
							>
								{uploadMessage.message}
							</p>
						</div>
					{/if}
					<div class="mb-4">
						<label
							class="font-body text-dark-brown mb-2 block text-sm font-medium"
							for="file-upload"
						>
							Select a profile picture to upload
						</label>
						<button
							class="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-6 hover:border-gray-400"
							class:border-blue-500={isDragging}
							class:cursor-not-allowed={isLoading}
							class:opacity-50={isLoading}
							ondragover={handleDragOver}
							ondragleave={handleDragLeave}
							ondrop={handleDrop}
							onclick={() => document.getElementById('file-upload')?.click()}
							disabled={isLoading}
						>
							<div class="text-center">
								{#if isLoading}
									<svg
										class="mx-auto h-8 w-8 animate-spin text-blue-600"
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
									<p class="font-body text-light-brown mt-2 text-sm">
										Uploading profile picture...
									</p>
								{:else}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										class="mx-auto h-12 w-12 text-gray-400"
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
									<p class="font-body text-light-brown mt-2 text-sm">
										Drag and drop an image here, or click to select
									</p>
								{/if}
							</div>
							<input
								id="file-upload"
								type="file"
								accept="image/*"
								class="hidden"
								onchange={handleFileSelect}
								disabled={isLoading}
							/>
						</button>
						{#if selectedFile}
							<div class="mt-4">
								<p class="font-body text-dark-brown mb-2 text-sm font-medium">Selected file:</p>
								<p class="font-body text-light-brown text-sm">{selectedFile.name}</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="mt-auto flex justify-end gap-2 border-t border-gray-200 bg-gray-50 p-4">
					<button
						class="font-body text-dark-brown rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
						onclick={onClose}
						disabled={isLoading}
					>
						Cancel
					</button>
					<button
						class="font-body rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
						disabled={!selectedFile || isLoading}
						onclick={handleUpload}
					>
						{#if isLoading}
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
							Uploading...
						{:else}
							Upload
						{/if}
					</button>
				</div>
			</form>
		</div>
	</div>
{/if}
