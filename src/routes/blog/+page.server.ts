import { getClient } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import type { Post } from '$lib/server/directus';
import { DIRECTUS_BASE_URL } from '$env/static/private';

const getThumbnailUrl = (uuid: string) => {
	return `${DIRECTUS_BASE_URL}/assets/${uuid}`;
};

export const load = async ({ fetch }) => {
	try {
		const client = getClient(fetch);

		console.log('Fetching posts from Directus');
		const posts = (await client.request(
			readItems('posts', {
				fields: [
					'slug',
					'title',
					'date_created',
					'description',
					'keywords',
					'thumbnail',
					{
						author: ['name']
					}
				],
				sort: '-date_created',
				filter: {
					status: 'published'
				}
			})
		)) as Post[];
		const postsWithThumbnails = posts.map((post) => ({
			...post,
			thumbnail: post.thumbnail ? getThumbnailUrl(post.thumbnail) : null
		}));

		console.log(`Fetched ${posts.length} posts from Directus`, posts);

		const allKeywords = posts.flatMap((post) => post.keywords ?? []);
		const uniqueKeywords = Array.from(new Set(allKeywords));
		console.log(`Found ${uniqueKeywords.length} unique keywords`, uniqueKeywords);

		return { posts: postsWithThumbnails, keywords: uniqueKeywords };
	} catch (error) {
		console.error('Error fetching posts from Directus:', error);
		return { posts: [], keywords: [] };
	}
};
