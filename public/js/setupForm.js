const formTemplate = document.getElementById('form-template');
const clonedTemplate = formTemplate.content.cloneNode(true);
const backgroundImageWrapper = document.getElementById('background-image-wrapper');

backgroundImageWrapper.insertAdjacentElement('afterend', clonedTemplate.firstElementChild);

const emailForm = document.querySelector(".email-input");
const helperText = document.querySelector('.helper-text');

const cleanValue = (value) => {
	const trimmedValue = value.trim();
	const tempEl = document.createElement('div');
	tempEl.textContent = trimmedValue;
	return tempEl.innerHTML;
}

emailForm.addEventListener("submit", async (e) => {
	e.preventDefault();

	const button = emailForm.querySelector("button");
	const input = emailForm.querySelector('input[type=email]');

	helperText.textContent = '';

	button.setAttribute('disabled', 'true');

	const onSuccess = () => {
		if (document.activeElement === input) {
			input.blur();
		}

		button.removeAttribute('disabled')
		emailForm.reset();
		helperText.textContent = 'Nice, a confirmation email has been sent to your inbox!'
	}

	const onFailure = () => {
		button.removeAttribute('disabled')
		helperText.textContent = 'Something went wrong, please ensure that your email is correct.';
	}

	const formData = new FormData(e.target);

	const email = cleanValue(formData.get('email_address'));

	try {
		const response = await fetch('/.netlify/functions/subscribe', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify({ email })
		});

		if (response.status >= 200 && response.status < 300) {
			onSuccess();
			return;
		}

		onFailure();
	} catch {
		onFailure();
	}
});
