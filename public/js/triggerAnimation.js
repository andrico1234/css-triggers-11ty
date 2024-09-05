import { removeTitle, addTitle } from "./animateSidebar.js";
import { cycleBackground } from "./setBackground.js";

class Queue {
	constructor() {
		this.buffer = [];
	}

	enqueue(item) {
		this.buffer.push(item);
		const event = new CustomEvent("queueChanged", { detail: item });
		document.dispatchEvent(event);
	}

	dequeue() {
		return this.buffer.shift();
	}

	clear() {
		if (this.buffer.length > 0) {
			this.buffer = [];
		}
	}
}

const buffer = new Queue();

export function triggerAnimation({ propertyName, step }) {
	return new Promise((resolve) => {
		if (!propertyName) {
			return removeTitle(() => {
				resolve();
			});
		}

		return addTitle({ propertyName, step }, () => {
			resolve();
		});
	});
}

export function pushAnimationToQueue({ propertyName, step }) {
	buffer.enqueue({ propertyName, step });
}

let isAnimating = false;

function handleQueueChange(event) {
	if (isAnimating) return;

	isAnimating = true;
	const item = event.detail;

	triggerAnimation(item).then(() => {
		isAnimating = false;
		buffer.dequeue();

		if (buffer.buffer.length > 0) {
			const lastItem = buffer.buffer[buffer.buffer.length - 1];
			// TODO: Make this less hacky
			buffer.buffer = [lastItem];
			handleQueueChange({ detail: lastItem });
		}
	});
}

document.addEventListener("queueChanged", handleQueueChange);
