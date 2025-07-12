import type { PageServerLoad, Actions } from './$types.js';
import { fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schemas/sign-in-schema';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	const form = await superValidate(zod4(schema));

	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod4(schema));

		console.log(form);

		if (!form.valid) {
			return fail(400, { form });
		}

		return message(form, { success: true, message: 'Login successful!' });
	}
} satisfies Actions;
