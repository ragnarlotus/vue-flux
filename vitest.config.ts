import { defineConfig, configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const exclude = [
	...configDefaults.exclude,
	'**/types.ts',
	'**/__test__/',
	'**/__mocks__/',
];

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		exclude: exclude,
		coverage: {
			provider: 'v8',
			exclude: exclude,
		},
	},
});
