import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function fetchData(url: string) {
	const res = await fetch(url, { credentials: "include" });
	const data = await res.json();
	if (!res.ok) {
		throw new Error(data.message);
	}
	return data;
}

export function formatDate(value: string) {
	return new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short",
	}).format(new Date(value));
}
