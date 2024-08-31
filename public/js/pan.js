import { gsap } from 'gsap';

const wrapper = document.querySelector('.inverted-border-wrapper');
const card = document.querySelector('.inverted-border-container');

const tl = gsap.timeline();

const getInitialTransformValues = () => {
	return getComputedStyle(card).getPropertyValue('transform');
}

const initialTransformValues = getInitialTransformValues()

let constrain = 10;

function transformElement(el, x, y) {
	const box = el.getBoundingClientRect();
	const calcX = (-(x - box.x - (box.width / 2)) / constrain);
	const calcY = (-(y - box.y - (box.height / 2)) / constrain);

	tl.to(el, {
		duration: 0.2,
		x: calcX,
		y: calcY,
	})
}

const mouseEvent = (e) => {
	tl.killTweensOf(card);
	transformElement(card, e.clientX, e.clientY);
	wrapper.setAttribute('data-hovering', '');
}

const leaveEvent = () => {
	tl.killTweensOf(card);
	card.style.transform = initialTransformValues;
	wrapper.removeAttribute('data-hovering');
}

wrapper.addEventListener('mousemove', mouseEvent);
wrapper.addEventListener('mouseleave', leaveEvent);

const mm = gsap.matchMedia();

// TODO: test this
mm.add({
	reduceMotion: "(prefers-reduced-motion: reduce)",
}, (context) => {
	const { reduceMotion } = context.conditions;

	if (reduceMotion) {
		wrapper.removeEventListener('mousemove', mouseEvent);
		wrapper.removeEventListener('mouseleave', leaveEvent);
	}

	return () => {
		wrapper.addEventListener('mousemove', mouseEvent);
		wrapper.addEventListener('mouseleave', leaveEvent);
	}
})

let lastTime = 0;
const interval = 1_000; // 0.2 seconds

function animate(currentTime) {
	if (currentTime - lastTime >= interval) {
		lastTime = currentTime;
		const isHovering = wrapper.hasAttribute('data-hovering');

		if (!isHovering) {
			tl.from(card, {
				duration: 1,
				x: gsap.utils.random(-5, 5),
				y: gsap.utils.random(-5, 5),
				ease: 'none'
			});
		}
	}
	requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
