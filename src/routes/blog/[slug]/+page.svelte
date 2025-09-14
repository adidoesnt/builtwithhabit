<script lang="ts">
	import LogoHeader from '$lib/components/LogoHeader.svelte';
	import type { PageData } from './$types';
	import { format } from 'date-fns';

	const { data }: { data: PageData } = $props();
	const { post } = data;

	const formatDate = (date: string) => {
		return format(new Date(date), 'MMM d, yyyy');
	};
</script>

<div class="bg-beige flex min-h-[100dvh] flex-col md:p-8">
	<div class="mx-auto flex max-w-5xl flex-col">
		<div class="bg-white p-8 shadow-md md:mt-8 md:rounded-lg">
			<div class="flex flex-col">
				<h1 class="font-headings text-dark-brown text-3xl font-bold md:text-5xl">
					{post.title}
				</h1>
				{#if post.description}
					<p class="font-body text-dark-brown mb-6 text-lg font-light">{post.description}</p>
				{/if}
			</div>
			<div
				class="text-light-brown mb-6 flex flex-col gap-1 text-sm md:flex-row md:items-center md:justify-between md:text-xs"
			>
				<span>By {post.author.name}</span>
				<span>{formatDate(post.display_date)}</span>
			</div>
			<hr class="border-light-brown my-6 border-t" />
			{#if post.content}
				<div class="prose prose-lg prose-dark-brown font-body text-dark-brown max-w-none">
					{@html post.content}
				</div>
			{/if}

			<!-- Back to top link -->
			<div class="border-light-brown mt-8 flex flex-col gap-2 border-t pt-6">
				<a
					href="#top"
					class="font-body text-dark-brown text-lg underline transition-opacity duration-300 hover:opacity-50"
				>
					back to top
				</a>
				<a href="/blog" class="font-body text-dark-brown text-lg underline transition-opacity duration-300 hover:opacity-50">
					back to all posts
				</a>
			</div>
		</div>
	</div>
</div>
