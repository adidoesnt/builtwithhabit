import type { UserFindAttributes as User } from '$lib/server/db/schema';
import { writable } from 'svelte/store';

export const user = writable<User | null>(null);

export const setUser = (u: User) => {
	user.set(u);
};

export const clearUser = () => {
	user.set(null);
};
