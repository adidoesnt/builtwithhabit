<script lang="ts">
	import AuthFormHeader from '$lib/components/AuthFormHeader.svelte';
</script>

<div class="flex h-screen w-screen flex-col items-center justify-start md:justify-center">
	<div
		id="container"
		class="bg-beige flex min-w-[300px] flex-col overflow-y-auto md:overflow-y-visible items-center justify-start md:justify-center gap-2 rounded-sm p-8"
	>
		<AuthFormHeader />
		<form class="font-body flex w-full flex-col justify-start gap-2 overflow-visible" action="/signup" method="POST">
			<h1 class="text-2xl">Sign up</h1>
			<p class="text-light-brown text-sm">Enter your details below to create an account.</p>
			<br />
			<div class="flex flex-col overflow-y-auto gap-4">
				<div class="flex flex-wrap gap-4">
					<div class="flex flex-col gap-2">
						<label for="firstName">First Name</label>
						<input
							class="rounded-sm border-[1px] border-none p-2 md:max-w-[200px]"
							type="text"
							name="firstName"
							placeholder="John"
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label for="middleName"
							>Middle Name <span class="text-light-brown text-sm">(Optional)</span></label
						>
						<input
							class="rounded-sm border-[1px] border-none p-2 max-w-[200px]"
							type="text"
							name="middleName"
							placeholder=""
						/>
					</div>
					<div class="flex flex-col gap-2">
						<label for="lastName">Last Name</label>
						<input
							class="rounded-sm border-[1px] border-none p-2 max-w-[200px]"
							type="text"
							name="lastName"
							placeholder="Doe"
						/>
					</div>
				</div>
				<div class="flex flex-col gap-2">
					<label for="email">Email</label>
					<input
						class="rounded-sm border-[1px] border-none p-2 max-w-[300px]"
						type="email"
						name="email"
						placeholder="Email"
					/>
				</div>
				<div class="mb-4 flex flex-col gap-2">
					<label for="password">Password</label>
					<input
						class="rounded-sm border-none p-2 max-w-[300px]"
						type="password"
						name="password"
						placeholder="Password"
					/>
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
					class="bg-dark-brown text-beige font-body h-fit rounded-sm px-8 py-2 transition-all duration-300 hover:scale-110 hover:opacity-80"
					type="submit">Sign up</button
				>
			</div>
		</form>
	</div>
</div>
