const container = document.querySelector(".container");

const MAX_FONT_SIZE = 110

export function resizeTextToFit(wrapperEl, textEl) {
	let fontSize = 0;
	wrapperEl.style.fontSize = `${fontSize}px`;

	while (textEl.clientWidth <= wrapperEl.clientWidth && fontSize < MAX_FONT_SIZE) {
		fontSize += 1;
		wrapperEl.style.fontSize = `${fontSize}px`;
	}

	wrapperEl.style.fontSize = `${fontSize - 3}px`;
}

export function resizeHandler() {
	const lastChild = container.children[container.children.length - 1];

	if (!lastChild) return
	const revealWrapper = lastChild.querySelector(".reveal-wrapper");

	const textEl = lastChild.querySelector(".text");

	if (!textEl) return

	resizeTextToFit(revealWrapper, textEl);
}

const resizeObserver = new ResizeObserver(resizeHandler);

resizeObserver.observe(document.body.querySelector('main'));
