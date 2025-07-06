import { getClient } from "$lib/server/directus";
import { readItems } from "@directus/sdk";
import type { Post } from "$lib/server/directus";

export const load = async ({ fetch }) => {
	try {
        const client = getClient(fetch);

        console.log('Fetching posts from Directus');
        const posts = await client.request(readItems('posts', {
            fields: ['slug', 'title', 'date_updated', 'description', {
                author: ['name']
            }],
            sort: '-date_updated',
            filter: {
                status: 'published'
            },
        })) as Post[];

        console.log(`Fetched ${posts.length} posts from Directus`, posts);
        
        return { posts };
	} catch (error) {
		console.error('Error fetching posts from Directus:', error);
		return { posts: [] };
	}
};
