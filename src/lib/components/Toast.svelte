<script lang="ts">
	import { onMount } from 'svelte';

	export let message: string = '';
	export let type: 'success' | 'error' = 'success'; // Type of toast
	export let duration: number = 3000; // Duration in milliseconds

	let visible = false;

	onMount(() => {
		if (message) {
			visible = true;
			setTimeout(() => {
				visible = false;
			}, duration);
		}
	});
</script>

<div class={`toast ${type} ${visible ? '' : 'hidden'}`}>
	{message}
</div>

<style>
	.toast {
		position: fixed;
		bottom: 20px;
		right: 20px;
		padding: 1em;
		border-radius: 5px;
		color: white;
		transition: opacity 0.5s;
	}
	.success {
		background-color: green;
	}
	.error {
		background-color: red;
	}
	.hidden {
		opacity: 0;
	}
</style>
