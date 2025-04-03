import { supabase } from '$lib/server/auth/index.js';
import { getBookingsForTrainer } from '$lib/server/db/bookings';
import { getUserById } from '$lib/server/db/user';

export const GET = async ({ url, cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		return new Response('Unauthorized', { status: 401 });
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		return new Response('Unauthorized', { status: 401 });
	}

	const page = url.searchParams.get('page') || '0';
	const pageSize = url.searchParams.get('pageSize') || '5';

	let numericPage = Number(page);
	let numericPageSize = Number(pageSize);

	if (isNaN(numericPage) || isNaN(numericPageSize)) {
		return new Response('Invalid page or page size', { status: 400 });
	}

	const bookings = await getBookingsForTrainer({
		page: numericPage,
		pageSize: numericPageSize
	});

	return new Response(JSON.stringify(bookings), { status: 200 });
};
