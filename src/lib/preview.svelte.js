// src/lib/preview.svelte.js
let preview = $state({ project: {} });

export { preview };

export function setPreview(project) {
	
	preview.project = project;
	// console.log(preview.project);
}
