<script lang="ts">
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
	import type { ActionData } from './$types';

	type FormErrors = {
		firstName?: string[];
		middleName?: string[];
		lastName?: string[];
		email?: string[];
		password?: string[];
	};

	let { form }: { form: (ActionData & { errors?: FormErrors }) | null } = $props();

	let formValues = $state({
		firstName: '',
		middleName: '',
		lastName: '',
		email: '',
		password: ''
	});

	let submitDisabled = $derived(
		Object.values(form?.errors ?? {}).some((error) => error !== undefined)
	);
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center overflow-y-auto md:p-4">
	<div
		id="container"
		class="bg-beige flex min-w-[300px] flex-col items-center justify-start gap-2 overflow-y-auto rounded-sm p-8 md:justify-center md:overflow-y-visible"
	>
		<AuthFormHeader />
		<form
			class="font-body flex w-full flex-col justify-start gap-2 overflow-visible"
			action="/signup"
			method="POST"
		>
			<h1 class="text-2xl">Sign up</h1>
			<p class="text-light-brown text-sm">Enter your details below to create an account.</p>
			<div class="flex flex-col gap-4 overflow-y-auto">
				<div class="flex flex-wrap gap-4">
					<div class="flex flex-col gap-2">
						<label for="firstName">First Name</label>
						<input
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
					Sign up
				</button>
			</div>
		</form>
	</div>
</div>
