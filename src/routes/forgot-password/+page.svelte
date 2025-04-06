<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';

	type FormErrors = {
		email?: string[];
	};

	let { form }: { form: (ActionData & { errors?: FormErrors; success?: string }) | null } =
		$props();

	let formValues = $state({
		email: ''
	});

	let isLoading = $state(false);

	$effect(() => {
		if (formValues.email && form?.errors?.email) {
			form = {
				...form,
				error: undefined as any,
				errors: {
					...form.errors,
					email: undefined
				}
			};
		}
	});
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
			action="/forgot-password"
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
				<p class="text-light-brown text-sm">Enter your email to receive a password reset link.</p>
			</div>

			<div class="flex flex-col gap-4">
				<div class="flex flex-col gap-2">
					<label for="email" class="font-medium">Email</label>
					<input
						class="focus:border-dark-brown rounded-sm border-[1px] border-gray-300 p-2 focus:outline-none"
						type="email"
						name="email"
						placeholder="Enter your email"
						bind:value={formValues.email}
					/>
					{#if form?.errors?.email}
						<p class="text-sm text-red-400">{form.errors.email}</p>
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
					disabled={!!form?.errors?.email || isLoading}
					>{#if isLoading}
						<LoadingSpinner size="20px" color="#F5F5DC" />
						<span class="ml-2">Sending...</span>
					{:else}
						Send Reset Link
					{/if}</button
				>
			</div>

			{#if form?.error}
				<p class="mt-2 text-sm text-red-400">{form.error}</p>
			{/if}
			{#if form?.success}
				<p class="text-sm text-green-600">{form.success}</p>
			{/if}
		</form>
	</div>
</div>
