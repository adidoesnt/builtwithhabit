<script lang="ts">
	import config from '$lib/config';
	import { disclaimerChecked } from './formState';

	const { disclaimer } = config.packages;

	let disclaimerOpen = $state(false);

	const toggleDisclaimer = () => {
		disclaimerOpen = !disclaimerOpen;
	};
</script>

{#if disclaimerOpen}
	<div
		class="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center shadow-2xl backdrop-blur-xl"
	>
		<div class="mx-4 w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="font-body text-dark-brown text-xl font-bold">Disclaimer</h2>
				<button
					onclick={toggleDisclaimer}
					class="hover:text-dark-brown text-gray-500 transition-colors"
					aria-label="Close disclaimer"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			</div>

			<div class="font-body text-dark-brown mb-6 max-h-[60dvh] overflow-y-auto whitespace-pre-line">
				{disclaimer.content.join('\n\n')}
			</div>
		</div>
	</div>
{/if}

<div class="rounded-md border border-gray-100 bg-gray-50 p-4">
	<h3 class="font-body text-dark-brown mb-3 text-lg font-semibold">Disclaimer</h3>
	<div class="flex items-center gap-2">
		<input
			type="checkbox"
			id="disclaimer"
			class="focus:ring-dark-brown h-5 w-5 rounded border border-gray-300 focus:ring-2 focus:outline-none"
			bind:checked={$disclaimerChecked}
		/>
		<div>
			<p class="font-body text-sm text-gray-500">
				{disclaimer.message}
				<button
					type="button"
					onclick={toggleDisclaimer}
					class="text-dark-brown font-semibold hover:underline"
				>
					{disclaimer.buttonText}
				</button>
			</p>
			{#if !$disclaimerChecked}
				<p class="font-body mt-1 text-xs text-red-500">
					{disclaimer.warning}
				</p>
			{/if}
		</div>
	</div>
</div>
