import { resizeHandler, resizeTextToFit } from "./resizeTextToFit.js";
import { cycleBackground } from "./setBackground.js";

const time = 1_000;
const container = document.querySelector(".container");
const template = document.getElementById("reveal-wrapper-template");

export function removeTitle(onComplete) {
	if (window.innerWidth < 700) {
		cycleBackground("none");
	}
	// I need to have the same setup, container + children
	if (!container.children.length) {
		return onComplete();
	}

	const previousTemplate = container.children[0];

	const wrapper = previousTemplate.querySelector(".reveal-wrapper");
	const wrapperBg = previousTemplate.querySelector(".reveal-wrapper-background");
	wrapper.classList.add("content-exit-animation");
	wrapperBg.classList.add("content-exit-animation");

	setTimeout(() => {
		previousTemplate.remove();
		onComplete();
	}, time);
}

export function addTitle({ propertyName, step }, onComplete) {
	if (window.innerWidth < 700) {
		cycleBackground(step)
		onComplete();
		return
	}

	if (container.children.length > 0) {
		const currentText =
			container.children[0].querySelector(".text p").textContent;
		if (currentText === propertyName) {
			cycleBackground(step)
			onComplete();
			return;
		}
	}

	const templateClone = template.content.cloneNode(true);

	const pEls = templateClone.querySelectorAll("p");

	for (const pEl of pEls) {
		pEl.textContent = propertyName;
	}

	cycleBackground(step)

	container.appendChild(templateClone);

	if (container.children.length > 1) {
		const previousTemplate = container.children[0];

		const wrapper = previousTemplate.querySelector(".reveal-wrapper");
		const wrapperBg = previousTemplate.querySelector(".reveal-wrapper-background");
		wrapper.classList.add("content-exit-animation");
		wrapperBg.classList.add("content-exit-animation");

		setTimeout(() => {
			previousTemplate.remove();
		}, time);
	}

	resizeHandler();

	setTimeout(() => {
		onComplete();
	}, time);
}
