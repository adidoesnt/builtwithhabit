<script lang="ts">
	import { page } from '$app/state';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
</script>

<div
	class="flex min-h-[calc(100dvh-8rem)] md:min-h-[calc(100dvh-12rem)] w-full flex-col items-center justify-center bg-cover bg-center md:bg-[url(/hut-with-mountains-1.jpg)]"
>
	<div
		id="container"
		class="bg-beige flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center gap-8 overflow-y-auto rounded-none p-8 py-4 md:min-h-fit md:w-fit md:overflow-y-visible md:rounded-sm md:py-8"
	>
		<LogoHeader />
		<div class="flex flex-col items-center text-center">
			<h1 class="font-body text-2xl font-bold">
				{page.status}: {page.error?.message || 'Something went wrong'}
			</h1>
			<p class="text-light-brown font-body text-sm">
				{#if page.status === 404}
					The page you're looking for doesn't exist.
				{:else if page.status === 403}
					You don't have permission to access this page.
				{:else}
					An unexpected error occurred. Please try again later.
				{/if}
			</p>
		</div>
		<a
			href="/"
			class="bg-dark-brown text-beige font-body flex h-fit w-fit rounded-sm px-8 py-2 transition-all duration-300 hover:scale-110 hover:opacity-80"
			>Go home</a
		>
	</div>
</div>
