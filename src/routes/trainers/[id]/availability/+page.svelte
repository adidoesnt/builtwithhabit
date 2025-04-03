<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { user, Role } from '$lib/stores/auth';
	import type { PageServerData } from './$types';
	import Overrides from './components/overrides/Overrides.svelte';
	import Schedule from './components/Schedule.svelte';

	const { data }: { data: PageServerData } = $props();
	const { availability, overrides } = data;
</script>

{#if $user?.roles.includes(Role.TRAINER)}
	<div class="bg-beige font-body min-h-[100dvh] p-8">
		<div class="mx-auto max-w-4xl">
			<LogoHeader />

			<div class="mt-8 mb-12 text-center md:text-start">
				<h1 class="font-body text-dark-brown text-3xl font-bold">Manage Your Availability</h1>
				<p class="font-body text-light-brown mt-2">
					Set your weekly availability to let clients know when you're available for sessions.
				</p>
			</div>

			<div class="flex flex-col gap-12">
				<Schedule {availability} />
				<Overrides {overrides} />
			</div>
		</div>
	</div>
{/if}
