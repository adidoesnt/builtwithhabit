import { supabase } from "$lib/server/auth";
import { Role } from "$lib/server/db/schema";
import { getTrainerAvailability, getTrainerOverrides } from "$lib/server/db/trainer";
import { getUserById } from "$lib/server/db/user.js";
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

	const trainer = await getUserById(authUser.data.user.id);

	if (!trainer) {
		throw redirect(302, '/login');
	}

	if (!trainer.roles.includes(Role.TRAINER)) {
		throw redirect(302, '/');
	}

    const availability = await getTrainerAvailability(trainer.id);
    const overrides = await getTrainerOverrides(trainer.id);

    return {
        availability,
		overrides
    }
}