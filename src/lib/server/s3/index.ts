import {
	S3Client,
	GetObjectCommand,
	PutObjectCommand,
	ListObjectsV2Command,
	DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { env } from '$env/dynamic/private';

const { S3_BUCKET_NAME, AWS_REGION, S3_USER_FILES_PREFIX } = env;

const s3Client = new S3Client({
	region: AWS_REGION
});

export enum UserDir {
	PROFILE_PICTURE = 'profile-picture',
	TRAINER_NOTES = 'trainer-notes',
	MEDIA = 'media'
}

export const getUserFilesPrefix = (userId: string, dir?: UserDir) => {
	return dir ? `${S3_USER_FILES_PREFIX}/${userId}/${dir}` : `${S3_USER_FILES_PREFIX}/${userId}`;
};

export const getPresignedUrlForViewOrDownload = async (
	userId: string,
	dir: UserDir,
	fileName: string
) => {
	const prefix = getUserFilesPrefix(userId, dir);
	const command = new GetObjectCommand({ Bucket: S3_BUCKET_NAME, Key: `${prefix}/${fileName}` });
	const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 });
	return url;
};

export const getPresignedUrlForDelete = async (userId: string, dir: UserDir, fileName: string) => {
	const prefix = getUserFilesPrefix(userId, dir);
	const command = new DeleteObjectCommand({ Bucket: S3_BUCKET_NAME, Key: `${prefix}/${fileName}` });
	const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 });
	return url;
};

export const getPresignedUrlForUpload = async (userId: string, dir: UserDir, fileName: string) => {
	const prefix = getUserFilesPrefix(userId, dir);
	const command = new PutObjectCommand({ Bucket: S3_BUCKET_NAME, Key: `${prefix}/${fileName}` });
	const url = await getSignedUrl(s3Client, command, { expiresIn: 60 * 60 * 24 });
	return url;
};

export const listFilesInDir = async (userId: string, dir?: UserDir) => {
	console.log('[S3] Listing files in dir', userId, dir);

	const prefix = getUserFilesPrefix(userId, dir);
	console.log('[S3] Prefix', prefix);

	const command = new ListObjectsV2Command({ Bucket: S3_BUCKET_NAME, Prefix: prefix });

	const response = await s3Client.send(command);
	console.log('[S3] Response', response);

	if (!dir) {
		return [
			{
				name: UserDir.MEDIA,
				url: `${prefix}/${UserDir.MEDIA}/`,
				deleteUrl: null
			},
			{
				name: UserDir.TRAINER_NOTES,
				url: `${prefix}/${UserDir.TRAINER_NOTES}/`,
				deleteUrl: null
			}
		];
	}

	const files = await Promise.all(
		response.Contents?.filter((file) => {
			if (!file.Key) return false;
			return file.Key !== prefix && file.Key !== `${prefix}/`;
		}).map(async (file) => {
			const fileName = file.Key?.split('/').pop() || '';
			const isDir = file.Key?.endsWith('/');

			let url = file.Key ?? null;
			let deleteUrl = null;
			if (!isDir && file.Key) {
				const command = new GetObjectCommand({
					Bucket: S3_BUCKET_NAME,
					Key: file.Key
				});
				url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
				const deleteCommand = new DeleteObjectCommand({
					Bucket: S3_BUCKET_NAME,
					Key: file.Key
				});
				deleteUrl = await getSignedUrl(s3Client, deleteCommand, { expiresIn: 3600 });
			}

			return {
				name: fileName,
				url,
				deleteUrl
			};
		}) || []
	);

	return files;
};
