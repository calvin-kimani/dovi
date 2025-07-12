import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ parent }) => {
	await parent();

	return {};
};
