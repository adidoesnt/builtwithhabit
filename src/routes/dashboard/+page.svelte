<script lang="ts">
	import { user } from '$lib/stores/auth';
	import config from '$lib/config';
	import DashboardIcon from '$lib/components/DashboardIcon.svelte';
	import LogoHeader from '$lib/components/LogoHeader.svelte';

	const { dashboard } = config;
</script>

<div class="bg-beige min-h-screen p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 md:text-start text-center">
			<h1 class="font-body text-dark-brown text-3xl font-bold">
				{dashboard.greeting}, {$user?.firstName || 'there'}!
			</h1>
			<p class="font-body text-light-brown mt-2">What would you like to do today?</p>
		</div>

		<div class="grid grid-cols-2 gap-6 md:gap-y-6 gap-y-10 md:grid-cols-4">
			{#each dashboard.icons as icon}
				<DashboardIcon
					name={icon.name}
					icon={icon.icon}
					description={icon.description}
					href={icon.href}
					color={icon.color}
				/>
			{/each}
		</div>

		<!-- TODO: Upcoming bookings section -->
		<div class="mt-12 rounded-lg bg-white p-6 shadow-md">
			<h2 class="font-body text-dark-brown mb-4 text-xl font-semibold">Upcoming Bookings</h2>
			<p class="font-body text-light-brown">You have no upcoming bookings.</p>
		</div>

		<!-- TODO: Recent activity section -->
		<div class="mt-12 rounded-lg bg-white p-6 shadow-md">
			<h2 class="font-body text-dark-brown mb-4 text-xl font-semibold">Recent Activity</h2>
			<p class="font-body text-light-brown">You have no recent activity.</p>
		</div>
	</div>
</div>
