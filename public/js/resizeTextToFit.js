export function resizeTextToFit(wrapperEl, textEl) {
	let fontSize = 0;
	wrapperEl.style.fontSize = `${fontSize}px`;
	while (textEl.clientWidth <= wrapperEl.clientWidth && fontSize < 200) {
		fontSize += 1;
		wrapperEl.style.fontSize = `${fontSize}px`;
	}

	wrapperEl.style.fontSize = `${fontSize - 2}px`;
}
