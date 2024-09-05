import { gsap } from 'gsap';

export function updateContent(engine, property, step) {
	const prevExpanded = document.querySelector('.expanded');
	const expander = document.querySelector(`[data-property-name="${property}"].expander`);

	if (prevExpanded && prevExpanded !== expander) {
		clearExistingContent();
	}

	const copyContainer = document.querySelector(`[data-property-name="${property}"] > [data-content-container]`);
	const copyTemplate = document.getElementById(`${step}-copy`);
	const clonedCopy = copyTemplate.content.cloneNode(true);

	const engineEl = clonedCopy.querySelector('.engine');
	engineEl.textContent = engine;

	const propertyEl = clonedCopy.querySelector('.property');
	propertyEl.textContent = property;

	copyContainer.innerHTML = '';
	copyContainer.appendChild(clonedCopy);

	expander.classList.add('expanded');

	gsap.to(expander, {
		opacity: 1,
		duration: 0.2,
		y: 8,
	})
}

export function clearExistingContent() {
	const expander = document.querySelector('.expander.expanded');
	const content = expander.querySelector('[data-content-container]');

	gsap.to(expander, {
		opacity: 0,
		duration: 0.2,
		y: 16,
		onComplete: () => {
			expander.classList.remove('expanded');
			content.innerHTML = '';
		}
	})

}

