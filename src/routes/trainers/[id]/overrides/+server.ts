import { supabase } from '$lib/server/auth';
import { upsertTrainerOverrides } from '$lib/server/db/trainer';
import { redirect } from '@sveltejs/kit';

export const PUT = async ({ request, params, cookies }) => {
	try {
		const accessToken = cookies.get('access_token');
		if (!accessToken) {
			throw redirect(303, '/login');
		}

		const authUser = await supabase.auth.getUser(accessToken);
		if (!authUser.data.user) {
			throw redirect(303, '/login');
		}

		const { id } = params;
		const isSelf = id === authUser.data.user.id;
		if (!isSelf) {
			throw redirect(303, '/');
		}

		const overrides = await request.json();
		await upsertTrainerOverrides(overrides);

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ success: false }), { status: 500 });
	}
};
