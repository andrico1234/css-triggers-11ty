import { resizeTextToFit } from "./resizeTextToFit.js";

const stepToColorsMap = {
	none: "var(--black)",
	layout: "var(--red)",
	paint: "var(--purple)",
	composite: "var(--blue)",
};

export function cycleBackground(step) {
	const color = stepToColorsMap[step] ?? stepToColorsMap.none;

	document.body.style.setProperty("--background-color", color);

	if (window.innerWidth < 700) {
		document.body.style.backgroundColor = 'var(--background-color)';
	} else {
		document.body.style.backgroundColor = 'var(--black)';
	}
}

