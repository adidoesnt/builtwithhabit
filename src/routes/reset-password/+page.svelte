<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	type FormErrors = {
		password?: string[];
	};

	let { form }: { form: (ActionData & { errors?: FormErrors; success?: string }) | null } =
		$props();

	let formValues = $state({
		password: ''
	});

	let isLoading = $state(false);
	let showPassword = $state(false);

	$effect(() => {
		if (formValues.password && form?.errors?.password) {
			form = {
				...form,
				error: undefined as any,
				errors: {
					...form.errors,
					password: undefined
				}
			};
		}
	});

	function togglePasswordVisibility() {
		showPassword = !showPassword;
	}
</script>

<div
	class="flex min-h-[100dvh] w-full flex-col items-center justify-center bg-cover bg-center md:bg-[url(/hut-with-mountains-1.jpg)] md:p-4"
>
	<div
		id="container"
		class="bg-beige flex min-h-[100dvh] w-fit flex-col items-center justify-center gap-8 overflow-y-auto rounded-none p-8 py-4 md:min-h-fit md:overflow-y-visible md:rounded-sm md:py-8"
	>
		<LogoHeader />
		<form
			class="font-body flex w-full flex-col justify-start gap-6"
			action="/reset-password"
			method="POST"
			use:enhance={({ formData }) => {
				isLoading = true;

				return async ({ update }) => {
					isLoading = false;
					await update();
				};
			}}
		>
			<div class="space-y-1">
				<h1 class="text-2xl font-semibold">Reset Password</h1>
				<p class="text-light-brown text-sm">Enter your new password to reset your account.</p>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="password" class="font-medium">Password</label>
					<div class="relative">
						<input
							class="focus:border-dark-brown w-full rounded-sm border-[1px] border-gray-300 p-2 pr-10 focus:outline-none"
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="Enter your new password"
							bind:value={formValues.password}
						/>
						<button
							type="button"
							class="hover:text-dark-brown absolute top-1/2 right-2 -translate-y-1/2 text-gray-500"
							onclick={togglePasswordVisibility}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
						>
							{#if showPassword}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
									/>
								</svg>
							{:else}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="h-5 w-5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									/>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							{/if}
						</button>
					</div>
					{#if form?.errors?.password}
						<p class="text-sm text-red-400">{form.errors.password}</p>
					{/if}
				</div>
			</div>

			<div class="flex flex-col-reverse gap-4 pt-2 md:flex-row md:items-center md:justify-between">
				<div class="flex flex-col gap-2">
					<p class="text-light-brown text-sm">
						Remember your password? <a
							href="/login"
							class="text-dark-brown text-sm transition-all duration-300 hover:underline">Log in</a
						>
					</p>
				</div>
				<button
					class="bg-dark-brown text-beige font-body flex h-fit w-fit rounded-sm px-8 py-2 transition-all duration-300 hover:scale-105 hover:bg-[#2A3B4C] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 md:self-end"
					type="submit"
					disabled={!!form?.errors?.password || isLoading}
					>{#if isLoading}
						<LoadingSpinner size="20px" color="#F5F5DC" />
						<span class="ml-2">Resetting...</span>
					{:else}
						Reset Password
					{/if}</button
				>
			</div>
			{#if form?.error}
				<p class="text-sm text-red-400">{form.error}</p>
			{/if}
			{#if form?.success}
				<p class="text-sm text-green-600">{form.success}</p>
			{/if}
		</form>
	</div>
</div>
