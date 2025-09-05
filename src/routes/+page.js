import { redirect } from '@sveltejs/kit';

export function load() {
	throw redirect(307, '/projects'); // 307: temporary redirect
}
