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
		<form class="flex w-full flex-col justify-start gap-2 font-body" action="/login" method="POST">
			<h1 class="text-2xl">Login</h1>
			<p class="text-sm text-light-brown">
				Enter your email and password to login.
			</p>
			<div class="flex flex-col gap-2">
				<label for="email">Email</label>
				<input
					class="rounded-sm border-[1px] p-2 border-none"
					type="email"
					name="email"
					placeholder="Email"
				/>
			</div>
			<div class="flex flex-col gap-2 mb-4">
				<label for="password">Password</label>
				<input
					class="rounded-sm p-2 border-none"
					type="password"
					name="password"
					placeholder="Password"
				/>
			</div>
            <div class="flex gap-4 justify-between">
                <div class="flex flex-col gap-2">
                    <div class="flex items-center gap-2">
                        <label class="text-sm text-light-brown" for="remember">Remember me</label>
                        <input class="rounded-sm border-[1px] p-2 border-light-brown" type="checkbox" name="remember" id="remember" />
                    </div>
                    <p class="text-sm text-light-brown">Don't have an account? <a href="/signup" class="text-sm text-light-brown hover:text-dark-brown transition-all duration-300">Sign up!</a></p>
                    <a href="/forgot-password" class="text-sm text-light-brown hover:text-dark-brown transition-all duration-300">Forgot password?</a>
                </div>
                <button class="flex self-end bg-dark-brown h-fit hover:scale-110 transition-all duration-300 hover:opacity-80 text-beige rounded-sm px-8 py-2 font-body" type="submit">Login</button>
            </div>
		</form>
	</div>
</div>
