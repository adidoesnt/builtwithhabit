<script lang="ts">
	const {
		onclick,
		isDisabled,
		ariaLabel,
		isOpen,
		className = ''
	}: {
		onclick: () => void;
		isDisabled: boolean;
		ariaLabel: string;
		isOpen: boolean;
		className?: string;
	} = $props();
</script>

<button
	{onclick}
	class={`font-body text-dark-brown flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-gray-200 ${className}`}
	disabled={isDisabled}
	aria-label={ariaLabel}
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-5 w-5 transition-transform duration-200"
		style={isOpen ? 'transform: rotate(180deg)' : ''}
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
	</svg>
</button>
