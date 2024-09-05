import { resizeTextToFit } from "./resizeTextToFit.js";

const stepToColorsMap = {
	none: "#0e1111",
	layout: "#cc000d",
	paint: "#5900cc",
	composite: "#242bff",
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

