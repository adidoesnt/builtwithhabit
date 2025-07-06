<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	import config from '$lib/config';
	import type { PageData } from './$types';

	const { site, blog } = config;
	const { logo } = site;
	const { viewPostsButtonText, description, postsHeading, noPosts } = blog;

	const { data }: { data: PageData } = $props();
	const { posts } = data;

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

	function scrollToPosts() {
		const el = document.getElementById('posts');
		if (el) el.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<section class="flex min-h-[100dvh] w-full flex-col md:flex-row">
	<aside
		class="relative flex min-h-[100dvh] w-full flex-col items-center justify-center bg-[url(/hut-with-mountains-3.jpg)] bg-cover bg-center px-6 py-12 md:min-h-fit md:w-1/2 md:px-0"
	>
		<div class="absolute inset-0 backdrop-blur-sm"></div>
		<div class="relative z-10 flex w-full max-w-lg flex-col items-center gap-8">
			<div class="bg-beige flex w-full flex-col items-center rounded-xl p-12 shadow-lg">
				<div class="mb-6 flex w-full flex-col items-center justify-center gap-6 md:flex-row">
					<a href="/">
						<img
							src={logo}
							alt="logo"
							class="mx-auto h-24 object-contain mix-blend-multiply md:mx-0 md:h-32"
							style="max-width: 80%; width: auto;"
						/>
					</a>
					<h1 class="font-headings text-3xl font-bold md:text-5xl">Blog</h1>
				</div>
				<p class="font-body text-dark-brown text-center text-lg font-light md:text-xl">
					{description}
				</p>
			</div>
			<button
				class="font-body bg-dark-brown text-beige relative z-10 mt-4 block rounded-sm p-2 px-4 transition-all duration-300 hover:scale-110 hover:opacity-80 md:hidden"
				onclick={scrollToPosts}
			>
				{viewPostsButtonText}
			</button>
		</div>
	</aside>

	<!-- Right Main Content -->
	<main
		id="posts"
		class="bg-beige flex h-fit min-h-[100dvh] w-full flex-col overflow-y-auto px-6 py-12 md:h-[100dvh] md:w-1/2 md:px-24"
	>
		<div class="mx-auto w-full max-w-2xl">
			<h2
				class="font-headings text-dark-brown mb-10 text-center text-3xl font-bold md:text-left md:text-5xl"
			>
				{postsHeading}
			</h2>
			{#if posts && posts.length > 0}
				<div class="flex flex-col gap-10">
					{#each posts as post}
						<a href={`/blog/${post.slug}`}>
							<article
								class="rounded-xl bg-white p-10 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
							>
								<h3 class="font-body text-dark-brown mb-2 text-xl font-semibold md:text-2xl">
									{post.title}
								</h3>
								{#if post.description}
									<p class="font-body text-dark-brown mb-4 text-lg font-light">
										{post.description}
									</p>
								{/if}
								<div class="text-light-brown mt-2 flex items-center justify-between text-xs">
									<span>By {post.author.name}</span>
									<span>{formatDate(post.date_updated)}</span>
								</div>
							</article>
						</a>
					{/each}
				</div>
			{:else}
				<div class="border-light-green rounded-sm border bg-white p-8 text-center">
					<h3 class="font-headings text-dark-brown mb-4 text-2xl font-semibold">
						{noPosts.heading}
					</h3>
					<p class="font-body text-dark-brown mb-6 text-lg">
						{noPosts.description}
					</p>
					<a
						href="/"
						class="font-body bg-dark-brown text-beige inline-block rounded-sm p-3 px-6 transition-all duration-300 hover:scale-110 hover:opacity-80"
					>
						{noPosts.buttonText}
					</a>
				</div>
			{/if}
		</div>
	</main>
</section>
