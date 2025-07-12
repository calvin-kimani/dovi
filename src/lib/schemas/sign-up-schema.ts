import { z } from 'zod/v4';
import { password } from './password-schema';

export const PhoneSchema = z
	.string()
	.regex(/^[0-9]{10,15}$/, 'Phone number must be 10 to 15 digits long');

export const schema = z
	.object({
		firstName: z
			.string()
			.min(3, 'First name cannot be less than 3 characters')
			.max(15, 'First name cannot exceed 15 characters')
			.regex(/^[A-Za-z]+$/, 'First Name can only contain letters'),
		lastName: z
			.string()
			.min(3, 'Last name cannot be less than 3 characters')
			.max(15, 'Last name cannot exceed 15 characters')
			.regex(/^[A-Za-z]+$/, 'Last name can only contain letters'),
		email: z.string().email(),
		phone: PhoneSchema,
		password: password,
		confirmPassword: z.string()
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword']
	});

export type SignUpSchema = z.infer<typeof schema>;
