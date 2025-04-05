<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { PUBLIC_DISABLE_SIGNUP } from '$env/static/public';

	const DISABLE_SIGNUP = PUBLIC_DISABLE_SIGNUP === 'true';

	type FormErrors = {
		firstName?: string[];
		middleName?: string[];
		lastName?: string[];
		email?: string[];
		password?: string[];
	};

	type FormValues = {
		firstName: string;
		middleName: string;
		lastName: string;
		email: string;
		password: string;
	};

	let {
		form
	}: { form: (ActionData & { errors?: FormErrors; data?: Partial<FormValues> }) | null } = $props();

	let formValues = $state<FormValues>({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		password: ''
	});

	let isLoading = $state(false);

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
						<label for="middleName"
							>Middle Name <span class="text-light-brown text-sm">(Optional)</span></label
						>
						<input
							bind:value={formValues.middleName}
							class="max-w-[200px] rounded-sm border-[1px] border-none p-2"
							type="text"
							name="middleName"
							placeholder=""
						/>
						{#if form?.errors?.middleName}
							<p class="text-sm text-red-400">{form.errors.middleName}</p>
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
					<input
						bind:value={formValues.password}
						class="max-w-[300px] rounded-sm border-none p-2"
						type="password"
						name="password"
						placeholder="Password"
					/>
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
