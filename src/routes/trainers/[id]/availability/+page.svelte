<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
import { user, Role } from '$lib/stores/auth';
	import type { PageServerData } from './$types';
	import Overrides from './components/Overrides.svelte';
	import Schedule from './components/Schedule.svelte';

	const { data }: { data: PageServerData } = $props();
	const { availability } = data;
</script>

{#if $user?.roles.includes(Role.TRAINER)}
	<div class="bg-beige font-body min-h-screen p-4 md:p-8">
		<div class="mx-auto max-w-4xl flex flex-col gap-8">
            <LogoHeader />
            
			<div class="flex flex-col">
				<h1 class="font-heading text-dark-brown text-3xl font-bold">Manage Your Availability</h1>
				<p class="font-body text-light-brown mt-2">
					Set your weekly availability to let clients know when you're available for sessions.
				</p>
			</div>

			<Schedule {availability} />
			<Overrides />
		</div>
	</div>
{/if}
