const container = document.querySelector(".container");

export function resizeTextToFit(wrapperEl, textEl) {
	let fontSize = 0;
	wrapperEl.style.fontSize = `${fontSize}px`;
	while (textEl.clientWidth <= wrapperEl.clientWidth && fontSize < 200) {
		fontSize += 1;
		wrapperEl.style.fontSize = `${fontSize}px`;
	}

	wrapperEl.style.fontSize = `${fontSize - 2}px`;
}

function resizeHandler() {
	const lastChild = container.children[container.children.length - 1];

	if (!lastChild) return
	const revealWrapper = lastChild.querySelector(".reveal-wrapper");

	const textEl = lastChild.querySelector(".text");

	if (!textEl) return

	resizeTextToFit(revealWrapper, textEl);
}

const resizeObserver = new ResizeObserver(resizeHandler);

resizeObserver.observe(document.body.querySelector('main'));
