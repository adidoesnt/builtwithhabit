<script lang="ts">
	import config from '$lib/config';
	import type { ActionData } from './$types';

	const { splitName, caption, logo } = config.site;

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
		class="bg-beige flex h-full w-full min-w-[300px] flex-col items-center justify-center gap-2 overflow-y-hidden rounded-sm p-8 py-4 md:h-fit md:w-fit md:py-8"
	>
		<div
			class="mb-8 flex w-full flex-col items-start justify-center md:mb-0 md:w-fit md:flex-row md:items-center md:gap-4"
		>
			<img src={logo} alt="logo" class="flex h-auto w-36 self-center mix-blend-multiply md:w-40" />
			<div class="border-light-brown hidden h-full border-l-2 md:block"></div>
			<div class="flex flex-col gap-2">
				<h1 class="font-headings text-2xl font-bold md:text-4xl">
					<span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
						>{splitName[1]}</span
					><span class="text-dark-brown">{splitName[2]}.</span>
				</h1>
				<p class="font-body text-light-brown flex self-start text-sm">{caption}</p>
			</div>
		</div>
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
