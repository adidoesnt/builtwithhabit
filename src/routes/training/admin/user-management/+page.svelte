<script lang="ts">
	import type { PageServerData } from './$types';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import UserTable from './components/UserTable.svelte';

	let { data }: { data: PageServerData } = $props();
	let users = $derived(data.users ?? []);
</script>

<div class="bg-beige min-h-[100dvh] p-4 md:p-8 w-full">
	<div class="mx-auto max-w-6xl">
		<div class="mt-8 mb-6">
			<h1 class="font-body text-dark-brown text-2xl font-bold md:text-3xl">User Management</h1>
			<p class="font-body text-light-brown mt-1">View and manage user accounts</p>
		</div>

		<UserTable {users} total={data.total} />
	</div>
</div>
