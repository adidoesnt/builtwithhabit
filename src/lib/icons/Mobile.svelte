<script lang="ts">
	const { width = '24', height = '24', fill = 'currentColor', href = '/' } = $props();
</script>

<a aria-label="Mobile" {href} target="_blank" rel="noopener noreferrer">
	<svg
		{fill}
		{width}
		{height}
		class="transition-all duration-300 hover:scale-110 hover:opacity-80"
		version="1.1"
		id="Layer_1"
		xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 64 64"
		style="enable-background:new 0 0 64 64;"
		xml:space="preserve"
	>
		<path
			d="M56.88,46.005l-3.038,8.363c-0.757,2.083-3.055,3.142-5.139,2.389c-5.235-1.891-15.098-6.456-25.051-16.409
	S9.133,20.533,7.242,15.298c-0.753-2.084,0.306-4.383,2.389-5.139l8.363-3.038c0.828-0.301,1.754-0.025,2.283,0.68l7.148,9.53
	c0.562,0.75,0.529,1.79-0.081,2.501l-4.956,5.782c0,0,2.071,4.232,6.919,9.08c4.848,4.848,9.08,6.919,9.08,6.919l5.782-4.956
	c0.712-0.61,1.752-0.644,2.501-0.081l9.53,7.148C56.904,44.251,57.18,45.178,56.88,46.005z"
		/>
	</svg></a
>
