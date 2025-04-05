<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { PUBLIC_DISABLE_SIGNUP } from '$env/static/public';

	const DISABLE_SIGNUP = PUBLIC_DISABLE_SIGNUP === 'true';

	type FormErrors = {
		firstName?: string[];
		lastName?: string[];
		email?: string[];
		password?: string[];
	};

	type FormValues = {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	};

	let {
		form
	}: { form: (ActionData & { errors?: FormErrors; data?: Partial<FormValues> }) | null } = $props();

	let formValues = $state<FormValues>({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	});

	let isLoading = $state(false);
	let showPassword = $state(false);

	let submitDisabled = $derived(
		Object.values(form?.errors ?? {}).some((error) => error !== undefined) || isLoading
	);

	// Reset errors when form values change
	$effect(() => {
		if (form?.errors) {
			// Create a copy of the current errors
			const updatedErrors = { ...form.errors };
			let hasChanges = false;

			// Check each field and reset its error if the value has changed
			(Object.keys(formValues) as Array<keyof FormValues>).forEach((field) => {
				if (
					formValues[field] &&
					form?.errors?.[field] &&
					formValues[field] !== form?.data?.[field]
				) {
					updatedErrors[field] = undefined;
					hasChanges = true;
				}
			});

			if (hasChanges && form) {
				form = {
					...form,
					error: undefined as any,
					errors: updatedErrors
				};
			}
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
		class="bg-beige flex min-h-[100dvh] w-full md:w-fit flex-col items-center justify-start gap-8 rounded-none p-8 md:min-h-fit md:justify-center md:rounded-sm"
	>
		<LogoHeader />
		<form
			class="font-body flex w-full flex-col justify-start gap-2 {DISABLE_SIGNUP
				? 'pointer-events-none opacity-50'
				: ''}"
			action="/signup"
			method="POST"
			use:enhance={() => {
				isLoading = true;

				return async ({ update }) => {
					isLoading = false;
					await update();
				};
			}}
		>
			<h1 class="text-2xl">Sign up</h1>
			{#if DISABLE_SIGNUP}
				<p class="text-sm text-red-500">Sign up is currently disabled.</p>
			{:else}
				<p class="text-light-brown text-sm">Enter your details below to create an account.</p>
			{/if}
			<div class="flex flex-col gap-4">
				<div class="flex flex-wrap gap-4">
					<div class="flex flex-col gap-2">
						<label for="firstName">First Name</label>
						<input
							bind:value={formValues.firstName}
							class="rounded-sm border-[1px] border-none p-2 md:max-w-[200px]"
							type="text"
							name="firstName"
							placeholder="John"
						/>
						{#if form?.errors?.firstName}
							<p class="text-sm text-red-400">{form.errors.firstName}</p>
						{/if}
					</div>
					<div class="flex flex-col gap-2">
						<label for="lastName">Last Name</label>
						<input
							bind:value={formValues.lastName}
							class="max-w-[200px] rounded-sm border-[1px] border-none p-2"
							type="text"
							name="lastName"
							placeholder="Doe"
						/>
						{#if form?.errors?.lastName}
							<p class="text-sm text-red-400">{form.errors.lastName}</p>
						{/if}
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label for="email">Email</label>
					<input
						bind:value={formValues.email}
						class="max-w-[300px] rounded-sm border-[1px] border-none p-2"
						type="email"
						name="email"
						placeholder="Email"
					/>
					{#if form?.errors?.email}
						<p class="text-sm text-red-400">{form.errors.email}</p>
					{/if}
				</div>
				<div class="mb-4 flex flex-col gap-2">
					<label for="password">Password</label>
					<div class="relative max-w-[300px]">
						<input
							bind:value={formValues.password}
							class="w-full rounded-sm border-none p-2 pr-10"
							type={showPassword ? 'text' : 'password'}
							name="password"
							placeholder="Password"
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
			<div
				class="flex flex-col-reverse items-start justify-between gap-4 md:flex-row md:items-center"
			>
				<p class="text-light-brown text-sm">
					Already have an account? <a
						href="/login"
						class="text-light-brown hover:text-dark-brown text-sm transition-all duration-300"
						>Log in!</a
					>
				</p>
				<button
					class="bg-dark-brown text-beige font-body h-fit rounded-sm px-8 py-2 transition-all duration-300 hover:scale-110 hover:opacity-80 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50"
					type="submit"
					disabled={submitDisabled}
				>
					{#if isLoading}
						<LoadingSpinner size="20px" color="#F5F5DC" />
						<span class="ml-2">Signing up...</span>
					{:else}
						Sign up
					{/if}
				</button>
			</div>
			{#if form?.error}
				<p class="mt-2 text-sm text-red-400">{form.error}</p>
			{/if}
		</form>
	</div>
</div>
