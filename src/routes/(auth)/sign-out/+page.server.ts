import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async () => {
		// logout user

		redirect(302, '/sign-in');
	}
};
