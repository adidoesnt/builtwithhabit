import { env } from '$env/dynamic/private';
import { createDirectus, rest } from '@directus/sdk';
export type { Post } from './types';

const { DIRECTUS_BASE_URL = 'http://localhost:8055' } = env;

export type Fetch = {
	(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
	(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
};

export const getClient = (fetch: Fetch) =>
	createDirectus(DIRECTUS_BASE_URL, {
		globals: {
			fetch
		}
	}).with(rest());
