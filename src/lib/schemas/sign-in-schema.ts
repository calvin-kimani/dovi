import { z } from 'zod/v4';

export const schema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Password must be at least 8 characters long')
});

export type SignInSchema = z.infer<typeof schema>;
