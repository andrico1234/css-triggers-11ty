import { resizeTextToFit } from "./resizeTextToFit.js";

const time = 1_000;
const container = document.querySelector(".container");
const template = document.getElementById("reveal-wrapper-template");

export function removeTitle(onComplete) {
	if (!container.children.length) {
		return onComplete();
	}

	const previousTemplate = container.children[0];
	previousTemplate.classList.add("something-2");

	setTimeout(() => {
		previousTemplate.remove();
		onComplete();
	}, time);
}

export function addTitle({ propertyName }, onComplete) {
	if (container.children.length > 0) {
		const currentText =
			container.children[0].querySelector(".text p").textContent;
		if (currentText === propertyName) {
			onComplete();
			return;
		}
	}

	const templateClone = template.content.cloneNode(true);

	const pEls = templateClone.querySelectorAll("p");

	for (const pEl of pEls) {
		pEl.textContent = propertyName;
	}

	container.appendChild(templateClone);

	if (container.children.length > 1) {
		const previousTemplate = container.children[0];
		previousTemplate.classList.add("something-2");

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
