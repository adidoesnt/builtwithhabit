import { supabase } from "$lib/server/auth/index.js";
import { getUserById } from "$lib/server/db/user.js";
import { Role } from "$lib/stores/auth";
import { redirect } from "@sveltejs/kit";

export const load = async ({ cookies }) => {
    const accessToken = cookies.get('access_token');

    if (!accessToken) {
        throw redirect(302, '/login');
    }
    
    const authUser = await supabase.auth.getUser(accessToken);

    if (!authUser.data.user) {
        throw redirect(302, '/login');
    }

    const user = await getUserById(authUser.data.user.id);

    if (!user) {
        throw redirect(302, '/login');
    }

    if (!user.roles.includes(Role.ADMIN)) {
        throw redirect(302, '/');
    }

    return {
        user
    };
};