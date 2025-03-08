<script lang="ts">
	import config from '$lib/config';

	const { splitName, caption, logo } = config.site;
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center">
	<div
		id="container"
		class="bg-beige flex min-w-[300px] flex-col items-center justify-center gap-2 rounded-sm p-8"
	>
		<div class="flex items-center gap-4">
			<img src={logo} alt="logo" class="h-auto w-40 mix-blend-multiply" />
			<div class="border-light-brown h-full border-l-2"></div>
			<div class="flex flex-col gap-2">
				<h1 class="font-headings text-4xl font-bold">
					<span class="text-dark-brown">{splitName[0]}</span><span class="text-light-brown"
						>{splitName[1]}</span
					><span class="text-dark-brown">{splitName[2]}.</span>
				</h1>
				<p class="font-body text-light-brown flex self-start text-sm">{caption}</p>
			</div>
		</div>
		<form class="font-body flex w-full flex-col justify-start gap-2" action="/signup" method="POST">
			<h1 class="text-2xl">Sign up</h1>
			<p class="text-light-brown text-sm">Enter your details below to create an account.</p>
            <div class="flex flex-col gap-2">
				<label for="firstName">firstName</label>
				<input
					class="rounded-sm border-[1px] border-none p-2"
					type="text"
					name="firstName"
					placeholder="John"
				/>
			</div>
            <div class="flex flex-col gap-2">
				<label for="lastName">lastName</label>
				<input
					class="rounded-sm border-[1px] border-none p-2"
					type="text"
					name="lastName"
					placeholder="Doe"
				/>
			</div>
			<div class="flex flex-col gap-2">
				<label for="email">Email</label>
				<input
					class="rounded-sm border-[1px] border-none p-2"
					type="email"
					name="email"
					placeholder="Email"
				/>
			</div>
			<div class="mb-4 flex flex-col gap-2">
				<label for="password">Password</label>
				<input
					class="rounded-sm border-none p-2"
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
			<div class="flex justify-between gap-4 items-center">
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
