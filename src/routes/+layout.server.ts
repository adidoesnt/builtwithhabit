import { supabase } from '$lib/server/auth';
import { getUserById } from '$lib/server/db/user';

enum Router {
	Training = 'training',
	Blog = 'blog',
	Root = ''
}

const getParentRouter = (pathname: string) => {
	const parentRoute = pathname.split('/')[1];

	switch (parentRoute) {
		case Router.Training:
			return Router.Training;
		case Router.Blog:
			return Router.Blog;
		default:
			return Router.Root;
	}
};

export const load = async ({ cookies, url }) => {
	const accessToken = cookies.get('access_token');
	const pathname = url.pathname;
	const parentRouter = getParentRouter(pathname);

	if (parentRouter === Router.Training && accessToken) {
		const { data, error } = await supabase.auth.getUser(accessToken);

		if (error) {
			console.error('Error getting user', error);
		}

		if (data.user) {
			const user = await getUserById(data.user.id);
			return { user };
		}
	}

	return { user: null };
};
