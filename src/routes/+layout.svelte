<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
					await navigation.complete;
				});
			});
	});
</script>

<div class="flex min-h-screen w-screen bg-dark-brown font-old-standard">
	{@render children()}
</div>
