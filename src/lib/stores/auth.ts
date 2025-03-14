import type { Role, UserFindAttributes } from '$lib/server/db/schema';
import { writable } from 'svelte/store';

export type User = UserFindAttributes & {
	createdAt: Date;
	roles: Role[];
};

export const user = writable<User | null>(null);

export const setUser = (u: User) => {
	user.set(u);
};

export const clearUser = () => {
	user.set(null);
};
