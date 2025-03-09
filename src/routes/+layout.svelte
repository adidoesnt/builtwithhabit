<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setUser } from '$lib/stores/auth';
	let { children, data }: { children: any; data: LayoutData } = $props();

	$effect(() => {
		if (data.user) {
			setUser(data.user);
		}
	});

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

<div class="bg-dark-brown font-old-standard flex min-h-screen w-full flex-col">
	{@render children()}
</div>
