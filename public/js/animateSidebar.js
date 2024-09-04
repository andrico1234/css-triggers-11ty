import { resizeTextToFit } from "./resizeTextToFit.js";
import { cycleBackground } from "./setBackground.js";

const time = 1_000;
const container = document.querySelector(".container");
const template = document.getElementById("reveal-wrapper-template");

export function removeTitle(onComplete) {
	// I need to have the same setup, container + children
	if (!container.children.length) {
		return onComplete();
	}

	const previousTemplate = container.children[0];

	const wrapper = previousTemplate.querySelector(".reveal-wrapper");
	const wrapperBg = previousTemplate.querySelector(".reveal-wrapper-background");
	wrapper.classList.add("something-2");
	wrapperBg.classList.add("something-2");

	setTimeout(() => {
		previousTemplate.remove();
		onComplete();
	}, time);
}

export function addTitle({ propertyName, step }, onComplete) {
	if (container.children.length > 0) {
		const currentText =
			container.children[0].querySelector(".text p").textContent;
		if (currentText === propertyName) {
			const bgEl = container.children[0].querySelector(".reveal-wrapper-background");
			cycleBackground(bgEl, step)
			onComplete();
			return;
		}
	}

	const templateClone = template.content.cloneNode(true);

	const pEls = templateClone.querySelectorAll("p");
	const bgEl = templateClone.querySelector(".reveal-wrapper-background");

	for (const pEl of pEls) {
		pEl.textContent = propertyName;
	}

	cycleBackground(bgEl, step)

	container.appendChild(templateClone);

	if (container.children.length > 1) {
		const previousTemplate = container.children[0];

		const wrapper = previousTemplate.querySelector(".reveal-wrapper");
		const wrapperBg = previousTemplate.querySelector(".reveal-wrapper-background");
		wrapper.classList.add("something-2");
		wrapperBg.classList.add("something-2");

		setTimeout(() => {
			previousTemplate.remove();
		}, time);
	}

	const lastChild = container.children[container.children.length - 1];
	const textEl = lastChild.querySelector(".text");

	resizeTextToFit(lastChild, textEl);

	setTimeout(() => {
		onComplete();
	}, time);
}
