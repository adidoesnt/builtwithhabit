<script lang="ts">
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
	import { user } from '../../../lib/stores/auth';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div
		id="container"
		class="bg-beige flex min-w-[300px] flex-col items-center justify-start gap-2 overflow-y-auto rounded-sm p-8 md:justify-center md:overflow-y-visible"
	>
		<AuthFormHeader />
		<div class="flex flex-col items-start justify-center font-body">
			<h1 class="text-2xl">Almost there!</h1>
			<p class="text-sm text-light-brown">
				We just need to verify your email address to complete your account.
			</p>
			<p class="text-sm text-light-brown">
				We've sent a verification email to <span class="font-bold"
					>{$user?.email ?? 'your email'}</span
				>. Please check your inbox.
			</p>
		</div>
	</div>
</div>
