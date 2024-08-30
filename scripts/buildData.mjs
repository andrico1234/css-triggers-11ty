import fs from 'fs/promises';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const engines = ['blink', 'gecko', 'webkit'];
const dataPath = path.join(__dirname, '../src/_data');

const builtData = {
	"properties": {}
};

try {
	await fs.access(path.join(dataPath, 'data.json'))
	await fs.unlink(path.join(dataPath, 'data.json'));
} catch { }

const splitName = (fullProperty) => {
	const lastHyphenIndex = fullProperty.lastIndexOf('-');
	const renderStep = fullProperty.substring(lastHyphenIndex + 1);
	const property = fullProperty.substring(0, lastHyphenIndex);

	return [property, renderStep];
}

for (const engine of engines) {
	const pathToConfig = path.join(__dirname, `../src/_data/${engine}.json`);
	const engineData = await fs.readFile(pathToConfig, { encoding: 'utf-8' });

	const properties = JSON.parse(engineData).properties;

	Object.entries(properties).forEach(([fullProperty, propertyData]) => {
		const [property, renderStep] = splitName(fullProperty);

		if (!builtData.properties[property]) {
			builtData.properties[property] = {
				"initial": {},
				"change": {},
			};
		}

		builtData.properties[property][renderStep][engine] = propertyData;
	})
}

await fs.writeFile(path.join(dataPath, 'data.json'), JSON.stringify(builtData, null, 2));

