import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const packageJson = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));

function collectExportTargets(value) {
	if (typeof value === 'string') {
		return [value];
	}

	return Object.values(value).flatMap(collectExportTargets);
}

const targets = collectExportTargets(packageJson.exports);
const missing = [];

for (const target of targets) {
	try {
		await access(resolve(root, target));
	} catch {
		missing.push(target);
	}
}

if (missing.length > 0) {
	throw new Error(`Missing package exports:\n${missing.map((target) => `- ${target}`).join('\n')}`);
}

console.log(`Verified ${targets.length} package export targets.`);
