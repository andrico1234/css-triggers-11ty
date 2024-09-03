import { resizeTextToFit } from "./resizeTextToFit.js";

const stepToColorsMap = {
	none: "#0e1111",
	layout: "#cc000d",
	paint: "#5900cc",
	composite: "#242bff",
};

const vals = ["#0e1111", "#cc000d", "#5900cc", "#242bff"];

export function cycleBackground(step) {
	const bodyStyles = window.getComputedStyle(document.documentElement);
	const backgroundValue = bodyStyles.getPropertyValue("--background-color");
	const color = stepToColorsMap[step] ?? stepToColorsMap.none;

	document.documentElement.style.setProperty("--background-color", color);
}
