<script lang="ts">
	import config from '$lib/config';
	import type { PageData } from './$types';

	const { site, blog } = config;
	const { logo } = site;
	const { viewPostsButtonText, description, postsHeading, noPosts } = blog;

	const { data }: { data: PageData } = $props();
	const { posts, keywords } = data;

	let keywordsFilter = $state<string[]>([]);
	let searchFilter = $state<string>('');

	const toggleKeywordFilter = (keyword: string) => {
		if (keywordsFilter.includes(keyword)) {
			keywordsFilter = keywordsFilter.filter((k) => k !== keyword);
		} else {
			keywordsFilter = [...keywordsFilter, keyword];
		}
	};

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

	let filteredPosts = $derived(
		posts.filter((post) => {
			return (
				keywordsFilter.every((keyword) => post.keywords?.includes(keyword)) &&
				(post.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
					post.description?.toLowerCase().includes(searchFilter.toLowerCase()))
			);
		})
	);
</script>

<section class="flex min-h-[100dvh] w-full flex-col">
	<div
		id="blog-page-main-container"
		class="bg-beige flex min-h-[calc(100dvh-12rem)] w-full flex-col gap-8 p-8"
	>
		<div
			class="font-headings text-dark-brown flex w-full flex-col items-center justify-center gap-4 text-center lowercase"
			id="blog-page-header"
		>
			<h1 class="text-4xl font-bold md:text-5xl lg:text-6xl">{postsHeading}</h1>
			<p class="font-body max-w-2xl text-lg text-gray-600 md:text-xl">{description}</p>
		</div>

		<div id="blog-page-posts" class="flex flex-col gap-6">
			<div
				id="blog-page-posts-toolbar"
				class="flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-sm"
			>
				<div id="blog-page-posts-toolbar-search" class="flex flex-col gap-2 lowercase">
					<label
						for="blog-page-posts-toolbar-search-input"
						class="font-body text-dark-brown text-lg font-semibold"
					>
						Search Posts
					</label>
					<input
						type="text"
						placeholder="Search by title, description, or keywords..."
						class="font-body focus:border-dark-brown focus:ring-dark-brown focus:ring-opacity-20 w-full rounded-lg border border-gray-300 p-3 text-base transition-all focus:ring-2 focus:outline-none"
						name="search"
						bind:value={searchFilter}
					/>
				</div>

				<div id="blog-page-posts-toolbar-filter" class="flex flex-col gap-3 lowercase">
					<p class="font-body text-dark-brown text-lg font-semibold">Filter by Category</p>
					<div class="flex flex-wrap gap-2">
						{#each keywords as keyword}
							<button
								class="font-body cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 {keywordsFilter.includes(
									keyword
								)
									? 'bg-dark-brown text-white shadow-md'
									: 'text-dark-brown hover:border-dark-brown border border-gray-300 bg-white hover:bg-gray-50'}"
								onclick={toggleKeywordFilter.bind(null, keyword)}
							>
								{keyword}
							</button>
						{/each}
					</div>
				</div>
			</div>

			<div id="blog-posts-grid" class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredPosts as post}
					<a href={`/blog/${post.slug}`}>
						<article
							class="group flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
						>
							<div class="relative h-48 overflow-hidden">
								{#if post.thumbnail}
									<img
										src={post.thumbnail}
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
									/>
								{:else}
									<div class="flex h-full w-full items-center justify-center bg-gray-200">
										<span class="font-body text-gray-500">No Image</span>
									</div>
								{/if}
							</div>

							<div class="flex flex-1 flex-col gap-3 p-6">
								<h2
									class="font-body text-dark-brown group-hover:text-dark-brown [display:-webkit-box] overflow-hidden text-xl font-bold [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
								>
									{post.title}
								</h2>

								<p
									class="font-body [display:-webkit-box] flex-1 overflow-hidden text-sm text-gray-600 [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
								>
									{post.description}
								</p>

								<div class="flex items-center justify-between border-t border-gray-100 pt-3">
									<div class="flex items-center gap-2">
										<span class="font-body text-xs text-gray-500">
											{post.author.name}
										</span>
									</div>
									<time class="font-body text-xs text-gray-500">
										{formatDate(post.display_date)}
									</time>
								</div>

								{#if post.keywords && post.keywords.length > 0}
									<div class="flex flex-wrap gap-1 pt-2">
										{#each post.keywords as keyword}
											<span
												class="font-body rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
											>
												{keyword}
											</span>
										{/each}
									</div>
								{/if}
							</div>
						</article>
					</a>
				{/each}
			</div>

			{#if filteredPosts.length === 0}
				<div class="flex flex-col items-center justify-center gap-8 py-12 text-center lowercase">
					<div class="flex flex-col items-center justify-center">
						<h3 class="font-body text-dark-brown mb-2 text-xl font-semibold">
							{noPosts.heading}
						</h3>
						<p class="font-body text-dark-brown">{noPosts.description}</p>
					</div>
					<a href="/" class="font-body bg-dark-brown text-beige rounded-md px-4 py-2">
						{noPosts.buttonText}
					</a>
				</div>
			{/if}
		</div>
	</div>
</section>
