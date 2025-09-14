<script lang="ts">
	import type { Post } from '$lib/server/directus';
	import { Search as SearchIcon } from '$lib/icons';

	let searchTerm = $state('');
	let debounceTimeout = $state<NodeJS.Timeout | null>(null);
	let debouncedSearchTerm = $state('');

	let searchResults = $derived<Promise<Post[]>>(
		(async () => {
			if (debouncedSearchTerm.length < 3) {
				return [] as Post[];
			}

			try {
				const requestUrl = `/search?searchTerm=${debouncedSearchTerm}`;
				const response = await fetch(requestUrl);

				if (!response.ok) {
					throw new Error(`Failed to fetch search results: ${response.statusText}`);
				}

				const data = await response.json();
				return data.posts as Post[];
			} catch (error) {
				console.error(error);
				return [] as Post[];
			}
		})()
	);

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString);
			return date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			});
		} catch {
			return dateString;
		}
	};
</script>

<div id="search-container" class="hidden w-full items-center justify-start gap-2 md:flex">
	<input
		type="text"
		placeholder="search"
		class="border-light-brown/25 focus:ring-light-brown/50 font-body placeholder:text-dark-brown/75 text-dark-brown/75 w-1/2 rounded-sm border-[1px] bg-white focus:ring-1"
		bind:value={
			() => searchTerm,
			(v) => {
				if (debounceTimeout) {
					clearTimeout(debounceTimeout);
				}

				debounceTimeout = setTimeout(() => {
					debouncedSearchTerm = v;
				}, 500);
				searchTerm = v;
			}
		}
	/>
	<button
		class="hover:bg-light-brown/10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm p-1 text-2xl transition-all duration-300"
		aria-label="search"
	>
		<SearchIcon width={24} height={24} color="#262626" />
	</button>
</div>

{#if debouncedSearchTerm.length > 2}
	<div
		id="search-results"
		class="absolute top-16 left-0 z-50 m-4 max-h-[75dvh] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg lowercase"
	>
		{#await searchResults}
			<div class="p-6">
				<div class="flex items-center justify-center">
					<div class="border-dark-brown h-8 w-8 animate-spin rounded-full border-b-2"></div>
					<span class="font-body text-dark-brown ml-3">Searching...</span>
				</div>
			</div>
		{:then results}
			<div class="p-4">
				<!-- Blog Results Section -->
				<div class="mb-6">
					<h3 class="font-headings text-dark-brown mb-4 text-lg font-semibold">Blog Posts</h3>
					{#if results.length > 0}
						<div class="grid grid-cols-1 gap-4">
							{#each results as result}
								<a
									href={`/blog/${result.slug}`}
									class="block"
									onclick={() => {
										searchTerm = '';
										debouncedSearchTerm = '';
									}}
								>
									<article
										class="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:w-96"
									>
										<div class="relative h-48 overflow-hidden">
											{#if result.thumbnail}
												<img
													src={result.thumbnail}
													alt={result.title}
													class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
												/>
											{:else}
												<div class="flex h-full w-full items-center justify-center bg-gray-200">
													<span class="font-body text-gray-500">No Image</span>
												</div>
											{/if}
										</div>
										<div class="flex flex-1 flex-col gap-3 p-6">
											<h4
												class="font-body text-dark-brown group-hover:text-dark-brown [display:-webkit-box] overflow-hidden text-xl font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
											>
												{result.title}
											</h4>
											{#if result.description}
												<p
													class="font-body [display:-webkit-box] flex-1 overflow-hidden text-sm text-gray-600 [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
												>
													{result.description}
												</p>
											{/if}
											<div class="flex items-center justify-between border-t border-gray-100 pt-3">
												<div class="flex items-center gap-2">
													<span class="font-body text-xs text-gray-500">
														{result.author.name}
													</span>
												</div>
												<time class="font-body text-xs text-gray-500">
													{formatDate(result.display_date)}
												</time>
											</div>
										</div>
									</article>
								</a>
							{/each}
						</div>
					{:else}
						<div class="py-6 text-center">
							<p class="font-body text-gray-500">No blog posts found</p>
						</div>
					{/if}
				</div>

				<!-- Shop Results Section -->
				<div class="border-t border-gray-200 pt-6">
					<h3 class="font-headings text-dark-brown mb-4 text-lg font-semibold">Shop</h3>
					<div class="text-center">
						<div class="rounded-lg bg-gray-50 p-6">
							<h4 class="font-body text-dark-brown mb-2 font-semibold">Coming Soon</h4>
							<p class="font-body text-sm text-gray-600">
								Our activewear collection is launching soon!
							</p>
						</div>
					</div>
				</div>
			</div>
		{:catch error}
			<div class="p-6">
				<div class="text-center">
					<p class="font-body text-red-600">Error: {error.message}</p>
				</div>
			</div>
		{/await}
	</div>
{/if}
