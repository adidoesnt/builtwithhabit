<script lang="ts">
	import type { PageServerData } from './$types';
	import FileExplorer from '../components/FileExplorer.svelte';
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import { UserDir } from '../../../../../../../lib/types';
	import { goto } from '$app/navigation';

	const { data }: { data: PageServerData } = $props();
	const { files, client, trainerId } = data;

	const goToPreviousDir = () => {
		goto(`/trainers/${trainerId}/clients/${client.id}/files`);
	};
</script>

<div class="bg-beige min-h-[100dvh] p-8">
	<div class="mx-auto max-w-4xl">
		<LogoHeader />

		<div class="mt-8 mb-12 text-center md:text-start">
			<h1 class="font-body text-dark-brown text-2xl font-bold md:text-3xl">
				{client.firstName}
				{client.lastName}'s Files
			</h1>
			<p class="font-body text-light-brown mt-2">View and manage files for {client.firstName}.</p>
		</div>

		<FileExplorer
			{files}
			{trainerId}
			clientId={client.id}
			currentDir={UserDir.MEDIA}
			{goToPreviousDir}
		/>
	</div>
</div>
