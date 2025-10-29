export const prerender = true;
export const trailingSlash = 'always';
// export const ssr = true;

import { PUBLIC_KIRBY_DOMAIN } from "$env/static/public";

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ params }) {
	const url = `${PUBLIC_KIRBY_DOMAIN}/site.json`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Failed to fetch data");
	}

	return await response.json();
}
