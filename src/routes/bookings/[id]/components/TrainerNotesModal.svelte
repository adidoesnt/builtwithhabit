<script lang="ts">
	const { isOpen, setIsOpen, getPresignedUrl, bookingNotesFileText, isTrainerForBooking } =
		$props();

	let isLoading = $state(false);
	let message: {
		message: string;
		type: 'success' | 'error';
	} | null = $state(null);
	let notes = $state(bookingNotesFileText);
	let disableSave = $derived(notes === bookingNotesFileText || notes.trim() === '');

	function handleClose() {
		setIsOpen(false);
	}

	async function handleSave() {
		isLoading = true;
		try {
			const presignedUrl = await getPresignedUrl();
			if (!presignedUrl) {
				throw new Error('Failed to get presigned url');
			}

			const file = new File([notes], 'note.txt', {
				type: 'text/plain',
				lastModified: new Date().getTime()
			});

			await fetch(presignedUrl, {
				method: 'PUT',
				body: file
			});

			message = {
				message: 'Notes saved successfully',
				type: 'success'
			};

			setTimeout(() => {
				message = null;
			}, 3000);
		} catch (error) {
			console.error('Error saving notes:', error);
			message = {
				message: 'Failed to save notes',
				type: 'error'
			};
		} finally {
			isLoading = false;
		}
	}
</script>

{#if isOpen}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
	>
		<div
			class="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white shadow-md md:h-3/4 md:w-3/4"
		>
			<div
				class="flex flex-shrink-0 items-center justify-between border-b border-gray-200 bg-gray-50 p-4"
			>
				<h2 class="font-body text-dark-brown text-lg font-semibold">Trainer Notes</h2>
				<button
					class="text-dark-brown cursor-pointer hover:text-blue-800"
					title="Close modal"
					aria-label="Close modal"
					onclick={handleClose}
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
			<div class="flex-1 overflow-y-auto p-4">
				<form class="flex h-full flex-col">
					{#if message}
						<div
							class="mb-4 rounded-md p-4"
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
					{/if}
					<div class="flex-1">
						<label class="font-body text-dark-brown mb-2 block text-sm font-medium" for="notes">
							Notes
						</label>
						<textarea
							id="notes"
							class="font-body text-dark-brown focus:border-dark-brown focus:ring-dark-brown h-[calc(100%-3rem)] w-full rounded-md border border-gray-300 p-2"
							placeholder="Enter your notes here..."
							disabled={isLoading}
							bind:value={notes}
						></textarea>
					</div>
					{#if isTrainerForBooking}
						<div class="mt-4 flex flex-shrink-0 justify-end gap-2">
							<button
								class="font-body text-dark-brown rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
								onclick={handleClose}
								disabled={isLoading}
							>
								Cancel
							</button>
							<button
								class="font-body rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
								disabled={isLoading || disableSave}
								onclick={handleSave}
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
									Saving...
								{:else}
									Save
								{/if}
							</button>
						</div>
					{/if}
				</form>
			</div>
		</div>
	</div>
{/if}
