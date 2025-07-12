import { clsx, type ClassValue } from 'clsx';

export function cn(...classes: ClassValue[]) {
	return clsx(classes);
}
