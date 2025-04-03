<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();
	const { user } = data;
</script>

<div class="flex h-[100dvh] w-screen flex-col items-center justify-center">
	<div
		id="container"
		class="bg-beige flex min-w-[300px] flex-col items-center justify-start gap-2 overflow-y-auto rounded-sm p-8 md:justify-center md:overflow-y-visible"
	>
		<LogoHeader />
		<div class="font-body flex flex-col items-start justify-center">
			<h1 class="text-2xl">Almost there!</h1>
			<p class="text-light-brown text-sm">
				We just need to verify your email address to complete your account.
			</p>
			<p class="text-light-brown text-sm">
				We've sent a verification email to <span class="font-bold"
					>{user?.email ?? 'your email'}</span
				>. Please check your inbox.
			</p>
		</div>
	</div>
</div>
