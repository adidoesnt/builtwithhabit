import { supabase } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { upsertTrainerAvailability } from '$lib/server/db/trainer';

export const PUT = async ({ request, params, cookies }) => {
    try {
        const accessToken = cookies.get('access_token');
        if (!accessToken) {
            throw redirect(302, '/login');
        }

        const authUser = await supabase.auth.getUser(accessToken);
        if (!authUser.data.user) {
            throw redirect(302, '/login');
        }

        const { id } = params;
        const isSelf = id === authUser.data.user.id;
        if (!isSelf) {
            throw redirect(302, '/');
        }

        const availabilities = await request.json();

        await upsertTrainerAvailability(availabilities);

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ success: false }), { status: 500 });
    }
};
