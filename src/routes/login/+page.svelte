<script lang="ts">
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
	import type { ActionData } from './$types';

	type FormErrors = {
		email?: string[];
		password?: string[];
	};

	let { form }: { form: (ActionData & { errors?: FormErrors }) | null } = $props();

	let formValues = $state({
		email: '',
		password: ''
	});

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
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div
		id="container"
		class="bg-beige flex h-full w-full min-w-[300px] flex-col items-center justify-center gap-2 overflow-y-auto rounded-sm p-8 py-4 md:h-fit md:w-fit md:overflow-y-visible md:py-8"
	>
		<AuthFormHeader />
		<form
			class="font-body flex w-full flex-col justify-start gap-2 overflow-visible"
			action="/login"
			method="POST"
		>
			<h1 class="text-2xl">Log in</h1>
			<p class="text-light-brown text-sm">Enter your email and password to login.</p>
			<div class="flex flex-col overflow-y-auto">
				<div class="flex flex-col gap-2">
					<label for="email">Email</label>
					<input
						class="rounded-sm border-[1px] border-none p-2"
						type="email"
						name="email"
						placeholder="Email"
						bind:value={formValues.email}
					/>
					{#if form?.errors?.email}
						<p class="text-sm text-red-400">{form.errors.email}</p>
					{/if}
				</div>
				<div class="mb-4 flex flex-col gap-2">
					<label for="password">Password</label>
					<input
						class="rounded-sm border-none p-2"
						type="password"
						name="password"
						placeholder="Password"
						bind:value={formValues.password}
					/>
					{#if form?.errors?.password}
						<p class="text-sm text-red-400">{form.errors.password}</p>
					{/if}
				</div>
			</div>
			<div class="flex flex-col-reverse justify-between gap-4 overflow-visible md:flex-row">
				<div class="flex flex-col gap-2">
					<p class="text-light-brown text-sm">
						Don't have an account? <a
							href="/signup"
							class="text-light-brown hover:text-dark-brown text-sm transition-all duration-300"
							>Sign up!</a
						>
					</p>
					<a
						href="/forgot-password"
						class="text-light-brown hover:text-dark-brown text-sm transition-all duration-300"
						>Forgot password?</a
					>
				</div>
				<button
					class="bg-dark-brown text-beige font-body flex h-fit w-fit rounded-sm px-8 py-2 transition-all duration-300 hover:scale-110 hover:opacity-80 disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-50 md:self-end"
					type="submit"
					disabled={!!form?.errors?.email || !!form?.errors?.password}>Log in</button
				>
			</div>
			{#if form?.error}
				<p class="text-sm text-red-400">{form.error}</p>
			{/if}
		</form>
	</div>
</div>
