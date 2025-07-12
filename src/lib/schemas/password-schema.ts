import z from 'zod/v4';

export const password = z.string().min(8, 'Password must be at least 8 characters long');
