import { json } from '@sveltejs/kit';
import { getClient, type Post } from '$lib/server/directus';
import { readItems } from '@directus/sdk';
import { DIRECTUS_BASE_URL } from '$env/static/private';

const getThumbnailUrl = (uuid: string) => {
	return `${DIRECTUS_BASE_URL}/assets/${uuid}`;
};

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
				status: 'published',
				_or: [
					{
						title: {
							_contains: searchTerm
						}
					},
					{
						description: {
							_contains: searchTerm
						}
					},
					{
						keywords: {
							_contains: searchTerm
						}
					}
				]
			}
		})
	)) as Post[];
	const postsWithThumbnails = posts.map((post) => ({
		...post,
		thumbnail: post.thumbnail ? getThumbnailUrl(post.thumbnail) : null
	}));


	// TODO: Add shop results when the shop is ready

	return json({ posts: postsWithThumbnails });
};
