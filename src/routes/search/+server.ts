import { json } from '@sveltejs/kit';
import { getClient, type Post } from '$lib/server/directus';
import { readItems } from '@directus/sdk';

export const GET = async ({ url, fetch }) => {
	const searchTerm = url.searchParams.get('searchTerm');

	if (!searchTerm) {
		return json({ error: 'No search term provided' }, { status: 400 });
	}
	const client = getClient(fetch);

	const posts = (await client.request(
		readItems('posts', {
			fields: [
				'slug',
				'title',
				'date_updated',
				'description',
				'keywords',
				'thumbnail',
				{
					author: ['name']
				}
			],
			sort: '-date_updated',
			filter: {
				status: 'published',
				title: {
					_contains: searchTerm
				},
				description: {
					_contains: searchTerm
				},
				keywords: {
					_contains: searchTerm
				}
			}
		})
	)) as Post[];

    // TODO: Add shop results when the shop is ready

    return json({ posts });
};
