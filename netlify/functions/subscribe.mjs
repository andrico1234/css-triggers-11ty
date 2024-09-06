const formId = '7059610';
const apiKey = 'iasbqWWZXnqtfV06aOoFWA';

export async function handler (req) {
	const email = JSON.parse(req.body).email;
	const url = `https://api.convertkit.com/v3/forms/${formId}/subscribe`;

	const data = {
		api_key: apiKey,
		email: email
	};

	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(data)
		});

		await res.json();

		return { statusCode: 200, body: JSON.stringify({ success: true }) };
	} catch (error) {
		console.error(error)
		return { statusCode: 400, body: JSON.stringify({ fetchError: true }) };
	}
}
