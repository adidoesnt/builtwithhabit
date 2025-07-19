<script lang="ts">
	import { Instagram, Linkedin, Pinterest, Tiktok } from '$lib/icons';
	import { LoadingSpinner } from '$lib/components';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';

	type FormValues = {
		firstName: string;
		lastName: string;
		email: string;
		subject: string;
		message: string;
		isHuman: boolean;
	};

	type FormErrors = {
		firstName?: string[];
		lastName?: string[];
		email?: string[];
		subject?: string[];
		message?: string[];
		isHuman?: string[];
	};

	let formValues = $state({
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: '',
		isHuman: false
	});

	let isLoading = $state(false);
	let showSuccessMessage = $state(false);

	let { form }: { form: (ActionData & { errors?: FormErrors; error?: string }) | null } = $props();
	let errors = $derived(form?.errors);

	$effect(() => {
		if (form?.errors) {
			const updatedErrors = { ...form.errors };
			let hasChanges = false;

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

	$effect(() => {
		if (form?.success) {
			showSuccessMessage = true;

			setTimeout(() => {
				showSuccessMessage = false;
			}, 3000);
		}
	});
</script>

<div class="flex h-fit w-full flex-col">
	<section class="bg-beige grid min-h-[calc(100dvh-12rem)] w-full grid-cols-2 flex-col p-8">
		<div id="contact-grid-left" class="flex flex-col items-start justify-center gap-16 p-8">
			<div class="flex flex-col gap-2">
				<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">contact us</h1>
				<p class="font-body text-dark-brown text-2xl">we'd love to hear from you!</p>
				<p class="font-body text-dark-brown text-2xl">
					whether you have any questions about our blog, personal training services, upcoming
					activewear collection, or brand collaborations and partnerships, or just want to say hello
					and share any feedback, please feel free to reach out.
				</p>
			</div>
			<div class="flex flex-col gap-4">
				<h1 class="font-headings text-dark-brown text-5xl font-bold tracking-wide">
					let’s connect on socials
				</h1>
				<div class="flex gap-8">
					<Instagram width={40} height={40} />
					<Linkedin width={40} height={40} />
					<Pinterest width={40} height={40} />
					<Tiktok width={40} height={40} />
				</div>
			</div>
		</div>
		<div id="contact-grid-right" class="flex flex-col items-center justify-center">
			<form
				id="contact-form-card"
				class="flex flex-col gap-4 rounded-sm bg-white p-8 shadow-md"
				method="POST"
				use:enhance={({ formData }) => {
					isLoading = true;

					return async ({ update }) => {
						isLoading = false;
						await update();
					};
				}}
			>
				<div id="contact-form-body" class="flex flex-col gap-4">
					<div id="name-fields" class="flex gap-4">
						<div class="flex flex-col gap-2">
							<label for="firstName" class="font-body text-dark-brown text-lg font-bold"
								>first name</label
							>
							<input
								type="text"
								id="firstName"
								name="firstName"
								class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 text-lg focus:ring-2 focus:outline-none"
								placeholder="John"
								bind:value={formValues.firstName}
							/>
							{#if errors?.firstName}
								<p class="font-body text-sm text-red-500">{errors.firstName}</p>
							{/if}
						</div>
						<div class="flex flex-col gap-2">
							<label for="lastName" class="font-body text-dark-brown text-lg font-bold"
								>last name</label
							>
							<input
								type="text"
								id="lastName"
								name="lastName"
								class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 text-lg focus:ring-2 focus:outline-none"
								placeholder="Doe"
								bind:value={formValues.lastName}
							/>
							{#if errors?.lastName}
								<p class="font-body text-sm text-red-500">{errors.lastName}</p>
							{/if}
						</div>
					</div>
					<div id="email-field" class="flex flex-col gap-2">
						<label for="email" class="font-body text-dark-brown text-lg font-bold">email</label>
						<input
							type="email"
							id="email"
							name="email"
							class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 text-lg focus:ring-2 focus:outline-none"
							placeholder="john.doe@example.com"
							bind:value={formValues.email}
						/>
						{#if errors?.email}
							<p class="font-body text-sm text-red-500">{errors.email}</p>
						{/if}
					</div>
					<div id="subject-field" class="flex flex-col gap-2">
						<label for="subject" class="font-body text-dark-brown text-lg font-bold">subject</label>
						<input
							type="text"
							id="subject"
							name="subject"
							class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 text-lg focus:ring-2 focus:outline-none"
							placeholder="type your subject here..."
							bind:value={formValues.subject}
						/>
						{#if errors?.subject}
							<p class="font-body text-sm text-red-500">{errors.subject}</p>
						{/if}
					</div>
					<div id="message-field" class="flex flex-col gap-2">
						<label for="message" class="font-body text-dark-brown text-lg font-bold">message</label>
						<textarea
							id="message"
							name="message"
							class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 text-lg focus:ring-2 focus:outline-none"
							rows={10}
							placeholder="type your message here..."
							bind:value={formValues.message}
						></textarea>
						{#if errors?.message}
							<p class="font-body text-sm text-red-500">{errors.message}</p>
						{/if}
					</div>
					<div id="is-human-field" class="flex flex-col gap-2">
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2">
								<input
									type="checkbox"
									id="isHuman"
									name="isHuman"
									class="font-body text-dark-brown border-dark-brown focus:ring-dark-brown rounded-sm border-[1px] p-2 focus:ring-2 focus:outline-none"
									bind:checked={formValues.isHuman}
								/>
								<label for="isHuman" class="font-body text-dark-brown text-lg font-bold"
									>I am a human.</label
								>
							</div>
						</div>
						{#if errors?.isHuman}
							<p class="font-body text-sm text-red-500">{errors.isHuman}</p>
						{/if}
					</div>
					<button
						type="submit"
						disabled={isLoading}
						class="font-body text-beige bg-dark-brown hover:bg-dark-brown/70 cursor-pointer rounded-md border-2 p-2 text-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
						>{#if isLoading}
							<LoadingSpinner size="20px" color="#F5F5DC" />
							<span class="ml-2">Sending...</span>
						{:else}
							send
						{/if}</button
					>
					{#if form?.error}
						<p class="font-body text-sm text-red-500">{form.error}</p>
					{/if}
					{#if showSuccessMessage}
						<p class="font-body text-sm text-green-500">Message sent successfully!</p>
					{/if}
				</div>
			</form>
		</div>
	</section>
</div>
