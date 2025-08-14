import type { User } from '$lib/types';
import { getContext, setContext } from 'svelte';

const APP_CONTEXT = Symbol('app-context');

export class AppContext {
	user = $state<User | null>(null);

	constructor(initialUser: User | null = null) {
		this.user = initialUser;
	}

	updateUser(user: User | null) {
		this.user = user;
	}
}

export function setAppContext(initialUser: User | null = null) {
	return setContext(APP_CONTEXT, new AppContext(initialUser));
}

export function getAppContext() {
	return getContext<ReturnType<typeof setAppContext>>(APP_CONTEXT);
}
