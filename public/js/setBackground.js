import { resizeTextToFit } from "./resizeTextToFit.js";

const stepToColorsMap = {
	none: "#0e1111",
	layout: "#cc000d",
	paint: "#5900cc",
	composite: "#242bff",
};

export function cycleBackground(el, step) {
	const color = stepToColorsMap[step] ?? stepToColorsMap.none;
	el.style.setProperty("--background-color", color);
}

