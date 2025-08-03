import { supabase } from '$lib/server/auth';
import { getUserById } from '$lib/server/db/user';
import { getPresignedUrlForUpload, listFilesInDir } from '$lib/server/s3/index.js';
import { UserDir } from '$lib/types.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	const accessToken = cookies.get('access_token');

	if (!accessToken) {
		console.log('No access token');
		throw redirect(303, '/login');
	}

	const authUser = await supabase.auth.getUser(accessToken);

	if (!authUser.data.user) {
		console.log('User not found', authUser.data.user);
		throw redirect(303, '/login');
	}

	const user = await getUserById(authUser.data.user.id);

	if (!user) {
		console.log('User not found', authUser.data.user.id);
		throw redirect(303, '/login');
	}

	const profilePictureDirFiles = await listFilesInDir(user.id, UserDir.PROFILE_PICTURE);
	const profilePictureFile = profilePictureDirFiles[0];

	const { url: profilePictureViewUrl, deleteUrl: profilePictureDeleteUrl } =
		profilePictureFile ?? {};

	let hasProfilePicture = false;

	if (profilePictureViewUrl) {
		const profilePictureGetResponse = await fetch(profilePictureViewUrl);
		hasProfilePicture = profilePictureGetResponse.ok;
	}

	const profilePictureUploadUrl = await getPresignedUrlForUpload(
		user.id,
		UserDir.PROFILE_PICTURE,
		profilePictureFile?.name
	);

	return {
		user,
		profilePictureViewUrl,
		profilePictureDeleteUrl,
		profilePictureUploadUrl,
		hasProfilePicture
	};
};
