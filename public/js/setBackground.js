const stepToColorsMap = {
	none: "var(--black)",
	layout: "var(--red)",
	paint: "var(--purple)",
	composite: "var(--blue)",
};

export function cycleBackground(step) {
	const color = stepToColorsMap[step] ?? stepToColorsMap.none;
	const mobileBg = document.querySelector(".mobile-bg");

	document.body.style.setProperty("--background-color", color);

	if (window.innerWidth < 700) {
		mobileBg.style.backgroundColor = 'var(--background-color)';
	} else {
		mobileBg.style.backgroundColor = 'transparent';
	}
}

