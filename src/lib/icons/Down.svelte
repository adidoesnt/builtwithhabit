<script lang="ts">
	const { className, color = 'currentColor' } = $props();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	class={className}
	viewBox="0 0 24 24"
	preserveAspectRatio="xMidYMid meet"
	style={`color: ${color};`}
>
	<path d="M12 5v14" />
	<path d="m19 12-7 7-7-7" />
</svg>
