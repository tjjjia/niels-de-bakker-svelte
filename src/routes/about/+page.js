// export const prerender = true;

import { PUBLIC_KIRBY_DOMAIN } from '$env/static/public';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const url = `${PUBLIC_KIRBY_DOMAIN}/about.json`;

	const response = await fetch(url);
	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	console.log(response);
	return response.json();
}
