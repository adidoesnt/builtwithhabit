<script lang="ts">
	const { size = '24px', color = 'currentColor', thickness = '3px' } = $props();
</script>

<div
	class="spinner-container"
	style="--spinner-size: {size}; --spinner-color: {color}; --spinner-thickness: {thickness};"
>
	<div class="spinner"></div>
</div>

<style>
	.spinner-container {
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.spinner {
		width: var(--spinner-size);
		height: var(--spinner-size);
		border: var(--spinner-thickness) solid rgba(0, 0, 0, 0.1);
		border-top: var(--spinner-thickness) solid var(--spinner-color);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
