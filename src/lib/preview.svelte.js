// src/lib/preview.svelte.js
let preview = $state({ stack: [] });

export { preview };

export function setPreview(src) {
	preview.stack = src;
	console.log(src);
}
export function pushPreview(src) {
	if (preview.stack.length > 1) {
		preview.stack.shift();
	}
	
	if (preview.stack.indexOf(src) > -1) {
		console.log("duplicate!")
		return;
	}

	preview.stack.push(src);
}

export function clearPreview() {
	if (preview.stack.length > 2) {
		preview.stack.shift();
	}
}
