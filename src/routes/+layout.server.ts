import { supabase } from '$lib/server/auth';
import { getUserById } from '$lib/server/db/user';

export const load = async ({ cookies }) => {
    const accessToken = cookies.get('access_token');

    if (accessToken) {
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
}