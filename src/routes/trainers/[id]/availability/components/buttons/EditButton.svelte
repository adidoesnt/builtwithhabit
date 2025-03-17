<script lang="ts">
	import { fade } from 'svelte/transition';

	const { onclick, isDisabled }: { onclick: () => void; isDisabled: boolean } = $props();
</script>

<button
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 150 }}
	{onclick}
	class="font-body bg-dark-brown hover:bg-opacity-90 flex h-10 w-10 items-center justify-center rounded-full text-white transition-all duration-200 hover:scale-105"
	disabled={isDisabled}
	aria-label="Edit availability"
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
			d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
		/>
	</svg>
</button>
