import { supabase } from '$lib/server/auth';
import { getAddressAndValidityFromPostalCode } from '$lib/server/db/locations.js';
import { getUserById } from '$lib/server/db/user.js';
import { json } from '@sveltejs/kit';

export const GET = async ({ params, cookies }) => {
	const accessToken = cookies.get('access_token');
	if (!accessToken) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const authUser = await supabase.auth.getUser(accessToken);
	if (!authUser.data.user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const user = await getUserById(authUser.data.user.id);
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const { postalCode } = params;

	if (!postalCode || postalCode.length !== 6) {
		return json({ error: 'Invalid postal code' }, { status: 400 });
	}

	const { isValid, address } = await getAddressAndValidityFromPostalCode(postalCode);

	if (!isValid) {
		return json({ error: 'Invalid postal code' }, { status: 400 });
	}

	return json({ isValid, address }, { status: 200 });
};
