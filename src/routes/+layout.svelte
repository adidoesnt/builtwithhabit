<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="flex min-h-screen w-full bg-dark-brown font-old-standard">
	{@render children()}
</div>
