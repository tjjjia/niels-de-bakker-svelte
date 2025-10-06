// src/lib/animation.js

export const durations = {
	fast: 150,
	normal: 300,
	slow: 600,
	long: 800,
	longest: 1300
};

export const easings = {
	inout: "cubic-bezier(0.66, 0, 0.34, 1)",
	jump: "cubic-bezier(0, 0.75, 1, 0)",
	drop: "linear(0, 0.013 0.5%, 0.05 1%, ...)", // shortened for clarity
	out: "cubic-bezier(0.0, 0, 0.2, 1)",
	bouncesoft: "linear(0, 1 44.7%, 0.898 51.8%, ...)",
	overshoot: "linear(0, -0.004 4.9%, -0.02 9.4%, ...)",
	in: "cubic-bezier(0.4, 0, 1, 1)"
};

// Utility: inject as CSS custom properties
export function registerAnimationVars() {
	const root = document.documentElement;

	// Durations as `--duration-*`
	for (const [key, val] of Object.entries(durations)) {
		root.style.setProperty(`--duration-${key}`, `${val}ms`);
	}

	// Easings as `--easing-*`
	for (const [key, val] of Object.entries(easings)) {
		root.style.setProperty(`--easing-${key}`, val);
	}
}
