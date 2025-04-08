<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import config from '$lib/config';

	const {
		packages: { learnMore }
	} = config;
</script>

<div class="bg-light-green grid h-full min-h-[100dvh] w-full place-items-center">
	<div class="container mx-auto flex h-full flex-col justify-start gap-4 overflow-x-auto p-4">
		<LogoHeader linkToHome altColors />

		<div class="flex flex-col gap-4 p-4">
			<h1 class="font-headings text-olive text-4xl font-bold">Packages</h1>
			<p class="font-body text-olive text-md md:text-lg">
				{learnMore.introduction}
			</p>
			<p class="font-body text-olive text-md md:text-lg">
				{learnMore.tableDescription}
			</p>

			<div class="overflow-hidden rounded-lg bg-white shadow-md hidden md:block">
				<div class="overflow-x-auto">
					<table class="w-full min-w-[800px] border-collapse">
						<thead class="bg-gray-50">
							<tr>
								<th class="font-body text-dark-brown border-b p-4 text-left">Package</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Sessions</th>
								<th class="font-body text-dark-brown border-b p-4 text-left">Description</th>
							</tr>
						</thead>
						<tbody>
							{#each learnMore.packages as packageItem, i}
								<tr class={`${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
									<td
										class="font-body text-dark-brown overflow-y-auto border-b p-4"
										>{packageItem.name}</td
									>
									<td
										class="font-body text-dark-brown overflow-y-auto border-b p-4"
										>{packageItem.sessions}</td
									>
									<td
										class="font-body text-dark-brown overflow-y-auto border-b p-4"
										>{packageItem.description}</td
									>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
