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

<div class="flex flex-col min-h-screen w-full bg-dark-brown font-old-standard">
	{@render children()}
</div>
