import { getClient } from '$lib/server/directus';
import { readItem } from '@directus/sdk';
import type { Post } from '$lib/server/directus';
import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params }) => {
	const { slug } = params;
	if (!slug) throw error(400, 'Slug is required');

	const client = getClient(fetch);

	console.log(`Fetching post from Directus with slug ${slug}`);
	const post = (await client.request(
		readItem('posts', slug, {
			fields: [
				'slug',
				'title',
				'date_created',
				'description',
				'content',
				{
					author: ['name']
				}
			]
		})
	)) as Post;

	console.log(`Fetched post from Directus with slug ${slug}`, post.title);

	return { post };
};
