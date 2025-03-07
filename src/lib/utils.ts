import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function parseNumberFromSearchParams(
	value: string | null,
	defaultValue = 0
): number {
	if (!value) return defaultValue;
	const parsedValue = parseInt(value);

	if (isNaN(parsedValue)) return defaultValue;

	return parsedValue;
}
