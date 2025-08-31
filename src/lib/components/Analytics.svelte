<script lang="ts">
	import { page } from '$app/state';
	import { env } from '$env/dynamic/public';

	// GTAG ID is meant to be public, so this is not a security issue
	const { PUBLIC_IS_GA_ENABLED, PUBLIC_GTAG_ID } = env;
	const isGaEnabled = (PUBLIC_IS_GA_ENABLED ?? 'false').toLowerCase() === 'true';

	// PUBLIC_GTAG_ID format includes the "G-" prefix so it is left out of the template
	const scriptSrc = `https://www.googletagmanager.com/gtag/js?id=${PUBLIC_GTAG_ID}`;
	const currentPage = $derived(page.url.pathname);

	$effect(() => {
		// ts-ignore used as a temporary workaround for type errors from gtag
		if (isGaEnabled && typeof window !== 'undefined') {
			// Define the data layer
			(window as any).dataLayer = (window as any).dataLayer || [];

			// Modified gtag function that accepts args array
			function gtag() {
                //@ts-ignore
				dataLayer.push(arguments);
			}

			// Initialize gtag
			//@ts-ignore
			gtag('js', new Date());

			// Configure gtag
			//@ts-ignore
			gtag('config', PUBLIC_GTAG_ID, {
				page_path: currentPage
			});
		}
	});
</script>

<svelte:head>
	<script async src={scriptSrc}>
	</script>
</svelte:head>
