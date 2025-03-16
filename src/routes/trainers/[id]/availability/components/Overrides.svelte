<script lang="ts">
	import { fade } from 'svelte/transition';
	import EditButton from './buttons/EditButton.svelte';
	import CancelButton from './buttons/CancelButton.svelte';
	import SaveButton from './buttons/SaveButton.svelte';
	import DropdownButton from './buttons/DropdownButton.svelte';

	let isEditing = $state(false);
	function toggleEditing() {
		isEditing = !isEditing;
	}

	let isSaving = $state(false);
	function saveOverrides() {
		isSaving = true;

		// TODO: Save overrides

		setTimeout(() => {
			isSaving = false;
		}, 1000);
	}

	let showDropdown = $state(false);
	function toggleDropdown() {
		showDropdown = !showDropdown;
	}
</script>

<div class="flex flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
	<div class="flex items-center justify-between">
		<div class="flex flex-col">
			<h2 class="font-heading text-dark-brown text-2xl font-bold">Overrides</h2>
			<p class="font-body text-light-brown">
				Indicate specific time ranges when you are unavailable.
			</p>
		</div>
		<div class="flex items-center gap-2">
			<div class="relative flex h-10 w-24 justify-end">
				{#if isEditing}
					<div
						in:fade={{ duration: 200 }}
						out:fade={{ duration: 150 }}
						class="absolute right-0 flex items-center gap-2"
					>
						<CancelButton onclick={toggleEditing} isDisabled={isSaving} />
						<SaveButton save={saveOverrides} {isSaving} />
					</div>
				{:else}
					<EditButton onclick={toggleEditing} isDisabled={isSaving} />
				{/if}
			</div>
			<DropdownButton
				ariaLabel="Toggle dropdown"
				isOpen={showDropdown}
				onclick={toggleDropdown}
				isDisabled={isSaving}
				className="w-10 h-10"
			/>
		</div>
	</div>

	{#if showDropdown}
		<div transition:fade={{ duration: 200 }} class="mt-4 rounded-md bg-gray-100 p-4">
			<p class="text-dark-brown">Dropdown content will go here</p>
		</div>
	{/if}
</div>
