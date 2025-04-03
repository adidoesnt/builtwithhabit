<script lang="ts">
	const { onclick, isDisabled }: { onclick: () => void; isDisabled: boolean } = $props();
</script>

<button
	{onclick}
	class="font-body text-dark-brown flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-105 hover:bg-gray-200"
	disabled={isDisabled}
	aria-label="Cancel editing"
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
