<script lang="ts">
	const { show, onClose, profilePictureDeleteUrl } = $props();
</script>

{#if show}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
		<div class="rounded-lg bg-white p-4">
			<h2 class="text-2xl font-bold">Delete Profile Picture</h2>
		</div>
	</div>
{/if}
